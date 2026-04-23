import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Digital Services for Small Businesses | Websites, AI Tools, CRM & Booking",
  description:
    "Complete digital toolkit: website, AI chatbot, booking system, CRM, email marketing, social scheduling, and 20+ tools. One monthly subscription — Starter $75/mo, Growth $125/mo, Full $175/mo. Setup $300–500.",
  keywords: [
    "digital services small business", "AI chatbot for website", "business website management",
    "CRM for small business", "email marketing automation", "booking system",
    "social media scheduling", "website plus AI tools",
  ],
  openGraph: {
    title: "Digital Services for Small Businesses — Purcell Ventures",
    description:
      "Website, AI chatbot, booking system, CRM, and 20+ tools. One subscription. Starting at $75/mo.",
    url: "https://purcellventures.co/digital",
    type: "website",
  },
  twitter: {
    title: "Digital Services — Purcell Ventures",
    description: "Website, AI chatbot, booking, CRM, and 20+ tools for small businesses. From $75/mo.",
  },
  alternates: { canonical: "https://purcellventures.co/digital" },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://purcellventures.co/digital#service",
      "name": "Digital Services for Small Businesses",
      "description":
        "Complete digital toolkit: website, AI chatbot, booking system, CRM, email marketing, social scheduling, and 20+ tools. Fully managed. One monthly subscription.",
      "provider": { "@id": "https://purcellventures.co/#organization" },
      "url": "https://purcellventures.co/digital",
      "serviceType": "Digital Business Services",
      "areaServed": "Worldwide",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "75",
        "highPrice": "175",
        "offerCount": 3,
        "offers": [
          { "@type": "Offer", "name": "Starter Plan", "price": "75", "priceCurrency": "USD" },
          { "@type": "Offer", "name": "Growth Plan", "price": "125", "priceCurrency": "USD" },
          { "@type": "Offer", "name": "Full Suite Plan", "price": "175", "priceCurrency": "USD" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How is this different from Wix or Squarespace?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Those are tools you manage yourself. I build it, maintain it, update it, and add AI capabilities those platforms don't offer — like a chatbot trained on your business, AI-generated social posts, and automated review responses. You focus on your business, I handle the tech.",
          },
        },
        {
          "@type": "Question",
          "name": "How much does a digital services subscription cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Plans start at $75/mo (Starter), $125/mo (Growth), or $175/mo (Full Suite). There is a one-time setup fee of $300–500.",
          },
        },
        {
          "@type": "Question",
          "name": "Do I own my website?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The site, content, and domain are yours. If you ever want to leave, I hand over everything — full source code, all assets. No hostage-taking.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I start small and add more tools later?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Start with a website and chatbot. Add booking when you're ready. Scale at your own pace.",
          },
        },
        {
          "@type": "Question",
          "name": "Why is it cheaper than a typical agency?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Because I build modular, reusable systems — not one-off custom builds from scratch. I use AI tools throughout my workflow, which cuts hours without cutting quality. You get professional-grade work at a fraction of typical agency rates.",
          },
        },
      ],
    },
  ],
};

export default function DigitalLayout({ children }: { children: ReactNode }) {
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
