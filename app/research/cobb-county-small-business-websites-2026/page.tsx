import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import summary from "@/lib/research/cobb-2026-11-summary.json";
import alabama from "@/lib/research/alabama-2026-11-summary.json";
import { socialRows } from "@/lib/research/cobb-2026.mjs";
import { socialRows as alabamaSocialRows } from "@/lib/research/alabama-2026.mjs";
import { BarChart, CheckTable, MEASURE, SpeedTable, num, p, pctBars, type AreaRow, type Frame } from "../_components/tables";
import { QA } from "./layout";

// Every number on this page is read from the Cobb County and Alabama summary JSON at build
// time, through the measure code in lib/research/measures.mjs that also writes the
// downloadable CSV. Aggregates only. No domain or business name may appear here.

const C = summary.frames.county as unknown as Frame;
const A = alabama.frames.statewide as unknown as Frame;
const NC = summary.network_control;
const CSV_PATH = "/research/cobb-county-small-business-websites-2026-aggregates.csv";
const ALABAMA_PATH = "/research/alabama-small-business-websites-2026";

const ROWS: AreaRow[] = [
  { key: "county", name: "Cobb County", frame: C },
  { key: "statewide", name: "Alabama (random sample)", frame: A },
];
const BAR_ROWS = [
  { key: "county", name: "Cobb County", frame: C },
  { key: "statewide", name: "Alabama sample", frame: A, ref: true },
];

