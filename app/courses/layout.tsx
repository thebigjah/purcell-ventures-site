import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses: Learn From Someone Who Just Did It",
  description:
    "Three self-paced courses from Elijah Purcell: the college application playbook, the business launch playbook, and Zero to Automated.",
  // NO canonical here. This layout wraps every /courses child route and Next
  // inherits it, so each child was declaring itself a duplicate of /courses.
  // A page with no canonical self-canonicalises, which is what these want.
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
