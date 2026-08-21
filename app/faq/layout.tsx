import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ: Common Questions",
  description:
    "Frequently asked questions about working with Elijah Purcell, AI consulting, digital services, custom software, courses, and the company.",
  alternates: { canonical: "/faq" },
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
      "name": "FAQ",
      "item": "https://purcellventures.co/faq"
    }
  ]
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      {children}
    </>
  );
}
