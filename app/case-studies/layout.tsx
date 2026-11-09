import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case studies: client app, AI system, town audit",
  description:
    "Rufus Rideshare on the App Store, the 57-agent COSMIC system that runs Purcell Ventures, and an audit of 121 businesses near the University of Alabama.",
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
      "name": "What work can I check from Purcell Ventures?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rufus Rideshare, an iPhone app built for a Georgia College student and approved for the App Store on 8 October 2026. COSMIC, the system of 57 AI agents that runs the company. And an audit of 121 businesses near the University of Alabama. Client case studies with results go up only with the client's permission."
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
