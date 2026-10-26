import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "AI consulting and hands-on team training",
  description:
    "Hands-on AI training for business teams in Tuscaloosa, metro Atlanta and nationwide: 1-on-1 at $175 an hour, small groups at $125 a person, or a half-day workshop at $2,500 flat for up to 20 people. I come to you, and every session includes a same-day takeaway guide.",
  keywords: [
    "AI consulting for business", "AI training workshop", "ChatGPT for business training",
    "AI consulting Atlanta Georgia", "hands-on AI training", "business AI workshop",
    "AI consulting small business", "AI team training",
  ],
  openGraph: {
    title: "AI consulting and team training, Purcell Ventures",
    description:
      "Hands-on AI training for business teams: 1-on-1, small group or a half-day workshop. I come to you. From $125 a person.",
    url: "https://purcellventures.co/consulting",
    type: "website",
  
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "AI consulting, Purcell Ventures",
    description: "Hands-on AI training for business teams, from $125 a person. I come to you.",
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
      "serviceType": "AI Business Consulting",
      "areaServed": [
        { "@type": "Place", "name": "Metro Atlanta, Georgia" },
        { "@type": "Place", "name": "United States" },
      ],
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "125",
        "highPrice": "2500",
        "offers": [
          { "@type": "Offer", "name": "1-on-1 Session", "price": "175", "priceCurrency": "USD", "unitText": "per hour" },
          { "@type": "Offer", "name": "Small Group Session", "price": "125", "priceCurrency": "USD", "unitText": "per person" },
          { "@type": "Offer", "name": "Workshop", "price": "2500", "priceCurrency": "USD", "unitText": "half-day flat (up to 20 people)" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Does my team need tech experience for AI consulting?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. I design most sessions for people who have never used AI tools. I start where your team is and build from there.",
          },
        },
        {
          "@type": "Question",
          "name": "How is AI consulting different from using ChatGPT on my own?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most people use AI tools for one-off questions. I show you prompting techniques, integrations and workflows that save time in your type of business.",
          },
        },
        {
          "@type": "Question",
          "name": "Can you come to our office for AI training?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. I come to your office and train your team there. Examples from your own setting make the session more useful.",
          },
        },
        {
          "@type": "Question",
          "name": "How much does AI consulting cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "1-on-1 sessions are $175 an hour, with a two-hour minimum recommended. Small group sessions are $125 a person for 2 to 8 people, with a two-hour minimum. A half-day workshop is $2,500 flat for up to 20 people. I quote corporate and multi-session work separately. There are five session types: AI basics, ChatGPT workflow, AI for marketing, automation, and custom training.",
          },
        },
        {
          "@type": "Question",
          "name": "How far ahead do I need to book an AI training session?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Standard sessions need 1 to 2 weeks. Custom trainings need more prep time, so contact me as early as you can.",
          },
        },
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
