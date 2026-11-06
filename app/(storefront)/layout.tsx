import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-text-primary transition-colors selection:bg-accent/15 selection:text-accent">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
