import Link from "next/link";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";

export const metadata = {
  alternates: { canonical: "/blog/psychology-and-software" },
  title: { absolute: "What psychology has to do with the software I build" },
  description:
    "Within-subject design, base rates and construct validity are three ideas from a first-semester psychology methods course that changed a product I had already shipped.",
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "Psychology and software", href: "/blog/psychology-and-software" },
      ]} />}
      kicker="Notes"
      title="What psychology has to do with the software I build"
      meta="20 August 2026, 6 minute read"
    >
<p>
            I run a software company and study psychology and data science. People tend to
            assume the degree has little to do with the company. In my first week, a
            psychology methods course changed a product I had already shipped.
          </p>

          <h2>Within-subject design</h2>

          <p>
            The rule, as{" "}
            <a href="https://dictionary.apa.org/within-subjects-design" rel="noopener">the APA defines it</a>, is that you measure a person against their own baseline rather
            than against everybody else's. My product did the opposite.
          </p>

          <p>
            My instinct on a personal AI product was to cluster users, find the pattern most
            of them shared, and build toward that pattern. That felt right and I would have
            defended it if anyone had asked.
          </p>

          <p>
            I had applied between-subject thinking and called it product sense. That approach
            averaged away the signal I care about most, which is how one person changes over
            time.
          </p>

          <p>
            A population average tells you what a typical user tends to do. It cannot tell
            you whether the particular person in front of you right now is drifting away from
            wherever they usually sit. A flat day on its own means nothing. Held against that
            same user&apos;s last three weeks it can signal a problem, and that difference is what
            the product measures.
          </p>

          <p>
            The question I keep asking now is whether I am storing a profile or storing a
            trajectory. Most of what I had written stores profiles. Clinicians have used this
            design for decades, and my textbook has a chart of one subject plotted against
            that subject&apos;s own baseline.
          </p>

          <h2>Base rates</h2>

          <p>
            The second idea that transferred is base rates. A test that is ninety-nine per cent
            accurate for a condition affecting one person in ten thousand produces far more
            false positives than true ones, and most people&apos;s intuition says otherwise.
          </p>

          <p>
            Every alerting system I have built has this problem. An anomaly detector that is
            right ninety-five per cent of the time, run against a thousand events a day where
            three are true anomalies, produces 50 false alarms for three true ones.
            People mute it within a week, and after that they still believe something is
            watching when nothing is.
          </p>

          <p>
            I hit this with a test-result parser that misread a summary and reported failures
            that were not there. Fixing the parser took little time. The larger risk was that
            the false failures would teach people to ignore the monitor entirely.
          </p>

          <h2>Construct validity</h2>

          <p>
            Psychology spends a lot of effort on whether the thing you measured is the thing
            you meant. Construct validity asks whether a measurement is <em>of</em> the right
            thing, however precise it is.
          </p>

          <p>
            Software is full of measurements that are precise and about the wrong thing.
            Engagement time stands in for value and test count for coverage. Both are easy to
            measure precisely, and both can go up while the thing they stand in for gets
            worse.
          </p>

          <p>
            The habit I took from this is a question I ask before choosing a measurement: if
            this number went up and the thing I care about got worse, would I be able to tell?
          </p>

          <h2>Why I am studying both</h2>

          <p>
            The plan is psychiatry, and the specific thing I want to work on is how much
            administrative load a clinician carries that could be carried by something else,
            starting with notes and documentation.
          </p>

          <p>
            That problem needs both fields. You cannot design a solution from the software side
            without knowing what the clinical work involves, and you cannot design it from
            the clinical side without knowing what these systems reliably do and where they
            fail.
          </p>

          <p>
            I am in my first semester, so this is a plan with no results yet. So far the ideas
            have moved from psychology into software, which I did not expect, and they found a
            defect in a product I had already shipped.
          </p>

          <p>
            More on the degree structure that allows this combination:{" "}
            <Link href="/blog/new-college-alabama">New College at Alabama</Link>{" "}
            and <Link href="/ai-at-alabama">studying AI here</Link>.
          </p>

          <PostByline post={{
            slug: "psychology-and-software",
            title: "What psychology has to do with the software I build",
            description: "Within-subject design, base rates and construct validity are three ideas from a first-semester psychology methods course that changed a product I had already shipped.",
            published: "2026-08-20",
          }} />

            </PostLayout>
  );
}
