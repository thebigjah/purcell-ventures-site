import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "10 free cold outreach templates — Purcell Ventures",
  description:
    "One cold email template per industry: salons, plumbing, dental, real estate, law, marketing agencies, e-commerce, wellness, vets, accounting. Free, no credit card.",
  openGraph: {
    title: "10 free cold outreach templates that actually get replies",
    description: "One per industry. Tested in production. No credit card.",
    url: "https://purcellventures.co/free",
    type: "website",
  },
  alternates: { canonical: "/free" },
};

export default function FreeLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
