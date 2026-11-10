import type { Metadata } from "next";
import type { ReactNode } from "react";

// PILLAR FOR THE AI DESIGN CLUSTER (9 Nov 2026).
//
// The hub the blog engine links each ai-design post up to (~/blog-engine cluster_map.json).
// The claims about Purcell Ventures come from the tool definitions in lib/ai-tools.ts and
// the add-on list on /digital. The copyright answer restates the US Copyright Office's
// published position on AI-generated material in general terms and gives no legal advice.

export const metadata: Metadata = {
  title: { absolute: "AI in design for small businesses, Purcell Ventures" },
  description:
    "AI in design for small businesses: what AI tools do well and badly for logos, brand identity, websites and social graphics, and when to hire a designer instead.",
  keywords: [
    "AI logo for small business", "AI design tools small business", "AI brand identity",
    "AI social media graphics", "AI website design", "AI vs graphic designer",
  ],
  openGraph: {
    title: "AI in design for small businesses",
    description:
      "AI in design for small businesses: what AI tools do well and badly for logos, brand identity, websites and social graphics, and when to hire a designer instead.",
    url: "https://purcellventures.co/ai-design",
    type: "article",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI in design for small businesses",
    description: "AI in design for small businesses: what AI tools do well and badly for logos, brand identity, websites and social graphics, and when to hire a designer instead.",
  },
  alternates: { canonical: "https://purcellventures.co/ai-design" },
};

export const QA: [string, string][] = [
  ["Can I use an AI-generated logo for my business?",
   "Yes, with three problems to plan for. Image generators produce pixel images, while a logo needs a vector file that scales cleanly. AI images often garble letters. And the US Copyright Office has said it will not register material that an AI generated without human creative control, so have a designer redraw the final mark."],
  ["Who owns the copyright to an image AI makes for my business?",
   "In the United States, the Copyright Office registers only work with human authorship, and it has said that material an AI generates on its own does not qualify. The terms of service of the tool you used set what you may do with the image. A person who substantially redraws or arranges AI output can hold copyright in their own contribution."],
  ["Is Canva's AI good enough for small business graphics?",
   "For social posts, one-off flyers and simple graphics, yes, as long as you start from templates in your own colors and logo. For a logo, a sign or anything printed in volume, use it for drafts and have a designer finish the file."],
  ["When should a small business hire a designer instead of using AI?",
   "Hire a designer for anything you will use for years or print in large numbers: the logo, signs, vehicle graphics, packaging and the core brand guide. Use AI for work you make often and replace quickly, such as social posts, event flyers and draft layouts."],
  ["Should I use AI-generated photos on my business website?",
   "Use them for backgrounds and illustrations only. A photo that claims to show your real work, staff or storefront should come from a camera, because a customer who spots a fake has reason to doubt the rest of the site."],
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://purcellventures.co/ai-design#article",
      "headline": "AI in design for small businesses",
      "url": "https://purcellventures.co/ai-design",
      "datePublished": "2026-11-09",
      "dateModified": "2026-11-09",
      "author": { "@id": "https://elijahpurcell.com/#person" },
      "publisher": { "@id": "https://purcellventures.co/#organization" },
      "about": ["AI design tools", "Logo design", "Brand identity", "Website design", "Social media graphics"],
    },
    {
      "@type": "FAQPage",
      "@id": "https://purcellventures.co/ai-design#faq",
      "mainEntity": QA.map(([q, a]) => ({
        "@type": "Question",
        "name": q,
        "acceptedAnswer": { "@type": "Answer", "text": a },
      })),
    },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
