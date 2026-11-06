"use client";

import React, { ElementType } from "react";
import { useReveal } from "@/lib/hooks/use-reveal";

interface RevealSectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div";
  children: React.ReactNode;
  delayMs?: number;
}

export const RevealSection: React.FC<RevealSectionProps> = ({
  as = "section",
  children,
  className = "",
  delayMs = 0,
  ...props
}) => {
  const { ref, isRevealed } = useReveal<HTMLDivElement>();
  const Tag = as as ElementType;

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isRevealed
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 pointer-events-none"
      } ${className}`}
      style={{ transitionDelay: `${delayMs}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
};
