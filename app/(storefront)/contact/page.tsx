import React from "react";
import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="space-y-3 border-b border-[#e5e5dc] pb-6">
        <span className="text-xs font-semibold text-[#d9381e] uppercase tracking-wider">
          Australian Helpdesk
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14161b]">
          Contact MatStudio
        </h1>
        <p className="text-sm text-[#555a68]">
          Have questions regarding an order, sizing recommendation, or custom bulk order? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Information & Hours (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#e5e5dc] space-y-6 text-xs sm:text-sm shadow-2xs">
            <h3 className="font-bold text-[#14161b] text-base border-b border-[#f0f0e8] pb-3">
              Direct Contact
            </h3>

            <div className="space-y-4 text-[#555a68]">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#d9381e] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#14161b] block">Email Support</strong>
                  <span className="font-mono text-xs">support@matstudio.com.au</span>
                  <p className="text-[11px] text-[#7b8192] mt-0.5">Average reply time: under 4 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#d9381e] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#14161b] block">Fulfillment Center</strong>
                  <span>Wangaratta, Victoria 3677, Australia</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#d9381e] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#14161b] block">Operating Hours</strong>
                  <span>Monday – Friday: 9:00 AM – 5:00 PM AEST</span>
                  <p className="text-[11px] text-[#7b8192] mt-0.5">Weekend emails answered Monday morning</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#fafaf7] border border-[#e5e5dc] space-y-2 text-xs">
            <h4 className="font-bold text-[#14161b]">Looking for Tracking?</h4>
            <p className="text-[#555a68] leading-relaxed">
              All Australia Post tracking numbers are sent automatically via email once your shipping label
              is generated. Please check your spam folder or reach out with your order number.
            </p>
          </div>
        </div>

        {/* Contact Form (Col 7) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e5e5dc] shadow-2xs">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
