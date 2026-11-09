import type { Metadata } from "next";
import PageDates from "@/app/components/PageDates";
import ToolSchema from "@/app/components/ToolSchema";

export const metadata: Metadata = {
  title: "AI readiness test in 10 questions and 3 minutes",
  description:
    "An AI readiness test for small business owners and team leaders. Ten questions score your team out of 30 and give you three next steps. No email required.",
  alternates: { canonical: "/ai-readiness" },
};


const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://purcellventures.co"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "AI readiness test",
      "item": "https://purcellventures.co/ai-readiness"
    }
  ]
};

export default function AIReadinessLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      <ToolSchema name="AI readiness test in 10 questions and 3 minutes" path="/ai-readiness" description="An AI readiness test for small business owners and team leaders. Ten questions score your team out of 30 and give you three next steps. No email required." />
      <PageDates path="/ai-readiness" />
      {children}
    </>
  );
}
