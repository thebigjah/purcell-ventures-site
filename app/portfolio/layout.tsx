import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Elijah Purcell, portfolio",
  description:
    "Elijah Purcell, Founder/CEO of Purcell Ventures LLC and a University of Alabama Honors College student: Rufus on the App Store, honors, AI work, faith and service, and everything else he has built.",
  keywords: [
    "purcell ventures portfolio", "shipped projects", "next.js web apps",
    "expo mobile apps", "ai tools built", "Tuscaloosa software developer",
  ],
  openGraph: {
    title: "Elijah Purcell, portfolio",
    description: "Rufus on the App Store, honors and recognition, AI work, and everything else Elijah Purcell has built.",
    url: "https://purcellventures.co/portfolio",
    type: "website",
  
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "/portfolio" },
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
      "name": "Portfolio",
      "item": "https://purcellventures.co/portfolio"
    }
  ]
};
const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What has Elijah Purcell built?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "My lead project is Rufus Rideshare, an iPhone app a Georgia College & State University student commissioned, which Apple approved for the App Store in October 2026. I also built UA Today, an unofficial University of Alabama events page, Returns Void, a prayer ledger, and more than forty free tools and games, and I am founding Yellowhammer Society: Innovators in AI at The University of Alabama."
      }
    }
  ]
};

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />
      {children}
    </>
  );
}
