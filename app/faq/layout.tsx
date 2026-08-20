import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ: Common Questions",
  description:
    "Frequently asked questions about working with Elijah Purcell, AI consulting, digital services, custom software, courses, and the company.",
  alternates: { canonical: "/faq" },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
