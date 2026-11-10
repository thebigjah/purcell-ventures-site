import type { Metadata } from "next";
import { pageDates } from "@/lib/page-dates";
import type { ReactNode } from "react";

// PILLAR FOR THE AI FOR SMALL BUSINESS CLUSTER (9 Nov 2026).
//
// The hub the blog engine links each ai-for-small-business post up to
// (~/blog-engine cluster_map.json). Trade pages under /ai-for/<trade> hang off it later.
// Three cluster questions already have live posts (check-ai-answer-before-using,
// start-using-ai-this-week-three-safe-first-tasks, ai-social-media-posts-what-to-hand-off),
// so this page answers each in short and links to the post. The disclosure answer states
// the law in general terms and gives no legal advice. No client results.

export const metadata: Metadata = {
  title: { absolute: "AI for small business, Purcell Ventures" },
  description:
    "AI for small business: how to start with safe first tasks and free tools, check AI answers, write a staff AI policy and avoid the places where AI wastes money.",
  keywords: [
    "AI for small business", "how to use AI in a small business", "free AI tools for small business",
    "small business AI policy", "ChatGPT for small business", "AI mistakes small business",
  ],
  openGraph: {
    title: "AI for small business",
    description:
      "AI for small business: how to start with safe first tasks and free tools, check AI answers, write a staff AI policy and avoid the places where AI wastes money.",
    url: "https://purcellventures.co/ai-for-small-business",
    type: "article",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI for small business",
    description: "AI for small business: how to start with safe first tasks and free tools, check AI answers, write a staff AI policy and avoid the places where AI wastes money.",
  },
  alternates: { canonical: "https://purcellventures.co/ai-for-small-business" },
};

export const QA: [string, string][] = [
  ["What free AI tools are useful for a small business?",
   "ChatGPT, Claude and Gemini all have free plans that can draft emails, review replies and website copy, and summarize documents. Purcell Ventures also publishes free AI tools for small businesses, such as a review response generator and a caption generator, at purcellventures.co/digital/tools."],
  ["How can a small business use AI for marketing without it sounding generic?",
   "Give the model facts only your business has: real job details, prices, customer questions and the way you talk. Ask for a draft, then rewrite the first and last lines yourself. Generic output usually comes from a generic prompt."],
  ["How can a small business use AI for customer service?",
   "Start with drafts a person sends: replies to emails, reviews and common questions. Move to a website chatbot only after you have written down the answers it may give and set a handoff to a person for everything else."],
  ["What are the most common mistakes small businesses make with AI?",
   "Buying a tool before the process it feeds is ready, publishing AI text without checking names and numbers, pasting customer data into a consumer chat account, and letting each employee pick tools with no shared rules."],
  ["How do I get my business mentioned when someone asks ChatGPT for a recommendation?",
   "Make sure your Google Business Profile, website and directory listings all state the same name, services, area and hours, and that your site answers common customer questions in plain sentences. The AI websites guide at purcellventures.co/ai-websites covers the steps."],
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://purcellventures.co/ai-for-small-business#article",
      "headline": "AI for small business",
      "url": "https://purcellventures.co/ai-for-small-business",
      "datePublished": pageDates("/ai-for-small-business")!.published,
      "dateModified": pageDates("/ai-for-small-business")!.modified,
      "author": { "@id": "https://elijahpurcell.com/#person" },
      "publisher": { "@id": "https://purcellventures.co/#organization" },
      "about": ["AI for small business", "AI use policy", "Checking AI output", "AI tools"],
    },
    {
      "@type": "FAQPage",
      "@id": "https://purcellventures.co/ai-for-small-business#faq",
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
