import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case studies from AI consulting work",
  description:
    "Case studies from Elijah Purcell's AI consulting work. None are published yet. Each will go up only with the client's permission.",
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
        "text": "None are published yet. Each one will go up only with the client's permission and will describe the team, the workflow and the hours it saved."
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
