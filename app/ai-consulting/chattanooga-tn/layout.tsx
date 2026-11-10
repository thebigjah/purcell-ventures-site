import type { Metadata } from "next";
import type { ReactNode } from "react";

// CITY PAGE UNDER THE PILLAR /ai-consulting (9 Nov 2026), Tennessee group.
//
// Search Console showed "ai consulting chattanooga" and "ai consultant chattanooga" earning
// impressions with no page aimed at them. Written around what Chattanooga businesses do (EPB's
// citywide fiber network, the startups around the Edney Innovation Center and the Company Lab,
// the Volkswagen plant and the suppliers and freight firms along I-75 and I-24, tourism around
// the Tennessee Aquarium and Lookout Mountain, and Erlanger and the medical offices near it).
// Delivery format comes from /consulting, /software and /ai-consulting only. No
// clients, results or Chattanooga address, because the company has none there.

const URL = "https://purcellventures.co/ai-consulting/chattanooga-tn";

export const metadata: Metadata = {
  title: { absolute: "AI consulting in Chattanooga, Tennessee, Purcell Ventures" },
  description:
    "AI consulting in Chattanooga, Tennessee for startups, manufacturers, suppliers, logistics firms, hotels and medical offices. Training, automation and software.",
  keywords: [
    "AI consulting Chattanooga",
    "AI consultant Chattanooga",
    "AI consultant Chattanooga Tennessee",
    "AI training Chattanooga",
    "AI automation Chattanooga TN",
    "AI for startups Chattanooga",
  ],
  openGraph: {
    title: "AI consulting in Chattanooga, Tennessee",
    description:
      "AI consulting in Chattanooga, Tennessee for startups, manufacturers, suppliers, logistics firms, hotels and medical offices. Training, automation and software.",
    url: URL,
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI consulting in Chattanooga, Tennessee: Purcell Ventures",
    description: "AI consulting in Chattanooga, Tennessee for startups, manufacturers, suppliers, logistics firms, hotels and medical offices. Training, automation and software.",
  },
  alternates: { canonical: URL },
};

export const QA: [string, string][] = [
  ["Who offers AI consulting in Chattanooga, Tennessee?",
   "Purcell Ventures LLC, run by Elijah Purcell in Tuscaloosa, Alabama, works with Chattanooga businesses on AI training, AI automation and custom software. Training sessions happen at your location, and planning and builds run over phone and email. The first conversation is free."],
  ["Can AI help a manufacturing supplier?",
   "Yes, with the office work around production. AI can turn emailed purchase orders and shipping notices into entries in your order system, draft quotes from your past jobs and answer routine customer questions. Quality and safety sign-offs and anything a customer contract restricts stay with a person."],
  ["What can AI do for a Chattanooga startup?",
   "AI can draft the emails, posts, research and support answers a small founding team writes every week, and a 1-on-1 session shows which tools fit the company. When the startup needs its own software, Elijah quotes the build after a free call."],
  ["How much does AI training cost for a Chattanooga team?",
   "Elijah quotes every job per business after a free call, because the price depends on the size of the team and how much of the work is training or building. Training comes as 1-on-1 sessions, small group training for 2 to 8 people or a half-day workshop for up to 20 people."],
  ["Does Purcell Ventures have an office in Chattanooga?",
   "No. Purcell Ventures works from Tuscaloosa, Alabama. Elijah comes to your location for training sessions, and the rest of the work runs by phone and email."],
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${URL}#service`,
      "name": "AI consulting in Chattanooga, Tennessee",
      "url": URL,
      "description":
        "AI training, AI automation and custom software for businesses in Chattanooga, Tennessee, delivered by Elijah Purcell of Purcell Ventures LLC from Tuscaloosa.",
      "provider": { "@id": "https://purcellventures.co/#organization" },
      "founder": { "@id": "https://elijahpurcell.com/#person" },
      "employee": { "@id": "https://elijahpurcell.com/#person" },
      "areaServed": [
        { "@type": "City", "name": "Chattanooga", "containedInPlace": { "@type": "AdministrativeArea", "name": "Tennessee" } },
        { "@type": "AdministrativeArea", "name": "Tennessee" },
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
        "Custom software development", "AI for manufacturing suppliers and logistics",
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AI consulting services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "1-on-1 AI consulting, quoted per business" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Small group AI training, 2 to 8 people, quoted per business" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Half-day AI workshop for up to 20 people, quoted per business" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom software, quoted per project" } },
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
