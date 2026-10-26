import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import { QA } from "./layout";
import Breadcrumbs from "@/app/components/Breadcrumbs";

const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };
const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "26px", fontWeight: 600, lineHeight: 1.2, margin: "44px 0 14px", color: "var(--color-warm-text)" } as const;

export default function AiAtAlabama() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>All posts</Link>

      <Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: "Studying AI at Alabama", href: "/ai-at-alabama" },
      ]} />
        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Guide, August 20, 2026. Checked against catalog.ua.edu.</div>
          <h1>
            Studying AI at the University of <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Alabama</em>
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            Alabama now has an artificial intelligence degree. The catalog lists the
            requirements and tells you nothing about what to do with them, and if you are
            not in the College of Engineering it does not obviously apply to you at all.
            This is the page I wanted in July and could not find.
          </p>

          <h2 style={H2}>What the AI degree requires</h2>

          <p>
            The <strong>Bachelor of Science in Artificial Intelligence</strong> runs through
            the College of Engineering, in the Department of Computer Science. It is 121 credit
            hours, with 52 in the major and 47 in ancillary mathematics, statistics and science.
          </p>

          <p>The AI core, by course code:</p>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", margin: "18px 0" }}>
              <tbody>
                {[
                  ["CS 265", "Intro to AI and Data Science", "the entry point"],
                  ["CS 465", "Artificial Intelligence", ""],
                  ["CS 483", "Computational Foundations of Machine Learning", ""],
                  ["CS 423", "Python for Big Data", ""],
                  ["CS 470", "Computer Algorithms", ""],
                  ["CS 301", "Database Management Systems", ""],
                  ["CS 201", "Data Structures and Algorithms", ""],
                  ["CS 247", "Cyber Law and Ethics", ""],
                  ["CS 495", "Capstone Computing, AI section", ""],
                  ["400-level", "Four AI electives, twelve hours", "CS 451, 452, 455, 456, 460, 461, 463, 464, 466, 481, 484"],
                ].map(([code, name, note]) => (
                  <tr key={code}>
                    <td style={{ padding: "7px 14px 7px 0", borderBottom: "1px solid rgba(212,175,55,0.12)", whiteSpace: "nowrap", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", color: "var(--color-warm-accent)" }}>{code}</td>
                    <td style={{ padding: "7px 0", borderBottom: "1px solid rgba(212,175,55,0.12)" }}>
                      {name}
                      {note && <span style={{ display: "block", fontSize: "13px", color: "var(--color-warm-text-muted)" }}>{note}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            The degree requires this mathematics:
            Calculus I through III, MATH 237 Linear Algebra, MATH 301 Discrete Mathematics,
            MATH 355 Theory of Probability, and GES 255 Engineering Statistics I. It also requires eight
            hours of natural science and three of cognitive science or neuroscience.
          </p>

          <p>
            One rule limits your plan: <strong>an AI major cannot
            also major in Computer Science.</strong> The catalog says so outright. The two
            overlap too heavily to count twice.
          </p>

          <h2 style={H2}>What if you are not in engineering</h2>

          <p>
            The catalog does not cover this case, and most students asking the question are in it.
          </p>

          <p>
            There is no clean second path. These are the options:
          </p>

          <ul style={{ paddingLeft: "1.1rem" }}>
            <li style={{ marginBottom: "10px" }}>
              <strong>New College.</strong> You design the degree. A psychology and data
              science combination reaches AI from the behavioral side without entering
              engineering, which is the route I took, and it is the right one only if the
              question you care about is about people rather than about systems.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>CS 265 as an elective.</strong> Intro to AI and Data Science is the
              usual first door, subject to prerequisites.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>The Informatics minor</strong> in Communication and Information
              Sciences, which touches data work without the engineering mathematics
              sequence.
            </li>
          </ul>

          <h2 style={H2}>What the catalog leaves out</h2>

          <p>
            I run production AI agent systems. Fifteen named agents handle proposals,
            audits, compliance and outreach for my company on a schedule. They were
            running before I had taken an AI course.
          </p>

          <p>
            The degree gives you the mathematics, the formal grounding and the credential,
            and I value the probability sequence highly. It does not give you the experience of running
            something other people depend on, and finding out which of your assumptions was
            wrong at seven in the morning when it breaks.
          </p>

          <p>
            Any student here can get that experience now, for free. If you build one thing
            that another person uses, you will learn how a deployed machine learning system fails,
            which a semester does not cover.
          </p>

          <h2 style={H2}>Common questions</h2>

          <div style={{ marginTop: "18px" }}>
            {QA.map(([q, a]) => (
              <div key={q} style={{ marginBottom: "24px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 6px" }}>{q}</h3>
                <p style={{ margin: 0, fontSize: "15px", color: "var(--color-warm-text-muted)" }}>{a}</p>
              </div>
            ))}
          </div>

          <h2 style={H2}>Corrections</h2>

          <p>
            Every course code and credit figure above was read off{" "}
            <a href="https://catalog.ua.edu/undergraduate/engineering/computer-science/artificial-intelligence-bs/" style={link}>catalog.ua.edu</a>{" "}
            on 20 August 2026. Curricula change. If something here is wrong, tell me and I
            will fix it the same day and say what changed:{" "}
            <a href="mailto:elijah@purcell-ventures.com" style={link}>elijah@purcell-ventures.com</a>.
          </p>

          <p>
            If you are a UA student trying to build something and want a second pair of
            eyes on it, that offer is free. Campus events and
            what is happening this week are on{" "}
            <a href="https://ua-today.vercel.app" style={link}>UA Today</a>, which I also
            built.
          </p>

          <PostByline post={{
            slug: "/ai-at-alabama",
            title: "Studying AI at the University of Alabama",
            description: "The new AI BS, its exact requirements, why the CS double major is blocked, and the routes for students who are not in engineering.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
