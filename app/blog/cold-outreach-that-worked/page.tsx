import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import PostByline from "@/app/components/PostByline";

// SOURCED FROM WHAT ACTUALLY HAPPENED, INCLUDING THE PARTS THAT DID NOT WORK.
//
// No invented conversion rates. The one named client came through cold outreach and that
// is a fact on the resume; the rest of the piece is about method rather than metrics,
// because a metric he cannot back up is the one thing that would make it worthless.

export const metadata = {
  alternates: { canonical: "/blog/cold-outreach-that-worked" },
  title: { absolute: "The cold email that got me a client, and the ones that did not, by Elijah Purcell" },
  description:
    "What worked when a teenager cold-emailed small businesses: leading with a specific observation instead of a pitch, why attaching work beats describing it, and three sentences to cut.",
};


export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: "The cold email that got me a client, and the ones that did not", href: "/blog/cold-outreach-that-worked" },
      ]} />}
      kicker="Business"
      title="The cold email that got me a client, and the ones that did not"
      meta="20 August 2026, 6 minute read"
    >
      <p>
        My first client came from a cold email: a photography business that got a full
        site, scoped, built and delivered. Most of the emails before it went nowhere.
        What changed was the first line.
      </p>

      <p>
        I did not track replies at the time, so I have no conversion rate to give you.
        I can tell you what I changed.
      </p>

      <h2>The version that fails</h2>

      <p>Everybody writes this one first, including me.</p>

      <blockquote>
        Hi, I&apos;m Elijah, I run a web design company. I noticed your business could
        benefit from a modern website. We offer affordable packages starting at $99/mo.
        Would you be interested in a quick call this week?
      </blockquote>

      <p>
        Nothing in that is offensive. It also reads like every other version of it in
        their inbox, and it asks a busy person to spend a
        phone call finding out whether it is worth a phone call.
      </p>

      <p>
        The specific failure is "could benefit from a modern website." That sentence
        contains no evidence that I looked at their business at all. The sentence fits
        any business, so it shows no research.
      </p>

      <h2>Opening with something you noticed</h2>

      <p>
        The version that works opens with something specific and checkable about
        <em> their</em> business. Write an observation about it, and skip the praise.
      </p>

      <blockquote>
        Your booking page 404s from the link in your Instagram bio. I checked on a phone
        in case it was just my laptop, and it does the same thing. Whoever tries to book
        you from Instagram is currently hitting a dead end.
      </blockquote>

      <p>
        That is worth reading whether or not they hire anybody. It also shows I spent
        time on their business before contacting them, which few senders do.
      </p>

      <h2>Building the page first, then sending it</h2>

      <p>
        The best thing I did in cold outreach was build first and send the link: a live
        page at its own URL that loads on their phone.
      </p>

      <p>
        You show them a page that exists and ask if they want it.
      </p>

      <p>
        The obvious objection is that it is a lot of work for a stranger who might not
        reply. It is. Most senders skip it, though, and if they never reply you still got
        practice building the thing.
      </p>

      <h2>Three sentences to cut</h2>

      <p>
        <strong>"I hope this email finds you well."</strong> It tells the reader the next
        paragraph is a template.
      </p>

      <p>
        <strong>"I'd love to hop on a quick call."</strong> Most calls run longer than promised. Say
        what you want and give them a way to say yes in writing.
      </p>

      <p>
        <strong>Anything about your story.</strong> A
        stranger has no reason to care yet, and every sentence about you is a sentence
        not about them.
      </p>

      <h2>On being young</h2>

      <p>
        I was seventeen when I started sending these. The instinct is to hide it, and
        that instinct is wrong for one reason: it will come out, and when it comes out
        after they have decided to trust you, it reads as concealment.
      </p>

      <p>
        Do not lead with it either. Lead with the observation. The age comes up on the
        call and by then the relevant question has already been answered, which is
        whether you can do the work.
      </p>

      <h2>Follow-up</h2>

      <p>
        Send one message about a week later that adds something new. Most of my replies
        came on the second contact and almost none came on the third, so a third contact
        is rarely worth sending.
      </p>

      <p>
        When somebody says no, say thank you and mean it. Tuscaloosa is small,
        Acworth is smaller, and someone who said no may still recommend you later.
      </p>

      <p>
        I am currently doing a slower version of the same thing:{" "}
        <Link href="/blog/tuscaloosa-small-business-online">writing about
        businesses near campus</Link>, one at a time, with no pitch attached. So far that
        has worked better than cold email.
      </p>

<PostByline post={{
            slug: "cold-outreach-that-worked",
            title: "The cold email that got me a client, and the ones that did not",
            description: "Leading with a specific observation instead of a pitch, sending a built page instead of a description, and three sentences to cut.",
            published: "2026-08-20",
          }} />


    </PostLayout>
  );
}
