import { prisma } from "../lib/prisma";
import { updateInventoryAndSync } from "../lib/inventory-sync";

async function run() {
  console.log("Starting sync test...");

  // 1. Create a dummy product for testing
  const product = await prisma.product.upsert({
    where: { sku: "TEST-TSHIRT-01" },
    update: {},
    create: {
      sku: "TEST-TSHIRT-01",
      title: "Test T-Shirt",
      slug: "test-t-shirt-01",
      description: "A test product to verify inventory sync",
      priceCents: 2000,
      weightGrams: 200,
      lengthCm: 20,
      widthCm: 15,
      heightCm: 2,
    },
  });

  console.log(`Test product ready: ${product.sku} (${product.id})`);

  // 2. We received new stock: let's add 50 units!
  console.log("Adding 50 units of stock...");
  const result1 = await updateInventoryAndSync({
    productId: product.id,
    newQuantityOnHand: 50,
    reason: "Initial Stock Arrival",
    sourceChannel: "Admin",
  });

  console.log("\n--- SYNC RESULT (ADD STOCK) ---");
  console.log(JSON.stringify(result1, null, 2));

  // 3. Simulate an Amazon sale of 2 units (reduces stock by 2)
  console.log("\nSimulating an Amazon sale of 2 units...");
  const result2 = await updateInventoryAndSync({
    productId: product.id,
    quantityOnHandDelta: -2,
    reason: "Amazon Order #12345",
    sourceChannel: "Amazon", // This prevents pinging Amazon back to update stock
  });

  console.log("\n--- SYNC RESULT (AMAZON SALE) ---");
  console.log(JSON.stringify(result2, null, 2));

  console.log("\nTest complete!");
}

run()
  .catch((e) => {
    console.error("Test failed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
