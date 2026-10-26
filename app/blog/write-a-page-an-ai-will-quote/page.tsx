import Link from "next/link";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout, Note } from "@/app/components/ui";

export const metadata = {
  alternates: { canonical: "/blog/write-a-page-an-ai-will-quote" },
  title: { absolute: "How to write a page an AI will quote, by Elijah Purcell" },
  description:
    "Answer engine optimisation in plain terms: the sentence shape a model can lift, what FAQPage schema still does, what llms.txt is for, and why being indexed comes first.",
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: "Write a page an AI will quote", href: "/blog/write-a-page-an-ai-will-quote" },
      ]} />}
      kicker="Engineering"
      title="How to write a page an AI will quote"
      meta="20 August 2026, 8 minute read"
    >
      <p>
        Much of the advice about answer engine optimisation repeats older search advice. Here
        is what differs, based on one day of applying it to this site and measuring the
        result.
      </p>

      <h2>How the two jobs differ</h2>

      <p>
        A search engine ranks pages. An answer engine <em>extracts sentences</em>. Those are
        different jobs, and a page optimised for the first can be useless for the second.
      </p>

      <p>
        Ranking rewards a page that is thoroughly about a topic. Extraction rewards a page
        containing a self-contained sentence that answers a question without needing the
        paragraph around it. You can be excellent at one and invisible in the other.
      </p>

      <h2>Sentences that survive being removed</h2>

      <p>
        The test: cut any sentence out of your page, show it to someone who has not read the
        rest, and see whether it still means anything.
      </p>

      <p>
        <strong>Does not survive:</strong> &quot;We founded it in 2025 and have been growing ever
        since.&quot; Who is we. Founded what.
      </p>

      <p>
        <strong>Survives:</strong> &quot;Purcell Ventures LLC is a Georgia software company
        founded by Elijah Purcell in April 2025 that builds websites and software for small
        businesses.&quot;
      </p>

      <p>
        The second is worse prose and better extraction. State each load-bearing fact once in
        that shape, usually near the top, and write the rest normally.
      </p>

      <h2>Third person for facts about a person</h2>

      <p>
        A page that says &quot;I am nineteen and I run a software company&quot; cannot be lifted and
        presented as a fact about a named entity, because a model has no way to attach
        &quot;I&quot; to anything.
      </p>

      <p>
        This is why I have two pages about the same person. One is an About page in first
        person, which is how a human wants to read it. The other is{" "}
        <Link href="/who">an answer page in third person</Link>, which is the shape an engine
        can use. They link to each other and say which is which.
      </p>

      <h2>FAQPage schema, and the discipline it needs</h2>

      <p>
        FAQPage is the format that hands a machine a question and a self-contained answer as
        structured data.
      </p>

      <Note>
        <strong>Correction, added the same day this was published.</strong> An earlier
        version of this paragraph called FAQPage the single most valuable item here. That was
        true when it produced a rich result in Google. Google stopped showing FAQ rich
        results on 7 May 2026 and said it would remove the reporting and testing support in
        summer 2026. The schema type is still valid, and Bing and the retrieval crawlers
        behind the assistants still read it. So it still helps with answer engines and no
        longer does anything for Google results.
      </Note>

      <p>
        The rule: the visible body of the page must contain every answer in the schema.
        Schema that promises an answer the page does not contain works like a misleading
        headline, and search engines can treat it as spam.
      </p>

      <p>
        Write each answer so it makes sense read alone. Avoid &quot;as mentioned above&quot; and
        &quot;our,&quot; and name the thing each time.
      </p>

      <h2>One identity, stated the same way everywhere</h2>

      <p>
        If your site names a person or company in several places, every one of those
        structured data nodes needs the same <code>@id</code>. Otherwise you are describing
        several entities that happen to share a name, on your own domain.
      </p>

      <p>
        Mine was twelve distinct Person nodes, three of them anonymous, before I checked. It
        should have been one, and now is.
      </p>

      <pre><code>{`{ "@type": "Person",
  "@id": "https://example.com/#founder",
  "name": "..." }`}</code></pre>

      <p>
        The same applies to prose. Pick one bio sentence and use it identically on every
        profile. Three slightly better sentences on three platforms read as three people who
        might be the same person. One adequate sentence repeated exactly reads as one.
      </p>

      <h2>Saying the disambiguation out loud</h2>

      <p>
        If somebody shares your name, say which one you are. schema.org has{" "}
        <a href="https://schema.org/disambiguatingDescription" rel="noopener"><code>disambiguatingDescription</code></a>{" "}
        for exactly this, and the plain-prose version belongs on the page too.
      </p>

      <p>
        Three other people share mine. My answer page names them and says I am none of them,
        so an assistant does not have to guess.
      </p>

      <h2>llms.txt</h2>

      <p>
        A <a href="https://llmstxt.org/" rel="noopener">plain-text file at the root of your site</a>{" "}
        describing what is on it and where. Adoption is not universal and nobody should
        promise you results from it.
      </p>

      <p>
        It takes twenty minutes and makes you write down what each of your pages is for, in
        one sentence, without marketing language. That exercise is useful by itself.
      </p>

      <h2>Inline source citations</h2>

      <p>Cite external sources in the text, and link them.</p>

      <p>
        A{" "}
        <a href="https://arxiv.org/html/2607.14035v1" rel="noopener">2026 survey of the field</a>{" "}
        of generative engine optimisation research reports citation gains for pages that
        cite authoritative sources inline, with the biggest gains going to lower-ranked
        sites. The same survey reports that statistics, definitions, prices, dates and
        quotations improve citation, and that keyword stuffing reduces it.
      </p>

      <p>
        That survey also found <em>no established evidence</em> that content volume,
        publishing speed or structured data are primary ways to improve citation. Much of the
        answer engine advice I read while doing this focused on those three things.
      </p>

      <h2>Being indexed matters more than all of it</h2>

      <p>
        I did every technique above and then checked how many of my pages Google had indexed.
        It had seven of the twenty-eight I submitted. The structured data sat on pages Google
        had not indexed, and the cause was{" "}
        <Link href="/blog/canonical-tag-noindex">one line of inherited metadata telling
        Google to skip them</Link>.
      </p>

      <p>
        So before optimising for extraction, verify you are in the index.{" "}
        <Link href="/blog/audit-your-site-like-a-crawler">The nine checks are here</Link>.
        Structured data on an unindexed page has no effect.
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
    </PostLayout>
  );
}
