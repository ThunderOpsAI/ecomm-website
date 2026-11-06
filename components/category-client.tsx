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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    <div className="min-h-screen pb-20 bg-cream font-sans">
      {/* Category Hero Banner */}
      <section className="relative overflow-hidden py-14 sm:py-20 border-b border-border-subtle bg-surface">
        {/* Glow ambient highlight */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20 bg-accent/15" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center space-x-2 text-xs font-mono text-text-muted mb-4 uppercase tracking-wider">
            <Link href="/" className="hover:text-text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-text-secondary">Collections</span>
            <span>/</span>
            <span className="text-text-primary font-semibold">{title}</span>
          </nav>

          <div className="max-w-3xl space-y-3.5">
            <Badge variant="vermilion" size="sm">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              <span>{subtitle}</span>
            </Badge>

            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-text-primary leading-[1.05]">
              {title}
            </h1>

            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
              {description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted">
              <span className="flex items-center gap-1.5 text-text-secondary font-medium">
                <Truck className="w-3.5 h-3.5 text-accent" />
                Aus Post Dispatch from Wangaratta, VIC
              </span>
              <span>•</span>
              <span className="text-text-muted">
                Showing {filteredProducts.length} designs
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Filter & Product Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Sticky Mobile Filter Bar */}
        <div className="lg:hidden sticky top-16 z-30 mb-6 py-2.5 px-4 rounded-xl bg-surface/95 backdrop-blur-md border border-border-subtle flex items-center justify-between shadow-sm">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 text-xs font-semibold text-text-primary px-3 py-1.5 rounded-lg bg-muted cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-accent" />
            <span>Filters ({selectedSize !== "all" ? 1 : 0})</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-text-muted">{filteredProducts.length} items</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-cream border border-border-subtle rounded-lg px-2.5 py-1.5 text-text-primary focus:outline-hidden"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block space-y-6 sticky top-24">
            <div className="p-5 rounded-2xl bg-surface border border-border-subtle space-y-6 shadow-2xs">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
                  <Filter className="w-4 h-4 text-accent" />
                  Filter Catalog
                </span>
                {(selectedSize !== "all" || maxPrice < 50) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSize("all");
                      setMaxPrice(50);
                    }}
                    className="text-[11px] font-mono text-accent hover:underline font-semibold cursor-pointer"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Collections Navigation */}
              <div>
                <h4 className="text-xs font-mono font-bold text-text-primary uppercase tracking-wider mb-2.5">
                  Collections
                </h4>
                <div className="space-y-1 text-xs">
                  <Link
                    href="/category/japandi"
                    className={`block px-3 py-2 rounded-lg transition-colors ${
                      collectionKey === "japandi"
                        ? "bg-accent/10 text-accent font-semibold"
                        : "text-text-secondary hover:text-text-primary hover:bg-muted"
                    }`}
                  >
                    Japandi Mats (4)
                  </Link>
                  <Link
                    href="/category/anime"
                    className={`block px-3 py-2 rounded-lg transition-colors ${
                      collectionKey === "anime"
                        ? "bg-accent/10 text-accent font-semibold"
                        : "text-text-secondary hover:text-text-primary hover:bg-muted"
                    }`}
                  >
                    Anime Series (4)
                  </Link>
                  <Link
                    href="/category/3d"
                    className={`block px-3 py-2 rounded-lg transition-colors ${
                      collectionKey === "3d"
                        ? "bg-accent/10 text-accent font-semibold"
                        : "text-text-secondary hover:text-text-primary hover:bg-muted"
                    }`}
                  >
                    3D Ergonomic (4)
                  </Link>
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <h4 className="text-xs font-mono font-bold text-text-primary uppercase tracking-wider mb-2.5">
                  Size & Dimensions
                </h4>
                <div className="space-y-1.5 text-xs font-mono">
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
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                        selectedSize === option.id
                          ? "bg-muted text-text-primary font-semibold border border-border-subtle"
                          : "text-text-secondary hover:text-text-primary hover:bg-muted/50"
                      }`}
                    >
                      <span>{option.label}</span>
                      {selectedSize === option.id && (
                        <Check className="w-3.5 h-3.5 text-accent" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2 font-mono">
                  <h4 className="font-bold text-text-primary uppercase tracking-wider">
                    Max Price
                  </h4>
                  <span className="font-bold text-accent font-display text-sm">
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
                  className="w-full accent-accent bg-border-subtle h-1.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-text-muted mt-1 font-mono">
                  <span>$25 AUD</span>
                  <span>$50 AUD</span>
                </div>
              </div>
            </div>

            {/* Aus Post Guarantee Box */}
            <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-text-primary">
                <Truck className="w-4 h-4 text-accent" />
                <span>Australia Post Direct</span>
              </div>
              <p className="text-[11px] text-text-secondary leading-relaxed font-sans">
                All mats are inspected and rolled in heavy protective packaging in Wangaratta, VIC before dispatch.
              </p>
            </div>
          </aside>

          {/* Right Product Grid Area */}
          <main className="lg:col-span-3 space-y-6">
            {/* Desktop Top Bar: Count & Sorting */}
            <div className="hidden lg:flex items-center justify-between p-4 rounded-xl bg-surface border border-border-subtle shadow-2xs">
              <span className="text-xs font-medium text-text-secondary font-mono">
                Showing <strong className="text-text-primary">{filteredProducts.length}</strong> designs
              </span>

              <div className="flex items-center gap-3">
                <span className="text-xs text-text-muted flex items-center gap-1 font-mono">
                  <ArrowUpDown className="w-3 h-3" />
                  Sort By:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs bg-cream border border-border-subtle rounded-lg px-3 py-1.5 text-text-primary focus:outline-hidden focus:border-accent"
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
              <div className="p-12 text-center rounded-2xl bg-surface border border-border-subtle space-y-4 shadow-2xs">
                <div className="w-14 h-14 rounded-full bg-muted border border-border-subtle flex items-center justify-center mx-auto text-text-muted">
                  <Filter className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-text-primary">
                    No matching desk mats found
                  </h3>
                  <p className="text-xs text-text-secondary mt-1">
                    Try raising the max price slider or selecting &ldquo;All Sizes&rdquo;.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setSelectedSize("all");
                    setMaxPrice(50);
                  }}
                >
                  Reset Filters
                </Button>
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
        <div className="fixed inset-0 z-50 flex justify-end font-sans">
          <div
            className="fixed inset-0 bg-ink/50 backdrop-blur-xs"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-surface border-l border-border-subtle p-5 flex flex-col justify-between overflow-y-auto z-10 shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                <h3 className="font-display text-base font-bold text-text-primary flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-accent" />
                  Filters
                </h3>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 text-text-muted hover:text-text-primary cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Collections Mobile */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-text-muted mb-2">Collection</h4>
                <div className="space-y-1 text-xs">
                  <Link
                    href="/category/japandi"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="block px-3 py-2 rounded-lg bg-cream border border-border-subtle text-text-primary"
                  >
                    Japandi Mats
                  </Link>
                  <Link
                    href="/category/anime"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="block px-3 py-2 rounded-lg bg-cream border border-border-subtle text-text-primary"
                  >
                    Anime Series
                  </Link>
                  <Link
                    href="/category/3d"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="block px-3 py-2 rounded-lg bg-cream border border-border-subtle text-text-primary"
                  >
                    3D Ergonomic
                  </Link>
                </div>
              </div>

              {/* Size Selector Mobile */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-text-muted mb-2">Size</h4>
                <div className="space-y-1 text-xs font-mono">
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
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left border cursor-pointer ${
                        selectedSize === option.id
                          ? "bg-accent/10 border-accent/30 text-accent font-semibold"
                          : "text-text-secondary bg-cream border-border-subtle"
                      }`}
                    >
                      <span>{option.label}</span>
                      {selectedSize === option.id && <Check className="w-3.5 h-3.5 text-accent" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter Mobile */}
              <div>
                <div className="flex justify-between text-xs mb-2 font-mono">
                  <span className="font-bold uppercase text-text-muted">Max Price</span>
                  <span className="text-accent font-bold">${maxPrice} AUD</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="50"
                  step="1"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full"
            >
              Apply Filters ({filteredProducts.length} items)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryClient;
