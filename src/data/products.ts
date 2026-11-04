export type ProductSize = "Standard (200×240mm)" | "Large Desk Mat (400×900mm)" | "Ergonomic Contour (215×260mm)";

export interface ProductVariant {
  size: ProductSize;
  dimensions: string;
  thickness: string;
  priceCents: number;
  weightGrams: number;
}

export interface ProductReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  isPlaceholderSample: boolean;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  title: string;
  tagline: string;
  collection: "japandi" | "anime" | "3d";
  collectionName: "Japandi Mats" | "Anime Series" | "3D Ergonomic";
  description: string;
  story: string;
  priceCents: number; // Base price in AUD cents
  images: string[];
  features: string[];
  materials: {
    surface: string;
    base: string;
    edge: string;
    thickness: string;
  };
  dimensions: string;
  weightGrams: number;
  variants: ProductVariant[];
  stock: number;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  badge?: string;
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
}

export interface CollectionMeta {
  slug: "japandi" | "anime" | "3d";
  title: string;
  subtitle: string;
  heroHeadline: string;
  description: string;
  accentClass: string;
  bannerImage: string;
}

export const COLLECTIONS: Record<string, CollectionMeta> = {
  japandi: {
    slug: "japandi",
    title: "Japandi Mats",
    subtitle: "Calm Minimalist Ink-Wash Art",
    heroHeadline: "Tranquil Desk Aesthetics & Sensor Precision",
    description: "Inspired by traditional Japanese sumi-e brush strokes and Scandinavian functional simplicity. Muted tones and organic textures crafted for serene focus.",
    accentClass: "from-stone-900 to-neutral-900",
    bannerImage: "/images/products/japandi/blood-moon-pagoda/packshot.jpeg",
  },
  anime: {
    slug: "anime",
    title: "Anime Series",
    subtitle: "High-Energy Battle & Legend Art",
    heroHeadline: "Unapologetic Power & Multi-Panel Compositions",
    description: "Anime-inspired collector desk mats celebrating iconic combat art, intense power bursts, and legendary fighters in vibrant sublimation print.",
    accentClass: "from-amber-950/60 to-orange-950/40",
    bannerImage: "/images/products/dbz/4-panel-super-saiyan/packshot.jpeg",
  },
  "3d": {
    slug: "3d",
    title: "3D Ergonomic",
    subtitle: "Contoured Silicone Gel Support",
    heroHeadline: "Medical-Grade Comfort for Marathon Sessions",
    description: "Form-fitting medical grade silicone gel cushions designed to alleviate wrist strain, carpal compression, and fatigue during extended PC sessions.",
    accentClass: "from-rose-950/40 to-neutral-900",
    bannerImage: "/images/products/3d/assassin-reze.avif",
  },
};

