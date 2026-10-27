import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { absolute: "Free online estimate builder, Purcell Ventures" },
  description: "Build job quotes from labor and material line items, then print them or save a PDF. Free, no signup, and estimates stay on your device.",
  alternates: { canonical: "/digital/estimating" },
  openGraph: { title: "Free online estimate builder, Purcell Ventures", description: "Build job quotes from labor and material line items, then print them or save a PDF. Free, no signup, and estimates stay on your device.", url: "https://purcellventures.co/digital/estimating", type: "website", images: ["/opengraph-image"] },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
