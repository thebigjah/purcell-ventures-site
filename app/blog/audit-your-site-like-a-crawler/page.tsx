import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata = {
  alternates: { canonical: "/blog/audit-your-site-like-a-crawler" },
  title: { absolute: "Audit your own site the way a crawler does, with curl | Elijah Purcell" },
  description:
    "Nine checks you can run against your live site from a terminal, no tools and no account: canonical tags pointing at the wrong page, duplicate titles, sitemap and robots contradictions, missing structured data, and pages that silently tell Google to skip them.",
};

const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "25px", fontWeight: 600, lineHeight: 1.2, margin: "40px 0 10px" } as const;
const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };
const pre: React.CSSProperties = {
  background: "rgba(0,0,0,0.28)", border: "1px solid rgba(212,175,55,0.18)",
  padding: "14px 16px", overflowX: "auto", fontSize: "13px", lineHeight: 1.6,
  fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", margin: "14px 0",
};

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: "Audit your site like a crawler", href: "/blog/audit-your-site-like-a-crawler" },
        ]} />

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Engineering, August 20, 2026, 9 min read</div>
          <h1>
            Audit your own site the way a{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>crawler</em> does
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            These nine curl checks take about twenty minutes in a terminal and need no
            account. I ran every one of them against my own site today and found six
            problems. One of them had kept nine pages out of Google.
          </p>

          <p>
            I use curl instead of a crawler product because curl shows the raw response,
            which is what a search engine sees. A product shows you its interpretation of
            that response.
          </p>

          <h2 style={H2}>1. Does every page canonicalise to itself</h2>

          <p>
            This is the one that cost me nine pages. A canonical tag pointing somewhere else
            says "I am a duplicate, index that instead," and Google does exactly that.
          </p>

          <div style={pre}>{`curl -sL https://example.com/some/page | grep -o 'rel="canonical"[^>]*'`}</div>

          <p>
            If the href is not the URL you just requested, that page has handed its value to
            another one. Check a page from every section, not just the homepage: the usual
            cause is a shared layout handing its own canonical to every child route.{" "}
            I wrote up the full story in{" "}
            <Link href="/blog/canonical-tag-noindex" style={link}>how one canonical tag hid nine pages</Link>.
          </p>

          <h2 style={H2}>2. Is anything accidentally noindex</h2>

          <div style={pre}>{`curl -sIL https://example.com/page | grep -i x-robots-tag
curl -sL  https://example.com/page | grep -o '<meta name="robots"[^>]*'`}</div>

          <p>
            Check the header as well as the tag. An <code>X-Robots-Tag</code> set at the edge
            or in middleware is invisible in the HTML and overrides everything you can see in
            the source, and{" "}
            <a href="https://developers.google.com/search/docs/crawling-indexing/block-indexing" style={link} rel="noopener">Google treats the two as equivalent directives</a>.
          </p>

          <h2 style={H2}>3. Does your sitemap contradict your robots.txt</h2>

          <p>
            A URL that appears in the sitemap and is also disallowed in robots.txt is a
            contradiction. The page can still show up in results as a bare link with no
            description, because the crawler was never allowed to read it.{" "}
            <a href="https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap" style={link} rel="noopener">The sitemap documentation</a>{" "}
            says a sitemap asks for a crawl. It does not override robots.txt.
          </p>

          <div style={pre}>{`curl -s https://example.com/sitemap.xml | grep -o '<loc>[^<]*' | sed 's/<loc>//' > urls.txt
curl -s https://example.com/robots.txt | grep -i '^disallow'`}</div>

          <p>Then check each sitemap path against each disallow prefix. I had five.</p>

          <h2 style={H2}>4. Are any two pages sharing a title</h2>

          <p>
            Duplicate titles waste crawl budget and make a search engine choose between your
            own pages. Mine came from three section layouts handing their title to every
            child.
          </p>

          <div style={pre}>{`while read u; do
  printf '%s\\t' "$u"
  curl -sL "$u" | grep -o '<title>[^<]*' | head -1
done < urls.txt | sort -k2 | uniq -f1 -D`}</div>

          <h2 style={H2}>5. Does your structured data parse</h2>

          <p>
            Check that the markup parses, beyond checking that it is present. Google skips a
            JSON-LD block with a trailing comma without any warning, and the page behaves as
            if you never wrote it. Valid markup does not replace the content itself, so also
            read{" "}
            <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" style={link} rel="noopener">Google's guidance on which content it evaluates</a>.
          </p>

          <div style={pre}>{`curl -sL https://example.com/page | python3 -c '
import sys, re, json
h = sys.stdin.read()
for b in re.findall(r"<script[^>]*ld\\+json[^>]*>(.*?)</script>", h, re.S):
    try:
        d = json.loads(b)
        print("ok  ", d.get("@type"))
    except Exception as e:
        print("FAIL", e)
'`}</div>

          <h2 style={H2}>6. Does your entity have one identity or several</h2>

          <p>
            If your site names a person or an organisation in several places, every one of
            those nodes needs the same <code>@id</code>. Without it you are describing
            several different people who happen to share a name, on your own domain, which is
            the exact ambiguity you are presumably trying to remove.
          </p>

          <p>
            Extract every <code>@type: Person</code> across the site and count the distinct
            identifiers. Mine was twelve, three of them anonymous. It should be one.
          </p>

          <h2 style={H2}>7. Does the title contain the term you want to rank for</h2>

          <p>
            The title tag is the strongest
            on-page signal for a query, and my homepage did not contain my own name, which
            meant the highest-authority page on my domain could not rank for it.
          </p>

          <div style={pre}>{`while read u; do
  t=$(curl -sL "$u" | grep -o '<title>[^<]*' | head -1)
  case "$t" in *"Your Thing"*) : ;; *) echo "MISSING: $u  $t";; esac
done < urls.txt`}</div>

          <h2 style={H2}>8. How fast is it</h2>

          <div style={pre}>{`curl -sL -o /dev/null -w 'ttfb %{time_starttransfer}s  total %{time_total}s  %{size_download} bytes\\n' \\
  https://example.com/page`}</div>

          <p>
            Time to first byte is the number worth watching, because it is the part your
            hosting and your server code control. If it is under about 200 milliseconds,
            speed is not your bottleneck and your time is better spent on the other checks.
          </p>

          <h2 style={H2}>9. What is indexed</h2>

          <p>
            Search <code>site:yourdomain.com</code> in a browser, signed out. Count the
            results and compare that number to your sitemap.
          </p>

          <p>
            I had 7 pages indexed against 28 in the sitemap. That gap is the most useful
            number in this list, and it takes ten seconds to get.
          </p>

          <h2 style={H2}>Check rankings in a browser</h2>

          <p>
            One warning from today. A search API queries a separate index with its own
            ranking, and for a low-volume query its results and Google's can disagree
            completely.
          </p>

          <p>
            I optimised against an API result set for half a day and named the wrong
            competitor on three live pages before checking in a browser and finding
            that the person I was distinguishing myself from does not appear in the top
            twenty at all.
          </p>

          <p>
            Anything you are about to publish about where you rank, check it in a browser
            first, signed out, and write down the date.
          </p>

          <PostFaq qa={[
            ["What is the difference between a noindex tag and a canonical tag?",
             "A noindex directive says do not index this page at all. A canonical tag says this page is a duplicate of another one, so index that other one and give it the credit. The canonical is easier to set by accident, because it looks correct in the file where it is written and only misbehaves when child pages inherit it."],
          ]} />

          <PostByline post={{
            slug: "audit-your-site-like-a-crawler",
            title: "Audit your own site the way a crawler does, with curl",
            description: "Nine checks you can run against your live site from a terminal, no tools and no account.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
