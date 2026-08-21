import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Twenty-nine free single-page tools by Elijah Purcell",
  description:
    "Free browser tools built by Elijah Purcell: a cipher workbench, a decision journal, a friendship CRM, an Ignatian examen, a printable day sheet, a scripture memoriser and more. No account, nothing collected, each one a single file that runs on your device.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Twenty-nine free tools by Elijah Purcell",
    description: "Single-page browser tools. No account, nothing collected.",
    url: "https://purcellventures.co/tools",
    type: "website",
  },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
