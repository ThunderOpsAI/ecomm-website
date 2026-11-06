import React from "react";

export function ProductCardSkeleton({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`rounded-2xl overflow-hidden border p-0 flex flex-col animate-pulse ${
        dark
          ? "bg-ink-subtle border-border-dark"
          : "bg-surface border-border-subtle"
      }`}
    >
      <div
        className={`aspect-16/10 w-full ${
          dark ? "bg-ink-muted" : "bg-muted"
        }`}
      />
      <div className="p-4 sm:p-5 flex-1 flex flex-col space-y-3">
        <div className="flex items-center gap-2">
          <div
            className={`h-3 w-16 rounded-xs ${
              dark ? "bg-ink-muted" : "bg-muted"
            }`}
          />
          <div
            className={`h-3 w-20 rounded-xs ${
              dark ? "bg-ink-muted" : "bg-muted"
            }`}
          />
        </div>
        <div
          className={`h-5 w-3/4 rounded-xs ${
            dark ? "bg-ink-muted" : "bg-muted"
          }`}
        />
        <div
          className={`h-3 w-full rounded-xs ${
            dark ? "bg-ink-muted" : "bg-muted"
          }`}
        />
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-border-subtle/50">
          <div
            className={`h-6 w-20 rounded-xs ${
              dark ? "bg-ink-muted" : "bg-muted"
            }`}
          />
          <div
            className={`h-8 w-16 rounded-xs ${
              dark ? "bg-ink-muted" : "bg-muted"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({
  count = 4,
  dark = false,
}: {
  count?: number;
  dark?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} dark={dark} />
      ))}
    </div>
  );
}