// Cities inside Cobb County, by the Wikidata id of each city limit. Counts of domains only.
const CITIES: { key: string; name: string; qid: string }[] = [
  { key: "marietta", name: "Marietta", qid: "Q852684" },
  { key: "kennesaw", name: "Kennesaw", qid: "Q1001316" },
  { key: "smyrna", name: "Smyrna", qid: "Q958676" },
  { key: "acworth", name: "Acworth", qid: "Q344933" },
  { key: "austell", name: "Austell", qid: "Q2688463" },
  { key: "powder-springs", name: "Powder Springs", qid: "Q3261052" },
  { key: "mableton", name: "Mableton", qid: "Q2656942" },
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const day = (iso: string) => `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`;
const utcTime = (iso: string) => iso.slice(11, 16);

/** Half-width of a 95% confidence interval for a share from a simple random sample, in points. */
const moe = (n: number, base: number) => {
  const q = n / base;
  return Math.round(1.96 * Math.sqrt((q * (1 - q)) / base) * 1000) / 10;
};

/* ---------- comparison ---------- */

// Headline measures, in the order the findings list uses them.
const HEADLINE = ["no_working_home_page", "jsonld_business", "all_three_ai_signals", "blocks_any_ai_crawler", "llms_txt", "no_https"];

function CompareTable() {
  return (
    <table>
      <caption>Cobb County beside the Alabama statewide sample, same checks</caption>
      <thead>
        <tr>
          <th scope="col">Measure</th>
          <th scope="col">Cobb County (every listed site)</th>
          <th scope="col">Alabama (random sample)</th>
          <th scope="col">Alabama 95% margin</th>
          <th scope="col">Gap in points</th>
        </tr>
      </thead>
      <tbody>
        {HEADLINE.map((k) => {
          const m = MEASURE[k];
          const c = m.get(C);
          const a = m.get(A);
          const gap = Math.round((c.n / c.base - a.n / a.base) * 1000) / 10;
          return (
            <tr key={k}>
              <th scope="row">{m.label}<span className="rs-bar__n">Base: {m.baseNote?.replace("base is ", "") ?? m.baseLabel}</span></th>
              <td>{num(c.n)} of {num(c.base)} ({p(c.n, c.base)})</td>
              <td>{num(a.n)} of {num(a.base)} ({p(a.n, a.base)})</td>
              <td>&plusmn;{moe(a.n, a.base).toFixed(1)}</td>
              <td>{gap > 0 ? "+" : ""}{gap.toFixed(1)}</td>
            </tr>
          );
        })}
        <tr>
          <th scope="row">Median time to first byte<span className="rs-bar__n">Not comparable, see the note below</span></th>
          <td>{num(C.ttfb_ms.median)} ms</td>
          <td>{num(A.ttfb_ms.median)} ms</td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}

/* ---------- page ---------- */

const OVERPASS = `[out:json][timeout:180];
area["wikidata"="Q484247"]["boundary"="administrative"]["admin_level"="6"]->.a;
(
  nwr["shop"]["website"](area.a);
  nwr["shop"]["contact:website"](area.a);
  nwr["craft"]["website"](area.a);
  nwr["craft"]["contact:website"](area.a);
  nwr["office"]["website"](area.a);
  nwr["office"]["contact:website"](area.a);
  nwr["amenity"~"^(restaurant|cafe|bar|dentist|doctors|clinic|veterinary|fast_food)$"]["website"](area.a);
  nwr["amenity"~"^(restaurant|cafe|bar|dentist|doctors|clinic|veterinary|fast_food)$"]["contact:website"](area.a);
  nwr["tourism"="hotel"]["website"](area.a);
  nwr["tourism"="hotel"]["contact:website"](area.a);
  nwr["leisure"="fitness_centre"]["website"](area.a);
  nwr["leisure"="fitness_centre"]["contact:website"](area.a);
);
out tags center;`;

const CITY_AREA = `area["wikidata"="QID"]["boundary"="administrative"]["admin_level"="8"]->.a;`;

export default function CobbWebsites2026() {
  const own = C.own_domain_pages;
  const checked = C.domains_checked;
  const r = C.not_reachable.by_reason as Record<string, number>;
  const dns = r.dns_failed ?? 0;
  const noMeta = own - C.meta_description.n;
  const ex = summary.excluded;
  const fr = summary.frame as Record<string, number>;
  const fetched = summary.overpass_fetched_utc as Record<string, string>;
  const endpoints = summary.overpass_endpoint as Record<string, string>;
  const mirrors = [...new Set(Object.values(endpoints).filter((e) => !e.includes("overpass-api.de")).map((e) => new URL(e).host))];
  const cityTimes = CITIES.map((c) => fetched[`cobb-${c.key}`]).sort();
  const inCities = CITIES.reduce((s, c) => s + (fr[c.key] ?? 0), 0);
  const named = ["dns_failed", "http_404", "http_403", "tls_cert_verify_failed", "timeout"];
  const other = C.not_reachable.n - named.reduce((s, k) => s + (r[k] ?? 0), 0);
  const hoursApart = Math.round((Date.parse(summary.checks_started_utc) - Date.parse(alabama.checks_started_utc)) / 3600000);
  const social = socialRows(summary)[0];
  const alSocial = alabamaSocialRows(alabama)[0];

  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Research", href: "/research" },
        { name: "Cobb County small business websites, 2026", href: "/research/cobb-county-small-business-websites-2026" },
      ]} />}
      title="Cobb County, Georgia small business websites, November 2026"
      lede={`I checked the home page of every small business website OpenStreetMap lists in Cobb County, Georgia, ${num(checked)} sites in all, with the same scripts as the Alabama study.`}
      meta={<>Published <time dateTime={summary.checks_finished_utc.slice(0, 10)}>{day(summary.checks_finished_utc)}</time>. By Elijah Purcell, Purcell Ventures, Tuscaloosa.</>}
    >
      <h2>What did the check find?</h2>

      <ul>
        <li>
          {num(C.not_reachable.n)} of {num(checked)} sites ({p(C.not_reachable.n, checked)}) had no
          working home page. For {num(dns)} of them ({p(dns, checked)} of all {num(checked)}), the web
          address no longer resolves at all.
        </li>
        <li>
          Of the {num(own)} working pages on the business&apos;s own domain, {num(C.jsonld_org_or_localbusiness.n)}{" "}
          ({p(C.jsonld_org_or_localbusiness.n, own)}) carry Organization or LocalBusiness structured
          data. {num(C.all_three_ai_signals.n)} ({p(C.all_three_ai_signals.n, own)}) carry all three AI
          search signals I checked: business structured data, an llms.txt file, and no AI crawler
          blocked in robots.txt.
        </li>
        <li>
          {num(C.robots_blocks_any_ai_bot.n)} ({p(C.robots_blocks_any_ai_bot.n, own)}) block at least one
          of five AI crawlers in robots.txt, and {num(C.llms_txt.n)} ({p(C.llms_txt.n, own)}) publish an
          llms.txt file.
        </li>
        <li>
          {num(C.no_https.n)} ({p(C.no_https.n, own)}) never reach https, {num(noMeta)} ({p(noMeta, own)})
          have no meta description. The median time to first byte came to {num(C.ttfb_ms.median)} ms, on a connection that ran slower than during the Alabama run.
        </li>
      </ul>

      <p>
        The figures cover all {num(fr.total)} business domains that OpenStreetMap lists for Cobb
        County, so they count the whole list rather than a sample of it. Percentages for page checks
        use the {num(own)} pages that stayed on the business&apos;s own domain as the base.
      </p>

      <h2>How does Cobb County compare with Alabama?</h2>

      <p>
        The <Link href={ALABAMA_PATH}>Alabama study</Link> ran the same query, filters and scripts
        from the same computer, {hoursApart} hours before this run. Its statewide figures come from a random draw
        of {num(A.domains_checked)} sites, so each one carries a margin of error, shown below at 95%
        confidence. A gap smaller than that margin may come from chance alone.
      </p>

      <CompareTable />

      <p>
        The timing rows do not compare. Right after the Cobb run I timed {num(NC.n)} randomly chosen
        Alabama sites again with the same script. Their median first byte came to{" "}
        {num(Math.round(NC.same_sites_now_median_ms))} ms, against{" "}
        {num(Math.round(NC.alabama_recorded_median_ms))} ms for the same sites during the Alabama
        run. The connection was slower during the Cobb run, so the Cobb timings measure that
        evening&apos;s network as much as the sites.
      </p>

      <BarChart
        title="No working home page"
        note="Share of domains checked, Alabama sample in grey"
        bars={pctBars("no_working_home_page", BAR_ROWS)}
      />
      <BarChart
        title="Organization or LocalBusiness structured data"
        note="Share of pages on the business's own domain"
        bars={pctBars("jsonld_business", BAR_ROWS)}
      />
      <BarChart
        title="All three AI search signals"
        note="Business JSON-LD, llms.txt and no AI crawler blocked, as a share of own-domain pages"
        bars={pctBars("all_three_ai_signals", BAR_ROWS)}
      />

      <h2>Where in Cobb County are the sites?</h2>

      <p>
        Each domain belongs to the city whose limits hold its listing. Many businesses with a
        Marietta or Smyrna mailing address sit outside any city limit, in unincorporated Cobb.
        This study reports its checks for the county as a whole, so the table gives counts only.
      </p>
      <table>
        <caption>Business domains in the frame, by city limit</caption>
        <thead>
          <tr>
            <th scope="col">Area</th>
            <th scope="col">Domains</th>
            <th scope="col">Share of county</th>
          </tr>
        </thead>
        <tbody>
          {[...CITIES].sort((a, b) => (fr[b.key] ?? 0) - (fr[a.key] ?? 0)).map((c) => (
            <tr key={c.key}>
              <th scope="row">{c.name}</th>
              <td>{num(fr[c.key] ?? 0)}</td>
              <td>{p(fr[c.key] ?? 0, fr.total)}</td>
            </tr>
          ))}
          <tr>
            <th scope="row">Outside any city limit</th>
            <td>{num(fr.rest_of_county ?? 0)}</td>
            <td>{p(fr.rest_of_county ?? 0, fr.total)}</td>
          </tr>
          <tr>
            <th scope="row">Whole county</th>
            <td>{num(fr.total)}</td>
            <td>{p(fr.total, fr.total)}</td>
          </tr>
        </tbody>
      </table>

      <h2>Full results by check</h2>

      <p>
        Each table lists the count, the share and the base n for Cobb County, with the Alabama
        statewide sample below it. <a href={CSV_PATH} download>Download every Cobb County figure
        as a CSV file</a>. It holds counts, bases and percentages only.
      </p>

      <h3>Does the home page work?</h3>
      <CheckTable
        caption="Home page response, as a share of domains checked"
        keys={["home_page_works", "no_working_home_page", "address_does_not_resolve", "moves_to_other_domain"]}
        baseLabel="domains checked"
        rows={ROWS}
      />
      <p>
        In Cobb County, the {num(C.not_reachable.n)} failures break down as {num(dns)} addresses that
        did not resolve, {num(r.http_404 ?? 0)} 404 errors, {num(r.http_403 ?? 0)} 403 errors,{" "}
        {num(r.tls_cert_verify_failed ?? 0)} certificates that failed verification,{" "}
        {num(r.timeout ?? 0)} timeouts and {num(other)} other errors. A page that ends on a
        different domain counts as working but leaves the base for the checks below.
      </p>

      <h3>Basics on the business&apos;s own page</h3>
      <CheckTable
        caption="https and the viewport tag"
        keys={["https", "no_https", "viewport"]}
        baseLabel="own-domain pages"
        rows={ROWS}
      />
      <CheckTable
        caption="Title, meta description and all four basics"
        keys={["title", "meta_description", "no_meta_description", "all_four_basics"]}
        baseLabel="own-domain pages"
        rows={ROWS}
      />

      <h3>Structured data</h3>
      <CheckTable
        caption="JSON-LD structured data on the home page"
        keys={["jsonld_any", "jsonld_business"]}
        baseLabel="own-domain pages"
        rows={ROWS}
      />

      <h3>AI crawlers and llms.txt</h3>
      <CheckTable
        caption="robots.txt, llms.txt and the three AI signals together"
        keys={["robots_txt", "blocks_any_ai_crawler", "blocks_all_five", "llms_txt", "all_three_ai_signals"]}
        baseLabel="own-domain pages"
        rows={ROWS}
      />
      <CheckTable
        caption="Home page disallowed in robots.txt, by crawler"
        keys={["blocks_gptbot", "blocks_claudebot", "blocks_perplexitybot", "blocks_google_extended", "blocks_ccbot"]}
        baseLabel="own-domain pages"
        rows={ROWS}
      />

      <h3>Speed</h3>
      <SpeedTable rows={ROWS} />
      <p>
        The two rows ran under different network conditions. The control above shows
        the same Alabama sites answering about{" "}
        {num(Math.round(NC.same_sites_now_median_ms - NC.alabama_recorded_median_ms))} ms slower at
        the median during the Cobb run.
      </p>

      <h3>The OpenStreetMap listing</h3>
      <CheckTable
        caption="Opening hours and phone number on the map listing, as a share of domains checked"
        keys={["osm_opening_hours", "osm_phone"]}
        baseLabel="domains checked"
        rows={ROWS}
      />

      <h3>Social pages in place of a website</h3>
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
            <th scope="row">Cobb County</th>
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

      <h2>Method</h2>

      <h3>Sample frame</h3>
      <p>
        Business listings came from OpenStreetMap through the public Overpass API on{" "}
        {day(fetched.cobb)}. The county query ran at {utcTime(fetched.cobb)} UTC and the seven city
        queries between {utcTime(cityTimes[0])} UTC on {day(cityTimes[0])} and{" "}
        {utcTime(cityTimes[cityTimes.length - 1])} UTC on {day(cityTimes[cityTimes.length - 1])}
        {mirrors.length ? <>, on overpass-api.de or, when that server was at capacity, the public mirror at {mirrors.join(" and ")}</> : <>, all on overpass-api.de</>}.
        A network outage stopped the first try at the last city queries, so they ran again later.
        The query asks for every Cobb County listing tagged shop, craft or office, every restaurant,
        cafe, bar, fast food outlet, dentist, doctor&apos;s office, clinic and veterinarian, every
        hotel and every fitness centre, where the listing has a website or contact:website tag. The
        tag set matches the Alabama query line for line. Only the area line differs.
      </p>
      <p>
        Cobb County is the OpenStreetMap boundary with Wikidata id Q484247. Before the run I queried
        that boundary and confirmed its name, Cobb County, and its admin_level, 6, the county level
        in Georgia.
      </p>
      <pre><code>{OVERPASS}</code></pre>
      <p>
        Each city query swaps the second line for the line below, with the Wikidata id of the city:{" "}
        {CITIES.map((c, i) => (
          <span key={c.key}>
            {i === CITIES.length - 1 ? "and " : ""}{c.qid} for {c.name}{i === CITIES.length - 1 ? "." : ", "}
          </span>
        ))}{" "}
        A city query only places county listings in a city. Listings from the part of Austell that
        lies in Douglas County drop out.
      </p>
      <pre><code>{CITY_AREA}</code></pre>

      <h3>Chains, government and social pages</h3>
      <p>
        The county query returned {num(summary.overpass_elements_county)} listings. I dropped
        national and regional chains with the same rule as the Alabama study. A listing counts as a
        chain when it carries a brand or brand:wikidata tag, and any website shared with a
        brand-tagged listing went too. That step removed {num(ex.brand_tagged_elements)} listings
        and {num(ex.chain_domains_dropped)} chain domains. I also dropped{" "}
        {num(ex.nonbusiness_elements)} government, school, religious, nonprofit and association
        listings, including any .gov, .edu, .mil or .ga.us address
        {ex.no_or_bad_url ? <>, and {num(ex.no_or_bad_url)} {ex.no_or_bad_url === 1 ? "listing" : "listings"} with an unusable address</> : null}.{" "}
        {num(ex.social_page_elements)} Facebook, Instagram and Linktree addresses went into the
        social page count. That left {num(fr.total)} unique business domains, {num(inCities)} of
        them inside a city limit.
      </p>

      <h3>The draw</h3>
      <p>
        There is no draw. The study checked every one of the {num(fr.total)} domains, so the county
        figures have no sampling error. They still depend on which businesses volunteers have mapped.
      </p>

      <h3>The checks</h3>
      <p>
        One script ran once on {day(summary.checks_started_utc)}, from {utcTime(summary.checks_started_utc)} to{" "}
        {utcTime(summary.checks_finished_utc)} UTC, on one computer in Tuscaloosa, Alabama. It is the
        same script as the Alabama study. It read the home page only, ran at most four sites at a
        time, allowed 10 seconds per request and sent an ordinary Chrome user agent. It requested
        http://domain/ and followed redirects. If that address refused the connection, it tried
        https://domain/ once. It made no other retries.
      </p>
      <ul>
        <li><strong>Working home page.</strong> The final response has status 200.</li>
        <li><strong>Own domain.</strong> The final address stays on the listed domain. Pages that end on another domain leave the base for every check below.</li>
        <li><strong>https.</strong> The final address uses https.</li>
        <li><strong>Viewport, title, meta description.</strong> The page has a viewport meta tag, a title with text in it and a meta description with text in it.</li>
        <li><strong>Business structured data.</strong> The page has JSON-LD with a type that schema.org lists under Organization, which takes in LocalBusiness and its subtypes such as Restaurant and Dentist.</li>
        <li><strong>AI crawler blocked.</strong> The script read robots.txt under RFC 9309. A crawler counts as blocked when the group that applies to it, its own named group or else the group for all crawlers, disallows the home page. The five crawlers are GPTBot (OpenAI), ClaudeBot (Anthropic), PerplexityBot (Perplexity), Google-Extended (Google AI training control) and CCBot (Common Crawl).</li>
        <li><strong>llms.txt.</strong> The file returns status 200 as plain text with a markdown heading or quote line. An HTML page or a copy of robots.txt does not count. The script fetched every hit a second time to apply this test.</li>
        <li><strong>All three AI signals.</strong> Business structured data, an llms.txt file and none of the five crawlers blocked.</li>
        <li><strong>Time to first byte and HTML download.</strong> Wall-clock time from the request to the first byte and to the end of the HTML, including redirects and connection setup.</li>
        <li><strong>Opening hours and phone.</strong> These come from the OpenStreetMap tags, not from the website.</li>
      </ul>

      <h2>Limits</h2>
      <ul>
        <li>The timings come from a computer in Tuscaloosa, about 200 miles from Cobb County, on a connection that ran slower than during the Alabama run. Treat them as an upper bound, and do not compare them with the Alabama timings. They say nothing about PageSpeed or Core Web Vitals.</li>
        <li>Each site got one try. A site that was down for a few minutes counts as not working, and some sites that block automated requests may show up as not working too.</li>
        <li>OpenStreetMap depends on volunteers. A business appears only if someone mapped it with a website, and mapping density differs between Cobb County and Alabama, so the two lists may hold different kinds of business.</li>
        <li>The Alabama figures come from a random sample and the Cobb figures from the full list. Read the comparison with the Alabama margin of error in mind.</li>
        <li>The city counts depend on city limits. Unincorporated Cobb holds many businesses with a city name in their mailing address.</li>
        <li>robots.txt states a request to crawlers. It does not show firewall or hosting rules that turn AI crawlers away, which some hosts apply by default.</li>
        <li>Many sites get structured data, robots rules and llms.txt from their website platform or an SEO plugin. The figures describe what visitors and crawlers receive, whoever made the choice.</li>
        <li>Python&apos;s certificate store judged the certificates, and it can reject a few sites that a browser would load.</li>
        <li>The structured data check read JSON-LD only, so it missed microdata and RDFa.</li>
        <li>A few regional businesses with several locations and no brand tag remain in the data.</li>
      </ul>

      <h2>What owners can fix</h2>
      <ul>
        <li>
          Run the free <Link href="/ai-visibility-check">AI visibility check</Link> on your own site.
          It reads your robots.txt, llms.txt and home page and lists what to fix.
        </li>
        <li>
          If your web address no longer works, <Link href="/blog/claim-your-google-listing">claim
          your Google listing</Link> first, so customers can still find your phone number and hours.
        </li>
        <li>
          Add a plain sentence that names the business, what it does and the town it serves. The
          post on <Link href="/blog/write-a-page-an-ai-will-quote">how to write a page an AI will
          quote</Link> shows the sentence shape.
        </li>
        <li>
          For structured data, llms.txt and crawler rules in one place, read{" "}
          <Link href="/ai-websites">AI websites for small businesses</Link>.
        </li>
      </ul>

      <h2>Common questions</h2>
      {QA.map(([q, a]) => (
        <div key={q}>
          <h3>{q}</h3>
          <p style={{ marginTop: 6 }}>{a}</p>
        </div>
      ))}

      <h2>Data credit and license</h2>
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
