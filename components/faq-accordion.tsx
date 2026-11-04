"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQCategory {
  category: string;
  items: FAQItem[];
}

export interface FAQAccordionProps {
  categories: FAQCategory[];
}

export function FAQAccordion({ categories }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "Materials & Performance-0": true,
    "Care & Cleaning-0": true,
  });

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-10">
      {categories.map((category) => (
        <div key={category.category} className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d9381e]"></span>
            <h2 className="text-lg font-bold text-[#14161b]">
              {category.category}
            </h2>
          </div>

          <div className="space-y-3">
            {category.items.map((item, idx) => {
              const key = `${category.category}-${idx}`;
              const isOpen = !!openItems[key];

              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-[#e5e5dc] overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(key)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-[#14161b] hover:text-[#d9381e] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#7b8192] shrink-0 transition-transform duration-200 ${
                        isOpen ? "transform rotate-180 text-[#d9381e]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#555a68] leading-relaxed border-t border-[#f0f0e8] pt-3">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FAQAccordion;
