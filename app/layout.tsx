import type { Metadata } from "next";
import { Geist, Geist_Mono, Shippori_Mincho } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import { SearchModal } from "@/components/search-modal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const shipporiMincho = Shippori_Mincho({
  variable: "--font-display",
  weight: ["500", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://matstudio.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MatStudio | Precision Gaming Mouse Pads & Desk Mats Australia",
    template: "%s | MatStudio",
  },
  description:
    "Artisan cloth-top gaming mouse pads and extended desk mats engineered with micro-woven control cloth and natural anti-slip rubber. Dispatched from Wangaratta, Victoria via Australia Post.",
  keywords: [
    "gaming mouse pad",
    "desk mat Australia",
    "Japandi desk mat",
    "anime mouse pad",
    "ergonomic 3D mouse pad",
    "large gaming mat 900x400",
    "micro woven cloth mousepad",
    "anti-fray desk mat",
    "Wangaratta mouse pad",
    "MatStudio",
  ],
  authors: [{ name: "MatStudio", url: siteUrl }],
  creator: "MatStudio",
  publisher: "MatStudio Australia",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "MatStudio | Precision Gaming Mouse Pads & Desk Mats Australia",
    description:
      "Premium cloth-top desk mats with natural tree-rubber bases. Minimalist Japandi, high-energy anime series, and ergonomic 3D wrist supports. Fast Australia Post dispatch from Wangaratta, VIC.",
    url: siteUrl,
    siteName: "MatStudio",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/images/products/japandi/blood-moon-pagoda/lifestyle.jpeg",
        width: 1200,
        height: 630,
        alt: "MatStudio Precision Gaming Mouse Pads & Desk Mats Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MatStudio | Precision Desk Mats Australia",
    description:
      "Micro-woven cloth, stitched anti-fray edges, and natural non-slip rubber bases. Dispatched from Wangaratta, VIC.",
    images: ["/images/products/japandi/blood-moon-pagoda/lifestyle.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${shipporiMincho.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "OnlineStore",
              name: "MatStudio",
              description:
                "Australian designer and producer of premium micro-woven cloth gaming mouse pads and natural rubber desk mats.",
              currenciesAccepted: "AUD",
              paymentAccepted: "Credit Card, PayPal, Apple Pay",
              areaServed: {
                "@type": "Country",
                name: "Australia",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-cream text-text-primary selection:bg-accent/15 selection:text-accent">
        <CartProvider>
          {children}
          <CartDrawer />
          <SearchModal />
        </CartProvider>
      </body>
    </html>
  );
}
