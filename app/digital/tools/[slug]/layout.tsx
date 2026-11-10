import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getTool } from "@/lib/ai-tools";
import { getToolGuide } from "@/lib/tool-guides";
import ToolSchema from "@/app/components/ToolSchema";
import PageDates from "@/app/components/PageDates";

// The title, description, canonical and robots for every tool page come from here.
// Without this file all 26 tool pages carried the /digital layout's title.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  // The root title template does not reach this segment (the /digital layout sets a plain
  // title), so the suffix goes on here. ", Purcell Ventures" is 18 characters, so the tool
  // part stays at 40 or under to keep the full title within 60. A trailing parenthetical
  // such as "(standard operating procedures)" is the first thing to go.
  const short = tool.name.replace(/\s*\([^)]*\)$/, "");
  const guide = getToolGuide(slug);
  if (guide) {
    return { title: { absolute: `${guide.title}, Purcell Ventures` }, description: guide.description, alternates: { canonical: `/digital/tools/${slug}` } };
  }
  // A tool without a written guide is a bare form with about a hundred words of text. It stays
  // usable and linked from /digital/tools, and search engines skip it but follow its links.
  return {
    title: { absolute: `${short.length <= 40 ? short : short.slice(0, 40).trimEnd()}, Purcell Ventures` },
    description: tool.description,
    alternates: { canonical: `/digital/tools/${slug}` },
    robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  };
}

export default async function ToolLayout({ children, params }: { children: ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  return (
    <>
      <ToolSchema name={tool.name} path={`/digital/tools/${slug}`} description={getToolGuide(slug)?.description ?? tool.description} />
      <PageDates path={`/digital/tools/${slug}`} />
      {children}
    </>
  );
}
