import type { ReactNode } from "react";
import { tradeMetadata, TradeSchema } from "../TradeParts";

// AI for veterinary clinics. No client claims: Purcell Ventures has no published veterinary
// client. HIPAA covers human health information, so the page names state veterinary record
// rules in general terms instead. No medical advice or triage from a bot.

const SLUG = "veterinary-clinics";

export const metadata = tradeMetadata(
  SLUG,
  "AI for veterinary clinics: appointment reminders, vaccine recalls and new-client intake, with medical questions and triage left to the veterinary team.",
  ["AI for veterinary clinics", "veterinary AI chatbot", "vet vaccine reminders", "veterinary clinic intake", "AI for animal hospitals"],
);

export const QA: [string, string][] = [
  ["Does HIPAA apply to veterinary records?",
   "HIPAA protects human health information, so it does not cover pet medical records. Many states have their own veterinary record confidentiality rules, and client names, addresses and payment details deserve care either way. Your state veterinary board or counsel can confirm what applies."],
  ["Can AI send vaccine and wellness reminders for a vet clinic?",
   "Your practice management software knows when each pet is due and can send the reminders on schedule. AI helps write clear, friendly wording for each reminder type. Pet and client records stay inside the software that already holds them."],
  ["Should a vet clinic chatbot answer pet health questions?",
   "No. A bot can share your hours, services, new-client steps and what to bring, from answers your clinic writes. Any question about symptoms, medications or whether a pet needs a visit goes to the veterinary team, and an emergency goes to a vet or emergency hospital at once."],
  ["Can AI help with new-client intake at a vet clinic?",
   "AI can help rewrite a paper intake form into a shorter online form with plain questions and draft the welcome email. The form itself should live in your practice software or a form tool that feeds it, and the veterinary team reviews the history before the visit."],
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TradeSchema slug={SLUG} qa={QA} about={["AI for veterinary clinics", "Vaccine reminders", "Veterinary client intake", "Veterinary records"]} />
      {children}
    </>
  );
}
