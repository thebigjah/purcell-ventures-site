import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageDates } from "@/lib/page-dates";

// PRESS KIT, for reporters and podcast hosts.
//
// Every fact on this route comes from pages already on the site: /who, /about, /resume,
// /what-is-purcell-ventures, /team, /portfolio, /case-studies and /research, plus the
// Organization and Person nodes in app/layout.tsx. Study figures are read from the summary
// JSON, never typed. No service prices on this page, by his rule: services are quoted per
// business. No family, money or private life either: public pages are professional only.

const URL = "https://purcellventures.co/press";
export const TITLE = "Press kit: Elijah Purcell and Purcell Ventures";
export const DESCRIPTION =
  "Elijah Purcell founded Purcell Ventures LLC in Georgia in April 2025. Bios, company boilerplate, fast facts, story angles, a headshot and the press contact.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: "website",
    images: ["https://purcellventures.co/opengraph-image"],
  },
};

export default function PressLayout({ children }: { children: ReactNode }) {
  const d = pageDates("/press", "2026-11-09");
  // AboutPage bound to the canonical Organization and Person nodes by @id, so the kit
  // describes the same two entities the rest of the site does instead of minting new ones.
  const about = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${URL}#webpage`,
    name: TITLE,
    description: DESCRIPTION,
    url: URL,
    datePublished: d?.published,
    dateModified: d?.modified,
    isPartOf: { "@id": "https://purcellventures.co/#website" },
    publisher: { "@id": "https://purcellventures.co/#organization" },
    about: [
      { "@id": "https://purcellventures.co/#organization" },
      { "@id": "https://elijahpurcell.com/#person" },
    ],
    mainEntity: { "@id": "https://purcellventures.co/#organization" },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: "https://purcellventures.co/brand/elijah.jpg",
      width: 560,
      height: 560,
      caption: "Elijah Purcell, Founder/CEO of Purcell Ventures LLC",
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(about) }} />
      {children}
    </>
  );
}
