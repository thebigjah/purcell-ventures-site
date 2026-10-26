import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "How Elijah Purcell works with clients",
  description:
    "The five stages of a project with Elijah Purcell, from the first email to year three, and the six commitments written into every contract, including no surprise invoices and no vendor lock-in.",
  keywords: [
    "purcell ventures process", "engagement process", "agency commitments",
    "how we work transparency", "small business AI process",
  ],
  openGraph: {
    title: "How Elijah Purcell works",
    description: "Five stages, six written commitments, and the work I turn down.",
    url: "https://purcellventures.co/how-we-work",
    type: "website",
  
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "/how-we-work" },
};

export default function HowWeWorkLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
