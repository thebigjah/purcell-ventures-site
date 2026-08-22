import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About Elijah Purcell | Founder of Purcell Ventures LLC",
  description:
    "Elijah Purcell is the founder of Purcell Ventures LLC, a Georgia software company building sites, software and AI tooling for local businesses, and a psychology and data science student at the University of Alabama Honors College in Tuscaloosa.",
  keywords: [
    "Elijah Purcell", "Elijah Purcell founder", "Purcell Ventures founder",
    "AI consultant Georgia", "entrepreneur Tuscaloosa Alabama", "Elijah Purcell entrepreneur",
    "Purcell Ventures LLC founder", "University of Alabama 2026", "Elijah Purcell bio",
  ],
  openGraph: {
    title: "About Elijah Purcell: Founder of Purcell Ventures LLC",
    description:
      "Elijah Purcell is the founder of Purcell Ventures LLC, a Georgia software company building sites, software and AI tooling for local businesses, and a psychology and data science student at the University of Alabama Honors College in Tuscaloosa.",
    url: "https://purcellventures.co/about",
    type: "profile",
  
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Elijah Purcell: Founder, Purcell Ventures LLC",
    description: "Entrepreneur, AI consultant, software developer. Tuscaloosa, Alabama. University of Alabama Honors College, Class of 2030.",
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
      "description": "Profile page for Elijah Purcell, Founder and CEO of Purcell Ventures LLC.",
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
            "text": "Elijah Purcell is an entrepreneur, AI consultant, and software developer based in Tuscaloosa, Alabama. He is the founder and CEO of Purcell Ventures LLC, a multi-division company offering digital services, AI consulting, and custom software development. He also founded Mantle Field Services, a sister brand handling owner-operated gutter cleaning, pressure washing, and lawn care in Metro Atlanta. He is a student at the University of Alabama Honors College, having enrolled in Fall 2026.",
          },
        },
        {
          "@type": "Question",
          "name": "What is Purcell Ventures LLC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Purcell Ventures LLC is a Georgia-based multi-division company founded by Elijah Purcell. Its divisions include: Digital Services (websites, AI tools, CRM, booking systems for small businesses), AI Consulting (hands-on team training and workshops), and Custom Software Development (mobile apps, web apps, AI integrations). A sister brand, Mantle Field Services, handles owner-operated gutter cleaning, pressure washing, and lawn care in Metro Atlanta.",
          },
        },
        {
          "@type": "Question",
          "name": "Where is Purcell Ventures located?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The LLC is registered in Acworth, Georgia, where it was formed, and it is operated from Tuscaloosa, Alabama, where its founder Elijah Purcell attends the University of Alabama. Digital services and AI consulting are available nationwide. Sister brand Mantle Field Services serves the Metro Atlanta area (Kennesaw, Marietta, Acworth, Canton, Woodstock) with gutter cleaning, pressure washing, and lawn care.",
          },
        },
        {
          "@type": "Question",
          "name": "How can I contact Elijah Purcell?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can reach Elijah Purcell by email at elijah@purcell-ventures.com or by phone at (205) 462-7839.",
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
