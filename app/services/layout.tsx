import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Gutter Cleaning, Pressure Washing & Lawn Care | Metro Atlanta GA",
  description:
    "Owner-operated field services in Kennesaw, Marietta, Acworth, Canton, and Woodstock GA. Gutter cleaning from $100, pressure washing from $75, lawn care from $50. Free estimates. Deal directly with Elijah.",
  keywords: [
    "gutter cleaning Kennesaw GA", "gutter cleaning Marietta GA", "pressure washing Atlanta",
    "lawn care Acworth GA", "gutter cleaning Acworth", "pressure washing Kennesaw",
    "lawn mowing Woodstock GA", "field services Metro Atlanta", "Purcell Works",
  ],
  openGraph: {
    title: "Gutter Cleaning, Pressure Washing & Lawn Care — Purcell Works",
    description:
      "Owner-operated field services in Metro Atlanta. Gutter cleaning from $100, pressure washing from $75, lawn care from $50. Free estimates.",
    url: "https://purcellventures.co/services",
    type: "website",
  },
  twitter: {
    title: "Gutter Cleaning & Field Services — Purcell Works | Metro Atlanta",
    description: "Owner-operated gutter cleaning, pressure washing, and lawn care. Metro Atlanta. Free quotes.",
  },
  alternates: { canonical: "https://purcellventures.co/services" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://purcellventures.co/services#business",
  "name": "Purcell Works — Field Services",
  "description":
    "Owner-operated gutter cleaning, pressure washing, and lawn care for homeowners in Metro Atlanta and surrounding areas.",
  "url": "https://purcellventures.co/services",
  "telephone": "+17702805319",
  "email": "elijah@purcell-ventures.com",
  "priceRange": "$50–$150+",
  "parentOrganization": { "@id": "https://purcellventures.co/#organization" },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Acworth",
    "addressRegion": "GA",
    "addressCountry": "US",
  },
  "areaServed": [
    { "@type": "City", "name": "Kennesaw", "containedInPlace": { "@type": "State", "name": "Georgia" } },
    { "@type": "City", "name": "Marietta", "containedInPlace": { "@type": "State", "name": "Georgia" } },
    { "@type": "City", "name": "Acworth", "containedInPlace": { "@type": "State", "name": "Georgia" } },
    { "@type": "City", "name": "Canton", "containedInPlace": { "@type": "State", "name": "Georgia" } },
    { "@type": "City", "name": "Woodstock", "containedInPlace": { "@type": "State", "name": "Georgia" } },
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Field Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Gutter Cleaning & Inspection",
          "description": "Full debris removal from gutters and downspouts. Downspout flush, visual damage inspection, before & after photos.",
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": "100",
          "priceCurrency": "USD",
          "description": "Starting at $100",
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pressure Washing",
          "description": "Driveways, sidewalks, decks, patios, house siding, fences, and commercial surfaces.",
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": "75",
          "priceCurrency": "USD",
          "description": "Starting at $75",
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Lawn Care",
          "description": "Mowing, edging, weed eating, trimming, and cleanup. Weekly or bi-weekly service available.",
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": "50",
          "priceCurrency": "USD",
          "description": "Starting at $50",
        },
      },
    ],
  },
};

export default function ServicesLayout({ children }: { children: ReactNode }) {
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
