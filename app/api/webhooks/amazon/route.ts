import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateInventoryAndSync } from "@/lib/inventory-sync";

export const dynamic = "force-dynamic";

/**
 * Handles Amazon Selling Partner API (SP-API) Push Notifications (via AWS SNS / SQS bridge)
 * Notification Types: ORDER_STATUS_CHANGE, B2B_ORDER_STATUS_CHANGE
 */
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Handle AWS SNS Subscription Confirmation if routed via SNS
    if (payload.Type === "SubscriptionConfirmation" && payload.SubscribeURL) {
      console.info("Confirming Amazon SNS subscription:", payload.SubscribeURL);
      await fetch(payload.SubscribeURL);
      return NextResponse.json({ message: "Subscription confirmed" });
    }

    let notificationData = payload;
    if (payload.Message && typeof payload.Message === "string") {
      try {
        notificationData = JSON.parse(payload.Message);
      } catch {
        notificationData = payload;
      }
    }

    const notificationType = notificationData.NotificationType || notificationData.notificationType;

    if (
      notificationType === "ORDER_STATUS_CHANGE" ||
      notificationType === "ORDER_CHANGE" ||
      notificationData.orderChangeNotification
    ) {
      const orderSummary = notificationData.Payload?.OrderChangeNotification || notificationData;
      const orderItems = orderSummary.orderItems || orderSummary.items || [];

      for (const item of orderItems) {
        const sku = item.sellerSKU || item.sku;
        const quantity = Number(item.quantityOrdered || item.quantity || 1);

        if (!sku) continue;

        const product = await prisma.product.findUnique({
          where: { sku },
        });

        if (product) {
          await updateInventoryAndSync({
            productId: product.id,
            quantityOnHandDelta: -quantity,
            reason: `Amazon Order ${orderSummary.amazonOrderId || "External"}`,
            sourceChannel: "Amazon",
          });
        }
      }
    }

    return NextResponse.json({ success: true, received: true });
  } catch (error) {
    console.error("Amazon webhook processing error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Error processing Amazon webhook" },
      { status: 500 }
    );
  }
}
