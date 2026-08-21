import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Elijah Purcell's Portfolio: Shipped Software and AI Projects",
  description:
    "10 live products, mobile apps, AI tools, and internal systems we've built. Web apps in Next.js + React, native mobile in Expo, automation pipelines in Python. Everything ships, everything's used.",
  keywords: [
    "purcell ventures portfolio", "shipped projects", "next.js web apps",
    "expo mobile apps", "ai tools built", "Atlanta software developer",
  ],
  openGraph: {
    title: "Portfolio: what we've built at Purcell Ventures",
    description: "10 live products: web apps, mobile apps, AI tools, internal systems. Real shipped work.",
    url: "https://purcellventures.co/portfolio",
    type: "website",
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
        "text": "Live, working products including UA Today, a campus events service for the University of Alabama aggregating six sources; English Pruitt Photography, paid client work sourced through cold outreach; The Loom, an autonomous lead-generation crawler; and Boyfriend Camera, which runs computer vision on the device. Every entry on the portfolio page links to something that loads."
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
