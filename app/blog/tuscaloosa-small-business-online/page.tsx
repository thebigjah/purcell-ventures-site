import Link from "next/link";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

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
  title: { absolute: "The Tuscaloosa Storefront Project" },
  description:
    "A reporting series by Elijah Purcell on independent businesses around the University of Alabama. Each piece covers who runs the business, how students find it, and what happens when it has no website.",
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: "The Tuscaloosa Storefront Project", href: "/blog/tuscaloosa-small-business-online" },
      ]} />}
      kicker="Reporting"
      title="The Tuscaloosa Storefront Project"
      meta="20 August 2026, series introduction"
    >
      <p>
        Thirty-eight thousand students arrived in Tuscaloosa this month. Most of them will
        find a place to eat or get a haircut by typing a search into a phone and picking
        whatever comes back first.
      </p>

      <p>
        I am writing about local businesses that rank low in that search, or do not show up
        in it at all.
      </p>

      <h2>About the series</h2>

      <p>
        I am a student at the University of Alabama and I build websites for small
        businesses, which means I spend a lot of time looking at how independent shops
        appear online. Near campus I keep seeing the same thing. A business that has been
        here for fifteen years, and that locals know well, often does not show up when a
        freshman searches on a phone.
      </p>

      <p>
        The usual cause is a Facebook page from 2019, an unclaimed Google listing and no
        website. Together those put it below a chain three miles further away.
      </p>

      <p>
        Each piece in this series covers one business: who runs it, how long it has been
        here, what it does well, and what a student trying to find it runs into. I am not
        selling anything in these pieces, and I feature businesses whether or not they are
        clients. Several of them will not be.
      </p>

      <h2>Why I am writing it</h2>

      <p>I have two reasons.</p>

      <p>
        The first is that it connects to what I study. I am a psychology and data
        science student on a pre-med track, and the part of data science I keep coming back
        to is how people search versus how businesses assume they search. A local shop is a
        small case of that question that I can study in person.
      </p>

      <p>
        The second is that I run a company that builds websites, so I have a business
        interest in the topic. I will report what I find, including when a business does fine
        without a website.
      </p>

      <h2>If you run a business near campus</h2>

      <p>
        I would like to feature you. It takes twenty minutes, in person, at your place. I
        will ask what you do, how people find you, and what has changed since the students
        came back. You get a written piece about your business either way, and you are under
        no obligation to buy anything.
      </p>

      <p>
        Reach me at <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a> or{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
      </p>

      <h2>Upcoming pieces</h2>

      <p>
        I am reporting the first pieces now. If you want to follow along, the rest of the
        series will appear on <Link href="/blog">this blog</Link>, and campus events and
        openings show up on <a href="https://ua-today.vercel.app">UA Today</a>, which I also
        built.
      </p>

      <PostByline post={{
        slug: "tuscaloosa-small-business-online",
        title: "The Tuscaloosa Storefront Project",
        description: "A reporting series on independent businesses around the University of Alabama. It covers who runs them, how students find them, and what happens to a fifteen-year-old shop that has no website.",
        published: "2026-08-20",
      }} />
    </PostLayout>
  );
}
