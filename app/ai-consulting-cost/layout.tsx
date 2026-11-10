import type { Metadata } from "next";
import type { ReactNode } from "react";

// BUYER PRICING PAGE (9 Nov 2026).
//
// Answers "how much does AI consulting cost for a small business" for the buyer who
// searches it. Elijah's rule as of 9 Nov 2026: no service prices anywhere on the site.
// Websites, consulting, software, digital plans and partnerships are quoted per business
// after a free call, and only /courses and /shop show prices. So this page explains how
// the quote is built and how pricing models work, with zero dollar figures in the copy,
// the metadata or the schema. Keep it that way.

const URL = "https://purcellventures.co/ai-consulting-cost";
const DESCRIPTION =
  "How Purcell Ventures quotes AI consulting for small businesses after a free call, what drives a quote, how common pricing models work and how to judge payback.";

export const metadata: Metadata = {
  title: { absolute: "AI consulting pricing for a small business, Purcell Ventures" },
  description: DESCRIPTION,
  keywords: [
    "AI consulting cost", "how much does AI consulting cost", "AI consultant pricing",
    "AI consulting pricing models", "AI training cost for small business", "AI consulting quote",
  ],
  openGraph: {
    title: "How is AI consulting priced for a small business?",
    description: DESCRIPTION,
    url: URL,
    type: "article",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How is AI consulting priced for a small business?",
    description: DESCRIPTION,
  },
  alternates: { canonical: URL },
};

export const QA: [string, string][] = [
  ["How much does AI consulting cost at Purcell Ventures?",
   "Elijah Purcell quotes each business after a free first call. The quote depends on the scope, the number of people and sessions, whether you need training or a custom build, where the work happens and what support you want afterward."],
  ["Why does Purcell Ventures not publish a price list?",
   "Two businesses rarely need the same work. A quote written after a call covers the job you need and leaves out the parts you do not."],
  ["Is the first call free?",
   "Yes. The first 30-minute conversation is free. Elijah tells you which option fits, or whether you need to pay anyone at all."],
  ["Can the quote include support after the work ends?",
   "Yes. Every training session includes a takeaway guide and you can email questions afterward. Ongoing support for a build or for tools on your website goes into the quote when you want it."],
  ["How do I know if AI consulting will pay for itself?",
   "Enter your team size, hourly cost, weekly manual hours and the quote you received into the free AI cost calculator on purcellventures.co. It divides the quote by the monthly savings and shows the payback period."],
];

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
