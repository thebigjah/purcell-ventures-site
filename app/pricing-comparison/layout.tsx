import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Pricing comparison — PV vs Agencies vs Freelancers | Purcell Ventures",
  description:
    "Honest pricing comparison: Purcell Ventures vs typical agency vs freelancer vs DIY tools. Numbers, not spin. Includes ROI calculator link.",
  keywords: [
    "purcell ventures pricing", "agency pricing comparison", "AI consulting pricing",
    "small business digital services cost", "AI tools cost comparison",
  ],
  openGraph: {
    title: "Pricing, compared — Purcell Ventures",
    description: "Our prices side by side with typical agency / freelancer / DIY costs. No spin.",
    url: "https://purcellventures.co/pricing-comparison",
    type: "website",
  },
  alternates: { canonical: "/pricing-comparison" },
};

export default function PricingComparisonLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
