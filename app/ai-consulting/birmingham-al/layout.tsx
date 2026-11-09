import type { Metadata } from "next";
import type { ReactNode } from "react";

// CITY PAGE UNDER THE STATEWIDE PILLAR /ai-consulting (9 Nov 2026).
//
// Written around what Birmingham businesses do (healthcare around UAB, banking, law,
// accounting and engineering firms), so the page answers a Birmingham owner's question
// instead of swapping a city name into the pillar. Prices and delivery format come from
// /consulting, /software and /ai-consulting only. No clients, results or Birmingham
// address, because the company has none there.

const URL = "https://purcellventures.co/ai-consulting/birmingham-al";

export const metadata: Metadata = {
  title: { absolute: "AI consulting in Birmingham, Alabama, Purcell Ventures" },
  description:
    "AI training, automation and custom software for Birmingham medical practices, law and accounting firms, banks and engineering offices, from Elijah Purcell in Tuscaloosa. Prices and how it works.",
  keywords: [
    "AI consulting Birmingham", "AI consultant Birmingham Alabama", "AI training Birmingham",
    "AI automation Birmingham AL", "AI for medical practices Birmingham", "AI for law firms Birmingham",
  ],
  openGraph: {
    title: "AI consulting in Birmingham, Alabama",
    description:
      "AI training, automation and custom software for Birmingham businesses, with prices, from Elijah Purcell of Purcell Ventures.",
    url: URL,
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI consulting in Birmingham, Alabama: Purcell Ventures",
    description: "AI training, automation and custom software for Birmingham businesses.",
  },
  alternates: { canonical: URL },
};

export const QA: [string, string][] = [
  ["Who offers AI consulting in Birmingham, Alabama?",
   "Purcell Ventures LLC, run by Elijah Purcell in Tuscaloosa, works with Birmingham businesses on AI training, AI automation and custom software. Training sessions happen at your office, and planning and builds run over phone and email. The first conversation is free."],
  ["Can AI help a medical practice in Birmingham?",
   "Yes, on the front-desk side: appointment reminders, answers to the questions staff hear every day, and sorting incoming requests so urgent ones reach a person first. Clinical decisions and patient records stay with your staff and the systems your practice already uses for them."],
  ["Can a law or accounting firm use ChatGPT on client work?",
   "With care. Check the data and training settings of the plan your firm uses before any client information goes in, and have a licensed person review every draft before it leaves the office. Work that holds no client data, such as internal memos and marketing copy, makes the safest first step."],
  ["How much does AI training cost for a Birmingham team?",
   "1-on-1 consulting costs $175 an hour, small group training costs $125 a person for 2 to 8 people, and a half-day workshop costs $2,500 flat for up to 20 people. Small software projects run $1,500 to $3,500, and Elijah quotes automation per project after a free conversation."],
  ["Does Purcell Ventures have an office in Birmingham?",
   "No. Purcell Ventures works from Tuscaloosa. Elijah comes to your office for training sessions, and the rest of the work runs by phone and email."],
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${URL}#service`,
      "name": "AI consulting in Birmingham, Alabama",
      "url": URL,
      "description":
        "AI training, AI automation and custom software for businesses in Birmingham, Alabama, delivered by Elijah Purcell of Purcell Ventures LLC from Tuscaloosa.",
      "provider": { "@id": "https://purcellventures.co/#organization" },
      "founder": { "@id": "https://purcellventures.co/#founder" },
      "employee": { "@id": "https://purcellventures.co/#founder" },
      "areaServed": [
        { "@type": "City", "name": "Birmingham", "containedInPlace": { "@type": "AdministrativeArea", "name": "Alabama" } },
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
        "Custom software development", "AI data handling for professional services",
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AI consulting services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "1-on-1 AI consulting" }, "priceSpecification": { "@type": "UnitPriceSpecification", "price": "175", "priceCurrency": "USD", "unitCode": "HUR" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Small group AI training, 2 to 8 people" }, "priceSpecification": { "@type": "UnitPriceSpecification", "price": "125", "priceCurrency": "USD", "unitText": "per person" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Half-day AI workshop for up to 20 people" }, "price": "2500", "priceCurrency": "USD" },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Small custom software project" }, "priceSpecification": { "@type": "PriceSpecification", "minPrice": "1500", "maxPrice": "3500", "priceCurrency": "USD" } },
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
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://purcellventures.co" },
        { "@type": "ListItem", "position": 2, "name": "AI consulting", "item": "https://purcellventures.co/ai-consulting" },
        { "@type": "ListItem", "position": 3, "name": "Birmingham", "item": URL },
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
