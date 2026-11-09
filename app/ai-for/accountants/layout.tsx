import type { ReactNode } from "react";
import { tradeMetadata, TradeSchema } from "../TradeParts";

// AI for accountants. No client claims: Purcell Ventures has no published accounting client.
// Taxpayer data rules (IRS Publication 4557, the FTC Safeguards Rule, section 7216) are named
// in general terms only. No tax advice from a bot.

const SLUG = "accountants";

export const metadata = tradeMetadata(
  SLUG,
  "AI for accountants and tax preparers: document intake checklists, engagement letter drafts and tax-season FAQs, with strict limits on client financial data.",
  ["AI for accountants", "AI for tax preparers", "AI for CPA firms", "tax season chatbot", "accounting firm AI tools"],
);

export const QA: [string, string][] = [
  ["Can I paste a client's tax return into ChatGPT?",
   "Keep client returns, Social Security numbers and bank details out of consumer AI chat accounts. Federal rules limit how a tax preparer may use or disclose return information, so use AI on client data only through a tool your firm has approved in writing, and ask your own counsel or professional body to confirm your setup."],
  ["Can AI answer tax questions for my clients?",
   "A chatbot can answer questions about your firm, such as deadlines for sending documents, your fees, your portal and your hours, from answers you write. Questions about one client's taxes, deductions or penalties go to a preparer, since a model can state a wrong answer with full confidence."],
  ["How can AI help with client document collection?",
   "AI can draft a document checklist for each client type, such as a W-2 household, a sole proprietor or a rental owner, and write the reminder emails that go with it. The documents themselves go into your secure portal, never into a chat window."],
  ["Can AI write engagement letters?",
   "AI can produce a first draft from your own template and the facts of the engagement. A partner or the preparer who owns the engagement reviews the scope, fees and terms and signs it, since the letter defines what your firm is responsible for."],
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TradeSchema slug={SLUG} qa={QA} about={["AI for accountants", "Tax document intake", "Engagement letters", "Taxpayer data security"]} />
      {children}
    </>
  );
}
