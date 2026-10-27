import type { Metadata } from "next";
import type { ReactNode } from "react";

// Internal reference page. It borrowed the homepage title, so search engines skip it.
export const metadata: Metadata = {
  title: { absolute: "Brand system, Purcell Ventures" },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
