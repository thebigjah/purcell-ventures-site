import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Readiness Test — 10 Questions, 3 Minutes",
  description:
    "A diagnostic for small business owners and team leaders. Score your AI readiness in 10 questions, get 3 calibrated next-step recommendations, no email capture. From Elijah Purcell.",
  alternates: { canonical: "/ai-readiness" },
};

export default function AIReadinessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
