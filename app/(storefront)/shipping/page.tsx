import React from "react";
import Link from "next/link";
import { Truck, RotateCcw, Clock } from "lucide-react";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Shipping & Returns Policy | Australia Post Dispatch",
  description:
    "Fast Australia Post dispatch from Wangaratta, VIC. Free express shipping over $60 AUD and 30-day anti-slip return guarantee on all desk mats.",
  alternates: {
    canonical: "/shipping",
  },
  openGraph: {
    title: "Shipping & Returns Policy | MatStudio Australia",
    description:
      "All orders fulfilled directly from Wangaratta, Victoria. Australia Post standard parcel (2-5 days) and express courier (1-2 days). 30-day anti-slip money-back guarantee.",
    url: "/shipping",
    images: [
      {
        url: "/images/products/japandi/blood-moon-pagoda/lifestyle.jpeg",
        width: 1200,
        height: 630,
        alt: "MatStudio Shipping & Returns Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shipping & Returns Policy | MatStudio Australia",
    description:
      "Fast Australia Post dispatch from Wangaratta, VIC. Free express shipping on orders over $60 AUD.",
  },
};

export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12 bg-cream font-sans">
      <div className="border-b border-border-subtle pb-6">
        <SectionHeader
          eyebrow="Australia Post Dispatch"
          title="Shipping & Returns Policy"
          description="Transparent, reliable regional Australian fulfillment for your desk setup."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-surface border border-border-subtle space-y-1 shadow-2xs">
          <Truck className="w-5 h-5 text-accent" />
          <h4 className="font-display font-bold text-sm text-text-primary pt-1">Free Express</h4>
          <p className="text-xs text-text-secondary">Automatic on orders $60 AUD and over</p>
        </div>
        <div className="p-5 rounded-xl bg-surface border border-border-subtle space-y-1 shadow-2xs">
          <Clock className="w-5 h-5 text-accent" />
          <h4 className="font-display font-bold text-sm text-text-primary pt-1">24-Hour Dispatch</h4>
          <p className="text-xs text-text-secondary">Dispatched weekdays before 1:00 PM</p>
        </div>
        <div className="p-5 rounded-xl bg-surface border border-border-subtle space-y-1 shadow-2xs">
          <RotateCcw className="w-5 h-5 text-accent" />
          <h4 className="font-display font-bold text-sm text-text-primary pt-1">30-Day Trial</h4>
          <p className="text-xs text-text-secondary">Hassle-free returns on all products</p>
        </div>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-text-secondary leading-relaxed">
        <section className="space-y-3">
          <h3 className="font-display text-xl font-bold text-text-primary">Where do orders ship from?</h3>
          <p>
            All MatStudio products are stored, inspected, and shipped directly from our regional fulfillment
            hub in <strong>Wangaratta, Victoria 3677</strong>. Because we fulfill locally in Australia, you
            never have to deal with long international customs delays or third-party drop-shipping.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-xl font-bold text-text-primary">Domestic Shipping Rates & Delivery Times</h3>
          <div className="rounded-xl bg-surface border border-border-subtle overflow-hidden shadow-2xs">
            <div className="grid grid-cols-3 p-3.5 bg-muted/60 font-mono text-xs font-bold text-text-primary border-b border-border-subtle">
              <span>Service</span>
              <span>Estimated Delivery</span>
              <span className="text-right">Rate (AUD)</span>
            </div>
            <div className="grid grid-cols-3 p-3.5 border-b border-border-subtle">
              <span className="font-medium text-text-primary">Aus Post Standard Parcel</span>
              <span>2 – 5 business days</span>
              <span className="text-right font-mono font-semibold text-text-primary">$9.95 AUD (Free over $60)</span>
            </div>
            <div className="grid grid-cols-3 p-3.5">
              <span className="font-medium text-text-primary">Aus Post Express Courier</span>
              <span>1 – 2 business days</span>
              <span className="text-right font-mono font-semibold text-text-primary">$14.95 AUD ($5.00 over $60)</span>
            </div>
          </div>
          <p className="text-xs font-mono text-text-muted">
            Note: Remote regional areas in WA, NT, or northern QLD may require an additional 1-2 business days.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-xl font-bold text-text-primary">Packaging & Unrolling Guide</h3>
          <p>
            To prevent creases, all extended desk mats are gently rolled face-out inside heavy-duty rigid
            cardboard mailing cylinders. The mat will relax completely flat on your desk within 10 to 15
            minutes of unboxing.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-xl font-bold text-text-primary">30-Day Anti-Slip & Satisfaction Guarantee</h3>
          <p>
            We stand behind our materials 100%. If your desk mat slides on your desk, experiences stitching
            defects, or simply doesn&apos;t suit your aesthetic, you may return it within 30 days of delivery
            for a full refund or exchange.
          </p>
          <p>
            To initiate a return, contact our support desk at{" "}
            <Link href="/contact" className="text-accent hover:underline font-semibold font-mono">
              support@matstudio.com.au
            </Link>{" "}
            with your order number.
          </p>
        </section>
      </div>
    </div>
  );
}
