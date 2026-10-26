import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Elijah Purcell is working on now",
  description:
    "What Elijah Purcell is building and studying this month: Purcell Ventures, COSMIC, the courses, UA Today and his first semester at the University of Alabama.",
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
