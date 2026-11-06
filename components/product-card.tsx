"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, ShoppingBag, Check } from "lucide-react";
import { Product, formatAud } from "@/src/data/products";
import { useCart } from "@/lib/cart-context";
import { Badge } from "@/components/ui/badge";

export interface ProductCardProps {
  product: Product;
  dark?: boolean;
}

export function ProductCard({ product, dark = false }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const primaryImage = product.images?.[0] || "/placeholder.png";
  const secondaryImage = product.images && product.images.length > 1 ? product.images[1] : null;
  const defaultVariant = product.variants[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);

    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      sku: product.sku,
      image: primaryImage,
      size: defaultVariant.size,
      priceCents: defaultVariant.priceCents,
      quantity: 1,
      collection: product.collection,
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 1200);
  };

  return (
    <div
      className={`group relative flex flex-col rounded-2xl transition-all duration-300 overflow-hidden ${
        dark
          ? "bg-ink-subtle border border-border-dark hover:border-cream/30 hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)] hover:-translate-y-1 text-cream"
          : "bg-surface border border-border-subtle hover:border-border-hover hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 text-text-primary"
      }`}
    >
      {/* Product Image Stage */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-16/10 w-full overflow-hidden bg-muted"
        aria-label={`View details for ${product.title}`}
      >
        {/* Primary Image */}
        <img
          src={primaryImage}
          alt={product.title}
          className={`h-full w-full object-cover object-center transition-all duration-700 ${
            secondaryImage
              ? "group-hover:opacity-0 group-hover:scale-105"
              : "group-hover:scale-105"
          }`}
          loading="lazy"
        />

        {/* Secondary Image on Hover (if exists) */}
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.title} alternate view`}
            className="absolute inset-0 h-full w-full object-cover object-center opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
            loading="lazy"
          />
        )}

        {/* Subtle subtle top gradient for contrast */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/25 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <Badge
            variant={dark ? "dark" : "neutral"}
            size="sm"
            className="backdrop-blur-xs bg-surface/90 text-text-primary border-border-subtle shadow-2xs"
          >
            {product.collectionName}
          </Badge>
          {product.badge && (
            <Badge variant="vermilion" size="sm" className="shadow-2xs">
              {product.badge}
            </Badge>
          )}
        </div>

        {/* Stock Status Pill */}
        <div className="absolute top-3 right-3 z-10">
          {product.stock <= 5 ? (
            <span className="px-2 py-0.5 rounded-xs text-[10px] font-semibold bg-accent-amber/20 text-[#a37007] border border-accent-amber/40 font-mono">
              Only {product.stock} left
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-xs text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono">
              In Stock
            </span>
          )}
        </div>

        {/* Slide-Up Quick-Add Pill on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isAdding}
            className="w-full pointer-events-auto py-2.5 px-3 rounded-xl bg-ink/90 hover:bg-accent text-white backdrop-blur-md text-xs font-semibold tracking-wide flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Added to cart</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add • {defaultVariant.size}</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Rating and Size */}
        <div className="flex items-center gap-1.5 text-xs text-text-muted mb-1.5">
          <div className="flex items-center text-accent-amber">
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className={`font-semibold ${dark ? "text-cream" : "text-text-primary"}`}>
            {product.rating.toFixed(1)}
          </span>
          <span>({product.reviewCount})</span>
          <span className="opacity-40">•</span>
          <span className="text-[11px] font-mono tracking-tight line-clamp-1">
            {defaultVariant.size}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`text-base font-bold transition-colors line-clamp-2 ${
            dark
              ? "text-cream group-hover:text-accent-amber"
              : "text-text-primary group-hover:text-accent"
          }`}
        >
          <Link href={`/products/${product.slug}`}>{product.title}</Link>
        </h3>

        {/* Tagline */}
        <p
          className={`mt-1 text-xs line-clamp-2 leading-relaxed ${
            dark ? "text-cream/70" : "text-text-secondary"
          }`}
        >
          {product.tagline}
        </p>

        {/* Price & Mobile Add to Cart Footer */}
        <div
          className={`mt-auto pt-4 flex items-center justify-between border-t ${
            dark ? "border-border-dark" : "border-border-subtle"
          }`}
        >
          <div>
            <span
              className={`font-display text-xl font-bold tracking-tight ${
                dark ? "text-cream" : "text-text-primary"
              }`}
            >
              {formatAud(product.priceCents)}
            </span>
            <span className="block text-[10px] font-mono uppercase tracking-wider text-text-muted mt-0.5">
              Free AU Shipping
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isAdding}
            className={`sm:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 active:scale-95 ${
              dark
                ? "bg-ink-muted hover:bg-accent text-cream hover:text-white"
                : "bg-muted hover:bg-accent text-text-primary hover:text-white"
            }`}
            aria-label={`Add ${product.title} to cart`}
          >
            {isAdding ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <ShoppingBag className="w-3.5 h-3.5" />
            )}
            <span>{isAdding ? "Added" : "Add"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
