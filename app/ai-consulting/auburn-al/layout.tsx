import type { Metadata } from "next";
import type { ReactNode } from "react";

// CITY PAGE UNDER THE STATEWIDE PILLAR /ai-consulting (9 Nov 2026).
//
// Written around what Auburn businesses do (Auburn University, the semester and football calendar, student housing, and the
// restaurants and shops downtown),
// so the page answers a Auburn owner's question instead of swapping a city name into
// the pillar. Delivery format comes from /consulting, /software and
// /ai-consulting only. No clients, results or Auburn address, because the company
// has none there.

const URL = "https://purcellventures.co/ai-consulting/auburn-al";

export const metadata: Metadata = {
  title: { absolute: "AI consulting in Auburn, Alabama, Purcell Ventures" },
  description:
    "AI consulting in Auburn, Alabama for restaurants, shops, student housing and young founders. Training, automation and custom software, quoted per business.",
  keywords: [
    "AI consulting Auburn",
    "AI consultant Auburn Alabama",
    "AI training Auburn AL",
    "AI automation Auburn AL",
    "AI for student housing",
    "AI for restaurants Auburn",
  ],
  openGraph: {
    title: "AI consulting in Auburn, Alabama",
    description:
      "AI consulting in Auburn, Alabama for restaurants, shops, student housing and young founders. Training, automation and custom software, quoted per business.",
    url: URL,
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI consulting in Auburn, Alabama: Purcell Ventures",
    description: "AI consulting in Auburn, Alabama for restaurants, shops, student housing and young founders. Training, automation and custom software, quoted per business.",
  },
  alternates: { canonical: URL },
};

export const QA: [string, string][] = [
  ["Who offers AI consulting in Auburn, Alabama?",
   "Purcell Ventures LLC, run by Elijah Purcell in Tuscaloosa, works with Auburn businesses on AI training, AI automation and custom software. Training sessions happen at your location, and planning and builds run over phone and email. The first conversation is free."],
  ["Can AI answer leasing questions for student housing?",
   "Yes, for the questions every leasing office hears each move-in season: dates, parking, pets, subleases and what the lease covers. Staff handle lease decisions, deposit disputes and any resident who is upset."],
  ["Can a restaurant use AI to get ready for a home football weekend?",
   "AI can draft the posts with game-day hours and specials, a staff schedule for the rush and replies to the reviews that come after. A manager checks the schedule and the hours before anything goes out."],
  ["How much does AI training cost for an Auburn business?",
   "Elijah quotes each Auburn business after a free call. The price depends on the number of people in the session, the tools your team already uses and any automation or software built afterward."],
  ["Does Purcell Ventures have an office in Auburn?",
   "No. Purcell Ventures works from Tuscaloosa. Elijah comes to your business for training sessions, and the rest of the work runs by phone and email."],
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${URL}#service`,
      "name": "AI consulting in Auburn, Alabama",
      "url": URL,
      "description":
        "AI training, AI automation and custom software for businesses in Auburn, Alabama, delivered by Elijah Purcell of Purcell Ventures LLC from Tuscaloosa.",
      "provider": { "@id": "https://purcellventures.co/#organization" },
      "founder": { "@id": "https://elijahpurcell.com/#person" },
      "employee": { "@id": "https://elijahpurcell.com/#person" },
      "areaServed": [
        { "@type": "City", "name": "Auburn", "containedInPlace": { "@type": "AdministrativeArea", "name": "Alabama" } },
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
        "Custom software development", "AI for seasonal small businesses",
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
