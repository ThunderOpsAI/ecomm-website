import React from "react";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#0b0d11] text-[#f4f3ef]">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-[#12151c] border border-[#1f2533] shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-[#e25333]/15 border border-[#e25333]/30 flex items-center justify-center mx-auto text-[#e25333]">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold text-[#e25333] uppercase tracking-widest">
            Error 404
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Off The Edge of The Desk
          </h1>
          <p className="text-xs sm:text-sm text-[#9da6b8] leading-relaxed">
            The page or product you are looking for has been moved, renamed, or is currently out of stock.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2.5">
          <Link
            href="/"
            className="w-full py-3 px-4 rounded-xl bg-[#e25333] hover:bg-[#f06449] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-[#e25333]/25"
          >
            <span>Back to Storefront Home</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link
              href="/category/japandi"
              className="py-2.5 px-3 rounded-lg bg-[#161a23] hover:bg-[#1f2533] text-[#9da6b8] hover:text-[#f4f3ef] border border-[#242b38] transition-colors"
            >
              Japandi Mats
            </Link>
            <Link
              href="/category/anime"
              className="py-2.5 px-3 rounded-lg bg-[#161a23] hover:bg-[#1f2533] text-[#9da6b8] hover:text-[#f4f3ef] border border-[#242b38] transition-colors"
            >
              Anime Series
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
