"use client";

import React, { useState } from "react";
import {
  Maximize2,
  Minimize2,
  Check,
  Mouse,
  Keyboard,
  Monitor,
  Info,
  Sparkles,
} from "lucide-react";

export type VisualizerSize = "standard" | "large";

interface DeskSizeVisualizerProps {
  currentSize?: string;
  onSelectSize?: (sizeName: "Standard (200×240mm)" | "Large Desk Mat (400×900mm)") => void;
  productImage?: string;
}

export function DeskSizeVisualizer({
  currentSize,
  onSelectSize,
  productImage,
}: DeskSizeVisualizerProps) {
  // Determine initial state based on currentSize prop if provided
  const initialMode: VisualizerSize =
    currentSize && currentSize.includes("Standard") ? "standard" : "large";

  const [activeSize, setActiveSize] = useState<VisualizerSize>(initialMode);
  const [showDimensions, setShowDimensions] = useState(true);

  const handleToggle = (size: VisualizerSize) => {
    setActiveSize(size);
    if (onSelectSize) {
      if (size === "standard") {
        onSelectSize("Standard (200×240mm)");
      } else {
        onSelectSize("Large Desk Mat (400×900mm)");
      }
    }
  };

  const isLarge = activeSize === "large";

  return (
    <div className="rounded-3xl bg-white border border-[#e5e5dc] p-5 sm:p-7 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d9381e] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Space Planner</span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#14161b] mt-0.5">
            Desk Space &amp; Scale Visualizer
          </h3>
          <p className="text-xs text-[#555a68]">
            Simulated on a standard 1400 × 700mm Australian home workstation.
          </p>
        </div>

        {/* Toggle Pills */}
        <div className="flex items-center p-1 rounded-2xl bg-[#f4f4ee] border border-[#e5e5dc] shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => handleToggle("standard")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              !isLarge
                ? "bg-white text-[#14161b] shadow-2xs border border-[#e5e5dc]"
                : "text-[#7b8192] hover:text-[#14161b]"
            }`}
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Standard (200×240mm)</span>
          </button>

          <button
            type="button"
            onClick={() => handleToggle("large")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isLarge
                ? "bg-[#d9381e] text-white shadow-xs shadow-[#d9381e]/30"
                : "text-[#7b8192] hover:text-[#14161b]"
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Large Mat (400×900mm)</span>
          </button>
        </div>
      </div>

      {/* Visual Desk Canvas */}
      <div className="relative aspect-16/9 sm:aspect-21/9 rounded-2xl overflow-hidden bg-gradient-to-b from-[#22252a] via-[#1a1c22] to-[#141519] border border-stone-800 p-4 sm:p-6 flex flex-col justify-between shadow-inner select-none">
        {/* Subtle wood / surface texture lines */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Top: Desk Width & Monitor Indicator */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-400 font-mono">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Workstation 1400mm Width
          </span>

          {/* Central Monitor Stand Silhouette */}
          <div className="flex flex-col items-center">
            <div className="w-36 sm:w-56 h-3 rounded-t-md bg-stone-700/80 border-t border-stone-600 flex items-center justify-center">
              <span className="text-[9px] uppercase tracking-widest text-stone-300 font-sans font-semibold">
                27&quot; Gaming Display
              </span>
            </div>
            <div className="w-12 h-2 bg-stone-800 rounded-b border border-stone-700"></div>
          </div>

          <span>700mm Depth</span>
        </div>

        {/* Center: Interactive Mat Placement & Peripherals Stage */}
        <div className="relative z-10 flex-1 flex items-center justify-center py-2 sm:py-4">
          <div className="relative w-full max-w-2xl h-full flex items-center justify-center">
            {/* LARGE MAT (400x900mm) representation */}
            {isLarge ? (
              <div
                className="relative w-[85%] sm:w-[80%] h-[78%] sm:h-[85%] rounded-xl transition-all duration-500 ease-out flex items-center justify-between px-6 sm:px-10 border-2 border-[#d9381e] shadow-[0_10px_35px_rgba(217,56,30,0.25)] overflow-hidden group"
                style={{
                  backgroundImage: productImage ? `url(${productImage})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "#1c1e24",
                }}
              >
                {/* Overlay for peripheral contrast */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

                {/* Stitched Edge visual badge */}
                <div className="absolute top-2 left-2 z-20">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#d9381e] text-white shadow-xs">
                    400 × 900 mm (Large Mat)
                  </span>
                </div>

                <div className="absolute bottom-2 right-2 z-20">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-black/75 text-stone-200 border border-white/10">
                    4.0mm High-Density Cushion
                  </span>
                </div>

                {/* Keyboard resting ON mat */}
                <div className="relative z-10 w-[55%] sm:w-[50%] h-[60%] sm:h-[65%] rounded-lg bg-stone-900/90 border border-stone-700/80 p-2 shadow-lg flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] text-stone-300 font-mono">
                    <span className="flex items-center gap-1 font-sans font-semibold">
                      <Keyboard className="w-3 h-3 text-[#d9381e]" />
                      Mechanical Keyboard (TKL/75%)
                    </span>
                    <span className="text-[9px] text-stone-400">On Mat</span>
                  </div>
                  {/* Keycap grid representation */}
                  <div className="grid grid-cols-10 gap-0.5 opacity-60 my-auto">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="h-2 rounded-[2px] bg-stone-700/70 border border-stone-600/50"
                      />
                    ))}
                  </div>
                  <span className="text-[9px] text-emerald-400 font-mono">
                    ✓ Acoustic vibration dampening active
                  </span>
                </div>

                {/* Mouse resting ON mat with huge sweep room */}
                <div className="relative z-10 w-[26%] sm:w-[28%] h-[80%] rounded-lg border border-dashed border-[#d9381e]/60 bg-[#d9381e]/10 p-2 flex flex-col items-center justify-between">
                  <span className="text-[9px] font-bold text-amber-300 text-center uppercase tracking-wider">
                    Full Arm Flick Zone
                  </span>
                  {/* Mouse Icon */}
                  <div className="w-7 h-11 rounded-full border-2 border-white/80 bg-stone-900 shadow-md flex flex-col items-center pt-1.5">
                    <div className="w-1 h-2 rounded-full bg-[#d9381e]"></div>
                  </div>
                  <span className="text-[9px] font-mono text-stone-300 text-center">
                    Low-DPI Sensor Space
                  </span>
                </div>
              </div>
            ) : (
              /* STANDARD (200x240mm) representation */
              <div className="relative w-full h-full flex items-center justify-center gap-4 sm:gap-8 transition-all duration-500 ease-out">
                {/* Keyboard resting ON BARE DESK */}
                <div className="w-[48%] sm:w-[46%] h-[55%] rounded-lg bg-stone-900/75 border border-dashed border-stone-600 p-2 shadow-md flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] text-stone-300 font-mono">
                    <span className="flex items-center gap-1 font-sans font-semibold">
                      <Keyboard className="w-3 h-3 text-stone-400" />
                      Keyboard (On Bare Timber)
                    </span>
                    <span className="text-[9px] text-amber-400">No Mat</span>
                  </div>
                  <div className="grid grid-cols-10 gap-0.5 opacity-40 my-auto">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="h-2 rounded-[2px] bg-stone-700/60 border border-stone-600/40"
                      />
                    ))}
                  </div>
                  <span className="text-[9px] text-stone-400 font-mono">
                    Direct desk contact
                  </span>
                </div>

                {/* Standard Compact Mousepad */}
                <div
                  className="relative w-[28%] sm:w-[24%] h-[70%] sm:h-[75%] rounded-xl border-2 border-[#d9381e] shadow-[0_8px_25px_rgba(217,56,30,0.3)] p-2.5 flex flex-col justify-between overflow-hidden"
                  style={{
                    backgroundImage: productImage ? `url(${productImage})` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "#1c1e24",
                  }}
                >
                  <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold text-white bg-[#d9381e] px-1.5 py-0.5 rounded">
                      200 × 240 mm
                    </span>
                  </div>

                  {/* Mouse Icon */}
                  <div className="relative z-10 self-center w-7 h-11 rounded-full border-2 border-white/80 bg-stone-900 shadow-md flex flex-col items-center pt-1.5">
                    <div className="w-1 h-2 rounded-full bg-[#d9381e]"></div>
                  </div>

                  <div className="relative z-10 text-center">
                    <span className="text-[9px] font-bold text-amber-300 block">
                      Dedicated Mouse Pad
                    </span>
                    <span className="text-[8px] text-stone-300 font-mono">
                      High-DPI Wrist Aiming
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Legend */}
        <div className="relative z-10 flex items-center justify-between text-[10px] text-stone-400 pt-1 border-t border-stone-800">
          <span>Scale: ~1:12 proportional projection</span>
          <span className="text-amber-400 font-medium">
            {isLarge
              ? "Large mat cushions both keyboard & mouse with 0.36m² surface"
              : "Standard pad offers compact 0.048m² dedicated mouse footprint"}
          </span>
        </div>
      </div>

      {/* Feature & Specs Comparison Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* Standard Pad Box */}
        <div
          onClick={() => handleToggle("standard")}
          className={`cursor-pointer p-4 rounded-2xl border transition-all ${
            !isLarge
              ? "bg-[#fafaf7] border-[#d9381e] shadow-xs"
              : "bg-white border-[#e5e5dc] hover:border-[#cbccc2] opacity-80"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#14161b]">
                Standard Mouse Pad
              </span>
              {!isLarge && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#d9381e] text-white">
                  Active View
                </span>
              )}
            </div>
            <span className="text-xs font-mono font-bold text-[#14161b]">
              200 × 240 mm
            </span>
          </div>

          <ul className="text-xs text-[#555a68] space-y-1.5">
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#d9381e] shrink-0" />
              <span>
                <strong>0.048 m² surface:</strong> Compact footprint for smaller desks
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#d9381e] shrink-0" />
              <span>
                <strong>Ultra-Portable:</strong> Fits easily in laptop sleeves &amp; backpacks
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#d9381e] shrink-0" />
              <span>
                <strong>Tuned for High DPI:</strong> Optimal for 800-1600+ DPI wrist players
              </span>
            </li>
          </ul>
        </div>

        {/* Large Desk Mat Box */}
        <div
          onClick={() => handleToggle("large")}
          className={`cursor-pointer p-4 rounded-2xl border transition-all ${
            isLarge
              ? "bg-[#fafaf7] border-[#d9381e] shadow-xs"
              : "bg-white border-[#e5e5dc] hover:border-[#cbccc2] opacity-80"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#14161b]">
                Large Desk Mat (Battlestation)
              </span>
              {isLarge && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#d9381e] text-white">
                  Active View
                </span>
              )}
            </div>
            <span className="text-xs font-mono font-bold text-[#14161b]">
              400 × 900 mm
            </span>
          </div>

          <ul className="text-xs text-[#555a68] space-y-1.5">
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#d9381e] shrink-0" />
              <span>
                <strong>0.360 m² surface:</strong> 7.5× more area (+650% mouse travel)
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#d9381e] shrink-0" />
              <span>
                <strong>Acoustic Isolation:</strong> 4mm rubber dampens keyboard vibrations
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#d9381e] shrink-0" />
              <span>
                <strong>Unified Aesthetic:</strong> Seamless wrist rest across whole desk
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
