// Alabama small business websites, November 2026. Binds the shared measure code in
// measures.mjs to the Alabama areas. No domains, no business names.

import { countRows as rows, socialRows as social, aggregatesCsv as csv, pct } from "./measures.mjs";

export { pct, GROUPS, TIMINGS } from "./measures.mjs";

export const AREAS = [
  { key: "statewide", name: "Alabama (random sample)", whole: true },
  { key: "tuscaloosa", name: "Tuscaloosa" },
  { key: "birmingham", name: "Birmingham" },
  { key: "huntsville", name: "Huntsville" },
  { key: "montgomery", name: "Montgomery" },
  { key: "mobile", name: "Mobile" },
];

export const CITIES = AREAS.slice(1);

export const countRows = (summary) => rows(summary, AREAS);
export const socialRows = (summary) => social(summary, AREAS);

// By kind of business. Counts come from lib/research/alabama-2026-11-by-type.json, which
// by_type.py writes from the per-domain CSV off this site. A percentage appears only when
// its base reaches the file's min_base_for_percent.
export const KIND_MEASURES = [
  { key: "no_working_home_page", label: "No working home page", base: "domains_checked" },
  { key: "jsonld_business", field: "jsonld_org_or_localbusiness", label: "Organization or LocalBusiness JSON-LD", base: "own_domain_pages" },
  { key: "all_three_ai_signals", label: "All three AI signals", base: "own_domain_pages" },
  { key: "blocks_any_ai_crawler", field: "robots_blocks_any_ai_bot", label: "Blocks at least one AI crawler", base: "own_domain_pages" },
  { key: "no_meta_description", label: "No meta description", base: "own_domain_pages" },
];

export const KIND_FRAMES = [
  { key: "statewide", name: "Alabama random sample" },
  { key: "all_checked_domains", name: "All checked domains" },
];

/** One row per frame, kind and measure: { n, base, percent }, percent null below the minimum base.
 * @param {any} byType
 */
export function kindRows(byType) {
  const min = byType.min_base_for_percent;
  const kinds = [...byType.kinds, { key: "all", name: "All kinds" }];
  const out = [];
  for (const fr of KIND_FRAMES) {
    for (const k of kinds) {
      const g = byType.frames[fr.key][k.key];
      for (const m of KIND_MEASURES) {
        const n = g[m.field ?? m.key];
        const base = g[m.base];
        out.push({ frame: fr.key, kind: k.key, kindName: k.name, measure: m.key, label: m.label, n, base,
          percent: base >= min ? pct(n, base) : null });
      }
    }
  }
  return out;
}

export const aggregatesCsv = (summary, byType) => {
  const esc = (s) => (/[",\n]/.test(String(s)) ? `"${String(s).replace(/"/g, '""')}"` : String(s));
  const lines = byType
    ? kindRows(byType).map((r) =>
        [`by_kind_${r.measure}`, `${r.label}, ${r.kindName}`, `${r.frame}:${r.kind}`, r.n, r.base,
          r.percent === null ? "" : r.percent.toFixed(1), "count"].map(esc).join(","))
    : [];
  return csv(summary, AREAS) + (lines.length ? lines.join("\n") + "\n" : "");
};
