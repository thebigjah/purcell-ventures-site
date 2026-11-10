import type { Metadata } from "next";
import type { ReactNode } from "react";

// CITY PAGE UNDER THE PILLAR /ai-consulting (9 Nov 2026), Georgia group.
//
// Written around what Acworth businesses do (Lake Acworth and Lake Allatoona, the marinas and
// rentals on them, downtown shops and restaurants, and the contractors and home service
// companies that follow a growing suburb). Elijah registered Purcell Ventures LLC in Acworth, a
// filing address, so the page says that and claims no office there. Delivery format
// comes from /consulting, /software and /ai-consulting only. No clients or results.

const URL = "https://purcellventures.co/ai-consulting/acworth-ga";

export const metadata: Metadata = {
  title: { absolute: "AI consulting in Acworth, Georgia, Purcell Ventures" },
  description:
    "AI consulting in Acworth, Georgia for contractors, home service companies, marinas, lake businesses and downtown shops. Training, automation and software.",
  keywords: [
    "AI consulting Acworth",
    "AI consultant Acworth Georgia",
    "AI training Acworth",
    "AI automation Acworth GA",
    "AI for contractors and home services",
    "AI for marinas and lake businesses",
  ],
  openGraph: {
    title: "AI consulting in Acworth, Georgia",
    description:
      "AI consulting in Acworth, Georgia for contractors, home service companies, marinas, lake businesses and downtown shops. Training, automation and software.",
    url: URL,
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI consulting in Acworth, Georgia: Purcell Ventures",
    description: "AI consulting in Acworth, Georgia for contractors, home service companies, marinas, lake businesses and downtown shops. Training, automation and software.",
  },
  alternates: { canonical: URL },
};

export const QA: [string, string][] = [
  ["Who offers AI consulting in Acworth, Georgia?",
   "Purcell Ventures LLC, run by Elijah Purcell, works with Acworth businesses on AI training, AI automation and custom software. Training sessions happen at your location, and planning and builds run over phone and email. The first conversation is free."],
  ["Is Purcell Ventures based in Acworth?",
   "Elijah registered Purcell Ventures LLC in Acworth, Georgia, and he runs it from Tuscaloosa, Alabama, where he attends the University of Alabama. The company has no office to visit in Acworth. Elijah comes to your location for training sessions, and the rest of the work runs by phone and email."],
  ["Can AI help a contractor follow up with leads?",
   "Yes. AI can draft replies to new leads, send follow-up messages and turn your notes from a site visit into a written quote for you to check. The price, the schedule and any promise about the work stay with the owner."],
  ["Can AI help a marina or rental business in the busy season?",
   "Yes. AI can draft answers to the questions that repeat every season, such as hours, rates, slips and what happens when the weather turns, and it can send booking confirmations. Safety and weather calls stay with a person."],
  ["How much does AI training cost for an Acworth business?",
   "Elijah quotes every job per business after a free call, because the price depends on the size of the team and how much of the work is training or building. Training comes as 1-on-1 sessions, small group training for 2 to 8 people or a half-day workshop for up to 20 people."],
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${URL}#service`,
      "name": "AI consulting in Acworth, Georgia",
      "url": URL,
      "description":
        "AI training, AI automation and custom software for businesses in Acworth, Georgia, delivered by Elijah Purcell of Purcell Ventures LLC from Tuscaloosa.",
      "provider": { "@id": "https://purcellventures.co/#organization" },
      "serviceType": "AI consulting",
      "areaServed": [
        { "@type": "City", "name": "Acworth", "containedInPlace": { "@type": "AdministrativeArea", "name": "Georgia" } },
        { "@type": "AdministrativeArea", "name": "Georgia" },
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
