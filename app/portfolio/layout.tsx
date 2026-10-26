import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Portfolio of shipped software and AI projects",
  description:
    "17 projects Elijah Purcell built and maintains: web apps in Next.js and React, a mobile app in Expo, AI tools and internal automation in Python.",
  keywords: [
    "purcell ventures portfolio", "shipped projects", "next.js web apps",
    "expo mobile apps", "ai tools built", "Tuscaloosa software developer",
  ],
  openGraph: {
    title: "Portfolio of shipped software and AI projects",
    description: "17 projects: web apps, a mobile app, AI tools and internal systems.",
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
        "text": "I have built 17 projects. They include UA Today, a University of Alabama events feed built from six sources, English Pruitt Photography, a paid client site I found through cold outreach, The Loom, a lead-generation crawler that runs on a schedule, and Boyfriend Camera, which runs computer vision on the phone. Each live project has a link to the working product."
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
