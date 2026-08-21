import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import PostFaq from "@/app/components/PostFaq";

// SOURCED FROM WHAT ACTUALLY HAPPENED, INCLUDING THE PARTS THAT DID NOT WORK.
//
// No invented conversion rates. The one named client came through cold outreach and that
// is a fact on the resume; the rest of the piece is about method rather than metrics,
// because a metric he cannot back up is the one thing that would make it worthless.

export const metadata = {
  alternates: { canonical: "/blog/cold-outreach-that-worked" },
  title: { absolute: "The cold email that got me a client, and the fifty that did not | Elijah Purcell" },
  description:
    "What actually works when a teenager cold-emails small businesses: leading with a specific observation instead of a pitch, why attaching work beats describing it, and the three sentences that get deleted every time.",
};

const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "25px", fontWeight: 600, lineHeight: 1.2, margin: "42px 0 10px" } as const;
const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };
const quote: React.CSSProperties = {
  background: "rgba(0,0,0,0.22)", borderTop: "2px solid rgba(212,175,55,0.35)",
  padding: "16px 18px", margin: "16px 0", fontSize: "15px", lineHeight: 1.7,
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
          { name: "The cold email that got me a client, and the fifty that did ", href: "/blog/cold-outreach-that-worked" },
        ]} />
        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Business · August 20, 2026 · 6 min read</div>
          <h1>
            The cold email that got me a client, and the ones that{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>did not</em>
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            My first real client came from a cold email. A photography business, a full site,
            scoped and built and delivered. Most of the emails before it went nowhere, and
            the difference between them was not the writing quality.
          </p>

          <p>
            I am not going to give you a conversion rate, because I did not instrument it
            properly at the time and a number I cannot stand behind is worth less than
            nothing. What I can tell you is what changed.
          </p>

          <h2 style={H2}>The version that fails</h2>

          <p>Everybody writes this one first, including me.</p>

          <div style={quote}>
            Hi, I&apos;m Elijah, I run a web design company. I noticed your business could
            benefit from a modern website. We offer affordable packages starting at $99/mo.
            Would you be interested in a quick call this week?
          </div>

          <p>
            Nothing in that is offensive. It is also indistinguishable from the forty other
            versions of it that arrived that month, and it asks a busy person to spend a
            phone call finding out whether it is worth a phone call.
          </p>

          <p>
            The specific failure is "could benefit from a modern website." That sentence
            contains no evidence that I looked at their business at all. It would be equally
            true of every business on earth, which is another way of saying it is not about
            them.
          </p>

          <h2 style={H2}>What changed: lead with the thing you noticed</h2>

          <p>
            The version that works opens with something specific and checkable about
            <em> their</em> business. Not a compliment. An observation.
          </p>

          <div style={quote}>
            Your booking page 404s from the link in your Instagram bio. I checked on a phone
            in case it was just my laptop, and it does the same thing. Whoever tries to book
            you from Instagram is currently hitting a dead end.
          </div>

          <p>
            That is worth reading whether or not they hire anybody. It also proves the
            twenty minutes, which is the actual message underneath it: somebody looked
            properly at your business before contacting you, which is roughly nobody.
          </p>

          <h2 style={H2}>Attach the work, do not describe it</h2>

          <p>
            The strongest thing I ever did in cold outreach was build first and send the
            link. Not a mockup, not a Figma file. A real page at a real URL that loads on
            their phone.
          </p>

          <p>
            It reframes the entire conversation. You are no longer asking them to imagine
            something and pay for it. You are showing them a thing that exists and asking
            whether they want it.
          </p>

          <p>
            The obvious objection is that it is a lot of work for a stranger who might not
            reply. It is. It is also the only version where you are not competing on the same
            axis as everybody else in their inbox, and it means the worst case is that you
            got better at building the thing.
          </p>

          <h2 style={H2}>Three sentences to cut</h2>

          <p>
            <strong>"I hope this email finds you well."</strong> It tells the reader the next
            paragraph is a template.
          </p>

          <p>
            <strong>"I'd love to hop on a quick call."</strong> Nobody's call is quick. Say
            what you want and give them a way to say yes in writing.
          </p>

          <p>
            <strong>Anything about your passion, your journey, or your mission.</strong> A
            stranger has no reason to care yet, and every sentence about you is a sentence
            not about them.
          </p>

          <h2 style={H2}>On being young</h2>

          <p>
            I was seventeen when I started sending these. The instinct is to hide it, and
            that instinct is wrong for one reason: it will come out, and when it comes out
            after they have decided to trust you, it reads as something you concealed rather
            than something you did not lead with.
          </p>

          <p>
            Do not lead with it either. Lead with the observation. The age comes up on the
            call and by then the relevant question has already been answered, which is
            whether you can do the work.
          </p>

          <h2 style={H2}>The part that actually decides it</h2>

          <p>
            Follow-up. One message, about a week later, adding something rather than
            repeating yourself. Most of my replies came on the second contact and almost
            none came on the third, so one follow-up is worth sending and a fourth is worth
            skipping.
          </p>

          <p>
            And when somebody says no, say thank you and mean it. Tuscaloosa is small,
            Acworth is smaller, and the person who said no in March is the person who
            mentions you to somebody else in October.
          </p>

          <p>
            I am currently doing a slower version of the same thing:{" "}
            <Link href="/blog/tuscaloosa-small-business-online" style={link}>writing about
            businesses near campus</Link>, one at a time, with no pitch attached. Turns out
            the best cold outreach is not an email at all.
          </p>

          <PostFaq qa={[
            ["What makes a cold email actually work?",
             "Opening with something specific and checkable about the recipient's own business rather than a pitch. Not a compliment, an observation: a booking link that 404s, checked on a phone as well as a laptop. It is worth reading whether or not they hire anybody, and it proves that somebody actually looked."],
            ["What should you never write in a cold email?",
             "Three things. That you hope the email finds them well, which tells the reader a template is coming. That you would love to hop on a quick call, because nobody's call is quick. And anything about your passion, journey or mission, because every sentence about you is a sentence not about them."],
            ["How many times should you follow up on a cold email?",
             "Once, about a week later, adding something rather than repeating yourself. Most replies come on the second contact and almost none on the third, so one follow-up is worth sending and a fourth is worth skipping."],
          ]} />

          <PostByline post={{
            slug: "cold-outreach-that-worked",
            title: "The cold email that got me a client, and the ones that did not",
            description: "Leading with a specific observation instead of a pitch, why attaching work beats describing it, and the three sentences that get deleted every time.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
