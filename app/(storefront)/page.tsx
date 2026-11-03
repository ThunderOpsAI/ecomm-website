import React from "react";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";

export const revalidate = 60; // ISR cache for 60 seconds

type ProductWithInventory = Prisma.ProductGetPayload<{
  include: { inventory: true };
}>;

export default async function StorefrontHomePage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : {};
  const currentCategory = resolvedParams.category?.toLowerCase() || "all";

  let products: ProductWithInventory[] = [];
  let fetchError = false;

  try {
    products = await prisma.product.findMany({
      where: { active: true },
      include: {
        inventory: true,
      },
      orderBy: { createdAt: "asc" },
    });
  } catch (err) {
    console.error("Failed to load products from database:", err);
    fetchError = true;
  }

  // Filter products by selected category if provided
  const filteredProducts = products.filter((p) => {
    if (currentCategory === "japandi") return p.sku.startsWith("JAP-");
    if (currentCategory === "dbz") return p.sku.startsWith("DBZ-");
    if (currentCategory === "3d") return p.sku.startsWith("3D-");
    return true;
  });

  const japandiCount = products.filter((p) => p.sku.startsWith("JAP-")).length;
  const dbzCount = products.filter((p) => p.sku.startsWith("DBZ-")).length;
  const threeDCount = products.filter((p) => p.sku.startsWith("3D-")).length;

  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 lg:py-12">
      {/* Hero Header */}
      <section className="mb-10 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-950/60 px-3 py-1 text-xs font-semibold text-amber-800 dark:text-amber-300">
          Crafted For Speed & Aesthetic Desks
        </span>
        <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Artisan Desk Mats & Ergonomic Collection
        </h1>
        <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
          Discover our curated 12-piece catalog featuring Japanese ink-wash Japandi desk mats,
          licensed Dragon Ball Z collector editions, and ergonomic 3D wrist-support mousepads.
        </p>

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              currentCategory === "all"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "bg-neutral-200/70 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            }`}
          >
            All Items ({products.length})
          </Link>
          <Link
            href="/?category=japandi"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              currentCategory === "japandi"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "bg-neutral-200/70 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            }`}
          >
            Japandi Mats ({japandiCount})
          </Link>
          <Link
            href="/?category=dbz"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              currentCategory === "dbz"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "bg-neutral-200/70 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            }`}
          >
            Dragon Ball Z ({dbzCount})
          </Link>
          <Link
            href="/?category=3d"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              currentCategory === "3d"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "bg-neutral-200/70 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            }`}
          >
            3D Ergonomic ({threeDCount})
          </Link>
        </div>
      </section>

      {/* Error or Empty State */}
      {fetchError ? (
        <div className="mx-auto max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/40 dark:bg-red-950/30">
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-300">
            Database Connection Error
          </h2>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            Unable to fetch inventory from the database. Please verify your connection configuration.
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="mx-auto max-w-md rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <svg
            className="mx-auto h-12 w-12 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="mt-4 text-base font-semibold text-neutral-900 dark:text-white">
            No products in this category
          </h3>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            There are currently no active products matching this filter.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900"
            >
              View All Products
            </Link>
          </div>
        </div>
      ) : (
        /* Products Grid */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              sku={product.sku}
              title={product.title}
              slug={product.slug}
              priceCents={product.priceCents}
              imageUrls={product.imageUrls}
              description={product.description}
              inventory={product.inventory}
            />
          ))}
        </div>
      )}

      {/* Feature Highlights */}
      <section className="mt-16 sm:mt-24 border-t border-neutral-200 dark:border-neutral-800 pt-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs dark:border-neutral-800 dark:bg-neutral-900">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-semibold text-neutral-900 dark:text-white">Micro-Woven Cloth Surface</h4>
            <p className="mt-1 text-sm text-neutral-500">
              High-thread count weave optimized for optical gaming sensors and smooth glides.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs dark:border-neutral-800 dark:bg-neutral-900">
            <div className="text-2xl mb-2">🛡️</div>
            <h4 className="font-semibold text-neutral-900 dark:text-white">Reinforced Stitched Borders</h4>
            <p className="mt-1 text-sm text-neutral-500">
              360° anti-fraying precision edge stitching prevents peeling and wear over time.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs dark:border-neutral-800 dark:bg-neutral-900">
            <div className="text-2xl mb-2">🌿</div>
            <h4 className="font-semibold text-neutral-900 dark:text-white">Natural Rubber Non-Slip Base</h4>
            <p className="mt-1 text-sm text-neutral-500">
              Heavy textured herringbone grip keeps the mat firmly planted during fast movements.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
