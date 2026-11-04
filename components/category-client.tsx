"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  SlidersHorizontal,
  X,
  Filter,
  Check,
  Sparkles,
  ArrowUpDown,
  Truck,
} from "lucide-react";
import { PRODUCTS, COLLECTIONS } from "@/src/data/products";
import { ProductCard } from "@/components/product-card";

export interface CategoryClientProps {
  collectionKey: string;
}

export function CategoryClient({ collectionKey }: CategoryClientProps) {
  const collectionInfo = COLLECTIONS[collectionKey];

  // Filter States
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [maxPrice, setMaxPrice] = useState<number>(50); // in AUD
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Products filtered and sorted
  const filteredProducts = useMemo(() => {
    const list = PRODUCTS.filter((p) => {
      // If valid collection slug, filter by collection
      if (collectionKey in COLLECTIONS) {
        if (p.collection !== collectionKey) return false;
      }

      // Size filter
      if (selectedSize !== "all") {
        const matchesSize = p.variants.some((v) =>
          v.size.toLowerCase().includes(selectedSize.toLowerCase())
        );
        if (!matchesSize) return false;
      }

      // Price filter
      if (p.priceCents > maxPrice * 100) return false;

      return true;
    });

    // Sorting
    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.priceCents - b.priceCents);
        break;
      case "price-desc":
        list.sort((a, b) => b.priceCents - a.priceCents);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "featured":
      default:
        list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return list;
  }, [collectionKey, selectedSize, maxPrice, sortBy]);

  const title = collectionInfo?.title || "All MatStudio Products";
  const subtitle = collectionInfo?.subtitle || "Precision Gaming Mouse Pads & Desk Mats";
  const description =
    collectionInfo?.description ||
    "Engineered with high-thread micro-woven cloth, 360° anti-fray stitched edges, and natural anti-slip rubber bases.";

  return (
    <div className="min-h-screen pb-16">
      {/* Category Hero Banner */}
      <section className="relative overflow-hidden py-12 sm:py-20 border-b border-[#e5e5dc] bg-gradient-to-b from-[#f5f5f0] via-[#fafaf7] to-[#fafaf8]">
        {/* Glow ambient highlight */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20 bg-[#d9381e]/15" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center space-x-2 text-xs text-[#7b8192] mb-4">
            <Link href="/" className="hover:text-[#14161b] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#555a68]">Collections</span>
            <span>/</span>
            <span className="text-[#14161b] font-semibold">{title}</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-[#e5e5dc] text-[#14161b] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#d9381e]" />
              <span>{subtitle}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#14161b]">
              {title}
            </h1>

            <p className="text-sm sm:text-base text-[#555a68] leading-relaxed">
              {description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#7b8192]">
              <span className="flex items-center gap-1.5 text-[#555a68] font-medium">
                <Truck className="w-3.5 h-3.5 text-[#d9381e]" />
                Aus Post Dispatch from Wangaratta, VIC
              </span>
              <span>•</span>
              <span className="text-[#7b8192] font-mono">
                Showing {filteredProducts.length} designs
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Filter & Product Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Sticky Mobile Filter Bar */}
        <div className="lg:hidden sticky top-16 z-30 mb-6 py-2.5 px-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#e5e5dc] flex items-center justify-between shadow-sm">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 text-xs font-semibold text-[#14161b] px-3 py-1.5 rounded-lg bg-[#f2f2ed]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#d9381e]" />
            <span>Filters ({selectedSize !== "all" ? 1 : 0})</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#7b8192]">{filteredProducts.length} items</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-[#fafaf7] border border-[#e5e5dc] rounded-lg px-2.5 py-1.5 text-[#14161b] focus:outline-hidden"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block space-y-6">
            <div className="p-5 rounded-2xl bg-white border border-[#e5e5dc] space-y-6 shadow-2xs">
              <div className="flex items-center justify-between border-b border-[#f0f0e8] pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#14161b] flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#d9381e]" />
                  Filter Catalog
                </span>
                {(selectedSize !== "all" || maxPrice < 50) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSize("all");
                      setMaxPrice(50);
                    }}
                    className="text-[11px] text-[#d9381e] hover:underline font-semibold"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Collections Navigation */}
              <div>
                <h4 className="text-xs font-bold text-[#14161b] uppercase tracking-wider mb-2.5">
                  Collections
                </h4>
                <div className="space-y-1 text-xs">
                  <Link
                    href="/category/japandi"
                    className={`block px-3 py-2 rounded-xl transition-colors ${
                      collectionKey === "japandi"
                        ? "bg-[#d9381e]/10 text-[#d9381e] font-semibold"
                        : "text-[#555a68] hover:text-[#14161b] hover:bg-[#f7f7f4]"
                    }`}
                  >
                    Japandi Mats (4)
                  </Link>
                  <Link
                    href="/category/anime"
                    className={`block px-3 py-2 rounded-xl transition-colors ${
                      collectionKey === "anime"
                        ? "bg-[#d9381e]/10 text-[#d9381e] font-semibold"
                        : "text-[#555a68] hover:text-[#14161b] hover:bg-[#f7f7f4]"
                    }`}
                  >
                    Anime Series (4)
                  </Link>
                  <Link
                    href="/category/3d"
                    className={`block px-3 py-2 rounded-xl transition-colors ${
                      collectionKey === "3d"
                        ? "bg-[#d9381e]/10 text-[#d9381e] font-semibold"
                        : "text-[#555a68] hover:text-[#14161b] hover:bg-[#f7f7f4]"
                    }`}
                  >
                    3D Ergonomic (4)
                  </Link>
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <h4 className="text-xs font-bold text-[#14161b] uppercase tracking-wider mb-2.5">
                  Size & Dimensions
                </h4>
                <div className="space-y-1.5 text-xs">
                  {[
                    { id: "all", label: "All Sizes" },
                    { id: "900", label: "Large Desk Mat (400×900mm)" },
                    { id: "240", label: "Standard Pad (200×240mm)" },
                    { id: "contour", label: "Ergonomic Contour (215×260mm)" },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedSize(option.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors ${
                        selectedSize === option.id
                          ? "bg-[#f2f2ed] text-[#14161b] font-semibold border border-[#e5e5dc]"
                          : "text-[#555a68] hover:text-[#14161b] hover:bg-[#f7f7f4]"
                      }`}
                    >
                      <span>{option.label}</span>
                      {selectedSize === option.id && (
                        <Check className="w-3.5 h-3.5 text-[#d9381e]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <h4 className="font-bold text-[#14161b] uppercase tracking-wider">
                    Max Price
                  </h4>
                  <span className="font-mono font-bold text-[#d9381e]">
                    ${maxPrice}.00 AUD
                  </span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="50"
                  step="1"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#d9381e] bg-[#e5e5dc] h-1.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#7b8192] mt-1 font-mono">
                  <span>$25 AUD</span>
                  <span>$50 AUD</span>
                </div>
              </div>
            </div>

            {/* Aus Post Guarantee Box */}
            <div className="p-4 rounded-2xl bg-[#fafaf7] border border-[#e5e5dc] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#14161b]">
                <Truck className="w-4 h-4 text-[#d9381e]" />
                <span>Australia Post Direct</span>
              </div>
              <p className="text-[11px] text-[#555a68] leading-relaxed">
                All mats are inspected and rolled in heavy protective packaging in Wangaratta, VIC before dispatch.
              </p>
            </div>
          </aside>

          {/* Right Product Grid Area */}
          <main className="lg:col-span-3 space-y-6">
            {/* Desktop Top Bar: Count & Sorting */}
            <div className="hidden lg:flex items-center justify-between p-4 rounded-2xl bg-white border border-[#e5e5dc] shadow-2xs">
              <span className="text-xs font-medium text-[#555a68]">
                Showing <strong className="text-[#14161b]">{filteredProducts.length}</strong> products
              </span>

              <div className="flex items-center gap-3">
                <span className="text-xs text-[#7b8192] flex items-center gap-1">
                  <ArrowUpDown className="w-3 h-3" />
                  Sort By:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs bg-[#fafaf7] border border-[#e5e5dc] rounded-xl px-3 py-1.5 text-[#14161b] focus:outline-hidden focus:border-[#d9381e]"
                >
                  <option value="featured">Featured Picks</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
              </div>
            </div>

            {/* Empty State or Product Cards */}
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-white border border-[#e5e5dc] space-y-4 shadow-2xs">
                <div className="w-14 h-14 rounded-full bg-[#f4f4ee] border border-[#e5e5dc] flex items-center justify-center mx-auto text-[#7b8192]">
                  <Filter className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#14161b]">No matching desk mats found</h3>
                  <p className="text-xs text-[#555a68] mt-1">
                    Try raising the max price slider or selecting &ldquo;All Sizes&rdquo;.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSize("all");
                    setMaxPrice(50);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#d9381e] text-white text-xs font-semibold shadow-2xs"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Modal Dialog */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-white border-l border-[#e5e5dc] p-5 flex flex-col justify-between overflow-y-auto z-10 shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#e5e5dc] pb-3">
                <h3 className="text-base font-bold text-[#14161b] flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#d9381e]" />
                  Filters
                </h3>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 text-[#7b8192] hover:text-[#14161b]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Collections Mobile */}
              <div>
                <h4 className="text-xs font-bold uppercase text-[#7b8192] mb-2">Collection</h4>
                <div className="space-y-1 text-xs">
                  <Link
                    href="/category/japandi"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="block px-3 py-2 rounded-xl bg-[#fafaf7] border border-[#e5e5dc] text-[#14161b]"
                  >
                    Japandi Mats
                  </Link>
                  <Link
                    href="/category/anime"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="block px-3 py-2 rounded-xl bg-[#fafaf7] border border-[#e5e5dc] text-[#14161b]"
                  >
                    Anime Series
                  </Link>
                  <Link
                    href="/category/3d"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="block px-3 py-2 rounded-xl bg-[#fafaf7] border border-[#e5e5dc] text-[#14161b]"
                  >
                    3D Ergonomic
                  </Link>
                </div>
              </div>

              {/* Size Selector Mobile */}
              <div>
                <h4 className="text-xs font-bold uppercase text-[#7b8192] mb-2">Size</h4>
                <div className="space-y-1 text-xs">
                  {[
                    { id: "all", label: "All Sizes" },
                    { id: "900", label: "Large (400×900mm)" },
                    { id: "240", label: "Standard (200×240mm)" },
                    { id: "contour", label: "Ergonomic Contour" },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedSize(option.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left border ${
                        selectedSize === option.id
                          ? "bg-[#d9381e]/10 border-[#d9381e]/30 text-[#d9381e] font-semibold"
                          : "text-[#555a68] bg-[#fafaf7] border-[#e5e5dc]"
                      }`}
                    >
                      <span>{option.label}</span>
                      {selectedSize === option.id && <Check className="w-3.5 h-3.5 text-[#d9381e]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter Mobile */}
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-bold uppercase text-[#7b8192]">Max Price</span>
                  <span className="font-mono text-[#d9381e] font-bold">${maxPrice} AUD</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="50"
                  step="1"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#d9381e]"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full py-3 rounded-xl bg-[#d9381e] text-white text-xs font-bold shadow-xs shadow-[#d9381e]/25"
            >
              Apply Filters ({filteredProducts.length} items)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryClient;
