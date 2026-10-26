import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case studies from AI consulting work",
  description:
    "Case studies from Elijah Purcell's AI consulting work. None are published yet, and each one goes up only with the client's permission.",
  alternates: { canonical: "/case-studies" },
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
      "name": "Case studies",
      "item": "https://purcellventures.co/case-studies"
    }
  ]
};
const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Has Purcell Ventures published any case studies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not yet. I publish a case study only with the client's permission. Each one will describe the team, the workflow I changed and the hours it saved."
      }
    }
  ]
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />
      {children}
    </>
  );
}
