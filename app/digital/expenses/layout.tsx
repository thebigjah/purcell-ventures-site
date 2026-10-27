import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { absolute: "Free expense tracker for small businesses, Purcell Ventures" },
  description: "Log expenses as they happen, filter by month and export a CSV at tax time. Free, no signup, and data stays on your device.",
  alternates: { canonical: "/digital/expenses" },
  openGraph: { title: "Free expense tracker for small businesses, Purcell Ventures", description: "Log expenses as they happen, filter by month and export a CSV at tax time. Free, no signup, and data stays on your device.", url: "https://purcellventures.co/digital/expenses", type: "website", images: ["/opengraph-image"] },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
