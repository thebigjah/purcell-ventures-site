import type { ReactNode } from "react";
import { tradeMetadata, TradeSchema } from "../TradeParts";

// AI for restaurants. No client claims: Purcell Ventures has no published restaurant client.
// Allergen answers come only from a list a person keeps current, and the bot hands any
// allergy question it cannot answer from that list to staff.

const SLUG = "restaurants";

export const metadata = tradeMetadata(
  SLUG,
  "AI for restaurants: menu questions, review replies and catering inquiries, and why allergen answers need a written list and a person to back them up.",
  ["AI for restaurants", "restaurant chatbot", "AI review replies for restaurants", "restaurant catering inquiries AI", "AI menu questions"],
);

export const QA: [string, string][] = [
  ["Can an AI chatbot answer allergy questions for a restaurant?",
   "Only from a written allergen list a person keeps current, and only for questions that list answers. When a guest asks about cross-contact, a dish off the list or anything the bot is unsure of, it hands the question to staff and tells the guest to speak with the server or manager."],
  ["Should a restaurant use AI to reply to Google and Yelp reviews?",
   "AI drafts help a manager reply to every review in less time. A person reads each draft, adds a real detail from the visit and handles complaints about illness or safety directly and offline."],
  ["Can AI handle restaurant catering inquiries?",
   "AI can collect the date, headcount, location, budget and dietary needs, then draft a reply with your catering menu. The manager confirms availability, sets the final price and signs off on the order."],
  ["Can AI take restaurant phone orders?",
   "AI voice ordering products exist from other vendors. Test one with your own calls, including allergy requests, before you trust it with guests. Purcell Ventures does not sell a phone answering or ordering product."],
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TradeSchema slug={SLUG} qa={QA} about={["AI for restaurants", "Menu questions", "Review replies", "Catering inquiries"]} />
      {children}
    </>
  );
}
