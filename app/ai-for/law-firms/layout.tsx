import type { ReactNode } from "react";
import { tradeMetadata, TradeSchema } from "../TradeParts";

// AI for law firms. No client claims: Purcell Ventures has no published law firm client.
// Ethics duties are stated in general terms only. The page gives no legal advice and says
// a bot never should either.

const SLUG = "law-firms";

export const metadata = tradeMetadata(
  SLUG,
  "How a small law firm can use AI for intake screening under strict confidentiality limits and for first drafts an attorney reviews, why a bot never gives legal advice, and what Purcell Ventures sets up.",
  ["AI for law firms", "AI legal intake", "AI for small law firms", "law firm chatbot", "AI document drafting for lawyers"],
);

export const QA: [string, string][] = [
  ["Can a law firm use ChatGPT for client work?",
   "Only within the firm's ethics duties on confidentiality and competence. The ABA addressed generative AI in Formal Opinion 512, and several state bars have issued their own guidance. Use a business plan with training on your data turned off, keep client confidences out of any tool the firm has not approved, and have an attorney review every output."],
  ["Can an AI chatbot do legal intake?",
   "It can collect contact details, the practice area, the other parties' names for a conflicts check, and key dates. It tells each visitor that no attorney-client relationship exists yet, asks for no confidential details, and never gives an opinion on the case."],
  ["Does AI make up case citations?",
   "Yes. General AI models can produce case names, quotes and citations that do not exist, and courts have sanctioned lawyers who filed them. Pull and read every cited authority in a trusted research service before anything goes out."],
  ["Will AI replace paralegals at a small firm?",
   "AI speeds up first drafts, summaries and intake notes. Paralegals still check the facts, manage deadlines and handle clients, and those checks matter more when a model writes the first version."],
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TradeSchema slug={SLUG} qa={QA} about={["AI for law firms", "Legal intake", "Legal document drafting", "Client confidentiality"]} />
      {children}
    </>
  );
}
