import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";

export const metadata = {
  alternates: { canonical: "/blog/audit-your-site-like-a-crawler" },
  title: { absolute: "Auditing your own site the way a crawler does, with curl" },
  description:
    "Nine checks you can run against your live site from a terminal with curl and no account: canonical tags pointing at the wrong page, duplicate titles, sitemap and robots contradictions, missing structured data, and pages that silently tell Google to skip them.",
};


export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: "Auditing your site like a crawler", href: "/blog/audit-your-site-like-a-crawler" },
      ]} />}
      kicker="Engineering"
      title="Auditing your own site the way a crawler does"
      meta="20 August 2026, 9 minute read"
    >
      <p>
        These nine curl checks take twenty minutes in a terminal and need no
        account. I ran every one of them against my own site today and found six
        problems, one of which had kept nine pages out of Google.
      </p>

      <p>
        I use curl instead of a crawler product because curl shows the raw response,
        which is what a search engine sees. A product shows you its interpretation of
        that response.
      </p>

      <h2>1. Pages that canonicalise to a different URL</h2>

      <p>
        This check found the problem that kept nine of my pages out of Google. A canonical tag pointing somewhere else
        says "I am a duplicate, index that instead," and Google does exactly that.
      </p>

      <pre><code>{`curl -sL https://example.com/some/page | grep -o 'rel="canonical"[^>]*'`}</code></pre>

      <p>
        If the href is not the URL you requested, that page has handed its value to
        another one. Check a page from every section, because the usual
        cause is a shared layout handing its own canonical to every child route.{" "}
        I wrote up the full story in{" "}
        <Link href="/blog/canonical-tag-noindex">how one canonical tag hid nine pages</Link>.
      </p>

      <h2>2. Pages set to noindex by accident</h2>

      <pre><code>{`curl -sIL https://example.com/page | grep -i x-robots-tag
curl -sL  https://example.com/page | grep -o '<meta name="robots"[^>]*'`}</code></pre>

      <p>
        Check the header as well as the tag. An <code>X-Robots-Tag</code> set at the edge
        or in middleware is invisible in the HTML and overrides everything you can see in
        the source, and{" "}
        <a href="https://developers.google.com/search/docs/crawling-indexing/block-indexing" rel="noopener">Google treats the two as equivalent directives</a>.
      </p>

      <h2>3. Sitemap URLs that robots.txt blocks</h2>

      <p>
        A URL that appears in the sitemap and is also disallowed in robots.txt is a
        contradiction. The page can still show up in results as a bare link with no
        description, because the crawler was never allowed to read it.{" "}
        <a href="https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap" rel="noopener">The sitemap documentation</a>{" "}
        says a sitemap asks for a crawl and does not override robots.txt.
      </p>

      <pre><code>{`curl -s https://example.com/sitemap.xml | grep -o '<loc>[^<]*' | sed 's/<loc>//' > urls.txt
curl -s https://example.com/robots.txt | grep -i '^disallow'`}</code></pre>

      <p>Then check each sitemap path against each disallow prefix. My site had five of these conflicts.</p>

      <h2>4. Duplicate page titles</h2>

      <p>
        Duplicate titles waste crawl budget and make a search engine choose between your
        own pages. Mine came from three section layouts handing their title to every
        child.
      </p>

      <pre><code>{`while read u; do
  printf '%s\\t' "$u"
  curl -sL "$u" | grep -o '<title>[^<]*' | head -1
done < urls.txt | sort -k2 | uniq -f1 -D`}</code></pre>

      <h2>5. Structured data that fails to parse</h2>

      <p>
        Markup that exists can still be broken, so test that it parses. Google skips a
        JSON-LD block with a trailing comma without any warning, and the page behaves as
        if you never wrote it. Valid markup does not replace the content itself, so also
        read{" "}
        <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" rel="noopener">Google's guidance on which content it evaluates</a>.
      </p>

      <pre><code>{`curl -sL https://example.com/page | python3 -c '
import sys, re, json
h = sys.stdin.read()
for b in re.findall(r"<script[^>]*ld\\+json[^>]*>(.*?)</script>", h, re.S):
    try:
        d = json.loads(b)
        print("ok  ", d.get("@type"))
    except Exception as e:
        print("FAIL", e)
'`}</code></pre>

      <h2>6. One @id for each person or organisation</h2>

      <p>
        If your site names a person or an organisation in several places, every one of
        those nodes needs the same <code>@id</code>. Without it you are describing
        several different people who happen to share a name, on your own domain, which is
        the ambiguity the markup exists to remove.
      </p>

      <p>
        Extract every <code>@type: Person</code> across the site and count the distinct
        identifiers. My site had twelve, three of them anonymous, and it should have had one.
      </p>

      <h2>7. The search term in the page title</h2>

      <p>
        The title tag is a strong
        on-page signal for a query, and my homepage did not contain my own name, which
        meant the highest-authority page on my domain could not rank for it.
      </p>

      <pre><code>{`while read u; do
  t=$(curl -sL "$u" | grep -o '<title>[^<]*' | head -1)
  case "$t" in *"Your Thing"*) : ;; *) echo "MISSING: $u  $t";; esac
done < urls.txt`}</code></pre>

      <h2>8. Page speed</h2>

      <pre><code>{`curl -sL -o /dev/null -w 'ttfb %{time_starttransfer}s  total %{time_total}s  %{size_download} bytes\\n' \\
  https://example.com/page`}</code></pre>

      <p>
        Time to first byte is the number worth watching, because it is the part your
        hosting and your server code control. If it is under 200 milliseconds,
        speed is not your bottleneck and your time is better spent on the other checks.
      </p>

      <h2>9. How many pages Google has indexed</h2>

      <p>
        Search <code>site:yourdomain.com</code> in a browser, signed out. Count the
        results and compare that number to your sitemap.
      </p>

      <p>
        I had 7 pages indexed against 28 in the sitemap. That gap shows the problem
        faster than any other check here, and it takes ten seconds to get.
      </p>

      <h2>Why I check rankings in a browser</h2>

      <p>
        A search API queries a separate index with its own
        ranking, and for a low-volume query its results and Google's can disagree
        completely.
      </p>

      <p>
        I optimised against an API result set for half a day and named the wrong
        competitor on three live pages before checking in a browser and finding
        that the person I was distinguishing myself from does not appear in the top
        twenty.
      </p>

      <p>
        Before you publish anything about where you rank, check it in a browser,
        signed out, and write down the date.
      </p>

<PostFaq qa={[
            ["What is the difference between a noindex tag and a canonical tag?",
             "A noindex directive says do not index this page at all. A canonical tag says this page is a duplicate of another one, so index that other one and give it the credit. The canonical is easier to set by accident, because it looks correct in the file where it is written and only misbehaves when child pages inherit it."],
          ]} />

          <PostByline post={{
            slug: "audit-your-site-like-a-crawler",
            title: "Auditing your own site the way a crawler does, with curl",
            description: "Nine checks you can run against your live site from a terminal with curl and no account.",
            published: "2026-08-20",
          }} />


    </PostLayout>
  );
}
