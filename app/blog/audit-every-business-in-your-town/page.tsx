import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";

export const metadata = {
  alternates: { canonical: "/blog/audit-every-business-in-your-town" },
  title: "How to audit every business in your town in an afternoon | Elijah Purcell",
  description:
    "The method behind auditing 121 independent businesses near the University of Alabama: one free Overpass query against OpenStreetMap, a real HTTP request per site, and the two mistakes that will make your numbers wrong.",
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

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All posts</Link>

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Method · August 20, 2026 · 7 min read</div>
          <h1>
            How to audit every business in your town in an{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>afternoon</em>
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            I pulled every independent business within 2500 metres of the Quad in Tuscaloosa,
            checked whether each one had a website that answers, and had the numbers in about
            forty minutes.{" "}
            <Link href="/blog/121-businesses-near-campus" style={link}>The result was 121
            businesses and 27 working sites</Link>. Here is the whole method, so you can run
            it on your own town.
          </p>

          <p>
            It costs nothing. No API key, no account, no scraping anybody's search results.
          </p>

          <h2 style={H2}>The data source</h2>

          <p>
            OpenStreetMap, queried through Overpass. It is volunteer-maintained, openly
            licensed, permits this use, and it carries exactly the tag that matters:{" "}
            <code>website</code>.
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
            form field called <code>data</code>. Send a real User-Agent with a contact
            address in it. It is a free volunteer service and being identifiable is the rent.
          </p>

          <h2 style={H2}>Filtering to independents</h2>

          <p>
            You do not want chains. Do not try to detect them by name, because you will build
            a list of brand strings and it will be wrong in both directions.
          </p>

          <p>
            OpenStreetMap tags them for you. Drop anything with a <code>brand</code> or{" "}
            <code>brand:wikidata</code> tag. That is one line and it is more accurate than
            anything you would write by hand.
          </p>

          <h2 style={H2}>The check that matters</h2>

          <p>
            For each business with a <code>website</code> tag, make a real request and see
            what happens. This is where both of my mistakes live.
          </p>

          <h2 style={H2}>Mistake one: HEAD is not enough</h2>

          <p>
            I sent HEAD requests, because they are cheap and you only need the status code.
          </p>

          <p>
            Plenty of live servers do not answer HEAD. Two restaurants whose sites are
            perfectly fine came back as broken, and that number reached a published page
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
            Note the 403 and 405 handling too. A server that refuses to be probed is not a
            server that is down, and treating it as down is a false statement about a real
            business.
          </p>

          <h2 style={H2}>Mistake two: the claim you are entitled to make</h2>

          <p>
            The headline I wanted was "93 businesses near campus have no website." I could
            not have that one, because it is not what the data says.
          </p>

          <p>
            OpenStreetMap is volunteer-maintained. A missing <code>website</code> tag does
            not prove no website exists. It proves that <em>a machine looking for one does
            not find it</em>.
          </p>

          <p>
            That turns out to be the better claim anyway, because it is the same question a
            customer with a phone is asking. Nobody types a business into a search bar hoping
            it exists somewhere. They type it hoping something comes back.
          </p>

          <p>
            <strong>Write down the claim your method actually supports before you write the
            headline.</strong> If the honest version is weaker, you either need a different
            method or a different headline, and reaching for the strong version anyway is how
            a piece of research becomes a thing somebody can disprove in one reply.
          </p>

          <h2 style={H2}>What to do with the result</h2>

          <p>
            Sort by how interesting the row is rather than alphabetically. The most
            interesting are the businesses that list a website which no longer answers,
            because they already decided a site was worth paying for and theirs broke. That
            is a much shorter conversation than convincing somebody they need one.
          </p>

          <p>
            Then: name, category, street, and whether the site answers.{" "}
            <strong>Nothing else.</strong> No phone numbers, no email addresses. The moment
            you collect contact details you have built a marketing list, and if the reason
            you told people you were doing this was research, you have made yourself a liar
            in a way that is very easy to notice.
          </p>

          <h2 style={H2}>The whole thing</h2>

          <p>
            One Overpass query, a brand-tag filter, an HTTP request per site with a GET
            fallback, and a sort. Under two hundred lines including the comments explaining
            why the GET fallback is not optional.
          </p>

          <p>
            I am using mine to write about{" "}
            <Link href="/blog/tuscaloosa-small-business-online" style={link}>independent
            businesses near campus</Link>, one at a time. If you run it on your town and find
            something surprising,{" "}
            <a href="mailto:elijah@purcell-ventures.com" style={link}>I would like to hear
            it</a>.
          </p>

          <PostFaq qa={[
            ["How can I find businesses without a website?",
             "Query OpenStreetMap through the Overpass API for shops and food businesses within a radius of a point, drop anything carrying a brand or brand:wikidata tag to remove chains, then make a real HTTP request to every website tag that exists. It is free, needs no API key, and takes an afternoon."],
            ["Is it accurate to say a business has no website if OpenStreetMap has no website tag?",
             "No, and claiming it is the main way this kind of audit goes wrong. OpenStreetMap is volunteer-maintained, so a missing tag proves that a machine looking for a website does not find one, not that none exists. The honest claim is the more useful one anyway, because it is the same question a customer with a phone is asking."],
            ["Why do HEAD requests give the wrong answer when checking if a site is live?",
             "Plenty of live servers do not answer HEAD requests. Checking with HEAD alone marks working sites as broken. Fall back to GET whenever HEAD fails, and treat a 403 or 405 as working rather than down, because a server refusing to be probed is not a server that is offline."],
          ]} />

          <PostByline post={{
            slug: "audit-every-business-in-your-town",
            title: "How to audit every business in your town in an afternoon",
            description: "The method behind auditing 121 independent businesses: one free Overpass query, a real HTTP request per site, and the two mistakes that make your numbers wrong.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
