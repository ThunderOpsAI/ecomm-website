"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNumber: "",
    subject: "Order Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-12 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-[#14161b]">Message Received</h3>
        <p className="text-xs sm:text-sm text-[#555a68] max-w-sm mx-auto">
          Thank you, <strong className="text-[#14161b]">{formData.name}</strong>. A support ticket has
          been created and our team in Wangaratta will get back to you shortly at{" "}
          <strong className="text-[#14161b]">{formData.email}</strong>.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="px-5 py-2.5 rounded-xl bg-[#f2f2ed] hover:bg-[#e5e5dc] text-xs font-semibold text-[#14161b] transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      <div>
        <h3 className="text-lg font-bold text-[#14161b]">Send Us a Message</h3>
        <p className="text-[#555a68] mt-0.5">We reply to all inquiries promptly.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div>
          <label className="block text-[#555a68] mb-1 font-medium">Your Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Jordan Miller"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#e5e5dc] text-[#14161b] placeholder-[#7b8192] focus:outline-hidden focus:border-[#d9381e]"
          />
        </div>

        <div>
          <label className="block text-[#555a68] mb-1 font-medium">Email Address</label>
          <input
            type="email"
            required
            placeholder="e.g. jordan@example.com.au"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#e5e5dc] text-[#14161b] placeholder-[#7b8192] focus:outline-hidden focus:border-[#d9381e]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[#555a68] mb-1 font-medium">
            Order Number (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. MS-AU-84920"
            value={formData.orderNumber}
            onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#e5e5dc] text-[#14161b] placeholder-[#7b8192] focus:outline-hidden focus:border-[#d9381e]"
          />
        </div>

        <div>
          <label className="block text-[#555a68] mb-1 font-medium">Subject</label>
          <select
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#e5e5dc] text-[#14161b] focus:outline-hidden focus:border-[#d9381e]"
          >
            <option value="Order Inquiry">Order & Aus Post Tracking</option>
            <option value="Returns & Exchange">Returns & 30-Day Trial</option>
            <option value="Product Sizing">Product Sizing & Desk Advice</option>
            <option value="Wholesale / Custom">Wholesale & Custom Orders</option>
            <option value="Other">Other Question</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-[#555a68] mb-1 font-medium">Your Message</label>
        <textarea
          required
          rows={4}
          placeholder="How can our Victorian desk team assist you today?"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#e5e5dc] text-[#14161b] placeholder-[#7b8192] focus:outline-hidden focus:border-[#d9381e]"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3.5 px-6 rounded-xl bg-[#d9381e] hover:bg-[#be2e17] active:scale-98 text-white font-bold text-xs shadow-xs shadow-[#d9381e]/30 flex items-center justify-center gap-2 transition-all"
      >
        <Send className="w-3.5 h-3.5" />
        <span>Send Inquiry to Support</span>
      </button>
    </form>
  );
}

export default ContactForm;
