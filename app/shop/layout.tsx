import type { Metadata } from "next";
import type { ReactNode } from "react";

// /shop and its children are intentionally hidden from PV's public brand:
// - Not linked from main nav, homepage, or footer
// - noindex/nofollow/noarchive so Google + AI crawlers skip them
// - Pages remain live + functional for direct URL traffic (e.g., social posts,
//   KDP book back-matter, email signature links pointing at /shop/<slug>)
// - All Stripe Payment Links still work — they're independent of /shop pages
// Treatment: PV-owned legally, brand-invisible publicly.
export const metadata: Metadata = {
  title: "Shop: Purcell Ventures",
  description: "Self-serve digital products. Instant download via Stripe. 30-day refund.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true, "max-image-preview": "none" },
  },
  alternates: { canonical: undefined },
};

export default function ShopLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
