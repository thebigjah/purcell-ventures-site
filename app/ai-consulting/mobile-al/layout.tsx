import type { Metadata } from "next";
import type { ReactNode } from "react";

// CITY PAGE UNDER THE STATEWIDE PILLAR /ai-consulting (9 Nov 2026).
//
// Written around what Mobile businesses do (the port, freight forwarders and customs brokers, shipbuilding and aircraft assembly,
// and Gulf tourism),
// so the page answers a Mobile owner's question instead of swapping a city name into
// the pillar. Delivery format comes from /consulting, /software and
// /ai-consulting only. No clients, results or Mobile address, because the company
// has none there.

const URL = "https://purcellventures.co/ai-consulting/mobile-al";

export const metadata: Metadata = {
  title: { absolute: "AI consulting in Mobile, Alabama, Purcell Ventures" },
  description:
    "AI consulting in Mobile, Alabama for freight forwarders, logistics firms, marine contractors, hotels and rentals. Training, automation and custom software.",
  keywords: [
    "AI consulting Mobile",
    "AI consultant Mobile Alabama",
    "AI training Mobile AL",
    "AI automation Mobile AL",
    "AI for logistics companies Alabama",
    "AI for vacation rentals Gulf Coast",
  ],
  openGraph: {
    title: "AI consulting in Mobile, Alabama",
    description:
      "AI consulting in Mobile, Alabama for freight forwarders, logistics firms, marine contractors, hotels and rentals. Training, automation and custom software.",
    url: URL,
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI consulting in Mobile, Alabama: Purcell Ventures",
    description: "AI consulting in Mobile, Alabama for freight forwarders, logistics firms, marine contractors, hotels and rentals. Training, automation and custom software.",
  },
  alternates: { canonical: URL },
};

export const QA: [string, string][] = [
  ["Who offers AI consulting in Mobile, Alabama?",
   "Purcell Ventures LLC, run by Elijah Purcell in Tuscaloosa, works with Mobile businesses on AI training, AI automation and custom software. Training sessions happen at your office, and planning and builds run over phone and email. The first conversation is free."],
  ["Can AI help a freight forwarder or customs broker?",
   "Yes, with the typing. An automation can pull the same fields from bills of lading, commercial invoices and packing lists into your own system. A licensed broker or trained staff member checks each record before anything goes to customs."],
  ["Can a hotel or beach rental use AI to answer guests?",
   "Yes, for the questions guests ask every day about check-in, parking, pets and cancellations. A person handles complaints, refunds and any guest who is upset."],
  ["How much does AI training cost for a Mobile team?",
   "Elijah quotes each Mobile business after a free call. The price depends on the number of people in the session, the tools your team already uses and any automation or software built afterward."],
  ["Will you come to Mobile for training?",
   "Yes. Training sessions run at your location, with examples from your own business. Standard sessions need one to two weeks of notice, and planning and builds run over phone and email."],
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${URL}#service`,
      "name": "AI consulting in Mobile, Alabama",
      "url": URL,
      "description":
        "AI training, AI automation and custom software for businesses in Mobile, Alabama, delivered by Elijah Purcell of Purcell Ventures LLC from Tuscaloosa.",
      "provider": { "@id": "https://purcellventures.co/#organization" },
      "serviceType": "AI consulting",
      "areaServed": [
        { "@type": "City", "name": "Mobile", "containedInPlace": { "@type": "AdministrativeArea", "name": "Alabama" } },
        { "@type": "AdministrativeArea", "name": "Alabama" },
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
