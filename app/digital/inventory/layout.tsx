import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { absolute: "Free inventory tracker with low-stock alerts, Purcell Ventures" },
  description: "A product list with stock levels and low-stock alerts for a small shop. Free, no signup, and inventory stays on your device.",
  alternates: { canonical: "/digital/inventory" },
  openGraph: { title: "Free inventory tracker with low-stock alerts, Purcell Ventures", description: "A product list with stock levels and low-stock alerts for a small shop. Free, no signup, and inventory stays on your device.", url: "https://purcellventures.co/digital/inventory", type: "website", images: ["/opengraph-image"] },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
