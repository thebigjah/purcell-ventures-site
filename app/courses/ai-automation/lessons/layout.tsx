import type { Metadata } from "next";

// This page is the delivery surface for a paid course. It renders a title and
// nothing else to a crawler, because the lesson body is client-side state, so
// indexing it would put an empty page in front of the sales page that actually
// sells the thing. The content itself is the product and should not be published.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function LessonsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
