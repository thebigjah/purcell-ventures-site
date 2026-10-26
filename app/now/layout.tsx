import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now: What Elijah Purcell Is Focused On",
  description:
    "An old-internet /now page from Elijah Purcell: what I'm building, studying, figuring out, practicing, reading and wrestling with.",
  alternates: { canonical: "/now" },
};


const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://purcellventures.co"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Now",
      "item": "https://purcellventures.co/now"
    }
  ]
};

export default function NowLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      {children}
    </>
  );
}
