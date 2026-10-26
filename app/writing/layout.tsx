import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing: selected prose",
  description:
    "Selected prose by Elijah Purcell: a retelling of the prodigal son and a mythological allegory.",
  alternates: { canonical: "/writing" },
  // Personal writing stays out of search engines.
  robots: { index: false, follow: false, noarchive: true },
};

export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
