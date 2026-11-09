import type { ReactNode } from "react";
import { tradeMetadata, TradeSchema } from "../TradeParts";

// AI for roofers. No client claims: Purcell Ventures has no published roofing client.
// No claim about what an insurer accepts, and no damage judgment from photos by AI.

const SLUG = "roofers";

export const metadata = tradeMetadata(
  SLUG,
  "How a roofing company can use AI for inspection reports from photos and notes, storm-season lead sorting and insurance paperwork drafts, what to keep with an inspector, and what Purcell Ventures sets up.",
  ["AI for roofers", "AI roofing inspection report", "roofing lead management AI", "AI for roofing companies", "roofing insurance claim paperwork"],
);

export const QA: [string, string][] = [
  ["Can AI detect roof damage from photos?",
   "Do not rely on it. AI can label and arrange the photos your inspector takes and describe what the inspector noted, but a person on the roof judges hail, wind and wear damage. A wrong call from a photo can mislead a homeowner and an adjuster."],
  ["Can AI help with roofing insurance claims?",
   "AI can draft the paperwork around a claim: the inspection summary, a photo log and a letter to the homeowner explaining next steps. A person checks every line, and each insurer sets its own requirements, so follow the carrier's instructions."],
  ["How does AI help a roofer during storm season?",
   "It sorts the flood of requests by address, problem and urgency, so active leaks and tarps come first. AI drafts the replies and a person schedules the inspections. Use your own service area list so the tool turns away jobs you will not take."],
  ["What roofing customer data should stay out of AI tools?",
   "Keep card numbers, policy numbers, claim numbers and gate or alarm codes out of consumer AI chats. Use a business plan with training on your chats turned off before staff paste in names, addresses or inspection notes."],
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TradeSchema slug={SLUG} qa={QA} about={["AI for roofers", "Roof inspection reports", "Storm-season leads", "Insurance claim paperwork"]} />
      {children}
    </>
  );
}
