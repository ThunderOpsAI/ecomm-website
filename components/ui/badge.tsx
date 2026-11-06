import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "vermilion" | "amber" | "neutral" | "dark" | "outline";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className = "",
  variant = "neutral",
  size = "md",
  children,
  ...props
}) => {
  const base =
    "inline-flex items-center font-mono font-medium tracking-[0.15em] uppercase select-none rounded-xs";

  const variants: Record<string, string> = {
    vermilion:
      "bg-accent/10 text-accent border border-accent/20",
    amber:
      "bg-accent-amber/15 text-[#9d6b05] border border-accent-amber/30",
    neutral:
      "bg-muted text-text-secondary border border-border-subtle",
    dark:
      "bg-ink-muted text-cream/90 border border-border-dark",
    outline:
      "bg-transparent text-text-muted border border-border-subtle",
  };

  const sizes: Record<string, string> = {
    sm: "text-[10px] px-1.5 py-0.5",
    md: "text-[11px] px-2.5 py-1",
  };

  return (
    <span
      className={`${base} ${variants[variant] || variants.neutral} ${
        sizes[size] || sizes.md
      } ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
