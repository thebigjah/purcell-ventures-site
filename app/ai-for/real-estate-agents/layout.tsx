import type { ReactNode } from "react";
import { tradeMetadata, TradeSchema } from "../TradeParts";

// AI for real estate agents. No client claims: Purcell Ventures has no published real
// estate client. Fair housing and MLS rules are stated in general terms only.

const SLUG = "real-estate-agents";

export const metadata = tradeMetadata(
  SLUG,
  "AI for real estate agents: listing descriptions, lead follow-up and showing feedback summaries, plus the fair housing and MLS cautions that apply.",
  ["AI for real estate agents", "AI listing descriptions", "real estate lead follow-up AI", "fair housing AI", "AI for realtors"],
);

export const QA: [string, string][] = [
  ["Can AI write real estate listing descriptions?",
   "Yes, from the facts you give it: rooms, square footage, upgrades, lot and location. Check every claim against the listing data, remove language that describes who should live there, and follow your MLS rules before you publish."],
  ["Can AI break fair housing rules in a listing?",
   "It can. A model may describe a home as ideal for a certain kind of buyer or describe a neighborhood in ways that steer buyers. Describe the property and its features, and have a person read every word before it goes live."],
  ["Can AI follow up with real estate leads for me?",
   "AI can draft the first reply to a new lead and the follow-ups after it, and a CRM can send them on a schedule. Texts and calls to leads carry consent rules, so collect consent on your forms."],
  ["Is it safe to put client information into ChatGPT?",
   "Keep financial details, offer terms, Social Security numbers and anything a client told you in confidence out of consumer AI chats. Use a business plan with training on your chats turned off, and check your brokerage's AI policy."],
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TradeSchema slug={SLUG} qa={QA} about={["AI for real estate agents", "Listing descriptions", "Lead follow-up", "Fair housing"]} />
      {children}
    </>
  );
}
