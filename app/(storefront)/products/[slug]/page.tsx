import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;

  let product = null;
  try {
    product = await prisma.product.findUnique({
      where: { slug },
      include: {
        inventory: true,
      },
    });
  } catch (err) {
    console.error("Failed to query product:", err);
  }

  if (!product) {
    return (
      <main className="container mx-auto px-4 py-16 text-center max-w-lg">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Product Not Found</h1>
          <p className="mt-2 text-sm text-neutral-500">
            The product &ldquo;{slug}&rdquo; could not be found or may have been discontinued.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900"
            >
              &larr; Back to Storefront
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const stock = product.inventory?.quantityOnHand ?? 0;
  const isOutOfStock = stock <= 0;

  let categoryName = "Desk Mat";
  let categoryUrl = "/";
  if (product.sku.startsWith("JAP-")) {
    categoryName = "Japandi Desk Mats";
    categoryUrl = "/category/japandi";
  } else if (product.sku.startsWith("DBZ-")) {
    categoryName = "Dragon Ball Z";
    categoryUrl = "/category/dbz";
  } else if (product.sku.startsWith("3D-")) {
    categoryName = "3D Ergonomic";
    categoryUrl = "/category/3d";
  }

  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 lg:py-12">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center space-x-2 text-sm text-neutral-500">
        <Link href="/" className="hover:text-neutral-900 dark:hover:text-white">
          Home
        </Link>
        <span>/</span>
        <Link href={categoryUrl} className="hover:text-neutral-900 dark:hover:text-white">
          {categoryName}
        </Link>
        <span>/</span>
        <span className="text-neutral-900 dark:text-white font-medium line-clamp-1">
          {product.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Images Gallery */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
            <img
              src={product.imageUrls[0] || "/placeholder.png"}
              alt={product.title}
              className="w-full h-auto object-cover max-h-[500px]"
            />
          </div>

          {product.imageUrls.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {product.imageUrls.map((img, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <img
                    src={img}
                    alt={`${product.title} detail view ${idx + 1}`}
                    className="w-full h-24 object-cover hover:scale-105 transition-transform cursor-pointer"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Purchase */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="inline-block rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              {categoryName}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {product.title}
          </h1>

          <div className="mt-4 flex items-baseline space-x-3">
            <span className="text-3xl font-extrabold text-neutral-900 dark:text-white">
              ${(product.priceCents / 100).toFixed(2)}
            </span>
            <span className="text-sm font-medium text-neutral-500">AUD (incl. GST)</span>
          </div>

          <div className="mt-4 flex items-center space-x-2">
            {isOutOfStock ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-950/60 dark:text-red-300">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                Out of Stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-950/60 dark:text-green-300">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                In Stock ({stock} available)
              </span>
            )}
            <span className="text-xs text-neutral-400">SKU: {product.sku}</span>
          </div>

          <p className="mt-6 text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
            {product.description}
          </p>

          {/* Action Button */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/cart"
              className={`flex-1 rounded-xl py-3.5 px-6 text-center font-semibold text-white shadow-md transition-all ${
                isOutOfStock
                  ? "bg-neutral-400 cursor-not-allowed pointer-events-none"
                  : "bg-amber-600 hover:bg-amber-500 active:scale-98"
              }`}
            >
              {isOutOfStock ? "Sold Out" : "Add to Cart"}
            </Link>
            <Link
              href="/checkout"
              className="rounded-xl border border-neutral-300 dark:border-neutral-700 py-3.5 px-6 text-center font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              Buy Now
            </Link>
          </div>

          {/* Specifications Table */}
          <div className="mt-10 border-t border-neutral-200 dark:border-neutral-800 pt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">
              Specifications
            </h3>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <dt className="text-neutral-500">Dimensions</dt>
              <dd className="font-medium text-neutral-900 dark:text-white">
                {product.lengthCm} × {product.widthCm} cm
              </dd>

              <dt className="text-neutral-500">Thickness</dt>
              <dd className="font-medium text-neutral-900 dark:text-white">{product.heightCm} cm</dd>

              <dt className="text-neutral-500">Weight</dt>
              <dd className="font-medium text-neutral-900 dark:text-white">{product.weightGrams}g</dd>

              <dt className="text-neutral-500">Surface</dt>
              <dd className="font-medium text-neutral-900 dark:text-white">
                Micro-woven low-friction cloth
              </dd>

              <dt className="text-neutral-500">Base</dt>
              <dd className="font-medium text-neutral-900 dark:text-white">Non-slip natural rubber</dd>
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
}
