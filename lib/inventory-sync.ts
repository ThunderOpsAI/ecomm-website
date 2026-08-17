import { prisma } from "@/lib/prisma";
import { pushAmazonInventory } from "@/lib/amazon-sp";
import { pushEbayInventory } from "@/lib/ebay";

export interface SyncInventoryInput {
  productId: string;
  quantityOnHandDelta?: number; // Relative adjustment (+/- qty)
  newQuantityOnHand?: number;   // Absolute direct set (e.g. stocktake)
  reason?: string;
  sourceChannel?: "Direct" | "Amazon" | "eBay" | "Admin" | "Return";
}

export interface SyncResult {
  success: boolean;
  productId: string;
  sku: string;
  previousQuantityOnHand: number;
  quantityOnHand: number;
  quantityReserved: number;
  availableQuantity: number;
  syncedChannels: {
    channel: string;
    success: boolean;
    error?: string;
  }[];
}

/**
 * Single source of truth for inventory changes across all channels.
 *
 * CRITICAL RULE: No code path should update `quantityOnHand` directly without
 * going through this function. It executes the DB transition atomically and pushes
 * available quantity (quantityOnHand - quantityReserved) to Amazon and eBay.
 */
export async function updateInventoryAndSync(
  input: SyncInventoryInput
): Promise<SyncResult> {
  const { productId, quantityOnHandDelta, newQuantityOnHand, reason = "Inventory update", sourceChannel = "Direct" } = input;

  // 1. Fetch current product and inventory details
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      inventory: true,
    },
  });

  if (!product) {
    throw new Error(`Product with ID ${productId} not found`);
  }

  const listings = await prisma.channelListing.findMany({
    where: { productId },
    include: { channel: true },
  });

  const prevOnHand = product.inventory?.quantityOnHand ?? 0;
  const currentReserved = product.inventory?.quantityReserved ?? 0;

  let calculatedOnHand = prevOnHand;
  if (typeof newQuantityOnHand === "number") {
    calculatedOnHand = Math.max(0, newQuantityOnHand);
  } else if (typeof quantityOnHandDelta === "number") {
    calculatedOnHand = Math.max(0, prevOnHand + quantityOnHandDelta);
  }

  // 2. Perform atomic database update
  const updatedInventory = await prisma.inventory.upsert({
    where: { productId },
    update: {
      quantityOnHand: calculatedOnHand,
    },
    create: {
      productId,
      quantityOnHand: calculatedOnHand,
      quantityReserved: 0,
    },
  });

  const availableQuantity = Math.max(0, updatedInventory.quantityOnHand - updatedInventory.quantityReserved);

  console.info(
    `[InventorySync] Product: ${product.sku} (${productId}) | Prev: ${prevOnHand} -> OnHand: ${updatedInventory.quantityOnHand} | Reserved: ${currentReserved} | Available: ${availableQuantity} | Reason: ${reason} (Source: ${sourceChannel})`
  );

  const syncedChannelsResult: SyncResult["syncedChannels"] = [
    { channel: "Direct", success: true },
  ];

  const now = new Date();

  // 3. Push to Amazon SP-API if active listing exists (and source is not Amazon itself)
  const amazonListing = listings.find((l) => l.channel.name.toLowerCase() === "amazon");
  if (amazonListing || sourceChannel !== "Amazon") {
    try {
      const amzRes = await pushAmazonInventory({
        sku: product.sku,
        quantity: availableQuantity,
      });

      syncedChannelsResult.push({
        channel: "Amazon",
        success: amzRes.success,
        error: amzRes.success ? undefined : amzRes.message,
      });

      if (amazonListing && amzRes.success) {
        await prisma.channelListing.update({
          where: { id: amazonListing.id },
          data: { lastSyncedAt: now },
        });
      }
    } catch (err) {
      syncedChannelsResult.push({
        channel: "Amazon",
        success: false,
        error: err instanceof Error ? err.message : "Amazon sync failed",
      });
    }
  }

  // 4. Push to eBay REST API if active listing exists (and source is not eBay itself)
  const ebayListing = listings.find((l) => l.channel.name.toLowerCase() === "ebay");
  if (ebayListing || sourceChannel !== "eBay") {
    try {
      const ebayRes = await pushEbayInventory({
        sku: product.sku,
        quantity: availableQuantity,
      });

      syncedChannelsResult.push({
        channel: "eBay",
        success: ebayRes.success,
        error: ebayRes.success ? undefined : ebayRes.message,
      });

      if (ebayListing && ebayRes.success) {
        await prisma.channelListing.update({
          where: { id: ebayListing.id },
          data: { lastSyncedAt: now },
        });
      }
    } catch (err) {
      syncedChannelsResult.push({
        channel: "eBay",
        success: false,
        error: err instanceof Error ? err.message : "eBay sync failed",
      });
    }
  }

  return {
    success: true,
    productId,
    sku: product.sku,
    previousQuantityOnHand: prevOnHand,
    quantityOnHand: updatedInventory.quantityOnHand,
    quantityReserved: updatedInventory.quantityReserved,
    availableQuantity,
    syncedChannels: syncedChannelsResult,
  };
}
