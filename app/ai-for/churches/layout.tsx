import type { ReactNode } from "react";
import { tradeMetadata, TradeSchema } from "../TradeParts";

// AI for churches. No client claims: Purcell Ventures has no published church client.
// Prayer requests and pastoral care notes never go into AI tools, and no page here has a
// bot teach doctrine. Music licensing is stated in general terms only.

const SLUG = "churches";

export const metadata = tradeMetadata(
  SLUG,
  "How a church can use AI for sermon clips and summaries, volunteer scheduling and the weekly newsletter, what stays with the pastor and staff, and what Purcell Ventures sets up.",
  ["AI for churches", "church sermon clips AI", "church volunteer scheduling", "church newsletter AI", "AI for ministry"],
);

export const QA: [string, string][] = [
  ["Is it appropriate for a church to use AI?",
   "Each church decides its own limits, and AI fits administrative work such as summaries, schedules and newsletters. A good line keeps AI on logistics and drafts while the pastor and staff keep teaching, counseling and prayer."],
  ["Can AI write a sermon?",
   "A model can produce text that looks like a sermon, and many pastors see preaching as their own study and calling before God. AI fits better after the sermon, turning the pastor's own message into a summary, clips and discussion questions the pastor approves."],
  ["Can AI make sermon clips for social media?",
   "Yes. Clipping tools find short sections of a sermon video and add captions. A person picks the final clips so each one keeps its context and matches what the pastor meant, and checks any music in the clip."],
  ["What church information should stay out of AI tools?",
   "Keep prayer requests, counseling and pastoral care notes, giving records, and anything about children out of AI chats. Member contact lists belong in your church management system, which staff can use without pasting the list anywhere."],
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TradeSchema slug={SLUG} qa={QA} about={["AI for churches", "Sermon clips", "Volunteer scheduling", "Church communications"]} />
      {children}
    </>
  );
}
