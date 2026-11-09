import data from "./page-dates.json";

// Publish and update dates for each route, read from git history by scripts/page-dates.mjs.
// Never the build clock: see the header of that script for why.

export type Dates = { published: string; modified: string };

const DATES = data as Record<string, Dates>;

/**
 * Dates for a route path such as "/consulting". `published` overrides the git date when a
 * page states its own publish date (blog posts print theirs), and the modified date is
 * never earlier than it. A route the JSON does not know yet, such as a post committed
 * after the last regeneration, falls back to its stated publish date.
 */
export function pageDates(path: string, published?: string): Dates | null {
  const d = DATES[path];
  const pub = published ?? d?.published;
  if (!pub) return null;
  const mod = d?.modified && d.modified > pub ? d.modified : pub;
  return { published: pub, modified: mod };
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];

/** "2026-11-09" to "November 9, 2026", without a Date object so no timezone can shift it. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
