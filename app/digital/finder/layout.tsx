import type { Metadata } from "next";
import type { ReactNode } from "react";

// A sales tool for Elijah and his reps, not a page for customers, so search engines skip it.
export const metadata: Metadata = {
  title: { absolute: "Business finder, Purcell Ventures" },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
