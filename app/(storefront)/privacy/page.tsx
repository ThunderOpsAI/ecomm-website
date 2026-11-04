import React from "react";
import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Customer Data Protection",
  description:
    "MatStudio Australia privacy policy detailing compliance with the Australian Privacy Principles (APPs), customer data security, and order fulfillment handling.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | MatStudio Australia",
    description:
      "Customer privacy commitments and Australian Privacy Principles compliance for MatStudio customers.",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8 text-xs sm:text-sm text-[#555a68] leading-relaxed">
      <div className="border-b border-[#e5e5dc] pb-6">
        <span className="text-xs font-semibold text-[#d9381e] uppercase tracking-wider">
          Legal Compliance
        </span>
        <h1 className="text-3xl font-extrabold text-[#14161b] mt-1">Privacy Policy</h1>
        <p className="text-xs text-[#7b8192] mt-1">Last updated: November 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[#14161b]">1. Australian Privacy Principles (APPs)</h2>
        <p>
          MatStudio is committed to protecting your privacy in accordance with the Privacy Act 1988 (Cth)
          and the Australian Privacy Principles (APPs). This policy sets out how we handle your personal
          information when you visit our website, purchase our products, or interact with our customer service team.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[#14161b]">2. Information We Collect</h2>
        <p>
          When you place an order, we collect personal information necessary to fulfill your delivery,
          including your full name, shipping and billing address, email address, phone number for Australia
          Post tracking updates, and order preferences. We never store raw credit card numbers on our servers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[#14161b]">3. How We Use Your Information</h2>
        <p>
          We use your information solely to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Process and dispatch your desk mat orders via Australia Post from Wangaratta, VIC</li>
          <li>Communicate order status, tracking consignments, and customer care responses</li>
          <li>Send product update newsletters if you have expressly opted in</li>
          <li>Prevent fraud and comply with statutory Australian taxation obligations</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[#14161b]">4. Third-Party Sharing</h2>
        <p>
          We do not sell, rent, or trade your personal data. We disclose your delivery address and phone
          number to Australia Post strictly to facilitate package delivery and SMS tracking notifications.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[#14161b]">5. Contact Our Privacy Officer</h2>
        <p>
          For questions or requests regarding your personal data, contact us at{" "}
          <Link href="/contact" className="text-[#d9381e] hover:underline font-semibold">
            privacy@matstudio.com.au
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
