import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import PostFaq from "@/app/components/PostFaq";

export const metadata = {
  alternates: { canonical: "/blog/canonical-tag-noindex" },
  title: "Every post on my blog was telling Google not to index it | Elijah Purcell",
  description:
    "One line in a Next.js layout gave nine blog posts a canonical tag pointing at the index page. That is the standard way of saying 'I am a duplicate, skip me.' How it happens, how to check your own site in two minutes, and how to fix it.",
};

const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };
const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "25px", fontWeight: 600, lineHeight: 1.2, margin: "42px 0 12px" } as const;
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
          { name: "Every post on my blog was telling Google not to index it", href: "/blog/canonical-tag-noindex" },
        ]} />
        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Engineering · August 20, 2026 · 6 min read</div>
          <h1>
            Every post on my blog was telling Google{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>not to index it</em>
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            I found it this morning by accident, while checking something else. 9 posts, every
            one carrying a tag that says: this page is a duplicate, index the other one
            instead. By the end of the afternoon it was 14 pages across three sections.
          </p>

          <p>
            Nobody wrote that tag nine times. It was written once, in a file that had
            nothing to do with any individual post.
          </p>

          <h2 style={H2}>The one line</h2>

          <p>In <code>app/blog/layout.tsx</code>:</p>

          <div style={pre}>{`export const metadata: Metadata = {
  title: "Writing",
  alternates: { canonical: "/blog" },   //  <- this
};`}</div>

          <p>
            That looks correct. It is the blog index, and its canonical URL is
            <code> /blog</code>. Fine.
          </p>

          <p>
            The problem is what a layout is. In the Next.js App Router, a layout wraps its
            own page <em>and every route nested underneath it</em>, and{" "}
            <a href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata" style={link} rel="noopener">metadata is inherited</a>. So <code>app/blog/layout.tsx</code> wraps <code>/blog</code>,{" "}
            <code>/blog/first-post</code>, <code>/blog/second-post</code>, all of them, and
            hands every single one a canonical of <code>/blog</code>.
          </p>

          <p>Which renders, on every post, as:</p>

          <div style={pre}>{`<link rel="canonical" href="https://purcellventures.co/blog"/>`}</div>

          <h2 style={H2}>What that actually tells a search engine</h2>

          <p>
            A canonical tag is not a hint about your preferred URL format. It is a
            declaration that this page and the target page are the same content, and that
            the target is the one worth keeping. Google's own documentation on{" "}
            <a href="https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls" style={link} rel="noopener">consolidating duplicate URLs</a>{" "}
            describes exactly this consolidation behaviour.
          </p>

          <p>
            When a post says its canonical is the index, Google reads it as: this post is a
            duplicate of the listing page. So it consolidates the two, keeps the index, and
            drops the post. Not with an error. Not with a warning. It does exactly what it
            was told.
          </p>

          <p>
            Everything on those pages went with it. The author markup. The structured data.
            The titles. All of it correct, all of it on pages that had asked to be ignored.
          </p>

          <h2 style={H2}>Why it survives so long</h2>

          <p>Three reasons, and they compound.</p>

          <p>
            <strong>It looks right in the file.</strong> Every reviewer who opens that layout
            sees a canonical pointing at the page the file is named after. The bug is not in
            the line, it is in the inheritance.
          </p>

          <p>
            <strong>Nothing fails.</strong> The build passes. The pages render. The links
            work. There is no error state, because the site is doing what it was configured
            to do.
          </p>

          <p>
            <strong>The symptom is absence.</strong> The only evidence is pages that never
            show up in search, and a new site with pages that never show up in search looks
            exactly like a new site.
          </p>

          <h2 style={H2}>Check your own in two minutes</h2>

          <p>One line, no tools, no account:</p>

          <div style={pre}>{`curl -sL https://yoursite.com/blog/some-post | grep canonical`}</div>

          <p>
            If the href is anything other than the URL you just requested, that page is
            pointing its value somewhere else. Check three or four pages from different
            sections. Section index pages are the usual culprits, so try a product page
            under a category and a post under a blog.
          </p>

          <p>
            I found the same bug in two more places on my own site the same afternoon:
            three course pages canonicalising to <code>/courses</code>, and two pages
            canonicalising to <code>/digital</code>. Fourteen pages in total. It was not a
            blog problem. It was a layout-inheritance problem that happened to hit the blog
            first.
          </p>

          <h2 style={H2}>The fix, and the one that does not work</h2>

          <p>
            The obvious fix is to move the canonical from the layout onto the index page
            itself. That failed for me: <code>app/blog/page.tsx</code> is a client
            component, and client components cannot export metadata. Which is presumably how
            it ended up in the layout to begin with.
          </p>

          <p>
            The correct fix is simpler. <strong>Delete it.</strong> A page with no canonical
            tag self-canonicalises: the engine treats the URL it fetched as the canonical
            one. That is the right answer for the index and the right answer for every post.
          </p>

          <p>Then give each post its own, explicitly:</p>

          <div style={pre}>{`// app/blog/my-post/page.tsx
export const metadata = {
  title: "My post",
  alternates: { canonical: "/blog/my-post" },
};`}</div>

          <p>
            For posts that are client components and cannot export metadata, add a
            <code> layout.tsx</code> beside the page that does nothing but carry the
            canonical and render its children.
          </p>

          <h2 style={H2}>The general shape</h2>

          <p>
            This is the third bug of the same family I have hit this year. Something is
            configured once, inherited widely, and fails by producing nothing rather than by
            producing an error.
          </p>

          <p>
            The pattern that catches them is not more careful reading. It is asserting that
            output <em>arrives</em>, rather than asserting that nothing threw. A test that
            fetches four live pages and checks each one canonicalises to itself would have
            caught this the day it shipped, and it is about eight lines.
          </p>

          <p>
            A build that passes proves the code compiled. It proves nothing at all about
            whether the thing you wanted actually happened.
          </p>

          <PostFaq qa={[
            ["Why are my blog posts not being indexed by Google?",
             "One common cause is a canonical tag inherited from a shared layout. In the Next.js App Router a layout wraps every route nested beneath it and metadata is inherited, so a canonical declared on a blog index is handed to every post, and each post then tells Google it is a duplicate of the index."],
            ["How do I fix a canonical tag pointing at the wrong page?",
             "Delete it from the layout rather than trying to move it. A page with no canonical tag self-canonicalises, which is correct for both the index and each post, then declare an explicit canonical on each individual page. For pages that are client components and cannot export metadata, add a layout beside the page that carries only the canonical."],
            ["Does a wrong canonical tag cause an error?",
             "No, and that is why it survives. The build passes, the pages render, the links work, and the only symptom is pages that never appear in search, which on a new site looks exactly like a new site."],
          ]} />

          <PostByline post={{
            slug: "canonical-tag-noindex",
            title: "Every post on my blog was telling Google not to index it",
            description: "One line in a Next.js layout gave nine blog posts a canonical tag pointing at the index page. How it happens, how to check yours, and how to fix it.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
