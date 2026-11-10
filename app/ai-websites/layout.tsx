import type { Metadata } from "next";
import type { ReactNode } from "react";

// PILLAR FOR THE AI WEBSITES CLUSTER (9 Nov 2026).
//
// The hub the blog engine links each ai-websites post up to (~/blog-engine cluster_map.json).
// Websites are the last-listed PV service, so this page leads with AI findability and comes
// to builders after it. Every PV service is quoted per business (owner rule, 9 Nov 2026), so
// this page gives build timelines and no prices.
// The FAQ rich result date comes from /blog/write-a-page-an-ai-will-quote. No client results.

export const metadata: Metadata = {
  title: { absolute: "AI websites for small businesses, Purcell Ventures" },
  description:
    "AI websites for small businesses: how to get found in ChatGPT and Google AI answers, what schema and llms.txt do, and when an AI site builder is enough.",
  keywords: [
    "show up in ChatGPT answers", "generative engine optimization small business", "AI website builder vs custom website",
    "llms.txt small business", "schema markup AI search", "AI search optimization Alabama",
  ],
  openGraph: {
    title: "AI websites for small businesses",
    description:
      "AI websites for small businesses: how to get found in ChatGPT and Google AI answers, what schema and llms.txt do, and when an AI site builder is enough.",
    url: "https://purcellventures.co/ai-websites",
    type: "article",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI websites for small businesses",
    description: "AI websites for small businesses: how to get found in ChatGPT and Google AI answers, what schema and llms.txt do, and when an AI site builder is enough.",
  },
  alternates: { canonical: "https://purcellventures.co/ai-websites" },
};

export const QA: [string, string][] = [
  ["How do I make my website show up in AI answers from ChatGPT, Gemini and Perplexity?",
   "Let search engines and AI crawlers index the site, state what the business does, where and for whom in one plain sentence, answer customer questions under question headings, and make your Google Business Profile and directory listings match the site exactly."],
  ["What is an llms.txt file, and does my business website need one?",
   "An llms.txt file is a plain-text file at the root of a site that lists its main pages and what each one is for. Adoption by AI companies is not universal, so nobody can promise results from it. It takes about twenty minutes to write and is worth that time on a site with more than a few pages."],
  ["Will Google penalize my website for AI-written content?",
   "Google has said it judges content on whether it helps the reader, whoever or whatever wrote it. Its spam policies target pages mass-produced to rank with little value to a reader. AI-drafted pages that a person checked and that contain real facts about your business fall outside that."],
  ["Should I block AI crawlers from my business website?",
   "For most local businesses, no. Blocking the crawlers that AI assistants use to look things up makes it harder for those assistants to describe your business accurately. A business that publishes paid or original content it wants to protect may decide differently."],
  ["Are AI website builders good enough for a small business?",
   "For a simple brochure site that the owner will update, often yes. Check that the builder lets you edit page titles and descriptions, add structured data, connect your own domain and export your content before you commit."],
  ["How much does an AI-ready website cost?",
   "Purcell Ventures quotes each website build on a free discovery call. A single-page Starter site goes live in 7 to 10 business days and a multi-page Pro site in 14 to 21. Digital plans that add AI tools to an existing site are quoted for your business after a free call."],
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://purcellventures.co/ai-websites#article",
      "headline": "AI websites for small businesses",
      "url": "https://purcellventures.co/ai-websites",
      "datePublished": "2026-11-09",
      "dateModified": "2026-11-09",
      "author": { "@id": "https://purcellventures.co/#founder" },
      "publisher": { "@id": "https://purcellventures.co/#organization" },
      "about": ["Generative engine optimization", "AI search", "Schema markup", "llms.txt", "AI website builders"],
    },
    {
      "@type": "FAQPage",
      "@id": "https://purcellventures.co/ai-websites#faq",
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
        { "@type": "ListItem", "position": 2, "name": "Websites", "item": "https://purcellventures.co/sites" },
        { "@type": "ListItem", "position": 3, "name": "AI websites for small businesses", "item": "https://purcellventures.co/ai-websites" },
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
