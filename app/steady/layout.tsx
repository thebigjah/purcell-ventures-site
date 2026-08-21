import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Steady: Personal IT for Everyday Life",
  description:
    "Personal tech help for people who feel overwhelmed by modern tools. AI coaching, phone setup, password managers, medication reminders, smart home setup. One-off help from $99, monthly care from $79.",
  keywords: [
    "personal IT help", "tech help for parents", "AI coaching personal",
    "tech help seniors", "household tech support", "personal tech coach",
    "Atlanta tech help", "remote tech help",
  ],
  openGraph: {
    title: "Steady: Personal IT for Everyday Life",
    description:
      "Personal tech help. AI coaching, phone setup, smart home, password managers, family tech care plans. From $79/mo.",
    url: "https://purcellventures.co/steady",
    type: "website",
  
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Steady: Personal IT for Everyday Life",
    description: "Personal tech help. From $79/mo.",
  },
  alternates: { canonical: "/steady" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Steady — Personal IT",
  "description":
    "Personal tech help for individuals and households. AI coaching, phone setup, smart home, password managers, medication reminders, family tech care plans.",
  "provider": { "@id": "https://purcellventures.co/#organization" },
  "url": "https://purcellventures.co/steady",
  "serviceType": "Personal Technology Coaching",
  "areaServed": [
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
        "text": "Personal IT support for people who never chose to manage their own technology: setup, patient teaching, and somebody to call when something breaks. It is aimed at the family member who has been acting as everyone else's tech support."
      }
    },
    {
      "@type": "Question",
      "name": "Who is personal IT support for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Parents and grandparents, and the person in the family who has been fielding their questions for years. The service exists so that person is not the only option."
      }
    },
    {
      "@type": "Question",
      "name": "Is this remote or in person?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Both are offered, with plans and one-off packages. The detail is on the Steady page and the fastest route is to email Elijah Purcell directly."
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
