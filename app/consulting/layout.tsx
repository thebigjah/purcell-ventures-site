import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "AI consulting and hands-on team training",
  description:
    "AI consulting and hands-on team training for businesses: 1-on-1, small groups or a half-day workshop for up to 20 people, quoted per business after a free call.",
  keywords: [
    "AI consulting for business", "AI training workshop", "ChatGPT for business training",
    "AI consulting Atlanta Georgia", "hands-on AI training", "business AI workshop",
    "AI consulting small business", "AI team training",
  ],
  openGraph: {
    title: "AI consulting and team training, Purcell Ventures",
    description:
      "Hands-on AI training for business teams: 1-on-1, small group or a half-day workshop. I come to you. Every session is quoted after a free call.",
    url: "https://purcellventures.co/consulting",
    type: "website",
  
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "AI consulting, Purcell Ventures",
    description: "Hands-on AI training for business teams, quoted per business. I come to you.",
  },
  alternates: { canonical: "https://purcellventures.co/consulting" },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://purcellventures.co/consulting#service",
      "name": "AI consulting and team training",
      "description":
        "Hands-on AI training sessions for business teams, covering ChatGPT workflows, AI for marketing, automation and custom use cases. I deliver sessions in person at your location.",
      "provider": { "@id": "https://purcellventures.co/#organization" },
      "url": "https://purcellventures.co/consulting",
      "serviceType": "AI business consulting",
      "areaServed": [
        { "@type": "Place", "name": "Tuscaloosa, Alabama" },
        { "@type": "Place", "name": "Metro Atlanta, Georgia" },
        { "@type": "Place", "name": "United States" },
      ],
    },
  ],
};


const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://purcellventures.co"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Consulting",
      "item": "https://purcellventures.co/consulting"
    }
  ]
};

export default function ConsultingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