export const PRODUCTS: Product[] = [
  // 1. Japandi: Blood Moon Pagoda
  {
    id: "prod-jap-01",
    sku: "JAP-BLOOD-MOON",
    slug: "blood-moon-pagoda",
    title: "Blood Moon Pagoda Japandi Desk Mat",
    tagline: "Ethereal lunar ascent over an ancient mountain pagoda",
    collection: "japandi",
    collectionName: "Japandi Mats",
    description: "The Blood Moon Pagoda desk mat combines tranquil Japanese landscape art with deep crimson atmospheric contrast. Designed for minimalist battlestations, this extended desk mat provides flawless optical mouse glide while anchoring your mechanical keyboard with dense non-slip rubber.",
    story: "Created as an homage to Kyoto's moonlit mountain temples, the ink wash gradients are tuned to reduce visual clutter on your workspace while lending a warm, mysterious presence.",
    priceCents: 3999, // $39.99 AUD
    images: [
      "/images/products/japandi/blood-moon-pagoda/packshot.jpeg",
      "/images/products/japandi/blood-moon-pagoda/lifestyle.jpeg",
      "/images/products/japandi/blood-moon-pagoda/base-reveal.jpeg",
    ],
    features: [
      "Ultra-dense micro-woven cloth surface tuned for low-friction mouse glides",
      "Reinforced 360° anti-fray precision lockstitch edge",
      "Natural herringbone-pattern tree rubber base that stays planted on timber, glass, or metal",
      "Spill-resistant nanocoating lets liquid bead for easy wipe down",
      "Optimized for high-DPI optical and laser gaming sensors",
    ],
    materials: {
      surface: "High-density micro-woven polyester cloth",
      base: "100% natural vulcanized tree rubber (eco-friendly)",
      edge: "Sub-surface precision 5-thread lockstitch border",
      thickness: "4.0mm plush cushioning",
    },
    dimensions: "900 × 400 × 4 mm (Desk Mat) / 200 × 240 × 3 mm (Standard)",
    weightGrams: 750,
    variants: [
      {
        size: "Large Desk Mat (400×900mm)",
        dimensions: "900 × 400 mm",
        thickness: "4 mm",
        priceCents: 3999,
        weightGrams: 750,
      },
      {
        size: "Standard (200×240mm)",
        dimensions: "240 × 200 mm",
        thickness: "3 mm",
        priceCents: 2799,
        weightGrams: 220,
      },
    ],
    stock: 24,
    isBestSeller: true,
    isFeatured: true,
    badge: "Top Seller",
    rating: 4.9,
    reviewCount: 38,
    reviews: [
      {
        id: "rev-jap-01",
        author: "Liam K.",
        location: "Melbourne, VIC",
        rating: 5,
        date: "14 Oct 2026",
        title: "Transforms my whole desk setup",
        content: "The stitching on the edge is buttery smooth and doesn't irritate my wrist during long work and Valorant sessions. Dispatched quickly from regional VIC too.",
        isPlaceholderSample: true,
      },
      {
        id: "rev-jap-02",
        author: "Sarah W.",
        location: "Sydney, NSW",
        rating: 5,
        date: "28 Sep 2026",
        title: "Print quality is insanely sharp",
        content: "Colors are rich without being obnoxious. Keyboard sounds deeper and more muted resting on the 4mm thick rubber base.",
        isPlaceholderSample: true,
      },
    ],
  },

  // 2. Japandi: Crimson Blossom Ronin
  {
    id: "prod-jap-02",
    sku: "JAP-CRIMSON-BLOSSOM",
    slug: "crimson-blossom-ronin",
    title: "Crimson Blossom Ronin Japandi Desk Mat",
    tagline: "Subtle ink-wash wanderer among descending sakura leaves",
    collection: "japandi",
    collectionName: "Japandi Mats",
    description: "Capturing the solitude of the masterless samurai, Crimson Blossom Ronin fuses minimalist monochrome watercolor with soft sakura petals. The smooth cloth glide gives precise tracking for micro-adjustments in tactical FPS titles.",
    story: "Inspired by classic sumi-e ink paintings, the composition leaves generous open negative space along the left and center so your keyboard and mouse never obscure the focal artwork.",
    priceCents: 3999,
    images: [
      "/images/products/japandi/crimson-blossom-ronin/packshot.jpeg",
      "/images/products/japandi/crimson-blossom-ronin/lifestyle.jpeg",
      "/images/products/japandi/crimson-blossom-ronin/base-reveal.jpeg",
    ],
    features: [
      "Negative-space optimized layout keeping key visual art unobstructed",
      "Seamless flush edge stitching to eliminate forearm abrasion",
      "Textured natural rubber foundation prevents mat shifting during flick shots",
      "Machine washable on cold gentle cycle",
    ],
    materials: {
      surface: "Polyester micro-weave with thermal transfer sublimation",
      base: "Natural anti-slip rubber",
      edge: "Anti-fraying precision overlock stitching",
      thickness: "4.0mm",
    },
    dimensions: "900 × 400 × 4 mm",
    weightGrams: 750,
    variants: [
      {
        size: "Large Desk Mat (400×900mm)",
        dimensions: "900 × 400 mm",
        thickness: "4 mm",
        priceCents: 3999,
        weightGrams: 750,
      },
      {
        size: "Standard (200×240mm)",
        dimensions: "240 × 200 mm",
        thickness: "3 mm",
        priceCents: 2799,
        weightGrams: 220,
      },
    ],
    stock: 18,
    isBestSeller: false,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 22,
    reviews: [
      {
        id: "rev-jap-03",
        author: "Marcus T.",
        location: "Brisbane, QLD",
        rating: 5,
        date: "04 Nov 2026",
        title: "Cleanest aesthetic mat I have owned",
        content: "Pairs wonderfully with walnut desks and black wireless peripherals. High build quality all around.",
        isPlaceholderSample: true,
      },
    ],
  },

  // 3. Japandi: Mystic Crimson Hood
  {
    id: "prod-jap-03",
    sku: "JAP-MYSTIC-CRIMSON",
    slug: "mystic-crimson-hood",
    title: "Mystic Crimson Hood Japandi Desk Mat",
    tagline: "Atmospheric crimson silhouette against nocturnal twilight",
    collection: "japandi",
    collectionName: "Japandi Mats",
    description: "Rich dark crimson tones frame an enigmatic traveler standing at the edge of the wilderness. Micro-textured cloth provides balanced speed and stopping power for both competitive gamers and creative professionals.",
    story: "Designed for late-night desk mood lighting and RGB warmth, the deep reds provide stunning contrast under 3000K desk lamp illumination.",
    priceCents: 3999,
    images: [
      "/images/products/japandi/mystic-crimson-hood/packshot.jpeg",
      "/images/products/japandi/mystic-crimson-hood/lifestyle.jpeg",
      "/images/products/japandi/mystic-crimson-hood/base-reveal.jpeg",
    ],
    features: [
      "Deep colorfast dye sublimation prevents fading from sunlight exposure",
      "Low dynamic friction for rapid mouse glide, balanced static friction for stopping power",
      "Subtle low-profile edge border that remains below mouse sensor height",
    ],
    materials: {
      surface: "Balanced speed/control cloth weave",
      base: "Anti-skid textured natural tree rubber",
      edge: "High-density nylon perimeter stitch",
      thickness: "4.0mm",
    },
    dimensions: "900 × 400 × 4 mm",
    weightGrams: 750,
    variants: [
      {
        size: "Large Desk Mat (400×900mm)",
        dimensions: "900 × 400 mm",
        thickness: "4 mm",
        priceCents: 3999,
        weightGrams: 750,
      },
      {
        size: "Standard (200×240mm)",
        dimensions: "240 × 200 mm",
        thickness: "3 mm",
        priceCents: 2799,
        weightGrams: 220,
      },
    ],
    stock: 14,
    rating: 4.7,
    reviewCount: 16,
    reviews: [
      {
        id: "rev-jap-04",
        author: "Devon C.",
        location: "Adelaide, SA",
        rating: 5,
        date: "19 Oct 2026",
        title: "Rich deep colors in person",
        content: "Looks even better on my dark setup than in the photos. The mouse glides like glass without feeling slippery.",
        isPlaceholderSample: true,
      },
    ],
  },

  // 4. Japandi: Silver Phantom Swordsman
  {
    id: "prod-jap-04",
    sku: "JAP-SILVER-PHANTOM",
    slug: "silver-phantom-swordsman",
    title: "Silver Phantom Swordsman Japandi Desk Mat",
    tagline: "Monochrome swordmaster with subtle silver-mist depth",
    collection: "japandi",
    collectionName: "Japandi Mats",
    description: "A study in restrained monochrome tonality. The Silver Phantom Swordsman mat brings zen-like focus to your desktop with subtle charcoal gradients, silver-gray mist, and surgical blade precision.",
    story: "Designed for desk enthusiasts who prefer zero distractions and pure monochrome elegance. Blends seamlessly with silver aluminum, white, and stealth black setups.",
    priceCents: 3999,
    images: [
      "/images/products/japandi/silver-phantom-swordsman/packshot.jpeg",
      "/images/products/japandi/silver-phantom-swordsman/lifestyle.jpeg",
      "/images/products/japandi/silver-phantom-swordsman/base-reveal.jpeg",
    ],
    features: [
      "True neutral grayscale reproduction matches any keycap color scheme",
      "Extended 900x400mm dimensions fit full-size keyboard, mouse, and audio interface",
      "Tested for mouse DPI sensor tracking accuracy up to 30,000 DPI",
    ],
    materials: {
      surface: "Silky glide low-friction cloth",
      base: "Heavyweight non-slip rubber backing",
      edge: "Reinforced 360° micro-stitching",
      thickness: "4.0mm",
    },
    dimensions: "900 × 400 × 4 mm",
    weightGrams: 750,
    variants: [
      {
        size: "Large Desk Mat (400×900mm)",
        dimensions: "900 × 400 mm",
        thickness: "4 mm",
        priceCents: 3999,
        weightGrams: 750,
      },
      {
        size: "Standard (200×240mm)",
        dimensions: "240 × 200 mm",
        thickness: "3 mm",
        priceCents: 2799,
        weightGrams: 220,
      },
    ],
    stock: 21,
    badge: "Monochrome Pick",
    rating: 4.9,
    reviewCount: 29,
    reviews: [
      {
        id: "rev-jap-05",
        author: "Julian R.",
        location: "Perth, WA",
        rating: 5,
        date: "22 Oct 2026",
        title: "Cleanest stealth mat available in Australia",
        content: "Zero chemical smell out of the tube, laid flat in 10 minutes, and the texture is top tier.",
        isPlaceholderSample: true,
      },
    ],
  },

  // 5. Anime Series: 4-Panel Super Saiyan
  {
    id: "prod-ani-01",
    sku: "DBZ-4-PANEL-SS",
    slug: "4-panel-super-saiyan",
    title: "4-Panel Super Saiyan Anime Desk Mat",
    tagline: "Multi-panel golden warrior aura and evolution showcase",
    collection: "anime",
    collectionName: "Anime Series",
    description: "An anime-inspired collector design celebrating iconic golden warrior transformations across four cinematic action panels. High-saturation sublimation printing produces blazing yellow auras and lightning crackles on a smooth competition cloth surface.",
    story: "Created for fans who grew up watching epic afternoon battle episodes. Each panel represents an escalation of power, bordered by sleek dark battle lines.",
    priceCents: 4499, // $44.99 AUD
    images: [
      "/images/products/dbz/4-panel-super-saiyan/packshot.jpeg",
      "/images/products/dbz/4-panel-super-saiyan/lifestyle.jpeg",
      "/images/products/dbz/4-panel-super-saiyan/base-reveal.jpeg",
    ],
    features: [
      "Anime-inspired collector design with ultra-high color fidelity",
      "Vivid thermal sublimation ink bonded deep into cloth fibers",
      "Stitched anti-fray border colored to match the artwork edge",
      "Zero-slip natural rubber prevents mat creep during furious flick shots",
    ],
    materials: {
      surface: "Speed-tuned micro-woven polyester cloth",
      base: "Heavyweight 4mm natural vulcanized tree rubber",
      edge: "Double-stitched color-matched borders",
      thickness: "4.0mm",
    },
    dimensions: "900 × 400 × 4 mm",
    weightGrams: 750,
    variants: [
      {
        size: "Large Desk Mat (400×900mm)",
        dimensions: "900 × 400 mm",
        thickness: "4 mm",
        priceCents: 4499,
        weightGrams: 750,
      },
      {
        size: "Standard (200×240mm)",
        dimensions: "240 × 200 mm",
        thickness: "3 mm",
        priceCents: 2999,
        weightGrams: 220,
      },
    ],
    stock: 28,
    isBestSeller: true,
    isFeatured: true,
    badge: "Fan Favorite",
    rating: 5.0,
    reviewCount: 47,
    reviews: [
      {
        id: "rev-ani-01",
        author: "Cameron B.",
        location: "Geelong, VIC",
        rating: 5,
        date: "01 Nov 2026",
        title: "The colors pop so hard on my desk",
        content: "Honestly surprised how crisp the artwork looks in person. Super thick 4mm cushioning makes typing much quieter.",
        isPlaceholderSample: true,
      },
    ],
  },

  // 6. Anime Series: 5-Panel Z-Fighters
  {
    id: "prod-ani-02",
    sku: "DBZ-5-PANEL-ZF",
    slug: "5-panel-z-fighters",
    title: "5-Panel Z-Fighters Anime Desk Mat",
    tagline: "Defender ensemble across a dynamic 5-column panoramic montage",
    collection: "anime",
    collectionName: "Anime Series",
    description: "Celebrate the defenders of Earth with this wide-angle 5-panel composition. Showcases the iconic warrior lineup standing ready before planetary threats, rendered with clean cel-shading and electric contrast.",
    story: "Designed specifically to span wide 900mm desks, ensuring each character panel is clearly framed whether your keyboard sits center or left.",
    priceCents: 4499,
    images: [
      "/images/products/dbz/5-panel-z-fighters/packshot.jpeg",
      "/images/products/dbz/5-panel-z-fighters/lifestyle.jpeg",
      "/images/products/dbz/5-panel-z-fighters/base-reveal.jpeg",
    ],
    features: [
      "Anime-inspired collector design featuring multi-character lineup",
      "Precision weave optimized for optical sensor tracking speed and precision",
      "Dense rubber base absorbs mechanical switch vibrations",
      "Anti-curling edges unroll flat out of the packaging tube",
    ],
    materials: {
      surface: "Competition-grade micro-woven textile",
      base: "Natural anti-slip rubber",
      edge: "Sub-surface locked seam",
      thickness: "4.0mm",
    },
    dimensions: "900 × 400 × 4 mm",
    weightGrams: 750,
    variants: [
      {
        size: "Large Desk Mat (400×900mm)",
        dimensions: "900 × 400 mm",
        thickness: "4 mm",
        priceCents: 4499,
        weightGrams: 750,
      },
      {
        size: "Standard (200×240mm)",
        dimensions: "240 × 200 mm",
        thickness: "3 mm",
        priceCents: 2999,
        weightGrams: 220,
      },
    ],
    stock: 22,
    rating: 4.8,
    reviewCount: 31,
    reviews: [
      {
        id: "rev-ani-02",
        author: "Toby S.",
        location: "Hobart, TAS",
        rating: 5,
        date: "26 Oct 2026",
        title: "A must have for anime desk setups",
        content: "Awesome quality and arrived in 2 business days with Australia Post dispatch. Great stitched finish.",
        isPlaceholderSample: true,
      },
    ],
  },

  // 7. Anime Series: Fiery Goku & Bardock
  {
    id: "prod-ani-03",
    sku: "DBZ-GOKU-BARDOCK",
    slug: "fiery-goku-bardock",
    title: "Fiery Goku & Bardock Split Desk Mat",
    tagline: "Dual-generation warrior bloodline ignited in flame auras",
    collection: "anime",
    collectionName: "Anime Series",
    description: "Father and son united across time in a split fiery aura composition. Warm blazing oranges, deep nebula blacks, and striking character silhouettes make this one of our boldest desk surfaces.",
    story: "A dramatic tribute to warrior heritage and unbreakable resolve. The blazing fire effects draw the eye while the matte cloth finish eliminates glare under overhead lights.",
    priceCents: 4499,
    images: [
      "/images/products/dbz/fiery-goku-bardock/packshot.jpg",
      "/images/products/dbz/fiery-goku-bardock/lifestyle.jpeg",
      "/images/products/dbz/fiery-goku-bardock/base-reveal.jpeg",
    ],
    features: [
      "Anime-inspired collector design highlighting dual-generation legacy",
      "High thermal-stability ink resists mouse friction heating",
      "Tight micro-weave weave offers buttery glide with reliable stopping force",
      "Heavyweight natural rubber bottom stays anchored on glass desks",
    ],
    materials: {
      surface: "Ultra-fine woven polyester blend",
      base: "100% vulcanized natural tree rubber",
      edge: "360° anti-peeling lockstitch",
      thickness: "4.0mm",
    },
    dimensions: "900 × 400 × 4 mm",
    weightGrams: 750,
    variants: [
      {
        size: "Large Desk Mat (400×900mm)",
        dimensions: "900 × 400 mm",
        thickness: "4 mm",
        priceCents: 4499,
        weightGrams: 750,
      },
      {
        size: "Standard (200×240mm)",
        dimensions: "240 × 200 mm",
        thickness: "3 mm",
        priceCents: 2999,
        weightGrams: 220,
      },
    ],
    stock: 12,
    badge: "Low Stock",
    rating: 4.9,
    reviewCount: 35,
    reviews: [
      {
        id: "rev-ani-03",
        author: "Jayden M.",
        location: "Sydney, NSW",
        rating: 5,
        date: "12 Oct 2026",
        title: "The split art is legendary",
        content: "Fiery colors are crazy vibrant. Mat feels super premium and doesn't slide an inch even during high-intensity games.",
        isPlaceholderSample: true,
      },
    ],
  },

  // 8. Anime Series: Kid Goku & Shenron
  {
    id: "prod-ani-04",
    sku: "DBZ-KID-GOKU-SHENRON",
    slug: "kid-goku-shenron",
    title: "Kid Goku & Shenron Dragon Desk Mat",
    tagline: "Nostalgic golden-era journey alongside the celestial dragon",
    collection: "anime",
    collectionName: "Anime Series",
    description: "Take your desk back to where the grand adventure began. Features young Goku clutching the power pole flying high beside the sinuous coils of the Eternal Dragon Shenron in clouds of mystery.",
    story: "An ode to classic 80s anime art and pure wanderlust. Soft emerald scales and warm clouds provide a nostalgic backdrop for any work or gaming station.",
    priceCents: 4499,
    images: [
      "/images/products/dbz/kid-goku-shenron/packshot.jpeg",
      "/images/products/dbz/kid-goku-shenron/lifestyle.jpeg",
      "/images/products/dbz/kid-goku-shenron/base-reveal.jpeg",
    ],
    features: [
      "Anime-inspired collector design celebrating original adventure lore",
      "Gentle emerald and gold color palette easy on the eyes during long hours",
      "Stitched perimeter prevents fraying and mouse wire snagging",
      "Resilient rubber core dampens desk acoustics",
    ],
    materials: {
      surface: "Optical grade micro-texture cloth",
      base: "Anti-slip natural rubber",
      edge: "Sub-surface precision stitch",
      thickness: "4.0mm",
    },
    dimensions: "900 × 400 × 4 mm",
    weightGrams: 750,
    variants: [
      {
        size: "Large Desk Mat (400×900mm)",
        dimensions: "900 × 400 mm",
        thickness: "4 mm",
        priceCents: 4499,
        weightGrams: 750,
      },
      {
        size: "Standard (200×240mm)",
        dimensions: "240 × 200 mm",
        thickness: "3 mm",
        priceCents: 2999,
        weightGrams: 220,
      },
    ],
    stock: 19,
    rating: 4.8,
    reviewCount: 26,
    reviews: [
      {
        id: "rev-ani-04",
        author: "Nicholas P.",
        location: "Newcastle, NSW",
        rating: 5,
        date: "03 Nov 2026",
        title: "Pure nostalgia for my setup",
        content: "Love the Shenron details. Surface feels smooth and mouse glides effortlessly. Dispatch was very quick.",
        isPlaceholderSample: true,
      },
    ],
  },

  // 9. 3D Ergonomic: Assassin Reze
  {
    id: "prod-3d-01",
    sku: "3D-ASSASSIN-REZE",
    slug: "assassin-reze",
    title: "Assassin Reze Ergonomic 3D Mousepad",
    tagline: "Medical-grade silicone gel wrist support with explosive anime art",
    collection: "3d",
    collectionName: "3D Ergonomic",
    description: "Engineered specifically to alleviate wrist compression during repetitive mouse work and gaming. Features a contoured 32mm medical-grade silicone gel mound wrapped in soft elastic lycra fabric, preventing carpal tunnel strain.",
    story: "Built for gamers and designers who refuse to compromise between ergonomic orthopedic support and expressive anime desk art.",
    priceCents: 3499, // $34.99 AUD
    images: [
      "/images/products/3d/assassin-reze.avif",
    ],
    features: [
      "Orthopedic memory-gel contour supports wrist in neutral anatomical angle",
      "Breathable four-way stretch lycra cloth prevents palm perspiration",
      "Semi-adhesive non-slip polyurethane base locks firmly to desk surface",
      "Alleviates pressure on median nerve to prevent repetitive strain injuries",
    ],
    materials: {
      surface: "Silky 4-way stretch breathable lycra fabric",
      base: "High-adhesion polyurethane non-skid base",
      edge: "Heat-sealed seamless ergonomic perimeter",
      thickness: "32mm silicone gel wrist mound; 4mm pad base",
    },
    dimensions: "215 × 260 × 32 mm",
    weightGrams: 320,
    variants: [
      {
        size: "Ergonomic Contour (215×260mm)",
        dimensions: "215 × 260 × 32 mm",
        thickness: "32 mm gel support",
        priceCents: 3499,
        weightGrams: 320,
      },
    ],
    stock: 20,
    isBestSeller: true,
    isFeatured: true,
    badge: "Ergo Relief",
    rating: 4.9,
    reviewCount: 42,
    reviews: [
      {
        id: "rev-3d-01",
        author: "Mitchell K.",
        location: "Melbourne, VIC",
        rating: 5,
        date: "18 Oct 2026",
        title: "Actually fixed my wrist ache",
        content: "I work 8 hours coding and play games at night. The silicone cushion has just the right amount of bounce and firm support.",
        isPlaceholderSample: true,
      },
    ],
  },

  // 10. 3D Ergonomic: Blood Fiend Power
  {
    id: "prod-3d-02",
    sku: "3D-BLOOD-FIEND-POWER",
    slug: "blood-fiend-power",
    title: "Blood Fiend Power Ergonomic 3D Mousepad",
    tagline: "High-bounce ergonomic silicone support featuring the chaotic Blood Fiend",
    collection: "3d",
    collectionName: "3D Ergonomic",
    description: "Designed for chaotic energy and pure comfort. The anatomical silicone wrist rest absorbs shock and cradles the heel of your hand, while the ultra-smooth tracking zone allows effortless mouse control.",
    story: "Featuring bold crimson horns and spirited expression, this pad brings punchy personality to your desk while keeping wrist stiffness at bay.",
    priceCents: 3499,
    images: [
      "/images/products/3d/blood-fiend-power.avif",
    ],
    features: [
      "High-resilience silicone gel core never deflates or deforms over time",
      "Non-slip PU bottom sticks firmly to wood, melamine, and glass",
      "Ultra-fine knit surface compatible with all optical gaming sensors",
      "Ergonomically tested to reduce wrist flexure angle by 24%",
    ],
    materials: {
      surface: "Premium micro-knit lycra fabric",
      base: "Clear-coat non-slip polyurethane grip",
      edge: "Thermal-molded edge seal",
      thickness: "32mm wrist support",
    },
    dimensions: "215 × 260 × 32 mm",
    weightGrams: 320,
    variants: [
      {
        size: "Ergonomic Contour (215×260mm)",
        dimensions: "215 × 260 × 32 mm",
        thickness: "32 mm gel support",
        priceCents: 3499,
        weightGrams: 320,
      },
    ],
    stock: 16,
    rating: 4.7,
    reviewCount: 28,
    reviews: [
      {
        id: "rev-3d-02",
        author: "Danielle L.",
        location: "Gold Coast, QLD",
        rating: 5,
        date: "29 Oct 2026",
        title: "Super comfortable wrist rest",
        content: "The gel feels amazing and doesn't get hot or sticky. Print is super vibrant.",
        isPlaceholderSample: true,
      },
    ],
  },

  // 11. 3D Ergonomic: Love Warrior Mitsuri
  {
    id: "prod-3d-03",
    sku: "3D-LOVE-WARRIOR-MITSURI",
    slug: "love-warrior-mitsuri",
    title: "Love Warrior Mitsuri Ergonomic 3D Mousepad",
    tagline: "Gentle dual-mound memory gel cushion with pastel warrior tones",
    collection: "3d",
    collectionName: "3D Ergonomic",
    description: "Soft pink and mint green pastels meet heavy-duty orthopedic support. The anatomical twin-crest gel mound evenly distributes pressure away from sensitive nerve clusters in your wrist.",
    story: "Created for desk setups that favor softer pastel tones and cheerful aesthetics without sacrificing high-performance mouse tracking and joint health.",
    priceCents: 3499,
    images: [
      "/images/products/3d/love-warrior-mitsuri.avif",
    ],
    features: [
      "Twin-crest anatomical silicone cushion for centered wrist positioning",
      "Silk-smooth surface ensures low friction for sensitive mouse sensors",
      "Durable heat-pressed perimeter prevents edge separation",
      "Easy to clean with damp cloth and mild soap",
    ],
    materials: {
      surface: "Hypoallergenic elastic fabric",
      base: "High-grade non-skid polyurethane",
      edge: "Seamless comfort edge",
      thickness: "32mm silicone cushion",
    },
    dimensions: "215 × 260 × 32 mm",
    weightGrams: 320,
    variants: [
      {
        size: "Ergonomic Contour (215×260mm)",
        dimensions: "215 × 260 × 32 mm",
        thickness: "32 mm gel support",
        priceCents: 3499,
        weightGrams: 320,
      },
    ],
    stock: 22,
    badge: "Pastel Pick",
    rating: 4.9,
    reviewCount: 34,
    reviews: [
      {
        id: "rev-3d-03",
        author: "Emily Z.",
        location: "Sydney, NSW",
        rating: 5,
        date: "02 Nov 2026",
        title: "Very soft and supportive",
        content: "Love the colors and my wrist doesn't ache after an 8 hour work shift. Highly recommended.",
        isPlaceholderSample: true,
      },
    ],
  },

  // 12. 3D Ergonomic: Sunlit Navigator Nami
  {
    id: "prod-3d-04",
    sku: "3D-SUNLIT-NAVIGATOR-NAMI",
    slug: "sunlit-navigator-nami",
    title: "Sunlit Navigator Nami Ergonomic 3D Mousepad",
    tagline: "Vibrant maritime colors and medical-grade silicone cushioning",
    collection: "3d",
    collectionName: "3D Ergonomic",
    description: "Set sail for ergonomic comfort. Features high-resilience medical-grade silicone gel shaped to support your wrist during intense gaming or long work sessions, wrapped in a high-elasticity cover.",
    story: "Inspired by seafaring adventures and bright summer horizons. Designed to keep your hand relaxed and centered on your mouse all day long.",
    priceCents: 3499,
    images: [
      "/images/products/3d/sunlit-navigator-nami.avif",
    ],
    features: [
      "Pure medical silicone gel formulation with zero bad odors",
      "Natural anti-skid polyurethane bottom sticks securely to any surface",
      "Smooth fabric tracking zone for high-precision cursor control",
      "Helps prevent tendon strain and fatigue",
    ],
    materials: {
      surface: "Breathable elastic fabric",
      base: "Non-slip polyurethane backing",
      edge: "Fused ergonomic seam",
      thickness: "32mm silicone gel mound",
    },
    dimensions: "215 × 260 × 32 mm",
    weightGrams: 320,
    variants: [
      {
        size: "Ergonomic Contour (215×260mm)",
        dimensions: "215 × 260 × 32 mm",
        thickness: "32 mm gel support",
        priceCents: 3499,
        weightGrams: 320,
      },
    ],
    stock: 17,
    rating: 4.8,
    reviewCount: 27,
    reviews: [
      {
        id: "rev-3d-04",
        author: "Alex C.",
        location: "Canberra, ACT",
        rating: 5,
        date: "24 Oct 2026",
        title: "Great wrist rest and fast delivery",
        content: "Came packed well from Victoria in 2 days. The pad itself is comfy and mouse tracking is great.",
        isPlaceholderSample: true,
      },
    ],
  },
];

