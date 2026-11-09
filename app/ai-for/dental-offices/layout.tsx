import type { ReactNode } from "react";
import { tradeMetadata, TradeSchema } from "../TradeParts";

// AI for dental offices. No client claims: Purcell Ventures has no published dental client.
// HIPAA is stated in general terms only. No legal advice and no clinical answers from a bot.

const SLUG = "dental-offices";

export const metadata = tradeMetadata(
  SLUG,
  "How a dental office can use AI for recall reminders, insurance questions and new-patient forms, the HIPAA cautions that apply to patient data, what stays with clinical staff, and what Purcell Ventures sets up.",
  ["AI for dental offices", "dental AI chatbot", "dental recall reminders", "HIPAA AI tools", "AI for dental practices"],
);

export const QA: [string, string][] = [
  ["Is ChatGPT HIPAA compliant for a dental office?",
   "A consumer chat account is the wrong place for patient health information. Use an AI tool for patient data only when the vendor signs a business associate agreement with your practice and your settings match it. Ask your own counsel or compliance advisor to confirm your setup."],
  ["Can an AI chatbot answer dental insurance questions?",
   "Yes, for general ones, such as which plans you accept and how billing works, from answers your office writes down. Questions about one patient's coverage, benefits left or claim status go to your front desk."],
  ["Can AI send dental recall and hygiene reminders?",
   "Your practice management software or a reminder service sends the messages on schedule. AI helps write friendly wording for each reminder type. Patient details stay inside the system that already holds them."],
  ["Should a dental chatbot answer questions about pain or symptoms?",
   "No. A bot can collect the request and offer the next open appointment, but any question about pain, swelling, bleeding or medication goes to clinical staff. Severe swelling or trouble breathing calls for emergency care."],
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TradeSchema slug={SLUG} qa={QA} about={["AI for dental offices", "Dental recall reminders", "Dental insurance questions", "HIPAA"]} />
      {children}
    </>
  );
}
