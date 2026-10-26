import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI readiness test in 10 questions and 3 minutes",
  description:
    "A test for small business owners and team leaders by Elijah Purcell. It scores your team's AI readiness out of 30 in 10 questions and gives you 3 next steps. No email required.",
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
