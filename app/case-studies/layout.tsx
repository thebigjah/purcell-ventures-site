import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies: Software Elijah Purcell Has Shipped",
  description:
    "Real teams. Real workflows. Real hours saved. Case studies from Elijah Purcell's AI consulting work, published with each client's explicit permission.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
