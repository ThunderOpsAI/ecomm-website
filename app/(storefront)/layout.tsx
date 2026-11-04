import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0d11] text-[#f4f3ef] transition-colors selection:bg-[#e25333]/30 selection:text-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
