import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "How Elijah Purcell Works: Process and Commitments",
  description:
    "Our 5-stage engagement process from first email through year three. 6 written commitments: no surprise invoices, no vendor lock-in, honesty over closing. Read this before signing with us, or any agency.",
  keywords: [
    "purcell ventures process", "engagement process", "agency commitments",
    "how we work transparency", "small business AI process",
  ],
  openGraph: {
    title: "How Elijah Purcell Works | Purcell Ventures",
    description: "Our process, our commitments, when we say no. Honest engagement details before signing.",
    url: "https://purcellventures.co/how-we-work",
    type: "website",
  
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "/how-we-work" },
};

export default function HowWeWorkLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
