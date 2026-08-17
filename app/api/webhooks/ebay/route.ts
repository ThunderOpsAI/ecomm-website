import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { updateInventoryAndSync } from "@/lib/inventory-sync";

export const dynamic = "force-dynamic";

/**
 * Handles eBay Marketplace Webhook Notifications & Challenge verification
 */
export async function GET(req: NextRequest) {
  // eBay Webhook Endpoint Validation Challenge
  const challengeCode = req.nextUrl.searchParams.get("challenge_code");
  const verificationToken = process.env.EBAY_VERIFICATION_TOKEN || "default_verification_token";
  const endpointUrl = `${req.nextUrl.origin}/api/webhooks/ebay`;

  if (challengeCode) {
    const hash = crypto
      .createHash("sha256")
      .update(challengeCode + verificationToken + endpointUrl)
      .digest("hex");

    return new NextResponse(JSON.stringify({ challengeResponse: hash }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return NextResponse.json({ message: "eBay webhook endpoint ready" });
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const topic = payload.metadata?.topic;
    const notification = payload.notification?.data;

    // Handle eBay Order Creation / Payment Complete notification
    if (topic === "MARKETPLACE_ORDER" || notification?.orderId) {
      const lineItems = notification.lineItems || [];

      for (const item of lineItems) {
        const sku = item.sku || item.legacyItemId;
        const quantity = Number(item.quantity || 1);

        if (!sku) continue;

        const product = await prisma.product.findUnique({
          where: { sku },
        });

        if (product) {
          await updateInventoryAndSync({
            productId: product.id,
            quantityOnHandDelta: -quantity,
            reason: `eBay Order ${notification.orderId || "External"}`,
            sourceChannel: "eBay",
          });
        }
      }
    }

    return NextResponse.json({ success: true, received: true });
  } catch (error) {
    console.error("eBay webhook processing error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Error processing eBay webhook" },
      { status: 500 }
    );
  }
}
