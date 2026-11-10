import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About Elijah Purcell, founder",
  description:
    "Elijah Purcell is Founder/CEO of Purcell Ventures LLC, which builds AI systems and software for local businesses, and studies psychology and data science at UA.",
  keywords: [
    "Elijah Purcell", "Elijah Purcell founder", "Purcell Ventures founder",
    "AI consultant Georgia", "entrepreneur Tuscaloosa Alabama", "Elijah Purcell entrepreneur",
    "Purcell Ventures LLC founder", "University of Alabama 2026", "Elijah Purcell bio",
  ],
  openGraph: {
    title: "About Elijah Purcell, Founder/CEO of Purcell Ventures LLC",
    description:
      "Elijah Purcell is Founder/CEO of Purcell Ventures LLC, which builds AI systems and software for local businesses, and studies psychology and data science at UA.",
    url: "https://purcellventures.co/about",
    type: "profile",
  
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Elijah Purcell, Founder/CEO, Purcell Ventures LLC",
    description: "Founder/CEO of Purcell Ventures LLC in Tuscaloosa, Alabama, and a University of Alabama New College and Honors College student, Class of 2030.",
  },
  alternates: { canonical: "https://purcellventures.co/about" },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://purcellventures.co/about",
      "url": "https://purcellventures.co/about",
      "name": "About Elijah Purcell",
      "description": "Profile page for Elijah Purcell, Founder/CEO of Purcell Ventures LLC.",
      "mainEntity": { "@id": "https://elijahpurcell.com/#person" },
      "about": { "@id": "https://elijahpurcell.com/#person" },
      "publisher": { "@id": "https://purcellventures.co/#organization" },
    },
    // NO Person NODE HERE. The root layout declares the full Person under this same
    // @id and renders on every page, so re-stating it here did not add a second entity
    // to Google, it added CONTRADICTIONS to the one entity: this copy said Acworth GA
    // while the root said Tuscaloosa AL, and it said "Founder & CEO" while the root
    // said "Autonomous AI Agent Systems Engineer". It also attached Gutter Cleaning,
    // Pressure Washing and Lawn Care to him personally; those belong to Mantle Field
    // Services, not to his own expertise. The ProfilePage above already points at the
    // canonical Person via mainEntity/about, which is what a shared @id is for.
  ],
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
      "name": "About Elijah Purcell",
      "item": "https://purcellventures.co/about"
    }
  ]
};

export default function AboutLayout({ children }: { children: ReactNode }) {
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
