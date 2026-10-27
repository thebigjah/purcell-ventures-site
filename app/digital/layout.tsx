import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Booking, CRM and AI tools for small businesses",
  description:
    "26 add-ons for small businesses, from booking and a CRM to an AI chatbot and email marketing, built and maintained by one person. Starter $99, Growth $179 and Full Service $279 a month. Setup $650 to $1,000.",
  keywords: [
    "digital services small business", "AI chatbot for website", "business website management",
    "CRM for small business", "email marketing automation", "booking system",
    "social media scheduling", "website plus AI tools",
  ],
  openGraph: {
    title: "Digital add-ons for small businesses, Purcell Ventures",
    description:
      "Booking, a CRM, an AI chatbot and 23 more add-ons for small businesses. Plans from $99 a month.",
    url: "https://purcellventures.co/digital",
    type: "website",
  
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Digital add-ons, Purcell Ventures",
    description: "Booking, a CRM, an AI chatbot and 23 more add-ons for small businesses. Plans from $99 a month.",
  },
  // No canonical here. This layout wraps every /digital child route and Next
  // inherits it, so until 27 Oct 2026 all eight demos told Google they were
  // copies of /digital. /digital sets its own in page.tsx, each demo in its layout.
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://purcellventures.co/digital#service",
      "name": "Digital Services for Small Businesses",
      "description":
        "26 add-ons for small businesses, including a website, an AI chatbot, booking, a CRM, email marketing and social scheduling. I build and maintain them for one monthly subscription.",
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
          { "@type": "Offer", "name": "Full Service Plan", "price": "279", "priceCurrency": "USD" },
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
            "text": "Starter is $99 a month, Growth $179 a month and Full Service $279 a month. There is a one-time setup fee of $650 to $1,000.",
          },
        },
        {
          "@type": "Question",
          "name": "Do I own my website?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The site, content and domain are yours. If you leave, I hand over the full source code and all assets.",
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
          "name": "Why does it cost less than a typical agency?",
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
