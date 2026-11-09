import type { ReactNode } from "react";
import { tradeMetadata, TradeSchema } from "../TradeParts";

// AI for cleaning companies. No client claims: Purcell Ventures has no published cleaning
// client. Chemical safety is stated in general terms (product labels and Safety Data Sheets).
// Kept distinct from /ai-for/landscapers: room counts, home access, keys and alarm codes.

const SLUG = "cleaning-companies";

export const metadata = tradeMetadata(
  SLUG,
  "AI for cleaning companies: quote intake from photos and room counts, scheduling and recurring cleaning reminders, and keeping home access details out of AI.",
  ["AI for cleaning companies", "AI for cleaning business", "cleaning quote from photos", "house cleaning scheduling", "cleaning company chatbot"],
);

export const QA: [string, string][] = [
  ["Can AI quote a house cleaning from photos?",
   "AI can turn photos, room counts and a short form into a clean quote request, and it can draft a price from your own rate sheet for a standard clean. The owner sets the final price for a first deep clean, a move-out or a home that needs more than the photos show."],
  ["Can AI handle cleaning company scheduling?",
   "Scheduling software books recurring cleans and assigns crews. AI helps write confirmations, reschedule notices and the note a crew reads before arriving. The owner or office manager decides who goes where when a cleaner calls in sick."],
  ["Can AI send recurring cleaning reminders?",
   "Yes. Your booking system sends the day-before reminder on schedule, and AI helps write the wording, including what the client should do to prepare. Marketing texts need the client's prior written consent under federal telemarketing rules."],
  ["What should a cleaning company keep out of AI tools?",
   "Keep door codes, alarm codes, key locations, payment details and notes about when a client is away out of AI chats. Those details belong in your scheduling software with access limited to the people who need them."],
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TradeSchema slug={SLUG} qa={QA} about={["AI for cleaning companies", "Cleaning quotes", "Cleaning crew scheduling", "Recurring cleaning reminders"]} />
      {children}
    </>
  );
}
