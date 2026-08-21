import type { Metadata } from "next";
import type { ReactNode } from "react";

// /free is a lead-magnet that funnels into /shop products, treated like /shop:
// PV-owned legally but hidden from public PV brand surface. Direct URL access only.
export const metadata: Metadata = {
  title: "10 free cold outreach templates",
  description: "One cold email template per industry. Free, no credit card.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true, "max-image-preview": "none" },
  },
  alternates: { canonical: undefined },
};

export default function FreeLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
