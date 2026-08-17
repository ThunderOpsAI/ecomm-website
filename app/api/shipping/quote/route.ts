import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAusPostShippingQuote, ItemDimensions } from "@/lib/auspost";

const shippingQuoteSchema = z.object({
  postcode: z.string().min(3).max(4),
  suburb: z.string().optional(),
  items: z.array(
    z.object({
      productId: z.string().optional(),
      quantity: z.number().int().positive().default(1),
      weightGrams: z.number().positive().optional(),
      lengthCm: z.number().positive().optional(),
      widthCm: z.number().positive().optional(),
      heightCm: z.number().positive().optional(),
    })
  ).min(1, "At least one item is required in cart"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = shippingQuoteSchema.parse(body);

    const itemsToQuote: ItemDimensions[] = [];

    // Collect product IDs to look up if present
    const productIds = validatedData.items
      .map((i) => i.productId)
      .filter((id): id is string => Boolean(id));

    const productMap = new Map<string, { weightGrams: number; lengthCm: number; widthCm: number; heightCm: number }>();

    if (productIds.length > 0) {
      const dbProducts = await prisma.product.findMany({
        where: { id: { in: productIds } },
        select: {
          id: true,
          weightGrams: true,
          lengthCm: true,
          widthCm: true,
          heightCm: true,
        },
      });

      for (const p of dbProducts) {
        productMap.set(p.id, p);
      }
    }

    for (const item of validatedData.items) {
      if (item.productId && productMap.has(item.productId)) {
        const p = productMap.get(item.productId)!;
        itemsToQuote.push({
          weightGrams: p.weightGrams,
          lengthCm: p.lengthCm,
          widthCm: p.widthCm,
          heightCm: p.heightCm,
          quantity: item.quantity,
        });
      } else if (
        item.weightGrams !== undefined &&
        item.lengthCm !== undefined &&
        item.widthCm !== undefined &&
        item.heightCm !== undefined
      ) {
        itemsToQuote.push({
          weightGrams: item.weightGrams,
          lengthCm: item.lengthCm,
          widthCm: item.widthCm,
          heightCm: item.heightCm,
          quantity: item.quantity,
        });
      } else {
        // Default desk mat dimensions fallback (300mm x 800mm x 3mm rolled up in a 32x8x8cm box, 350g)
        itemsToQuote.push({
          weightGrams: 350,
          lengthCm: 32,
          widthCm: 8,
          heightCm: 8,
          quantity: item.quantity,
        });
      }
    }

    const quote = await getAusPostShippingQuote(validatedData.postcode, itemsToQuote);

    return NextResponse.json({
      success: true,
      quote,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }

    console.error("Shipping quote error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error calculating shipping quote" },
      { status: 500 }
    );
  }
}
