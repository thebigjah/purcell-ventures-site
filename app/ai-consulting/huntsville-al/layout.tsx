import type { Metadata } from "next";
import type { ReactNode } from "react";

// CITY PAGE UNDER THE STATEWIDE PILLAR /ai-consulting (9 Nov 2026).
//
// Written around what Huntsville businesses do (aerospace and defense around Redstone Arsenal and Cummings Research Park, proposal
// work, subcontractors and staffing firms),
// so the page answers a Huntsville owner's question instead of swapping a city name into
// the pillar. Delivery format comes from /consulting, /software and
// /ai-consulting only. No clients, results or Huntsville address, because the company
// has none there.

const URL = "https://purcellventures.co/ai-consulting/huntsville-al";

export const metadata: Metadata = {
  title: { absolute: "AI consulting in Huntsville, Alabama, Purcell Ventures" },
  description:
    "AI consulting in Huntsville, Alabama for defense contractors, engineering firms and staffing companies. Training, automation, software and data rules.",
  keywords: [
    "AI consulting Huntsville",
    "AI consultant Huntsville Alabama",
    "AI training Huntsville",
    "AI automation Huntsville AL",
    "AI for defense contractors Huntsville",
    "AI for government proposals",
  ],
  openGraph: {
    title: "AI consulting in Huntsville, Alabama",
    description:
      "AI consulting in Huntsville, Alabama for defense contractors, engineering firms and staffing companies. Training, automation, software and data rules.",
    url: URL,
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI consulting in Huntsville, Alabama: Purcell Ventures",
    description: "AI consulting in Huntsville, Alabama for defense contractors, engineering firms and staffing companies. Training, automation, software and data rules.",
  },
  alternates: { canonical: URL },
};

export const QA: [string, string][] = [
  ["Who offers AI consulting in Huntsville, Alabama?",
   "Purcell Ventures LLC, run by Elijah Purcell in Tuscaloosa, works with Huntsville businesses on AI training, AI automation and custom software. Training sessions happen at your office, and planning and builds run over phone and email. The first conversation is free."],
  ["Can defense contractors use ChatGPT or Claude?",
   "For some work. Controlled, classified and export-controlled information stays out of general AI tools, and your contract and security officer set that line. Work with no restricted data, such as job postings, marketing copy and internal meeting notes, makes the usual place to start."],
  ["Can AI write a government proposal?",
   "AI can summarize a solicitation, build a compliance checklist from it and draft standard sections from your own approved past text. A person writes the technical approach and checks every requirement against the solicitation, because one missed requirement can cost the bid."],
  ["How much does AI training cost for a Huntsville team?",
   "Elijah quotes each Huntsville business after a free call. The price depends on the number of people in the session, the tools your team already uses and any automation or software built afterward."],
  ["Does Purcell Ventures have an office in Huntsville?",
   "No. Purcell Ventures works from Tuscaloosa. Elijah comes to your office for training sessions, and the rest of the work runs by phone and email."],
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${URL}#service`,
      "name": "AI consulting in Huntsville, Alabama",
      "url": URL,
      "description":
        "AI training, AI automation and custom software for businesses in Huntsville, Alabama, delivered by Elijah Purcell of Purcell Ventures LLC from Tuscaloosa.",
      "provider": { "@id": "https://purcellventures.co/#organization" },
      "founder": { "@id": "https://elijahpurcell.com/#person" },
      "employee": { "@id": "https://elijahpurcell.com/#person" },
      "areaServed": [
        { "@type": "City", "name": "Huntsville", "containedInPlace": { "@type": "AdministrativeArea", "name": "Alabama" } },
        { "@type": "AdministrativeArea", "name": "Alabama" },
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tuscaloosa",
        "addressRegion": "AL",
        "addressCountry": "US",
      },
      "email": "elijah@purcellventures.co",
      "knowsAbout": [
        "AI consulting", "AI training for teams", "Business process automation",
        "Custom software development", "AI use with contract data restrictions",
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AI consulting services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "1-on-1 AI consulting" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Small group AI training, 2 to 8 people" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Half-day AI workshop for up to 20 people" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom software project" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI automation, quoted per project" } },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${URL}#faq`,
      "mainEntity": QA.map(([q, a]) => ({
        "@type": "Question",
        "name": q,
        "acceptedAnswer": { "@type": "Answer", "text": a },
      })),
    },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
