import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTool } from "@/lib/ai-tools";

// The tool page is a client component, so its title and canonical come from here.
// Without this file all 26 tool pages carried the /digital layout's title.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return { title: "Tool not found" };
  return {
    title: tool.name,
    description: tool.description,
    alternates: { canonical: `/digital/tools/${slug}` },
  };
}

export default function ToolLayout({ children }: { children: ReactNode }) {
  return children;
}
