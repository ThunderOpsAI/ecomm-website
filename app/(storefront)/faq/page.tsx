import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FAQAccordion, FAQCategory } from "@/components/faq-accordion";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "FAQ & Care Guide | Mouse Pad Cleaning & Dispatch Advice",
  description:
    "Frequently asked questions about MatStudio desk mats, micro-woven cloth tracking, glass skate compatibility, cleaning tips, and Australia Post delivery from Wangaratta, VIC.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ & Care Guide | MatStudio Australia",
    description:
      "Everything you need to know about MatStudio mouse pads. Micro-weave tracking, PTFE & glass skate compatibility, machine washing guidelines, and 30-day anti-slip trial.",
    url: "/faq",
    images: [
      {
        url: "/images/products/japandi/blood-moon-pagoda/lifestyle.jpeg",
        width: 1200,
        height: 630,
        alt: "MatStudio FAQ & Care Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ & Care Guide | MatStudio Australia",
    description:
      "Common questions on sensor tracking, machine wash guidelines, and Australia Post shipping.",
  },
};

const FAQ_CATEGORIES: FAQCategory[] = [
  {
    category: "Materials & Performance",
    items: [
      {
        q: "What makes MatStudio cloth different from regular mousepads?",
        a: "We use a high-density, low-friction micro-woven textile calibrated specifically for balanced mouse control. Both optical and laser sensors track accurately down to 1-pixel micro-adjustments without stuttering, while offering sufficient stopping power for tactical shooters.",
      },
      {
        q: "Are your mats compatible with glass mouse skates and PTFE feet?",
        a: "Yes. Our micro-weave surface has been tested extensively with standard factory PTFE feet, aftermarket dot skates (Bake, Xraypad, Tiger Ice), and sapphire/glass skates. The tightly packed weave resists abrasive skate wear.",
      },
      {
        q: "Does the natural rubber base have a chemical odor?",
        a: "No. Unlike synthetic PVC or petroleum-based mouse mats, MatStudio uses 100% vulcanized natural tree rubber that is cured to eliminate harsh chemical off-gassing. There is only a faint, natural rubber scent that fades within 24 hours.",
      },
      {
        q: "What is the 3D Ergonomic wrist rest made of?",
        a: "Our 3D pads feature high-density medical-grade silicone gel encased in flexible, breathable 4-way stretch lycra. It maintains its supportive anatomical contour for years without deflating, unlike cheap open-cell polyurethane foam.",
      },
    ],
  },
  {
    category: "Care & Cleaning",
    items: [
      {
        q: "How do I clean my MatStudio desk mat?",
        a: "For routine cleaning, wipe the surface with a damp microfiber cloth and mild hand soap. For deep cleans, hand wash in lukewarm water with dish soap, gently rubbing the cloth surface with a sponge. Always lay flat to air dry away from direct scorching sun. Do not tumble dry.",
      },
      {
        q: "Can I put my desk mat in the washing machine?",
        a: "Yes, you can machine wash on a cold, gentle cycle with mild detergent inside a laundry mesh bag. Never use bleach or fabric softeners, and never dry in a machine dryer.",
      },
      {
        q: "Is the print dye spill-resistant?",
        a: "Our thermal dye sublimation fuses ink deep into the polyester fibers under high heat and pressure. Water and coffee spills can be wiped off quickly before staining.",
      },
    ],
  },
  {
    category: "Ordering & Australia Post Dispatch",
    items: [
      {
        q: "Where is my order dispatched from?",
        a: "All orders are fulfilled and dispatched directly from Wangaratta, Victoria 3677 via Australia Post. Orders placed before 1:00 PM AEST on business days ship out same-day.",
      },
      {
        q: "How do I qualify for Free Express Shipping?",
        a: "Any order of $60.00 AUD or more automatically qualifies for free Australia Post shipping at checkout. For orders under $60, standard delivery is $9.95 AUD and express is $14.95 AUD.",
      },
      {
        q: "What is the 30-Day Anti-Slip Guarantee?",
        a: "If your MatStudio pad does not stay firmly anchored to your desk, or if you encounter any stitching defects, simply reach out to our team within 30 days of receiving your package for a replacement or full refund.",
      },
    ],
  },
  {
    category: "Art & Licensing",
    items: [
      {
        q: "Are the Anime Series products official merchandise?",
        a: "No. All anime-themed desk mats are unbranded, original fan-inspired artistic compositions created to celebrate iconic characters and memorable battle moments. They are not official licensed merchandise.",
      },
    ],
  },
];

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_CATEGORIES.flatMap((cat) =>
      cat.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      }))
    ),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12 bg-cream font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="border-b border-border-subtle pb-6">
        <SectionHeader
          eyebrow="Help & Guidance"
          title="Frequently Asked Questions"
          description="Everything you need to know about materials, sizing, cleaning, and Australian dispatch."
        />
      </div>

      <FAQAccordion categories={FAQ_CATEGORIES} />

      {/* Still need help CTA */}
      <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 className="font-display font-bold text-text-primary text-base">
            Have a question not listed here?
          </h3>
          <p className="text-xs text-text-secondary mt-1">
            Our Australian support team is based in Victoria and responds within 24 hours.
          </p>
        </div>
        <Link href="/contact">
          <Button variant="primary" size="md" className="shrink-0">
            Contact Studio
          </Button>
        </Link>
      </div>
    </div>
  );
}
