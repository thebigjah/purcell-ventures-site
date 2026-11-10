import type { Metadata } from "next";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";
import ToolSchema from "@/app/components/ToolSchema";
import { QA } from "./faq";

// Free AI use policy generator (9 Nov 2026). The form and the policy text run in the
// browser (policy.ts), with no API route and nothing stored. BreadcrumbList comes from the
// Breadcrumbs component in the page, WebApplication from ToolSchema, FAQPage from here.

const TITLE = "AI use policy template for small business";
const DESCRIPTION =
  "Free AI use policy template for small businesses. Fill in a short form for a staff policy to copy, download or print. It runs in your browser and saves nothing.";
const URL = "https://purcellventures.co/ai-policy-template";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "AI use policy template", "small business AI policy", "AI policy for employees",
    "AI acceptable use policy", "ChatGPT policy for staff",
  ],
  alternates: { canonical: "/ai-policy-template" },
  openGraph: {
    title: "AI use policy template",
    description: DESCRIPTION,
    url: URL,
    type: "website",
    images: ["/opengraph-image"],
  },
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${URL}#faq`,
  mainEntity: QA.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolSchema name="AI use policy template" path="/ai-policy-template" description={DESCRIPTION} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />
      <PageDates path="/ai-policy-template" name="AI use policy template" />
      {children}
      <UpdatedLine path="/ai-policy-template" />
    </>
  );
}
