import type { Metadata } from "next";

// Its own title and description. Without these it inherited the /courses layout,
// so four pages shared one title, and a duplicate title is a reason for a crawler
// to skip a page on a site it is already barely indexing.
export const metadata: Metadata = {
  title: "The Business Launch Playbook | Elijah Purcell",
  description:
    "Filing the LLC, opening the bank account, finding the first customer, and the parts nobody warns you about. From someone who did it at seventeen.",
  alternates: { canonical: "/courses/business-launch" },
};


// Its own trail. The /courses layout emits a breadcrumb and Next inherits layout
// output down the tree, so without this the trail on this page ends at the parent
// rather than here. Same inheritance shape as the canonical bug, different field.
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
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "The Business Launch Playbook",
      "item": "https://purcellventures.co/courses/business-launch"
    }
  ]
};

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      {children}
    </>
  );
}
