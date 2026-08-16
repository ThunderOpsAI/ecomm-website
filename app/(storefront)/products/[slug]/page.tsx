import React from "react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Product: {slug}</h1>
      <p className="mt-2 text-gray-600">Product details placeholder</p>
    </main>
  );
}
