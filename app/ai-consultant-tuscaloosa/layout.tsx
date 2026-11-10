import type { Metadata } from "next";
import type { ReactNode } from "react";

// THE COMMERCIAL-INTENT PAGE THE SITE DID NOT HAVE.
//
// Measured 21 Aug 2026: asked "I need an AI consultant in Tuscaloosa, Alabama, who should
// I contact", three separate answer engines named Agent Architects, Larry Lane at
// Advisably, Musketeers Tech and Mindcore. purcellventures.co appeared in none of them.
// This is the highest commercial-intent query he has and he was absent from it.
//
// The site already said "Tuscaloosa" in a dozen places, so the geography was never the
// problem. What was missing is a page whose SUBJECT is the transaction. /consulting is
// national and never names the city; /ai-at-alabama is an academic guide with zero
// occurrences of "hire", "consultant", "services" or "pricing". Every competitor that
// beats him has a city-specific URL doing exactly this job:
// agentarchitects.io/tuscaloosa-al-ai-agency, advisably.ai/consultants/larry-lane-tuscaloosa,
// mind-core.com/locations/tuscaloosa-al.
//
// Everything asserted here is true and checkable. The 29 tools were verified returning 200
// on 21 Aug. UA Today's event counts come from its own live API. No claim of being the
// "leading" or "top" anything, because that is the one sentence a competitor or a
// professor could disprove, and it would cost more than the ranking is worth.

export const metadata: Metadata = {
  title: { absolute: "AI consultant in Tuscaloosa, Alabama, Purcell Ventures" },
  description:
    "AI consultant in Tuscaloosa, Alabama. Elijah Purcell builds AI systems, automation, custom software and websites for local businesses, quoted after a free call.",
  keywords: [
    "AI consultant Tuscaloosa", "AI consultant Tuscaloosa Alabama",
    "AI consultant near University of Alabama", "custom software Tuscaloosa",
    "web developer Tuscaloosa Alabama", "AI automation Tuscaloosa",
    "software developer near UA", "Tuscaloosa AI services",
  ],
  openGraph: {
    title: "AI consultant in Tuscaloosa, Alabama",
    description:
      "AI consulting, custom software and web development for Tuscaloosa businesses, from a developer who lives in Tuscaloosa. Every project is quoted after a free call.",
    url: "https://purcellventures.co/ai-consultant-tuscaloosa",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI consultant in Tuscaloosa, Alabama: Elijah Purcell",
    description: "AI consulting, custom software and web development for Tuscaloosa businesses.",
  },
  alternates: { canonical: "https://purcellventures.co/ai-consultant-tuscaloosa" },
};

export const QA: [string, string][] = [
  ["Who is the AI consultant in Tuscaloosa, Alabama?",
   "Elijah Purcell, Founder/CEO of Purcell Ventures LLC, works as an AI consultant and software developer out of Tuscaloosa, Alabama. He builds AI systems, AI automation, custom software and websites for local businesses and is a student at the University of Alabama, in New College and the Honors College."],
  ["What does an AI consultant in Tuscaloosa do for a small business?",
   "Three things come up most: replacing a repeated manual task with an automation that runs on a schedule, adding an AI feature such as intake, drafting or triage to software you already have, and telling you when AI is the wrong tool."],
  ["How much does it cost?",
   "Pricing is quoted per business. I quote websites, custom software and AI automation after a free conversation about what you need."],
  ["Are you an agency?",
   "No. Purcell Ventures LLC is one person, me. COSMIC, a station of 57 AI agents in 17 rooms that I built, handles proposals, site audits, security checks, research and outreach. I do the building and I answer the phone myself."],
  ["Do you only work with businesses in Tuscaloosa?",
   "No. I do digital work for businesses anywhere in the US. Businesses in Tuscaloosa can also meet with me in person."],
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://purcellventures.co/ai-consultant-tuscaloosa#service",
      "name": "AI consulting and software development in Tuscaloosa, Alabama",
      "url": "https://purcellventures.co/ai-consultant-tuscaloosa",
      "description":
        "AI consulting, custom software development, and web development for businesses in Tuscaloosa, Alabama, delivered by Elijah Purcell of Purcell Ventures LLC.",
      "provider": { "@id": "https://purcellventures.co/#organization" },
      "serviceType": "AI consulting",
      "areaServed": [
        { "@type": "City", "name": "Tuscaloosa", "containedInPlace": { "@type": "AdministrativeArea", "name": "Alabama" } },
        { "@type": "AdministrativeArea", "name": "Alabama" },
        { "@type": "Country", "name": "United States" },
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Websites for local businesses and student-run businesses" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ongoing site maintenance and updates" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI automation and custom software" } },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://purcellventures.co/ai-consultant-tuscaloosa#faq",
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
