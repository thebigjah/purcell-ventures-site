// Writes public/research/alabama-small-business-websites-2026-aggregates.csv from the
// summary JSON, and checks the shared measure code against the percentages the summary
// already carries. Aggregates only: the summary has no domains or business names.
//
//   node scripts/research-aggregates.mjs

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { aggregatesCsv, countRows } from "../lib/research/alabama-2026.mjs";

const ROOT = new URL("..", import.meta.url).pathname;
const summary = JSON.parse(readFileSync(join(ROOT, "lib/research/alabama-2026-11-summary.json"), "utf8"));

// Cross-check: wherever the summary states a percentage, the computed one must match it.
const PCT_FIELD = {
  home_page_works: ["reachable_200", "pct_of_checked"],
  no_working_home_page: ["not_reachable", "pct_of_checked"],
  moves_to_other_domain: ["redirect_to_other_domain", "pct_of_reachable"],
  https: ["https_final", "pct_of_own_domain_pages"],
  no_https: ["no_https", "pct_of_own_domain_pages"],
  meta_description: ["meta_description", "pct_of_own_domain_pages"],
  jsonld_business: ["jsonld_org_or_localbusiness", "pct_of_own_domain_pages"],
  blocks_any_ai_crawler: ["robots_blocks_any_ai_bot", "pct_of_own_domain_pages"],
  llms_txt: ["llms_txt", "pct_of_own_domain_pages"],
  all_three_ai_signals: ["all_three_ai_signals", "pct_of_own_domain_pages"],
  all_four_basics: ["passes_all_four_basics", "pct_of_own_domain_pages"],
};
let bad = 0;
for (const r of countRows(summary)) {
  const f = PCT_FIELD[r.measure];
  if (!f) continue;
  const want = summary.frames[r.area][f[0]][f[1]];
  if (Math.abs(want - r.percent) > 0.05) {
    console.error(`mismatch ${r.measure} ${r.area}: computed ${r.percent}, summary ${want}`);
    bad++;
  }
}
if (bad) process.exit(1);

const out = join(ROOT, "public/research");
mkdirSync(out, { recursive: true });
const csv = aggregatesCsv(summary);
if (/\b[a-z0-9-]+\.(com|net|org|biz|us|co|info)\b/i.test(csv)) {
  console.error("refusing to write: the CSV contains something shaped like a domain");
  process.exit(1);
}
writeFileSync(join(out, "alabama-small-business-websites-2026-aggregates.csv"), csv);
console.log(`wrote ${csv.trim().split("\n").length - 1} rows`);
