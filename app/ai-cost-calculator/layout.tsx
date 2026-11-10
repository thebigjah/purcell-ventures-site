import type { Metadata } from "next";
import PageDates from "@/app/components/PageDates";
import ToolSchema from "@/app/components/ToolSchema";

export const metadata: Metadata = {
  title: "AI cost calculator",
  description:
    "A free calculator by Elijah Purcell. Enter team size, hourly cost, manual workload and your quoted training cost to see how fast AI training pays back.",
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
      <ToolSchema name="AI cost calculator" path="/ai-cost-calculator" description="A free calculator by Elijah Purcell. Enter team size, hourly cost, manual workload and your quoted training cost to see how fast AI training pays back." />
      <PageDates path="/ai-cost-calculator" />
      {children}
    </>
  );
}
