import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import PostByline from "@/app/components/PostByline";

export const metadata = {
  alternates: { canonical: "/blog/new-college-alabama" },
  title: { absolute: "New College at Alabama, explained by someone in it, by Elijah Purcell" },
  description:
    "How New College at the University of Alabama works: the self-designed degree, the depth study, the seminars, the Levitetz Leadership Program, and the case for and against choosing it.",
};


export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: "New College at Alabama, explained by someone in it", href: "/blog/new-college-alabama" },
      ]} />}
      kicker="Guide"
      title="New College at Alabama, explained by someone in it"
      meta="20 August 2026, 6 minute read, written in week one"
    >
      <p>
        Every explanation of New College I read before applying was either a brochure or
        a forum post from 2014. Here is my account, written in my first week, by someone
        who chose it and can tell you what it costs.
      </p>

      <h2>What it is</h2>

      <p>
        <a href="https://newcollege.ua.edu/" rel="noopener">New College</a>{" "}
        is an interdisciplinary program inside the Barefield College of Arts and Sciences
        at the University of Alabama. It has existed since 1971, which surprises people
        who assume it is a recent experiment.
      </p>

      <p>
        Instead of choosing a major off a list, you design one. You work with an advisor
        to build a program of study around a question you care about, drawing courses
        from wherever they happen to live in the university.
      </p>

      <h2>The vocabulary you will hit immediately</h2>

      <p>
        A depth study is your self-designed concentration. Existing examples include
        Socio-Legal Studies, Psycho-Social Sciences and Neuroscience. Mine combines psychology and data science, aimed at
        psychiatry and at how AI can reduce the administrative load on mental health
        clinicians.
      </p>

      <p>
        The program describes its seminars as a key part of the experience. They combine
        readings, discussion, presentations, experiential learning and public service.
        They are small, and the discussion itself is what gets graded.
      </p>

      <p>
        Independent study lets you build coursework around work you are already doing
        instead of adding it on top. That option is what made the decision for me.
      </p>

      <p>
        The Levitetz Leadership Program offers workshops, seed grants, internship
        opportunities, and the Levitetz Light Bulb Award for student research on
        real-world problems. If you are building anything, look at the seed grants.
      </p>

      <h2>The case for it</h2>

      <p>
        If your question does not map onto a department, a traditional major makes you
        approximate. You pick the closest one and spend four years reading around the
        edge of the thing you meant.
      </p>

      <p>
        New College lets you build the degree your question needs. If your interest sits
        between psychology and computer science, or between law and public health, you
        design a program around that exact overlap.
      </p>

      <p>
        It also rewards people who already do things. If you run or build something,
        that work can become the coursework instead of competing with it.
      </p>

      <h2>The case against it</h2>

      <p>
        Few people outside the program know what it is. &quot;Psychology&quot; is legible to a
        graduate admissions committee, a recruiter and your grandmother. &quot;A self-designed
        depth study in psycho-social sciences&quot; needs a sentence of explanation every time,
        and you will give that sentence often.
      </p>

      <p>
        You supply the structure. A traditional major is a sequence somebody already
        thought about. Here, the person deciding whether you take the hard course is you,
        and the failure mode is a transcript full of interesting courses that do not add
        up to anything.
      </p>

      <p>
        Prerequisite chains still apply. If your question needs a 400-level course, it
        needs everything under it, and the math sequence requires every course below it,
        however coherent your plan.
      </p>

      <p>
        Some paths need extra care. Pre-med works, because medical schools care about
        the prerequisites and the MCAT more than the major&apos;s name. If your field has a
        licensure body or an accredited curriculum, check with them before you commit.
      </p>

      <h2>Who should pick it</h2>

      <p>
        Pick it if you can already say, in one sentence, the question your degree is for.
      </p>

      <p>
        Do not pick it because you cannot decide. It gives an undecided student little
        support, because it removes the guardrails at the moment that student needs them
        most. A traditional major with a minor is a better tool for finding out what you
        like, and switching in later is easier than rescuing an incoherent transcript.
      </p>

      <h2>Practical details</h2>

      <p>
        New College is reachable at (205) 348-4600 or ncfrndsk@ua.edu. It combines with
        the Honors College, which is what I am doing. Ask about the depth study proposal
        process early, because it shapes which courses are worth taking in your first
        year instead of your third.
      </p>

      <p>
        I will write this again at the end of the year, when I know whether I was right.
        If you are a New College student and I have got something wrong here,{" "}
        <a href="mailto:elijah@purcell-ventures.com">tell me</a> and I will
        correct it and say who corrected it.
      </p>

      <p>
        Related: <Link href="/ai-at-alabama">studying AI at Alabama</Link>{" "}
        and <Link href="/blog/free-at-alabama">what you have already paid
        for</Link>.
      </p>

<PostByline post={{
            slug: "new-college-alabama",
            title: "New College at Alabama, explained by someone in it",
            description: "How the self-designed degree works, what a depth study means, and the case for and against choosing it.",
            published: "2026-08-20",
          }} />


    </PostLayout>
  );
}
