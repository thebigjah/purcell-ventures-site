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

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
