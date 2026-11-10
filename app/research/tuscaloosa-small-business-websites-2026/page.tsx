import { readFileSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import summary from "@/lib/research/alabama-2026-11-summary.json";
import { GROUPS, TIMINGS, pct, socialRows } from "@/lib/research/alabama-2026.mjs";
import { BarChart, CheckTable, MEASURE, num, p, pctBars, type AreaRow, type Frame } from "../_components/tables";
import { QA, RUN_DAY } from "./layout";

// Every number on this page is read at build time: the study figures from the Alabama
// summary JSON through the shared measure code in lib/research/measures.mjs, and the campus
// audit figures from the source file of /blog/121-businesses-near-campus. Aggregates only.
// No domain or business name may appear here.

const T = summary.frames.tuscaloosa as unknown as Frame;
const S = summary.frames.statewide as unknown as Frame;
const CSV_PATH = "/research/alabama-small-business-websites-2026-aggregates.csv";
const ALABAMA_PATH = "/research/alabama-small-business-websites-2026";
const CAMPUS_PATH = "/blog/121-businesses-near-campus";

const ROWS: AreaRow[] = [
  { key: "tuscaloosa", name: "Tuscaloosa", frame: T },
  { key: "statewide", name: "Alabama (random sample)", frame: S },
];
const BAR_ROWS = [
  { key: "tuscaloosa", name: "Tuscaloosa", frame: T },
  { key: "statewide", name: "Alabama sample", frame: S, ref: true },
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const day = (iso: string) => `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`;
const utcTime = (iso: string) => iso.slice(11, 16);

/* ---------- chance check ---------- */

const logFact = (n: number) => {
  let s = 0;
  for (let i = 2; i <= n; i++) s += Math.log(i);
  return s;
};
const logChoose = (n: number, k: number) => logFact(n) - logFact(k) - logFact(n - k);

/** Two-sided Fisher exact test for a count a of n1 against c of n2. */
function fisher(a: number, n1: number, c: number, n2: number) {
  const k = a + c;
  const total = n1 + n2;
  const h = (x: number) => Math.exp(logChoose(k, x) + logChoose(total - k, n1 - x) - logChoose(total, n1));
  const p0 = h(a);
  let out = 0;
  for (let x = Math.max(0, k - n2); x <= Math.min(k, n1); x++) {
    const v = h(x);
    if (v <= p0 * (1 + 1e-7)) out += v;
  }
  return Math.min(1, out);
}
const pText = (v: number) => (v < 0.001 ? "below 0.001" : v.toFixed(3));

const COUNT_MEASURES = GROUPS.flatMap((g) => g.measures.map((m) => ({ group: g.id, key: m.key })));
const TESTED = COUNT_MEASURES.map(({ group, key }) => {
  const t = MEASURE[key].get(T);
  const s = MEASURE[key].get(S);
  return { group, key, t, s, p: fisher(t.n, t.base, s.n, s.base) };
});
// The lede and the FAQ say Tuscaloosa sits close to the state outside the AI crawler rows.
// If a rerun of the data changes that, the build stops here instead of printing a false line.
const OUTSIDE_AI = TESTED.filter((r) => r.group !== "ai-crawlers" && r.p < 0.05);
if (OUTSIDE_AI.length) throw new Error(`Tuscaloosa differs beyond chance on ${OUTSIDE_AI.map((r) => r.key).join(", ")}; rewrite the lede.`);

/* ---------- the campus audit, read from its own source file ---------- */

const WORDS: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17,
  eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60,
  seventy: 70, eighty: 80, ninety: 90,
};
const wordNum = (w: string) => w.toLowerCase().split("-").reduce((s, part) => s + (WORDS[part] ?? NaN), 0);

const CAMPUS = (() => {
  const src = readFileSync(join(process.cwd(), "app/blog/121-businesses-near-campus/page.tsx"), "utf8");
  const rowsBlock = src.match(/const ROWS[^=]*=\s*\[([\s\S]*?)\];/);
  const rows = [...(rowsBlock?.[1] ?? "").matchAll(/\["[^"]+",\s*(\d+),\s*(\d+)\]/g)];
  const businesses = rows.reduce((s, r) => s + Number(r[1]), 0);
  const reachable = rows.reduce((s, r) => s + Number(r[2]), 0);
  const radius = Number(src.match(/inside a (\d+) metre circle/)?.[1]);
  const stated = Number(src.match(/There were (\d+) of them/)?.[1]);
  const hoursMatch = src.match(/([A-Za-z-]+) of the (\d+) have opening hours/);
  const hours = hoursMatch ? wordNum(hoursMatch[1]) : NaN;
  const published = src.match(/published: "(\d{4}-\d{2}-\d{2})"/)?.[1] ?? "";
  if (!rows.length || businesses !== stated || Number(hoursMatch?.[2]) !== businesses || !radius || Number.isNaN(hours) || !published) {
    throw new Error("Could not read the campus audit figures from app/blog/121-businesses-near-campus/page.tsx");
  }
  return { businesses, reachable, radius, hours, published };
})();

/* ---------- comparison table ---------- */

function CompareTable() {
  return (
    <table>
      <caption>Tuscaloosa beside the Alabama statewide sample, every measure, same run</caption>
      <thead>
        <tr>
          <th scope="col">Measure</th>
          <th scope="col">Tuscaloosa (every listed site)</th>
          <th scope="col">Alabama (random sample)</th>
          <th scope="col">Gap in points</th>
          <th scope="col">Fisher exact p</th>
        </tr>
      </thead>
      <tbody>
        {GROUPS.map((g) => [
          <tr key={g.id}>
            <th scope="colgroup" colSpan={5}>{g.title}<span className="rs-bar__n">Base: {g.baseLabel}</span></th>
          </tr>,
          ...g.measures.map((m) => {
            const r = TESTED.find((x) => x.key === m.key)!;
            const gap = Math.round((pct(r.t.n, r.t.base) - pct(r.s.n, r.s.base)) * 10) / 10;
            return (
              <tr key={m.key}>
                <th scope="row">{m.label}{MEASURE[m.key].baseNote ? <span className="rs-bar__n">Base: {MEASURE[m.key].baseNote!.replace("base is ", "")}</span> : null}</th>
                <td>{num(r.t.n)} of {num(r.t.base)} ({p(r.t.n, r.t.base)})</td>
                <td>{num(r.s.n)} of {num(r.s.base)} ({p(r.s.n, r.s.base)})</td>
                <td>{gap > 0 ? "+" : ""}{gap.toFixed(1)}</td>
                <td>{pText(r.p)}</td>
              </tr>
            );
          }),
        ])}
        <tr>
          <th scope="colgroup" colSpan={5}>Timings<span className="rs-bar__n">Base: pages on the business&apos;s own domain</span></th>
        </tr>
        {TIMINGS.map((t) => (
          <tr key={t.key}>
            <th scope="row">{t.label}</th>
            <td>{num(t.get(T))} {t.unit} ({num(T.own_domain_pages)} pages)</td>
            <td>{num(t.get(S))} {t.unit} ({num(S.own_domain_pages)} pages)</td>
            <td></td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ---------- page ---------- */

export default function TuscaloosaWebsites2026() {
  const own = T.own_domain_pages;
  const checked = T.domains_checked;
  const tb = T.robots_blocks_any_ai_bot.n;
  const sb = S.robots_blocks_any_ai_bot.n;
  const blockP = TESTED.find((r) => r.key === "blocks_any_ai_crawler")!.p;
  const ratio = Math.round(tb / own / (sb / S.own_domain_pages));
  const atStateRate = Math.round((own * sb) / S.own_domain_pages);
  const byName = T.robots_blocks_an_ai_bot_by_name.n;
  const oneSite = pct(1, own);
  const social = socialRows(summary).find((r) => r.area === "tuscaloosa")!;
  const alSocial = socialRows(summary).find((r) => r.area === "statewide")!;
  const fetched = summary.overpass_fetched_utc;
  const crawlerKeys = ["blocks_claudebot", "blocks_gptbot", "blocks_ccbot", "blocks_google_extended", "blocks_perplexitybot"];
  const crawlerName: Record<string, string> = {
    blocks_claudebot: "ClaudeBot", blocks_gptbot: "GPTBot", blocks_ccbot: "CCBot",
    blocks_google_extended: "Google-Extended", blocks_perplexitybot: "PerplexityBot",
  };

  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Research", href: "/research" },
        { name: "Tuscaloosa small business websites, 2026", href: "/research/tuscaloosa-small-business-websites-2026" },
      ]} />}
      title="Tuscaloosa small business websites, November 2026"
      lede={`Tuscaloosa small business websites sit close to the Alabama figures on every check except AI crawler blocking. ${num(tb)} of ${num(own)} home pages on the business's own domain (${p(tb, own)}) block at least one AI crawler, against ${num(sb)} of ${num(S.own_domain_pages)} (${p(sb, S.own_domain_pages)}) in the statewide random sample. The Tuscaloosa base is small.`}
      meta={<>Published <time dateTime={RUN_DAY}>{day(RUN_DAY)}</time>. By Elijah Purcell, Purcell Ventures, Tuscaloosa.</>}
    >
      <h2>What did the check find?</h2>

      <ul>
        <li>
          OpenStreetMap lists {num(checked)} small business websites inside the Tuscaloosa city
          limit. {num(T.not_reachable.n)} of them ({p(T.not_reachable.n, checked)}) had no working
          home page, against {p(S.not_reachable.n, S.domains_checked)} statewide.
        </li>
        <li>
          Of the {num(own)} working pages on the business&apos;s own domain,{" "}
          {num(T.jsonld_org_or_localbusiness.n)} ({p(T.jsonld_org_or_localbusiness.n, own)}) carry
          Organization or LocalBusiness structured data and {num(T.llms_txt.n)} ({p(T.llms_txt.n, own)})
          publish an llms.txt file.
        </li>
        <li>
          {num(T.all_three_ai_signals.n)} ({p(T.all_three_ai_signals.n, own)}) carry all three AI search
          signals I checked: business structured data, an llms.txt file, and no AI crawler blocked in
          robots.txt. Statewide the figure is {p(S.all_three_ai_signals.n, S.own_domain_pages)}.
        </li>
        <li>
          {num(tb)} ({p(tb, own)}) block at least one of five AI crawlers, about {ratio} times the
          statewide rate of {p(sb, S.own_domain_pages)}.
        </li>
      </ul>

      <p>
        The Tuscaloosa figures cover every listed business domain in the city, so they count the
        whole OpenStreetMap list. The Alabama figures come from a random draw of{" "}
        {num(S.domains_checked)} of the {num(summary.frame.total)} business domains in the state. Both
        come from the same run of the <Link href={ALABAMA_PATH}>Alabama study</Link>, with the same
        query, filters and script.
      </p>

      <h2>How does Tuscaloosa compare with Alabama?</h2>

      <p>
        The table lists every measure in the study, with the count and the base for each side. The
        last column gives a Fisher exact test of each gap. A value under 0.05 means a gap that large
        would turn up by chance less than one time in twenty. Only rows in the AI crawler group fall
        under it. One Tuscaloosa site moves a page figure by {oneSite} points.
      </p>

      <CompareTable />

      <table>
        <caption>Listed web addresses that point to Facebook, Instagram or Linktree</caption>
        <thead>
          <tr>
            <th scope="col">Area</th>
            <th scope="col">Base n (listed web addresses)</th>
            <th scope="col">Social page</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Tuscaloosa</th>
            <td>{num(social.base)}</td>
            <td>{num(social.n)} ({social.percent.toFixed(1)}%)</td>
          </tr>
          <tr>
            <th scope="row">All of Alabama</th>
            <td>{num(alSocial.base)}</td>
            <td>{num(alSocial.n)} ({alSocial.percent.toFixed(1)}%)</td>
          </tr>
        </tbody>
      </table>
      <p>
        The Alabama row counts every listing in the state, before the random draw.
      </p>

      <h2>Why does AI crawler blocking stand out?</h2>

      <p>
        At the statewide rate, about {num(atStateRate)} of the {num(own)} Tuscaloosa pages would block
        an AI crawler. {num(tb)} do. The Fisher exact test puts the chance of a gap that large at{" "}
        {pText(blockP)}, so chance alone is an unlikely cause. The count is still small, and{" "}
        {num(tb)} sites is a short list to explain a city with.
      </p>

      <BarChart
        title="Blocks at least one AI crawler"
        note="Share of pages on the business's own domain, Alabama sample in grey"
        bars={pctBars("blocks_any_ai_crawler", BAR_ROWS)}
      />

      <p>
        In {num(byName)} of the {num(tb)} Tuscaloosa pages that block a crawler, the blocking rule in
        robots.txt names the crawler. For the rest, the rule for all crawlers does the blocking.{" "}
        {T.robots_blocks_all_five.n === 1 ? "One page blocks" : `${num(T.robots_blocks_all_five.n)} pages block`} all five.
        By crawler, the Tuscaloosa counts run{" "}
        {crawlerKeys.map((k, i) => {
          const v = MEASURE[k].get(T);
          return (
            <span key={k}>
              {i === crawlerKeys.length - 1 ? "and " : ""}{crawlerName[k]} {num(v.n)}{i === crawlerKeys.length - 1 ? "." : i === crawlerKeys.length - 2 ? " " : ", "}
            </span>
          );
        })}{" "}
        The check reads the rule and cannot tell who wrote it. Website platforms, hosts and SEO
        plugins add these rules for some owners.
      </p>

      <CheckTable
        caption="Home page disallowed in robots.txt, by crawler"
        keys={["blocks_gptbot", "blocks_claudebot", "blocks_perplexitybot", "blocks_google_extended", "blocks_ccbot"]}
        baseLabel="own-domain pages"
        rows={ROWS}
      />

      <h2>What did the campus audit find?</h2>

      <p>
        On {day(CAMPUS.published)} I counted every independent business within{" "}
        {num(CAMPUS.radius)} m of the Quad, with or without a website. There were{" "}
        {num(CAMPUS.businesses)}. Of those, {num(CAMPUS.reachable)} had a website a machine could
        reach, and {num(CAMPUS.hours)} had opening hours recorded anywhere a machine can read them. The full
        count by kind of business is in{" "}
        <Link href={CAMPUS_PATH}>{num(CAMPUS.businesses)} businesses near campus, and what a phone can find</Link>.
      </p>
      <p>
        The November check starts from the listings that carry a website, so it skips the many
        businesses near campus that list none. Of the {num(checked)} Tuscaloosa domains,{" "}
        {num(T.osm_opening_hours.n)} ({p(T.osm_opening_hours.n, checked)}) have opening hours on the
        map listing. The two counts differ in area, date, kinds of business and test, so read them
        side by side and keep them apart.
      </p>

      <h2>What can Tuscaloosa owners fix?</h2>
      <ul>
        <li>
          Run the free <Link href="/ai-visibility-check">AI visibility check</Link> on your own site.
          It reads your robots.txt, llms.txt and home page and lists what to fix, including any rule
          that blocks an AI crawler.
        </li>
        <li>
          If your web address no longer works, <Link href="/blog/claim-your-google-listing">claim
          your Google listing</Link> first, so customers can still find your phone number and hours.
        </li>
        <li>
          For structured data, llms.txt and crawler rules in one place, read{" "}
          <Link href="/ai-websites">AI websites for small businesses</Link>.
        </li>
        <li>
          To talk it through in person, <Link href="/ai-consultant-tuscaloosa">AI consulting in
          Tuscaloosa</Link> covers how I work with businesses here.
        </li>
      </ul>

      <h2>Method</h2>
      <p>
        This page reads the Tuscaloosa frame of the <Link href={ALABAMA_PATH}>Alabama study</Link>,
        which prints the full Overpass query and the exact test behind each check. The Tuscaloosa
        query ran on {day(fetched.tuscaloosa)} at {utcTime(fetched.tuscaloosa)} UTC against the
        OpenStreetMap boundary with Wikidata id Q79580, the Tuscaloosa city limit, and the statewide
        query ran at {utcTime(fetched.statewide)} UTC. Both ask for every listing tagged shop, craft or
        office, every restaurant, cafe, bar, fast food outlet, dentist, doctor&apos;s office, clinic and
        veterinarian, every hotel and every fitness centre, where the listing has a website or
        contact:website tag. Chains, government offices, schools, nonprofits and social media pages
        came out before the checks.
      </p>
      <p>
        One script checked every domain once, from {utcTime(summary.checks_started_utc)} to{" "}
        {utcTime(summary.checks_finished_utc)} UTC on {day(summary.checks_started_utc)}, from one computer
        in Tuscaloosa. It read the home page only, allowed 10 seconds per request and read robots.txt
        under RFC 9309 for GPTBot, ClaudeBot, PerplexityBot, Google-Extended and CCBot. The Fisher
        exact test on this page compares each Tuscaloosa count with the statewide count and its base.
      </p>

      <h2>Limits</h2>
      <ul>
        <li>The Tuscaloosa base is small: {num(checked)} domains and {num(own)} own-domain pages. One site moves a page figure by {oneSite} points, and a gap of a few points means little.</li>
        <li>The statewide draw may hold some Tuscaloosa domains, so the two groups overlap a little. The overlap pulls the two sides together, which makes the test cautious.</li>
        <li>Each site got one try. A site that was down for a few minutes counts as not working, and some sites that block automated requests may show up as not working too.</li>
        <li>OpenStreetMap depends on volunteers. A business appears only if someone mapped it with a website, and some listings are out of date.</li>
        <li>robots.txt states a request to crawlers. It does not show firewall or hosting rules that turn AI crawlers away, which some hosts apply by default.</li>
        <li>The timings come from one computer in Tuscaloosa and cover the HTML only. They say nothing about PageSpeed or Core Web Vitals.</li>
        <li>The structured data check read JSON-LD only, so it missed microdata and RDFa.</li>
        <li>The campus audit used a different area, date, tag set and test, so its figures stay separate from the study figures.</li>
      </ul>

      <h2>Common questions</h2>
      {QA.map(([q, a]) => (
        <div key={q}>
          <h3>{q}</h3>
          <p style={{ marginTop: 6 }}>{a}</p>
        </div>
      ))}

      <h2>Data and license</h2>
      <p>
        <a href={CSV_PATH} download>Download the Alabama study CSV</a>. Its tuscaloosa rows hold the count,
        base and percentage behind every Tuscaloosa study figure on this page, beside the statewide
        rows, with no domains or business names.
      </p>
      <p>
        Listing data ©{" "}
        <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, available
        under the Open Database License. The aggregate figures on this page and in the CSV carry a{" "}
        <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0</a>{" "}
        license. Credit Purcell Ventures and OpenStreetMap contributors when you use them.
      </p>
    </PostLayout>
  );
}
