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
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    url: `${SITE}/blog/${post.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/blog/${post.slug}` },
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
      jobTitle: "Founder, Purcell Ventures LLC",
      affiliation: { "@type": "CollegeOrUniversity", name: "University of Alabama" },
      sameAs: [
        "https://github.com/thebigjah",
        "https://www.linkedin.com/in/elijah-purcell-5128a9256",
        "https://www.instagram.com/elijah_the_tall/",
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
      <aside
        style={{
          display: "flex",
          gap: "18px",
          alignItems: "flex-start",
          marginTop: "56px",
          paddingTop: "28px",
          borderTop: "1px solid rgba(212,175,55,0.20)",
        }}
      >
        <img
          src="/brand/elijah.jpg"
          alt="Elijah Purcell, founder of Purcell Ventures LLC and University of Alabama student"
          width={72}
          height={72}
          style={{ width: "72px", height: "72px", flex: "0 0 72px", objectFit: "cover", objectPosition: "50% 20%", display: "block" }}
        />
        <div style={{ fontSize: "14px", lineHeight: 1.65, color: "var(--color-warm-text-muted)" }}>
          <div style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "6px" }}>
            Written by
          </div>
          <p style={{ margin: 0 }}>
            <strong style={{ color: "var(--color-warm-text)" }}>Elijah Purcell</strong> is the
            founder of Purcell Ventures LLC, a Georgia software company building sites and
            tools for local businesses, and a psychology and data science student at the
            University of Alabama Honors College on a pre-med track toward psychiatry. He
            builds and operates the autonomous AI agent systems that run the company.
          </p>
          <p style={{ margin: "8px 0 0" }}>
            {/* The anchor text is the point. "More about him" tells a crawler nothing about
                who "him" is, on nine pages that all carry his byline. */}
            <Link href="/who" style={{ color: "var(--color-warm-accent)" }}>More about Elijah Purcell</Link>
            {" · "}
            <Link href="/blog" style={{ color: "var(--color-warm-accent)" }}>All posts</Link>
          </p>
        </div>
      </aside>
    </>
  );
}
