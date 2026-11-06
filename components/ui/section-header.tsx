import React from "react";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  theme?: "light" | "dark";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "light",
  className = "",
}) => {
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  }[align];

  const isDark = theme === "dark";

  return (
    <div className={`flex flex-col max-w-2xl ${alignClass} ${className}`}>
      {eyebrow && (
        <span
          className={`font-mono text-xs uppercase tracking-[0.2em] mb-2 font-medium ${
            isDark ? "text-accent-amber" : "text-accent"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] ${
          isDark ? "text-cream" : "text-text-primary"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-sm sm:text-base leading-relaxed ${
            isDark ? "text-cream/70" : "text-text-secondary"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
