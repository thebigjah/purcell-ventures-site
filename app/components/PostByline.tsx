import Link from "next/link";

// THE SAME AUTHOR, STATED THE SAME WAY, ON EVERY POST.
//
// Two problems, one component.
//
// The SEO one: eight posts and not one of them carried Article schema, so a crawler
// reading this blog saw eight orphan pages with no stated author. An Article whose author
// is a Person with a name, a photo and a URL is the strongest per-page signal a personal
// site can emit, and it was simply missing.
//
// The other one is his: he asked for a consistent image of himself across the writing.
// Consistency here is literal. The same photo file, the same name string, the same
// one-line description, on every post and identical to the strings on /who, the tap card
// and the GitHub profile. Three slightly different self-descriptions read to a search
// engine as three people who might be the same person. One string repeated exactly reads
// as one person.

export interface PostMeta {
  /** Slug, or a full path beginning with "/" for pages that do not live under /blog. */
  slug: string;
  title: string;
  description: string;
  /** ISO date. The visible date on the page stays whatever the post already prints. */
  published: string;
}

const AUTHOR_URL = "https://purcellventures.co/who";
const AUTHOR_IMG = "https://purcellventures.co/brand/elijah.jpg";
const SITE = "https://purcellventures.co";

export default function PostByline({ post }: { post: PostMeta }) {
  // A slug starting with "/" is a full path. Everything else is a blog post, which is
  // what every caller was until the AI guide, and a node whose url points at a page that
  // does not exist is worse than no node at all.
  const href = post.slug.startsWith("/") ? `${SITE}${post.slug}` : `${SITE}/blog/${post.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    url: href,
    mainEntityOfPage: { "@type": "WebPage", "@id": href },
    author: {
      "@type": "Person",
      // THE SAME @id AS THE SITEWIDE NODE, AND THIS IS NOT COSMETIC.
      //
      // Without it this byline declares a second, anonymous "Elijah Purcell" on a page
      // that already carries the canonical one from the root layout. A crawler reading
      // that page sees two Person entities with the same name and no statement that they
      // are the same person, which is the exact ambiguity the whole /who effort exists to
      // remove, manufactured on our own site. Measured 20 Aug 2026: three pages were
      // doing this.
      "@id": "https://purcellventures.co/#founder",
      name: "Elijah Purcell",
      url: AUTHOR_URL,
      image: AUTHOR_IMG,
      jobTitle: "Founder/CEO, Purcell Ventures LLC",
      affiliation: { "@type": "CollegeOrUniversity", name: "University of Alabama" },
      sameAs: [
        "https://github.com/thebigjah",
        "https://www.linkedin.com/in/theelijahpurcell",
        "https://www.instagram.com/theelijahpurcell/",
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "Purcell Ventures LLC",
      url: SITE,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <aside className="ui-byline">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/elijah.jpg"
          alt="Elijah Purcell, founder of Purcell Ventures LLC and University of Alabama student"
          width={72}
          height={72}
        />
        <div>
          <p className="ui-byline__by">Written by Elijah Purcell</p>
          <p>
            Elijah Purcell is the Founder/CEO of Purcell Ventures LLC, which builds websites and software for local businesses. He studies psychology and data science in the University of Alabama Honors College and built COSMIC, the set of AI agents that runs the company&apos;s outreach.
          </p>
          <p>
            {/* The anchor text is the point. "More about him" tells a crawler nothing about
                who "him" is, on the pages that carry his byline. */}
            <Link href="/who">More about Elijah Purcell</Link>
            {" or "}
            <Link href="/blog">read all posts</Link>
          </p>
        </div>
      </aside>
    </>
  );
}
