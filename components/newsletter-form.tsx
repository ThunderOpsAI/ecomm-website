"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  if (subscribed) {
    return (
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-center gap-2 max-w-md mx-auto shadow-2xs">
        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        <span>Welcome to MatStudio! Your 10% discount code <strong>MAT10</strong> is active.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address..."
        className="flex-1 px-4 py-3 rounded-xl bg-white border border-[#e5e5dc] text-sm text-[#14161b] placeholder-[#7b8192] focus:outline-hidden focus:border-[#d9381e] shadow-2xs"
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-xl bg-[#d9381e] hover:bg-[#be2e17] active:scale-95 text-white font-bold text-sm shadow-xs shadow-[#d9381e]/25 transition-all shrink-0"
      >
        Claim 10% Off
      </button>
    </form>
  );
}

export default NewsletterForm;
