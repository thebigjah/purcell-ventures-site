import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Elijah Purcell, portfolio",
  description:
    "Elijah Purcell, founder of Purcell Ventures and a University of Alabama student, lists what he has built, including Rufus on the App Store, AI work and honors.",
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

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      {children}
    </>
  );
}
