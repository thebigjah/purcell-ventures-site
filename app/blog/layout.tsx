import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Blog — Purcell Ventures",
  description:
    "Essays and operational guides on small business AI tooling. Specific, practical, written by people running real systems — not consultants writing about consulting.",
  keywords: [
    "small business AI blog", "AI for small business",
    "AI tools writing", "purcell ventures blog",
  ],
  openGraph: {
    title: "Blog — Purcell Ventures",
    description: "Essays on small business AI, written by people running real systems.",
    url: "https://purcellventures.co/blog",
    type: "website",
  },
  alternates: { canonical: "/blog" },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
