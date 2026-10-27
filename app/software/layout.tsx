import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Custom software, web apps and mobile apps",
  description:
    "Custom mobile apps, web platforms, automation tools and AI integrations, scoped on a discovery call and built through launch. Small projects $1,500 to $3,500, full apps $5,000 to $15,000 and up.",
  keywords: [
    "custom software development", "mobile app development", "web app development",
    "AI integration for business", "custom business software", "app development Georgia",
    "automation tools", "software development small business",
  ],
  openGraph: {
    title: "Custom software development, Purcell Ventures",
    description:
      "Mobile apps, web platforms and AI tools for your business. Small projects $1,500 to $3,500, full apps $5,000 to $15,000 and up.",
    url: "https://purcellventures.co/software",
    type: "website",
  
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Custom software development, Purcell Ventures",
    description: "Mobile apps, web apps and AI tools built for your business, from $1,500.",
  },
  alternates: { canonical: "https://purcellventures.co/software" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://purcellventures.co/software#service",
  "name": "Custom Software Development",
  "description":
    "Custom mobile apps, web platforms, automation tools and AI integrations. I scope and build each one around a single business problem, from idea to launch.",
  "provider": { "@id": "https://purcellventures.co/#organization" },
  "url": "https://purcellventures.co/software",
  "serviceType": "Custom Software Development",
  "areaServed": "Worldwide",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": "1500",
    "highPrice": "15000",
    "offers": [
      { "@type": "Offer", "name": "Small Project", "price": "1500", "priceCurrency": "USD", "description": "Scripts, tools, automations, simple web apps" },
      { "@type": "Offer", "name": "Full Application", "price": "5000", "priceCurrency": "USD", "description": "Mobile apps, web platforms, full AI integrations" },
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
      "name": "Software",
      "item": "https://purcellventures.co/software"
    }
  ]
};
const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What kind of custom software does Purcell Ventures build?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mobile applications for iOS and Android built with React Native or Expo, full-stack web applications built with Next.js, and AI tools. Small projects cost $1,500 to $3,500 and full applications $5,000 to $15,000 and up."
      }
    },
    {
      "@type": "Question",
      "name": "How does a custom software project start?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "With a free 30-minute discovery call. Elijah scopes the work on that call before he quotes anything."
      }
    },
    {
      "@type": "Question",
      "name": "What happens after a software project launches?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Elijah builds every project himself and stays involved after launch for fixes and follow-on work."
      }
    }
  ]
};

export default function SoftwareLayout({ children }: { children: ReactNode }) {
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
