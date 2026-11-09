import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import summary from "@/lib/research/alabama-2026-11-summary.json";
import { AREAS, CITIES, GROUPS, pct, socialRows } from "@/lib/research/alabama-2026.mjs";
import { QA } from "./layout";

// Every number on this page is read from the summary JSON at build time, through the
// measure code in lib/research/alabama-2026.mjs that also writes the downloadable CSV.
// Aggregates only. No domain or business name may appear here.

type Frame = (typeof summary.frames)["statewide"];
type AreaKey = "statewide" | "tuscaloosa" | "birmingham" | "huntsville" | "montgomery" | "mobile";

const F = summary.frames as unknown as Record<AreaKey, Frame>;
const S = F.statewide;
const CSV_PATH = "/research/alabama-small-business-websites-2026-aggregates.csv";

const num = (n: number) => n.toLocaleString("en-US");
const p = (n: number, base: number) => `${pct(n, base).toFixed(1)}%`;

const MEASURE = Object.fromEntries(
  GROUPS.flatMap((g) => g.measures.map((m) => [m.key, { ...m, baseLabel: g.baseLabel }])),
) as Record<string, { key: string; label: string; get: (f: Frame) => { n: number; base: number }; baseNote?: string; baseLabel: string }>;

function utcTime(iso: string) {
  return iso.slice(11, 16);
}

/* ---------- tables ---------- */

