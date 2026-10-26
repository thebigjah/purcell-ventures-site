import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "About Elijah Purcell, founder",
  description:
    "Elijah Purcell is the Founder/CEO of Purcell Ventures LLC, a Georgia company formed in April 2025 that builds websites, software and AI tools for local businesses, and a psychology and data science student at the University of Alabama Honors College in Tuscaloosa.",
  keywords: [
    "Elijah Purcell", "Elijah Purcell founder", "Purcell Ventures founder",
    "AI consultant Georgia", "entrepreneur Tuscaloosa Alabama", "Elijah Purcell entrepreneur",
    "Purcell Ventures LLC founder", "University of Alabama 2026", "Elijah Purcell bio",
  ],
  openGraph: {
    title: "About Elijah Purcell, Founder/CEO of Purcell Ventures LLC",
    description:
      "Elijah Purcell is the Founder/CEO of Purcell Ventures LLC, a Georgia company formed in April 2025 that builds websites, software and AI tools for local businesses, and a psychology and data science student at the University of Alabama Honors College in Tuscaloosa.",
    url: "https://purcellventures.co/about",
    type: "profile",
  
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Elijah Purcell, Founder/CEO, Purcell Ventures LLC",
    description: "Founder/CEO of Purcell Ventures LLC in Tuscaloosa, Alabama, and a University of Alabama Honors College student, Class of 2030.",
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
      "mainEntity": { "@id": "https://purcellventures.co/#founder" },
      "about": { "@id": "https://purcellventures.co/#founder" },
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
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who is Elijah Purcell?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Elijah Purcell is the Founder/CEO of Purcell Ventures LLC, a Georgia company formed in April 2025, control number 25075361, that builds websites, AI tools and custom software for small businesses. He runs it from Tuscaloosa, Alabama, where he studies psychology and data science at the University of Alabama Honors College, Class of 2030. He also founded Mantle Field Services, a sister brand for gutter cleaning, pressure washing and lawn care in metro Atlanta.",
          },
        },
        {
          "@type": "Question",
          "name": "What is Purcell Ventures LLC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Purcell Ventures LLC is a Georgia company that Elijah Purcell formed in April 2025. It has five active divisions: websites, digital add-ons for small businesses, AI consulting, custom software, and Steady, a personal IT service. A real estate division is planned. A sister brand, Mantle Field Services, handles gutter cleaning, pressure washing and lawn care in metro Atlanta.",
          },
        },
        {
          "@type": "Question",
          "name": "Where is Purcell Ventures located?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The LLC is registered in Acworth, Georgia, where it was formed. Elijah Purcell runs it from Tuscaloosa, Alabama, where he attends the University of Alabama. Websites, digital services, software and AI consulting are available nationwide. Sister brand Mantle Field Services serves metro Atlanta (Kennesaw, Marietta, Acworth, Canton and Woodstock) with gutter cleaning, pressure washing and lawn care.",
          },
        },
        {
          "@type": "Question",
          "name": "How can I contact Elijah Purcell?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `You can reach Elijah Purcell by email at ${CONTACT.email} or by phone at ${CONTACT.phone}. He replies within one business day.`,
          },
        },
      ],
    },
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
