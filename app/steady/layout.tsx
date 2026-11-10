import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Steady, personal IT for everyday life",
  description:
    "Personal tech help: AI coaching, phone setup, password managers, medication reminders and smart home setup, quoted for your household after a free call.",
  keywords: [
    "personal IT help", "tech help for parents", "AI coaching personal",
    "tech help seniors", "household tech support", "personal tech coach",
    "Atlanta tech help", "remote tech help",
  ],
  openGraph: {
    title: "Steady, personal IT for everyday life",
    description:
      "Personal tech help: AI coaching, phone setup, smart home, password managers and family care plans, quoted for your household after a free call.",
    url: "https://purcellventures.co/steady",
    type: "website",
  
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Steady, personal IT for everyday life",
    description: "Personal tech help, quoted for your household after a free call.",
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
  "serviceType": "Personal technology coaching",
  "areaServed": [
    { "@type": "Place", "name": "Tuscaloosa, Alabama (in-person)" },
    { "@type": "Place", "name": "Metro Atlanta, Georgia (in-person)" },
    { "@type": "Place", "name": "United States (remote)" },
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
        "text": "Personal IT help for individuals and families. Elijah Purcell sets up devices, teaches people to use them and answers texts when something breaks. Each plan is quoted for the household after a free call."
      }
    },
    {
      "@type": "Question",
      "name": "Who is personal IT support for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Parents and grandparents who are not comfortable with technology, and the family member who usually answers their tech questions."
      }
    },
    {
      "@type": "Question",
      "name": "Is this remote or in person?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Both. Elijah Purcell visits in person in Tuscaloosa or metro Atlanta and helps remotely by video anywhere in the US, through monthly plans and one-off packages. The fastest route is to email him at elijah@purcellventures.co."
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
