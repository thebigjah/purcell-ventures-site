import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTool } from "@/lib/ai-tools";
import ToolSchema from "@/app/components/ToolSchema";

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

export default async function ToolLayout({ children, params }: { children: ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  return (
    <>
      {tool && <ToolSchema name={tool.name} path={`/digital/tools/${slug}`} description={tool.description} />}
      {children}
    </>
  );
}
