import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PRODUCTS = [
  // 1-4: Japandi Desk Mats
  {
    sku: "JAP-BLOOD-MOON",
    title: "Blood Moon Pagoda Japandi Desk Mat",
    slug: "blood-moon-pagoda",
    description:
      "Minimalist Japandi aesthetic desk mat featuring an ethereal blood moon rising above an ancient pagoda. Premium micro-woven cloth surface with stitched anti-fray edges and non-slip natural rubber base.",
    priceCents: 3999,
    weightGrams: 750,
    lengthCm: 90.0,
    widthCm: 40.0,
    heightCm: 0.4,
    imageUrls: [
      "/images/products/japandi/blood-moon-pagoda/packshot.jpeg",
      "/images/products/japandi/blood-moon-pagoda/lifestyle.jpeg",
      "/images/products/japandi/blood-moon-pagoda/base-reveal.jpeg",
    ],
    stock: 25,
  },
  {
    sku: "JAP-CRIMSON-BLOSSOM",
    title: "Crimson Blossom Ronin Japandi Desk Mat",
    slug: "crimson-blossom-ronin",
    description:
      "Subtle Japanese ink-wash ronin standing among falling sakura blossoms. Textured cloth weave designed for high-precision mouse tracking and plush wrist support.",
    priceCents: 3999,
    weightGrams: 750,
    lengthCm: 90.0,
    widthCm: 40.0,
    heightCm: 0.4,
    imageUrls: [
      "/images/products/japandi/crimson-blossom-ronin/packshot.jpeg",
      "/images/products/japandi/crimson-blossom-ronin/lifestyle.jpeg",
      "/images/products/japandi/crimson-blossom-ronin/base-reveal.jpeg",
    ],
    stock: 25,
  },
  {
    sku: "JAP-MYSTIC-CRIMSON",
    title: "Mystic Crimson Hood Japandi Desk Mat",
    slug: "mystic-crimson-hood",
    description:
      "Striking silhouette of a hooded mystic against rich crimson tones. Precision micro-stitched perimeter and non-slip rubber backing for the ultimate desktop setup.",
    priceCents: 3999,
    weightGrams: 750,
    lengthCm: 90.0,
    widthCm: 40.0,
    heightCm: 0.4,
    imageUrls: [
      "/images/products/japandi/mystic-crimson-hood/packshot.jpeg",
      "/images/products/japandi/mystic-crimson-hood/lifestyle.jpeg",
      "/images/products/japandi/mystic-crimson-hood/base-reveal.jpeg",
    ],
    stock: 20,
  },
  {
    sku: "JAP-SILVER-PHANTOM",
    title: "Silver Phantom Swordsman Japandi Desk Mat",
    slug: "silver-phantom-swordsman",
    description:
      "Moody monochrome swordmaster illustration with subtle silver tones. Premium extended gaming mat surface with water-resistant coating and dense non-slip rubber base.",
    priceCents: 3999,
    weightGrams: 750,
    lengthCm: 90.0,
    widthCm: 40.0,
    heightCm: 0.4,
    imageUrls: [
      "/images/products/japandi/silver-phantom-swordsman/packshot.jpeg",
      "/images/products/japandi/silver-phantom-swordsman/lifestyle.jpeg",
      "/images/products/japandi/silver-phantom-swordsman/base-reveal.jpeg",
    ],
    stock: 20,
  },

  // 5-8: Dragon Ball Z Mousepads
  {
    sku: "DBZ-4-PANEL-SS",
    title: "4-Panel Super Saiyan Anime Desk Mat",
    slug: "4-panel-super-saiyan",
    description:
      "Iconic 4-panel split artwork highlighting legendary Super Saiyan evolutions. Vibrant sublimation print with precision edge stitching and ultra-smooth cloth glide.",
    priceCents: 4499,
    weightGrams: 750,
    lengthCm: 90.0,
    widthCm: 40.0,
    heightCm: 0.4,
    imageUrls: [
      "/images/products/dbz/4-panel-super-saiyan/packshot.jpeg",
      "/images/products/dbz/4-panel-super-saiyan/lifestyle.jpeg",
      "/images/products/dbz/4-panel-super-saiyan/base-reveal.jpeg",
    ],
    stock: 30,
  },
  {
    sku: "DBZ-5-PANEL-ZF",
    title: "5-Panel Z-Fighters Anime Desk Mat",
    slug: "5-panel-z-fighters",
    description:
      "Epic 5-panel composition showcasing the defenders of Earth. High-density textile surface optimized for optical sensors with reinforced stitched borders.",
    priceCents: 4499,
    weightGrams: 750,
    lengthCm: 90.0,
    widthCm: 40.0,
    heightCm: 0.4,
    imageUrls: [
      "/images/products/dbz/5-panel-z-fighters/packshot.jpeg",
      "/images/products/dbz/5-panel-z-fighters/lifestyle.jpeg",
      "/images/products/dbz/5-panel-z-fighters/base-reveal.jpeg",
    ],
    stock: 30,
  },
  {
    sku: "DBZ-GOKU-BARDOCK",
    title: "Fiery Goku & Bardock Split Desk Mat",
    slug: "fiery-goku-bardock",
    description:
      "Dual-generation Saiyan power in an intense aura burst. Features Father and Son back-to-back in high-contrast vibrant colors, anti-fray edging, and non-slip rubber backing.",
    priceCents: 4499,
    weightGrams: 750,
    lengthCm: 90.0,
    widthCm: 40.0,
    heightCm: 0.4,
    imageUrls: [
      "/images/products/dbz/fiery-goku-bardock/packshot.jpg",
      "/images/products/dbz/fiery-goku-bardock/lifestyle.jpeg",
      "/images/products/dbz/fiery-goku-bardock/base-reveal.jpeg",
    ],
    stock: 15,
  },
  {
    sku: "DBZ-KID-GOKU-SHENRON",
    title: "Kid Goku & Shenron Dragon Desk Mat",
    slug: "kid-goku-shenron",
    description:
      "Nostalgic adventure visual featuring young Goku soaring alongside the Eternal Dragon Shenron. Smooth micro-texture fabric engineered for effortless mouse gliding.",
    priceCents: 4499,
    weightGrams: 750,
    lengthCm: 90.0,
    widthCm: 40.0,
    heightCm: 0.4,
    imageUrls: [
      "/images/products/dbz/kid-goku-shenron/packshot.jpeg",
      "/images/products/dbz/kid-goku-shenron/lifestyle.jpeg",
      "/images/products/dbz/kid-goku-shenron/base-reveal.jpeg",
    ],
    stock: 25,
  },

  // 9-12: 3D Ergonomic Mousepads
  {
    sku: "3D-ASSASSIN-REZE",
    title: "Assassin Reze Ergonomic 3D Mousepad",
    slug: "assassin-reze",
    description:
      "Ergonomic silicone gel wrist-rest 3D anime mousepad featuring Reze. Provides natural ergonomic contouring to alleviate wrist fatigue during prolonged gaming sessions.",
    priceCents: 3499,
    weightGrams: 320,
    lengthCm: 26.0,
    widthCm: 21.5,
    heightCm: 3.2,
    imageUrls: ["/images/products/3d/assassin-reze.avif"],
    stock: 20,
  },
  {
    sku: "3D-BLOOD-FIEND-POWER",
    title: "Blood Fiend Power Ergonomic 3D Mousepad",
    slug: "blood-fiend-power",
    description:
      "Contoured ergonomic 3D mousepad with memory gel wrist support featuring the chaotic Blood Fiend. Smooth lycra surface with non-slip PU base for secure desk grip.",
    priceCents: 3499,
    weightGrams: 320,
    lengthCm: 26.0,
    widthCm: 21.5,
    heightCm: 3.2,
    imageUrls: ["/images/products/3d/blood-fiend-power.avif"],
    stock: 15,
  },
  {
    sku: "3D-LOVE-WARRIOR-MITSURI",
    title: "Love Warrior Mitsuri Ergonomic 3D Mousepad",
    slug: "love-warrior-mitsuri",
    description:
      "Supportive ergonomic wrist rest with vibrant anime print. Soft memory silicone cushioning reduces joint stress during extended PC use.",
    priceCents: 3499,
    weightGrams: 320,
    lengthCm: 26.0,
    widthCm: 21.5,
    heightCm: 3.2,
    imageUrls: ["/images/products/3d/love-warrior-mitsuri.avif"],
    stock: 20,
  },
  {
    sku: "3D-SUNLIT-NAVIGATOR-NAMI",
    title: "Sunlit Navigator Nami Ergonomic 3D Mousepad",
    slug: "sunlit-navigator-nami",
    description:
      "Ergonomic 3D wrist rest mousepad featuring the intrepid Straw Hat navigator. Soft elastic fabric over premium medical-grade silicone gel support with anti-skid bottom.",
    priceCents: 3499,
    weightGrams: 320,
    lengthCm: 26.0,
    widthCm: 21.5,
    heightCm: 3.2,
    imageUrls: ["/images/products/3d/sunlit-navigator-nami.avif"],
    stock: 20,
  },
];

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

  for (const p of PRODUCTS) {
    const { stock, ...productData } = p;
    const product = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: productData,
      create: productData,
    });

    await prisma.inventory.upsert({
      where: { productId: product.id },
      update: {
        quantityOnHand: stock,
      },
      create: {
        productId: product.id,
        quantityOnHand: stock,
        quantityReserved: 0,
      },
    });

    console.log(`Seeded product & inventory: ${product.title} (${product.slug})`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
