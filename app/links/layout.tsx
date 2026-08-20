import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Links: Everything from Elijah Purcell",
  description:
    "All the places Elijah Purcell lives on the internet, work, courses, personal pages, sister brand, and direct contact. One link from the bio.",
  alternates: { canonical: "/links" },
};

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
