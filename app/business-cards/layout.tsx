import type { Metadata } from "next";
import type { ReactNode } from "react";

// The page is a client component, so its metadata lives here. Without this file it
// carried the homepage title and description and no canonical.
// Full title with the root template: "Business card designs, Purcell Ventures" (41 characters).
export const metadata: Metadata = {
  title: "Business card designs",
  description:
    "Eight business card designs built around a diagonal gold slash. The Purcell Ventures and Mantle Field Services cards come with PDF and PNG print files.",
  alternates: { canonical: "/business-cards" },
};

export default function BusinessCardsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
