import React from "react";
import Link from "next/link";
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Layers,
  Star,
  Award,
} from "lucide-react";
import {
  getProducts,
  getBestSellers,
  getFeaturedProducts,
  formatAud,
} from "@/src/data/products";
import { ProductCard } from "@/components/product-card";
import { NewsletterForm } from "@/components/newsletter-form";

export const revalidate = 60;

export default async function HomePage() {
  const [allProducts, bestSellers, featured] = await Promise.all([
    getProducts(),
    getBestSellers(4),
    getFeaturedProducts(3),
  ]);

  const heroFeaturedProduct = featured[0] || allProducts[0];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Full-Bleed Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f5f5f0] via-[#fafaf7] to-[#fafaf8] pt-10 sm:pt-16 pb-16 sm:pb-24 border-b border-[#e5e5dc]">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#d9381e]/8 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e5e5dc] text-xs font-semibold text-[#14161b] shadow-2xs">
                <span className="flex h-2 w-2 rounded-full bg-[#d9381e]"></span>
                <span>Crafted in Australia • Dispatched from Wangaratta, VIC</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#14161b] leading-[1.1] text-balance">
                Desk setup perfection,{" "}
                <span className="bg-gradient-to-r from-[#d9381e] via-[#e25333] to-amber-600 bg-clip-text text-transparent">
                  engineered for speed
                </span>
                .
              </h1>

              <p className="text-base sm:text-lg text-[#555a68] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Premium micro-woven cloth surfaces, flush 360° anti-fray stitched borders, and
                heavyweight natural rubber foundations. Designed for competitive gamers and aesthetic desks.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/category/japandi"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#d9381e] hover:bg-[#be2e17] active:scale-98 text-white font-bold text-sm shadow-xs shadow-[#d9381e]/30 flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/category/anime"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-[#e5e5dc] bg-white hover:bg-[#f2f2ed] text-[#14161b] font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-2xs"
                >
                  <span>Anime Collector Series</span>
                </Link>
              </div>

              {/* Micro Trust Stats */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#555a68]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#d9381e]" />
                  <span>Aus Post tracking on all orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#d9381e]" />
                  <span>30-Day Anti-Slip Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-medium text-[#14161b]">4.9 / 5 Average Rating</span>
                </div>
              </div>
            </div>

            {/* Right Hero Spotlight Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl bg-white border border-[#e5e5dc] p-4 sm:p-5 shadow-[0_12px_36px_rgba(0,0,0,0.06)] group">
                <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-[#f4f4ee] border border-[#e5e5dc]">
                  <img
                    src={heroFeaturedProduct.images[0]}
                    alt={heroFeaturedProduct.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#d9381e] text-white shadow-xs">
                      Featured Design
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-white/95 backdrop-blur-md text-[#14161b] border border-[#e5e5dc] shadow-2xs">
                      {formatAud(heroFeaturedProduct.priceCents)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-[#d9381e] uppercase tracking-wider">
                      {heroFeaturedProduct.collectionName}
                    </span>
                    <h3 className="text-base font-bold text-[#14161b]">
                      {heroFeaturedProduct.title}
                    </h3>
                  </div>
                  <Link
                    href={`/products/${heroFeaturedProduct.slug}`}
                    className="px-4 py-2 rounded-xl bg-[#d9381e] hover:bg-[#be2e17] text-xs font-bold text-white transition-colors flex items-center gap-1 shadow-2xs"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white border border-[#e5e5dc] p-6 sm:p-8 shadow-2xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#d9381e]/10 border border-[#d9381e]/15 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 text-[#d9381e]" />
              </div>
              <div>
                <h4 className="font-bold text-[#14161b] text-sm">Australia Post Dispatch</h4>
                <p className="text-xs text-[#555a68] mt-0.5">Dispatched from Wangaratta VIC</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#d9381e]/10 border border-[#d9381e]/15 flex items-center justify-center shrink-0">
                <RotateCcw className="w-6 h-6 text-[#d9381e]" />
              </div>
              <div>
                <h4 className="font-bold text-[#14161b] text-sm">30-Day Desk Trial</h4>
                <p className="text-xs text-[#555a68] mt-0.5">100% money-back guarantee</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#d9381e]/10 border border-[#d9381e]/15 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#d9381e]" />
              </div>
              <div>
                <h4 className="font-bold text-[#14161b] text-sm">Anti-Slip Tree Rubber</h4>
                <p className="text-xs text-[#555a68] mt-0.5">Never shifts on glass or wood</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#d9381e]/10 border border-[#d9381e]/15 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-[#d9381e]" />
              </div>
              <div>
                <h4 className="font-bold text-[#14161b] text-sm">360° Anti-Fray Edges</h4>
                <p className="text-xs text-[#555a68] mt-0.5">Zero wrist abrasion stitching</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shop by Collection (3 Large Visual Tiles) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-[#d9381e] uppercase tracking-wider">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14161b] mt-1">
              Select Your Desk Aesthetic
            </h2>
          </div>
          <Link
            href="/category/japandi"
            className="text-xs sm:text-sm font-semibold text-[#d9381e] hover:text-[#be2e17] flex items-center gap-1 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tile 1: Japandi */}
          <Link
            href="/category/japandi"
            className="group relative rounded-3xl overflow-hidden bg-stone-900 border border-[#e5e5dc] p-6 sm:p-8 flex flex-col justify-end min-h-[360px] hover:border-[#d9381e]/50 transition-all duration-300 shadow-md"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="/images/products/japandi/blood-moon-pagoda/lifestyle.jpeg"
                alt="Japandi Desk Mats"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/45 to-transparent" />
            </div>

            <div className="relative z-10 space-y-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-[#14161b] border border-white/20 inline-block">
                4 Designs Available
              </span>
              <h3 className="text-2xl font-extrabold text-white group-hover:text-amber-200 transition-colors">
                Japandi Mats
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                Japanese ink-wash aesthetics, muted monochrome tones, and tranquil desktop harmony.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <span>Explore Japandi Collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Tile 2: Anime Series */}
          <Link
            href="/category/anime"
            className="group relative rounded-3xl overflow-hidden bg-stone-900 border border-[#e5e5dc] p-6 sm:p-8 flex flex-col justify-end min-h-[360px] hover:border-[#d9381e]/50 transition-all duration-300 shadow-md"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="/images/products/dbz/4-panel-super-saiyan/lifestyle.jpeg"
                alt="Anime Series Desk Mats"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/45 to-transparent" />
            </div>

            <div className="relative z-10 space-y-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#d9381e] text-white shadow-xs inline-block">
                High-Energy • Fan Favorite
              </span>
              <h3 className="text-2xl font-extrabold text-white group-hover:text-amber-200 transition-colors">
                Anime Series
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                Unapologetic aura bursts, multi-panel Saiyan compositions, and legendary showdowns.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <span>Explore Anime Series</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Tile 3: 3D Ergonomic */}
          <Link
            href="/category/3d"
            className="group relative rounded-3xl overflow-hidden bg-stone-900 border border-[#e5e5dc] p-6 sm:p-8 flex flex-col justify-end min-h-[360px] hover:border-[#d9381e]/50 transition-all duration-300 shadow-md"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="/images/products/3d/assassin-reze.avif"
                alt="3D Ergonomic Mousepads"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/45 to-transparent" />
            </div>

            <div className="relative z-10 space-y-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-[#14161b] border border-white/20 inline-block">
                Silicone Gel Support
              </span>
              <h3 className="text-2xl font-extrabold text-white group-hover:text-amber-200 transition-colors">
                3D Ergonomic
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                Medical-grade silicone gel mounds alleviating carpal compression during long work and gaming sessions.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <span>Explore Ergonomic Pads</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Best Sellers Section */}
      <section id="bestsellers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d9381e] uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Australian Community Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14161b] mt-1">
              Best Sellers
            </h2>
          </div>
          <Link
            href="/category/japandi"
            className="text-xs sm:text-sm font-semibold text-[#d9381e] hover:text-[#be2e17] flex items-center gap-1 transition-colors"
          >
            <span>See full catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. "Why MatStudio" Build Quality & Layered Pad Diagram */}
      <section className="bg-[#f4f4ee] border-y border-[#e5e5dc] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-[#d9381e] uppercase tracking-wider">
              Precision Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14161b] tracking-tight">
              Anatomy of a MatStudio Desk Surface
            </h2>
            <p className="text-sm text-[#555a68] leading-relaxed">
              Every millimeter is calculated to deliver smooth mouse tracking, deadened keyboard acoustics,
              and years of anti-fray durability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Interactive/Visual Layer Breakdown */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-[#e5e5dc] shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#d9381e]/10 text-[#d9381e] font-mono font-bold text-xs flex items-center justify-center">
                      01
                    </span>
                    <h4 className="font-bold text-[#14161b] text-base">
                      Micro-Woven Textile Surface
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-[#7b8192]">Top Layer</span>
                </div>
                <p className="text-xs text-[#555a68] leading-relaxed pl-9.5">
                  Ultra-dense thread weave with calibrated static and dynamic friction. Optical sensors
                  read micro-adjustments with 1:1 pixel accuracy whether you play on 400 or 16,000 DPI.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#e5e5dc] shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#d9381e]/10 text-[#d9381e] font-mono font-bold text-xs flex items-center justify-center">
                      02
                    </span>
                    <h4 className="font-bold text-[#14161b] text-base">
                      Flush 360° Anti-Fray Perimeter
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-[#7b8192]">Border</span>
                </div>
                <p className="text-xs text-[#555a68] leading-relaxed pl-9.5">
                  Sub-surface locked 5-thread stitching sits lower than the mat surface to prevent wrist
                  rubbing and eliminate the border peeling common on cheap mouse pads.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#e5e5dc] shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#d9381e]/10 text-[#d9381e] font-mono font-bold text-xs flex items-center justify-center">
                      03
                    </span>
                    <h4 className="font-bold text-[#14161b] text-base">
                      4mm High-Density Rubber Core
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-[#7b8192]">Mid-Layer</span>
                </div>
                <p className="text-xs text-[#555a68] leading-relaxed pl-9.5">
                  Absorbs desk vibrations and mechanical switch clacks. Provides comfortable arm cushioning
                  during 10-hour work days and competitive gaming sessions.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#e5e5dc] shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#d9381e]/10 text-[#d9381e] font-mono font-bold text-xs flex items-center justify-center">
                      04
                    </span>
                    <h4 className="font-bold text-[#14161b] text-base">
                      Herringbone Natural Tree Rubber
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-[#7b8192]">Base Layer</span>
                </div>
                <p className="text-xs text-[#555a68] leading-relaxed pl-9.5">
                  100% vulcanized natural tree rubber with micro-groove herringbone grip. Never creeps or
                  slides across glass, varnished timber, laminate, or metal desks.
                </p>
              </div>
            </div>

            {/* Right: Technical Diagram Card */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl bg-white border border-[#e5e5dc] p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#d9381e]" />
                    <span className="text-sm font-bold text-[#14161b]">MatStudio Build Spec</span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    ISO Standard Tested
                  </span>
                </div>

                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#f4f4ee] border border-[#e5e5dc]">
                  <img
                    src="/images/products/dbz/4-panel-super-saiyan/base-reveal.jpeg"
                    alt="Natural rubber base and precision stitching macro reveal"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent flex flex-col justify-end p-5">
                    <p className="text-xs font-mono text-white font-semibold tracking-wider">
                      MACRO SPECIFICATION REVEAL
                    </p>
                    <p className="text-[11px] text-stone-200">
                      Vulcanized natural rubber foundation featuring 360° lockstitch perimeter.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-3 rounded-xl bg-[#fafaf7] border border-[#e5e5dc]">
                    <span className="text-xs text-[#7b8192] block">Thickness</span>
                    <span className="font-mono font-bold text-[#14161b] text-sm">4.0 mm</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#fafaf7] border border-[#e5e5dc]">
                    <span className="text-xs text-[#7b8192] block">Base Grip</span>
                    <span className="font-mono font-bold text-[#14161b] text-sm">100% Rubber</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#fafaf7] border border-[#e5e5dc]">
                    <span className="text-xs text-[#7b8192] block">Edge Type</span>
                    <span className="font-mono font-bold text-[#14161b] text-sm">Flush Stitch</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Review Section (Clearly marked placeholder showcase) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d9381e] uppercase tracking-wider">
              <span>Customer Feedback [Sample Showcase]</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14161b] mt-1">
              Battlestations Powered by MatStudio
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#555a68]">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-bold text-[#14161b]">4.9 out of 5</span>
            <span className="text-[#7b8192]">(200+ Reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#e5e5dc] space-y-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-[10px] text-[#7b8192] font-mono">Sample Review</span>
            </div>
            <h4 className="font-bold text-[#14161b] text-sm">
              &ldquo;The stitching doesn&apos;t scrape my arm during long gaming sessions.&rdquo;
            </h4>
            <p className="text-xs text-[#555a68] leading-relaxed">
              Bought the Blood Moon Pagoda 900x400. Sits dead flat right out of the box, mouse glide is
              silky smooth, and it arrived in Melbourne in 2 days.
            </p>
            <div className="pt-2 border-t border-[#f0f0e8] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#14161b]">Liam K.</span>
              <span className="text-[#7b8192]">Melbourne, VIC</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#e5e5dc] space-y-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-[10px] text-[#7b8192] font-mono">Sample Review</span>
            </div>
            <h4 className="font-bold text-[#14161b] text-sm">
              &ldquo;The 3D wrist gel pad completely saved my hand.&rdquo;
            </h4>
            <p className="text-xs text-[#555a68] leading-relaxed">
              I do 8 hours of CAD modeling daily. The silicone gel mound is firm yet forgiving, not that cheap
              sponge foam that sinks and stays compressed.
            </p>
            <div className="pt-2 border-t border-[#f0f0e8] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#14161b]">Mitchell K.</span>
              <span className="text-[#7b8192]">Sydney, NSW</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#e5e5dc] space-y-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-[10px] text-[#7b8192] font-mono">Sample Review</span>
            </div>
            <h4 className="font-bold text-[#14161b] text-sm">
              &ldquo;Colors are insane and zero rubber smell.&rdquo;
            </h4>
            <p className="text-xs text-[#555a68] leading-relaxed">
              The 4-Panel Super Saiyan mat looks unbelievable under warm desk lighting. Great quality and
              really appreciate the fast regional Australian shipping.
            </p>
            <div className="pt-2 border-t border-[#f0f0e8] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#14161b]">Cameron B.</span>
              <span className="text-[#7b8192]">Brisbane, QLD</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Community Gallery Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#d9381e] uppercase tracking-wider">
              Community Setups
            </span>
            <h3 className="text-lg font-bold text-[#14161b]">#MatStudioDesk on Instagram</h3>
          </div>
          <span className="text-xs text-[#7b8192]">Tag @MatStudio to be featured</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-[#e5e5dc] shadow-2xs group">
            <img
              src="/images/products/japandi/crimson-blossom-ronin/lifestyle.jpeg"
              alt="MatStudio desk setup"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-[#e5e5dc] shadow-2xs group">
            <img
              src="/images/products/dbz/fiery-goku-bardock/lifestyle.jpeg"
              alt="MatStudio desk setup"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-[#e5e5dc] shadow-2xs group">
            <img
              src="/images/products/japandi/silver-phantom-swordsman/lifestyle.jpeg"
              alt="MatStudio desk setup"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-[#e5e5dc] shadow-2xs group">
            <img
              src="/images/products/dbz/kid-goku-shenron/lifestyle.jpeg"
              alt="MatStudio desk setup"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* 8. Email Signup with Discount Hook */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#f8f8f5] via-white to-[#f4f4ee] border border-[#e5e5dc] p-8 sm:p-12 overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#d9381e]/8 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto text-center space-y-4 relative z-10">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#d9381e]/10 text-[#d9381e] border border-[#d9381e]/20 inline-block">
              Welcome Offer
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14161b] tracking-tight">
              Get 10% Off Your First Desk Mat
            </h2>
            <p className="text-sm text-[#555a68] leading-relaxed">
              Subscribe to the MatStudio club for exclusive drop alerts, new collection previews (including
              upcoming anime series), and secret VIP desk discount codes.
            </p>

            <NewsletterForm />
            <p className="text-[11px] text-[#7b8192]">
              Zero spam. Unsubscribe anytime with 1 click. Dispatched from Wangaratta, VIC.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
