import type { ReactNode } from "react";
import { tradeMetadata, TradeSchema } from "../TradeParts";

// AI for salons. No client claims: Purcell Ventures has no published salon client.
// Kept distinct from /ai-for/barbershops: longer multi-service bookings, color
// consultations with the stylist, and patch-test and allergy notes kept out of AI tools.

const SLUG = "salons";

export const metadata = tradeMetadata(
  SLUG,
  "AI for salons: multi-service booking, rebooking reminders, service and price questions and social captions, what stays with the stylist, and what we set up.",
  ["AI for salons", "salon AI booking", "salon rebooking reminders", "AI for hair salons", "salon chatbot"],
);

export const QA: [string, string][] = [
  ["Can AI book salon appointments?",
   "Yes. An online booking page or a website chatbot can book single services and longer color appointments into each stylist's real calendar at any hour. Set the length and gap rules for every service first, and send anything unusual, such as a color correction, to the stylist."],
  ["Can AI recommend a hair color for a client?",
   "AI can show a client general photos and terms to bring to the appointment. The stylist chooses the formula after seeing the hair in person, checking its history and running any patch or strand test the color line calls for."],
  ["Should a salon use AI to write Instagram captions?",
   "Yes, as a draft. Give the tool the service, the products and the stylist's name, then edit the caption so it sounds like your salon. Post photos of a client only with that client's permission."],
  ["What client information should a salon keep out of AI tools?",
   "Keep allergy and patch-test results, skin and scalp conditions, medications, card numbers and home addresses out of AI chats. Those notes belong in your booking system, which staff can reach without pasting them anywhere."],
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TradeSchema slug={SLUG} qa={QA} about={["AI for salons", "Salon booking", "Client rebooking", "Salon marketing"]} />
      {children}
    </>
  );
}
