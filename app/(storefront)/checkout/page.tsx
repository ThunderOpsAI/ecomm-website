"use client";

import React, { useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  Truck,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShoppingBag,
  Printer,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatAud } from "@/src/data/products";

export default function CheckoutPage() {
  const { items, subtotalCents, clearCart, isFreeShippingEligible, orderNotes } = useCart();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Details, 2: Shipping, 3: Payment, 4: Confirmed

  // Form State
  const [formData, setFormData] = useState({
    email: "gamer@example.com.au",
    firstName: "Alex",
    lastName: "Taylor",
    phone: "0412 345 678",
    address: "42 Ovens Street",
    apartment: "",
    suburb: "Wangaratta",
    state: "VIC",
    postcode: "3677",
    shippingMethod: "standard", // standard | express
    paymentMethod: "card", // card | apple_pay | paypal
    cardNumber: "•••• •••• •••• 4242",
    cardExpiry: "12/28",
    cardCvc: "888",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    trackingNumber: string;
    date: string;
    items: typeof items;
    totalCents: number;
    shippingCents: number;
    shippingMethodName: string;
  } | null>(null);

  // Calculate Shipping Cents
  const standardShippingCents = isFreeShippingEligible ? 0 : 995;
  const expressShippingCents = isFreeShippingEligible ? 500 : 1495;

  const currentShippingCents =
    formData.shippingMethod === "express"
      ? expressShippingCents
      : standardShippingCents;

  const finalTotalCents = subtotalCents + currentShippingCents;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleFinalPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrderNumber = `MS-AU-${Math.floor(10000 + Math.random() * 90000)}`;
      const generatedTracking = `AP${Math.floor(10000000 + Math.random() * 90000000)}AU`;

      setConfirmedOrder({
        orderNumber: generatedOrderNumber,
        trackingNumber: generatedTracking,
        date: new Date().toLocaleDateString("en-AU", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        items: [...items],
        totalCents: finalTotalCents,
        shippingCents: currentShippingCents,
        shippingMethodName:
          formData.shippingMethod === "express"
            ? "Australia Post Express Courier"
            : "Australia Post Standard Parcel Delivery",
      });

      clearCart();
      setStep(4);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#d9381e", "#e25333", "#ffffff", "#f59e0b"],
        });
      } catch {
        // ignore
      }
    }, 1200);
  };

  // If user visits empty checkout without confirmation
  if (items.length === 0 && step !== 4) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#f4f4ee] border border-[#e5e5dc] flex items-center justify-center mx-auto text-[#7b8192]">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-[#14161b]">Your cart is currently empty</h1>
        <p className="text-xs text-[#555a68]">
          Please add a desk mat or ergonomic mousepad before proceeding to checkout.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl bg-[#d9381e] text-white text-xs font-bold shadow-xs"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  // STEP 4: ORDER CONFIRMATION
  if (step === 4 && confirmedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-8 animate-in fade-in zoom-in-95 duration-300">
        <div className="rounded-3xl bg-white border border-[#e5e5dc] p-6 sm:p-10 space-y-8 shadow-[0_12px_36px_rgba(0,0,0,0.06)]">
          {/* Header */}
          <div className="text-center space-y-3 pb-6 border-b border-[#e5e5dc]">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#fafaf7] text-[#d9381e] border border-[#e5e5dc] inline-block shadow-2xs">
              Simulated Checkout Complete
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#14161b] tracking-tight">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-[#555a68]">
              Order <strong className="text-[#14161b] font-mono">{confirmedOrder.orderNumber}</strong> has been logged and assigned to regional fulfillment.
            </p>
          </div>

          {/* Tracking Card */}
          <div className="p-4 rounded-2xl bg-[#fafaf7] border border-[#e5e5dc] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#d9381e]" />
                <span className="font-semibold text-[#14161b]">Australia Post Consignment:</span>
                <span className="font-mono text-emerald-700 font-bold">
                  {confirmedOrder.trackingNumber}
                </span>
              </div>
              <span className="text-[#7b8192]">Dispatched from Wangaratta VIC 3677</span>
            </div>
            <p className="text-[11px] text-[#555a68]">
              Estimated delivery: 2-3 business days. A dispatch confirmation email has been simulated to{" "}
              <strong className="text-[#14161b]">{formData.email}</strong>.
            </p>
          </div>

          {/* Delivery & Items Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-2xl bg-[#fafaf7] border border-[#e5e5dc] space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-[#14161b]">
                Delivery Address
              </h4>
              <p className="text-[#555a68] leading-relaxed">
                {formData.firstName} {formData.lastName}
                <br />
                {formData.address} {formData.apartment}
                <br />
                {formData.suburb}, {formData.state} {formData.postcode}
                <br />
                Australia
              </p>
              <p className="text-[11px] text-[#7b8192] pt-1">Phone: {formData.phone}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fafaf7] border border-[#e5e5dc] space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-[#14161b]">
                Shipping Method
              </h4>
              <p className="text-[#555a68]">{confirmedOrder.shippingMethodName}</p>
              <div className="pt-2 text-[11px] text-[#7b8192]">
                <p>30-Day Anti-Slip Guarantee included on all pads.</p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#14161b]">
              Purchased Items
            </h4>
            <div className="divide-y divide-[#f0f0e8] rounded-2xl bg-[#fafaf7] border border-[#e5e5dc] overflow-hidden">
              {confirmedOrder.items.map((item) => (
                <div key={item.id} className="p-3.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 rounded-xl object-cover bg-[#f4f4ee] border border-[#e5e5dc]"
                    />
                    <div>
                      <h5 className="font-semibold text-[#14161b]">{item.title}</h5>
                      <span className="text-[11px] text-[#7b8192]">
                        {item.size} • Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-[#14161b]">
                    {formatAud(item.priceCents * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Totals */}
          <div className="border-t border-[#e5e5dc] pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-[#555a68]">
              <span>Subtotal</span>
              <span className="text-[#14161b] font-semibold">{formatAud(confirmedOrder.totalCents - confirmedOrder.shippingCents)}</span>
            </div>
            <div className="flex justify-between text-[#555a68]">
              <span>Shipping ({confirmedOrder.shippingMethodName})</span>
              <span>
                {confirmedOrder.shippingCents === 0
                  ? "FREE"
                  : formatAud(confirmedOrder.shippingCents)}
              </span>
            </div>
            <div className="flex justify-between text-[#555a68]">
              <span>Australian GST (10%)</span>
              <span>Included</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-[#14161b] pt-2 border-t border-[#e5e5dc]">
              <span>Total Paid</span>
              <span className="text-xl text-[#d9381e]">
                {formatAud(confirmedOrder.totalCents)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex-1 py-3 px-4 rounded-xl border border-[#e5e5dc] bg-white hover:bg-[#f2f2ed] text-xs font-semibold text-[#14161b] flex items-center justify-center gap-2 shadow-2xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print Tax Invoice</span>
            </button>
            <Link
              href="/"
              className="flex-1 py-3 px-4 rounded-xl bg-[#d9381e] hover:bg-[#be2e17] text-xs font-bold text-white text-center flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Back to Storefront</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE STEPS 1-3
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Checkout Progress Stepper */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="flex items-center justify-between text-xs">
          <div
            className={`flex items-center gap-2 font-semibold ${
              step >= 1 ? "text-[#d9381e]" : "text-[#7b8192]"
            }`}
          >
            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs">
              1
            </span>
            <span>Details</span>
          </div>
          <div className="h-0.5 flex-1 mx-3 bg-[#e5e5dc]">
            <div
              className={`h-full bg-[#d9381e] transition-all duration-300 ${
                step >= 2 ? "w-full" : "w-0"
              }`}
            />
          </div>
          <div
            className={`flex items-center gap-2 font-semibold ${
              step >= 2 ? "text-[#d9381e]" : "text-[#7b8192]"
            }`}
          >
            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs">
              2
            </span>
            <span>Shipping</span>
          </div>
          <div className="h-0.5 flex-1 mx-3 bg-[#e5e5dc]">
            <div
              className={`h-full bg-[#d9381e] transition-all duration-300 ${
                step >= 3 ? "w-full" : "w-0"
              }`}
            />
          </div>
          <div
            className={`flex items-center gap-2 font-semibold ${
              step >= 3 ? "text-[#d9381e]" : "text-[#7b8192]"
            }`}
          >
            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs">
              3
            </span>
            <span>Payment</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form (Col 7) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e5e5dc] space-y-6 shadow-2xs">
            {/* STEP 1: CUSTOMER & ADDRESS */}
            {step === 1 && (
              <form onSubmit={handleDetailsSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#14161b]">Customer & Shipping Address</h2>
                  <p className="text-xs text-[#555a68] mt-1">
                    Enter your Australian residential or commercial delivery address.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[#555a68] mb-1 font-medium">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#e5e5dc] text-[#14161b] placeholder-[#7b8192] focus:outline-hidden focus:border-[#d9381e]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#555a68] mb-1 font-medium">First Name</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#e5e5dc] text-[#14161b] placeholder-[#7b8192] focus:outline-hidden focus:border-[#d9381e]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#555a68] mb-1 font-medium">Last Name</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#e5e5dc] text-[#14161b] placeholder-[#7b8192] focus:outline-hidden focus:border-[#d9381e]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#555a68] mb-1 font-medium">Street Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#e5e5dc] text-[#14161b] placeholder-[#7b8192] focus:outline-hidden focus:border-[#d9381e]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[#555a68] mb-1 font-medium">Suburb / Town</label>
                      <input
                        type="text"
                        required
                        value={formData.suburb}
                        onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#e5e5dc] text-[#14161b] placeholder-[#7b8192] focus:outline-hidden focus:border-[#d9381e]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#555a68] mb-1 font-medium">State</label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#e5e5dc] text-[#14161b] focus:outline-hidden focus:border-[#d9381e]"
                      >
                        <option value="VIC">Victoria (VIC)</option>
                        <option value="NSW">New South Wales (NSW)</option>
                        <option value="QLD">Queensland (QLD)</option>
                        <option value="WA">Western Australia (WA)</option>
                        <option value="SA">South Australia (SA)</option>
                        <option value="TAS">Tasmania (TAS)</option>
                        <option value="ACT">Australian Capital Territory</option>
                        <option value="NT">Northern Territory (NT)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#555a68] mb-1 font-medium">Postcode</label>
                      <input
                        type="text"
                        required
                        value={formData.postcode}
                        onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#e5e5dc] text-[#14161b] placeholder-[#7b8192] focus:outline-hidden focus:border-[#d9381e]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#555a68] mb-1 font-medium">Mobile (for Aus Post SMS tracking)</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#e5e5dc] text-[#14161b] placeholder-[#7b8192] focus:outline-hidden focus:border-[#d9381e]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#d9381e] hover:bg-[#be2e17] active:scale-98 text-white font-bold text-sm shadow-xs shadow-[#d9381e]/30 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Continue to Shipping Method</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* STEP 2: SHIPPING METHOD */}
            {step === 2 && (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#14161b]">Shipping Method</h2>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-[#d9381e] hover:underline font-semibold"
                    >
                      Edit Address
                    </button>
                  </div>
                  <p className="text-xs text-[#555a68] mt-1">
                    Dispatched from Wangaratta, VIC via Australia Post.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Option 1: Standard */}
                  <label
                    className={`block p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.shippingMethod === "standard"
                        ? "bg-[#f2f2ed] border-[#d9381e] shadow-2xs"
                        : "bg-white border-[#e5e5dc] hover:border-[#cbccc2]"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value="standard"
                          checked={formData.shippingMethod === "standard"}
                          onChange={() => setFormData({ ...formData, shippingMethod: "standard" })}
                          className="mt-1 accent-[#d9381e]"
                        />
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-[#14161b]">
                            Australia Post Standard Parcel
                          </p>
                          <p className="text-xs text-[#555a68] mt-0.5">
                            2-5 business days • Signature & tracking included
                          </p>
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm font-mono font-bold text-[#14161b]">
                        {isFreeShippingEligible ? "FREE" : "$9.95 AUD"}
                      </span>
                    </div>
                  </label>

                  {/* Option 2: Express */}
                  <label
                    className={`block p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.shippingMethod === "express"
                        ? "bg-[#f2f2ed] border-[#d9381e] shadow-2xs"
                        : "bg-white border-[#e5e5dc] hover:border-[#cbccc2]"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value="express"
                          checked={formData.shippingMethod === "express"}
                          onChange={() => setFormData({ ...formData, shippingMethod: "express" })}
                          className="mt-1 accent-[#d9381e]"
                        />
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-[#14161b] flex items-center gap-1.5">
                            <span>Australia Post Express Courier</span>
                            <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-amber-100 text-amber-900 font-bold">
                              Fastest
                            </span>
                          </p>
                          <p className="text-xs text-[#555a68] mt-0.5">
                            1-2 business days • Next-day guarantee in metro zones
                          </p>
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm font-mono font-bold text-[#14161b]">
                        {isFreeShippingEligible ? "$5.00 AUD (Upgrade)" : "$14.95 AUD"}
                      </span>
                    </div>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-3 px-5 rounded-xl border border-[#e5e5dc] bg-white text-xs font-semibold text-[#14161b] hover:bg-[#f2f2ed]"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 rounded-xl bg-[#d9381e] hover:bg-[#be2e17] text-white font-bold text-sm shadow-xs shadow-[#d9381e]/30 flex items-center justify-center gap-2"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: MOCKED PAYMENT */}
            {step === 3 && (
              <form onSubmit={handleFinalPayment} className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#14161b]">Payment (Simulated Sandbox)</h2>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs text-[#d9381e] hover:underline font-semibold"
                    >
                      Edit Shipping
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-[#fafaf7] border border-[#e5e5dc] text-xs text-[#555a68] mt-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#d9381e] shrink-0" />
                    <span>
                      Demo Mode: No real charges are made. Testing card numbers pre-filled.
                    </span>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: "card" })}
                    className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                      formData.paymentMethod === "card"
                        ? "bg-[#f2f2ed] border-[#d9381e] text-[#d9381e]"
                        : "bg-white border-[#e5e5dc] text-[#555a68]"
                    }`}
                  >
                    Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: "apple_pay" })}
                    className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                      formData.paymentMethod === "apple_pay"
                        ? "bg-[#f2f2ed] border-[#d9381e] text-[#d9381e]"
                        : "bg-white border-[#e5e5dc] text-[#555a68]"
                    }`}
                  >
                    Apple Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: "paypal" })}
                    className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                      formData.paymentMethod === "paypal"
                        ? "bg-[#f2f2ed] border-[#d9381e] text-[#d9381e]"
                        : "bg-white border-[#e5e5dc] text-[#555a68]"
                    }`}
                  >
                    PayPal
                  </button>
                </div>

                {/* Card Fields */}
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[#555a68] mb-1 font-medium">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.cardNumber}
                        readOnly
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#fafaf7] border border-[#e5e5dc] text-[#14161b] font-mono"
                      />
                      <CreditCard className="w-4 h-4 text-[#7b8192] absolute right-3 top-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#555a68] mb-1 font-medium">Expiry</label>
                      <input
                        type="text"
                        value={formData.cardExpiry}
                        readOnly
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#fafaf7] border border-[#e5e5dc] text-[#14161b] font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[#555a68] mb-1 font-medium">CVC / CVV</label>
                      <input
                        type="text"
                        value={formData.cardCvc}
                        readOnly
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#fafaf7] border border-[#e5e5dc] text-[#14161b] font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-3 px-5 rounded-xl border border-[#e5e5dc] bg-white text-xs font-semibold text-[#14161b] hover:bg-[#f2f2ed]"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 py-4 rounded-xl bg-[#d9381e] hover:bg-[#be2e17] active:scale-98 text-white font-bold text-sm shadow-xs shadow-[#d9381e]/30 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Authorizing Dispatch...
                      </span>
                    ) : (
                      <span>Complete Order • {formatAud(finalTotalCents)}</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right Order Summary Column (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-[#e5e5dc] space-y-6 shadow-2xs">
            <h3 className="text-base font-bold text-[#14161b] border-b border-[#f0f0e8] pb-3">
              Order Breakdown ({items.length} items)
            </h3>

            {/* Items Thumbnails */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs gap-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 rounded-xl object-cover bg-[#f4f4ee] shrink-0 border border-[#e5e5dc]"
                    />
                    <div>
                      <h4 className="font-semibold text-[#14161b] line-clamp-1">{item.title}</h4>
                      <p className="text-[11px] text-[#7b8192]">
                        {item.size} • Qty {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-[#14161b] shrink-0">
                    {formatAud(item.priceCents * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="border-t border-[#f0f0e8] pt-4 space-y-2 text-xs text-[#555a68]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#14161b]">{formatAud(subtotalCents)}</span>
              </div>
              <div className="flex justify-between">
                <span>Aus Post Delivery</span>
                <span>
                  {currentShippingCents === 0 ? (
                    <span className="font-semibold text-emerald-800">FREE</span>
                  ) : (
                    formatAud(currentShippingCents)
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Australian GST</span>
                <span>Included</span>
              </div>
              <div className="border-t border-[#f0f0e8] pt-3 flex items-baseline justify-between text-base font-extrabold text-[#14161b]">
                <span>Total</span>
                <span className="text-2xl text-[#d9381e]">{formatAud(finalTotalCents)}</span>
              </div>
            </div>

            {orderNotes && (
              <div className="p-3 rounded-xl bg-[#fafaf7] border border-[#e5e5dc] text-xs">
                <span className="font-semibold text-[#555a68] block mb-0.5">Delivery Notes:</span>
                <p className="text-[#14161b] italic">{orderNotes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
