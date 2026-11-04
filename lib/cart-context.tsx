"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { ProductSize } from "@/src/data/products";

export interface CartItem {
  id: string; // product id + size identifier
  productId: string;
  slug: string;
  title: string;
  sku: string;
  image: string;
  size: ProductSize;
  priceCents: number;
  quantity: number;
  collection: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: {
    productId: string;
    slug: string;
    title: string;
    sku: string;
    image: string;
    size: ProductSize;
    priceCents: number;
    quantity?: number;
    collection: string;
  }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
  subtotalCents: number;
  itemCount: number;
  orderNotes: string;
  setOrderNotes: (notes: string) => void;
  freeShippingThresholdCents: number;
  isFreeShippingEligible: boolean;
  remainingForFreeShippingCents: number;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_STORAGE_KEY = "matstudio_cart_v1";
const NOTES_STORAGE_KEY = "matstudio_order_notes_v1";
const THEME_STORAGE_KEY = "matstudio_theme_v1";
const FREE_SHIPPING_THRESHOLD_CENTS = 6000; // $60.00 AUD

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [orderNotes, setOrderNotesState] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    try {
      return localStorage.getItem(NOTES_STORAGE_KEY) || "";
    } catch {
      return "";
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "light";
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as "dark" | "light" | null;
      return stored || "light";
    } catch {
      return "light";
    }
  });

  // Apply theme class to document
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  // Persist items
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn("Could not save cart to localStorage:", e);
    }
  }, [items]);

  // Persist notes
  const setOrderNotes = (notes: string) => {
    setOrderNotesState(notes);
    try {
      localStorage.setItem(NOTES_STORAGE_KEY, notes);
    } catch (e) {
      console.warn("Could not save notes to localStorage:", e);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch (e) {
        console.warn(e);
      }
      if (next === "light") {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      }
      return next;
    });
  };

  const addItem: CartContextValue["addItem"] = (newItem) => {
    const qtyToAdd = newItem.quantity && newItem.quantity > 0 ? newItem.quantity : 1;
    const itemKey = `${newItem.productId}_${newItem.size}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qtyToAdd,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: itemKey,
            productId: newItem.productId,
            slug: newItem.slug,
            title: newItem.title,
            sku: newItem.sku,
            image: newItem.image,
            size: newItem.size,
            priceCents: newItem.priceCents,
            quantity: qtyToAdd,
            collection: newItem.collection,
          },
        ];
      }
    });

    setIsCartDrawerOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);
  const toggleCartDrawer = () => setIsCartDrawerOpen((prev) => !prev);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const subtotalCents = useMemo(() => {
    return items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
  }, [items]);

  const itemCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const isFreeShippingEligible = subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS;
  const remainingForFreeShippingCents = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD_CENTS - subtotalCents
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        toggleCartDrawer,
        subtotalCents,
        itemCount,
        orderNotes,
        setOrderNotes,
        freeShippingThresholdCents: FREE_SHIPPING_THRESHOLD_CENTS,
        isFreeShippingEligible,
        remainingForFreeShippingCents,
        isSearchOpen,
        openSearch,
        closeSearch,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
