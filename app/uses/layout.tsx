import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools and setup Elijah Purcell uses",
  description:
    "The editor, languages, frameworks, AI services, hosting, automation tools and hardware Elijah Purcell uses for client and company work.",
  alternates: { canonical: "/uses" },
};

export default function UsesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
