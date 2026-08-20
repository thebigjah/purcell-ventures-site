import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata = {
  alternates: { canonical: "/blog/new-college-alabama" },
  title: "New College at Alabama, explained by someone in it | Elijah Purcell",
  description:
    "What New College at the University of Alabama actually is: how the self-designed degree works, what a depth study means, the seminars, the Levitetz Leadership Program, and the honest case for and against choosing it.",
};

const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "25px", fontWeight: 600, lineHeight: 1.2, margin: "42px 0 10px" } as const;
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
          { name: "New College at Alabama, explained by someone in it", href: "/blog/new-college-alabama" },
        ]} />
        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Guide · August 20, 2026 · Written in week one</div>
          <h1>
            New College at Alabama, explained by{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>someone in it</em>
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            Every explanation of New College I read before applying was either a brochure or
            a forum post from 2014. Here is the plain version, written in my first week, by
            someone who chose it and can tell you what the trade actually is.
          </p>

          <h2 style={H2}>What it is</h2>

          <p>
            New College is an interdisciplinary program inside the Barefield College of Arts
            and Sciences at the University of Alabama. It has existed since 1971, which
            surprises people who assume it is a recent experiment.
          </p>

          <p>
            The core of it: instead of choosing a major off a list, you design one. You work
            with an advisor to build a program of study around a question you care about,
            drawing courses from wherever they happen to live in the university.
          </p>

          <h2 style={H2}>The vocabulary you will hit immediately</h2>

          <p>
            <strong>Depth study.</strong> Your self-designed concentration. Existing examples
            include Socio-Legal Studies, Psycho-Social Sciences and Neuroscience, which gives
            you a sense of the range. Mine combines psychology and data science, aimed at
            psychiatry and at how AI can reduce the administrative load on mental health
            clinicians.
          </p>

          <p>
            <strong>Seminars.</strong> Described by the program as a key part of the
            experience. Readings, discussion, presentations, experiential learning and public
            service. Small, and the discussion is the assessment rather than a supplement
            to it.
          </p>

          <p>
            <strong>Independent study.</strong> You can build coursework around work you are
            already doing rather than adding it on top, which is the part that made the
            decision for me.
          </p>

          <p>
            <strong>Levitetz Leadership Program.</strong> Workshops, seed grants, internship
            opportunities, and the Levitetz Light Bulb Award for student research addressing
            real-world problems. Seed grants are the phrase to notice if you are building
            anything.
          </p>

          <h2 style={H2}>The honest case for it</h2>

          <p>
            If your actual question does not map onto a department, a traditional major makes
            you approximate. You pick the closest one and spend four years reading around the
            edge of the thing you meant.
          </p>

          <p>
            New College removes the approximation. If your interest sits between psychology
            and computer science, or between law and public health, you build the degree that
            asks your question directly rather than the nearest available one.
          </p>

          <p>
            It also rewards people who already do things. If you run something, write
            something or build something, that work can become the coursework instead of
            competing with it.
          </p>

          <h2 style={H2}>The honest case against it</h2>

          <p>
            <strong>Nobody knows what it is.</strong> "Psychology" is legible to a graduate
            admissions committee, a recruiter and your grandmother. "A self-designed depth
            study in psycho-social sciences" needs a sentence of explanation every single
            time, and you will give that sentence for the rest of your life.
          </p>

          <p>
            <strong>The structure is yours to supply.</strong> A traditional major is a
            sequence somebody already thought about. Here, the person deciding whether you
            take the hard course is you, and the failure mode is a transcript full of
            interesting courses that do not add up to anything.
          </p>

          <p>
            <strong>Prerequisite chains do not care about your design.</strong> If your
            question needs a 400-level course, it needs everything under it, and the
            mathematics sequence in particular is unmoved by how coherent your plan is.
          </p>

          <p>
            <strong>Some paths are structurally hostile to it.</strong> Pre-med works,
            because medical schools care about the prerequisites and the MCAT rather than the
            major's name. Anything with a licensure body or an accredited curriculum, check
            before you commit.
          </p>

          <h2 style={H2}>Who should actually pick it</h2>

          <p>
            Pick it if you can already say, in one sentence, the question your degree is
            for. Not the career. The question.
          </p>

          <p>
            Do not pick it because you cannot decide. It is the worst possible structure for
            indecision: it removes the guardrails at exactly the moment somebody undecided
            needs them most. A traditional major with a minor is a better tool for finding
            out what you like, and switching in later is easier than rescuing an incoherent
            transcript.
          </p>

          <h2 style={H2}>Practical</h2>

          <p>
            New College is reachable at (205) 348-4600 or ncfrndsk@ua.edu. It combines with
            the Honors College, which is what I am doing. Ask about the depth study proposal
            process early, because it shapes which courses are worth taking in your first
            year rather than your third.
          </p>

          <p>
            I will write this again at the end of the year, when I know whether I was right.
            If you are a New College student and I have got something wrong here,{" "}
            <a href="mailto:elijah@purcell-ventures.com" style={link}>tell me</a> and I will
            correct it and say who corrected it.
          </p>

          <p>
            Related: <Link href="/ai-at-alabama" style={link}>studying AI at Alabama</Link>{" "}
            and <Link href="/blog/free-at-alabama" style={link}>what you have already paid
            for</Link>.
          </p>

          <PostFaq qa={[
            ["What is New College at the University of Alabama?",
             "New College is an interdisciplinary program inside the Barefield College of Arts and Sciences at the University of Alabama, operating since 1971. Instead of choosing a major from a list, a student designs one with an advisor, drawing courses from across the university around a question rather than a department."],
            ["What is a depth study at New College?",
             "A depth study is the self-designed concentration at the centre of a New College degree. Existing examples include Socio-Legal Studies, Psycho-Social Sciences and Neuroscience, which gives a sense of the range."],
            ["Should I choose New College at Alabama?",
             "Choose it if you can already say in one sentence the question your degree is for. Do not choose it because you cannot decide: it removes the guardrails at exactly the moment an undecided student needs them most, and a traditional major with a minor is a better tool for finding out what you like. Also check any licensure or accreditation requirements in your field before committing."],
            ["What is the Levitetz Leadership Program?",
             "A New College program offering workshops, seed grants, internship opportunities and the Levitetz Light Bulb Award for student research addressing real-world problems."],
          ]} />

          <PostByline post={{
            slug: "new-college-alabama",
            title: "New College at Alabama, explained by someone in it",
            description: "How the self-designed degree works, what a depth study means, and the honest case for and against choosing it.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
