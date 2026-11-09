import type { Metadata } from "next";
import type { ReactNode } from "react";

// PILLAR FOR THE AI INTEGRATION CLUSTER (9 Nov 2026).
//
// The hub the blog engine links each ai-integration post up to (~/blog-engine cluster_map.json).
// Prices come from /software and /digital as of 9 Nov 2026. The CRM example is the one in
// /blog/why-i-built-crm-from-scratch. Vendor features are named in general terms only, with
// no prices, because vendor prices change and the site cannot keep them current.

export const metadata: Metadata = {
  title: { absolute: "AI integration for small business software, Purcell Ventures" },
  description:
    "AI integration for small business: connect AI to Google Workspace, QuickBooks, a CRM, your website, phone and text. Off-the-shelf vs custom, safety, prices.",
  keywords: [
    "AI integration small business", "add AI to CRM", "AI chatbot trained on my website",
    "AI QuickBooks integration", "connect ChatGPT to business software", "custom AI integration Alabama",
  ],
  openGraph: {
    title: "AI integration for small business software",
    description:
      "AI integration for small business: connect AI to Google Workspace, QuickBooks, a CRM, your website, phone and text. Off-the-shelf vs custom, safety, prices.",
    url: "https://purcellventures.co/ai-integration",
    type: "article",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI integration for small business software",
    description: "AI integration for small business: connect AI to Google Workspace, QuickBooks, a CRM, your website, phone and text. Off-the-shelf vs custom, safety, prices.",
  },
  alternates: { canonical: "https://purcellventures.co/ai-integration" },
};

export const QA: [string, string][] = [
  ["What is an API, and why does it matter for AI integration?",
   "An API is a published way for one program to read from and write to another. If your software has one, a developer can connect an AI model to it directly. If it has none, the options shrink to exports, email and copy and paste."],
  ["Can AI work with QuickBooks?",
   "Yes. Intuit has added AI features inside QuickBooks itself, and QuickBooks Online has an API that outside tools can connect to. Read-only uses, such as summaries and reports, are the safe place to start. Anything that posts entries or sends invoices should wait for a person to approve it."],
  ["How do I add an AI chatbot to my website that only answers from my own information?",
   "Give the chatbot a fixed set of your own documents, such as services, prices, hours and policies, and instruct it to answer only from them and to hand off when the answer is missing. Test it with questions it should refuse. Purcell Ventures includes an AI chatbot trained on your business in the Digital Full Service plan at $279 a month."],
  ["How do I avoid getting locked into one AI vendor?",
   "Keep your own data in your own systems, and keep the instructions and documents you give the model in files you control. A custom integration can then switch models by changing one setting. With an all-in-one AI product, ask how to export your data before you sign."],
  ["Which AI model should a small business build on?",
   "Any of the major models from OpenAI, Anthropic or Google can handle drafting, sorting and summarizing. Pick on data terms, price per use and how well it follows instructions in a test with your own documents. Smaller, cheaper models handle simple sorting well."],
  ["Who maintains an AI integration after launch?",
   "Whoever built it, under terms agreed in the quote. Connections break when a vendor changes its API or a login expires, so every integration needs a named person to fix it. Purcell Ventures stays available for fixes and follow-on work after launch."],
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://purcellventures.co/ai-integration#article",
      "headline": "AI integration for small business software",
      "url": "https://purcellventures.co/ai-integration",
      "datePublished": "2026-11-09",
      "dateModified": "2026-11-09",
      "author": { "@id": "https://purcellventures.co/#founder" },
      "publisher": { "@id": "https://purcellventures.co/#organization" },
      "about": ["AI integration", "API", "CRM", "Website chatbot", "Data security"],
    },
    {
      "@type": "FAQPage",
      "@id": "https://purcellventures.co/ai-integration#faq",
      "mainEntity": QA.map(([q, a]) => ({
        "@type": "Question",
        "name": q,
        "acceptedAnswer": { "@type": "Answer", "text": a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://purcellventures.co" },
        { "@type": "ListItem", "position": 2, "name": "Software", "item": "https://purcellventures.co/software" },
        { "@type": "ListItem", "position": 3, "name": "AI integration for small business software", "item": "https://purcellventures.co/ai-integration" },
      ],
    },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
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
