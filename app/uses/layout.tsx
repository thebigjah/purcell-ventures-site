import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Elijah Purcell uses: tools, stack and setup",
  description:
    "The editor, languages, frameworks, AI services, hosting, automation tools and hardware Elijah Purcell uses for client and company work.",
  alternates: { canonical: "/uses" },
};

export default function UsesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
