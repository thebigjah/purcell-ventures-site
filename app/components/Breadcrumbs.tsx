import Link from "next/link";

// BreadcrumbList, WHICH THE SITE DID NOT HAVE ANYWHERE.
//
// Two jobs. It tells a search engine how a page sits inside the site, which matters on a
// domain where most pages are two levels deep. And it is what produces the trail shown
// above a result instead of a bare URL, which is the difference between a result that
// looks like a page and one that looks like a file.
//
// Rendered as well as emitted, because a breadcrumb that exists only in the markup is a
// claim about navigation the reader cannot use.

export interface Crumb { name: string; href: string }

export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const BASE = "https://purcellventures.co";
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${BASE}${c.href}`,
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {trail.length > 1 && (
        <nav aria-label="Breadcrumb" className="ui-crumb">
          <Link href={trail[trail.length - 2].href}>{trail[trail.length - 2].name}</Link>
        </nav>
      )}
    </>
  );
}
