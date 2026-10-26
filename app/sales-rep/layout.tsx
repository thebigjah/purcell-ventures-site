import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sales Representative: Join Purcell Ventures",
  description:
    "Commission-based sales role for Purcell Ventures and Mantle Field Services. 15 to 20% on closed deals, flat bonuses on subscriptions, 1099 contractor. Quiz prep and application details.",
  keywords: [
    "sales rep commission", "1099 sales role Georgia", "Purcell Ventures hiring",
    "commission sales representative", "Acworth Atlanta sales",
  ],
  openGraph: {
    title: "Sales Representative: Purcell Ventures",
    description:
      "Commission-based sales role. 15 to 20% on closed deals, flat bonuses on subscriptions. Apply with a quiz and a phone interview.",
    url: "https://purcellventures.co/sales-rep",
    type: "website",
  
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Sales Representative: Purcell Ventures",
    description:
      "Commission-based sales role. Apply with a quiz and a phone interview.",
  },
  alternates: { canonical: "/sales-rep" },
  robots: {
    index: false, // unlisted, only people with the link should find this
    follow: false,
  },
};

export default function SalesRepLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
