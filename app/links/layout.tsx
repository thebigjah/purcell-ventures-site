import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elijah Purcell's links",
  description:
    "Links to Elijah Purcell's services, free tools, courses, profiles and contact details. He is the Founder/CEO of Purcell Ventures LLC.",
  alternates: { canonical: "https://purcellventures.co/links" },
};

// A hub page that lists a person's profiles is a ProfilePage, and saying so is the
// difference between a list of links and a machine-readable statement that these accounts
// are the same person. It points at the canonical #founder node in the root layout rather
// than describing him again; three pages used to re-declare that Person with contradictory
// values and it took a day to unpick.
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://purcellventures.co/links",
      "url": "https://purcellventures.co/links",
      "name": "Elijah Purcell's links",
      "description":
        "Links to the services, free tools, courses, profiles and contact details of Elijah Purcell and Purcell Ventures LLC.",
      "mainEntity": { "@id": "https://purcellventures.co/#founder" },
      "about": { "@id": "https://purcellventures.co/#founder" },
      "publisher": { "@id": "https://purcellventures.co/#organization" },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://purcellventures.co" },
        { "@type": "ListItem", "position": 2, "name": "Links", "item": "https://purcellventures.co/links" },
      ],
    },
  ],
};

export default function LinksLayout({ children }: { children: React.ReactNode }) {
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
