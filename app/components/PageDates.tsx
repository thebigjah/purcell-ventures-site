import { pageDates, formatDate } from "@/lib/page-dates";

const SITE = "https://purcellventures.co";

// A WebPage node carrying datePublished and dateModified for one route, bound to the
// sitewide WebSite and Organization nodes from app/layout.tsx by @id. Dates come from git
// history (lib/page-dates.json), so the field only moves when the page's files change.
export default function PageDates({ path, name }: { path: string; name?: string }) {
  const d = pageDates(path);
  if (!d) return null;
  const url = path === "/" ? SITE : `${SITE}${path}`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    ...(name ? { name } : {}),
    datePublished: d.published,
    dateModified: d.modified,
    isPartOf: { "@id": `${SITE}/#website` },
    publisher: { "@id": `${SITE}/#organization` },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />;
}

/** The visible "Updated" line for service pages, from the same dates as the schema. */
export function UpdatedLine({ path, bare }: { path: string; bare?: boolean }) {
  const d = pageDates(path);
  if (!d) return null;
  const line = (
    <p className="ui-updated">
      Updated <time dateTime={d.modified}>{formatDate(d.modified)}</time>
    </p>
  );
  // bare: inside a page that already sets its own column, such as PostLayout.
  return bare ? line : <div className="ui-wrap">{line}</div>;
}
