import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses: Learn From Someone Who Just Did It",
  description:
    "Three self-paced courses from Elijah Purcell: the college application playbook (34 acceptances + $505k scholarships), the business launch playbook, and Zero to Automated.",
  alternates: { canonical: "/courses" },
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
