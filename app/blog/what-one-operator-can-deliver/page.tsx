import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata = {
  alternates: { canonical: "/blog/what-one-operator-can-deliver" },
  title: { absolute: "What one operator can deliver, by Elijah Purcell" },
  description:
    "How much work a one-person software company can carry, what happens when two clients want the same fortnight, what an agency does better, and three warning signs you are being oversold.",
};

const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "25px", fontWeight: 600, lineHeight: 1.2, margin: "40px 0 10px" } as const;
const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: "What one operator can deliver", href: "/blog/what-one-operator-can-deliver" },
        ]} />

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Business, August 20, 2026, 7 min read</div>
          <h1>
            What one operator can{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>deliver</em>
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            Every solo shop's website promises personal service and direct access to the
            person doing the work. Those claims are true, and they leave out what a client
            needs to know: what happens when that one person is already busy.
          </p>

          <p>
            So here is how I schedule work, written where a prospective client can read it
            before they call.
          </p>

          <h2 style={H2}>Count builds per month</h2>

          <p>
            Hours are the wrong unit. A build is a sequence with waiting in it: you scope,
            you build, you send it, you wait for feedback, you revise, you launch. The
            waiting breaks up everything around it, so it does not turn into free time.
          </p>

          <p>
            One person can carry a small number of builds in flight at once and a slightly
            larger number of maintenance clients, and the two compete. Every ongoing client
            sends small requests, and those requests break up the focused work that new
            builds require.
          </p>

          <p>
            If somebody solo tells you they can take on your project this week alongside
            everything else and it will not affect the timeline, one of those three things
            is false.
          </p>

          <h2 style={H2}>What happens when two clients want the same fortnight</h2>

          <p>
            The second client waits. The question to ask a solo operator is how they decide
            who goes second.
          </p>

          <p>
            My rule: whoever signed first goes first, and if you are second I tell you that
            before you pay. A start date that moves after money has changed hands is a
            common way a small engagement goes bad, and saying the awkward thing early
            prevents it.
          </p>

          <p>
            Ask any solo provider directly: what are you in the middle of, and when does it
            finish? A person who cannot answer that in one sentence does not have a
            schedule.
          </p>

          <h2 style={H2}>What an agency does better</h2>

          <p>
            Continuity is the first. If I became unavailable, your site would be a
            repository and a hosting account with nobody who knows why anything is the way
            it is. An agency has other people. The fix for that risk is simple: you should
            have admin access to everything, in your own name, from day one, and if a
            provider resists that, leave.
          </p>

          <p>
            An agency can also run several specialists at once. A photographer, a
            copywriter and a developer can work the same week on a team, while a solo
            operator does them one after another. If you need all three at once, that
            sequence costs you time.
          </p>

          <p>
            An agency can add people for a surge. If your deadline is fixed and the job is
            large, more people finish it sooner.
          </p>

          <p>
            An agency gives you someone to escalate to. When you are unhappy with a solo
            provider, you are unhappy at the only person there. Some people find that
            uncomfortable, and that is a fair preference.
          </p>

          <h2 style={H2}>What a solo operator does better</h2>

          <p>
            The person you talked to is the person who builds it. Nothing is lost between
            the conversation and the work, because there is no handoff.
          </p>

          <p>
            Decisions take minutes, because nobody inside the company needs to sign off.
          </p>

          <p>
            The overhead is not in your price. You are not funding an office or an account
            manager.
          </p>

          <p>
            The whole system is in one head. That is a risk, and it is also why a small
            change takes twenty minutes instead of a ticket, a sprint and a regression.
          </p>

          <h2 style={H2}>Three signs you are being oversold</h2>

          <p>
            The first is an offer of unlimited anything. Unlimited revisions from a
            one-person shop means either a cap that will appear later or a person who is
            about to resent your project.
          </p>

          <p>
            The second is a start date with no current workload attached: "We can start
            Monday" from somebody who will not say what they are finishing first.
          </p>

          <p>
            The third is a team page with no names. If a solo operation calls itself "we"
            and the team page has stock photographs, the pricing may be presented just as
            optimistically.
          </p>

          <p>
            My own version of that page names{" "}
            <Link href="/team" style={link}>fifteen agents and says in the first sentence
            that every one of them is software</Link>, because the alternative is a roster of
            invented colleagues.
          </p>

          <h2 style={H2}>How to decide</h2>

          <p>
            Ask three questions and listen to whether the answers are specific.
          </p>

          <p>
            What are you working on right now and when does it end? What happens if you are
            unavailable for two weeks? Who has the admin credentials when this is finished?
          </p>

          <p>
            The third matters most, and the right answer is you. A provider who keeps the
            credentials is tying you to them.
          </p>

          <PostByline post={{
            slug: "what-one-operator-can-deliver",
            title: "What one operator can deliver",
            description: "How much work a one-person software company can carry, what an agency does better, and three signs you are being oversold.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
