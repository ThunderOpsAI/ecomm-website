import React from "react";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b bg-white">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold">
          Ecomm Store
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/cart" className="text-gray-700 hover:text-black">
            Cart
          </Link>
          <Link href="/admin/products" className="text-gray-700 hover:text-black">
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
