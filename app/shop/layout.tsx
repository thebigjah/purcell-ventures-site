import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Shop — Self-serve digital products | Purcell Ventures",
  description:
    "Self-serve digital products from Purcell Ventures. The PV AI Starter Kit ($19) and Cold Email Mastery Pack ($29). Instant download via Stripe. 30-day refund guarantee.",
  keywords: [
    "AI prompts pack", "sales scripts download", "cold email templates",
    "small business AI kit", "marketing template download",
  ],
  openGraph: {
    title: "Shop — Purcell Ventures self-serve digital products",
    description: "$19 PV AI Starter Kit + $29 Cold Email Pack. Instant download. 30-day refund.",
    url: "https://purcellventures.co/shop",
    type: "website",
  },
  alternates: { canonical: "/shop" },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "Product",
      "position": 1,
      "name": "PV AI Starter Kit",
      "description": "24 production AI prompts + 5 sales scripts + full rep handbook + 50+ cold-outreach templates + contractor agreement + CRM CSV.",
      "offers": { "@type": "Offer", "price": "19", "priceCurrency": "USD" },
      "url": "https://purcellventures.co/shop/starter-kit",
    },
    {
      "@type": "Product",
      "position": 2,
      "name": "Cold Email Mastery Pack",
      "description": "100+ cold email templates across 10 industries + 80 subject lines + 30 reply-handling scripts + AI scoring rubric + sequencing cadences.",
      "offers": { "@type": "Offer", "price": "29", "priceCurrency": "USD" },
      "url": "https://purcellventures.co/shop/cold-email-pack",
    },
  ],
};

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      {children}
    </>
  );
}
