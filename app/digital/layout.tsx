import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: { canonical: "/digital" },
  title: "Digital Services for Small Businesses | Websites, AI Tools, CRM & Booking",
  description:
    "Complete digital toolkit: website, AI chatbot, booking system, CRM, email marketing, social scheduling, and 20+ tools. One monthly subscription, Starter $99/mo, Growth $179/mo, Full $279/mo. Setup $400 to $1,000.",
  keywords: [
    "digital services small business", "AI chatbot for website", "business website management",
    "CRM for small business", "email marketing automation", "booking system",
    "social media scheduling", "website plus AI tools",
  ],
  openGraph: {
    title: "Digital Services for Small Businesses: Purcell Ventures",
    description:
      "Website, AI chatbot, booking system, CRM, and 20+ tools. One subscription. Starting at $99/mo.",
    url: "https://purcellventures.co/digital",
    type: "website",
  
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Digital Services: Purcell Ventures",
    description: "Website, AI chatbot, booking, CRM, and 20+ tools for small businesses. From $99/mo.",
  },
  // NO canonical here. This layout wraps every /digital child route and Next
  // inherits it, so each child was declaring itself a duplicate of /digital.
  // A page with no canonical self-canonicalises, which is what these want.
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://purcellventures.co/digital#service",
      "name": "Digital Services for Small Businesses",
      "description":
        "Complete digital toolkit: website, AI chatbot, booking system, CRM, email marketing, social scheduling, and 20+ tools. I manage it. One monthly subscription.",
      "provider": { "@id": "https://purcellventures.co/#organization" },
      "url": "https://purcellventures.co/digital",
      "serviceType": "Digital Business Services",
      "areaServed": "Worldwide",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "99",
        "highPrice": "279",
        "offerCount": 3,
        "offers": [
          { "@type": "Offer", "name": "Starter Plan", "price": "99", "priceCurrency": "USD" },
          { "@type": "Offer", "name": "Growth Plan", "price": "179", "priceCurrency": "USD" },
          { "@type": "Offer", "name": "Full Suite Plan", "price": "279", "priceCurrency": "USD" },
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
            "text": "You manage Wix and Squarespace yourself. I build and maintain the site and add AI tools such as a chatbot trained on your business, AI-drafted social posts and automated review responses.",
          },
        },
        {
          "@type": "Question",
          "name": "How much does a digital services subscription cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Plans start at $99/mo (Starter), $179/mo (Growth), or $279/mo (Full Suite). There is a one-time setup fee of $400 to $1,000.",
          },
        },
        {
          "@type": "Question",
          "name": "Do I own my website?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The site, content, and domain are yours. If you ever want to leave, I hand over the full source code and all assets.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I start small and add more tools later?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Start with a website and chatbot and add booking or other tools when you want them.",
          },
        },
        {
          "@type": "Question",
          "name": "Why is it cheaper than a typical agency?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "I reuse the same modules across clients instead of building each site from scratch, and I use AI tools to write and test code. Both cut my hours, so I can charge less.",
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
      "name": "Digital",
      "item": "https://purcellventures.co/digital"
    }
  ]
};

export default function DigitalLayout({ children }: { children: ReactNode }) {
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
