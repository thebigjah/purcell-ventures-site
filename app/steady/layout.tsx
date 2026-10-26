import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Steady, personal IT for everyday life",
  description:
    "Personal tech help for people who feel overwhelmed by modern tools: AI coaching, phone setup, password managers, medication reminders and smart home setup. One-off help $99, monthly care from $79.",
  keywords: [
    "personal IT help", "tech help for parents", "AI coaching personal",
    "tech help seniors", "household tech support", "personal tech coach",
    "Atlanta tech help", "remote tech help",
  ],
  openGraph: {
    title: "Steady, personal IT for everyday life",
    description:
      "Personal tech help: AI coaching, phone setup, smart home, password managers and family care plans. From $79 a month.",
    url: "https://purcellventures.co/steady",
    type: "website",
  
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Steady, personal IT for everyday life",
    description: "Personal tech help from $79 a month.",
  },
  alternates: { canonical: "/steady" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Steady, personal IT",
  "description":
    "Personal tech help for individuals and households: AI coaching, phone setup, smart home, password managers, medication reminders and family care plans.",
  "provider": { "@id": "https://purcellventures.co/#organization" },
  "url": "https://purcellventures.co/steady",
  "serviceType": "Personal Technology Coaching",
  "areaServed": [
    { "@type": "Place", "name": "Tuscaloosa, Alabama (in-person)" },
    { "@type": "Place", "name": "Metro Atlanta, Georgia (in-person)" },
    { "@type": "Place", "name": "United States (remote)" },
  ],
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": "79",
    "highPrice": "149",
    "offers": [
      { "@type": "Offer", "name": "One-Off Help", "price": "99", "priceCurrency": "USD", "unitText": "per 90-min session" },
      { "@type": "Offer", "name": "Monthly Care", "price": "79", "priceCurrency": "USD", "unitText": "per month" },
      { "@type": "Offer", "name": "Family Care", "price": "149", "priceCurrency": "USD", "unitText": "per month" },
    ],
  },
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
      "name": "Steady",
      "item": "https://purcellventures.co/steady"
    }
  ]
};
const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Steady?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Personal IT support for people who never chose to manage their own technology: setup, patient teaching, and somebody to call when something breaks. Elijah Purcell built it for the family member who has been everyone else's tech support."
      }
    },
    {
      "@type": "Question",
      "name": "Who is personal IT support for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Parents and grandparents, and the person in the family who has answered their questions for years. Steady gives that person someone else to call."
      }
    },
    {
      "@type": "Question",
      "name": "Is this remote or in person?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Both. Elijah Purcell visits in person in Tuscaloosa or metro Atlanta and helps remotely by video anywhere in the US, through monthly plans and one-off packages. The fastest route is to email him at elijah@purcell-ventures.com."
      }
    }
  ]
};

export default function SteadyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
