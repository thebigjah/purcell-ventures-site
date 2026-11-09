import type { Metadata } from "next";
import type { ReactNode } from "react";

// PILLAR FOR THE AI AUTOMATION CLUSTER (9 Nov 2026).
//
// The hub the blog engine links each ai-automation post up to (~/blog-engine cluster_map.json).
// Alabama city pages under /ai-automation/<city>-al hang off it later.
//
// Prices come from /consulting, /software, /digital and /courses/ai-automation as of 9 Nov
// 2026. The COSMIC claims match /agentic-ai and /team: 57 agents in 17 rooms. Purcell
// Ventures sells no AI phone answering product, and the page says so. No client results.

export const metadata: Metadata = {
  title: { absolute: "AI automation for small businesses, Purcell Ventures" },
  description:
    "AI automation for small businesses: which tasks to automate first, what AI phone answering and booking can do, what to keep with a person, and what it costs.",
  keywords: [
    "AI automation for small business", "small business automation", "AI receptionist small business",
    "automate lead follow up", "automate Google review requests", "Zapier vs custom automation",
    "AI automation Alabama",
  ],
  openGraph: {
    title: "AI automation for small businesses",
    description:
      "AI automation for small businesses: which tasks to automate first, what AI phone answering and booking can do, what to keep with a person, and what it costs.",
    url: "https://purcellventures.co/ai-automation",
    type: "article",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI automation for small businesses",
    description: "AI automation for small businesses: which tasks to automate first, what AI phone answering and booking can do, what to keep with a person, and what it costs.",
  },
  alternates: { canonical: "https://purcellventures.co/ai-automation" },
};

export const QA: [string, string][] = [
  ["What is the difference between an AI agent and an automation?",
   "An automation runs fixed steps in a fixed order every time a trigger fires. An AI agent gets a goal, a set of tools and limits, and picks its own steps. Automations suit most small business tasks. Agents suit work where the next step depends on what the last one found."],
  ["Can an AI answer my business phone calls?",
   "Yes. AI voice tools can answer calls, take messages, answer common questions and book into a calendar. They work best on routine calls with a clear script, and they need a fast handoff to a person for complaints, emergencies and anything involving money. Purcell Ventures does not sell a phone answering product."],
  ["How much does it cost to automate a business process?",
   "At Purcell Ventures, Elijah quotes automation per project after a free conversation, because the price depends on how many systems it touches. Small software projects run $1,500 to $3,500. Digital plans that include review request automation start at $179 a month, with a one-time setup fee of $650 to $1,000."],
  ["Should I use Zapier or Make, or pay for a custom automation?",
   "Start with Zapier or Make when both apps are on their lists and the task has a few steps. Pay for a custom build when the data needs cleaning, the task needs judgment from an AI model, or the monthly task count would cost more than a one-time build."],
  ["What happens when an automation breaks?",
   "Most automations fail without an error message. A connection expires or a field changes name and the task stops running with no error anyone sees. Every automation needs a check that compares what it did against what it should have done, and a person who reads that check."],
  ["Can I learn to build automations myself?",
   "Yes. Zapier and Make let people who do not write code connect their apps. For owners who want to write their own scripts, the Zero to Automated course covers email, content, lead generation and scheduling, and costs $397 at launch."],
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://purcellventures.co/ai-automation#article",
      "headline": "AI automation for small businesses",
      "url": "https://purcellventures.co/ai-automation",
      "datePublished": "2026-11-09",
      "dateModified": "2026-11-09",
      "author": { "@id": "https://purcellventures.co/#founder" },
      "publisher": { "@id": "https://purcellventures.co/#organization" },
      "about": ["AI automation", "Business process automation", "AI phone answering", "Lead follow-up", "Review requests"],
    },
    {
      "@type": "FAQPage",
      "@id": "https://purcellventures.co/ai-automation#faq",
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
        { "@type": "ListItem", "position": 3, "name": "AI automation for small businesses", "item": "https://purcellventures.co/ai-automation" },
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
