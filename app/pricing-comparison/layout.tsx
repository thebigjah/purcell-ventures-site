import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Pricing compared with agencies and freelancers",
  description:
    "Purcell Ventures prices for websites, digital services, AI consulting and custom software, next to typical agency, freelancer and DIY prices.",
  keywords: [
    "purcell ventures pricing", "agency pricing comparison", "AI consulting pricing",
    "small business digital services cost", "AI tools cost comparison",
  ],
  openGraph: {
    title: "Pricing compared with agencies and freelancers, Purcell Ventures",
    description: "Purcell Ventures prices beside typical agency, freelancer and DIY costs.",
    url: "https://purcellventures.co/pricing-comparison",
    type: "website",
  
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "/pricing-comparison" },
};

export default function PricingComparisonLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
