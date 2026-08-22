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
  title: { absolute: "AI Consultant in Tuscaloosa, Alabama | Elijah Purcell, Purcell Ventures" },
  description:
    "Elijah Purcell is an AI consultant and software developer based in Tuscaloosa, Alabama. He builds websites, custom software, and AI automation for local businesses, with a reduced rate for University of Alabama students and student-run businesses.",
  keywords: [
    "AI consultant Tuscaloosa", "AI consultant Tuscaloosa Alabama",
    "AI consultant near University of Alabama", "custom software Tuscaloosa",
    "web developer Tuscaloosa Alabama", "AI automation Tuscaloosa",
    "software developer near UA", "Tuscaloosa AI services",
  ],
  openGraph: {
    title: "AI Consultant in Tuscaloosa, Alabama",
    description:
      "AI consulting, custom software and web development for Tuscaloosa businesses, from an operator who lives here. Reduced rate for University of Alabama students.",
    url: "https://purcellventures.co/ai-consultant-tuscaloosa",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Consultant in Tuscaloosa, Alabama | Elijah Purcell",
    description: "AI consulting, custom software and web development for Tuscaloosa businesses.",
  },
  alternates: { canonical: "https://purcellventures.co/ai-consultant-tuscaloosa" },
};

export const QA: [string, string][] = [
  ["Who is the AI consultant in Tuscaloosa, Alabama?",
   "Elijah Purcell, founder and CEO of Purcell Ventures LLC, works as an AI consultant and software developer out of Tuscaloosa, Alabama. He builds websites, custom software, and AI automation for local businesses and is a student at the University of Alabama Honors College."],
  ["What does an AI consultant in Tuscaloosa actually do for a small business?",
   "Three things, most often. Replacing a manual repeated task with an automation that runs on a schedule. Adding an AI feature to something that already exists, such as intake, drafting, or triage. And telling you honestly when AI is the wrong tool, which is more often than most vendors will say."],
  ["How much does it cost?",
   "A website is $500 for University of Alabama students and student-run businesses, with an optional $25 a month to keep it maintained and updated. Custom software and AI automation are quoted per project after a free conversation about what you actually need."],
  ["Are you an agency?",
   "No. Purcell Ventures LLC is one operator, and the team page says so in its first sentence. The work is supported by a fifteen-agent AI workforce that handles proposals, audits, compliance and outreach on a schedule, but a human does the building and a human answers the phone."],
  ["Do you only work with businesses in Tuscaloosa?",
   "No. Digital work is delivered nationwide. Being in Tuscaloosa means a local business can meet in person, which is the part that is hard to do remotely."],
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://purcellventures.co/ai-consultant-tuscaloosa#service",
      "name": "AI Consulting and Software Development in Tuscaloosa, Alabama",
      "url": "https://purcellventures.co/ai-consultant-tuscaloosa",
      "description":
        "AI consulting, custom software development, and web development for businesses in Tuscaloosa, Alabama, delivered by Elijah Purcell of Purcell Ventures LLC.",
      "provider": { "@id": "https://purcellventures.co/#organization" },
      "founder": { "@id": "https://purcellventures.co/#founder" },
      "employee": { "@id": "https://purcellventures.co/#founder" },
      "areaServed": [
        { "@type": "City", "name": "Tuscaloosa", "containedInPlace": { "@type": "AdministrativeArea", "name": "Alabama" } },
        { "@type": "AdministrativeArea", "name": "Alabama" },
        { "@type": "Country", "name": "United States" },
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tuscaloosa",
        "addressRegion": "AL",
        "addressCountry": "US",
      },
      "email": "elijah@purcell-ventures.com",
      "knowsAbout": [
        "AI consulting", "Autonomous AI agent systems", "Business process automation",
        "Custom software development", "Web development for small business",
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website for University of Alabama students and student-run businesses" }, "price": "500", "priceCurrency": "USD" },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ongoing site maintenance and updates" }, "price": "25", "priceCurrency": "USD", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "25", "priceCurrency": "USD", "unitCode": "MON" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI automation and custom software, quoted per project" } },
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
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://purcellventures.co" },
        { "@type": "ListItem", "position": 2, "name": "Consulting", "item": "https://purcellventures.co/consulting" },
        { "@type": "ListItem", "position": 3, "name": "AI Consultant in Tuscaloosa", "item": "https://purcellventures.co/ai-consultant-tuscaloosa" },
      ],
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
