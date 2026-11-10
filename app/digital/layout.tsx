import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Booking, CRM and AI tools for small businesses",
  description:
    "Booking, a CRM, an AI chatbot and 23 more add-ons for small businesses, built and maintained for you. Every plan is quoted for your business after a free call.",
  keywords: [
    "digital services small business", "AI chatbot for website", "business website management",
    "CRM for small business", "email marketing automation", "booking system",
    "social media scheduling", "website plus AI tools",
  ],
  openGraph: {
    title: "Digital add-ons for small businesses, Purcell Ventures",
    description:
      "Booking, a CRM, an AI chatbot and 23 more add-ons for small businesses. Every plan is quoted for your business after a free call.",
    url: "https://purcellventures.co/digital",
    type: "website",
  
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Digital add-ons, Purcell Ventures",
    description: "Booking, a CRM, an AI chatbot and 23 more add-ons for small businesses. Every plan is quoted for your business after a free call.",
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
      "name": "Digital services for small businesses",
      "description":
        "26 add-ons for small businesses, including a website, an AI chatbot, booking, a CRM, email marketing and social scheduling. I build and maintain them for one monthly subscription.",
      "provider": { "@id": "https://purcellventures.co/#organization" },
      "url": "https://purcellventures.co/digital",
      "serviceType": "Digital business services",
      "areaServed": "Worldwide",
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
            "text": "Every plan is quoted for your business after a free call. The quote depends on the add-ons you pick and the setup they need, and you see it before any work starts.",
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
          "name": "How is the price set?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "I quote each business after a free call, based on the add-ons you pick and how much setup they need. You see the full quote before any work starts.",
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
