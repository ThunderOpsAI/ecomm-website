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

  const { addItem } = useCart();

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
    <div className="pb-24 sm:pb-32">
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
        <nav className="flex items-center space-x-2 text-xs text-[#7b8192]">
          <Link href="/" className="hover:text-[#14161b] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/category/${product.collection}`}
            className="hover:text-[#14161b] transition-colors"
          >
            {product.collectionName}
          </Link>
          <span>/</span>
          <span className="text-[#14161b] font-medium line-clamp-1">
            {product.title}
          </span>
        </nav>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: Image Gallery (Col 7) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Large Image Stage */}
            <div className="relative aspect-16/10 rounded-3xl overflow-hidden bg-[#f4f4ee] border border-[#e5e5dc] group shadow-sm">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={`${product.title} view ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-[#14161b] border border-[#e5e5dc] shadow-2xs">
                  {product.collectionName}
                </span>
                {product.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#d9381e] text-white shadow-2xs">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="absolute bottom-4 right-4">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-white/90 backdrop-blur-md text-[#14161b] border border-[#e5e5dc] shadow-2xs">
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
                    className={`relative aspect-16/10 rounded-xl overflow-hidden bg-[#f4f4ee] border-2 transition-all duration-200 ${
                      activeImageIndex === idx
                        ? "border-[#d9381e] shadow-xs shadow-[#d9381e]/30"
                        : "border-[#e5e5dc] hover:border-[#cbccc2] opacity-80 hover:opacity-100"
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
              <div className="p-3 rounded-2xl bg-white border border-[#e5e5dc] flex items-center gap-2.5 shadow-2xs">
                <Truck className="w-4 h-4 text-[#d9381e] shrink-0" />
                <div className="text-[11px]">
                  <p className="font-semibold text-[#14161b]">Wangaratta Dispatch</p>
                  <p className="text-[#7b8192]">Aus Post tracked</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-[#e5e5dc] flex items-center gap-2.5 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#d9381e] shrink-0" />
                <div className="text-[11px]">
                  <p className="font-semibold text-[#14161b]">Anti-Slip Grip</p>
                  <p className="text-[#7b8192]">100% natural rubber</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-[#e5e5dc] flex items-center gap-2.5 shadow-2xs">
                <RotateCcw className="w-4 h-4 text-[#d9381e] shrink-0" />
                <div className="text-[11px]">
                  <p className="font-semibold text-[#14161b]">30-Day Trial</p>
                  <p className="text-[#7b8192]">Hassle-free returns</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Purchase & Details (Col 5) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div>
              {/* Rating & Review Header */}
              <div className="flex items-center gap-2 text-xs text-[#7b8192] mb-2">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-[#14161b]">{product.rating}</span>
                <span className="text-[#7b8192]">({product.reviewCount} customer reviews)</span>
                <span className="text-[#c4c4b8]">•</span>
                <span className="font-mono text-[#7b8192]">{product.sku}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#14161b]">
                {product.title}
              </h1>

              <p className="text-sm text-[#555a68] mt-2 leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Price Row */}
            <div className="p-4 rounded-2xl bg-white border border-[#e5e5dc] flex items-baseline justify-between shadow-2xs">
              <div>
                <span className="text-3xl font-extrabold text-[#14161b] tracking-tight">
                  {formatAud(selectedVariant.priceCents)}
                </span>
                <span className="ml-2 text-xs text-[#7b8192]">AUD (incl. GST)</span>
              </div>

              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                In Stock ({product.stock} units)
              </span>
            </div>

            {/* Size Variant Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-[#14161b]">
                  Select Dimension
                </span>
                <a
                  href="#desk-visualizer"
                  className="text-[#d9381e] hover:underline font-semibold flex items-center gap-1"
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
                      className={`p-3 rounded-2xl border text-left transition-all duration-200 ${
                        isSelected
                          ? "bg-[#f2f2ed] border-[#d9381e] shadow-xs"
                          : "bg-white border-[#e5e5dc] hover:border-[#cbccc2]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#14161b]">{v.size}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#d9381e]" />}
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[11px] text-[#555a68]">
                        <span>{v.thickness}</span>
                        <span className="font-mono font-semibold text-[#14161b]">
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
                <div className="flex items-center rounded-2xl border border-[#e5e5dc] bg-white p-1 shrink-0 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-[#7b8192] hover:text-[#14161b] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-[#14161b]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="p-2 text-[#7b8192] hover:text-[#14161b] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Add to Cart */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-[#d9381e] hover:bg-[#be2e17] active:scale-98 text-white font-bold text-sm shadow-xs shadow-[#d9381e]/30 flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {addedNotice
                      ? "Added to Cart!"
                      : `Add to Cart • ${formatAud(selectedVariant.priceCents * quantity)}`}
                  </span>
                </button>
              </div>

              {/* Direct Buy / Checkout */}
              <Link
                href="/checkout"
                onClick={handleAddToCart}
                className="w-full py-3 px-6 rounded-2xl border border-[#e5e5dc] bg-white hover:bg-[#f2f2ed] text-center text-xs font-semibold text-[#14161b] block transition-colors shadow-2xs"
              >
                Buy Now (Instant Checkout)
              </Link>
            </div>

            {/* Shipping Dispatch Notice */}
            <div className="p-4 rounded-2xl bg-[#fafaf7] border border-[#e5e5dc] space-y-1.5 text-xs text-[#555a68]">
              <div className="flex items-center gap-2 text-[#14161b] font-semibold">
                <Truck className="w-4 h-4 text-[#d9381e]" />
                <span>Australia Post Dispatch Estimate</span>
              </div>
              <p>
                Order now for dispatch within 24 business hours from Wangaratta, VIC. Free express
                shipping applies automatically at checkout for orders over $60 AUD.
              </p>
            </div>

            {/* Tabs for In-Depth Info */}
            <div className="border-t border-[#e5e5dc] pt-6 space-y-4">
              <div className="flex border-b border-[#e5e5dc] text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab("desc")}
                  className={`pb-2.5 px-3 border-b-2 transition-colors ${
                    activeTab === "desc"
                      ? "border-[#d9381e] text-[#14161b] font-bold"
                      : "border-transparent text-[#7b8192] hover:text-[#14161b]"
                  }`}
                >
                  Description
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("specs")}
                  className={`pb-2.5 px-3 border-b-2 transition-colors ${
                    activeTab === "specs"
                      ? "border-[#d9381e] text-[#14161b] font-bold"
                      : "border-transparent text-[#7b8192] hover:text-[#14161b]"
                  }`}
                >
                  Specifications
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("shipping")}
                  className={`pb-2.5 px-3 border-b-2 transition-colors ${
                    activeTab === "shipping"
                      ? "border-[#d9381e] text-[#14161b] font-bold"
                      : "border-transparent text-[#7b8192] hover:text-[#14161b]"
                  }`}
                >
                  Shipping & Returns
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-2.5 px-3 border-b-2 transition-colors ${
                    activeTab === "reviews"
                      ? "border-[#d9381e] text-[#14161b] font-bold"
                      : "border-transparent text-[#7b8192] hover:text-[#14161b]"
                  }`}
                >
                  Reviews ({product.reviews.length})
                </button>
              </div>

              {/* Tab Contents */}
              <div className="text-xs sm:text-sm text-[#555a68] leading-relaxed space-y-3">
                {activeTab === "desc" && (
                  <div className="space-y-3">
                    <p>{product.description}</p>
                    <p className="text-xs text-[#7b8192] italic">{product.story}</p>
                    <div className="pt-2">
                      <h4 className="font-bold text-[#14161b] text-xs uppercase tracking-wider mb-2">
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
                  <div className="space-y-2 text-xs">
                    <div className="grid grid-cols-2 py-2 border-b border-[#f0f0e8]">
                      <span className="text-[#7b8192]">Dimensions</span>
                      <span className="font-semibold text-[#14161b]">{selectedVariant.dimensions}</span>
                    </div>
                    <div className="grid grid-cols-2 py-2 border-b border-[#f0f0e8]">
                      <span className="text-[#7b8192]">Thickness</span>
                      <span className="font-semibold text-[#14161b]">{selectedVariant.thickness}</span>
                    </div>
                    <div className="grid grid-cols-2 py-2 border-b border-[#f0f0e8]">
                      <span className="text-[#7b8192]">Surface Material</span>
                      <span className="font-semibold text-[#14161b]">{product.materials.surface}</span>
                    </div>
                    <div className="grid grid-cols-2 py-2 border-b border-[#f0f0e8]">
                      <span className="text-[#7b8192]">Base Material</span>
                      <span className="font-semibold text-[#14161b]">{product.materials.base}</span>
                    </div>
                    <div className="grid grid-cols-2 py-2 border-b border-[#f0f0e8]">
                      <span className="text-[#7b8192]">Perimeter Edge</span>
                      <span className="font-semibold text-[#14161b]">{product.materials.edge}</span>
                    </div>
                    <div className="grid grid-cols-2 py-2 border-b border-[#f0f0e8]">
                      <span className="text-[#7b8192]">Weight</span>
                      <span className="font-semibold text-[#14161b]">{selectedVariant.weightGrams}g</span>
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
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-[#f0f0e8]">
                      <span className="font-semibold text-[#14161b]">
                        Verified Customer Reviews [Sample Showcase]
                      </span>
                      <span className="text-[#7b8192]">Overall Rating: {product.rating} / 5</span>
                    </div>

                    {product.reviews.map((rev) => (
                      <div key={rev.id} className="p-3.5 rounded-2xl bg-[#fafaf7] border border-[#e5e5dc] space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#14161b]">{rev.author}</span>
                          <span className="text-[#7b8192] font-mono">{rev.date}</span>
                        </div>
                        <div className="flex items-center text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                          <span className="ml-2 text-[11px] text-[#7b8192]">{rev.location}</span>
                        </div>
                        <h5 className="font-semibold text-[#14161b] text-xs">{rev.title}</h5>
                        <p className="text-xs text-[#555a68]">{rev.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Desk Space Difference Visualizer */}
      <section id="desk-visualizer" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 scroll-mt-24">
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
      </section>

      {/* Sticky Mobile Add To Cart Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 backdrop-blur-md border-t border-[#e5e5dc] flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-xs text-[#7b8192] block line-clamp-1">{product.title}</span>
          <span className="text-base font-extrabold text-[#14161b]">
            {formatAud(selectedVariant.priceCents)}
          </span>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="py-2.5 px-6 rounded-xl bg-[#d9381e] text-white font-bold text-xs shadow-xs shadow-[#d9381e]/30 flex items-center gap-1.5 active:scale-95"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Cart</span>
        </button>
      </div>

      {/* "You May Also Like" Related Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 space-y-6 border-t border-[#e5e5dc] pt-12">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#d9381e] uppercase tracking-wider">
              Pair with Your Battlestation
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#14161b] mt-0.5">
              You May Also Like
            </h2>
          </div>
          <Link
            href={`/category/${product.collection}`}
            className="text-xs font-semibold text-[#d9381e] hover:underline"
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
