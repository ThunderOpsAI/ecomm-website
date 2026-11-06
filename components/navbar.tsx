"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Truck,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function Navbar() {
  const pathname = usePathname();
  const { itemCount, openCartDrawer, openSearch } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isBumping, setIsBumping] = useState(false);

  // Elevation on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cart badge bump animation whenever itemCount changes
  useEffect(() => {
    if (itemCount === 0) return;
    const bumpTimer = setTimeout(() => setIsBumping(true), 0);
    const resetTimer = setTimeout(() => setIsBumping(false), 500);
    return () => {
      clearTimeout(bumpTimer);
      clearTimeout(resetTimer);
    };
  }, [itemCount]);

  // Shortcut key: Cmd/Ctrl + K opens search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openSearch]);

  const navLinks = [
    { href: "/category/japandi", label: "Japandi", badge: null },
    { href: "/category/anime", label: "Anime Series", badge: "Hot" },
    { href: "/category/3d", label: "3D Ergonomic", badge: null },
    { href: "/about", label: "Craft & Story", badge: null },
  ];

  const isHome = pathname === "/";
  // On home at top, make the navbar seamlessly blend with the dark ink hero
  const isTransparentHero = isHome && !scrolled;

  return (
    <>
      {/* Top Aus Post Notification Bar */}
      <div
        className={`text-xs py-2 px-4 transition-colors border-b ${
          isTransparentHero
            ? "bg-ink text-cream/70 border-border-dark"
            : "bg-muted text-text-secondary border-border-subtle"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
            <span
              className={`font-medium flex items-center gap-1.5 ${
                isTransparentHero ? "text-cream" : "text-text-primary"
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-accent" />
              Australia Post Dispatch from Wangaratta, VIC
            </span>
            <span className="hidden sm:inline opacity-30">|</span>
            <span className="hidden sm:inline">
              Free Express Shipping on orders over $60 AUD
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <Link
              href="/shipping"
              className="hover:underline transition-colors opacity-80 hover:opacity-100"
            >
              Shipping Policy
            </Link>
            <span className="opacity-30">•</span>
            <span
              className={`font-semibold ${
                isTransparentHero ? "text-accent-amber" : "text-text-primary"
              }`}
            >
              AUD ($)
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isTransparentHero
            ? "bg-ink/90 backdrop-blur-md border-b border-border-dark text-cream"
            : scrolled
            ? "bg-surface/90 backdrop-blur-md border-b border-border-subtle shadow-xs text-text-primary"
            : "bg-surface border-b border-border-subtle text-text-primary"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo */}
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="flex items-center gap-2.5 group focus:outline-hidden"
                aria-label="MatStudio Home"
              >
                {/* Hanko Stamp Icon */}
                <div className="w-8 h-8 rounded-sm bg-accent flex items-center justify-center shadow-xs shadow-accent/40 group-hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-display text-sm font-bold tracking-widest">
                    印
                  </span>
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-xl sm:text-2xl font-bold font-display tracking-tight leading-none ${
                      isTransparentHero ? "text-cream" : "text-text-primary"
                    }`}
                  >
                    Mat<span className="text-accent">Studio</span>
                  </span>
                  <span className="text-[9px] font-mono tracking-[0.2em] uppercase font-medium text-text-muted mt-0.5">
                    Wangaratta • Australia
                  </span>
                </div>
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative px-3.5 py-2 text-sm rounded-sm transition-all duration-200 flex items-center gap-1.5 ${
                        isTransparentHero
                          ? isActive
                            ? "text-cream bg-white/10 font-semibold"
                            : "text-cream/80 hover:text-cream hover:bg-white/5 font-medium"
                          : isActive
                          ? "text-text-primary bg-muted font-semibold"
                          : "text-text-secondary hover:text-text-primary hover:bg-muted/60 font-medium"
                      }`}
                    >
                      {link.label}
                      {link.badge && (
                        <span className="text-[10px] font-mono font-bold tracking-wider px-1.5 py-0.2 rounded-xs bg-accent/20 text-accent border border-accent/30">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Desktop Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Trigger Button */}
              <button
                type="button"
                onClick={openSearch}
                className={`hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-sm border text-xs transition-all duration-200 ${
                  isTransparentHero
                    ? "border-border-dark bg-ink-subtle text-cream/60 hover:text-cream hover:border-cream/30"
                    : "border-border-subtle bg-cream text-text-muted hover:text-text-primary hover:border-border-hover"
                }`}
                aria-label="Search catalog"
              >
                <Search className="w-3.5 h-3.5 opacity-70" />
                <span className="font-sans">Search collection...</span>
                <kbd
                  className={`hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded ${
                    isTransparentHero
                      ? "bg-ink-muted text-cream/70 border border-border-dark"
                      : "bg-surface text-text-muted border border-border-subtle"
                  }`}
                >
                  ⌘K
                </kbd>
              </button>

              {/* Mobile Search Icon Button */}
              <button
                type="button"
                onClick={openSearch}
                className={`md:hidden p-2 rounded-sm transition-colors ${
                  isTransparentHero
                    ? "text-cream/80 hover:text-cream hover:bg-white/5"
                    : "text-text-secondary hover:text-text-primary hover:bg-muted"
                }`}
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={openCartDrawer}
                className="relative flex items-center gap-2 px-3.5 py-2 rounded-sm bg-accent hover:bg-accent-hover active:scale-95 text-white text-sm font-semibold transition-all duration-200 shadow-sm cursor-pointer"
                aria-label={`View Cart, ${itemCount} items`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline font-sans">Cart</span>
                <span
                  className={`flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-mono font-bold rounded-xs bg-white text-accent ${
                    isBumping ? "animate-cart-bump" : ""
                  }`}
                >
                  {itemCount}
                </span>
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className={`lg:hidden p-2 rounded-sm transition-colors ${
                  isTransparentHero
                    ? "text-cream/80 hover:text-cream hover:bg-white/5"
                    : "text-text-secondary hover:text-text-primary hover:bg-muted"
                }`}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border-subtle bg-surface px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-4 duration-200 text-text-primary">
            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-sm text-sm font-medium hover:bg-muted"
              >
                <span>Storefront Home</span>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-sm text-sm font-medium hover:bg-muted"
                >
                  <span className="flex items-center gap-2">
                    {link.label}
                    {link.badge && (
                      <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-xs bg-accent/15 text-accent">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight className="w-4 h-4 text-text-muted" />
                </Link>
              ))}
              <Link
                href="/shipping"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-sm text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-muted"
              >
                <span>Shipping & Returns (Wangaratta, VIC)</span>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </Link>
              <Link
                href="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-sm text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-muted"
              >
                <span>FAQ & Care Guide</span>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-sm text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-muted"
              >
                <span>Contact Customer Support</span>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </Link>
            </div>

            <div className="pt-2 border-t border-border-subtle">
              <div className="p-3 rounded-sm bg-muted border border-border-subtle flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-accent shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold text-text-primary">30-Day Anti-Slip Trial</p>
                  <p className="text-text-secondary">
                    100% natural vulcanized rubber guarantee on every pad.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
