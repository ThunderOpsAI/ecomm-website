import React from "react";
import Link from "next/link";
import {
  Truck,
  ShieldCheck,
  ArrowRight,
  Layers,
  Star,
} from "lucide-react";
import {
  getProducts,
  getBestSellers,
  getFeaturedProducts,
  formatAud,
} from "@/src/data/products";
import { ProductCard } from "@/components/product-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { CustomerReviews } from "@/components/customer-reviews";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const revalidate = 60;

export default async function HomePage() {
  const [allProducts, bestSellers, featured] = await Promise.all([
    getProducts(),
    getBestSellers(4),
    getFeaturedProducts(3),
  ]);

  const heroFeaturedProduct = featured[0] || allProducts[0];

  return (
    <div className="space-y-0">
      {/* 1. Full-Bleed Dark Ink Hero with Grain & Radial Vermilion Glow */}
      <section className="relative overflow-hidden bg-ink text-cream pt-12 sm:pt-20 pb-20 sm:pb-28 border-b border-border-dark bg-grain-dark">
        {/* Subtle radial vermilion accent glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-accent/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 w-[400px] h-[300px] bg-accent-amber/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xs bg-ink-subtle border border-border-dark text-xs font-mono tracking-widest text-cream/90 shadow-2xs">
                <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
                <span>HAND-FINISHED IN AUSTRALIA • DISPATCHED FROM WANGARATTA, VIC</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-cream leading-[1.05] text-balance">
                Desk setup perfection,{" "}
                <span className="text-accent underline decoration-accent/30 underline-offset-8">
                  engineered for speed
                </span>
                .
              </h1>

              <p className="text-base sm:text-lg text-cream/70 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
                Artisan micro-woven control cloth, flush 360° lockstitch borders, and 4mm heavyweight
                natural vulcanized rubber foundations. Minimalist Japandi restraint meets competitive precision.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
                <Link href="/category/japandi" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    <span>Explore Japandi Mats</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>

                <Link href="/category/anime" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto bg-ink-subtle text-cream border-border-dark hover:bg-ink-muted hover:border-cream/30"
                  >
                    <span>Anime Series</span>
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-cream/60 font-mono">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-accent" />
                  <span>Australia Post Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span>30-Day Anti-Slip Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent-amber fill-accent-amber" />
                  <span className="text-cream font-medium">4.9 / 5 Rating</span>
                </div>
              </div>
            </div>

            {/* Right Hero Spotlight Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl bg-ink-subtle border border-border-dark p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
                <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-ink-muted border border-border-dark">
                  <img
                    src={heroFeaturedProduct.images[0]}
                    alt={heroFeaturedProduct.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="vermilion" size="sm" className="shadow-xs">
                      Featured Design
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 rounded-xs text-xs font-mono font-bold bg-ink/90 backdrop-blur-md text-cream border border-border-dark shadow-2xs">
                      {formatAud(heroFeaturedProduct.priceCents)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-accent-amber uppercase tracking-widest">
                      {heroFeaturedProduct.collectionName}
                    </span>
                    <h3 className="font-display text-lg font-bold text-cream mt-0.5">
                      {heroFeaturedProduct.title}
                    </h3>
                  </div>
                  <Link href={`/products/${heroFeaturedProduct.slug}`}>
                    <Button variant="primary" size="sm">
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CSS-Only Marquee Trust Strip */}
      <div className="bg-ink-subtle border-b border-border-dark py-3.5 overflow-hidden text-cream/80 text-xs font-mono uppercase tracking-[0.2em]">
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
          <div className="flex gap-12 items-center shrink-0">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Free Australian Shipping Over $60 AUD
            </span>
            <span className="text-cream/30">•</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Dispatched from Wangaratta, VIC
            </span>
            <span className="text-cream/30">•</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Flush 360° Anti-Fray Lockstitch
            </span>
            <span className="text-cream/30">•</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              100% Natural Vulcanized Tree Rubber
            </span>
            <span className="text-cream/30">•</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              30-Day Anti-Slip Desk Guarantee
            </span>
            <span className="text-cream/30">•</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Zero Desk Creep on Glass or Wood
            </span>
            <span className="text-cream/30">•</span>
          </div>

          {/* Duplicated for seamless loop */}
          <div className="flex gap-12 items-center shrink-0" aria-hidden="true">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Free Australian Shipping Over $60 AUD
            </span>
            <span className="text-cream/30">•</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Dispatched from Wangaratta, VIC
            </span>
            <span className="text-cream/30">•</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Flush 360° Anti-Fray Lockstitch
            </span>
            <span className="text-cream/30">•</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              100% Natural Vulcanized Tree Rubber
            </span>
            <span className="text-cream/30">•</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              30-Day Anti-Slip Desk Guarantee
            </span>
            <span className="text-cream/30">•</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Zero Desk Creep on Glass or Wood
            </span>
            <span className="text-cream/30">•</span>
          </div>
        </div>
      </div>

      {/* 3. Alternating Rhythm: Cream Section — Asymmetric Bento Grid Collections */}
      <section className="bg-cream py-16 sm:py-24 border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <SectionHeader
              eyebrow="Curated Collections"
              title="Select Your Desk Aesthetic"
              description="Each series is balanced for surface friction, edge comfort, and distinct visual mood."
            />
            <Link
              href="/category/japandi"
              className="text-xs font-mono font-semibold text-accent hover:text-accent-hover uppercase tracking-widest flex items-center gap-1.5 transition-colors"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Bento Tile 1: Japandi (Hero Feature, 7 cols) */}
            <Link
              href="/category/japandi"
              className="group relative lg:col-span-7 rounded-2xl overflow-hidden bg-ink border border-border-subtle p-7 sm:p-10 flex flex-col justify-end min-h-[380px] lg:min-h-[440px] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src="/images/products/japandi/blood-moon-pagoda/lifestyle.jpeg"
                  alt="Japandi Desk Mats"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Per-collection tinted hover overlay: Ink-wash slate */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent group-hover:bg-slate-950/30 transition-colors duration-500" />
              </div>

              <div className="relative z-10 space-y-2.5">
                <div className="flex items-center gap-2">
                  <Badge variant="dark" size="sm">
                    Signature Series
                  </Badge>
                  <span className="text-[11px] font-mono text-cream/70">4 Designs Available</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-cream group-hover:text-accent-amber transition-colors">
                  Japandi Series
                </h3>
                <p className="text-xs sm:text-sm text-cream/80 max-w-lg leading-relaxed font-sans">
                  Japanese sumi-e ink-wash motifs, muted earthen monochrome palettes, and tranquil
                  desktop harmony designed for distraction-free focus.
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-mono font-bold text-accent-amber tracking-wider">
                  <span>DISCOVER JAPANDI</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Right Column (5 cols, split in two vertical tiles) */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-6">
              {/* Bento Tile 2: Anime Series (Energetic Orange Tint) */}
              <Link
                href="/category/anime"
                className="group relative rounded-2xl overflow-hidden bg-ink border border-border-subtle p-6 sm:p-7 flex flex-col justify-end min-h-[220px] lg:min-h-[205px] shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src="/images/products/dbz/4-panel-super-saiyan/lifestyle.jpeg"
                    alt="Anime Series Desk Mats"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Tinted overlay: Warm vermilion/orange on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-transparent group-hover:bg-orange-950/30 transition-colors duration-500" />
                </div>

                <div className="relative z-10 space-y-1.5">
                  <Badge variant="vermilion" size="sm">
                    Fan Favorite
                  </Badge>
                  <h3 className="font-display text-2xl font-bold text-cream group-hover:text-accent transition-colors">
                    Anime Series
                  </h3>
                  <p className="text-xs text-cream/80 line-clamp-2 leading-relaxed">
                    Unapologetic aura bursts, multi-panel Saiyan compositions, and legendary showdowns.
                  </p>
                  <div className="pt-1 flex items-center gap-1 text-xs font-mono font-bold text-accent">
                    <span>EXPLORE ANIME</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Bento Tile 3: 3D Ergonomic (Soft Teal Tint) */}
              <Link
                href="/category/3d"
                className="group relative rounded-2xl overflow-hidden bg-ink border border-border-subtle p-6 sm:p-7 flex flex-col justify-end min-h-[220px] lg:min-h-[205px] shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src="/images/products/3d/assassin-reze.avif"
                    alt="3D Ergonomic Mousepads"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Tinted overlay: Soft teal/cyan on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-transparent group-hover:bg-teal-950/30 transition-colors duration-500" />
                </div>

                <div className="relative z-10 space-y-1.5">
                  <Badge variant="amber" size="sm">
                    Wrist Relief
                  </Badge>
                  <h3 className="font-display text-2xl font-bold text-cream group-hover:text-teal-300 transition-colors">
                    3D Ergonomic
                  </h3>
                  <p className="text-xs text-cream/80 line-clamp-2 leading-relaxed">
                    Medical-grade silicone gel mounds alleviating carpal compression during long shifts.
                  </p>
                  <div className="pt-1 flex items-center gap-1 text-xs font-mono font-bold text-accent-amber">
                    <span>EXPLORE 3D PADS</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Alternating Rhythm: Dark Ink Band — Best Sellers (Product cards pop) */}
      <section
        id="bestsellers"
        className="bg-ink text-cream py-16 sm:py-24 border-b border-border-dark bg-grain-dark"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <SectionHeader
              theme="dark"
              eyebrow="Community Favorites"
              title="Australian Best Sellers"
              description="The most acclaimed desk mats chosen by gamers, designers, and remote developers across Australia."
            />
            <Link
              href="/category/japandi"
              className="text-xs font-mono font-semibold text-accent-amber hover:underline uppercase tracking-widest flex items-center gap-1.5 transition-colors"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} dark={true} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Alternating Rhythm: Cream Section — Build Quality & Macro Diagram */}
      <section className="bg-cream py-16 sm:py-24 border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            align="center"
            eyebrow="Precision Engineering"
            title="Anatomy of a MatStudio Desk Surface"
            description="Every millimeter is calculated to deliver smooth mouse tracking, deadened keyboard acoustics, and years of anti-fray durability."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Interactive/Visual Layer Breakdown */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-5 rounded-xl bg-surface border border-border-subtle shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-sm bg-accent/10 text-accent font-mono font-bold text-xs flex items-center justify-center">
                      01
                    </span>
                    <h4 className="font-bold text-text-primary text-base font-display">
                      Micro-Woven Textile Surface
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-text-muted">Top Layer</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed pl-9.5">
                  Ultra-dense thread weave with calibrated static and dynamic friction. Optical sensors
                  read micro-adjustments with 1:1 pixel accuracy whether you play on 400 or 16,000 DPI.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface border border-border-subtle shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-sm bg-accent/10 text-accent font-mono font-bold text-xs flex items-center justify-center">
                      02
                    </span>
                    <h4 className="font-bold text-text-primary text-base font-display">
                      Flush 360° Anti-Fray Perimeter
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-text-muted">Border</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed pl-9.5">
                  Sub-surface locked 5-thread stitching sits lower than the mat surface to prevent wrist
                  rubbing and eliminate the border peeling common on cheap mouse pads.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface border border-border-subtle shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-sm bg-accent/10 text-accent font-mono font-bold text-xs flex items-center justify-center">
                      03
                    </span>
                    <h4 className="font-bold text-text-primary text-base font-display">
                      4mm High-Density Rubber Core
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-text-muted">Mid-Layer</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed pl-9.5">
                  Absorbs desk vibrations and mechanical switch clacks. Provides comfortable arm cushioning
                  during 10-hour work days and competitive gaming sessions.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface border border-border-subtle shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-sm bg-accent/10 text-accent font-mono font-bold text-xs flex items-center justify-center">
                      04
                    </span>
                    <h4 className="font-bold text-text-primary text-base font-display">
                      Herringbone Natural Tree Rubber
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-text-muted">Base Layer</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed pl-9.5">
                  100% vulcanized natural tree rubber with micro-groove herringbone grip. Never creeps or
                  slides across glass, varnished timber, laminate, or metal desks.
                </p>
              </div>
            </div>

            {/* Right: Technical Diagram Card */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl bg-surface border border-border-subtle p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-accent" />
                    <span className="text-sm font-bold font-display text-text-primary">
                      MatStudio Build Spec
                    </span>
                  </div>
                  <Badge variant="neutral" size="sm">
                    ISO Standard Tested
                  </Badge>
                </div>

                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-muted border border-border-subtle">
                  <img
                    src="/images/products/dbz/4-panel-super-saiyan/base-reveal.jpeg"
                    alt="Natural rubber base and precision stitching macro reveal"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-5">
                    <p className="text-xs font-mono text-white font-semibold tracking-wider">
                      MACRO SPECIFICATION REVEAL
                    </p>
                    <p className="text-[11px] text-cream/80">
                      Vulcanized natural rubber foundation featuring 360° lockstitch perimeter.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-3 rounded-lg bg-cream border border-border-subtle">
                    <span className="text-xs text-text-muted block">Thickness</span>
                    <span className="font-mono font-bold text-text-primary text-sm">4.0 mm</span>
                  </div>
                  <div className="p-3 rounded-lg bg-cream border border-border-subtle">
                    <span className="text-xs text-text-muted block">Base Grip</span>
                    <span className="font-mono font-bold text-text-primary text-sm">100% Rubber</span>
                  </div>
                  <div className="p-3 rounded-lg bg-cream border border-border-subtle">
                    <span className="text-xs text-text-muted block">Edge Type</span>
                    <span className="font-mono font-bold text-text-primary text-sm">Flush Stitch</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Customer Reviews Component */}
      <CustomerReviews />

      {/* 7. Community Gallery Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-semibold text-accent uppercase tracking-widest">
              Community Setups
            </span>
            <h3 className="font-display text-2xl font-bold text-text-primary mt-1">
              #MatStudioDesk on Instagram
            </h3>
          </div>
          <span className="text-xs font-mono text-text-muted">Tag @MatStudio to be featured</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="aspect-square rounded-xl overflow-hidden bg-surface border border-border-subtle shadow-2xs group">
            <img
              src="/images/products/japandi/crimson-blossom-ronin/lifestyle.jpeg"
              alt="MatStudio desk setup"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-surface border border-border-subtle shadow-2xs group">
            <img
              src="/images/products/dbz/fiery-goku-bardock/lifestyle.jpeg"
              alt="MatStudio desk setup"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-surface border border-border-subtle shadow-2xs group">
            <img
              src="/images/products/japandi/silver-phantom-swordsman/lifestyle.jpeg"
              alt="MatStudio desk setup"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-surface border border-border-subtle shadow-2xs group">
            <img
              src="/images/products/dbz/kid-goku-shenron/lifestyle.jpeg"
              alt="MatStudio desk setup"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* 8. Feature Card Newsletter Signup */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative rounded-3xl bg-ink text-cream border border-border-dark p-8 sm:p-14 overflow-hidden shadow-xl bg-grain-dark">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto text-center space-y-4 relative z-10">
            <Badge variant="vermilion" size="md">
              VIP Drop Access
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cream">
              Get 10% Off Your First Desk Mat
            </h2>
            <p className="text-sm sm:text-base text-cream/70 leading-relaxed font-sans">
              Subscribe to the MatStudio inner circle for exclusive seasonal drop alerts, collector print
              previews, and secret VIP desk discount codes.
            </p>

            <div className="pt-2">
              <NewsletterForm />
            </div>
            <p className="text-[11px] font-mono text-cream/50">
              Zero spam. Unsubscribe anytime with 1 click. Dispatched from Wangaratta, VIC.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
