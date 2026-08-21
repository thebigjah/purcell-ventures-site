import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Cost Calculator: What Would an AI Session Save You?",
  description:
    "Enter team size, hourly cost, and manual workload. See how fast a focused AI consulting session pays back in dollars and hours. Conservative numbers, no smoke. From Elijah Purcell.",
  alternates: { canonical: "/ai-cost-calculator" },
};


const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://purcellventures.co"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "AI cost calculator",
      "item": "https://purcellventures.co/ai-cost-calculator"
    }
  ]
};

export default function AICostCalcLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      {children}
    </>
  );
}
