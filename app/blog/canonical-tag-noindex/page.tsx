import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import PostByline from "@/app/components/PostByline";

export const metadata = {
  alternates: { canonical: "/blog/canonical-tag-noindex" },
  title: { absolute: "Every post on my blog was telling Google not to index it" },
  description:
    "One line in a Next.js layout gave nine blog posts a canonical tag pointing at the index page, which tells Google each post is a duplicate to skip. How it happens, how to check your own site in two minutes, and how to fix it.",
};


export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: "Every post on my blog was telling Google not to index it", href: "/blog/canonical-tag-noindex" },
      ]} />}
      kicker="Engineering"
      title="Every post on my blog was telling Google not to index it"
      meta="20 August 2026, 6 minute read"
    >
      <p>
        I found it this morning by accident, while checking something else. Nine posts each
        carried a tag that says the page is a duplicate and a different page should be
        indexed instead. By the end of the afternoon I had found 14 pages across three
        sections with the same tag.
      </p>

      <p>
        I wrote that tag once, in a file that has nothing to do with any individual post.
      </p>

      <h2>The line that caused it</h2>

      <p>In <code>app/blog/layout.tsx</code>:</p>

      <pre><code>{`export const metadata: Metadata = {
  title: "Writing",
  alternates: { canonical: "/blog" },   //  <- this
};`}</code></pre>

      <p>
        That looks correct, because the blog index&apos;s canonical URL is
        <code> /blog</code>.
      </p>

      <p>
        In the Next.js App Router, a layout wraps its
        own page <em>and every route nested underneath it</em>, and{" "}
        <a href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata" rel="noopener">metadata is inherited</a>. So <code>app/blog/layout.tsx</code> wraps <code>/blog</code>,{" "}
        <code>/blog/first-post</code>, <code>/blog/second-post</code>, all of them, and
        hands every single one a canonical of <code>/blog</code>.
      </p>

      <p>On every post, that renders as:</p>

      <pre><code>{`<link rel="canonical" href="https://purcellventures.co/blog"/>`}</code></pre>

      <h2>What that tells a search engine</h2>

      <p>
        A canonical tag tells a search engine that this page and the target page are the
        same content, and that the target is the one to keep. Google treats it as a strong
        signal. Google's documentation on{" "}
        <a href="https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls" rel="noopener">consolidating duplicate URLs</a>{" "}
        describes this consolidation behaviour.
      </p>

      <p>
        When a post says its canonical is the index, Google reads it as: this post is a
        duplicate of the listing page. So it consolidates the two, keeps the index, and
        drops the post. It shows no error or warning, because it is following the tag.
      </p>

      <p>
        Google dropped the author markup, structured data and titles on those pages along
        with them, even though all of it was correct.
      </p>

      <h2>Why the bug goes unnoticed</h2>

      <p>I found three reasons.</p>

      <p>
        <strong>It looks right in the file.</strong> Every reviewer who opens that layout
        sees a canonical pointing at the page the file is named after, and the bug is in
        the inheritance.
      </p>

      <p>
        <strong>Nothing fails.</strong> The build passes, the pages render and the links
        work. There is no error state, because the site is doing what it was configured
        to do.
      </p>

      <p>
        <strong>The only symptom is missing search results.</strong> Pages never show up
        in search, and on a new site that is easy to blame on the site being new.
      </p>

      <h2>Checking your own site in two minutes</h2>

      <p>One command:</p>

      <pre><code>{`curl -sL https://yoursite.com/blog/some-post | grep canonical`}</code></pre>

      <p>
        If the href is anything other than the URL you requested, that page points
        at a different URL. Check three or four pages from different
        sections. Section index pages are the usual culprits, so try a product page
        under a category and a post under a blog.
      </p>

      <p>
        I found the same bug in two more places on my own site the same afternoon:
        three course pages canonicalising to <code>/courses</code>, and two pages
        canonicalising to <code>/digital</code>. That made fourteen pages in total, all
        caused by layout inheritance, and the blog was where I noticed it first.
      </p>

      <h2>The fix that failed and the fix that worked</h2>

      <p>
        The obvious fix is to move the canonical from the layout onto the index page
        itself. That failed for me: <code>app/blog/page.tsx</code> is a client
        component, and client components cannot export metadata. That is probably how
        it ended up in the layout to begin with.
      </p>

      <p>
        The fix that works is to <strong>delete the canonical from the layout</strong>. A page with no canonical
        tag self-canonicalises: the engine treats the URL it fetched as the canonical
        one. That is the right answer for the index and the right answer for every post.
      </p>

      <p>Then give each post its own, explicitly:</p>

      <pre><code>{`// app/blog/my-post/page.tsx
export const metadata = {
  title: "My post",
  alternates: { canonical: "/blog/my-post" },
};`}</code></pre>

      <p>
        For posts that are client components and cannot export metadata, add a
        <code> layout.tsx</code> beside the page that does nothing but carry the
        canonical and render its children.
      </p>

      <h2>Testing for this kind of bug</h2>

      <p>
        This is the third bug of this kind I have hit this year. In each one, a setting
        made once and inherited widely failed without an error.
      </p>

      <p>
        Tests that check the delivered output catch these bugs, and tests that only check
        whether an error was thrown miss them. A test that
        fetches four live pages and checks each one canonicalises to itself would have
        caught this the day it shipped, and it is eight lines.
      </p>

<PostByline post={{
            slug: "canonical-tag-noindex",
            title: "Every post on my blog was telling Google not to index it",
            description: "One line in a Next.js layout gave nine blog posts a canonical tag pointing at the index page. How it happens, how to check yours, and how to fix it.",
            published: "2026-08-20",
          }} />


    </PostLayout>
  );
}
