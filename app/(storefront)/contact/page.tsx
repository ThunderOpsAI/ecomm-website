import React from "react";
import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Contact Us | Australian Support & Inquiries",
  description:
    "Get in touch with the MatStudio customer support team in Wangaratta, Victoria. Reach out for order updates, Australia Post tracking, bulk orders, and desk advice.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | MatStudio Australia",
    description:
      "Reach out to MatStudio's Australian desk team. Dispatched from Wangaratta, VIC. Response time under 4 hours.",
    url: "/contact",
    images: [
      {
        url: "/images/products/japandi/blood-moon-pagoda/lifestyle.jpeg",
        width: 1200,
        height: 630,
        alt: "Contact MatStudio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | MatStudio Australia",
    description:
      "Customer support for gaming mouse pads and desk mats fulfilled in Victoria, Australia.",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12 bg-cream font-sans">
      <div className="border-b border-border-subtle pb-6">
        <SectionHeader
          eyebrow="Australian Studio Helpdesk"
          title="Contact MatStudio"
          description="Have questions regarding an order, sizing recommendation, or custom bulk order? We are here to help."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Information & Hours (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-surface border border-border-subtle space-y-6 text-xs sm:text-sm shadow-2xs">
            <h3 className="font-display font-bold text-text-primary text-lg border-b border-border-subtle pb-3">
              Direct Contact
            </h3>

            <div className="space-y-4 text-text-secondary">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-text-primary block font-mono text-xs">Email Support</strong>
                  <span className="font-mono text-xs text-text-secondary">support@matstudio.com.au</span>
                  <p className="text-[11px] text-text-muted mt-0.5">Average reply time: under 4 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-text-primary block font-mono text-xs">Fulfillment Center</strong>
                  <span className="text-text-secondary">Wangaratta, Victoria 3677, Australia</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-text-primary block font-mono text-xs">Operating Hours</strong>
                  <span className="text-text-secondary">Monday – Friday: 9:00 AM – 5:00 PM AEST</span>
                  <p className="text-[11px] text-text-muted mt-0.5">Weekend emails answered Monday morning</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-surface border border-border-subtle space-y-2 text-xs">
            <h4 className="font-display font-bold text-text-primary text-sm">Looking for Tracking?</h4>
            <p className="text-text-secondary leading-relaxed">
              All Australia Post tracking numbers are sent automatically via email once your shipping label
              is generated. Please check your spam folder or reach out with your order number.
            </p>
          </div>
        </div>

        {/* Contact Form (Col 7) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border-subtle shadow-2xs">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
