// Measure definitions shared by every Load Time research page and by
// scripts/research-aggregates.mjs, so each page and its downloadable CSV read every figure
// from the same summary JSON through the same code. No figure on a page is typed by hand.
// Summaries hold aggregates only: no domains, no business names.
//
// The row builders take the list of areas, each { key, name, whole? }. An area with
// whole: true reads its social page count from the summary totals, since it covers the
// entire frame rather than one city inside it.

/** @typedef {{ key: string, name: string, whole?: boolean }} Area */

/** One decimal place, half up, from the count and the base. */
export function pct(n, base) {
  if (!base) return 0;
  return Math.round((n / base) * 1000) / 10;
}

const own = (f, key) => ({ n: f[key].n, base: f.own_domain_pages });
const all = (f, key) => ({ n: f[key].n, base: f.domains_checked });

// Count measures. Each returns { n, base } for one area's frame.
export const GROUPS = [
  {
    id: "home-page",
    title: "Does the home page work?",
    baseLabel: "domains checked",
    measures: [
      { key: "home_page_works", label: "Working home page (status 200)", get: (f) => all(f, "reachable_200") },
      { key: "no_working_home_page", label: "No working home page", get: (f) => all(f, "not_reachable") },
      {
        key: "address_does_not_resolve",
        label: "Web address no longer resolves",
        get: (f) => ({ n: f.not_reachable.by_reason.dns_failed ?? 0, base: f.domains_checked }),
      },
      {
        key: "moves_to_other_domain",
        label: "Working page ends on a different domain",
        get: (f) => ({ n: f.redirect_to_other_domain.n, base: f.reachable_200.n }),
        baseNote: "base is working home pages",
      },
    ],
  },
  {
    id: "basics",
    title: "Basics on the business's own page",
    baseLabel: "pages on the business's own domain",
    measures: [
      { key: "https", label: "Ends on https", get: (f) => own(f, "https_final") },
      { key: "no_https", label: "Plain http only, never https", get: (f) => own(f, "no_https") },
      { key: "viewport", label: "Viewport tag for phones", get: (f) => own(f, "viewport") },
      { key: "title", label: "Page title", get: (f) => own(f, "title") },
      { key: "meta_description", label: "Meta description", get: (f) => own(f, "meta_description") },
      {
        key: "no_meta_description",
        label: "No meta description",
        get: (f) => ({ n: f.own_domain_pages - f.meta_description.n, base: f.own_domain_pages }),
      },
      { key: "all_four_basics", label: "All four: https, viewport, title, meta description", get: (f) => own(f, "passes_all_four_basics") },
    ],
  },
  {
    id: "structured-data",
    title: "Structured data",
    baseLabel: "pages on the business's own domain",
    measures: [
      { key: "jsonld_any", label: "Any JSON-LD", get: (f) => own(f, "jsonld_any") },
      { key: "jsonld_business", label: "Organization or LocalBusiness JSON-LD", get: (f) => own(f, "jsonld_org_or_localbusiness") },
    ],
  },
  {
    id: "ai-crawlers",
    title: "AI crawlers and llms.txt",
    baseLabel: "pages on the business's own domain",
    measures: [
      { key: "robots_txt", label: "robots.txt present", get: (f) => own(f, "robots_txt_found") },
      { key: "blocks_any_ai_crawler", label: "Blocks at least one of the five AI crawlers", get: (f) => own(f, "robots_blocks_any_ai_bot") },
      { key: "blocks_all_five", label: "Blocks all five", get: (f) => own(f, "robots_blocks_all_five") },
      { key: "blocks_gptbot", label: "Blocks GPTBot", get: (f) => own(f, "robots_blocks_GPTBot") },
      { key: "blocks_claudebot", label: "Blocks ClaudeBot", get: (f) => own(f, "robots_blocks_ClaudeBot") },
      { key: "blocks_perplexitybot", label: "Blocks PerplexityBot", get: (f) => own(f, "robots_blocks_PerplexityBot") },
      { key: "blocks_google_extended", label: "Blocks Google-Extended", get: (f) => own(f, "robots_blocks_Google-Extended") },
      { key: "blocks_ccbot", label: "Blocks CCBot", get: (f) => own(f, "robots_blocks_CCBot") },
      { key: "llms_txt", label: "llms.txt file", get: (f) => own(f, "llms_txt") },
      {
        key: "all_three_ai_signals",
        label: "All three: business JSON-LD, llms.txt, no AI crawler blocked",
        get: (f) => own(f, "all_three_ai_signals"),
      },
    ],
  },
  {
    id: "speed",
    title: "Speed from one computer in Tuscaloosa",
    baseLabel: "pages on the business's own domain",
    measures: [
      { key: "ttfb_over_800ms", label: "First byte took over 800 ms", get: (f) => ({ n: f.ttfb_ms.over_800ms_n, base: f.own_domain_pages }) },
      { key: "html_over_2s", label: "HTML download took over 2 seconds", get: (f) => ({ n: f.html_download_ms.over_2000ms_n, base: f.own_domain_pages }) },
    ],
  },
  {
    id: "listing",
    title: "The OpenStreetMap listing itself",
    baseLabel: "domains checked",
    measures: [
      { key: "osm_opening_hours", label: "Listing has opening hours", get: (f) => all(f, "osm_opening_hours") },
      { key: "osm_phone", label: "Listing has a phone number", get: (f) => all(f, "osm_phone") },
    ],
  },
];

