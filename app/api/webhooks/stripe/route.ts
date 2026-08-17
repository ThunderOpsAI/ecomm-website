import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { updateInventoryAndSync } from "@/lib/inventory-sync";
import type Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // In local development / test without webhook secret configured
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err) {
    console.error("Stripe signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        if (!orderId) {
          console.warn("No orderId in Stripe session metadata");
          break;
        }

        const order = await prisma.order.findUnique({
          where: { id: orderId },
          include: { items: true },
        });

        if (!order) {
          console.error(`Order ${orderId} not found during webhook processing`);
          break;
        }

        // Avoid double processing
        if (order.status === "PAID") {
          console.info(`Order ${orderId} already marked as PAID`);
          break;
        }

        // 1. Update Order Status and release reservation in DB
        await prisma.$transaction(async (tx) => {
          await tx.order.update({
            where: { id: orderId },
            data: {
              status: "PAID",
              stripePaymentId:
                typeof session.payment_intent === "string"
                  ? session.payment_intent
                  : session.id,
            },
          });

          // Revert reservation locks so they don't remain in reserved state
          for (const item of order.items) {
            await tx.inventory.update({
              where: { productId: item.productId },
              data: {
                quantityReserved: { decrement: item.quantity },
              },
            });
          }
        });

        // 2. Decrement physical quantityOnHand and push synced available stock to Amazon & eBay
        for (const item of order.items) {
          await updateInventoryAndSync({
            productId: item.productId,
            quantityOnHandDelta: -item.quantity,
            reason: `Order ${orderId} completed via Direct storefront`,
            sourceChannel: "Direct",
          });
        }

        console.info(`Order ${orderId} paid and inventory synchronized successfully`);
        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        if (!orderId) break;

        const order = await prisma.order.findUnique({
          where: { id: orderId },
          include: { items: true },
        });

        if (order && order.status === "PENDING") {
          // Revert reserved stock locks on expiry
          await prisma.$transaction(async (tx) => {
            await tx.order.update({
              where: { id: orderId },
              data: { status: "CANCELLED" },
            });

            for (const item of order.items) {
              await tx.inventory.update({
                where: { productId: item.productId },
                data: {
                  quantityReserved: { decrement: item.quantity },
                },
              });
            }
          });

          console.info(`Order ${orderId} expired; stock reservation released`);
        }
        break;
      }

      default:
        // Unhandled event type
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing Stripe webhook:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
