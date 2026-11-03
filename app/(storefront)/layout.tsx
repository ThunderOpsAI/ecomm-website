import React from "react";
import Navbar from "@/components/navbar";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Navbar />
      <div className="flex-1">{children}</div>
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-10 text-center text-sm text-neutral-500">
        <div className="container mx-auto px-4 space-y-2">
          <p className="font-medium text-neutral-700 dark:text-neutral-300">
            Artisan Desk Mats & Ergonomic Accessories
          </p>
          <p>© {new Date().getFullYear()} Studio Mats. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
