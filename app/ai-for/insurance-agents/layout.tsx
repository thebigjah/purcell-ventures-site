import type { ReactNode } from "react";
import { tradeMetadata, TradeSchema } from "../TradeParts";

// AI for insurance agents. No client claims: Purcell Ventures has no published agency client.
// Licensing, binding authority and privacy rules are stated in general terms only. A bot never
// binds coverage, quotes a final premium or gives coverage advice.

const SLUG = "insurance-agents";

export const metadata = tradeMetadata(
  SLUG,
  "AI for insurance agents: quote request intake, renewal reminders and policy FAQs, and why a bot never binds coverage or tells a client what coverage to buy.",
  ["AI for insurance agents", "insurance agency AI", "insurance quote intake", "insurance renewal reminders", "insurance agency chatbot"],
);

export const QA: [string, string][] = [
  ["Can an AI chatbot give an insurance quote?",
   "A chatbot can collect the details a quote needs, such as the vehicles, drivers, property and current coverage, and pass them to a licensed agent. The agent runs the quote through the carrier and presents it. The bot never states a final premium."],
  ["Can AI bind coverage or change a policy?",
   "No. Only a licensed agent with binding authority from the carrier can bind coverage, and policy changes go through the agent and the carrier's own systems. A bot can take the request and tell the client a person will confirm it."],
  ["Can AI send insurance renewal reminders?",
   "Your agency management system knows each renewal date and can send the messages on schedule. AI helps write clear wording for the 60-day, 30-day and final notices. Marketing texts need the client's prior written consent under federal telemarketing rules."],
  ["Should an insurance chatbot answer coverage questions?",
   "It can explain general terms from answers your agency writes, such as what a deductible is or what liability coverage means in general. Whether a client's own policy covers a loss, or how much coverage they should carry, goes to a licensed agent."],
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TradeSchema slug={SLUG} qa={QA} about={["AI for insurance agents", "Insurance quote intake", "Insurance renewal reminders", "Insurance agency marketing"]} />
      {children}
    </>
  );
}
