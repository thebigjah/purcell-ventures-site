// Writes each study's aggregates CSV under public/research/ from its summary JSON, and
// checks the shared measure code against the percentages the summary already carries.
// Aggregates only: the summaries have no domains or business names.
//
//   node scripts/research-aggregates.mjs

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import * as alabama from "../lib/research/alabama-2026.mjs";
import * as cobb from "../lib/research/cobb-2026.mjs";

const ROOT = new URL("..", import.meta.url).pathname;
const STUDIES = [
  { mod: alabama, json: "alabama-2026-11-summary.json", csv: "alabama-small-business-websites-2026-aggregates.csv" },
  { mod: cobb, json: "cobb-2026-11-summary.json", csv: "cobb-county-small-business-websites-2026-aggregates.csv" },
];

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
const out = join(ROOT, "public/research");
mkdirSync(out, { recursive: true });

for (const { mod, json, csv } of STUDIES) {
  const summary = JSON.parse(readFileSync(join(ROOT, "lib/research", json), "utf8"));
  let bad = 0;
  for (const r of mod.countRows(summary)) {
    const f = PCT_FIELD[r.measure];
    if (!f) continue;
    const want = summary.frames[r.area][f[0]][f[1]];
    if (Math.abs(want - r.percent) > 0.05) {
      console.error(`${json} mismatch ${r.measure} ${r.area}: computed ${r.percent}, summary ${want}`);
      bad++;
    }
  }
  if (bad) process.exit(1);
  const text = mod.aggregatesCsv(summary);
  if (/\b[a-z0-9-]+\.(com|net|org|biz|us|co|info)\b/i.test(text)) {
    console.error(`refusing to write ${csv}: the CSV contains something shaped like a domain`);
    process.exit(1);
  }
  writeFileSync(join(out, csv), text);
  console.log(`${csv}: wrote ${text.trim().split("\n").length - 1} rows`);
}
