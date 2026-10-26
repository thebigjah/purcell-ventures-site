import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sales representative, commission only",
  description:
    "A commission-based sales role for Purcell Ventures and Mantle Field Services as a 1099 contractor: 15 to 20% on closed deals and flat bonuses on subscriptions. Quiz preparation and application details.",
  keywords: [
    "sales rep commission", "1099 sales role Georgia", "Purcell Ventures hiring",
    "commission sales representative", "Acworth Atlanta sales",
  ],
  openGraph: {
    title: "Sales representative at Purcell Ventures",
    description:
      "A commission-based sales role: 15 to 20% on closed deals and flat bonuses on subscriptions. The application is a quiz and a phone interview.",
    url: "https://purcellventures.co/sales-rep",
    type: "website",
  
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Sales representative at Purcell Ventures",
    description:
      "A commission-based sales role. The application is a quiz and a phone interview.",
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
