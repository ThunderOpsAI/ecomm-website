"use client";

import { useEffect, useRef, useState } from "react";

export interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {}
) {
  const { threshold = 0.15, rootMargin = "0px 0px -40px 0px", triggerOnce = true } =
    options;
  const ref = useRef<T | null>(null);
  const [isRevealed, setIsRevealed] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (isRevealed && triggerOnce) return;

    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      const timer = setTimeout(() => setIsRevealed(true), 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setIsRevealed(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, isRevealed]);

  return { ref, isRevealed };
}
