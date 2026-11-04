import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  Sparkles,
  Layers,
} from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why MatStudio | About Our Australian Desk Surface Brand",
  description:
    "Learn how MatStudio engineers high-performance cloth gaming pads and desk mats from Wangaratta, Victoria. Micro-woven cloth, natural tree rubber, and anti-fray borders.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Why MatStudio | About Our Australian Desk Surface Brand",
    description:
      "Crafted in regional Victoria for gamers and desk setup enthusiasts. Discover our 4 manufacturing standards: micro-woven cloth, 100% natural tree rubber, flush 360° stitching, and local Aus Post dispatch.",
    url: "/about",
    images: [
      {
        url: "/images/products/japandi/blood-moon-pagoda/lifestyle.jpeg",
        width: 1200,
        height: 630,
        alt: "MatStudio Desk Mats - About Our Brand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why MatStudio | About Our Australian Desk Surface Brand",
    description:
      "High-performance gaming mouse pads and desk mats engineered in Wangaratta, Victoria.",
  },
};

export default function AboutPage() {
  return (
    <div className="pb-20 space-y-16 sm:space-y-24">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f5f5f0] via-[#fafaf7] to-[#fafaf8] py-16 sm:py-24 border-b border-[#e5e5dc]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-[#e5e5dc] text-[#d9381e] inline-block shadow-2xs">
            Our Origin Story
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#14161b] tracking-tight">
            Built for Gamers Who Care About Every Millimeter.
          </h1>
          <p className="text-sm sm:text-base text-[#555a68] max-w-2xl mx-auto leading-relaxed">
            MatStudio was born out of frustration with flimsy, cheap mousepads that fray after two months
            and reek of petroleum rubber. We set out to engineer the gold standard in desk surfaces.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-xs sm:text-sm text-[#555a68] leading-relaxed">
            <span className="text-xs font-bold text-[#d9381e] uppercase tracking-wider">
              From Wangaratta, Victoria
            </span>
            <h2 className="text-2xl font-bold text-[#14161b]">
              The Problem with Mass-Market Mousepads
            </h2>
            <p>
              In 2024, our team of Australian sim racers, FPS players, and mechanical keyboard hobbyists
              grew tired of paying $80 AUD for branded mouse mats that peeled around the edges and slid
              across wooden tabletops during intense tracking movements.
            </p>
            <p>
              We decided to do it right: sourcing dense 100% vulcanized natural tree rubber with micro-herringbone
              texture for the base, developing sub-surface lockstitch perimeters that sit flush with the cloth,
              and calibrating micro-woven textiles for both low dynamic friction and crisp stopping power.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden bg-white border border-[#e5e5dc] p-4 shadow-sm">
            <img
              src="/images/products/japandi/blood-moon-pagoda/lifestyle.jpeg"
              alt="MatStudio desk mat in aesthetic setup"
              className="rounded-2xl w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* 4 Pillars of MatStudio */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-[#14161b]">The 4 MatStudio Standards</h3>
            <p className="text-xs text-[#7b8192] mt-1">
              Every pad dispatched from our Victorian fulfillment hub meets strict benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#e5e5dc] space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#d9381e]/10 text-[#d9381e] flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#14161b] text-base">Micro-Woven Glide Surface</h4>
              <p className="text-xs text-[#555a68] leading-relaxed">
                Tightly spun polyester threads provide uniform X and Y axis friction, ensuring mouse movements
                feel completely predictable regardless of swipe direction.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e5e5dc] space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#d9381e]/10 text-[#d9381e] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#14161b] text-base">100% Natural Tree Rubber</h4>
              <p className="text-xs text-[#555a68] leading-relaxed">
                We refuse to use synthetic EVA foam or cheap PVC. Our heavy natural rubber base has zero toxic
                petroleum odor and clings tenaciously to all desk finishes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e5e5dc] space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#d9381e]/10 text-[#d9381e] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#14161b] text-base">Sub-Surface Anti-Fray Border</h4>
              <p className="text-xs text-[#555a68] leading-relaxed">
                5-thread lockstitch sewing binds the edge below pad height. Your forearm glides over the seam
                without catching, eliminating skin irritation during long gaming sessions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e5e5dc] space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#d9381e]/10 text-[#d9381e] flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#14161b] text-base">Local Australian Dispatch</h4>
              <p className="text-xs text-[#555a68] leading-relaxed">
                No drop-shipping from overseas factories with 4-week transit times. Every order is inspected,
                tube-packaged, and dispatched via Australia Post from Wangaratta, VIC.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#f8f8f5] to-white border border-[#e5e5dc] text-center space-y-4 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-bold text-[#14161b]">Ready to elevate your setup?</h3>
          <p className="text-xs sm:text-sm text-[#555a68] max-w-md mx-auto">
            Explore our curated 12-piece launch collection with 30-day anti-slip risk-free trial.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/category/japandi"
              className="px-6 py-3 rounded-xl bg-[#d9381e] hover:bg-[#be2e17] text-white font-bold text-xs shadow-xs"
            >
              Browse Japandi Collection
            </Link>
            <Link
              href="/category/anime"
              className="px-6 py-3 rounded-xl border border-[#e5e5dc] bg-white hover:bg-[#f2f2ed] text-[#14161b] font-semibold text-xs shadow-2xs"
            >
              Browse Anime Series
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
