"use client";

import React, { useState } from "react";
import { Star, CheckCircle, ThumbsUp, Sparkles, MessageSquareQuote } from "lucide-react";

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  productTitle: string;
  category: "all" | "japandi" | "anime" | "3d";
  headline: string;
  body: string;
  verifiedBuyer: boolean;
  helpfulCount: number;
}

const PLACEHOLDER_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Liam K.",
    location: "Melbourne, VIC",
    rating: 5,
    date: "2 days ago",
    productTitle: "Blood Moon Pagoda (900x400mm)",
    category: "japandi",
    headline: "The stitching sits lower than the mat surface — zero wrist abrasion.",
    body: "Arrived in Melbourne within 48 hours via Australia Post. Unrolled completely flat right out of the box with zero neoprene or chemical odor. The optical glide on my Razer DeathAdder V3 is consistent whether moving slow for headshots or fast-flicking.",
    verifiedBuyer: true,
    helpfulCount: 24,
  },
  {
    id: "rev-2",
    author: "Mitchell K.",
    location: "Sydney, NSW",
    rating: 5,
    date: "1 week ago",
    productTitle: "Assassin Reze 3D Ergonomic",
    category: "3d",
    headline: "Silicone gel is resilient and didn't sink after 40-hour CAD work weeks.",
    body: "I spend 8+ hours a day modeling in SolidWorks. Cheap memory foam pads usually crater within a month, but this medical-grade silicone gel mound cushions the wrist without bottoming out. The lycra top is cool to the touch and breathable.",
    verifiedBuyer: true,
    helpfulCount: 19,
  },
  {
    id: "rev-3",
    author: "Cameron B.",
    location: "Brisbane, QLD",
    rating: 5,
    date: "2 weeks ago",
    productTitle: "4-Panel Super Saiyan Desk Mat",
    category: "anime",
    headline: "Vibrant dye-sublimation print that doesn't bleed or fade.",
    body: "The anime print resolution is razor sharp. The colors pop dramatically under warm monitor backlights, and keyboard acoustic clack dropped noticeably thanks to the 4mm natural rubber core. 10/10 battlestation upgrade.",
    verifiedBuyer: true,
    helpfulCount: 31,
  },
  {
    id: "rev-4",
    author: "Sophie T.",
    location: "Adelaide, SA",
    rating: 5,
    date: "3 weeks ago",
    productTitle: "Silver Phantom Swordsman",
    category: "japandi",
    headline: "Herringbone rubber base does not move a single millimeter on polished oak.",
    body: "I have a varnished Tasmanian oak standing desk and my old mousepad was constantly creeping during flick shots. This natural tree rubber backing grips like a suction cup without leaving gummy residue.",
    verifiedBuyer: true,
    helpfulCount: 14,
  },
  {
    id: "rev-5",
    author: "Darren W.",
    location: "Perth, WA",
    rating: 5,
    date: "1 month ago",
    productTitle: "Crimson Blossom Ronin",
    category: "japandi",
    headline: "Water-repellent coating makes morning coffee spills an easy wipe-down.",
    body: "Accidentally knocked half a cup of flat white onto the right edge. The liquid beaded up immediately and wiped off clean with a dry microfiber cloth with zero water rings or staining.",
    verifiedBuyer: true,
    helpfulCount: 28,
  },
  {
    id: "rev-6",
    author: "Evelyn N.",
    location: "Wangaratta, VIC",
    rating: 5,
    date: "1 month ago",
    productTitle: "Fiery Goku & Bardock Edition",
    category: "anime",
    headline: "Proud to support local regional Victorian craftsmanship.",
    body: "Picked this up knowing it was dispatched right from Wangaratta. Build quality rivals imported luxury desk mats costing double. The 360-degree lockstitch perimeter is seamless and premium.",
    verifiedBuyer: true,
    helpfulCount: 17,
  },
];

