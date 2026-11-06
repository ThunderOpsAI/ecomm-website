import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";

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
    <div className="pb-24 space-y-16 sm:space-y-24 bg-cream font-sans">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-ink text-cream py-16 sm:py-24 border-b border-border-dark bg-grain-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <Badge variant="vermilion" size="sm">
            Our Origin Story
          </Badge>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-cream leading-[1.05]">
            Built for Gamers Who Care About Every Millimeter.
          </h1>
          <p className="text-sm sm:text-base text-cream/70 max-w-2xl mx-auto leading-relaxed">
            MatStudio was born out of frustration with flimsy, cheap mousepads that fray after two months
            and reek of petroleum rubber. We set out to engineer the gold standard in desk surfaces.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-xs sm:text-sm text-text-secondary leading-relaxed">
            <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest">
              From Wangaratta, Victoria
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
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

          <div className="rounded-2xl overflow-hidden bg-surface border border-border-subtle p-3 shadow-xs">
            <img
              src="/images/products/japandi/blood-moon-pagoda/lifestyle.jpeg"
              alt="MatStudio desk mat in aesthetic setup"
              className="rounded-xl w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* 4 Pillars of MatStudio */}
        <div className="space-y-8">
          <SectionHeader
            align="center"
            eyebrow="Integrity"
            title="The 4 MatStudio Standards"
            description="Every pad dispatched from our Victorian fulfillment hub meets strict benchmarks."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-surface border border-border-subtle space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-sm bg-accent/10 text-accent flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-text-primary text-lg">
                Micro-Woven Glide Surface
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed font-sans">
                Tightly spun polyester threads provide uniform X and Y axis friction, ensuring mouse movements
                feel completely predictable regardless of swipe direction.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-surface border border-border-subtle space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-sm bg-accent/10 text-accent flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-text-primary text-lg">
                100% Natural Tree Rubber
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed font-sans">
                We refuse to use synthetic EVA foam or cheap PVC. Our heavy natural rubber base has zero toxic
                petroleum odor and clings tenaciously to all desk finishes.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-surface border border-border-subtle space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-sm bg-accent/10 text-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-text-primary text-lg">
                Sub-Surface Anti-Fray Border
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed font-sans">
                5-thread lockstitch sewing binds the edge below pad height. Your forearm glides over the seam
                without catching, eliminating skin irritation during long gaming sessions.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-surface border border-border-subtle space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-sm bg-accent/10 text-accent flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-text-primary text-lg">
                Local Australian Dispatch
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed font-sans">
                No drop-shipping from overseas factories with 4-week transit times. Every order is inspected,
                tube-packaged, and dispatched via Australia Post from Wangaratta, VIC.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-ink text-cream border border-border-dark text-center space-y-4 shadow-xl bg-grain-dark">
          <Badge variant="amber" size="sm">
            Risk-Free Guarantee
          </Badge>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream">
            Ready to elevate your setup?
          </h3>
          <p className="text-xs sm:text-sm text-cream/70 max-w-md mx-auto leading-relaxed">
            Explore our curated 12-piece launch collection with 30-day anti-slip risk-free trial.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/category/japandi">
              <Button variant="primary" size="md">
                <span>Browse Japandi Collection</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
            <Link href="/category/anime">
              <Button
                variant="outline"
                size="md"
                className="bg-ink-subtle text-cream border-border-dark hover:bg-ink-muted"
              >
                Browse Anime Series
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
