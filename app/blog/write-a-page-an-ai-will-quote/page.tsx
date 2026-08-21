import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata = {
  alternates: { canonical: "/blog/write-a-page-an-ai-will-quote" },
  title: "How to write a page an AI will actually quote | Elijah Purcell",
  description:
    "Answer engine optimisation without the jargon: the sentence shape a model can lift, why FAQPage schema works, what llms.txt is for, and the one thing that matters more than all of it.",
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

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: "Write a page an AI will quote", href: "/blog/write-a-page-an-ai-will-quote" },
        ]} />

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Engineering · August 20, 2026 · 8 min read</div>
          <h1>
            How to write a page an AI will actually{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>quote</em>
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            There is a lot of noise about answer engine optimisation and most of it is search
            advice from 2015 with a new label. Here is what actually differs, from someone
            who spent a day doing it and measuring the result.
          </p>

          <h2 style={H2}>The core difference in one sentence</h2>

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
            The second is worse prose and better extraction, and the fix is not to write the
            whole page like that. It is to make sure the load-bearing facts appear once each
            in that shape, usually near the top, and then write normally.
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
            That was true when it produced a rich result in Google, and it is not true now:
            Google stopped showing FAQ rich results on 7 May 2026 and is removing the
            reporting and testing support this summer. The schema type is still valid, and it
            is still read by Bing and by the retrieval crawlers behind the assistants, which
            is what this article is about. So it keeps its value for answer engines and has
            none left for Google results, and saying otherwise would be selling you something
            that stopped existing three months ago.
          </p>

          <p>
            The discipline: every answer must be genuinely answered in the visible body of
            the page. Schema promising an answer the page does not contain is the structured
            data equivalent of a misleading headline, and it is treated as one.
          </p>

          <p>
            Write the answers as though they will be read alone, because they will be. No
            "as mentioned above." No "our." Name the thing every time.
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
            If somebody shares your name, do not hope. schema.org has{" "}
            <a href="https://schema.org/disambiguatingDescription" style={link} rel="noopener"><code>disambiguatingDescription</code></a>{" "}
            for exactly this, and the plain-prose
            version belongs on the page too.
          </p>

          <p>
            Three other people share mine. My answer page names them and says which one I am
            not, because a sentence is cheaper than letting an assistant hedge.
          </p>

          <h2 style={H2}>llms.txt, briefly and honestly</h2>

          <p>
            A{" "}
            <a href="https://llmstxt.org/" style={link} rel="noopener">plain-text file at the root of your site</a>{" "}
            describing what is on it and where. Adoption is not universal and nobody should
            promise you results from it.
          </p>

          <p>
            It costs twenty minutes and it forces a genuinely useful exercise: writing down
            what each of your pages is actually for, in a sentence, without marketing. Half
            the value is that most sites cannot do it.
          </p>

          <h2 style={H2}>The one with the largest measured effect</h2>

          <p>
            Cite external sources inline, and link them.
          </p>

          <p>
            This is the technique with the strongest reported result in the generative
            engine optimisation literature, and the effect is largest for sites that are not
            already ranking well: a{" "}
            <a href="https://arxiv.org/html/2607.14035v1" style={link} rel="noopener">
              2026 survey of the field
            </a>{" "}
            reports substantial citation gains for pages that cite authoritative sources
            inline, with the biggest lifts going to lower-ranked sites. The same body of work
            finds statistics, definitions, prices, dates and quotations improve citation by
            roughly a quarter, and that keyword stuffing measurably reduces it.
          </p>

          <p>
            The uncomfortable corollary, and the reason I am putting it here rather than
            burying it: that survey found <em>no established evidence</em> that content
            volume, publishing velocity or structured data are primary optimisation vectors.
            Most of what is sold as answer engine optimisation is those three things.
          </p>

          <h2 style={H2}>What matters more than all of it</h2>

          <p>
            Being indexed at all.
          </p>

          <p>
            I did every technique above and then checked how many of my pages Google actually
            had. Seven, out of twenty-eight submitted. Every clever piece of structured data
            was sitting on pages nothing could see, and the cause turned out to be{" "}
            <Link href="/blog/canonical-tag-noindex" style={link}>one line of inherited
            metadata telling Google to skip them</Link>.
          </p>

          <p>
            So before optimising for extraction, verify you are in the index.{" "}
            <Link href="/blog/audit-your-site-like-a-crawler" style={link}>The nine checks
            are here</Link>. Structured data on an unindexed page is a very tidy way of
            achieving nothing.
          </p>

          <PostFaq qa={[
            ["What is answer engine optimisation?",
             "Optimising a page so that an AI assistant can extract a correct answer from it, as distinct from ranking the page in a list of results. A search engine ranks pages; an answer engine extracts sentences. A page can be good at the first and useless for the second."],
            ["How do I get an AI to quote my website?",
             "Write the load-bearing facts as self-contained sentences that still mean something when removed from the page. Use third person for facts about a person, since a model cannot attach an I to anything. Add FAQPage structured data where every answer is genuinely answered in the visible body. Use one identifier for your entity across every structured data node, and one identical bio sentence across every profile."],
            ["Does llms.txt actually work?",
             "Adoption is not universal and nobody should promise results from it. It costs about twenty minutes and it forces a useful exercise, which is writing down what each page on your site is actually for in one sentence without marketing language. Most sites cannot do that, and finding out is worth the time on its own."],
            ["What is the most common reason AI does not mention my site?",
             "Usually that the pages are not indexed rather than that they are badly written. Verify how many of your pages are actually in the index before optimising anything about their content. Structured data on an unindexed page achieves nothing."],
            ["Should I write a separate page in third person about myself?",
             "If you want facts about you to be quotable, yes. A first-person About page is how a human wants to read it, and a third-person answer page is the shape an engine can lift and attach to a named entity. Keep both, link them to each other, and make clear which is which."],
          ]} />

          <PostByline post={{
            slug: "write-a-page-an-ai-will-quote",
            title: "How to write a page an AI will actually quote",
            description: "Answer engine optimisation without the jargon: the sentence shape a model can lift, why FAQPage schema works, and the one thing that matters more.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