export function CustomerReviews() {
  const [activeFilter, setActiveFilter] = useState<"all" | "japandi" | "anime" | "3d">("all");
  const [helpfulLiked, setHelpfulLiked] = useState<Record<string, boolean>>({});

  const filteredReviews = PLACEHOLDER_REVIEWS.filter((rev) => {
    if (activeFilter === "all") return true;
    return rev.category === activeFilter;
  });

  const toggleHelpful = (id: string) => {
    setHelpfulLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header and Aggregate Rating */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-[#e5e5dc]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-[11px] font-semibold text-amber-900 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Community Verified Feedback • [Placeholder Showcase]</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14161b] tracking-tight">
            Battlestations Powered by MatStudio
          </h2>
          <p className="text-xs sm:text-sm text-[#555a68] mt-1 max-w-xl">
            Real customer impressions from desk setup enthusiasts across Australia. All entries marked as sample representations.
          </p>
        </div>

        {/* Aggregate Stats Card */}
        <div className="flex items-center gap-4 bg-white border border-[#e5e5dc] rounded-2xl p-4 shadow-2xs shrink-0">
          <div className="text-center pr-4 border-r border-[#e5e5dc]">
            <span className="text-3xl font-black text-[#14161b] tracking-tight">4.9</span>
            <div className="flex items-center text-amber-500 mt-0.5 justify-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>
            <span className="text-[10px] text-[#7b8192] font-mono block mt-0.5">5.0 Scale</span>
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#555a68]">Tracking Precision</span>
              <span className="font-bold text-[#14161b]">100%</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#555a68]">Stitch Comfort</span>
              <span className="font-bold text-[#14161b]">99.4%</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#555a68]">Natural Rubber Grip</span>
              <span className="font-bold text-[#14161b]">100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeFilter === "all"
              ? "bg-[#14161b] text-white shadow-2xs"
              : "bg-white border border-[#e5e5dc] text-[#555a68] hover:text-[#14161b] hover:bg-[#f4f4ee]"
          }`}
        >
          All Reviews ({PLACEHOLDER_REVIEWS.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("japandi")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeFilter === "japandi"
              ? "bg-[#14161b] text-white shadow-2xs"
              : "bg-white border border-[#e5e5dc] text-[#555a68] hover:text-[#14161b] hover:bg-[#f4f4ee]"
          }`}
        >
          Japandi Series
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("anime")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeFilter === "anime"
              ? "bg-[#14161b] text-white shadow-2xs"
              : "bg-white border border-[#e5e5dc] text-[#555a68] hover:text-[#14161b] hover:bg-[#f4f4ee]"
          }`}
        >
          Anime Series
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("3d")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeFilter === "3d"
              ? "bg-[#14161b] text-white shadow-2xs"
              : "bg-white border border-[#e5e5dc] text-[#555a68] hover:text-[#14161b] hover:bg-[#f4f4ee]"
          }`}
        >
          3D Ergonomic Pads
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((review) => {
          const isLiked = helpfulLiked[review.id];
          const count = review.helpfulCount + (isLiked ? 1 : 0);

          return (
            <div
              key={review.id}
              className="p-6 rounded-3xl bg-white border border-[#e5e5dc] space-y-4 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Card Top: 5-Star Rating & Sample Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? "fill-amber-400 text-amber-500" : "text-stone-300"
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#f4f4ee] text-[#7b8192] border border-[#e5e5dc]">
                    Placeholder Testimonial
                  </span>
                </div>

                {/* Review Headline & Body */}
                <h3 className="font-bold text-[#14161b] text-sm leading-snug">
                  &ldquo;{review.headline}&rdquo;
                </h3>

                <p className="text-xs text-[#555a68] leading-relaxed">
                  {review.body}
                </p>

                {/* Product Mention */}
                <div className="pt-2 text-[11px] text-[#7b8192]">
                  <span className="font-medium text-[#14161b]">Product: </span>
                  <span>{review.productTitle}</span>
                </div>
              </div>

              {/* Card Footer: Reviewer Info & Helpful Button */}
              <div className="pt-4 border-t border-[#f0f0e8] flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#14161b]">{review.author}</span>
                    {review.verifiedBuyer && (
                      <span className="inline-flex items-center text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        <CheckCircle className="w-3 h-3 text-emerald-600 mr-0.5" />
                        Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#7b8192]">
                    {review.location} • {review.date}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleHelpful(review.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-colors ${
                    isLiked
                      ? "bg-[#d9381e]/10 border-[#d9381e]/30 text-[#d9381e]"
                      : "bg-[#fafaf7] border-[#e5e5dc] text-[#555a68] hover:text-[#14161b]"
                  }`}
                  aria-label="Mark review as helpful"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>{count}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
