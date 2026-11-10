import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Custom software, web apps and mobile apps",
  description:
    "Custom software for small businesses: mobile apps, web platforms, automation tools and AI integrations. Every project is quoted for your business after a free call.",
  keywords: [
    "custom software development", "mobile app development", "web app development",
    "AI integration for business", "custom business software", "app development Georgia",
    "automation tools", "software development small business",
  ],
  openGraph: {
    title: "Custom software development, Purcell Ventures",
    description:
      "Mobile apps, web platforms and AI tools for your business. Every project is quoted after a free call.",
    url: "https://purcellventures.co/software",
    type: "website",
  
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Custom software development, Purcell Ventures",
    description: "Mobile apps, web apps and AI tools built for your business, quoted after a free call.",
  },
  alternates: { canonical: "https://purcellventures.co/software" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://purcellventures.co/software#service",
  "name": "Custom software development",
  "description":
    "Custom mobile apps, web platforms, automation tools and AI integrations. I scope and build each one around a single business problem, from idea to launch.",
  "provider": { "@id": "https://purcellventures.co/#organization" },
  "url": "https://purcellventures.co/software",
  "serviceType": "Custom software development",
  "areaServed": "Worldwide",
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

export default function SoftwareLayout({ children }: { children: ReactNode }) {
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
