import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses by Elijah Purcell",
  description:
    "Three self-paced courses from Elijah Purcell: the college application playbook, the business launch playbook, and Zero to Automated.",
  // NO canonical here. This layout wraps every /courses child route and Next
  // inherits it, so each child was declaring itself a duplicate of /courses.
  // The /courses canonical lives in app/courses/page.tsx instead.
};


// NO breadcrumb here. This layout wraps all three course pages and Next inherits layout
// output, so a trail declared here appears on every child alongside the child's own and
// the two disagree about which page you are on. Each page declares its own instead.

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
