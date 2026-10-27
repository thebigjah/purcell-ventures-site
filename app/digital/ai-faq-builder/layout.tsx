import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { absolute: "Free AI FAQ builder for small businesses, Purcell Ventures" },
  description: "Describe your business and get 6 to 10 questions and answers written the way customers ask them, ready to paste onto your site. Free, no signup.",
  alternates: { canonical: "/digital/ai-faq-builder" },
  openGraph: { title: "Free AI FAQ builder for small businesses, Purcell Ventures", description: "Describe your business and get 6 to 10 questions and answers written the way customers ask them, ready to paste onto your site. Free, no signup.", url: "https://purcellventures.co/digital/ai-faq-builder", type: "website", images: ["/opengraph-image"] },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
