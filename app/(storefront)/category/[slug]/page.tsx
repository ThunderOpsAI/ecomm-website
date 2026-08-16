import React from "react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Category: {slug}</h1>
      <p className="mt-2 text-gray-600">Category products placeholder</p>
    </main>
  );
}
