import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Custom Software Development | Mobile Apps, Web Apps & AI Integration",
  description:
    "Custom-built mobile apps, web platforms, automation tools, and AI integrations scoped around your exact problem — from idea to launch. Small projects $500–1,500, full apps $1,500–5,000+.",
  keywords: [
    "custom software development", "mobile app development", "web app development",
    "AI integration for business", "custom business software", "app development Georgia",
    "automation tools", "software development small business",
  ],
  openGraph: {
    title: "Custom Software Development — Purcell Ventures",
    description:
      "Mobile apps, web platforms, and AI tools built around your exact problem. Small projects $500–1,500, full apps $1,500–5,000+.",
    url: "https://purcellventures.co/software",
    type: "website",
  },
  twitter: {
    title: "Custom Software Development — Purcell Ventures",
    description: "Mobile apps, web apps, and AI tools built for your business. From $500.",
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
    "lowPrice": "500",
    "highPrice": "5000",
    "offers": [
      { "@type": "Offer", "name": "Small Project", "price": "500", "priceCurrency": "USD", "description": "Scripts, tools, automations, simple web apps" },
      { "@type": "Offer", "name": "Full Application", "price": "1500", "priceCurrency": "USD", "description": "Mobile apps, web platforms, full AI integrations" },
    ],
  },
};

export default function SoftwareLayout({ children }: { children: ReactNode }) {
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
