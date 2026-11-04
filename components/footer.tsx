import React from "react";
import Link from "next/link";
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  MapPin,
  ExternalLink,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f4f4ee] border-t border-[#e5e5dc] text-[#555a68] text-sm transition-colors">
      {/* Trust & Guarantee Banner */}
      <div className="border-b border-[#e5e5dc] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#e5e5dc] shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#d9381e]/10 border border-[#d9381e]/15 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-[#d9381e]" />
              </div>
              <div>
                <h4 className="font-semibold text-[#14161b] text-sm">Australia Post Dispatch</h4>
                <p className="text-xs text-[#555a68] mt-1 leading-relaxed">
                  Daily tracking-enabled dispatch from Wangaratta, VIC. Free express over $60 AUD.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#e5e5dc] shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#d9381e]/10 border border-[#d9381e]/15 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#d9381e]" />
              </div>
              <div>
                <h4 className="font-semibold text-[#14161b] text-sm">Anti-Slip Guarantee</h4>
                <p className="text-xs text-[#555a68] mt-1 leading-relaxed">
                  Heavy 100% vulcanized tree rubber base stays anchored to timber, glass, or metal.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#e5e5dc] shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#d9381e]/10 border border-[#d9381e]/15 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5 text-[#d9381e]" />
              </div>
              <div>
                <h4 className="font-semibold text-[#14161b] text-sm">30-Day Hassle-Free Returns</h4>
                <p className="text-xs text-[#555a68] mt-1 leading-relaxed">
                  Try it on your desk risk-free. Easy returns if it does not fit your battlestation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#e5e5dc] shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#d9381e]/10 border border-[#d9381e]/15 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-[#d9381e]" />
              </div>
              <div>
                <h4 className="font-semibold text-[#14161b] text-sm">360° Anti-Fray Stitching</h4>
                <p className="text-xs text-[#555a68] mt-1 leading-relaxed">
                  Flush precision 5-thread locked perimeter prevents peeling and wrist irritation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d9381e] to-[#b82e16] flex items-center justify-center shadow-xs shadow-[#d9381e]/25">
                <div className="w-3.5 h-3.5 rounded-xs border-2 border-white/95 transform rotate-12"></div>
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#14161b] font-mono leading-none">
                Mat<span className="text-[#d9381e]">Studio</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[#555a68] leading-relaxed max-w-sm">
              Engineered for Australian gamers, creative professionals, and desk-setup enthusiasts.
              Micro-woven control cloth and natural vulcanized tree rubber surfaces crafted for
              effortless mouse glide.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#7b8192]">
              <MapPin className="w-3.5 h-3.5 text-[#d9381e]" />
              <span>Fulfilled & Dispatched from Wangaratta VIC 3677, Australia</span>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h5 className="font-semibold text-[#14161b] text-xs uppercase tracking-wider mb-4">
              Collections
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/category/japandi"
                  className="hover:text-[#14161b] transition-colors"
                >
                  Japandi Mats
                </Link>
              </li>
              <li>
                <Link
                  href="/category/anime"
                  className="hover:text-[#14161b] transition-colors"
                >
                  Anime Series
                </Link>
              </li>
              <li>
                <Link
                  href="/category/3d"
                  className="hover:text-[#14161b] transition-colors"
                >
                  3D Ergonomic Pads
                </Link>
              </li>
              <li>
                <Link
                  href="/#bestsellers"
                  className="hover:text-[#14161b] transition-colors"
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  href="/category/japandi"
                  className="text-xs text-[#d9381e] hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <span>View All 12 Designs</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h5 className="font-semibold text-[#14161b] text-xs uppercase tracking-wider mb-4">
              Customer Support
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-[#14161b] transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#14161b] transition-colors">
                  FAQ & Care Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#14161b] transition-colors"
                >
                  Contact Helpdesk
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#14161b] transition-colors"
                >
                  Why MatStudio
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h5 className="font-semibold text-[#14161b] text-xs uppercase tracking-wider mb-4">
              Legal & Trust
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-[#14161b] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#14161b] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="text-xs text-[#7b8192] block leading-relaxed mt-2">
                  All anime designs are unbranded fan-style artwork. Currency in Australian Dollars (AUD).
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Payment Badges & Copyright */}
        <div className="mt-12 pt-8 border-t border-[#e5e5dc] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7b8192]">
          <p>© {currentYear} MatStudio. All rights reserved. Registered Australian Business.</p>

          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-md bg-white border border-[#e5e5dc] font-mono text-[11px] text-[#555a68] shadow-2xs">
              Apple Pay
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white border border-[#e5e5dc] font-mono text-[11px] text-[#555a68] shadow-2xs">
              Google Pay
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white border border-[#e5e5dc] font-mono text-[11px] text-[#555a68] shadow-2xs">
              Visa
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white border border-[#e5e5dc] font-mono text-[11px] text-[#555a68] shadow-2xs">
              Mastercard
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white border border-[#e5e5dc] font-mono text-[11px] text-[#555a68] shadow-2xs">
              PayPal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
