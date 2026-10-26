import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Elijah Purcell uses: tools, stack and setup",
  description:
    "Elijah Purcell's working tech stack: editor, languages, frameworks, AI, infrastructure, automation and hardware. He uses every tool listed in production work.",
  alternates: { canonical: "/uses" },
};

export default function UsesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
