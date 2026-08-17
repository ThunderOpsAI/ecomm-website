import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { updateInventoryAndSync } from "@/lib/inventory-sync";

const createProductSchema = z.object({
  sku: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().default(""),
  priceCents: z.number().int().positive(),
  imageUrls: z.array(z.string()).default([]),
  weightGrams: z.number().int().positive().default(350),
  lengthCm: z.number().positive().default(32),
  widthCm: z.number().positive().default(8),
  heightCm: z.number().positive().default(8),
  active: z.boolean().default(true),
  initialOnHand: z.number().int().nonnegative().default(0),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");

    const products = await prisma.product.findMany({
      where: search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { sku: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
      include: {
        inventory: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Fetch products error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = createProductSchema.parse(body);

    const product = await prisma.product.create({
      data: {
        sku: validated.sku,
        title: validated.title,
        slug: validated.slug,
        description: validated.description,
        priceCents: validated.priceCents,
        imageUrls: validated.imageUrls,
        weightGrams: validated.weightGrams,
        lengthCm: validated.lengthCm,
        widthCm: validated.widthCm,
        heightCm: validated.heightCm,
        active: validated.active,
      },
    });

    // Initialize inventory through the unified sync gate
    if (validated.initialOnHand > 0) {
      await updateInventoryAndSync({
        productId: product.id,
        newQuantityOnHand: validated.initialOnHand,
        reason: "Initial product stock creation",
        sourceChannel: "Admin",
      });
    }

    const createdProduct = await prisma.product.findUnique({
      where: { id: product.id },
      include: { inventory: true },
    });

    return NextResponse.json(
      { success: true, product: createdProduct },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }

    console.error("Create product error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Error creating product" },
      { status: 500 }
    );
  }
}