function CheckTable({ caption, keys, baseLabel }: { caption: string; keys: string[]; baseLabel: string }) {
  const ms = keys.map((k) => MEASURE[k]);
  return (
    <table>
      <caption>{caption}</caption>
      <thead>
        <tr>
          <th scope="col">Area</th>
          <th scope="col">Base n ({baseLabel})</th>
          {ms.map((m) => (
            <th scope="col" key={m.key}>{m.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {AREAS.map((a) => {
          const f = F[a.key as AreaKey];
          const base = ms[0].get(f).base;
          return (
            <tr key={a.key}>
              <th scope="row">{a.name}</th>
              <td>{num(base)}</td>
              {ms.map((m) => {
                const v = m.get(f);
                return (
                  <td key={m.key}>
                    {v.base === base ? `${num(v.n)} (${p(v.n, v.base)})` : `${num(v.n)} of ${num(v.base)} (${p(v.n, v.base)})`}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function SpeedTable() {
  return (
    <table>
      <caption>Speed of the home page HTML, timed from one computer in Tuscaloosa</caption>
      <thead>
        <tr>
          <th scope="col">Area</th>
          <th scope="col">Base n (own-domain pages)</th>
          <th scope="col">Median first byte</th>
          <th scope="col">75th percentile first byte</th>
          <th scope="col">First byte over 800 ms</th>
          <th scope="col">Median HTML download</th>
          <th scope="col">HTML download over 2 seconds</th>
          <th scope="col">Median HTML size</th>
        </tr>
      </thead>
      <tbody>
        {AREAS.map((a) => {
          const f = F[a.key as AreaKey];
          const b = f.own_domain_pages;
          return (
            <tr key={a.key}>
              <th scope="row">{a.name}</th>
              <td>{num(b)}</td>
              <td>{num(f.ttfb_ms.median)} ms</td>
              <td>{num(f.ttfb_ms.p75)} ms</td>
              <td>{num(f.ttfb_ms.over_800ms_n)} ({p(f.ttfb_ms.over_800ms_n, b)})</td>
              <td>{num(f.html_download_ms.median)} ms</td>
              <td>{num(f.html_download_ms.over_2000ms_n)} ({p(f.html_download_ms.over_2000ms_n, b)})</td>
              <td>{num(Math.round(f.html_bytes.median / 1000))} KB</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/* ---------- charts ---------- */

type Bar = { name: string; n: number; base: number; value: number; text: string; ref?: boolean };

function BarChart({ title, bars, note }: { title: string; bars: Bar[]; note: string }) {
  const max = Math.max(...bars.map((b) => b.value)) * 1.1;
  return (
    <figure className="rs-chart">
      <figcaption>
        <span className="rs-chart__title">{title}</span>
        <span className="rs-chart__note">{note}</span>
      </figcaption>
      <ul className="rs-bars">
        {bars.map((b) => (
          <li className={`rs-bar${b.ref ? " rs-bar--ref" : ""}`} key={b.name}>
            <span className="rs-bar__label">
              {b.name}
              <span className="rs-bar__n">n = {num(b.base)}</span>
            </span>
            <span className="rs-bar__track" aria-hidden="true">
              <span className="rs-bar__fill" style={{ width: `${(b.value / max) * 100}%` }} />
            </span>
            <span className="rs-bar__val">{b.text}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

function pctBars(key: string): Bar[] {
  const m = MEASURE[key];
  const row = (name: string, f: Frame, ref?: boolean): Bar => {
    const v = m.get(f);
    return { name, n: v.n, base: v.base, value: pct(v.n, v.base), text: p(v.n, v.base), ref };
  };
  return [row("Alabama sample", S, true), ...CITIES.map((c) => row(c.name, F[c.key as AreaKey]))];
}

function ttfbBars(): Bar[] {
  const row = (name: string, f: Frame, ref?: boolean): Bar => ({
    name, n: f.ttfb_ms.median, base: f.own_domain_pages, value: f.ttfb_ms.median, text: `${num(f.ttfb_ms.median)} ms`, ref,
  });
  return [row("Alabama sample", S, true), ...CITIES.map((c) => row(c.name, F[c.key as AreaKey]))];
}

/* ---------- page ---------- */

const OVERPASS = `[out:json][timeout:180];
area["ISO3166-2"="US-AL"]["admin_level"="4"]->.a;
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

export default function AlabamaWebsites2026() {
  const own = S.own_domain_pages;
  const checked = S.domains_checked;
  const dns = S.not_reachable.by_reason.dns_failed;
  const noMeta = own - S.meta_description.n;
  const ex = summary.excluded;
  const fr = summary.frame;
  const fetched = summary.overpass_fetched_utc;

  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Research", href: "/research" },
        { name: "Alabama small business websites, 2026", href: "/research/alabama-small-business-websites-2026" },
      ]} />}
      title="Alabama small business websites, November 2026"
      lede={`I checked the home pages of ${num(checked)} randomly drawn Alabama small business websites, and every listed business site in five cities, on 9 November 2026.`}
      meta={<>Published <time dateTime="2026-11-09">9 November 2026</time>. By Elijah Purcell, Purcell Ventures, Tuscaloosa.</>}
    >
      <h2>What did the check find?</h2>

      <ul>
        <li>
          {num(S.not_reachable.n)} of {num(checked)} sites ({p(S.not_reachable.n, checked)}) had no
          working home page. For {num(dns)} of them ({p(dns, checked)} of all {num(checked)}), the web
          address no longer resolves at all.
        </li>
        <li>
          Of the {num(own)} working pages on the business&apos;s own domain, {num(S.jsonld_org_or_localbusiness.n)}{" "}
          ({p(S.jsonld_org_or_localbusiness.n, own)}) carry Organization or LocalBusiness structured
          data. {num(S.all_three_ai_signals.n)} ({p(S.all_three_ai_signals.n, own)}) carry all three AI
          search signals I checked: business structured data, an llms.txt file, and no AI crawler
          blocked in robots.txt.
        </li>
        <li>
          {num(S.robots_blocks_any_ai_bot.n)} ({p(S.robots_blocks_any_ai_bot.n, own)}) block at least one
          of five AI crawlers in robots.txt.
        </li>
        <li>
          {num(S.no_https.n)} ({p(S.no_https.n, own)}) never reach https, {num(noMeta)} ({p(noMeta, own)})
          have no meta description, and the median time to first byte came to {num(S.ttfb_ms.median)} ms.
        </li>
      </ul>

      <p>
        The statewide figures come from a random draw of {num(checked)} of the{" "}
        {num(fr.total)} business domains that OpenStreetMap lists for Alabama. The city figures
        cover every listed domain inside each city limit. Percentages for page checks use the{" "}
        {num(own)} pages that stayed on the business&apos;s own domain as the base.
      </p>

      <h2>How do the five cities compare?</h2>

      <p>
        Each bar shows one city&apos;s share, with the statewide sample in grey for reference. The n
        under each name is the base for that bar. Montgomery and Tuscaloosa have small bases, so a
        single site moves their figures by two to three points.
      </p>

      <BarChart
        title="No working home page"
        note="Share of domains checked"
        bars={pctBars("no_working_home_page")}
      />
      <BarChart
        title="Organization or LocalBusiness structured data"
        note="Share of pages on the business's own domain"
        bars={pctBars("jsonld_business")}
      />
      <BarChart
        title="All three AI search signals"
        note="Business JSON-LD, llms.txt and no AI crawler blocked, as a share of own-domain pages"
        bars={pctBars("all_three_ai_signals")}
      />
      <BarChart
        title="Median time to first byte"
        note="Milliseconds from one computer in Tuscaloosa, lower is faster"
        bars={ttfbBars()}
      />

      <h2>Full results by check</h2>

      <p>
        Each table lists the count, the share and the base n for the statewide sample and the five
        cities. <a href={CSV_PATH} download>Download every figure as a CSV file</a>. It holds
        counts, bases and percentages only.
      </p>

      <h3>Does the home page work?</h3>
      <CheckTable
        caption="Home page response, as a share of domains checked"
        keys={["home_page_works", "no_working_home_page", "address_does_not_resolve", "moves_to_other_domain"]}
        baseLabel="domains checked"
      />
      <p>
        Statewide, the {num(S.not_reachable.n)} failures break down as {num(dns)} addresses that did
        not resolve, {num(S.not_reachable.by_reason.http_404)} 404 errors,{" "}
        {num(S.not_reachable.by_reason.http_403)} 403 errors,{" "}
        {num(S.not_reachable.by_reason.tls_cert_verify_failed)} certificates that failed verification,{" "}
        {num(S.not_reachable.by_reason.timeout)} timeouts and{" "}
        {num(
          S.not_reachable.n - dns - S.not_reachable.by_reason.http_404 - S.not_reachable.by_reason.http_403 -
          S.not_reachable.by_reason.tls_cert_verify_failed - S.not_reachable.by_reason.timeout,
        )}{" "}
        other errors. A page that ends on a different domain counts as working but leaves the base
        for the checks below.
      </p>

      <h3>Basics on the business&apos;s own page</h3>
      <CheckTable
        caption="https and the viewport tag"
        keys={["https", "no_https", "viewport"]}
        baseLabel="own-domain pages"
      />
      <CheckTable
        caption="Title, meta description and all four basics"
        keys={["title", "meta_description", "no_meta_description", "all_four_basics"]}
        baseLabel="own-domain pages"
      />

      <h3>Structured data</h3>
      <CheckTable
        caption="JSON-LD structured data on the home page"
        keys={["jsonld_any", "jsonld_business"]}
        baseLabel="own-domain pages"
      />

      <h3>AI crawlers and llms.txt</h3>
      <CheckTable
        caption="robots.txt, llms.txt and the three AI signals together"
        keys={["robots_txt", "blocks_any_ai_crawler", "blocks_all_five", "llms_txt", "all_three_ai_signals"]}
        baseLabel="own-domain pages"
      />
      <CheckTable
        caption="Home page disallowed in robots.txt, by crawler"
        keys={["blocks_gptbot", "blocks_claudebot", "blocks_perplexitybot", "blocks_google_extended", "blocks_ccbot"]}
        baseLabel="own-domain pages"
      />

      <h3>Speed</h3>
      <SpeedTable />

      <h3>The OpenStreetMap listing</h3>
      <CheckTable
        caption="Opening hours and phone number on the map listing, as a share of domains checked"
        keys={["osm_opening_hours", "osm_phone"]}
        baseLabel="domains checked"
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
          {socialRows(summary).map((r) => (
            <tr key={r.area}>
              <th scope="row">{r.area === "statewide" ? "All of Alabama" : r.areaName}</th>
              <td>{num(r.base)}</td>
              <td>{num(r.n)} ({r.percent.toFixed(1)}%)</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        This row counts every listing in Alabama, before the random draw.
      </p>

      <h2>Method</h2>

      <h3>Sample frame</h3>
      <p>
        Business listings came from OpenStreetMap through the public Overpass API at
        overpass-api.de on 9 November 2026. The statewide query ran at {utcTime(fetched.statewide)} UTC
        and the five city queries between {utcTime(fetched.tuscaloosa)} and {utcTime(fetched.mobile)} UTC.
        The query asks for every Alabama listing tagged shop, craft or office, every restaurant, cafe,
        bar, fast food outlet, dentist, doctor&apos;s office, clinic and veterinarian, every hotel and
        every fitness centre, where the listing has a website or contact:website tag.
      </p>
      <pre><code>{OVERPASS}</code></pre>
      <p>
        Each city query swaps the second line for the line below, with the Wikidata id of the
        city: Q79580 for Tuscaloosa, Q79867 for Birmingham, Q79860 for Huntsville, Q29364 for
        Montgomery and Q79875 for Mobile.
      </p>
      <pre><code>{CITY_AREA}</code></pre>

      <h3>Chains, government and social pages</h3>
      <p>
        I dropped national and regional chains. A listing counts as a chain when it carries a brand
        or brand:wikidata tag, and any website shared with a brand-tagged listing went too. That
        step removed {num(ex.brand_tagged_elements)} listings and {num(ex.chain_domains_dropped)} chain
        domains. I also dropped {num(ex.nonbusiness_elements)} government, school, religious, nonprofit
        and association listings, including any .gov, .edu, .mil or .al.us address, and{" "}
        {num(ex.no_or_bad_url)} listing with an unusable address. {num(ex.social_page_elements)} Facebook,
        Instagram and Linktree addresses went into the social page count. That left {num(fr.total)}{" "}
        unique business domains: Tuscaloosa {num(fr.tuscaloosa)}, Birmingham {num(fr.birmingham)},
        Huntsville {num(fr.huntsville)}, Montgomery {num(fr.montgomery)}, Mobile {num(fr.mobile)}, and{" "}
        {num(fr.rest_of_state)} elsewhere in Alabama.
      </p>

      <h3>The draw</h3>
      <p>
        The statewide sample is a simple random draw of {num(checked)} of the {num(fr.total)} domains,
        using Python&apos;s random module with seed 20261109. The city figures cover every domain in
        each city, so they count the whole OpenStreetMap list for that city.
      </p>

      <h3>The checks</h3>
      <p>
        One script ran once on 9 November 2026, from {utcTime(summary.checks_started_utc)} to{" "}
        {utcTime(summary.checks_finished_utc)} UTC, on one computer in Tuscaloosa. It read the home
        page only, ran at most four sites at a time, allowed 10 seconds per request and sent an
        ordinary Chrome user agent. It requested http://domain/ and followed redirects. If that
        address refused the connection, it tried https://domain/ once. It made no other retries.
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
        <li>These timings say nothing about PageSpeed or Core Web Vitals. They cover one machine waiting for the HTML of the home page, with no images, scripts or rendering.</li>
        <li>Each site got one try. A site that was down for a few minutes counts as not working, and some sites that block automated requests may show up as not working too.</li>
        <li>OpenStreetMap depends on volunteers. A business appears only if someone mapped it with a website, coverage differs from city to city, and some listings are out of date.</li>
        <li>Montgomery ({num(fr.montgomery)} domains) and Tuscaloosa ({num(fr.tuscaloosa)} domains) are small groups, so one site moves their percentages by two to three points.</li>
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
