import type { ReactNode } from "react";
import { tradeMetadata, TradeSchema } from "../TradeParts";

// AI for auto repair shops. No client claims: Purcell Ventures has no published auto
// repair client. Diagnosis, safety calls and the customer's authorization for work stay
// with people. Repair authorization rules are stated generally, since they vary by state.

const SLUG = "auto-repair-shops";

export const metadata = tradeMetadata(
  SLUG,
  "AI for auto repair shops: repair explanations from tech notes, status updates, service reminders and estimate drafts, what stays with the technician, and setup.",
  ["AI for auto repair shops", "auto repair AI estimates", "auto shop service reminders", "AI for mechanics", "auto repair customer updates"],
);

export const QA: [string, string][] = [
  ["Can AI diagnose car problems for an auto repair shop?",
   "AI can collect symptoms from a customer and suggest what a technician might check first. A technician still finds the fault with the car on the lift, the scan tool and a road test, and no bot tells a customer what is wrong."],
  ["Can AI write repair estimates for a mechanic?",
   "Yes, as drafts. A model can turn the technician's findings and your parts and labor lines into a plain-language estimate. The service advisor checks every price, part and labor time, and the customer approves the work through a person."],
  ["How can an auto shop send status updates without calling every customer?",
   "Your shop management system or a texting tool can send a message at each stage, such as checked in, waiting on parts and ready for pickup. AI helps write the wording so each update names the car and the next step."],
  ["What customer information should an auto shop keep out of AI tools?",
   "Keep card numbers, driver's license details, home addresses and key or lockbox codes out of AI chats. Use a business plan with training on chats turned off before staff paste in names, vehicle details or repair notes."],
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TradeSchema slug={SLUG} qa={QA} about={["AI for auto repair shops", "Repair estimates", "Service reminders", "Customer updates"]} />
      {children}
    </>
  );
}
