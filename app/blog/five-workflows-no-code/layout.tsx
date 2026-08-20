import type { Metadata } from "next";

// This post is a client component and cannot export metadata itself, so its
// self-canonical lives here. Without it the post inherits the blog layout and
// declares itself a duplicate of the index, which is what all nine were doing.
export const metadata: Metadata = {
  title: "Five Workflows Any Small Business Can Automate Without Code | Elijah Purcell",
  description:
    "Five automations a small business can set up without writing code, what each one actually saves, and where they break.",
  alternates: { canonical: "/blog/five-workflows-no-code" },
};

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
