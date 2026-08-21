import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata = {
  alternates: { canonical: "/blog/six-sources-one-page" },
  title: "Six sources, one page: building a campus events site | Elijah Purcell",
  description:
    "How UA Today reconciles six separate feeds of University of Alabama events into a single page, why the hard part is detecting a source that quietly stopped rather than one that errors, and what a floor check is.",
};

const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "25px", fontWeight: 600, lineHeight: 1.2, margin: "40px 0 10px" } as const;
const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };
const pre: React.CSSProperties = {
  background: "rgba(0,0,0,0.28)", border: "1px solid rgba(212,175,55,0.18)",
  padding: "14px 16px", overflowX: "auto", fontSize: "13.5px", lineHeight: 1.6,
  fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", margin: "16px 0",
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
          { name: "Six sources, one page", href: "/blog/six-sources-one-page" },
        ]} />

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Engineering · August 20, 2026 · 7 min read</div>
          <h1>
            Six sources, one page: building a{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>campus events</em> site
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            Campus information at a large university is scattered by design. The official
            calendar has official events. Departments post their own. Student organisations
            announce on social. Athletics is a separate system. A student who wants to know
            what is happening tonight has to check five places, so most check none.
          </p>

          <p>
            <a href="https://ua-today.vercel.app" style={link}>UA Today</a> checks them
            instead, on a schedule, and shows the result on one page: 6 sources, roughly 700
            events at a time. Here is what turned out to be hard, and it was not the parsing.
          </p>

          <h2 style={H2}>The easy problem</h2>

          <p>
            Fetching and normalising six feeds is a day of work. Different date formats,
            different notions of what a location is, different ideas about whether a
            recurring event is one record or forty. Tedious, bounded, done.
          </p>

          <p>
            The interesting problem is what happens on day ninety.
          </p>

          <h2 style={H2}>The real problem: a source that stops without failing</h2>

          <p>
            A source that returns an error is easy. You see it, you fix it.
          </p>

          <p>
            A source that returns <em>an empty list</em>, with a 200 status and a
            well-formed response, is the one that hurts. Somebody renames a query parameter
            over winter break. The feed still answers. It just answers with nothing, and your
            site quietly shows fewer events, and nobody notices because a quiet week on
            campus looks exactly like a quiet week on campus.
          </p>

          <p>
            This is the same failure family as almost every real bug I have written about
            this year:{" "}
            <Link href="/blog/canonical-tag-noindex" style={link}>a canonical tag telling
            Google to skip nine pages</Link>,{" "}
            <Link href="/blog/what-the-agents-get-wrong" style={link}>ten agents that were
            never being invoked while the runner exited zero</Link>. Nothing errors.
            Something is just missing, and absence does not raise.
          </p>

          <h2 style={H2}>Floor checks</h2>

          <p>
            The fix is to assert a minimum rather than the absence of an exception. Each
            source declares how many events it should plausibly produce, and returning fewer
            is a failure even when the request succeeded.
          </p>

          <div style={pre}>{`const SOURCES = [
  { name: "official",    floor: 40 },
  { name: "student org", floor: 20 },
  // ...
];`}</div>

          <p>
            The floor is deliberately loose. It is not there to catch a slow week, it is
            there to catch a source that has gone to zero or near it while still answering
            politely. A health endpoint reports each source with its count and its response
            time, and the morning check reads that endpoint rather than trusting that the
            job ran.
          </p>

          <p>
            Choosing the number is a judgement call, and the failure mode of choosing badly
            is worse than you would expect: a floor set too high fires on every quiet week,
            people learn to ignore it, and now you have a monitor that is worse than no
            monitor because you believe you have one.
          </p>

          <h2 style={H2}>Two smaller things that mattered more than expected</h2>

          <p>
            <strong>A moderation queue.</strong> Anyone can submit an event and nothing
            appears without a human looking at it. For a site with a university's name near
            it, the cost of one bad listing is much higher than the cost of a slower
            pipeline.
          </p>

          <p>
            <strong>Saying it is unofficial, in the masthead.</strong> Not in a footer, not
            on a terms page. The first screen. It is a student project, it is not affiliated
            with the university, and event details are aggregated automatically and can be
            wrong. Being clear about that is the reason it is allowed to exist at all.
          </p>

          <h2 style={H2}>What I would do differently</h2>

          <p>
            Write the floor checks first. I added them after a source went quiet, which is
            the usual order and the wrong one. The monitoring for a pipeline is not a thing
            you add once the pipeline works. It is the part that tells you whether the
            pipeline works, and building it second means you spend the gap trusting a report
            you have not tested.
          </p>

          <p>
            Also: an aggregator's real product is not the aggregation. It is confidence. A
            student uses it twice, finds something wrong once, and never returns. Everything
            expensive in the build was in service of the listing being right, not in service
            of there being more listings.
          </p>

          <PostFaq qa={[
            ["How do you detect when a data source silently stops returning results?",
             "Assert a minimum count rather than the absence of an error. A source that has been renamed or deprecated often still returns a well-formed response with a 200 status and an empty list, which no error handler catches. Give each source a loose floor for how many records it should plausibly produce and treat falling below it as a failure even though the request succeeded."],
            ["Why is a monitor that produces false alarms worse than no monitor?",
             "Because people mute it, and a muted monitor leaves you believing you have coverage that you do not. A threshold set too aggressively fires on normal variation, users learn to ignore it within a week, and the real alert arrives into an audience that has already stopped reading."],
            ["What is the hardest part of building an event aggregator?",
             "Not the parsing, which is bounded and tedious. It is detecting a source that quietly goes to zero while still answering politely, because the resulting site looks the same as a genuinely quiet week. The second hardest part is trust: an aggregator's product is confidence, and a user who finds one wrong listing does not come back."],
          ]} />

          <PostByline post={{
            slug: "six-sources-one-page",
            title: "Six sources, one page: building a campus events site",
            description: "How UA Today reconciles six feeds into one page, and why the hard part is detecting a source that quietly stopped rather than one that errors.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
