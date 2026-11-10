import type { Metadata } from "next";
import type { ReactNode } from "react";

// STATEWIDE PILLAR FOR THE AI CONSULTING CLUSTER (9 Nov 2026).
//
// /ai-consultant-tuscaloosa answers the city query. This page answers the state one and is
// the hub the blog engine links each ai-consulting post up to (~/blog-engine cluster_map.json).
// City pages for Birmingham, Huntsville, Montgomery, Mobile and Auburn sit under it at
// /ai-consulting/<city>-al.
//
// No prices anywhere on this page (owner rule, 9 Nov 2026): every service is quoted per
// business after a free call. No client results, counts or percentages, because the site
// has none it can show.

export const metadata: Metadata = {
  title: { absolute: "AI consulting in Alabama, Purcell Ventures" },
  description:
    "AI consulting in Alabama from Elijah Purcell in Tuscaloosa: training, automation and custom software for local businesses, each quoted after a free call.",
  keywords: [
    "AI consulting Alabama", "AI consultant Alabama", "AI consulting Birmingham",
    "AI consulting Huntsville", "AI consulting Montgomery", "AI consulting Mobile",
    "AI consulting Auburn", "AI training for small business Alabama",
  ],
  openGraph: {
    title: "AI consulting in Alabama",
    description:
      "AI consulting in Alabama from Elijah Purcell in Tuscaloosa: training, automation and custom software for local businesses, each quoted after a free call.",
    url: "https://purcellventures.co/ai-consulting",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI consulting in Alabama: Purcell Ventures",
    description: "AI consulting in Alabama from Elijah Purcell in Tuscaloosa: training, automation and custom software for local businesses, each quoted after a free call.",
  },
  alternates: { canonical: "https://purcellventures.co/ai-consulting" },
};

export const QA: [string, string][] = [
  ["Who offers AI consulting in Alabama?",
   "Purcell Ventures LLC, run by Elijah Purcell in Tuscaloosa, offers AI consulting, AI automation and custom software to businesses across Alabama. Elijah is a student at the University of Alabama, in New College and the Honors College, and builds the systems himself."],
  ["How much does AI consulting cost in Alabama?",
   "Purcell Ventures quotes every project for the business in front of it. Elijah prices training, automation and software after a free call, once he knows the team size, the tools involved and the work to be done."],
  ["Does my team need technical experience?",
   "No. Elijah designs most sessions for people who have never used AI tools, and they go at your team's pace."],
  ["Can the training happen at our office?",
   "Yes. Training sessions run at your location, with examples taken from your own business."],
  ["What is the difference between AI consulting and AI automation?",
   "AI consulting decides where AI fits in your business and trains your team to use it. AI automation builds a system that runs a repeated task without a person doing it each time. Many projects start with consulting and end with an automation."],
  ["Is it safe to put customer data into AI tools?",
   "It depends on the tool and the plan. Consumer and business plans of the same AI product can handle your data differently, so check the data and training settings before you paste in customer information. Deciding what stays out of the chat window is part of every consulting session."],
];

export const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://purcellventures.co/ai-consulting#service",
      "name": "AI consulting in Alabama",
      "url": "https://purcellventures.co/ai-consulting",
      "description":
        "AI consulting, team training, AI automation and custom software for businesses in Alabama, delivered by Elijah Purcell of Purcell Ventures LLC from Tuscaloosa.",
      "provider": { "@id": "https://purcellventures.co/#organization" },
      "founder": { "@id": "https://purcellventures.co/#founder" },
      "employee": { "@id": "https://purcellventures.co/#founder" },
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Alabama" },
        ...["Tuscaloosa", "Birmingham", "Huntsville", "Montgomery", "Mobile", "Auburn"].map((name) => ({
          "@type": "City", name, "containedInPlace": { "@type": "AdministrativeArea", "name": "Alabama" },
        })),
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
        "Autonomous AI agent systems", "Custom software development",
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AI consulting services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "1-on-1 AI consulting" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Small group AI training, 2 to 8 people" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Half-day AI workshop for up to 20 people" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom software project" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI automation" } },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://purcellventures.co/ai-consulting#faq",
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
        { "@type": "ListItem", "position": 3, "name": "AI consulting in Alabama", "item": "https://purcellventures.co/ai-consulting" },
      ],
    },
  ],
};

// Rendered by page.tsx, not here. A layout wraps every route under it, so the city pages
// at /ai-consulting/<city>-al would inherit this page's FAQPage and BreadcrumbList.
export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
