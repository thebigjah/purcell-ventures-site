import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "How agencies, freelancers and I price work",
  description:
    "How Purcell Ventures, agencies, freelancers and do-it-yourself tools each price AI consulting, custom software and websites, and what each option includes.",
  keywords: [
    "purcell ventures pricing", "agency pricing comparison", "AI consulting pricing",
    "small business digital services cost", "AI tools cost comparison",
  ],
  openGraph: {
    title: "How agencies, freelancers and I price work, Purcell Ventures",
    description: "How Purcell Ventures, agencies, freelancers and DIY tools each set a price, and what each includes.",
    url: "https://purcellventures.co/pricing-comparison",
    type: "website",
  
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "/pricing-comparison" },
};

export default function PricingComparisonLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
