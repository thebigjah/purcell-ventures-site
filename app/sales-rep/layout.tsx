import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sales Representative: Join Purcell Ventures",
  description:
    "Commission-based sales role for Purcell Ventures + Mantle Field Services. 15–20% on closed deals, flat bonuses on subscriptions, 1099 contractor. Quiz-prep + application info inside.",
  keywords: [
    "sales rep commission", "1099 sales role Georgia", "Purcell Ventures hiring",
    "commission sales representative", "Acworth Atlanta sales",
  ],
  openGraph: {
    title: "Sales Representative: Purcell Ventures",
    description:
      "Commission-based sales role. 15–20% on closed deals, flat bonuses on subscriptions. Apply via 25-min quiz + interview.",
    url: "https://purcellventures.co/sales-rep",
    type: "website",
  },
  twitter: {
    title: "Sales Representative: Purcell Ventures",
    description:
      "Commission-based sales role. Apply via 25-min quiz + interview.",
  },
  alternates: { canonical: "/sales-rep" },
  robots: {
    index: false, // unlisted — only people with the link should find this
    follow: false,
  },
};

export default function SalesRepLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
