import type { ReactNode } from "react";
import { tradeMetadata, TradeSchema } from "../TradeParts";

// AI for photographers. No client claims: Purcell Ventures has no published photography
// client. Copyright and model releases are stated in general terms only. The photographer
// makes every culling and editing choice.

const SLUG = "photographers";

export const metadata = tradeMetadata(
  SLUG,
  "AI for photographers: inquiry replies, session prep guides and culling help with the photographer making every pick, plus the client photo privacy cautions.",
  ["AI for photographers", "AI for photography business", "photography inquiry replies", "AI photo culling", "session prep guide"],
);

export const QA: [string, string][] = [
  ["Can AI reply to photography inquiries?",
   "AI can draft a reply from your own packages, prices and availability, and an email tool can send it fast. Read each draft before it goes out, and make sure every price, date and package matches what you actually offer. A wrong quote in a first reply is hard to take back."],
  ["Should photographers use AI to cull photos?",
   "AI culling tools can flag blinks, missed focus and near-duplicates to speed up a first pass. The photographer makes every final pick, since the tool cannot judge the moment, the story of the day or what a client cares about."],
  ["Is it safe to upload client photos to AI tools?",
   "Read the tool's terms first. Choose tools that do not train on your uploads, and get your client's permission before their images go anywhere outside your own storage. Take extra care with photos of children, boudoir sessions and anything a client marked private."],
  ["Can AI write a session prep guide for clients?",
   "Yes, as a first draft. Give the tool your own advice on outfits, timing, locations and what to bring, and it returns a clean guide for each session type. Edit it so it sounds like you and matches how you actually shoot."],
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TradeSchema slug={SLUG} qa={QA} about={["AI for photographers", "Photography inquiry replies", "Photo culling", "Client photo privacy"]} />
      {children}
    </>
  );
}
