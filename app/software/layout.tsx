import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Custom Software Development | Mobile Apps, Web Apps & AI Integration",
  description:
    "Custom-built mobile apps, web platforms, automation tools, and AI integrations scoped around your exact problem, from idea to launch. Small projects $1,500–3,500, full apps $5,000–15,000+.",
  keywords: [
    "custom software development", "mobile app development", "web app development",
    "AI integration for business", "custom business software", "app development Georgia",
    "automation tools", "software development small business",
  ],
  openGraph: {
    title: "Custom Software Development: Purcell Ventures",
    description:
      "Mobile apps, web platforms, and AI tools built around your exact problem. Small projects $1,500–3,500, full apps $5,000–15,000+.",
    url: "https://purcellventures.co/software",
    type: "website",
  
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Custom Software Development: Purcell Ventures",
    description: "Mobile apps, web apps, and AI tools built for your business. From $1,500.",
  },
  alternates: { canonical: "https://purcellventures.co/software" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://purcellventures.co/software#service",
  "name": "Custom Software Development",
  "description":
    "Custom-built mobile apps, web platforms, automation tools, and AI integrations. Scoped and built around your exact problem — from idea to launch.",
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
        "text": "Mobile applications for iOS and Android built with React Native or Expo, full-stack web applications built with Next.js, and AI-powered tools. Custom software work starts at $1,500 and a substantial build runs to around $5,000."
      }
    },
    {
      "@type": "Question",
      "name": "How does a custom software project start?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "With a discovery call, where the work is scoped before anything is quoted. The scope comes out of that conversation rather than out of a package."
      }
    },
    {
      "@type": "Question",
      "name": "What happens after a software project launches?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The builder stays involved after launch. There is one person on the project, so support is the same person who wrote it rather than a handover to somebody who did not."
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
