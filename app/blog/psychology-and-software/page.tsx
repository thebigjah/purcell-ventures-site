import Link from "next/link";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";

export const metadata = {
  alternates: { canonical: "/blog/psychology-and-software" },
  title: { absolute: "What psychology has to do with the software I build, by Elijah Purcell" },
  description:
    "Within-subject design, base rates and construct validity are three ideas from a first-semester psychology methods course that changed a product I had already shipped.",
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: "Psychology and software", href: "/blog/psychology-and-software" },
      ]} />}
      kicker="Notes"
      title="What psychology has to do with the software I build"
      meta="20 August 2026, 6 minute read"
    >
<p>
            I am studying psychology and data science, and people assume the software company
            is the day job and the degree is the plan for later. One week of a methods course
            has already changed something I had shipped.
          </p>

          <h2>Within-subject design</h2>

          <p>
            The rule, as{" "}
            <a href="https://dictionary.apa.org/within-subjects-design" rel="noopener">the APA defines it</a>, is that you measure a person against their own baseline rather
            than against everybody else's. It sounds obvious written down, and my product did
            the opposite.
          </p>

          <p>
            My instinct on a personal AI product was to cluster users, find the pattern most
            of them shared, and build toward that pattern. That felt right and I would have
            defended it if anyone had asked.
          </p>

          <p>
            I had applied between-subject thinking and called it product sense. That flattened
            the one signal I care about most: the change in a single person over time.
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
            People mute it in a week, and a muted monitor is worse than no monitor, because
            you believe you have one.
          </p>

          <p>
            I hit this with a test-result parser that misread a summary and reported failures
            that were not there. Fixing the parser was the small part. A monitor that reports
            false failures gets muted, so one false positive can cost you the whole monitor.
          </p>

          <h2>Construct validity</h2>

          <p>
            Psychology spends a lot of effort on whether the thing you measured is the thing
            you meant. Construct validity asks whether a measurement is <em>of</em> the right
            thing, however precise it is.
          </p>

          <p>
            Software is full of measurements that are precise and about the wrong thing.
            Engagement time stands in for value and test count for coverage. Both are
            measurable to three decimal places, and both can move in the wrong direction while
            the thing they stand in for gets worse.
          </p>

          <p>
            The habit I took from this is a question I ask before choosing a measurement: if
            this number went up and the thing I care about got worse, would I be able to tell?
          </p>

          <h2>Why the combination</h2>

          <p>
            The plan is psychiatry, and the specific thing I want to work on is how much
            administrative load a clinician carries that could be carried by something else,
            starting with notes and documentation.
          </p>

          <p>
            That problem needs both halves. You cannot design it from the software side
            without knowing what the clinical work involves, and you cannot design it from
            the clinical side without knowing what these systems reliably do and where they
            fail.
          </p>

          <p>
            I am one semester in, so this describes a plan with no results yet. So far the transfer
            has gone in the direction I did not expect. Psychology found a defect in software I
            had already shipped.
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
