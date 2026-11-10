import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Booking, CRM and AI tools for small businesses",
  description:
    "Booking, a CRM, an AI chatbot and 23 more add-ons for small businesses, built and maintained for you. Every plan is quoted for your business after a free call.",
  keywords: [
    "digital services small business", "AI chatbot for website", "business website management",
    "CRM for small business", "email marketing automation", "booking system",
    "social media scheduling", "website plus AI tools",
  ],
  openGraph: {
    title: "Digital add-ons for small businesses, Purcell Ventures",
    description:
      "Booking, a CRM, an AI chatbot and 23 more add-ons for small businesses. Every plan is quoted for your business after a free call.",
    url: "https://purcellventures.co/digital",
    type: "website",
  
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Digital add-ons, Purcell Ventures",
    description: "Booking, a CRM, an AI chatbot and 23 more add-ons for small businesses. Every plan is quoted for your business after a free call.",
  },
  // No canonical here. This layout wraps every /digital child route and Next
  // inherits it, so until 27 Oct 2026 all eight demos told Google they were
  // copies of /digital. /digital sets its own in page.tsx, each demo in its layout.
};

// The /digital Service node, its FAQPage and its breadcrumb live in app/digital/page.tsx.
// Rendered here they were stamped onto every /digital/* route, so 38 pages claimed to be
// the digital services page and carried its FAQ without showing it.

export default function DigitalLayout({ children }: { children: ReactNode }) {
  return children;
}
