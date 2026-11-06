"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Star,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import { Product, formatAud } from "@/src/data/products";
import { useCart } from "@/lib/cart-context";
import { ProductCard } from "@/components/product-card";
import { DeskSizeVisualizer } from "@/components/desk-size-visualizer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  // Gallery active image
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Variant & Quantity
  const [selectedVariant, setSelectedVariant] = useState(
    () => product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "desc" | "specs" | "shipping" | "reviews"
  >("desc");
  const [addedNotice, setAddedNotice] = useState(false);

  // Zoom on hover state
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 50, y: 50 });

  const { addItem } = useCart();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomCoords({ x, y });
  };

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      sku: product.sku,
      image: product.images[0],
      size: selectedVariant.size,
      priceCents: selectedVariant.priceCents,
      quantity: quantity,
      collection: product.collection,
    });

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="pb-24 sm:pb-32 bg-cream font-sans">
      {/* Product JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.title,
            image: product.images,
            description: product.description,
            sku: product.sku,
            brand: {
              "@type": "Brand",
              name: "MatStudio",
            },
            offers: {
              "@type": "Offer",
              url: `https://matstudio.com.au/products/${product.slug}`,
              priceCurrency: "AUD",
              price: (selectedVariant.priceCents / 100).toFixed(2),
              availability: "https://schema.org/InStock",
              itemCondition: "https://schema.org/NewCondition",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviewCount,
            },
          }),
        }}
      />

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <nav className="flex items-center space-x-2 text-xs font-mono text-text-muted uppercase tracking-wider">
          <Link href="/" className="hover:text-text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/category/${product.collection}`}
            className="hover:text-text-primary transition-colors"
          >
            {product.collectionName}
          </Link>
          <span>/</span>
          <span className="text-text-primary font-medium line-clamp-1">
            {product.title}
          </span>
        </nav>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Image Gallery (Col 7) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Large Image Stage with Hover-Zoom */}
            <div
              className="relative aspect-16/10 rounded-2xl overflow-hidden bg-surface border border-border-subtle group shadow-xs cursor-crosshair select-none"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={`${product.title} view ${activeImageIndex + 1}`}
                className={`w-full h-full object-cover transition-transform duration-200 ${
                  isZoomed ? "scale-150" : "scale-100"
                }`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`,
                      }
                    : undefined
                }
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2 pointer-events-none">
                <Badge variant="neutral" size="sm" className="bg-surface/90 backdrop-blur-md">
                  {product.collectionName}
                </Badge>
                {product.badge && (
                  <Badge variant="vermilion" size="sm">
                    {product.badge}
                  </Badge>
                )}
              </div>

              <div className="absolute bottom-4 right-4 pointer-events-none">
                <span className="px-2.5 py-1 rounded-xs text-[11px] font-mono font-semibold bg-surface/90 backdrop-blur-md text-text-primary border border-border-subtle shadow-2xs">
                  {activeImageIndex + 1} / {product.images.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-16/10 rounded-lg overflow-hidden bg-surface border-2 transition-all duration-200 cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-accent shadow-xs shadow-accent/20"
                        : "border-border-subtle hover:border-border-hover opacity-80 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges Strip under Gallery */}
            <div className="grid grid-cols-3 gap-3 pt-3">
              <div className="p-3.5 rounded-xl bg-surface border border-border-subtle flex items-center gap-2.5 shadow-2xs">
                <Truck className="w-4 h-4 text-accent shrink-0" />
                <div className="text-[11px]">
                  <p className="font-semibold text-text-primary">Wangaratta Dispatch</p>
                  <p className="text-text-muted">Aus Post tracked</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface border border-border-subtle flex items-center gap-2.5 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                <div className="text-[11px]">
                  <p className="font-semibold text-text-primary">Anti-Slip Grip</p>
                  <p className="text-text-muted">100% natural rubber</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface border border-border-subtle flex items-center gap-2.5 shadow-2xs">
                <RotateCcw className="w-4 h-4 text-accent shrink-0" />
                <div className="text-[11px]">
                  <p className="font-semibold text-text-primary">30-Day Trial</p>
                  <p className="text-text-muted">Hassle-free returns</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sticky Buy Box & Details (Col 5) */}
          <div className="lg:col-span-5 flex flex-col space-y-6 lg:sticky lg:top-24">
            <div>
              {/* Rating & Review Header */}
              <div className="flex items-center gap-2 text-xs text-text-muted mb-2 font-mono">
                <div className="flex items-center text-accent-amber">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-text-primary">{product.rating}</span>
                <span>({product.reviewCount} reviews)</span>
                <span className="opacity-40">•</span>
                <span>{product.sku}</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-[1.05]">
                {product.title}
              </h1>

              <p className="text-sm text-text-secondary mt-2.5 leading-relaxed font-sans">
                {product.tagline}
              </p>
            </div>

            {/* Price Row */}
            <div className="p-4 rounded-xl bg-surface border border-border-subtle flex items-baseline justify-between shadow-2xs">
              <div>
                <span className="font-display text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
                  {formatAud(selectedVariant.priceCents)}
                </span>
                <span className="ml-2 font-mono text-xs text-text-muted">AUD (incl. GST)</span>
              </div>

              <span className="px-2.5 py-1 rounded-xs text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                In Stock ({product.stock} units)
              </span>
            </div>

            {/* Size Variant Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold uppercase tracking-wider text-text-primary">
                  Select Dimension
                </span>
                <a
                  href="#desk-visualizer"
                  className="text-accent hover:underline font-semibold flex items-center gap-1"
                >
                  Desk Visualizer ↓
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant.size === v.size;
                  return (
                    <button
                      key={v.size}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-muted border-accent shadow-xs"
                          : "bg-surface border-border-subtle hover:border-border-hover"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-text-primary font-mono">{v.size}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-accent" />}
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[11px] text-text-secondary font-mono">
                        <span>{v.thickness}</span>
                        <span className="font-semibold text-text-primary font-display">
                          {formatAud(v.priceCents)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center rounded-xl border border-border-subtle bg-surface p-1 shrink-0 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-mono text-sm font-bold text-text-primary">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="p-2 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Add to Cart */}
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  className="flex-1"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {addedNotice
                      ? "Added to Cart!"
                      : `Add to Cart • ${formatAud(selectedVariant.priceCents * quantity)}`}
                  </span>
                </Button>
              </div>

              {/* Direct Buy / Checkout */}
              <Link href="/checkout" onClick={handleAddToCart} className="w-full block">
                <Button variant="outline" size="md" className="w-full">
                  Buy Now (Instant Checkout)
                </Button>
              </Link>
            </div>

            {/* Shipping Dispatch Notice */}
            <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-1.5 text-xs text-text-secondary">
              <div className="flex items-center gap-2 text-text-primary font-semibold font-mono">
                <Truck className="w-4 h-4 text-accent" />
                <span>Australia Post Dispatch Estimate</span>
              </div>
              <p className="leading-relaxed">
                Order now for dispatch within 24 business hours from Wangaratta, VIC. Free express
                shipping applies automatically at checkout for orders over $60 AUD.
              </p>
            </div>

            {/* Tabs for In-Depth Info */}
            <div className="border-t border-border-subtle pt-6 space-y-4">
              <div className="flex border-b border-border-subtle text-xs font-mono uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => setActiveTab("desc")}
                  className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
                    activeTab === "desc"
                      ? "border-accent text-text-primary font-bold"
                      : "border-transparent text-text-muted hover:text-text-primary"
                  }`}
                >
                  Description
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("specs")}
                  className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
                    activeTab === "specs"
                      ? "border-accent text-text-primary font-bold"
                      : "border-transparent text-text-muted hover:text-text-primary"
                  }`}
                >
                  Specifications
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("shipping")}
                  className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
                    activeTab === "shipping"
                      ? "border-accent text-text-primary font-bold"
                      : "border-transparent text-text-muted hover:text-text-primary"
                  }`}
                >
                  Shipping & Returns
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
                    activeTab === "reviews"
                      ? "border-accent text-text-primary font-bold"
                      : "border-transparent text-text-muted hover:text-text-primary"
                  }`}
                >
                  Reviews ({product.reviews.length})
                </button>
              </div>

              {/* Tab Contents */}
              <div className="text-xs sm:text-sm text-text-secondary leading-relaxed space-y-3 font-sans">
                {activeTab === "desc" && (
                  <div className="space-y-3">
                    <p>{product.description}</p>
                    <p className="text-xs text-text-muted italic">{product.story}</p>
                    <div className="pt-2">
                      <h4 className="font-bold text-text-primary text-xs font-mono uppercase tracking-wider mb-2">
                        Key Features:
                      </h4>
                      <ul className="space-y-1.5 list-disc pl-4 text-xs">
                        {product.features.map((feat, idx) => (
                          <li key={idx}>{feat}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "specs" && (
                  <div className="space-y-2 text-xs font-mono">
                    <div className="grid grid-cols-2 py-2 border-b border-border-subtle">
                      <span className="text-text-muted">Dimensions</span>
                      <span className="font-semibold text-text-primary">{selectedVariant.dimensions}</span>
                    </div>
                    <div className="grid grid-cols-2 py-2 border-b border-border-subtle">
                      <span className="text-text-muted">Thickness</span>
                      <span className="font-semibold text-text-primary">{selectedVariant.thickness}</span>
                    </div>
                    <div className="grid grid-cols-2 py-2 border-b border-border-subtle">
                      <span className="text-text-muted">Surface Material</span>
                      <span className="font-semibold text-text-primary">{product.materials.surface}</span>
                    </div>
                    <div className="grid grid-cols-2 py-2 border-b border-border-subtle">
                      <span className="text-text-muted">Base Material</span>
                      <span className="font-semibold text-text-primary">{product.materials.base}</span>
                    </div>
                    <div className="grid grid-cols-2 py-2 border-b border-border-subtle">
                      <span className="text-text-muted">Perimeter Edge</span>
                      <span className="font-semibold text-text-primary">{product.materials.edge}</span>
                    </div>
                    <div className="grid grid-cols-2 py-2 border-b border-border-subtle">
                      <span className="text-text-muted">Weight</span>
                      <span className="font-semibold text-text-primary">{selectedVariant.weightGrams}g</span>
                    </div>
                  </div>
                )}

                {activeTab === "shipping" && (
                  <div className="space-y-2.5 text-xs">
                    <p>
                      <strong>Fulfillment Location:</strong> Dispatched from our regional facility in
                      Wangaratta, Victoria 3677 via Australia Post.
                    </p>
                    <p>
                      <strong>Dispatch Speed:</strong> Orders placed before 1:00 PM AEST on business days
                      are handed to Aus Post same-day.
                    </p>
                    <p>
                      <strong>Australia Post Standard:</strong> 2-5 business days ($9.95 AUD or FREE on orders over $60).
                    </p>
                    <p>
                      <strong>Australia Post Express:</strong> 1-2 business days ($14.95 AUD).
                    </p>
                    <p>
                      <strong>30-Day Anti-Slip Trial:</strong> If your desk mat slides, frays, or doesn&apos;t meet
                      your battlestation standards, contact us for a hassle-free return.
                    </p>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-border-subtle font-mono">
                      <span className="font-semibold text-text-primary">
                        Verified Reviews
                      </span>
                      <span className="text-text-muted">Overall: {product.rating} / 5</span>
                    </div>

                    {product.reviews.map((rev) => (
                      <div key={rev.id} className="p-3.5 rounded-xl bg-surface border border-border-subtle space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-text-primary">{rev.author}</span>
                          <span className="text-text-muted font-mono">{rev.date}</span>
                        </div>
                        <div className="flex items-center text-accent-amber">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                          <span className="ml-2 text-[11px] text-text-muted font-mono">{rev.location}</span>
                        </div>
                        <h5 className="font-display font-semibold text-text-primary text-xs">{rev.title}</h5>
                        <p className="text-xs text-text-secondary">{rev.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Interactive Desk Space Visualizer */}
      <section id="desk-visualizer" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 scroll-mt-24">
        <div className="p-6 sm:p-10 rounded-3xl bg-surface border border-border-subtle shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent font-medium">
                Dimension Simulator
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mt-1">
                Visualise On Your Desk
              </h2>
            </div>
            <p className="text-xs text-text-secondary max-w-sm">
              Toggle standard mouse pad, extended keyboard desk mat, and full desk coverage sizes in real-time.
            </p>
          </div>

          <DeskSizeVisualizer
            currentSize={selectedVariant.size}
            onSelectSize={(newSize) => {
              const matched = product.variants.find((v) => v.size === newSize);
              if (matched) {
                setSelectedVariant(matched);
              }
            }}
            productImage={product.images[0]}
          />
        </div>
      </section>

      {/* Sticky Mobile Add To Cart Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-surface/95 backdrop-blur-md border-t border-border-subtle flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-xs text-text-muted block line-clamp-1">{product.title}</span>
          <span className="font-display text-base font-bold text-text-primary">
            {formatAud(selectedVariant.priceCents)}
          </span>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleAddToCart}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Cart</span>
        </Button>
      </div>

      {/* "You May Also Like" Related Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 space-y-6 border-t border-border-subtle pt-12">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-semibold text-accent uppercase tracking-widest">
              Pair with Your Battlestation
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-text-primary mt-0.5">
              You May Also Like
            </h2>
          </div>
          <Link
            href={`/category/${product.collection}`}
            className="text-xs font-mono font-semibold text-accent hover:underline uppercase tracking-wider"
          >
            Explore {product.collectionName} &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((rel) => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </section>
    </div>
  );
}
