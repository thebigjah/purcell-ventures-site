import type { Metadata } from "next";

// The post needs its own self-canonical here. Without it the post inherits the blog
// layout and declares itself a duplicate of the index, which is what all nine were doing.
export const metadata: Metadata = {
  title: { absolute: "Why some AI tools waste money" },
  description:
    "Many small business AI tools fail because the workflow they attach to was already broken. Three questions to check yours before you buy.",
  alternates: { canonical: "/blog/why-most-ai-tools-waste-money" },
};

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
