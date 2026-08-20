import type { Metadata } from "next";

// Its own title and description. Without these it inherited the /courses layout,
// so four pages shared one title, and a duplicate title is a reason for a crawler
// to skip a page on a site it is already barely indexing.
export const metadata: Metadata = {
  title: "Zero to Automated: Practical AI for Small Business | Elijah Purcell",
  description:
    "Building real automations rather than collecting AI tools: what to automate first, what to leave alone, and how to tell the difference.",
  alternates: { canonical: "/courses/ai-automation" },
};

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
