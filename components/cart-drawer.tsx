"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Truck,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatAud } from "@/src/data/products";

export function CartDrawer() {
  const {
    items,
    isCartDrawerOpen,
    closeCartDrawer,
    removeItem,
    updateQuantity,
    subtotalCents,
    itemCount,
    freeShippingThresholdCents,
    isFreeShippingEligible,
    remainingForFreeShippingCents,
    orderNotes,
    setOrderNotes,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartDrawerOpen) {
        closeCartDrawer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartDrawerOpen, closeCartDrawer]);

  // Prevent body scrolling when drawer is open
  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartDrawerOpen]);

  if (!isCartDrawerOpen) return null;

  const progressPercent = Math.min(
    100,
    Math.round((subtotalCents / freeShippingThresholdCents) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCartDrawer}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div
          ref={drawerRef}
          className="w-screen max-w-md bg-white border-l border-[#e5e5dc] text-[#14161b] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping Cart Drawer"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#e5e5dc] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#d9381e]" />
              <h2 className="text-lg font-bold tracking-tight text-[#14161b]">Your Cart</h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#f2f2ed] text-[#555a68]">
                {itemCount}
              </span>
            </div>
            <button
              type="button"
              onClick={closeCartDrawer}
              className="p-2 rounded-lg text-[#7b8192] hover:text-[#14161b] hover:bg-[#f2f2ed] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#fbfbfa] px-4 py-3.5 border-b border-[#e5e5dc]">
            <div className="flex items-center gap-2 text-xs mb-1.5">
              <Truck className="w-4 h-4 text-[#d9381e]" />
              {isFreeShippingEligible ? (
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Unlocked: FREE Australia Post Express Shipping!
                </span>
              ) : (
                <span className="text-[#555a68]">
                  Add <strong className="text-[#14161b]">{formatAud(remainingForFreeShippingCents)}</strong> more for FREE express dispatch
                </span>
              )}
            </div>
            <div className="w-full h-2 rounded-full bg-[#ebebe4] overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isFreeShippingEligible
                    ? "bg-emerald-500"
                    : "bg-gradient-to-r from-[#d9381e] to-[#f05a3e]"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#f4f4ee] border border-[#e5e5dc] flex items-center justify-center mx-auto text-[#7b8192]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#14161b]">Your cart is empty</h3>
                  <p className="text-xs text-[#555a68] mt-1 max-w-xs mx-auto">
                    Explore our curated desk mats and ergonomic wrist supports.
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-2 max-w-xs mx-auto">
                  <Link
                    href="/category/japandi"
                    onClick={closeCartDrawer}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#f2f2ed] hover:bg-[#e5e5dc] border border-[#e5e5dc] text-xs font-semibold text-[#14161b] transition-colors"
                  >
                    Browse Japandi Mats &rarr;
                  </Link>
                  <Link
                    href="/category/anime"
                    onClick={closeCartDrawer}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#f2f2ed] hover:bg-[#e5e5dc] border border-[#e5e5dc] text-xs font-semibold text-[#14161b] transition-colors"
                  >
                    Browse Anime Series &rarr;
                  </Link>
                  <Link
                    href="/category/3d"
                    onClick={closeCartDrawer}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#f2f2ed] hover:bg-[#e5e5dc] border border-[#e5e5dc] text-xs font-semibold text-[#14161b] transition-colors"
                  >
                    Browse 3D Ergonomic &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-[#fafaf7] border border-[#e5e5dc] shadow-2xs"
                >
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={closeCartDrawer}
                    className="w-20 h-20 rounded-xl overflow-hidden bg-[#f4f4ee] shrink-0 border border-[#e5e5dc]"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={closeCartDrawer}
                          className="text-xs sm:text-sm font-semibold text-[#14161b] hover:text-[#d9381e] transition-colors line-clamp-1"
                        >
                          {item.title}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-[#7b8192] hover:text-rose-600 p-1 transition-colors"
                          aria-label={`Remove ${item.title}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-[#555a68] mt-0.5 line-clamp-1">
                        Size: <span className="text-[#14161b] font-medium">{item.size}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#ebebe4]">
                      <div className="flex items-center rounded-lg border border-[#e5e5dc] bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-[#14161b] text-[#7b8192] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-[#14161b]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-[#14161b] text-[#7b8192] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs sm:text-sm font-bold text-[#14161b]">
                        {formatAud(item.priceCents * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Order Note Field */}
            {items.length > 0 && (
              <div className="pt-2">
                <label className="text-xs font-medium text-[#555a68] flex items-center gap-1.5 mb-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#d9381e]" />
                  <span>Order Notes / Delivery Instructions</span>
                </label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Leave safe at front door, gift note..."
                  rows={2}
                  className="w-full text-xs rounded-xl bg-white border border-[#e5e5dc] px-3 py-2 text-[#14161b] placeholder-[#7b8192] focus:outline-hidden focus:border-[#d9381e] transition-colors"
                />
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#e5e5dc] bg-[#fafaf7] space-y-3">
              <div className="space-y-1.5 text-xs text-[#555a68]">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="text-sm font-bold text-[#14161b]">
                    {formatAud(subtotalCents)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-[#14161b]">
                    {isFreeShippingEligible ? (
                      <span className="font-semibold text-emerald-700">FREE Express</span>
                    ) : (
                      "Calculated at checkout"
                    )}
                  </span>
                </div>
                <p className="text-[11px] text-[#7b8192]">
                  Dispatched from Wangaratta, VIC via Australia Post. Includes GST.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/cart"
                  onClick={closeCartDrawer}
                  className="py-3 px-4 rounded-xl border border-[#e5e5dc] bg-white hover:bg-[#f2f2ed] text-center text-xs font-semibold text-[#14161b] transition-colors shadow-2xs"
                >
                  View Full Cart
                </Link>

                <Link
                  href="/checkout"
                  onClick={closeCartDrawer}
                  className="py-3 px-4 rounded-xl bg-[#d9381e] hover:bg-[#be2e17] active:scale-98 text-center text-xs font-bold text-white shadow-xs shadow-[#d9381e]/30 flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
