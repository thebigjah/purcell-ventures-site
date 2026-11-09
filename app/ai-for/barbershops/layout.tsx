import type { ReactNode } from "react";
import { tradeMetadata, TradeSchema } from "../TradeParts";

// AI for barbershops. No client claims: Purcell Ventures has no published barbershop client.
// Kept distinct from /ai-for/salons: walk-ins next to appointments, booking per barber's
// chair, no-show reminders, and posts from cut photos with the client's permission.

const SLUG = "barbershops";

export const metadata = tradeMetadata(
  SLUG,
  "AI for barbershops: booking by barber, no-show reminders, shop questions, posts from cut photos and review replies, what stays with the barber, and our setup.",
  ["AI for barbershops", "barbershop booking app", "barber no-show reminders", "barbershop social media AI", "barbershop chatbot"],
);

export const QA: [string, string][] = [
  ["Can a barbershop take walk-ins and online bookings at the same time?",
   "Yes. Give each barber bookable hours and open walk-in hours, or keep one chair for walk-ins. The booking page shows only the bookable slots, and a chatbot can tell a customer which hours take walk-ins."],
  ["Do appointment reminders cut down on barbershop no-shows?",
   "A text the day before and a few hours before gives a customer an easy way to cancel or move the cut, which frees the chair for someone else. Pair the reminders with a written no-show policy the customer agrees to when booking."],
  ["Can AI write Instagram posts from photos of cuts?",
   "AI can draft a caption from the photo and the barber's notes on the cut, such as a low taper or a skin fade. The barber edits it and posts only photos the customer agreed to share."],
  ["What customer information should a barbershop keep out of AI tools?",
   "Keep card numbers, phone lists and any notes about a customer's skin or scalp out of AI chats. Customer names and cut notes belong in your booking system, which barbers can open without pasting them anywhere."],
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TradeSchema slug={SLUG} qa={QA} about={["AI for barbershops", "Barbershop booking", "No-show reminders", "Barbershop marketing"]} />
      {children}
    </>
  );
}
