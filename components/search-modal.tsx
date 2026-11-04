"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Star } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { PRODUCTS, Product, formatAud } from "@/src/data/products";

export function SearchModal() {
  const { isSearchOpen, closeSearch } = useCart();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setQuery("");
    closeSearch();
  }, [closeSearch]);

  // Focus input when opened
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  // Real-time search filter via useMemo
  const results = useMemo(() => {
    if (!query.trim()) {
      return PRODUCTS.slice(0, 4);
    }
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.collectionName.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, handleClose]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative mx-auto max-w-2xl transform overflow-hidden rounded-2xl bg-white border border-[#e5e5dc] text-[#14161b] shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Search Bar Input */}
        <div className="relative flex items-center border-b border-[#e5e5dc] px-4 py-3.5 sm:px-6">
          <Search className="w-5 h-5 text-[#7b8192] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search desk mats, anime series, 3D ergonomic pads..."
            className="w-full bg-transparent px-3 text-sm sm:text-base text-[#14161b] placeholder-[#7b8192] focus:outline-hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 text-[#7b8192] hover:text-[#14161b]"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[#f2f2ed] border border-[#e5e5dc] rounded text-[#7b8192]">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 sm:p-4 space-y-2">
          <div className="flex items-center justify-between px-2 py-1 text-[11px] font-semibold text-[#7b8192] uppercase tracking-wider">
            <span>{query ? `Search Results (${results.length})` : "Featured Suggestions"}</span>
            <span>AUD Currency</span>
          </div>

          {results.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#555a68]">
              <p>No products found matching &ldquo;{query}&rdquo;.</p>
              <p className="text-xs text-[#7b8192] mt-1">
                Try searching for &quot;Japandi&quot;, &quot;Saiyan&quot;, &quot;Ergonomic&quot;, or &quot;Ronin&quot;.
              </p>
            </div>
          ) : (
            results.map((product: Product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                onClick={handleClose}
                className="group flex items-center justify-between p-2.5 rounded-xl bg-[#fafaf7] hover:bg-[#f2f2ed] border border-[#e5e5dc] transition-all duration-200"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#f4f4ee] shrink-0 border border-[#e5e5dc]">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-[#e5e5dc] text-[#555a68]">
                        {product.collectionName}
                      </span>
                      <div className="flex items-center text-amber-500 text-xs">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="ml-1 text-[11px] text-[#7b8192]">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                    <h4 className="text-sm font-semibold text-[#14161b] group-hover:text-[#d9381e] transition-colors truncate mt-0.5">
                      {product.title}
                    </h4>
                    <p className="text-xs text-[#7b8192] truncate">{product.tagline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 pl-3">
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#14161b]">
                      {formatAud(product.priceCents)}
                    </span>
                    <span className="block text-[10px] text-emerald-700 font-medium">In Stock</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#7b8192] group-hover:text-[#d9381e] group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Modal Footer Quick Shortcuts */}
        <div className="border-t border-[#e5e5dc] bg-[#fafaf7] px-4 py-3 flex items-center justify-between text-xs text-[#7b8192]">
          <span>Tip: Press Tab to navigate items</span>
          <button
            type="button"
            onClick={handleClose}
            className="hover:text-[#14161b] font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
