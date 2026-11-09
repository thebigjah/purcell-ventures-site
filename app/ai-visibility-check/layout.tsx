import type { Metadata } from "next";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";
import { QA } from "./faq";

export const metadata: Metadata = {
  title: "AI visibility check for your business website",
  description:
    "A free check of whether ChatGPT, Claude, Perplexity and Google's AI can read your business website: AI crawler rules, llms.txt, title, description, structured data, phone, address, hours and page text. No account.",
  alternates: { canonical: "/ai-visibility-check" },
  openGraph: {
    title: "AI visibility check",
    description: "Check whether AI assistants can read your business website. Free, no account.",
    url: "https://purcellventures.co/ai-visibility-check",
    type: "website",
    images: ["/opengraph-image"],
  },
};

const URL = "https://purcellventures.co/ai-visibility-check";

const LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${URL}#app`,
      name: "AI visibility check",
      url: URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      description:
        "Checks a business home page for AI crawler rules in robots.txt, an llms.txt file, a title, a meta description, LocalBusiness or Organization structured data, a phone number, an address and opening hours in the text, the readable word count and https.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      isAccessibleForFree: true,
      creator: { "@id": "https://purcellventures.co/#organization" },
    },
    {
      "@type": "FAQPage",
      "@id": `${URL}#faq`,
      mainEntity: QA.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
      <PageDates path="/ai-visibility-check" name="AI visibility check" />
      {children}
      <UpdatedLine path="/ai-visibility-check" />
    </>
  );
}
