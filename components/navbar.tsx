import React from "react";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/90 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/90">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3.5 sm:px-6">
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white hover:opacity-90 transition-opacity"
          >
            MAT<span className="text-amber-600 dark:text-amber-500">STUDIO</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-neutral-600 dark:text-neutral-300">
            <Link href="/" className="hover:text-amber-600 transition-colors">
              All Products
            </Link>
            <Link href="/category/japandi" className="hover:text-amber-600 transition-colors">
              Japandi Mats
            </Link>
            <Link href="/category/dbz" className="hover:text-amber-600 transition-colors">
              Dragon Ball Z
            </Link>
            <Link href="/category/3d" className="hover:text-amber-600 transition-colors">
              3D Ergonomic
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/cart"
            className="flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:border-amber-600 hover:text-amber-600 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span>Cart</span>
          </Link>
          <Link
            href="/admin/products"
            className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
          >
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
