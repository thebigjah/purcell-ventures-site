import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Elijah Purcell's Portfolio: Shipped Software and AI Projects",
  description:
    "10 live products, mobile apps, AI tools, and internal systems we've built. Web apps in Next.js + React, native mobile in Expo, automation pipelines in Python. Everything ships, everything's used.",
  keywords: [
    "purcell ventures portfolio", "shipped projects", "next.js web apps",
    "expo mobile apps", "ai tools built", "Atlanta software developer",
  ],
  openGraph: {
    title: "Portfolio: what we've built at Purcell Ventures",
    description: "10 live products: web apps, mobile apps, AI tools, internal systems. Real shipped work.",
    url: "https://purcellventures.co/portfolio",
    type: "website",
  },
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
