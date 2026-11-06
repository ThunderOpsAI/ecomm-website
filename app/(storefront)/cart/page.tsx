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
import { Button } from "@/components/ui/button";

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
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6 font-sans">
        <div className="w-24 h-24 rounded-2xl bg-surface border border-border-subtle flex flex-col items-center justify-center mx-auto text-text-muted shadow-sm">
          <ShoppingBag className="w-10 h-10 opacity-60 text-accent" />
          <span className="text-[10px] font-mono uppercase tracking-widest mt-1 opacity-60">Empty</span>
        </div>
        <div className="space-y-2">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            Your Shopping Cart is Empty
          </h1>
          <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
            Upgrade your desk setup with artisan micro-woven cloth and 100% natural tree-rubber bases.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link href="/category/japandi">
            <Button variant="primary" size="md">
              <span>Explore Japandi Mats</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
          <Link href="/category/anime">
            <Button variant="outline" size="md">
              Explore Anime Series
            </Button>
          </Link>
          <Link href="/category/3d">
            <Button variant="outline" size="md">
              Explore 3D Ergonomic
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 bg-cream font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border-subtle pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent font-medium">
            Review Bag
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-text-primary tracking-tight mt-1">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Review your order before proceeding to Australia Post delivery dispatch.
          </p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-mono text-text-muted hover:text-accent self-start transition-colors cursor-pointer"
        >
          Clear all items
        </button>
      </div>

      {/* Free Shipping Progress Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border-subtle space-y-2 shadow-2xs font-mono">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-accent shrink-0" />
            {isFreeShippingEligible ? (
              <span className="font-medium text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                CONGRATULATIONS! YOU UNLOCKED FREE AUSTRALIA POST EXPRESS.
              </span>
            ) : (
              <span className="text-text-secondary">
                Add <strong className="text-text-primary font-display">{formatAud(remainingForFreeShippingCents)}</strong> more for FREE Australia Post Express.
              </span>
            )}
          </div>
          <span className="font-mono text-xs text-text-muted">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-border-subtle overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isFreeShippingEligible
                ? "bg-emerald-500"
                : "bg-accent"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Cart Grid: Items (Col 8) + Summary (Col 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl bg-surface border border-border-subtle divide-y divide-border-subtle overflow-hidden shadow-2xs">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between"
              >
                {/* Thumbnail & Title */}
                <div className="flex items-center gap-4 min-w-0">
                  <Link
                    href={`/products/${item.slug}`}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-muted border border-border-subtle shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="min-w-0">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent">
                      {item.collection.toUpperCase()}
                    </span>
                    <h3 className="font-display text-base sm:text-lg font-bold text-text-primary hover:text-accent transition-colors line-clamp-1">
                      <Link href={`/products/${item.slug}`}>{item.title}</Link>
                    </h3>
                    <p className="text-xs text-text-secondary mt-0.5 font-mono">
                      Dimension: <strong className="text-text-primary">{item.size}</strong>
                    </p>
                    <span className="text-xs font-mono text-text-muted">SKU: {item.sku}</span>
                  </div>
                </div>

                {/* Quantity Controls & Line Price */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-border-subtle">
                  {/* Quantity Modifier */}
                  <div className="flex items-center rounded-xs border border-border-subtle bg-cream p-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-mono text-xs font-bold text-text-primary">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right min-w-[90px]">
                    <span className="font-display text-lg font-bold text-text-primary">
                      {formatAud(item.priceCents * item.quantity)}
                    </span>
                    <span className="block text-[10px] font-mono text-text-muted">
                      {formatAud(item.priceCents)} ea
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-text-muted hover:text-accent transition-colors cursor-pointer"
                    aria-label={`Remove ${item.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Note Field */}
          <div className="p-5 rounded-2xl bg-surface border border-border-subtle space-y-2 shadow-2xs">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent" />
              <span>Special Delivery Instructions or Gift Note</span>
            </label>
            <textarea
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="e.g. Please leave safe under porch if not home, include gift message..."
              rows={2}
              className="w-full text-xs rounded-xl bg-cream border border-border-subtle px-3.5 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-hidden focus:border-accent"
            />
          </div>
        </div>

        {/* Right: Order Summary (Col 4) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <div className="p-6 rounded-2xl bg-surface border border-border-subtle space-y-6 shadow-2xs">
            <h3 className="font-display text-lg font-bold text-text-primary border-b border-border-subtle pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between text-text-secondary">
                <span>Items Subtotal ({itemCount})</span>
                <span className="font-display font-semibold text-text-primary text-base">
                  {formatAud(subtotalCents)}
                </span>
              </div>

              <div className="flex items-center justify-between text-text-secondary font-mono text-xs">
                <span>Aus Post Delivery</span>
                <span>
                  {isFreeShippingEligible ? (
                    <span className="font-bold text-emerald-700">FREE EXPRESS</span>
                  ) : (
                    formatAud(estimatedShippingCents)
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between text-text-secondary font-mono text-xs">
                <span>GST (10% AU Tax)</span>
                <span className="text-text-muted">Included</span>
              </div>

              <div className="pt-3 border-t border-border-subtle flex items-baseline justify-between text-base font-extrabold text-text-primary">
                <span className="font-mono text-sm uppercase tracking-wider">Total Due</span>
                <span className="font-display text-2xl text-accent font-bold">
                  {formatAud(totalCents)}
                </span>
              </div>
            </div>

            <Link href="/checkout" className="w-full block">
              <Button variant="primary" size="lg" className="w-full">
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>

            <Link
              href="/category/japandi"
              className="w-full block text-center text-xs font-mono uppercase tracking-wider text-text-secondary hover:text-accent transition-colors"
            >
              &larr; Continue Shopping
            </Link>

            {/* Trust Assurances */}
            <div className="pt-4 border-t border-border-subtle space-y-2 text-[11px] font-mono text-text-muted">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-accent" />
                <span>Dispatches within 24h from Wangaratta, VIC</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>30-Day Anti-Slip Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-3.5 h-3.5 text-accent" />
                <span>Secure 256-Bit SSL Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
