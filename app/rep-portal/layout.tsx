import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Rep Portal: Purcell Ventures",
  description: "Internal sales rep portal for Purcell Ventures.",
  robots: { index: false, follow: false },
};

export default function RepPortalLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
