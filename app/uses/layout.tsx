import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses — What I Actually Use",
  description:
    "Elijah Purcell's working tech stack: editor, languages, frameworks, AI, infrastructure, automation, hardware. Every tool in active production use.",
  alternates: { canonical: "/uses" },
};

export default function UsesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