// Timing figures that are not counts. Each returns a number in its unit.
export const TIMINGS = [
  { key: "ttfb_median_ms", label: "Median time to first byte", unit: "ms", get: (f) => f.ttfb_ms.median },
  { key: "ttfb_p75_ms", label: "75th percentile time to first byte", unit: "ms", get: (f) => f.ttfb_ms.p75 },
  { key: "html_download_median_ms", label: "Median HTML download", unit: "ms", get: (f) => f.html_download_ms.median },
  { key: "html_size_median_kb", label: "Median HTML size", unit: "KB", get: (f) => Math.round(f.html_bytes.median / 1000) },
];

/** Every count measure for every area, as flat rows. Used by the page tables and the CSV.
 * @param {any} summary
 * @param {Area[]} areas
 */
export function countRows(summary, areas) {
  const rows = [];
  for (const g of GROUPS) {
    for (const m of g.measures) {
      for (const a of areas) {
        const { n, base } = m.get(summary.frames[a.key]);
        rows.push({ group: g.id, measure: m.key, label: m.label, area: a.key, areaName: a.name, n, base, percent: pct(n, base) });
      }
    }
  }
  return rows;
}

/** Facebook, Instagram or Linktree in place of a website, as a share of listed web addresses.
 * @param {any} summary
 * @param {Area[]} areas
 */
export function socialRows(summary, areas) {
  return areas.map((a) => {
    const n = a.whole ? summary.social_page_urls.total : summary.social_page_urls[a.key] ?? 0;
    const domains = a.whole ? summary.frame.total : summary.frame[a.key];
    return { area: a.key, areaName: a.name, n, base: domains + n, percent: pct(n, domains + n) };
  });
}

/** CSV text: measure x area, with count, base and percent. Aggregates only.
 * @param {any} summary
 * @param {Area[]} areas
 */
export function aggregatesCsv(summary, areas) {
  const esc = (s) => (/[",\n]/.test(String(s)) ? `"${String(s).replace(/"/g, '""')}"` : String(s));
  const lines = ["measure,description,area,count,base,percent,unit"];
  for (const r of countRows(summary, areas)) {
    lines.push([r.measure, r.label, r.area, r.n, r.base, r.percent.toFixed(1), "count"].map(esc).join(","));
  }
  for (const r of socialRows(summary, areas)) {
    lines.push(["social_page_instead_of_website", "Listed web address is a Facebook, Instagram or Linktree page", r.area, r.n, r.base, r.percent.toFixed(1), "count"].map(esc).join(","));
  }
  for (const t of TIMINGS) {
    for (const a of areas) {
      const f = summary.frames[a.key];
      lines.push([t.key, t.label, a.key, t.get(f), f.own_domain_pages, "", t.unit].map(esc).join(","));
    }
  }
  return lines.join("\n") + "\n";
}
