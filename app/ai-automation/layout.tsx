import type { Metadata } from "next";
import { pageDates } from "@/lib/page-dates";
import type { ReactNode } from "react";

// PILLAR FOR THE AI AUTOMATION CLUSTER (9 Nov 2026).
//
// The hub the blog engine links each ai-automation post up to (~/blog-engine cluster_map.json).
// Alabama city pages under /ai-automation/<city>-al hang off it later.
//
// Service work carries no prices (owner rule, 9 Nov 2026). The course price comes from
// /courses/ai-automation. The COSMIC claims match /agentic-ai and /team: 57 agents in 17 rooms. Purcell
// Ventures sells no AI phone answering product, and the page says so. No client results.

export const metadata: Metadata = {
  title: { absolute: "AI automation for small businesses, Purcell Ventures" },
  description:
    "AI automation for small businesses: which tasks to automate first, what AI phone answering and booking can do, and which work to keep with a person.",
  keywords: [
    "AI automation for small business", "small business automation", "AI receptionist small business",
    "automate lead follow up", "automate Google review requests", "Zapier vs custom automation",
    "AI automation Alabama",
  ],
  openGraph: {
    title: "AI automation for small businesses",
    description:
      "AI automation for small businesses: which tasks to automate first, what AI phone answering and booking can do, and which work to keep with a person.",
    url: "https://purcellventures.co/ai-automation",
    type: "article",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI automation for small businesses",
    description: "AI automation for small businesses: which tasks to automate first, what AI phone answering and booking can do, and which work to keep with a person.",
  },
  alternates: { canonical: "https://purcellventures.co/ai-automation" },
};

export const QA: [string, string][] = [
  ["What is the difference between an AI agent and an automation?",
   "An automation runs fixed steps in a fixed order every time a trigger fires. An AI agent gets a goal, a set of tools and limits, and picks its own steps. Automations suit most small business tasks. Agents suit work where the next step depends on what the last one found."],
  ["Can an AI answer my business phone calls?",
   "Yes. AI voice tools can answer calls, take messages, answer common questions and book into a calendar. They work best on routine calls with a clear script, and they need a fast handoff to a person for complaints, emergencies and anything involving money. Purcell Ventures does not sell a phone answering product."],
  ["How much does it cost to automate a business process?",
   "At Purcell Ventures, Elijah quotes automation for each business after a free conversation, because the price depends on how many systems it touches. Digital plans that include review request automation are quoted the same way."],
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
      "datePublished": pageDates("/ai-automation")!.published,
      "dateModified": pageDates("/ai-automation")!.modified,
      "author": { "@id": "https://elijahpurcell.com/#person" },
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
