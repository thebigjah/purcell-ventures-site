import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata = {
  alternates: { canonical: "/blog/audit-every-business-in-your-town" },
  title: { absolute: "How to audit every business in your town in an afternoon, by Elijah Purcell" },
  description:
    "The method behind auditing 121 independent businesses near the University of Alabama: one free Overpass query against OpenStreetMap, an HTTP request per site, and the two mistakes that will make your numbers wrong.",
};

const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "25px", fontWeight: 600, lineHeight: 1.2, margin: "42px 0 12px" } as const;
const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };
const pre: React.CSSProperties = {
  background: "rgba(0,0,0,0.28)", border: "1px solid rgba(212,175,55,0.18)",
  padding: "14px 16px", overflowX: "auto", fontSize: "13px", lineHeight: 1.6,
  fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", margin: "16px 0",
};

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: "How to audit every business in your town in an afternoon", href: "/blog/audit-every-business-in-your-town" },
        ]} />
        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Method, August 20, 2026, 7 min read</div>
          <h1>
            How to audit every business in your town in an{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>afternoon</em>
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            I pulled every independent business within 2500 metres of the Quad in Tuscaloosa,
            checked whether each one had a website that answers, and had the numbers in
            forty minutes.{" "}
            <Link href="/blog/121-businesses-near-campus" style={link}>The result was 121
            businesses and 27 working sites</Link>. Here is the whole method, so you can run
            it on your own town.
          </p>

          <p>
            It costs nothing. The method needs no API key and no account, and it does not scrape anybody's search results.
          </p>

          <h2 style={H2}>The data source</h2>

          <p>
            OpenStreetMap, queried through{" "}
            <a href="https://wiki.openstreetmap.org/wiki/Overpass_API" style={link} rel="noopener">Overpass</a>.
            It is volunteer-maintained, openly licensed, permits this use, and it carries
            exactly the tag that matters:{" "}
            <a href="https://wiki.openstreetmap.org/wiki/Key:website" style={link} rel="noopener"><code>website</code></a>.
          </p>

          <p>
            Overpass takes a query language that looks alarming and is mostly mechanical.
            The shape you need is: for each kind of business, find every node and way within
            a radius of a point.
          </p>

          <div style={pre}>{`[out:json][timeout:90];
(
  node["shop"="hairdresser"](around:2500,33.2140,-87.5460);
  way ["shop"="hairdresser"](around:2500,33.2140,-87.5460);
  node["amenity"="restaurant"](around:2500,33.2140,-87.5460);
  way ["amenity"="restaurant"](around:2500,33.2140,-87.5460);
);
out center tags;`}</div>

          <p>
            Those coordinates are the centre of your circle. Get them by right-clicking any
            point in OpenStreetMap. Repeat the node and way pair for every category you care
            about: <code>shop=barber</code>, <code>shop=clothes</code>,{" "}
            <code>shop=books</code>, <code>amenity=cafe</code>, and so on.
          </p>

          <p>
            POST that to <code>overpass-api.de/api/interpreter</code> with the query in a
            form field called <code>data</code>. Send a User-Agent with a contact address in
            it. It is a free volunteer service, and the address lets the operators reach you.
          </p>

          <h2 style={H2}>Filtering to independents</h2>

          <p>
            You do not want chains. Do not try to detect them by name, because you will build
            a list of brand strings and it will be wrong in both directions.
          </p>

          <p>
            OpenStreetMap tags them for you. Drop anything with a <code>brand</code> or{" "}
            <code>brand:wikidata</code> tag. That is one line of code.
          </p>

          <h2 style={H2}>The check that matters</h2>

          <p>
            For each business with a <code>website</code> tag, make a request and see what
            happens. Both of my mistakes were here.
          </p>

          <h2 style={H2}>Mistake one: HEAD is not enough</h2>

          <p>
            I sent HEAD requests, because they are cheap and you only need the status code.
          </p>

          <p>
            Plenty of live servers do not answer HEAD. Two restaurants with working sites
            came back as broken, and that number reached a published page
            before I caught it. I had to correct the post in public.
          </p>

          <p>Fall back to GET whenever HEAD fails:</p>

          <div style={pre}>{`for method in ("HEAD", "GET"):
    try:
        r = request(url, method=method)
        if r.status < 400:
            return "OK"
    except HTTPError as e:
        if e.code in (403, 405):
            return "OK"        # refusing the probe is not being down
        last = f"HTTP {e.code}"
    except Exception:
        last = "DEAD"
return last`}</div>

          <p>
            Note the 403 and 405 handling too. A server that refuses a probe is up. Marking it
            down misreports the business.
          </p>

          <h2 style={H2}>Mistake two: the claim you are entitled to make</h2>

          <p>
            The headline I wanted was "93 businesses near campus have no website." The data
            does not support it.
          </p>

          <p>
            OpenStreetMap is volunteer-maintained. A missing <code>website</code> tag does
            not prove no website exists. It proves that <em>a machine looking for one does
            not find it</em>.
          </p>

          <p>
            A customer searching on a phone runs into the same gap, so that claim is still
            worth publishing.
          </p>

          <p>
            <strong>Write down the claim your method supports before you write the
            headline.</strong> If the supported claim is weaker, change the method or the
            headline. Somebody can disprove an overstated claim in one reply.
          </p>

          <h2 style={H2}>What to do with the result</h2>

          <p>
            Sort the businesses that list a website which no longer answers to the top,
            because they already decided a site was worth paying for and theirs broke. That
            is a much shorter conversation than convincing somebody they need one.
          </p>

          <p>
            Keep only name, category, street, and whether the site answers. Leave out phone
            numbers and email addresses. Once
            you collect contact details you have a marketing list. If you told people you
            were doing research, you have lied to them, and people notice.
          </p>

          <h2 style={H2}>What I am using it for</h2>

          <p>
            My script is under two hundred lines. I am using it to write about{" "}
            <Link href="/blog/tuscaloosa-small-business-online" style={link}>independent
            businesses near campus</Link>, one at a time. If you run it on your town and find
            something surprising,{" "}
            <a href="mailto:elijah@purcell-ventures.com" style={link}>I would like to hear
            it</a>.
          </p>

          <PostByline post={{
            slug: "audit-every-business-in-your-town",
            title: "How to audit every business in your town in an afternoon",
            description: "The method behind auditing 121 independent businesses: one free Overpass query, an HTTP request per site, and the two mistakes that make your numbers wrong.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
