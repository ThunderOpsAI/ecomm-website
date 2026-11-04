"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  Truck,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function Navbar() {
  const pathname = usePathname();
  const { itemCount, openCartDrawer, openSearch, theme, toggleTheme } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Elevation on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    { href: "/category/japandi", label: "Japandi Mats", badge: null },
    { href: "/category/anime", label: "Anime Series", badge: "Hot" },
    { href: "/category/3d", label: "3D Ergonomic", badge: null },
    { href: "/about", label: "Why MatStudio", badge: null },
  ];

  return (
    <>
      {/* Top Aus Post Notification Bar */}
      <div className="bg-[#f4f4ee] border-b border-[#e6e6dc] text-xs text-[#555a68] py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#d9381e] animate-pulse"></span>
            <span className="font-semibold text-[#14161b] flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#d9381e]" />
              Australia Post Dispatch from Wangaratta, VIC
            </span>
            <span className="hidden sm:inline text-[#c4c4b8]">|</span>
            <span className="hidden sm:inline text-[#555a68]">
              Free Express Shipping on orders over $60 AUD
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <Link
              href="/shipping"
              className="text-[#555a68] hover:text-[#14161b] transition-colors underline-offset-2 hover:underline"
            >
              Shipping Policy
            </Link>
            <span className="text-[#c4c4b8]">•</span>
            <span className="font-semibold text-[#14161b]">AUD ($)</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[#e5e5dc] shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
            : "bg-white border-b border-[#ebebe3]"
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
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#d9381e] to-[#b82e16] flex items-center justify-center shadow-xs shadow-[#d9381e]/30 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-4 h-4 rounded-xs border-2 border-white/95 transform rotate-12 group-hover:rotate-0 transition-transform duration-300"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#14161b] font-mono leading-none">
                    Mat<span className="text-[#d9381e]">Studio</span>
                  </span>
                  <span className="text-[10px] tracking-widest text-[#7b8192] uppercase font-semibold mt-0.5">
                    Desk Mats • Australia
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
                      className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                        isActive
                          ? "text-[#14161b] bg-[#f2f2ed] font-semibold"
                          : "text-[#555a68] hover:text-[#14161b] hover:bg-[#f7f7f4]"
                      }`}
                    >
                      {link.label}
                      {link.badge && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-[#d9381e]/10 text-[#d9381e] border border-[#d9381e]/20">
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
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#e5e5dc] bg-[#fafaf7] text-xs text-[#7b8192] hover:text-[#14161b] hover:border-[#cecec3] transition-all duration-200 shadow-2xs"
                aria-label="Search catalog"
              >
                <Search className="w-3.5 h-3.5 text-[#7b8192]" />
                <span>Search designs...</span>
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-[#e5e5dc] rounded text-[#7b8192]">
                  ⌘K
                </kbd>
              </button>

              {/* Mobile Search Icon Button */}
              <button
                type="button"
                onClick={openSearch}
                className="md:hidden p-2 rounded-lg text-[#555a68] hover:text-[#14161b] hover:bg-[#f4f4ee] transition-colors"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-lg text-[#555a68] hover:text-[#14161b] hover:bg-[#f4f4ee] transition-colors"
                aria-label="Toggle display theme"
                title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-amber-500" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-600" />
                )}
              </button>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={openCartDrawer}
                className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#d9381e] hover:bg-[#be2e17] active:scale-95 text-white text-sm font-semibold transition-all duration-200 shadow-xs shadow-[#d9381e]/30"
                aria-label={`View Cart, ${itemCount} items`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full bg-white text-[#d9381e]">
                  {itemCount}
                </span>
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="lg:hidden p-2 rounded-lg text-[#555a68] hover:text-[#14161b] hover:bg-[#f4f4ee] transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#e5e5dc] bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#14161b] hover:bg-[#f7f7f4]"
              >
                <span>Storefront Home</span>
                <ChevronRight className="w-4 h-4 text-[#7b8192]" />
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#14161b] hover:bg-[#f7f7f4]"
                >
                  <span className="flex items-center gap-2">
                    {link.label}
                    {link.badge && (
                      <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-[#d9381e]/10 text-[#d9381e]">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#7b8192]" />
                </Link>
              ))}
              <Link
                href="/shipping"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#555a68] hover:text-[#14161b] hover:bg-[#f7f7f4]"
              >
                <span>Shipping & Returns (Wangaratta, VIC)</span>
                <ChevronRight className="w-4 h-4 text-[#7b8192]" />
              </Link>
              <Link
                href="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#555a68] hover:text-[#14161b] hover:bg-[#f7f7f4]"
              >
                <span>FAQ & Care Guide</span>
                <ChevronRight className="w-4 h-4 text-[#7b8192]" />
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#555a68] hover:text-[#14161b] hover:bg-[#f7f7f4]"
              >
                <span>Contact Customer Support</span>
                <ChevronRight className="w-4 h-4 text-[#7b8192]" />
              </Link>
            </div>

            <div className="pt-2 border-t border-[#e5e5dc]">
              <div className="p-3 rounded-xl bg-[#f7f7f4] border border-[#e5e5dc] flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#d9381e] shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold text-[#14161b]">30-Day Anti-Slip Trial</p>
                  <p className="text-[#555a68]">
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
