import type { Metadata } from "next";
import type { ReactNode } from "react";

// BUYER COST PAGE (9 Nov 2026).
//
// Answers "how much does AI consulting cost for a small business", which the blog engine
// cannot cover because it bans dollar figures. Every Purcell Ventures price on the page was
// read off /consulting, /software, /digital, /steady, /pricing-comparison and /ai-consulting
// on 9 Nov 2026. /sites prints no dollar figures (builds are quoted on the discovery call).
//
// No market price ranges. /pricing-comparison lists agency and freelancer figures with no
// sources behind them, so this page leaves them out and describes how each pricing model
// works instead.

const URL = "https://purcellventures.co/ai-consulting-cost";
const DESCRIPTION =
  "AI consulting at Purcell Ventures costs $175 an hour, $125 a person for groups or $2,500 for a workshop. What drives the price and how to estimate the payback.";

export const metadata: Metadata = {
  title: { absolute: "AI consulting cost for a small business, Purcell Ventures" },
  description: DESCRIPTION,
  keywords: [
    "AI consulting cost", "how much does AI consulting cost", "AI consultant pricing",
    "AI training cost for small business", "AI workshop price", "AI consulting rates",
  ],
  openGraph: {
    title: "How much does AI consulting cost for a small business?",
    description: DESCRIPTION,
    url: URL,
    type: "article",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How much does AI consulting cost for a small business?",
    description: DESCRIPTION,
  },
  alternates: { canonical: URL },
};

export const QA: [string, string][] = [
  ["How much does AI consulting cost for a small business?",
   "At Purcell Ventures, 1-on-1 AI consulting costs $175 an hour with a two-hour minimum recommended. Small group training costs $125 a person for 2 to 8 people, and a half-day workshop costs $2,500 flat for up to 20 people. Small software projects run $1,500 to $3,500."],
  ["How much does AI training cost for a team of 8?",
   "A small group session for 8 people costs $1,000 at Purcell Ventures, which is 8 people at $125 each, with a two-hour minimum."],
  ["Is the first consultation free?",
   "Yes. The first 30-minute conversation is free. Elijah tells you which option fits, or whether you need to pay anyone at all."],
  ["Does Purcell Ventures offer monthly plans?",
   "Yes. Digital plans that add tools such as booking, a CRM or a chatbot to your website cost $99, $179 or $279 a month, with a one-time setup fee of $650 to $1,000 and no contract. Elijah quotes ongoing software work on the discovery call."],
  ["How do I know if AI consulting will pay for itself?",
   "Enter your team size, hourly cost, weekly manual hours and the session price into the free AI cost calculator on purcellventures.co. It divides the session cost by the monthly savings and shows the payback period."],
];

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
