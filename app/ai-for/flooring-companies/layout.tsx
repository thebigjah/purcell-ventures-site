import type { ReactNode } from "react";
import { tradeMetadata, TradeSchema } from "../TradeParts";

// AI for flooring companies. No client claims: Purcell Ventures has no published flooring
// client, and family work never appears on the site (see app/portfolio/page.tsx).

const SLUG = "flooring-companies";

export const metadata = tradeMetadata(
  SLUG,
  "AI for flooring companies: estimate write-ups from measurements, quote follow-ups, showroom questions and review replies, what stays with the installer.",
  ["AI for flooring companies", "flooring estimate software AI", "flooring quote follow-up", "AI for flooring contractors", "flooring chatbot"],
);

export const QA: [string, string][] = [
  ["Can AI measure a room for a flooring estimate?",
   "No AI tool should replace a tape or laser measure on site. AI can take the measurements your estimator records and write them up as a clean quote, with waste and transitions listed the way you price them. The estimator checks every number."],
  ["Can a chatbot answer flooring product questions on my website?",
   "Yes, if you write the answers it may give: the product lines you carry, care instructions, your service area and how to book a measure. Anything about a specific floor, subfloor or moisture problem goes to a person."],
  ["How should a flooring company follow up on quotes with AI?",
   "Send every open quote a short follow-up on fixed days, with the customer's product and room named. AI drafts the wording, a scheduling tool sends it, and the owner calls the quotes that answer."],
  ["What flooring customer data should stay out of AI tools?",
   "Keep card numbers, lockbox and door codes and home security details out of every AI chat. Use a business plan with training on your chats turned off before staff paste in names, addresses or job notes."],
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TradeSchema slug={SLUG} qa={QA} about={["AI for flooring companies", "Flooring estimates", "Quote follow-up", "Flooring customer service"]} />
      {children}
    </>
  );
}
