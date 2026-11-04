import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS } from "@/src/data/products";
import { ProductDetailClient } from "@/components/product-detail-client";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const resolved = await params;
  const product = PRODUCTS.find((p) => p.slug === resolved.slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested MatStudio mouse pad or desk mat could not be found.",
    };
  }

  const primaryImage = product.images[0] || "/Mousepads/Japandi%20Desk%20Mats/Blood_Moon/Blood%20Moon%20Pagoda.jpeg";
  const title = `${product.title} | ${product.collectionName}`;
  const description =
    product.description ||
    `${product.title} precision gaming desk mat engineered with micro-woven cloth, anti-fray stitched edges, and non-slip rubber base. Dispatched from Wangaratta, VIC.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.title} | MatStudio Australia`,
      description,
      url: `/products/${product.slug}`,
      type: "website",
      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 630,
          alt: `${product.title} - MatStudio Gaming Desk Mat`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | MatStudio Australia`,
      description,
      images: [primaryImage],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const resolved = await params;
  const product = PRODUCTS.find((p) => p.slug === resolved.slug);

  if (!product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-[#f4f3ef]">Product Not Found</h1>
        <p className="text-sm text-[#9da6b8]">
          The desk mat &ldquo;{resolved.slug}&rdquo; could not be located in our catalog.
        </p>
        <Link
          href="/"
          className="inline-block px-5 py-2.5 rounded-xl bg-[#e25333] text-white text-xs font-semibold"
        >
          Return to Storefront
        </Link>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter((p) => p.slug !== resolved.slug).slice(0, 4);

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
