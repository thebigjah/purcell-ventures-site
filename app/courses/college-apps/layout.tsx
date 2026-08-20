import type { Metadata } from "next";

// Its own title and description. Without these it inherited the /courses layout,
// so four pages shared one title, and a duplicate title is a reason for a crawler
// to skip a page on a site it is already barely indexing.
export const metadata: Metadata = {
  title: "The College Application Playbook | Elijah Purcell",
  description:
    "How he got 34 acceptances and $505,000 a year in scholarship offers: building the list, writing the essays, and negotiating the award.",
  alternates: { canonical: "/courses/college-apps" },
};

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
