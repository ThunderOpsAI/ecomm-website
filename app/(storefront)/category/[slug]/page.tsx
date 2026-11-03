import React from "react";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

type ProductWithInventory = Prisma.ProductGetPayload<{
  include: { inventory: true };
}>;

const CATEGORY_MAP: Record<string, { title: string; prefix: string; description: string }> = {
  japandi: {
    title: "Japandi Desk Mats",
    prefix: "JAP-",
    description: "Minimalist Japanese and Scandinavian inspired ink-wash artwork and tranquil desk setups.",
  },
  dbz: {
    title: "Dragon Ball Z Mousepads",
    prefix: "DBZ-",
    description: "Iconic Dragon Ball Z multi-panel designs, battle scenes, and high-performance gaming surfaces.",
  },
  "3d": {
    title: "3D Ergonomic Mousepads",
    prefix: "3D-",
    description: "Ergonomic medical-grade silicone wrist supports designed to eliminate strain during extended gaming sessions.",
  },
};

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryInfo = CATEGORY_MAP[slug.toLowerCase()];

  let products: ProductWithInventory[] = [];
  let fetchError = false;

  try {
    const allProducts = await prisma.product.findMany({
      where: { active: true },
      include: {
        inventory: true,
      },
      orderBy: { createdAt: "asc" },
    });

    if (categoryInfo) {
      products = allProducts.filter((p) => p.sku.startsWith(categoryInfo.prefix));
    } else {
      products = [];
    }
  } catch (err) {
    console.error("Failed to query category products:", err);
    fetchError = true;
  }

  const title = categoryInfo?.title || `Category: ${slug}`;
  const description =
    categoryInfo?.description || `Explore our high-performance mousepads and desk mats.`;

  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 lg:py-12">
      {/* Category Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <nav className="mb-4 flex items-center justify-center space-x-2 text-sm text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 dark:hover:text-white">
            Home
          </Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white font-medium">{title}</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          {title}
        </h1>
        <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400">{description}</p>
      </div>

      {/* Products or Empty State */}
      {fetchError ? (
        <div className="mx-auto max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/40 dark:bg-red-950/30">
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-300">
            Database Connection Error
          </h2>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            Unable to load products for this category.
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="mx-auto max-w-md rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
            No products found in this category
          </h3>
          <p className="mt-2 text-sm text-neutral-500">
            Check back soon as new collections are added regularly.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900"
            >
              &larr; Return to Storefront
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
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
    </main>
  );
}
