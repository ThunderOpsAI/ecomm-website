"use client";

import React from "react";

export interface CartDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function CartDrawer({ isOpen = false, onClose }: CartDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
      <div className="w-full max-w-md bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        <p className="mt-4 text-gray-600">Cart drawer placeholder</p>
      </div>
    </div>
  );
}

export default CartDrawer;
