import type { Metadata } from "next";
import { COLLECTIONS } from "@/src/data/products";
import { CategoryClient } from "@/components/category-client";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolved = await params;
  const rawSlug = resolved.slug.toLowerCase();
  const collectionKey =
    rawSlug === "dbz"
      ? "anime"
      : rawSlug === "3d-ergonomic" || rawSlug === "ergonomic"
      ? "3d"
      : rawSlug;

  const collectionInfo = COLLECTIONS[collectionKey];
  const title = collectionInfo?.title || "All Mouse Pads & Desk Mats";
  const description =
    collectionInfo?.description ||
    "Shop premium precision cloth desk mats and ergonomic wrist support pads designed in Australia. Fast dispatch from Wangaratta, VIC via Aus Post.";

  return {
    title: `${title} | Precision Desk Mats & Mouse Pads`,
    description,
    alternates: {
      canonical: `/category/${collectionKey}`,
    },
    openGraph: {
      title: `${title} | MatStudio Australia`,
      description,
      url: `/category/${collectionKey}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | MatStudio Australia`,
      description,
    },
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const resolved = await params;
  const rawSlug = resolved.slug.toLowerCase();
  const collectionKey =
    rawSlug === "dbz"
      ? "anime"
      : rawSlug === "3d-ergonomic" || rawSlug === "ergonomic"
      ? "3d"
      : rawSlug;

  return <CategoryClient collectionKey={collectionKey} />;
}
