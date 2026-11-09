import type { ReactNode } from "react";
import { tradeMetadata, TradeSchema } from "../TradeParts";

// AI for landscapers. No client claims: Purcell Ventures has no published landscaping client.
// Pesticide labels and state applicator licensing are mentioned in general terms only.
// Kept distinct from /ai-for/cleaning-companies: yard photos, seasons, weather and crews.

const SLUG = "landscapers";

export const metadata = tradeMetadata(
  SLUG,
  "AI for landscapers and lawn care companies: quote intake from yard photos, crew scheduling and seasonal service reminders, with final prices set by a person.",
  ["AI for landscapers", "AI for lawn care companies", "landscaping quote from photos", "lawn care reminders", "landscaping chatbot"],
);

export const QA: [string, string][] = [
  ["Can AI quote a landscaping job from photos?",
   "AI can turn yard photos and a short form into a clean quote request, and it can draft an estimate from your own price sheet. An owner or crew lead sets the final price, often after a site visit, since a photo hides slopes, drainage, roots and gate widths."],
  ["Can AI schedule landscaping crews?",
   "Scheduling software places recurring jobs on routes, and AI can help write the weather-delay and reschedule messages that go to customers. The crew lead still decides when rain, heat or a broken mower changes the day."],
  ["Can AI send seasonal lawn care reminders?",
   "Yes. Your customer list and a texting or email tool send them on dates you set, such as spring cleanup, aeration, leaf removal and winter prep. AI helps write each message. Marketing texts need the customer's prior written consent under federal telemarketing rules."],
  ["Should AI give lawn treatment or chemical advice?",
   "No. A bot can describe your services from answers you write. Which product goes on a lawn and at what rate follows the product label, your state's applicator licensing rules and the judgment of your licensed staff."],
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TradeSchema slug={SLUG} qa={QA} about={["AI for landscapers", "Landscaping quotes from photos", "Crew scheduling", "Seasonal service reminders"]} />
      {children}
    </>
  );
}
