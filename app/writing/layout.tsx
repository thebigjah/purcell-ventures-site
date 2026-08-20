import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing: Selected Prose",
  description:
    "Selected original prose from Elijah Purcell. Biblical metaphor, mythological allegory, and confessional yearning.",
  alternates: { canonical: "/writing" },
};

export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
