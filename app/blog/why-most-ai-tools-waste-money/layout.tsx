import type { Metadata } from "next";

// This post is a client component and cannot export metadata itself, so its
// self-canonical lives here. Without it the post inherits the blog layout and
// declares itself a duplicate of the index, which is what all nine were doing.
export const metadata: Metadata = {
  alternates: { canonical: "/blog/why-most-ai-tools-waste-money" },
};

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
