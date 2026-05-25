import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "AI Consulting & Team Training | Hands-On Workshops for Business Teams",
  description:
    "Hands-on AI training for business teams in Metro Atlanta and beyond. 1-on-1 ($175/hr), small group ($125/person), or half-day workshop ($2,500 flat up to 20 people). I come to you. Real tools, same-day results.",
  keywords: [
    "AI consulting for business", "AI training workshop", "ChatGPT for business training",
    "AI consulting Atlanta Georgia", "hands-on AI training", "business AI workshop",
    "AI consulting small business", "AI team training",
  ],
  openGraph: {
    title: "AI Consulting & Team Training — Purcell Ventures",
    description:
      "Hands-on AI training for business teams. 1-on-1, small group, or half-day workshop. I come to you. Starting at $125/person.",
    url: "https://purcellventures.co/consulting",
    type: "website",
  },
  twitter: {
    title: "AI Consulting — Purcell Ventures",
    description: "Hands-on AI training for business teams. Starting at $125/person. I come to you.",
  },
  alternates: { canonical: "https://purcellventures.co/consulting" },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://purcellventures.co/consulting#service",
      "name": "AI Consulting & Team Training",
      "description":
        "Hands-on AI training sessions for business teams. Covers ChatGPT workflows, AI for marketing, automation, and custom use cases. Sessions delivered in-person at your location.",
      "provider": { "@id": "https://purcellventures.co/#organization" },
      "url": "https://purcellventures.co/consulting",
      "serviceType": "AI Business Consulting",
      "areaServed": [
        { "@type": "Place", "name": "Metro Atlanta, Georgia" },
        { "@type": "Place", "name": "United States" },
      ],
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "125",
        "highPrice": "2500",
        "offers": [
          { "@type": "Offer", "name": "1-on-1 Session", "price": "175", "priceCurrency": "USD", "unitText": "per hour" },
          { "@type": "Offer", "name": "Small Group Session", "price": "125", "priceCurrency": "USD", "unitText": "per person" },
          { "@type": "Offer", "name": "Workshop", "price": "2500", "priceCurrency": "USD", "unitText": "half-day flat (up to 20 people)" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do I need tech experience to benefit from AI consulting?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Most sessions are designed for people who've never used AI tools before. I meet you where you are and build from there.",
          },
        },
        {
          "@type": "Question",
          "name": "What's the difference between AI consulting and just using ChatGPT on my own?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most people use about 10% of what AI tools can do. I show you the other 90%: the prompting techniques, the integrations, the specific workflows that actually save time in your type of business.",
          },
        },
        {
          "@type": "Question",
          "name": "Can you come to our office for AI training?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. I come to you. Your office, your team, your environment. That context makes the session more relevant and the examples more useful.",
          },
        },
        {
          "@type": "Question",
          "name": "How much does AI consulting cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "1-on-1 sessions are $175/hr (2-hr minimum recommended). Small group sessions are $125/person (2-8 people, 2-hr minimum). Workshops are $2,500 flat for up to 20 people, half-day. Corporate / multi-session engagements are quoted custom. Five session types available: AI Basics, ChatGPT Workflow, AI for Marketing, Automation, and Custom.",
          },
        },
        {
          "@type": "Question",
          "name": "How far in advance do I need to book an AI training session?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Typically 1–2 weeks for standard sessions. Custom trainings need more prep time. Reach out as early as you can.",
          },
        },
      ],
    },
  ],
};

export default function ConsultingLayout({ children }: { children: ReactNode }) {
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
