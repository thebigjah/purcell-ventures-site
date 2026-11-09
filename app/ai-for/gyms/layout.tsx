import type { ReactNode } from "react";
import { tradeMetadata, TradeSchema } from "../TradeParts";

// AI for gyms. No client claims: Purcell Ventures has no published gym client.
// Health club contract laws are mentioned in general terms only. No medical, injury or
// nutrition advice from a bot.

const SLUG = "gyms";

export const metadata = tradeMetadata(
  SLUG,
  "AI for gyms and fitness studios: trial member follow-up, class schedule questions and retention messages, and the health and billing calls that stay with staff.",
  ["AI for gyms", "gym AI chatbot", "fitness studio AI", "gym member retention", "gym trial follow-up"],
);

export const QA: [string, string][] = [
  ["Can AI follow up with gym trial members?",
   "Yes. Your member software or a texting tool sends a short series of messages during and after the trial, and AI helps write them in your gym's voice. A staff member takes over the moment a person replies with a question or wants to talk about a membership."],
  ["Can a gym chatbot answer class schedule questions?",
   "Yes, when it reads from your live schedule or a list your staff keep current. It can answer class times, which coach leads a class, what to bring and how to book. Update it the same day a class moves, or it will give out last week's times."],
  ["Should a gym chatbot give workout or diet advice?",
   "No. A bot can describe your classes and programs from answers you write. Questions about injuries, medical conditions, pregnancy or diet go to a qualified coach or the member's own doctor."],
  ["Can AI handle gym membership cancellations?",
   "A bot can explain your written cancellation steps and collect the request, then a staff member processes it. Many states have their own laws on health club contracts and cancellations, so your counsel should approve the wording."],
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TradeSchema slug={SLUG} qa={QA} about={["AI for gyms", "Gym trial follow-up", "Gym class schedules", "Member retention"]} />
      {children}
    </>
  );
}
