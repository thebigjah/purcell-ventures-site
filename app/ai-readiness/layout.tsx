import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Readiness Test: 10 Questions, 3 Minutes",
  description:
    "A diagnostic for small business owners and team leaders. Score your AI readiness in 10 questions, get 3 calibrated next-step recommendations, no email capture. From Elijah Purcell.",
  alternates: { canonical: "/ai-readiness" },
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
      "name": "AI readiness test",
      "item": "https://purcellventures.co/ai-readiness"
    }
  ]
};

export default function AIReadinessLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      {children}
    </>
  );
}
