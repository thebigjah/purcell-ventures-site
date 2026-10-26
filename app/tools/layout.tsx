import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Twenty-six free single-page tools by Elijah Purcell" },
  description:
    "Free browser tools built by Elijah Purcell: a cipher workbench, a decision journal, a friendship CRM, an Ignatian examen, a printable day sheet, a scripture memorizer and more. They need no account and collect nothing. Each one is a single file that runs on your device.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Twenty-six free tools by Elijah Purcell",
    description: "Single-page browser tools that need no account and collect nothing.",
    url: "https://purcellventures.co/tools",
    type: "website",
  
    images: ["/opengraph-image"],
  },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
