import type { ReactNode } from "react";
import { tradeMetadata, TradeSchema } from "../TradeParts";

// AI for HVAC companies. No client claims: Purcell Ventures has no published HVAC client.
// Purcell Ventures does not sell a phone answering product (see /ai-automation), so the
// after-hours section names the website chat and form route it does sell.

const SLUG = "hvac-companies";

export const metadata = tradeMetadata(
  SLUG,
  "AI for HVAC companies: after-hours call capture, maintenance-plan reminders and estimate write-ups from tech notes, and what stays with a technician.",
  ["AI for HVAC companies", "HVAC AI answering", "HVAC maintenance plan reminders", "AI for HVAC estimates", "HVAC chatbot"],
);

export const QA: [string, string][] = [
  ["Can AI book HVAC service calls?",
   "Yes, for routine requests. An online booking page or website chat can take the address, the problem and a time window and place the job on your calendar. A dispatcher still confirms the slot, and any call that mentions gas, smoke or carbon monoxide goes to a person."],
  ["Is an AI phone answering service worth it for an HVAC company?",
   "It can be if you miss calls after hours and someone calls every captured lead back the next morning. Test it with your own calls first, and make sure it hands emergencies to a person. Purcell Ventures does not sell a phone answering product."],
  ["Can AI write HVAC proposals and estimates?",
   "AI can turn a technician's notes and the parts list into a clean written estimate or proposal. The technician or owner sets the equipment, the price and the scope, and checks each line before the customer sees it."],
  ["What customer information should an HVAC company keep out of AI tools?",
   "Keep card numbers, door and gate codes, alarm codes and lockbox combinations out of every AI chat. Use a business plan with training on customer chats turned off before staff paste in names, addresses or job notes."],
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TradeSchema slug={SLUG} qa={QA} about={["AI for HVAC companies", "HVAC service scheduling", "Maintenance agreements", "HVAC estimates"]} />
      {children}
    </>
  );
}
