import type { Metadata } from "next";
import type { ReactNode } from "react";

// CITY PAGE UNDER THE STATEWIDE PILLAR /ai-consulting (9 Nov 2026).
//
// Written around what Montgomery businesses do (state government and the firms around it, Maxwell AFB, and the automotive suppliers
// tied to the Hyundai plant),
// so the page answers a Montgomery owner's question instead of swapping a city name into
// the pillar. Delivery format comes from /consulting, /software and
// /ai-consulting only. No clients, results or Montgomery address, because the company
// has none there.

const URL = "https://purcellventures.co/ai-consulting/montgomery-al";

export const metadata: Metadata = {
  title: { absolute: "AI consulting in Montgomery, Alabama, Purcell Ventures" },
  description:
    "AI consulting in Montgomery, Alabama for firms working with state government, auto suppliers and businesses near Maxwell AFB. Training, automation, software.",
  keywords: [
    "AI consulting Montgomery",
    "AI consultant Montgomery Alabama",
    "AI training Montgomery",
    "AI automation Montgomery AL",
    "AI for automotive suppliers Alabama",
    "AI for government affairs firms",
  ],
  openGraph: {
    title: "AI consulting in Montgomery, Alabama",
    description:
      "AI consulting in Montgomery, Alabama for firms working with state government, auto suppliers and businesses near Maxwell AFB. Training, automation, software.",
    url: URL,
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI consulting in Montgomery, Alabama: Purcell Ventures",
    description: "AI consulting in Montgomery, Alabama for firms working with state government, auto suppliers and businesses near Maxwell AFB. Training, automation, software.",
  },
  alternates: { canonical: URL },
};

export const QA: [string, string][] = [
  ["Who offers AI consulting in Montgomery, Alabama?",
   "Purcell Ventures LLC, run by Elijah Purcell in Tuscaloosa, works with Montgomery businesses on AI training, AI automation and custom software. Training sessions happen at your office, and planning and builds run over phone and email. The first conversation is free."],
  ["Can AI track bills and agency rules for my firm or association?",
   "AI can summarize bills, rules and agency notices and flag the ones that touch the issues you follow. A person reads the source before anyone acts on a summary, because a summary can drop the one clause that matters."],
  ["Can an automotive supplier automate its paperwork?",
   "Often, yes. Order, shipping and quality data that someone retypes between a customer portal and your own system makes a good first automation. Anything that decides part quality or safety stays with your quality team."],
  ["How much does AI training cost for a Montgomery team?",
   "Elijah quotes each Montgomery business after a free call. The price depends on the number of people in the session, the tools your team already uses and any automation or software built afterward."],
  ["Does Purcell Ventures have an office in Montgomery?",
   "No. Purcell Ventures works from Tuscaloosa. Elijah comes to your office for training sessions, and the rest of the work runs by phone and email."],
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${URL}#service`,
      "name": "AI consulting in Montgomery, Alabama",
      "url": URL,
      "description":
        "AI training, AI automation and custom software for businesses in Montgomery, Alabama, delivered by Elijah Purcell of Purcell Ventures LLC from Tuscaloosa.",
      "provider": { "@id": "https://purcellventures.co/#organization" },
      "founder": { "@id": "https://elijahpurcell.com/#person" },
      "employee": { "@id": "https://elijahpurcell.com/#person" },
      "areaServed": [
        { "@type": "City", "name": "Montgomery", "containedInPlace": { "@type": "AdministrativeArea", "name": "Alabama" } },
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
        "Custom software development", "Document automation for manufacturing suppliers",
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