// ==========================================
// Small Resilient Data Access Layer
// (No direct DB calls in UI components!)
// ==========================================

export async function getProducts(options?: {
  collection?: string;
  size?: string;
  search?: string;
  sort?: "featured" | "price-asc" | "price-desc" | "newest" | "rating";
  limit?: number;
}): Promise<Product[]> {
  try {
    let list = [...PRODUCTS];

    if (options?.collection && options.collection !== "all") {
      const target = options.collection.toLowerCase();
      // Support aliases (e.g. 'dbz' maps to 'anime', '3d-ergonomic' maps to '3d')
      const normalizedCollection =
        target === "dbz" ? "anime" : target === "3d-ergonomic" ? "3d" : target;
      list = list.filter((p) => p.collection === normalizedCollection);
    }

    if (options?.size && options.size !== "all") {
      const s = options.size.toLowerCase();
      list = list.filter((p) =>
        p.variants.some((v) => v.size.toLowerCase().includes(s))
      );
    }

    if (options?.search && options.search.trim() !== "") {
      const q = options.search.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.collectionName.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      );
    }

    if (options?.sort) {
      switch (options.sort) {
        case "price-asc":
          list.sort((a, b) => a.priceCents - b.priceCents);
          break;
        case "price-desc":
          list.sort((a, b) => b.priceCents - a.priceCents);
          break;
        case "rating":
          list.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          list.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
        case "featured":
        default:
          list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
          break;
      }
    }

    if (typeof options?.limit === "number") {
      list = list.slice(0, options.limit);
    }

    return list;
  } catch (error) {
    console.error("Data access error in getProducts:", error);
    // Fallback: Always return in-memory static products so UI never fails
    return PRODUCTS;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const found = PRODUCTS.find((p) => p.slug === slug);
    return found || null;
  } catch (error) {
    console.error("Data access error in getProductBySlug:", error);
    return PRODUCTS.find((p) => p.slug === slug) || null;
  }
}

