import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verses: five scriptures Elijah Purcell returns to",
  description:
    "Five scriptures Elijah Purcell comes back to, quoted from the NASB: Romans 8:28, Matthew 5:10, Romans 1:16, Proverbs 3:5-6 and Psalm 139:13, with his reason for each.",
  alternates: { canonical: "/verses" },
};

export default function VersesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
