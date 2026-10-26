import type { Metadata } from "next";
import type { ReactNode } from "react";

// A private working tool. It stays live and working, and search engines are told not to
// index it or follow its links.
export const metadata: Metadata = {
  title: "CRM",
  robots: { index: false, follow: false },
};

export default function CRMLayout({ children }: { children: ReactNode }) {
  return children;
}
