import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getTool } from "@/lib/ai-tools";
import ToolSchema from "@/app/components/ToolSchema";

// The tool page is a client component, so its title and canonical come from here.
// Without this file all 26 tool pages carried the /digital layout's title.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  // The root template appends ", Purcell Ventures" (20 characters), so the tool part
  // stays at 40 or under to keep the full title within 60. A trailing parenthetical
  // such as "(standard operating procedures)" is the first thing to go.
  const short = tool.name.replace(/\s*\([^)]*\)$/, "");
  return {
    title: short.length <= 40 ? short : short.slice(0, 40).trimEnd(),
    description: tool.description,
    alternates: { canonical: `/digital/tools/${slug}` },
  };
}

export default async function ToolLayout({ children, params }: { children: ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  return (
    <>
      <ToolSchema name={tool.name} path={`/digital/tools/${slug}`} description={tool.description} />
      {children}
    </>
  );
}