export async function getByCollection(collectionSlug: string): Promise<Product[]> {
  try {
    const target = collectionSlug.toLowerCase();
    const normalized =
      target === "dbz" ? "anime" : target === "3d-ergonomic" ? "3d" : target;
    return PRODUCTS.filter((p) => p.collection === normalized);
  } catch (error) {
    console.error("Data access error in getByCollection:", error);
    return PRODUCTS.filter((p) => p.collection === collectionSlug);
  }
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.isFeatured).slice(0, limit);
}

export async function getBestSellers(limit = 4): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.isBestSeller).slice(0, limit);
}

export async function getRelatedProducts(
  currentSlug: string,
  limit = 4
): Promise<Product[]> {
  const current = PRODUCTS.find((p) => p.slug === currentSlug);
  if (!current) return PRODUCTS.slice(0, limit);

  // Prioritize same collection first, then other products
  const sameCollection = PRODUCTS.filter(
    (p) => p.slug !== currentSlug && p.collection === current.collection
  );
  const otherCollection = PRODUCTS.filter(
    (p) => p.slug !== currentSlug && p.collection !== current.collection
  );

  return [...sameCollection, ...otherCollection].slice(0, limit);
}

export function formatAud(cents: number): string {
  return `$${(cents / 100).toFixed(2)} AUD`;
}
