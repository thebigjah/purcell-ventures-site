import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies: Software Elijah Purcell Has Shipped",
  description:
    "Real teams. Real workflows. Real hours saved. Case studies from Elijah Purcell's AI consulting work, published with each client's explicit permission.",
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
      "name": "Are the Purcell Ventures case studies real?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Each one is published with the client's explicit permission and describes a real team, a real workflow and the hours it saved."
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
