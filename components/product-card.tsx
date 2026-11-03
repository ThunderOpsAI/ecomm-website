import React from "react";
import Link from "next/link";

export interface ProductCardProps {
  id: string;
  sku: string;
  title: string;
  slug: string;
  priceCents: number;
  imageUrls: string[];
  description?: string;
  inventory?: {
    quantityOnHand: number;
  } | null;
}

export function ProductCard({
  sku,
  title,
  slug,
  priceCents,
  imageUrls,
  inventory,
}: ProductCardProps) {
  const primaryImage = imageUrls?.[0] || "/placeholder.png";
  const stock = inventory?.quantityOnHand ?? 0;
  const isOutOfStock = stock <= 0;

  let categoryLabel = "Desk Mat";
  if (sku.startsWith("JAP-")) categoryLabel = "Japandi Aesthetic";
  else if (sku.startsWith("DBZ-")) categoryLabel = "Dragon Ball Z";
  else if (sku.startsWith("3D-")) categoryLabel = "3D Ergonomic";

  return (
    <Link
      href={`/products/${slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xs hover:shadow-lg transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <img
          src={primaryImage}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-black/70 backdrop-blur-xs px-2.5 py-0.5 text-xs font-medium text-white">
            {categoryLabel}
          </span>
        </div>
        {isOutOfStock ? (
          <div className="absolute top-3 right-3">
            <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">
              Sold Out
            </span>
          </div>
        ) : stock <= 5 ? (
          <div className="absolute top-3 right-3">
            <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white">
              Only {stock} left
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-amber-600 transition-colors">
          {title}
        </h3>
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800">
          <div>
            <span className="text-lg font-bold text-neutral-900 dark:text-white">
              ${(priceCents / 100).toFixed(2)}
            </span>
            <span className="ml-1 text-xs text-neutral-500">AUD</span>
          </div>
          <span className="text-xs font-medium text-amber-600 dark:text-amber-500 group-hover:underline">
            View &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
