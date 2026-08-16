import React from "react";

export interface ProductCardProps {
  id?: string;
  title?: string;
  priceCents?: number;
  slug?: string;
  imageUrl?: string;
}

export function ProductCard({ title = "Product Title", priceCents = 0 }: ProductCardProps) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-600">${(priceCents / 100).toFixed(2)}</p>
    </div>
  );
}

export default ProductCard;
