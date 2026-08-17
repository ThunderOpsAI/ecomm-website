import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const updateOrderSchema = z.object({
  orderId: z.string().min(1),
  status: z.enum(["PENDING", "PAID", "PACKED", "SHIPPED", "DELIVERED", "CANCELLED"]).optional(),
  trackingNumber: z.string().optional(),
  labelUrl: z.string().url().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const statusParam = searchParams.get("status");

    const orders = await prisma.order.findMany({
      where: statusParam
        ? { status: statusParam as "PENDING" | "PAID" | "PACKED" | "SHIPPED" | "DELIVERED" | "CANCELLED" }
        : undefined,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            addresses: {
              where: { isDefault: true },
              take: 1,
            },
          },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                sku: true,
                title: true,
                imageUrls: true,
              },
            },
          },
        },
        shipment: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Fetch orders error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching orders" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = updateOrderSchema.parse(body);

    const now = new Date();
    const updateData: {
      status?: "PENDING" | "PAID" | "PACKED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    } = {};

    if (validated.status) {
      updateData.status = validated.status;
    }

    const updatedOrder = await prisma.order.update({
      where: { id: validated.orderId },
      data: {
        ...updateData,
        shipment:
          validated.trackingNumber || validated.labelUrl || validated.status === "SHIPPED" || validated.status === "DELIVERED"
            ? {
                upsert: {
                  create: {
                    carrier: "AusPost",
                    trackingNumber: validated.trackingNumber,
                    labelUrl: validated.labelUrl,
                    chargeableWeightG: 500, // default if creating from scratch
                    shippedAt: validated.status === "SHIPPED" ? now : undefined,
                    deliveredAt: validated.status === "DELIVERED" ? now : undefined,
                  },
                  update: {
                    trackingNumber: validated.trackingNumber,
                    labelUrl: validated.labelUrl,
                    shippedAt: validated.status === "SHIPPED" ? now : undefined,
                    deliveredAt: validated.status === "DELIVERED" ? now : undefined,
                  },
                },
              }
            : undefined,
      },
      include: {
        items: true,
        shipment: true,
        user: true,
      },
    });

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }

    console.error("Update order error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Error updating order" },
      { status: 500 }
    );
  }
}
