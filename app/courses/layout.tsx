import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses: Learn From Someone Who Just Did It",
  description:
    "Three self-paced courses from Elijah Purcell: the college application playbook, the business launch playbook, and Zero to Automated.",
  // NO canonical here. This layout wraps every /courses child route and Next
  // inherits it, so each child was declaring itself a duplicate of /courses.
  // A page with no canonical self-canonicalises, which is what these want.
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
      "name": "Courses",
      "item": "https://purcellventures.co/courses"
    }
  ]
};
const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What courses does Elijah Purcell offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Three self-paced courses: the college application playbook, the business launch playbook, and Zero to Automated, which covers practical AI for small business."
      }
    }
  ]
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />
      {children}
    </>
  );
}
