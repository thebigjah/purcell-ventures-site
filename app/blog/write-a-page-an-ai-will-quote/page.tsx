import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata = {
  alternates: { canonical: "/blog/write-a-page-an-ai-will-quote" },
  title: { absolute: "How to write a page an AI will quote | Elijah Purcell" },
  description:
    "Answer engine optimisation in plain terms: the sentence shape a model can lift, what FAQPage schema still does, what llms.txt is for, and why being indexed comes first.",
};

const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "25px", fontWeight: 600, lineHeight: 1.2, margin: "40px 0 10px" } as const;
const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };
const pre: React.CSSProperties = {
  background: "rgba(0,0,0,0.28)", border: "1px solid rgba(212,175,55,0.18)",
  padding: "14px 16px", overflowX: "auto", fontSize: "13.5px", lineHeight: 1.6,
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
          { name: "Write a page an AI will quote", href: "/blog/write-a-page-an-ai-will-quote" },
        ]} />

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Engineering, August 20, 2026, 8 min read</div>
          <h1>
            How to write a page an AI will{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>quote</em>
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            Much of the advice about answer engine optimisation repeats older search advice.
            Here is what differs, based on one day of applying it to this site and measuring
            the result.
          </p>

          <h2 style={H2}>How the two jobs differ</h2>

          <p>
            A search engine ranks pages. An answer engine <em>extracts sentences</em>. Those
            are different jobs, and a page optimised for the first can be useless for the
            second.
          </p>

          <p>
            Ranking rewards a page that is comprehensively about a topic. Extraction rewards
            a page containing a self-contained sentence that answers a question without
            needing the paragraph around it. You can be excellent at one and invisible in the
            other.
          </p>

          <h2 style={H2}>Write sentences that survive being removed</h2>

          <p>
            The test: cut any sentence out of your page, show it to someone who has not read
            the rest, and see whether it still means anything.
          </p>

          <p>
            <strong>Does not survive:</strong> "We founded it in 2025 and have been growing
            ever since." Who is we. Founded what.
          </p>

          <p>
            <strong>Survives:</strong> "Purcell Ventures LLC is a Georgia software company
            founded by Elijah Purcell in April 2025 that builds websites and software for
            small businesses."
          </p>

          <p>
            The second is worse prose and better extraction. State each load-bearing fact
            once in that shape, usually near the top, and write the rest normally.
          </p>

          <h2 style={H2}>Third person for facts about a person</h2>

          <p>
            A page that says "I am nineteen and I run a software company" cannot be lifted
            and presented as a fact about a named entity, because a model has no way to
            attach "I" to anything.
          </p>

          <p>
            This is why I have two pages about the same person. An About page in first
            person, which is how a human wants to read it, and{" "}
            <Link href="/who" style={link}>an answer page in third person</Link>, which is
            the shape an engine can use. They link to each other and say which is which.
          </p>

          <h2 style={H2}>FAQPage schema, and the discipline it needs</h2>

          <p>
            FAQPage is the format that hands a machine a question and a self-contained answer
            as structured data.
          </p>

          <p>
            <strong>Correction, added the same day this was published.</strong> An earlier
            version of this paragraph called FAQPage the single highest-leverage item here.
            That was true when it produced a rich result in Google. Google stopped showing FAQ
            rich results on 7 May 2026 and said it would remove the reporting and testing
            support in summer 2026. The schema type is still valid, and Bing and the retrieval
            crawlers behind the assistants still read it. So it still helps with answer
            engines and no longer does anything for Google results.
          </p>

          <p>
            The rule: the visible body of the page must contain every answer in the schema.
            Schema that promises an answer the page does not contain works like a misleading
            headline, and search engines can treat it as spam.
          </p>

          <p>
            Write each answer so it makes sense read alone. Avoid "as mentioned above" and
            "our," and name the thing each time.
          </p>

          <h2 style={H2}>One identity, stated the same way everywhere</h2>

          <p>
            If your site names a person or company in several places, every one of those
            structured data nodes needs the same <code>@id</code>. Otherwise you are
            describing several entities that happen to share a name, on your own domain.
          </p>

          <p>
            Mine was twelve distinct Person nodes, three of them anonymous, before I checked.
            It should have been one, and now is.
          </p>

          <div style={pre}>{`{ "@type": "Person",
  "@id": "https://example.com/#founder",
  "name": "..." }`}</div>

          <p>
            The same applies to prose. Pick one bio sentence and use it identically on every
            profile. Three slightly better sentences on three platforms read as three people
            who might be the same person. One adequate sentence repeated exactly reads as
            one.
          </p>

          <h2 style={H2}>Say the disambiguation out loud</h2>

          <p>
            If somebody shares your name, say which one you are. schema.org has{" "}
            <a href="https://schema.org/disambiguatingDescription" style={link} rel="noopener"><code>disambiguatingDescription</code></a>{" "}
            for exactly this, and the plain-prose
            version belongs on the page too.
          </p>

          <p>
            Three other people share mine. My answer page names them and says I am none of
            them, so an assistant does not have to guess.
          </p>

          <h2 style={H2}>llms.txt</h2>

          <p>
            A{" "}
            <a href="https://llmstxt.org/" style={link} rel="noopener">plain-text file at the root of your site</a>{" "}
            describing what is on it and where. Adoption is not universal and nobody should
            promise you results from it.
          </p>

          <p>
            It takes twenty minutes and makes you write down what each of your pages is for,
            in one sentence, without marketing language. That exercise is useful by itself.
          </p>

          <h2 style={H2}>Cite sources inline</h2>

          <p>
            Cite external sources in the text, and link them.
          </p>

          <p>
            A{" "}
            <a href="https://arxiv.org/html/2607.14035v1" style={link} rel="noopener">
              2026 survey of the field
            </a>{" "}
            of generative engine optimisation research reports citation gains for pages that
            cite authoritative sources inline, with the biggest gains going to lower-ranked
            sites. The same survey reports that statistics, definitions, prices, dates and
            quotations improve citation, and that keyword stuffing reduces it.
          </p>

          <p>
            That survey also found <em>no established evidence</em> that content volume,
            publishing speed or structured data are primary ways to improve citation. Much of
            the answer engine advice I read while doing this focused on those three things.
          </p>

          <h2 style={H2}>Being indexed matters more than all of it</h2>

          <p>
            I did every technique above and then checked how many of my pages Google had
            indexed. It had seven of the twenty-eight I submitted. The structured data sat on
            pages Google had not indexed, and the cause was{" "}
            <Link href="/blog/canonical-tag-noindex" style={link}>one line of inherited
            metadata telling Google to skip them</Link>.
          </p>

          <p>
            So before optimising for extraction, verify you are in the index.{" "}
            <Link href="/blog/audit-your-site-like-a-crawler" style={link}>The nine checks
            are here</Link>. Structured data on an unindexed page has no effect.
          </p>

          <PostFaq qa={[
            ["What is answer engine optimisation?",
             "Optimising a page so that an AI assistant can extract a correct answer from it. Search engine optimisation is about ranking the page in a list of results."],
          ]} />

          <PostByline post={{
            slug: "write-a-page-an-ai-will-quote",
            title: "How to write a page an AI will quote",
            description: "Answer engine optimisation in plain terms: the sentence shape a model can lift, what FAQPage schema still does, and why being indexed comes first.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
