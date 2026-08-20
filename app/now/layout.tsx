import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now: What Elijah Purcell Is Focused On",
  description:
    "An old-internet /now page from Elijah Purcell, what I'm building, studying, going, practicing, reading, and wrestling with right now (May 2026).",
  alternates: { canonical: "/now" },
};

export default function NowLayout({ children }: { children: React.ReactNode }) {
  return children;
}
