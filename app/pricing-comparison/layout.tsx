import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Pricing compared with agencies and freelancers",
  description:
    "Purcell Ventures prices next to typical agency, freelancer and DIY prices, with a link to the ROI calculator.",
  keywords: [
    "purcell ventures pricing", "agency pricing comparison", "AI consulting pricing",
    "small business digital services cost", "AI tools cost comparison",
  ],
  openGraph: {
    title: "Pricing, compared: Purcell Ventures",
    description: "Our prices side by side with typical agency, freelancer and DIY costs.",
    url: "https://purcellventures.co/pricing-comparison",
    type: "website",
  
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "/pricing-comparison" },
};

export default function PricingComparisonLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
