import React from "react";
import Link from "next/link";
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  MapPin,
  ExternalLink,
  CreditCard,
  Shield,
  Lock,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cream border-t border-border-subtle text-text-secondary text-sm font-sans transition-colors">
      {/* Trust & Guarantee Banner */}
      <div className="border-b border-border-subtle py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5 p-5 rounded-xl bg-surface border border-border-subtle shadow-2xs">
              <div className="w-10 h-10 rounded-sm bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="font-display font-bold text-text-primary text-sm">
                  Australia Post Dispatch
                </h4>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  Daily tracking-enabled dispatch from Wangaratta, VIC. Free express over $60 AUD.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-5 rounded-xl bg-surface border border-border-subtle shadow-2xs">
              <div className="w-10 h-10 rounded-sm bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="font-display font-bold text-text-primary text-sm">
                  Anti-Slip Guarantee
                </h4>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  Heavy 100% vulcanized tree rubber base stays anchored to timber, glass, or metal.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-5 rounded-xl bg-surface border border-border-subtle shadow-2xs">
              <div className="w-10 h-10 rounded-sm bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="font-display font-bold text-text-primary text-sm">
                  30-Day Hassle-Free Trial
                </h4>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  Try it on your desk risk-free. Easy returns if it does not fit your battlestation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-5 rounded-xl bg-surface border border-border-subtle shadow-2xs">
              <div className="w-10 h-10 rounded-sm bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="font-display font-bold text-text-primary text-sm">
                  360° Anti-Fray Stitching
                </h4>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
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
              <div className="w-8 h-8 rounded-sm bg-accent flex items-center justify-center shadow-xs shadow-accent/30">
                <span className="text-white font-display text-sm font-bold tracking-widest">
                  印
                </span>
              </div>
              <span className="font-display text-3xl font-bold tracking-tight text-text-primary leading-none">
                Mat<span className="text-accent">Studio</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-sm">
              Engineered for Australian gamers, creative professionals, and desk-setup enthusiasts.
              Micro-woven control cloth and natural vulcanized tree rubber surfaces crafted for
              effortless mouse glide.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>Fulfilled from Wangaratta VIC 3677, Australia</span>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h5 className="font-mono text-xs uppercase tracking-[0.2em] font-semibold text-text-primary mb-4">
              Collections
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/category/japandi"
                  className="hover:text-accent transition-colors"
                >
                  Japandi Mats
                </Link>
              </li>
              <li>
                <Link
                  href="/category/anime"
                  className="hover:text-accent transition-colors"
                >
                  Anime Series
                </Link>
              </li>
              <li>
                <Link
                  href="/category/3d"
                  className="hover:text-accent transition-colors"
                >
                  3D Ergonomic Pads
                </Link>
              </li>
              <li>
                <Link
                  href="/#bestsellers"
                  className="hover:text-accent transition-colors"
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  href="/category/japandi"
                  className="text-xs font-mono text-accent hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <span>View All Designs</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h5 className="font-mono text-xs uppercase tracking-[0.2em] font-semibold text-text-primary mb-4">
              Support
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-accent transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-accent transition-colors">
                  FAQ & Care Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-accent transition-colors"
                >
                  Contact Studio
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-accent transition-colors"
                >
                  Why MatStudio
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h5 className="font-mono text-xs uppercase tracking-[0.2em] font-semibold text-text-primary mb-4">
              Trust & Legal
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-accent transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="text-xs text-text-muted block leading-relaxed mt-2 font-mono">
                  All artwork inspired by cultural classics. Currency in Australian Dollars (AUD).
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Payment Badges & Copyright */}
        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <p>© {currentYear} MatStudio Australia. Registered Australian Business.</p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs bg-surface border border-border-subtle text-[11px] text-text-primary shadow-2xs">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>SSL 256-Bit</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs bg-surface border border-border-subtle text-[11px] text-text-primary shadow-2xs">
              <CreditCard className="w-3 h-3 text-accent" />
              <span>Apple Pay</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs bg-surface border border-border-subtle text-[11px] text-text-primary shadow-2xs">
              <CreditCard className="w-3 h-3 text-text-secondary" />
              <span>Google Pay</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs bg-surface border border-border-subtle text-[11px] text-text-primary shadow-2xs">
              <CreditCard className="w-3 h-3 text-blue-600" />
              <span>Visa / MC</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs bg-surface border border-border-subtle text-[11px] text-text-primary shadow-2xs">
              <Shield className="w-3 h-3 text-indigo-600" />
              <span>PayPal</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
