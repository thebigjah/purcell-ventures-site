import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purcell Ventures Partners",
  description:
    "Businesses that work with Purcell Ventures on AI, automation, search and their websites, with links to each one.",
  alternates: { canonical: "/partners" },
};

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://purcellventures.co" },
    { "@type": "ListItem", position: 2, name: "Partners", item: "https://purcellventures.co/partners" },
  ],
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      {children}
    </>
  );
}
