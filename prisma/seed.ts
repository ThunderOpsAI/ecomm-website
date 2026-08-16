import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const channels = ["Direct", "Amazon", "eBay"];

  for (const name of channels) {
    await prisma.channel.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("Seeded channels:", channels.join(", "));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
