import type { Metadata } from "next";

// This layout gives the post its own canonical. Without it the post inherits the blog layout and
// declares itself a duplicate of the index, which is what all nine were doing.
export const metadata: Metadata = {
  title: { absolute: "Five workflows any small business can automate without code, by Elijah Purcell" },
  description:
    "Five automations a small business can set up without writing code, what each one saves, and where they break.",
  alternates: { canonical: "/blog/five-workflows-no-code" },
};

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
