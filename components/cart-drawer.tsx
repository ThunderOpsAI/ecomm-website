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
  Sparkles,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatAud } from "@/src/data/products";
import { Button } from "@/components/ui/button";

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
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCartDrawer}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div
          ref={drawerRef}
          className="w-screen max-w-md bg-surface border-l border-border-subtle text-text-primary shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
          style={{
            animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Shopping Cart Drawer"
        >
          {/* Header with Item Added Notification Banner */}
          <div className="p-4 sm:p-5 border-b border-border-subtle flex items-center justify-between bg-surface">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xs bg-accent/10 text-accent flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="font-display text-xl font-bold tracking-tight text-text-primary">
                Your Cart
              </h2>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-xs bg-muted text-text-secondary border border-border-subtle">
                {itemCount}
              </span>
            </div>
            <button
              type="button"
              onClick={closeCartDrawer}
              className="p-2 rounded-xs text-text-muted hover:text-text-primary hover:bg-muted transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Toast-like banner when items exist */}
          {items.length > 0 && (
            <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-4 py-2 flex items-center justify-between text-xs text-emerald-800">
              <div className="flex items-center gap-2 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Reserved for you for 15 minutes</span>
              </div>
              <span className="font-mono text-[10px] text-emerald-700">Wangaratta, VIC</span>
            </div>
          )}

          {/* Free Shipping Progress Bar */}
          <div className="bg-muted/50 px-4 py-3.5 border-b border-border-subtle">
            <div className="flex items-center gap-2 text-xs mb-1.5 font-mono">
              <Truck className="w-4 h-4 text-accent shrink-0" />
              {isFreeShippingEligible ? (
                <span className="font-medium text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  UNLOCKED: FREE AUSTRALIA POST EXPRESS!
                </span>
              ) : (
                <span className="text-text-secondary">
                  Add <strong className="text-text-primary">{formatAud(remainingForFreeShippingCents)}</strong> for FREE Express
                </span>
              )}
            </div>
            <div className="w-full h-1.5 rounded-full bg-border-subtle overflow-hidden">
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

          {/* Cart Items Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-muted border border-border-subtle flex flex-col items-center justify-center mx-auto text-text-muted">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                  <span className="text-[10px] font-mono uppercase tracking-widest mt-1 opacity-50">Empty</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-text-primary">Your cart is empty</h3>
                  <p className="text-xs text-text-secondary mt-1 max-w-xs mx-auto leading-relaxed">
                    Explore our artisan Japandi desk mats, high-energy anime prints, and ergonomic wrist supports.
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-2 max-w-xs mx-auto">
                  <Link href="/category/japandi" onClick={closeCartDrawer}>
                    <Button variant="outline" size="sm" className="w-full justify-between">
                      <span>Explore Japandi Mats</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                  <Link href="/category/anime" onClick={closeCartDrawer}>
                    <Button variant="outline" size="sm" className="w-full justify-between">
                      <span>Explore Anime Series</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                  <Link href="/category/3d" onClick={closeCartDrawer}>
                    <Button variant="outline" size="sm" className="w-full justify-between">
                      <span>Explore 3D Ergonomic</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-xl bg-cream border border-border-subtle shadow-2xs"
                >
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={closeCartDrawer}
                    className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0 border border-border-subtle"
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
                          className="font-display text-sm font-bold text-text-primary hover:text-accent transition-colors line-clamp-1"
                        >
                          {item.title}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-text-muted hover:text-accent p-1 transition-colors cursor-pointer"
                          aria-label={`Remove ${item.title}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] font-mono text-text-muted mt-0.5 line-clamp-1">
                        Size: <span className="text-text-primary font-medium">{item.size}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-border-subtle">
                      <div className="flex items-center rounded-xs border border-border-subtle bg-surface">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-text-primary text-text-muted transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-mono text-xs font-bold text-text-primary">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-text-primary text-text-muted transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-display text-sm font-bold text-text-primary">
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
                <label className="text-xs font-mono font-medium text-text-secondary flex items-center gap-1.5 mb-1.5 uppercase tracking-wider">
                  <FileText className="w-3.5 h-3.5 text-accent" />
                  <span>Order Notes / Delivery Instructions</span>
                </label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Leave safe at front porch, gift note..."
                  rows={2}
                  className="w-full text-xs rounded-lg bg-surface border border-border-subtle px-3 py-2 text-text-primary placeholder:text-text-muted focus:outline-hidden focus:border-accent transition-colors"
                />
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-border-subtle bg-muted/40 space-y-3">
              <div className="space-y-1.5 text-xs text-text-secondary">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs">Subtotal</span>
                  <span className="font-display text-lg font-bold text-text-primary">
                    {formatAud(subtotalCents)}
                  </span>
                </div>
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span>Estimated Shipping</span>
                  <span className="text-text-primary">
                    {isFreeShippingEligible ? (
                      <span className="font-bold text-emerald-700">FREE EXPRESS</span>
                    ) : (
                      "Calculated at checkout"
                    )}
                  </span>
                </div>
                <p className="text-[10px] font-mono text-text-muted">
                  Dispatched from Wangaratta, VIC via Australia Post. Includes GST.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/cart"
                  onClick={closeCartDrawer}
                  className="w-full"
                >
                  <Button variant="outline" size="md" className="w-full">
                    View Cart
                  </Button>
                </Link>

                <Link
                  href="/checkout"
                  onClick={closeCartDrawer}
                  className="w-full"
                >
                  <Button variant="primary" size="md" className="w-full">
                    <span>Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
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
