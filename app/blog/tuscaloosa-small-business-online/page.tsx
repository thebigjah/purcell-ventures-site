import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import PostFaq from "@/app/components/PostFaq";

// THE JOURNALISM PLAY, and the reason it is worth more than another opinion post.
//
// He wants to rank for his own name and he wants a real reason to meet small business
// owners near campus. One piece of work does both, and it is not a blog post about
// himself: it is reporting ON other people, in which he is the named author.
//
// Why that outranks self-description. A page titled "About Elijah Purcell" competes with
// every other Elijah Purcell for a name query. A page where local businesses are quoted
// BY Elijah Purcell creates something the other Elijah Purcells do not have: an author
// byline attached to a named place, repeated across a series. That is an entity signal
// no amount of adjectives produces.
//
// And the second-order effect is the real one. "I write a series about small businesses
// near campus and I would like to feature yours" is a reason to walk into a shop that
// does not require selling anything. Every one of those conversations is a prospect who
// has already spent twenty minutes talking to him about their business.

export const metadata = {
  alternates: { canonical: "/blog/tuscaloosa-small-business-online" },
  title: { absolute: "The Tuscaloosa Storefront Project, by Elijah Purcell" },
  description:
    "A reporting series by Elijah Purcell on independent businesses around the University of Alabama. Each piece covers who runs the business, how students find it, and what happens when it has no website.",
};

const linkStyle = { color: "var(--color-warm-accent)", textDecoration: "underline" };

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: "The Tuscaloosa Storefront Project", href: "/blog/tuscaloosa-small-business-online" },
        ]} />
        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Reporting, August 20, 2026, series introduction</div>
          <h1>
            The Tuscaloosa <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Storefront</em> Project
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--color-warm-text)" }}>

          <p style={{ fontSize: "18px" }}>
            Thirty-eight thousand students arrived in Tuscaloosa this month. Most of them
            will find where to eat, get a haircut, fix a laptop or buy a gift the same way:
            they will type something into a phone and take whatever comes back first.
          </p>

          <p>
            This series covers local businesses that rank low in that phone search, or do
            not show up in it.
          </p>

          <h2>What this is</h2>

          <p>
            I am a student at the University of Alabama and I build websites for small
            businesses, which means I spend a lot of time looking at how independent shops
            appear online. The pattern near campus is consistent enough to be worth
            writing down: a business that has been here for fifteen years, that locals know
            well, often does not show up when a freshman searches on a phone.
          </p>

          <p>
            The usual cause: it has a Facebook page from 2019, an unclaimed Google listing
            and no website. Together those put it below a chain three miles further away.
          </p>

          <p>
            Each piece in this series covers one business: who runs it, how long it has
            been here, what it does well, and what a student trying to find it
            runs into. I am not selling anything in these pieces, and I feature businesses
            whether or not they are clients. Several will not be.
          </p>

          <h2>Why I am writing it rather than just noticing it</h2>

          <p>
            I have two reasons.
          </p>

          <p>
            The first is that this is the thing I am studying. I am a psychology and data
            science student on a pre-med track, and the part of data science I keep coming
            back to is how people search versus how businesses assume they search. A
            local shop is a small case of that question that I can study in person.
          </p>

          <p>
            The second is that I run a company that builds websites, so I have an obvious
            interest here. I will report what I find, including when a business does fine
            without a website.
          </p>

          <h2>If you run a business near campus</h2>

          <p>
            I would like to feature you. It takes twenty minutes, in person, at your
            place. I will ask what you do, how people find you, and what has changed since
            the students came back. You get a written piece about your business either way,
            and you are under no obligation to buy anything.
          </p>

          <p>
            Reach me at{" "}
            <a href="tel:+12054627839" style={linkStyle}>(205) 462-7839</a> or{" "}
            <a href="mailto:elijah@purcell-ventures.com" style={linkStyle}>elijah@purcell-ventures.com</a>.
          </p>

          <h2>What is coming</h2>

          <p>
            I am reporting the first pieces now. If you want to follow along, the rest
            of the series will appear on{" "}
            <Link href="/blog" style={linkStyle}>this blog</Link>, and campus events and
            openings show up on{" "}
            <a href="https://ua-today.vercel.app" style={linkStyle}>UA Today</a>, which I
            also built.
          </p>

        


          <PostByline post={{
            slug: "tuscaloosa-small-business-online",
            title: "The Tuscaloosa Storefront Project",
            description: "A reporting series on independent businesses around the University of Alabama. It covers who runs them, how students find them, and what happens to a fifteen-year-old shop that has no website.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
