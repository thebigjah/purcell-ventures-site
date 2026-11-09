import type { ReactNode } from "react";
import { tradeMetadata, TradeSchema } from "../TradeParts";

// AI for med spas. No client claims: Purcell Ventures has no published med spa client.
// HIPAA is stated in general terms only, including that whether it applies depends on the
// practice. No medical answers, candidacy decisions or new aftercare text from a bot.

const SLUG = "med-spas";

export const metadata = tradeMetadata(
  SLUG,
  "AI for med spas: booking, consult intake and aftercare from approved templates, with medical and HIPAA cautions and clinical calls left to licensed staff.",
  ["AI for med spas", "med spa AI chatbot", "med spa booking", "med spa aftercare instructions", "HIPAA AI med spa"],
);

export const QA: [string, string][] = [
  ["Does HIPAA apply to a med spa?",
   "HIPAA applies to covered entities, which include health care providers that send certain transactions electronically, such as insurance claims. Whether that includes your med spa depends on how it operates and bills, and state privacy laws can apply either way. Ask your own counsel or compliance advisor, and treat client health details as protected in the meantime."],
  ["Can a med spa chatbot answer questions about injectables or lasers?",
   "It can answer general questions from text your medical director approves, such as what a treatment is, how long an appointment takes and how to prepare. Whether a client is a good candidate, what dose they need and how a medication interacts with a treatment go to a licensed provider."],
  ["Can AI write aftercare instructions for a med spa?",
   "AI can help format and send aftercare instructions that your medical director has already written and approved. It should never write new medical instructions on its own or change approved wording for one client."],
  ["Can AI handle med spa consultation intake?",
   "A booking form can collect contact details, the treatment of interest and scheduling preferences. Health history, medications and photos belong in a system built for health data, with the right agreements in place, and a licensed provider reviews them at the consult."],
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TradeSchema slug={SLUG} qa={QA} about={["AI for med spas", "Med spa booking", "Med spa aftercare", "HIPAA"]} />
      {children}
    </>
  );
}
