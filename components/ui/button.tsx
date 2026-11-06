import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline" | "ink" | "amber";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      type = "button",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none";

    const variants: Record<string, string> = {
      primary:
        "bg-accent hover:bg-accent-hover text-white shadow-sm hover:shadow-md hover:shadow-accent/20",
      ghost:
        "bg-transparent text-text-secondary hover:text-text-primary hover:bg-muted/70",
      outline:
        "border border-border-subtle hover:border-border-hover bg-surface/70 backdrop-blur-xs text-text-primary hover:bg-muted/40",
      ink:
        "bg-ink text-white hover:bg-ink-subtle border border-border-dark shadow-sm",
      amber:
        "bg-accent-amber hover:bg-accent-amber-hover text-ink font-semibold shadow-sm",
    };

    const sizes: Record<string, string> = {
      sm: "text-xs px-3 py-1.5 rounded-sm tracking-wide gap-1.5",
      md: "text-sm px-5 py-2.5 rounded-sm tracking-wide gap-2",
      lg: "text-base px-7 py-3.5 rounded-sm tracking-wider gap-2.5",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={`${base} ${variants[variant] || variants.primary} ${
          sizes[size] || sizes.md
        } ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
