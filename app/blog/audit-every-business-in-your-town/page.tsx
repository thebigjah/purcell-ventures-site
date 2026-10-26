import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import PostByline from "@/app/components/PostByline";

export const metadata = {
  alternates: { canonical: "/blog/audit-every-business-in-your-town" },
  title: { absolute: "How to audit every business in your town in an afternoon, by Elijah Purcell" },
  description:
    "The method behind auditing 121 independent businesses near the University of Alabama: one free Overpass query against OpenStreetMap, an HTTP request per site, and the two mistakes that will make your numbers wrong.",
};


export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: "How to audit every business in your town in an afternoon", href: "/blog/audit-every-business-in-your-town" },
      ]} />}
      kicker="Method"
      title="How to audit every business in your town in an afternoon"
      meta="20 August 2026, 7 minute read"
    >
      <p>
        I pulled every independent business within 2500 metres of the Quad in Tuscaloosa,
        checked whether each one had a website that answers, and had the numbers in
        forty minutes.{" "}
        <Link href="/blog/121-businesses-near-campus">The result was 121
        businesses and 27 working sites</Link>. This is the whole method, so you can run
        it on your own town.
      </p>

      <p>
        It costs nothing. The method needs no API key and no account, and it does not scrape anybody's search results.
      </p>

      <h2>The data source</h2>

      <p>
        OpenStreetMap, queried through{" "}
        <a href="https://wiki.openstreetmap.org/wiki/Overpass_API" rel="noopener">Overpass</a>.
        Volunteers maintain it, it is openly licensed, it permits this use, and it carries
        exactly the tag that matters:{" "}
        <a href="https://wiki.openstreetmap.org/wiki/Key:website" rel="noopener"><code>website</code></a>.
      </p>

      <p>
        Overpass takes a query language that looks alarming and is mostly mechanical.
        The shape you need is: for each kind of business, find every node and way within
        a radius of a point.
      </p>

      <pre><code>{`[out:json][timeout:90];
(
  node["shop"="hairdresser"](around:2500,33.2140,-87.5460);
  way ["shop"="hairdresser"](around:2500,33.2140,-87.5460);
  node["amenity"="restaurant"](around:2500,33.2140,-87.5460);
  way ["amenity"="restaurant"](around:2500,33.2140,-87.5460);
);
out center tags;`}</code></pre>

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

      <h2>Filtering to independents</h2>

      <p>
        You do not want chains. Do not try to detect them by name, because you will build
        a list of brand strings and it will be wrong in both directions.
      </p>

      <p>
        OpenStreetMap tags them for you. Drop anything with a <code>brand</code> or{" "}
        <code>brand:wikidata</code> tag. That is one line of code.
      </p>

      <h2>The check that matters</h2>

      <p>
        For each business with a <code>website</code> tag, make a request and see what
        happens. Both of my mistakes were here.
      </p>

      <h2>Mistake one: HEAD is not enough</h2>

      <p>
        I sent HEAD requests, because they are cheap and you only need the status code.
      </p>

      <p>
        Plenty of live servers do not answer HEAD. Two restaurants with working sites
        came back as broken, and that number reached a published page
        before I caught it. I had to correct the post in public.
      </p>

      <p>Fall back to GET whenever HEAD fails:</p>

      <pre><code>{`for method in ("HEAD", "GET"):
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
return last`}</code></pre>

      <p>
        The 403 and 405 handling matters too. A server that refuses a probe is up, and
        marking it down misreports the business.
      </p>

      <h2>Mistake two: the claim you are entitled to make</h2>

      <p>
        The headline I wanted was "93 businesses near campus have no website." The data
        does not support it.
      </p>

      <p>
        Volunteers maintain OpenStreetMap. A missing <code>website</code> tag shows only
        that <em>a machine looking for a website does not find one</em>.
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

      <h2>What to do with the result</h2>

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

      <h2>What I am using it for</h2>

      <p>
        My script is under two hundred lines. I am using it to write about{" "}
        <Link href="/blog/tuscaloosa-small-business-online">independent
        businesses near campus</Link>, one at a time. If you run it on your town and find
        something surprising,{" "}
        <a href="mailto:elijah@purcell-ventures.com">I would like to hear
        it</a>.
      </p>

<PostByline post={{
            slug: "audit-every-business-in-your-town",
            title: "How to audit every business in your town in an afternoon",
            description: "The method behind auditing 121 independent businesses: one free Overpass query, an HTTP request per site, and the two mistakes that make your numbers wrong.",
            published: "2026-08-20",
          }} />


    </PostLayout>
  );
}
