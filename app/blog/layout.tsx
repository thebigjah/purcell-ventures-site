import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Writing by Elijah Purcell",
  description:
    "Essays and operational guides on small business AI tooling. Specific, practical, written by people running real systems, not consultants writing about consulting.",
  keywords: [
    "small business AI blog", "AI for small business",
    "AI tools writing", "purcell ventures blog",
  ],
  openGraph: {
    title: "Writing by Elijah Purcell",
    description: "Essays on small business AI, written by people running real systems.",
    url: "https://purcellventures.co/blog",
    type: "website",
  },
  // NO canonical here. This layout wraps every post as well as the index, and Next
  // inherits it, so a canonical pointing at "/blog" told Google that all nine posts
  // were duplicates of the index page. Each post declares its own below.
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
