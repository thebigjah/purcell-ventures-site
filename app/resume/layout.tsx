import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Elijah Purcell: Resume & Scholarship Record",
  keywords: [
    "Elijah Purcell", "Elijah Purcell resume", "Purcell Ventures founder",
    "University of Alabama 2026", "scholarship recipient", "high school entrepreneur",
  ],
  openGraph: {
    title: "Elijah Purcell: Resume & Scholarship Record",
    description:
      "Elijah Purcell is the founder of Purcell Ventures LLC and a psychology and data science student at the University of Alabama Honors College. Full record of shipped software, AI agent systems, client work, education and awards.",
    url: "https://purcellventures.co/resume",
    type: "profile",
  
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Elijah Purcell: Resume & Scholarship Record",
    description:
      "Elijah Purcell is the founder of Purcell Ventures LLC and a psychology and data science student at the University of Alabama Honors College. Full record of shipped software, AI agent systems, client work, education and awards.",
  },
  alternates: { canonical: "https://purcellventures.co/resume" },
};

// This was a bare Person re-stating the #founder node the root layout already renders
// on every page. Two effects, both bad. Google merges nodes sharing an @id, so the
// duplicate added no entity and only a second, thinner set of claims to reconcile. And
// because the page declared a Person rather than a ProfilePage, Search Console reported
// NO structured-data enhancement on /resume at all, while /about and /who both show
// "Profile page: 1 valid item". A resume IS a profile page, so it says so now, and it
// points at the one canonical Person instead of describing him a second time.
//
// The award line is not the lead. His rule, 20 Aug 2026: the scholarship total belongs
// on the college-application course page and nowhere else, because a number like that
// in a snippet says "impressive student" where the work says "ships software".
const schema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://purcellventures.co/resume",
  "url": "https://purcellventures.co/resume",
  "name": "Elijah Purcell — Resume",
  "description":
    "Professional resume for Elijah Purcell: founder of Purcell Ventures LLC, autonomous AI agent systems engineer, and psychology and data science student at the University of Alabama Honors College.",
  "mainEntity": { "@id": "https://purcellventures.co/#founder" },
  "about": { "@id": "https://purcellventures.co/#founder" },
  "publisher": { "@id": "https://purcellventures.co/#organization" },
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
      "name": "Resume",
      "item": "https://purcellventures.co/resume"
    }
  ]
};

export default function ResumeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
