import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "How Elijah Purcell Works: Process and Commitments",
  description:
    "Our 5-stage process from the first email through year three, and the 6 commitments in every contract, including no surprise invoices and no vendor lock-in.",
  keywords: [
    "purcell ventures process", "engagement process", "agency commitments",
    "how we work transparency", "small business AI process",
  ],
  openGraph: {
    title: "How Elijah Purcell Works | Purcell Ventures",
    description: "Our 5-stage process, 6 commitments and the work we turn down.",
    url: "https://purcellventures.co/how-we-work",
    type: "website",
  
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "/how-we-work" },
};

export default function HowWeWorkLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
