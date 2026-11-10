import Link from "next/link";
import { pageDates, formatDate } from "@/lib/page-dates";
import { POST_PILLAR } from "@/lib/post-pillars";

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

const SITE = "https://purcellventures.co";

export default function PostByline({ post }: { post: PostMeta }) {
  // A slug starting with "/" is a full path. Everything else is a blog post, which is
  // what every caller was until the AI guide, and a node whose url points at a page that
  // does not exist is worse than no node at all.
  const path = post.slug.startsWith("/") ? post.slug : `/blog/${post.slug}`;
  const href = `${SITE}${path}`;
  // dateModified is the last git commit to this post's files (lib/page-dates.json), never
  // earlier than the date the post prints as its publish date.
  const dates = pageDates(path, post.published)!;
  const pillar = POST_PILLAR[path];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: dates.published,
    dateModified: dates.modified,
    url: href,
    mainEntityOfPage: { "@type": "WebPage", "@id": href },
    // References only. The full Person and Organization nodes live once, in the sitewide
    // graph in app/layout.tsx, so every post points at the same two entities instead of
    // restating them with different fields.
    author: { "@id": "https://elijahpurcell.com/#person" },
    publisher: { "@id": "https://purcellventures.co/#organization" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {pillar && (
        <p>
          Part of the guide <Link href={pillar.href}>{pillar.title}</Link>.
        </p>
      )}
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
          <p className="ui-updated">
            Updated <time dateTime={dates.modified}>{formatDate(dates.modified)}</time>
          </p>
          <p>
            Elijah Purcell is the Founder/CEO of Purcell Ventures LLC, which builds AI systems and software for local businesses. He studies psychology and data science in New College and the Honors College at the University of Alabama and built COSMIC, a station of 57 AI agents in 17 rooms that does the company&apos;s proposals, research and outreach.
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
