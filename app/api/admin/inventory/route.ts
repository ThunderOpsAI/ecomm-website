import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { updateInventoryAndSync } from "@/lib/inventory-sync";

const updateInventorySchema = z.object({
  productId: z.string().min(1),
  quantityOnHandDelta: z.number().int().optional(),
  newQuantityOnHand: z.number().int().nonnegative().optional(),
  reason: z.string().default("Admin manual adjustment"),
}).refine(
  (data) => data.quantityOnHandDelta !== undefined || data.newQuantityOnHand !== undefined,
  { message: "Either quantityOnHandDelta or newQuantityOnHand must be provided" }
);

export async function GET() {
  try {
    const inventory = await prisma.inventory.findMany({
      include: {
        product: {
          select: {
            id: true,
            sku: true,
            title: true,
            priceCents: true,
            active: true,
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    const inventoryWithAvailable = inventory.map((inv) => ({
      ...inv,
      availableQuantity: Math.max(0, inv.quantityOnHand - inv.quantityReserved),
    }));

    return NextResponse.json({
      success: true,
      inventory: inventoryWithAvailable,
    });
  } catch (error) {
    console.error("Fetch inventory error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching inventory" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = updateInventorySchema.parse(body);

    const syncResult = await updateInventoryAndSync({
      productId: validated.productId,
      quantityOnHandDelta: validated.quantityOnHandDelta,
      newQuantityOnHand: validated.newQuantityOnHand,
      reason: validated.reason,
      sourceChannel: "Admin",
    });

    return NextResponse.json({
      success: true,
      syncResult,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }

    console.error("Update inventory error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Error updating inventory" },
      { status: 500 }
    );
  }
}
