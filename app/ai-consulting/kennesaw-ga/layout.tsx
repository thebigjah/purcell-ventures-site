import type { Metadata } from "next";
import type { ReactNode } from "react";

// CITY PAGE UNDER THE PILLAR /ai-consulting (9 Nov 2026), first of the Georgia group.
//
// Written around what Kennesaw businesses do (Kennesaw State University and its students and
// founders, retail along Barrett Parkway and Town Center, small manufacturers and distributors
// along I-75), so the page answers a Kennesaw owner's question instead of swapping a city name
// into the pillar. Elijah grew up in Kennesaw (elijahpurcell.com/about says so). Delivery
// format comes from /consulting, /software and /ai-consulting only. No prices, since all work
// is quoted per business after a free call. No clients, results or Kennesaw address, because
// the company has none there.

const URL = "https://purcellventures.co/ai-consulting/kennesaw-ga";

export const metadata: Metadata = {
  title: { absolute: "AI consulting in Kennesaw, Georgia, Purcell Ventures" },
  description:
    "AI consulting in Kennesaw, Georgia for shops, small manufacturers, distributors and Kennesaw State founders. Training, automation and custom software.",
  keywords: [
    "AI consulting Kennesaw",
    "AI consultant Kennesaw Georgia",
    "AI training Kennesaw",
    "AI automation Kennesaw GA",
    "AI for small manufacturers Cobb County",
    "AI for student founders Kennesaw State",
  ],
  openGraph: {
    title: "AI consulting in Kennesaw, Georgia",
    description:
      "AI consulting in Kennesaw, Georgia for shops, small manufacturers, distributors and Kennesaw State founders. Training, automation and custom software.",
    url: URL,
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI consulting in Kennesaw, Georgia: Purcell Ventures",
    description: "AI consulting in Kennesaw, Georgia for shops, small manufacturers, distributors and Kennesaw State founders. Training, automation and custom software.",
  },
  alternates: { canonical: URL },
};

export const QA: [string, string][] = [
  ["Who offers AI consulting in Kennesaw, Georgia?",
   "Purcell Ventures LLC, run by Elijah Purcell, works with Kennesaw businesses on AI training, AI automation and custom software. Elijah grew up in Kennesaw and runs the company from Tuscaloosa, Alabama. Training sessions happen at your location, and planning and builds run over phone and email. The first conversation is free."],
  ["Can AI help a small manufacturer?",
   "Yes, with the office work around production. AI can draft quotes from your past jobs, turn emailed purchase orders into entries in your order system and answer routine customer questions. The final price on a quote and every quality or safety sign-off stay with a person."],
  ["What can AI do for a student founder at Kennesaw State?",
   "AI can draft the emails, quotes, posts and research a founder writes alone, and a 1-on-1 session shows which tools fit the business. When the company needs its own software, Elijah can build a first version, quoted after a free call."],
  ["How much does AI training cost for a Kennesaw team?",
   "Elijah quotes every job per business after a free call, because the price depends on the size of the team and how much of the work is training or building. Training comes as 1-on-1 sessions, small group training for 2 to 8 people or a half-day workshop for up to 20 people."],
  ["Does Purcell Ventures have an office in Kennesaw?",
   "No. Purcell Ventures works from Tuscaloosa, Alabama, and the LLC is registered in Acworth, Georgia. Elijah comes to your location for training sessions, and the rest of the work runs by phone and email."],
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${URL}#service`,
      "name": "AI consulting in Kennesaw, Georgia",
      "url": URL,
      "description":
        "AI training, AI automation and custom software for businesses in Kennesaw, Georgia, delivered by Elijah Purcell of Purcell Ventures LLC from Tuscaloosa.",
      "provider": { "@id": "https://purcellventures.co/#organization" },
      "founder": { "@id": "https://purcellventures.co/#founder" },
      "employee": { "@id": "https://purcellventures.co/#founder" },
      "areaServed": [
        { "@type": "City", "name": "Kennesaw", "containedInPlace": { "@type": "AdministrativeArea", "name": "Georgia" } },
        { "@type": "AdministrativeArea", "name": "Georgia" },
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
        "Custom software development", "AI for retail and small manufacturing",
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
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://purcellventures.co" },
        { "@type": "ListItem", "position": 2, "name": "AI consulting", "item": "https://purcellventures.co/ai-consulting" },
        { "@type": "ListItem", "position": 3, "name": "Kennesaw", "item": URL },
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
