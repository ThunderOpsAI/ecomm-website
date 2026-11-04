"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, ShoppingBag, Check } from "lucide-react";
import { Product, formatAud } from "@/src/data/products";
import { useCart } from "@/lib/cart-context";

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const primaryImage = product.images?.[0] || "/placeholder.png";
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
    <div className="group relative flex flex-col rounded-2xl bg-white border border-[#e5e5dc] hover:border-[#cbccc2] transition-all duration-300 overflow-hidden hover:shadow-[0_10px_28px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
      {/* Product Image Stage */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-16/10 w-full overflow-hidden bg-[#f4f4ee]"
        aria-label={`View details for ${product.title}`}
      >
        <img
          src={primaryImage}
          alt={product.title}
          className="h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-[#14161b] border border-[#e5e5dc] shadow-2xs">
            {product.collectionName}
          </span>
          {product.badge && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#d9381e] text-white shadow-2xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Stock Status Pill */}
        <div className="absolute top-3 right-3 z-10">
          {product.stock <= 5 ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-900 border border-amber-300 font-mono">
              Only {product.stock} left
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              In Stock
            </span>
          )}
        </div>
      </Link>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 text-xs text-[#7b8192] mb-1.5">
          <div className="flex items-center text-amber-500">
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="font-semibold text-[#14161b]">{product.rating.toFixed(1)}</span>
          <span className="text-[#7b8192]">({product.reviewCount})</span>
          <span className="text-[#c4c4b8]">•</span>
          <span className="text-[11px] text-[#7b8192] line-clamp-1">{defaultVariant.size}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-[#14161b] group-hover:text-[#d9381e] transition-colors line-clamp-2">
          <Link href={`/products/${product.slug}`}>{product.title}</Link>
        </h3>

        {/* Tagline */}
        <p className="mt-1 text-xs text-[#555a68] line-clamp-2 leading-relaxed">
          {product.tagline}
        </p>

        {/* Price & Add to Cart Footer */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#f0f0e8]">
          <div>
            <span className="text-lg font-extrabold text-[#14161b] tracking-tight">
              {formatAud(product.priceCents)}
            </span>
            <span className="block text-[10px] text-[#7b8192] font-medium">Free returns</span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isAdding}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#f2f2ed] hover:bg-[#d9381e] text-[#14161b] hover:text-white text-xs font-semibold transition-all duration-200 active:scale-95 shadow-2xs"
            aria-label={`Add ${product.title} to cart`}
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
