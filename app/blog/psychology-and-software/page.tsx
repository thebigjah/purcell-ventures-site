import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata = {
  alternates: { canonical: "/blog/psychology-and-software" },
  title: { absolute: "What psychology has to do with the software I build | Elijah Purcell" },
  description:
    "Within-subject design, base rates, and the difference between a profile and a trajectory. What a first-semester psychology methods course changed about a product I had already shipped.",
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
          { name: "Psychology and software", href: "/blog/psychology-and-software" },
        ]} />

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Notes · August 20, 2026 · 6 min read</div>
          <h1>
            What psychology has to do with the software I{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>build</em>
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            I am studying psychology and data science, and people assume the software company
            is the day job and the degree is the plan for later. The honest answer is that
            one week of a methods course has already changed something I had shipped.
          </p>

          <h2 style={H2}>Within-subject design</h2>

          <p>
            The rule, as{" "}
            <a href="https://dictionary.apa.org/within-subjects-design" style={{ color: "var(--color-warm-accent)", textDecoration: "underline" }} rel="noopener">the APA defines it</a>, is that you measure a person against their own baseline rather
            than against everybody else's. It sounds obvious written down. It is not what I built.
          </p>

          <p>
            My instinct on a personal AI product was to cluster users, find the pattern most
            of them shared, and build toward that pattern. That felt like product sense and I
            would have defended it if anyone had asked.
          </p>

          <p>
            What I had actually done was dress up between-subject thinking in better clothes,
            and in doing it I flattened the one signal I care about most: the change in a
            single person over time.
          </p>

          <p>
            A population average tells you what a typical user tends to do. It cannot tell
            you whether the particular person in front of you right now is drifting away from
            wherever they usually sit. A flat day on its own means nothing. Held against that
            same user's last three weeks it means quite a lot, and the difference between
            those two situations is the entire product.
          </p>

          <p>
            The question I keep asking now is whether I am storing a profile or storing a
            trajectory. Most of what I had written stores profiles. Clinicians worked this
            out decades before I arrived, and it is sitting in my textbook next to a chart of
            one subject plotted against nobody but himself.
          </p>

          <h2 style={H2}>Base rates</h2>

          <p>
            The second thing that transfers immediately. A test that is ninety-nine per cent
            accurate for a condition affecting one person in ten thousand produces far more
            false positives than true ones, and the intuition that resists this is very
            strong.
          </p>

          <p>
            Every alerting system I have built has this problem. An anomaly detector that is
            right ninety-five per cent of the time, run against a thousand events a day where
            three are real, produces about fifty false alarms for three true ones. People
            mute it in a week, and a muted monitor is worse than no monitor, because you
            believe you have one.
          </p>

          <p>
            I hit exactly this with a test-result parser that misread a summary and reported
            failures that were not there. The lesson was not to improve the parser. It was
            that a monitor which cries wolf gets muted, so the cost of a false positive is
            not one wasted minute, it is the entire monitor.
          </p>

          <h2 style={H2}>Construct validity, which is the one engineers should steal</h2>

          <p>
            Psychology spends enormous effort on whether the thing you measured is the thing
            you meant. Not whether the measurement is precise. Whether it is <em>of</em> the
            right thing.
          </p>

          <p>
            Software is full of measurements that are precise and about the wrong thing.
            Engagement time as a proxy for value. Test count as a proxy for coverage. Deploy
            frequency as a proxy for velocity. Every one is measurable to three decimal
            places and every one can move in the wrong direction while the thing it stands
            in for gets worse.
          </p>

          <p>
            The habit worth stealing is the question asked before the measurement rather than
            after: if this number went up and the thing I actually care about got worse, would
            I be able to tell?
          </p>

          <h2 style={H2}>Why the combination, honestly</h2>

          <p>
            The plan is psychiatry, and the specific thing I want to work on is how much
            administrative load a clinician carries that could be carried by something else.
            Notes, documentation, the paperwork between a person and their patient.
          </p>

          <p>
            That problem needs both halves. You cannot design it from the software side
            without knowing what the clinical work actually is, and you cannot design it from
            the clinical side without knowing what these systems reliably do and where they
            fail. Most attempts have one half.
          </p>

          <p>
            I am one semester in and this is a claim about a plan rather than a result. But
            the transfer has already gone in the direction I did not expect: not the software
            improving the psychology, the psychology finding a real defect in software I had
            already shipped.
          </p>

          <p>
            More on the degree structure that allows this combination:{" "}
            <Link href="/blog/new-college-alabama" style={link}>New College at Alabama</Link>{" "}
            and <Link href="/ai-at-alabama" style={link}>studying AI here</Link>.
          </p>

          <PostFaq qa={[
            ["What is within-subject design and why does it matter for software?",
             "Within-subject design measures a person against their own baseline rather than against a group average. It matters in software because a population average tells you what a typical user does but cannot tell you whether the specific person in front of you is drifting from where they usually sit. The practical version of the question is whether your system stores a profile or a trajectory."],
            ["Why do anomaly detectors produce so many false alarms?",
             "Base rates. A detector that is right ninety-five per cent of the time, run against a thousand events a day of which three are real, produces roughly fifty false alarms for three true ones. Users mute it within a week, and a muted monitor is worse than no monitor because you still believe you have one."],
            ["What is construct validity and how does it apply to engineering metrics?",
             "Construct validity asks whether the thing you measured is the thing you meant, rather than whether the measurement is precise. Engagement time as a proxy for value, test count as a proxy for coverage and deploy frequency as a proxy for velocity are all precise and all able to move in the wrong direction while the thing they stand for gets worse. The test to run before choosing a metric: if this number rose and the thing I care about got worse, would I be able to tell?"],
          ]} />

          <PostByline post={{
            slug: "psychology-and-software",
            title: "What psychology has to do with the software I build",
            description: "Within-subject design, base rates, and construct validity. What a first-semester methods course changed about a product already shipped.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
