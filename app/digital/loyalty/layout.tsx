import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { absolute: "Free digital loyalty punch card, Purcell Ventures" },
  description: "A digital punch card for repeat customers: add a punch each visit and redeem the reward when the card fills. Free, no signup.",
  alternates: { canonical: "/digital/loyalty" },
  openGraph: { title: "Free digital loyalty punch card, Purcell Ventures", description: "A digital punch card for repeat customers: add a punch each visit and redeem the reward when the card fills. Free, no signup.", url: "https://purcellventures.co/digital/loyalty", type: "website", images: ["/opengraph-image"] },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
