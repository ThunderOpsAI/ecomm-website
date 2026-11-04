import React from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Australian Consumer Law",
  description:
    "MatStudio Australia terms of service, consumer rights under the Australian Consumer Law (ACL), order fulfillment terms, and fan art policies.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | MatStudio Australia",
    description:
      "Terms and conditions of sale for MatStudio Australia including statutory consumer rights and dispatch policies.",
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8 text-xs sm:text-sm text-[#555a68] leading-relaxed">
      <div className="border-b border-[#e5e5dc] pb-6">
        <span className="text-xs font-semibold text-[#d9381e] uppercase tracking-wider">
          Legal Agreement
        </span>
        <h1 className="text-3xl font-extrabold text-[#14161b] mt-1">Terms of Service</h1>
        <p className="text-xs text-[#7b8192] mt-1">Last updated: November 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[#14161b]">1. Agreement to Terms</h2>
        <p>
          By accessing MatStudio (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) or placing an order through our website,
          you agree to be bound by these Terms of Service and all applicable Australian consumer laws.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[#14161b]">2. Australian Consumer Law & Guarantees</h2>
        <p>
          Our goods come with guarantees that cannot be excluded under the Australian Consumer Law (ACL).
          You are entitled to a replacement or refund for a major failure and compensation for any other
          reasonably foreseeable loss or damage. You are also entitled to have the goods repaired or replaced
          if the goods fail to be of acceptable quality and the failure does not amount to a major failure.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[#14161b]">3. Pricing & Currency</h2>
        <p>
          All prices quoted on the MatStudio storefront are in Australian Dollars (AUD) and are inclusive
          of Australian Goods and Services Tax (GST) unless explicitly stated otherwise.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[#14161b]">4. Artwork & Fan Interpretations</h2>
        <p>
          Anime-inspired designs available in our Anime Series collection are unbranded fan-style artwork
          created as artistic homages to iconic combat genres and fictional character archetypes. They are
          not endorsed by or affiliated with official media licensing holders.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[#14161b]">5. Dispatch & Delivery</h2>
        <p>
          Orders are dispatched via Australia Post from our regional warehouse in Wangaratta, VIC. Risk of
          loss passes to the customer upon Australia Post scanning the parcel into their distribution network.
        </p>
      </section>
    </div>
  );
}
