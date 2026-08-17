import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";
import { calculateParcelChargeableWeight, getAusPostShippingQuote } from "@/lib/auspost";

const checkoutSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, "Name is required"),
  shippingAddress: z.object({
    line1: z.string().min(1, "Address line 1 is required"),
    line2: z.string().optional(),
    suburb: z.string().min(1, "Suburb is required"),
    state: z.string().min(2, "State is required"),
    postcode: z.string().min(3).max(4, "Invalid Australian postcode"),
    country: z.string().default("AU"),
  }),
  items: z.array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().int().positive(),
    })
  ).min(1, "Cart cannot be empty"),
  shippingServiceCode: z.enum(["AUS_PARCEL_REGULAR", "AUS_PARCEL_EXPRESS"]).default("AUS_PARCEL_REGULAR"),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = checkoutSchema.parse(body);

    // 1. Fetch products and check inventory availability
    const productIds = validated.items.map((i) => i.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds }, active: true },
      include: { inventory: true },
    });

    if (dbProducts.length !== productIds.length) {
      return NextResponse.json(
        { success: false, message: "One or more products are inactive or invalid" },
        { status: 400 }
      );
    }

    const productMap = new Map(dbProducts.map((p) => [p.id, p]));

    // Check stock availability
    for (const item of validated.items) {
      const p = productMap.get(item.productId)!;
      const onHand = p.inventory?.quantityOnHand ?? 0;
      const reserved = p.inventory?.quantityReserved ?? 0;
      const available = onHand - reserved;

      if (available < item.quantity) {
        return NextResponse.json(
          {
            success: false,
            message: `Insufficient stock for product "${p.title}". Available: ${Math.max(0, available)}, Requested: ${item.quantity}`,
          },
          { status: 409 }
        );
      }
    }

    // 2. Calculate chargeable weight (max of dead weight vs Australia Post cubic weight)
    const itemDimensions = validated.items.map((item) => {
      const p = productMap.get(item.productId)!;
      return {
        lengthCm: p.lengthCm,
        widthCm: p.widthCm,
        heightCm: p.heightCm,
        weightGrams: p.weightGrams,
        quantity: item.quantity,
      };
    });

    const { chargeableWeightGrams } = calculateParcelChargeableWeight(itemDimensions);

    // Calculate shipping cost
    const quote = await getAusPostShippingQuote(validated.shippingAddress.postcode, itemDimensions);
    const selectedShippingOption =
      quote.options.find((o) => o.serviceCode === validated.shippingServiceCode) ||
      quote.options[0];

    const shippingCents = selectedShippingOption.priceCents;

    // 3. Atomically reserve inventory & create Order in a Prisma transaction
    const order = await prisma.$transaction(async (tx) => {
      // Find or create customer
      let user = await tx.user.findUnique({
        where: { email: validated.email },
      });

      if (!user) {
        user = await tx.user.create({
          data: {
            email: validated.email,
            name: validated.name,
            role: "CUSTOMER",
          },
        });
      }

      // Save customer address
      await tx.address.create({
        data: {
          userId: user.id,
          line1: validated.shippingAddress.line1,
          line2: validated.shippingAddress.line2,
          suburb: validated.shippingAddress.suburb,
          state: validated.shippingAddress.state,
          postcode: validated.shippingAddress.postcode,
          country: validated.shippingAddress.country,
          isDefault: true,
        },
      });

      // Increment quantityReserved for each product
      for (const item of validated.items) {
        await tx.inventory.upsert({
          where: { productId: item.productId },
          update: {
            quantityReserved: { increment: item.quantity },
          },
          create: {
            productId: item.productId,
            quantityOnHand: 0,
            quantityReserved: item.quantity,
          },
        });
      }

      // Compute total items price
      let itemsTotalCents = 0;
      for (const item of validated.items) {
        const p = productMap.get(item.productId)!;
        itemsTotalCents += p.priceCents * item.quantity;
      }

      const totalOrderCents = itemsTotalCents + shippingCents;

      // Create Order
      const newOrder = await tx.order.create({
        data: {
          userId: user.id,
          status: "PENDING",
          totalCents: totalOrderCents,
          items: {
            create: validated.items.map((item) => {
              const p = productMap.get(item.productId)!;
              return {
                productId: p.id,
                quantity: item.quantity,
                priceCents: p.priceCents, // Snapshot of price at time of purchase
              };
            }),
          },
          shipment: {
            create: {
              carrier: "AusPost",
              chargeableWeightG: chargeableWeightGrams,
            },
          },
        },
      });

      return newOrder;
    });

    // 4. Create Stripe Checkout Session
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = validated.items.map((item) => {
      const p = productMap.get(item.productId)!;
      return {
        price_data: {
          currency: "aud",
          product_data: {
            name: p.title,
            description: p.description,
            images: p.imageUrls.slice(0, 8),
          },
          unit_amount: p.priceCents,
        },
        quantity: item.quantity,
      };
    });

    // Add shipping as a line item
    lineItems.push({
      price_data: {
        currency: "aud",
        product_data: {
          name: selectedShippingOption.serviceName,
          description: `Australia Post (${selectedShippingOption.estimatedDeliveryDays})`,
        },
        unit_amount: shippingCents,
      },
      quantity: 1,
    });

    const host = req.headers.get("origin") || req.headers.get("host") || "http://localhost:3000";
    const baseOrigin = host.startsWith("http") ? host : `https://${host}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: validated.email,
      client_reference_id: order.id,
      metadata: {
        orderId: order.id,
      },
      expires_at: Math.floor(Date.now() / 1000) + 1800, // 30 minute reservation window
      success_url: validated.successUrl || `${baseOrigin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${order.id}`,
      cancel_url: validated.cancelUrl || `${baseOrigin}/cart?cancelled=true`,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      chargeableWeightGrams,
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }

    console.error("Checkout route error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
