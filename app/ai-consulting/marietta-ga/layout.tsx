import type { Metadata } from "next";
import type { ReactNode } from "react";

// CITY PAGE UNDER THE PILLAR /ai-consulting (9 Nov 2026), Georgia group.
//
// Written around what Marietta businesses do (Lockheed Martin's Marietta plant and its
// suppliers, Dobbins Air Reserve Base, Wellstar Kennestone Hospital and the medical practices
// near it, and the small businesses on Marietta Square), so the page spends its length on the
// two sets of data rules that decide AI work there. Delivery format comes from
// /consulting, /software and /ai-consulting only. No clients, results or Marietta address,
// because the company has none there.

const URL = "https://purcellventures.co/ai-consulting/marietta-ga";

export const metadata: Metadata = {
  title: { absolute: "AI consulting in Marietta, Georgia, Purcell Ventures" },
  description:
    "AI consulting in Marietta, Georgia for aerospace suppliers, medical practices and Marietta Square businesses. Training, automation, software and data rules.",
  keywords: [
    "AI consulting Marietta",
    "AI consultant Marietta Georgia",
    "AI training Marietta",
    "AI automation Marietta GA",
    "AI for aerospace suppliers",
    "AI for medical practices Cobb County",
  ],
  openGraph: {
    title: "AI consulting in Marietta, Georgia",
    description:
      "AI consulting in Marietta, Georgia for aerospace suppliers, medical practices and Marietta Square businesses. Training, automation, software and data rules.",
    url: URL,
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI consulting in Marietta, Georgia: Purcell Ventures",
    description: "AI consulting in Marietta, Georgia for aerospace suppliers, medical practices and Marietta Square businesses. Training, automation, software and data rules.",
  },
  alternates: { canonical: URL },
};

export const QA: [string, string][] = [
  ["Who offers AI consulting in Marietta, Georgia?",
   "Purcell Ventures LLC, run by Elijah Purcell, works with Marietta businesses on AI training, AI automation and custom software. Elijah grew up in nearby Kennesaw and runs the company from Tuscaloosa, Alabama. Training sessions happen at your location, and planning and builds run over phone and email. The first conversation is free."],
  ["Can an aerospace supplier use ChatGPT or Claude?",
   "For some work. Export-controlled technical data, classified information and anything your contract restricts stays out of general AI tools, and your contract and compliance officer set that line. Work with no restricted data, such as job postings, marketing copy and internal meeting notes, makes the usual place to start."],
  ["Can a medical practice use AI for patient messages?",
   "For messages that carry no patient information, such as office hours, parking and which forms to bring. Patient health information stays out of any AI tool your practice has not cleared under HIPAA, and anything clinical stays with a clinician."],
  ["How much does AI training cost for a Marietta team?",
   "Elijah quotes every job per business after a free call, because the price depends on the size of the team and how much of the work is training or building. Training comes as 1-on-1 sessions, small group training for 2 to 8 people or a half-day workshop for up to 20 people."],
  ["Does Purcell Ventures have an office in Marietta?",
   "No. Purcell Ventures works from Tuscaloosa, Alabama, and Elijah registered the LLC in Acworth, Georgia. Elijah comes to your office for training sessions, and the rest of the work runs by phone and email."],
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${URL}#service`,
      "name": "AI consulting in Marietta, Georgia",
      "url": URL,
      "description":
        "AI training, AI automation and custom software for businesses in Marietta, Georgia, delivered by Elijah Purcell of Purcell Ventures LLC from Tuscaloosa.",
      "provider": { "@id": "https://purcellventures.co/#organization" },
      "founder": { "@id": "https://elijahpurcell.com/#person" },
      "employee": { "@id": "https://elijahpurcell.com/#person" },
      "areaServed": [
        { "@type": "City", "name": "Marietta", "containedInPlace": { "@type": "AdministrativeArea", "name": "Georgia" } },
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
        "Custom software development", "AI use with export-controlled and patient data",
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
