"use client";

import React from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  ShieldCheck,
  CheckCircle2,
  FileText,
  RotateCcw,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatAud } from "@/src/data/products";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotalCents,
    itemCount,
    freeShippingThresholdCents,
    isFreeShippingEligible,
    remainingForFreeShippingCents,
    orderNotes,
    setOrderNotes,
  } = useCart();

  const progressPercent = Math.min(
    100,
    Math.round((subtotalCents / freeShippingThresholdCents) * 100)
  );

  const estimatedShippingCents = isFreeShippingEligible
    ? 0
    : items.length > 0
    ? 995
    : 0;

  const totalCents = subtotalCents + estimatedShippingCents;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#f4f4ee] border border-[#e5e5dc] flex items-center justify-center mx-auto text-[#7b8192]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14161b]">
            Your Shopping Cart is Empty
          </h1>
          <p className="text-sm text-[#555a68] max-w-md mx-auto">
            Upgrade your desk setup with micro-woven cloth and 100% natural tree-rubber bases.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href="/category/japandi"
            className="px-6 py-3 rounded-xl bg-[#d9381e] hover:bg-[#be2e17] text-white font-bold text-xs shadow-xs transition-colors"
          >
            Explore Japandi Mats
          </Link>
          <Link
            href="/category/anime"
            className="px-6 py-3 rounded-xl border border-[#e5e5dc] bg-white hover:bg-[#f2f2ed] text-[#14161b] font-semibold text-xs transition-colors shadow-2xs"
          >
            Explore Anime Series
          </Link>
          <Link
            href="/category/3d"
            className="px-6 py-3 rounded-xl border border-[#e5e5dc] bg-white hover:bg-[#f2f2ed] text-[#14161b] font-semibold text-xs transition-colors shadow-2xs"
          >
            Explore 3D Ergonomic
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#e5e5dc] pb-6">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#14161b] tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-[#555a68] mt-1">
            Review your order before proceeding to Australia Post delivery dispatch.
          </p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs text-[#7b8192] hover:text-rose-600 self-start transition-colors"
        >
          Clear all items
        </button>
      </div>

      {/* Free Shipping Progress Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#e5e5dc] space-y-2 shadow-2xs">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#d9381e]" />
            {isFreeShippingEligible ? (
              <span className="font-semibold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Congratulations! You unlocked FREE Australia Post express dispatch.
              </span>
            ) : (
              <span className="text-[#555a68]">
                Add <strong className="text-[#14161b]">{formatAud(remainingForFreeShippingCents)}</strong> more to qualify for FREE Australia Post express dispatch.
              </span>
            )}
          </div>
          <span className="font-mono text-xs text-[#7b8192]">{progressPercent}%</span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-[#ebebe4] overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isFreeShippingEligible
                ? "bg-emerald-500 shadow-xs"
                : "bg-gradient-to-r from-[#d9381e] to-[#f05a3e]"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Cart Grid: Items (Col 8) + Summary (Col 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl bg-white border border-[#e5e5dc] divide-y divide-[#f0f0e8] overflow-hidden shadow-2xs">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between"
              >
                {/* Thumbnail & Title */}
                <div className="flex items-center gap-4 min-w-0">
                  <Link
                    href={`/products/${item.slug}`}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#f4f4ee] border border-[#e5e5dc] shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#d9381e]">
                      {item.collection.toUpperCase()}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#14161b] hover:text-[#d9381e] transition-colors line-clamp-1">
                      <Link href={`/products/${item.slug}`}>{item.title}</Link>
                    </h3>
                    <p className="text-xs text-[#555a68] mt-0.5">
                      Dimension: <strong className="text-[#14161b]">{item.size}</strong>
                    </p>
                    <span className="text-xs font-mono text-[#7b8192]">SKU: {item.sku}</span>
                  </div>
                </div>

                {/* Quantity Controls & Line Price */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-[#f0f0e8]">
                  {/* Quantity Modifier */}
                  <div className="flex items-center rounded-xl border border-[#e5e5dc] bg-[#fafaf7] p-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 text-[#7b8192] hover:text-[#14161b] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-[#14161b]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 text-[#7b8192] hover:text-[#14161b] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right min-w-[90px]">
                    <span className="text-base font-extrabold text-[#14161b]">
                      {formatAud(item.priceCents * item.quantity)}
                    </span>
                    <span className="block text-[10px] text-[#7b8192]">
                      {formatAud(item.priceCents)} each
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-[#7b8192] hover:text-rose-600 transition-colors"
                    aria-label={`Remove ${item.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Note Field */}
          <div className="p-5 rounded-2xl bg-white border border-[#e5e5dc] space-y-2 shadow-2xs">
            <label className="text-xs font-bold uppercase tracking-wider text-[#14161b] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#d9381e]" />
              <span>Special Delivery Instructions or Gift Note</span>
            </label>
            <textarea
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="e.g. Please leave safe under porch if not home, include gift message..."
              rows={2}
              className="w-full text-xs rounded-xl bg-[#fafaf7] border border-[#e5e5dc] px-3.5 py-2.5 text-[#14161b] placeholder-[#7b8192] focus:outline-hidden focus:border-[#d9381e]"
            />
          </div>
        </div>

        {/* Right: Order Summary (Col 4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-[#e5e5dc] space-y-6 shadow-2xs">
            <h3 className="text-base font-bold text-[#14161b] border-b border-[#f0f0e8] pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between text-[#555a68]">
                <span>Items Subtotal ({itemCount})</span>
                <span className="font-semibold text-[#14161b]">
                  {formatAud(subtotalCents)}
                </span>
              </div>

              <div className="flex items-center justify-between text-[#555a68]">
                <span>Australia Post Parcel Delivery</span>
                <span>
                  {isFreeShippingEligible ? (
                    <span className="font-semibold text-emerald-800">FREE</span>
                  ) : (
                    formatAud(estimatedShippingCents)
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between text-[#555a68]">
                <span>GST (10% Australian Tax)</span>
                <span className="text-[#7b8192]">Included in Price</span>
              </div>

              <div className="pt-3 border-t border-[#f0f0e8] flex items-baseline justify-between text-base font-extrabold text-[#14161b]">
                <span>Total Due</span>
                <span className="text-xl text-[#d9381e]">{formatAud(totalCents)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-4 px-6 rounded-xl bg-[#d9381e] hover:bg-[#be2e17] active:scale-98 text-white font-bold text-sm shadow-xs shadow-[#d9381e]/30 flex items-center justify-center gap-2 transition-all duration-200"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/category/japandi"
              className="w-full block text-center text-xs text-[#555a68] hover:text-[#14161b] transition-colors font-medium"
            >
              &larr; Continue Shopping
            </Link>

            {/* Trust Assurances */}
            <div className="pt-4 border-t border-[#f0f0e8] space-y-2 text-[11px] text-[#7b8192]">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#d9381e]" />
                <span>Dispatches within 24h from Wangaratta, VIC</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d9381e]" />
                <span>30-Day Anti-Slip Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-3.5 h-3.5 text-[#d9381e]" />
                <span>Secure 256-Bit SSL Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
