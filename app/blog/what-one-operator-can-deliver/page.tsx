import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata = {
  alternates: { canonical: "/blog/what-one-operator-can-deliver" },
  title: { absolute: "What one operator can actually deliver | Elijah Purcell" },
  description:
    "The honest capacity of a one-person software company: how many builds a month, what happens when two clients want the same fortnight, what an agency genuinely does better, and the three warning signs you are being oversold.",
};

const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "25px", fontWeight: 600, lineHeight: 1.2, margin: "40px 0 10px" } as const;
const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: "What one operator can deliver", href: "/blog/what-one-operator-can-deliver" },
        ]} />

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Business · August 20, 2026 · 7 min read</div>
          <h1>
            What one operator can{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>actually</em> deliver
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            Every solo shop's website says the same thing: personal service, direct access to
            the person doing the work, no account managers. All true, and all carefully
            silent about the part a client actually needs to know, which is what happens when
            that one person is already busy.
          </p>

          <p>
            So here is the arithmetic, on the page, where a prospective client can read it
            before they call.
          </p>

          <h2 style={H2}>The number is builds per month, not hours per week</h2>

          <p>
            Hours are the wrong unit. A build is not a bag of hours, it is a sequence with
            waiting in it: you scope, you build, you send it, you wait for feedback, you
            revise, you launch. The waiting is not free time, because it fragments
            everything around it.
          </p>

          <p>
            What one person can carry is a small number of builds in flight at once and a
            slightly larger number of maintenance relationships, and the two compete. Every
            ongoing client is a stream of small interruptions, and small interruptions are
            what kill the deep work that new builds require.
          </p>

          <p>
            If somebody solo tells you they can take on your project this week alongside
            everything else and it will not affect the timeline, one of those three things
            is not true.
          </p>

          <h2 style={H2}>What happens when two clients want the same fortnight</h2>

          <p>
            Somebody waits. That is the entire answer, and the only question worth asking a
            solo operator is how they decide who.
          </p>

          <p>
            My rule: whoever signed first goes first, and if you are second I tell you that
            before you pay rather than after. A start date that moves after money has changed
            hands is the single most common way a small engagement goes bad, and it is
            entirely preventable by saying the awkward thing early.
          </p>

          <p>
            Ask any solo provider directly: what are you currently in the middle of, and when
            does it finish? A person who cannot answer that in one sentence does not have a
            schedule, they have a hope.
          </p>

          <h2 style={H2}>What an agency genuinely does better</h2>

          <p>
            Not a rhetorical concession. Four real things.
          </p>

          <p>
            <strong>Continuity.</strong> If I am hit by a bus, your site is a repository and
            a hosting account with nobody who knows why anything is the way it is. An agency
            has other people. That is a real risk and the mitigation is boring: you should
            have admin access to everything, in your own name, from day one, and if a
            provider resists that, leave.
          </p>

          <p>
            <strong>Simultaneous specialisms.</strong> A photographer, a copywriter and a
            developer working the same week is a thing a team does and a solo operator
            sequences. If you need all three at once, sequence costs you time.
          </p>

          <p>
            <strong>Surge.</strong> If your deadline is immovable and large, more hands are
            more hands.
          </p>

          <p>
            <strong>Someone to escalate to.</strong> When you are unhappy with a solo
            provider, you are unhappy at the only person there. Some people find that
            uncomfortable and that is a legitimate preference rather than a failing.
          </p>

          <h2 style={H2}>What a solo operator does better</h2>

          <p>
            <strong>The person you talked to is the person who builds it.</strong> Nothing is
            lost between the conversation and the work, because there is no handoff.
          </p>

          <p>
            <strong>Decisions take minutes.</strong> No internal alignment, no status meeting
            about your status meeting.
          </p>

          <p>
            <strong>The overhead is not in your price.</strong> You are not funding an office
            or an account manager.
          </p>

          <p>
            <strong>The whole system is in one head.</strong> That is a genuine risk, and it
            is also why a small change actually takes twenty minutes instead of a ticket, a
            sprint and a regression.
          </p>

          <h2 style={H2}>Three signs you are being oversold</h2>

          <p>
            <strong>Unlimited anything.</strong> Unlimited revisions from a one-person shop
            means either a cap that will appear later or a person who is about to resent your
            project.
          </p>

          <p>
            <strong>A start date with no current workload attached.</strong> "We can start
            Monday" from somebody who will not say what they are finishing first.
          </p>

          <p>
            <strong>A team page with no names.</strong> If a solo operation is describing
            itself as "we" and the team page has stock photographs, the pricing is not the
            only thing being presented optimistically.
          </p>

          <p>
            My own version of that page names{" "}
            <Link href="/team" style={link}>fifteen agents and says in the first sentence
            that every one of them is software</Link>, because the alternative is a roster of
            invented colleagues, and that is the fastest way to lose somebody who checks.
          </p>

          <h2 style={H2}>How to actually decide</h2>

          <p>
            Ask three questions and listen to whether the answers are specific.
          </p>

          <p>
            What are you working on right now and when does it end. What happens if you are
            unavailable for two weeks. Who has the admin credentials when this is finished.
          </p>

          <p>
            The third one is the important one, and the right answer is you do. Anybody whose
            answer is that they hold them is selling you a dependency rather than a website.
          </p>

          <PostFaq qa={[
            ["Should I hire a freelancer or an agency for my small business website?",
             "An agency is better for continuity if the provider disappears, for specialists working simultaneously rather than in sequence, for surge capacity against a fixed large deadline, and for having somebody to escalate to. A solo operator is better when you want the person you talked to to be the person who builds it, when you want decisions in minutes rather than after internal alignment, and when you would rather not fund office overhead in your price."],
            ["How many projects can a one-person web company handle at once?",
             "Fewer than the hours suggest, because a build is a sequence with waiting in it rather than a bag of hours, and every ongoing maintenance client is a stream of small interruptions that fragments the deep work new builds need. The useful question is not how many hours they have, it is what they are currently in the middle of and when it finishes."],
            ["What should I ask before hiring a solo web developer?",
             "Three questions. What are you working on right now and when does it end. What happens if you are unavailable for two weeks. Who holds the admin credentials when the project is finished. The right answer to the third is that you do, and a provider who resists that is selling a dependency rather than a website."],
            ["What are the warning signs of being oversold by a web designer?",
             "Unlimited revisions offered by a one-person shop, which means either an undisclosed cap or a person about to resent the project. A start date offered without saying what is being finished first. And a company describing itself as a team without naming anybody, particularly with stock photography on the team page."],
          ]} />

          <PostByline post={{
            slug: "what-one-operator-can-deliver",
            title: "What one operator can actually deliver",
            description: "The honest capacity of a one-person software company, what an agency genuinely does better, and the three signs you are being oversold.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
