import type { ReactNode } from "react";
import { tradeMetadata, TradeSchema } from "../TradeParts";

// AI for plumbers. No client claims: Purcell Ventures has no published plumbing client.
// Purcell Ventures does not sell a phone answering product (see /ai-automation).

const SLUG = "plumbers";

export const metadata = tradeMetadata(
  SLUG,
  "AI for plumbers: emergency call triage, job summaries from tech notes, quote follow-ups and review replies, and what stays with a licensed plumber.",
  ["AI for plumbers", "plumbing AI answering", "AI for plumbing businesses", "plumbing quote follow-up", "plumber chatbot"],
);

export const QA: [string, string][] = [
  ["Can AI tell a plumbing emergency from a routine call?",
   "AI can sort calls and messages by the words customers use, such as burst pipe, flooding or sewage backup, and alert the on-call plumber at once. A person still decides what is an emergency and who goes out."],
  ["Should an AI tool give customers plumbing repair advice?",
   "No. A bot can tell a customer where the main water shutoff usually sits and to call for help, and nothing past that. Repair steps, gas line questions and water heater advice go to a licensed plumber."],
  ["Can AI write invoices and job summaries for plumbers?",
   "Yes, as drafts. A plumber types or dictates what they found and fixed, and a model writes a summary the customer can follow, with parts and labor in your format. The plumber checks each line before it goes out."],
  ["What plumbing customer data should stay out of AI tools?",
   "Keep card numbers, door and gate codes, alarm codes and lockbox combinations out of every AI chat. Use a business plan with training on customer chats turned off before staff paste in names, addresses or job notes."],
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TradeSchema slug={SLUG} qa={QA} about={["AI for plumbers", "Plumbing dispatch", "Plumbing job summaries", "Quote follow-up"]} />
      {children}
    </>
  );
}
