import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import Breadcrumbs from "@/app/components/Breadcrumbs";

// SOURCED, NOT REMEMBERED.
//
// Every service named here was checked against a ua.edu page on 20 August 2026, and where
// a source did not say a thing was free, this page does not say it either. That
// distinction is the whole value: a list of "free stuff" that quietly includes things
// which are not free is worse than no list, because the reader finds out at the counter.

export const metadata = {
  alternates: { canonical: "/blog/free-at-alabama" },
  title: "What is already free at the University of Alabama | Elijah Purcell",
  description:
    "Services a University of Alabama student has already paid for through tuition and fees, with the exact office names: University Recreation, the Writing Center, the Capstone Center for Student Success, the Career Center, CrimsonRide and more. Checked against ua.edu.",
};

const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "25px", fontWeight: 600, lineHeight: 1.2, margin: "42px 0 10px" } as const;
const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };
const td: React.CSSProperties = { padding: "10px 14px 10px 0", borderBottom: "1px solid rgba(212,175,55,0.12)", verticalAlign: "top" };
const th: React.CSSProperties = { ...td, fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", fontWeight: 700, borderBottom: "2px solid rgba(212,175,55,0.3)" };

const ROWS: [string, string][] = [
  ["University Recreation", "Membership is covered for every enrolled student registered for at least one credit hour. That covers the Student Recreation Center, the Robert E. Witt Activity Center, the Aquatic Center, the Outdoor Pool Complex and the Tennis Court Complex."],
  ["The Writing Center", "Described on ua.edu as a free service open to all students. Consultations run about fifty minutes, by appointment or drop-in, with online appointments and workshops as well. It is for any writing, not only English coursework."],
  ["Capstone Center for Student Success", "Russell Hall, second and third floors. (205) 348-7011. The umbrella for academic support, and the place to start if you do not know which office you need."],
  ["Mathematics Technology and Learning Center", "Tutoring for introductory mathematics courses, homework help and self-paced support. If you are in the calculus sequence this is the building you should already know."],
  ["The Speaking Studio", "Help with public speaking, presentations and oral communication. Almost nobody uses it, which is strange given how many courses are graded on a presentation."],
  ["The Career Center", "Major selection, career planning, job search strategy, and professional school planning. Worth visiting in your first year rather than your last."],
  ["University Libraries", "Ten libraries and more than three million print and electronic resources. The electronic half is the part students underuse: database access that costs real money outside a university."],
  ["The Cube", "A 3D printing and production lab in the College of Engineering."],
  ["ENGenuity Lab", "Tutoring, mentoring and career preparation for engineering students."],
  ["History Peer Mentor Program", "Peer tutoring for the history survey courses."],
  ["The Camellia Center", "Free, confidential and voluntary counseling and advocacy for members of the UA community."],
  ["CrimsonRide", "The campus bus system, serving students, staff, faculty and the public on and around campus."],
];

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: "What is already free at the University of Alabama", href: "/blog/free-at-alabama" },
        ]} />
        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Guide · August 20, 2026 · Checked against ua.edu</div>
          <h1>
            What you have{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>already paid for</em> at Alabama
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            Tuition and fees buy a long list of things nobody hands you a receipt for. 12 of them
            are below. Most students use two or three and graduate without finding out the
            rest existed.
          </p>

          <p>
            This is my first semester here, so I am writing it as I find things rather than
            from four years of knowing. Everything below was checked against a ua.edu page on
            20 August 2026, and where the university's own page did not say something was
            free, this page does not say it either. The two most useful starting points are{" "}
            <a href="https://success.ua.edu/academic-resources-at-ua" style={link} rel="noopener">the Capstone Center for Student Success</a>{" "}
            and{" "}
            <a href="https://writingcenter.ua.edu/" style={link} rel="noopener">the Writing Center</a>.
          </p>

          <div style={{ overflowX: "auto", margin: "26px 0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px" }}>
              <thead>
                <tr><th style={{ ...th, width: "34%" }}>Service</th><th style={th}>What it is</th></tr>
              </thead>
              <tbody>
                {ROWS.map(([a, b]) => (
                  <tr key={a}>
                    <td style={{ ...td, fontWeight: 700 }}>{a}</td>
                    <td style={td}>{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={H2}>The three worth using in week one</h2>

          <p>
            <strong>University Recreation</strong>, because it is genuinely covered and
            because the habit is easier to start in the first fortnight than in the eighth
            week.
          </p>

          <p>
            <strong>The Writing Center</strong>, and not because your writing is bad. Fifty
            minutes with someone who has to read your argument closely is the cheapest
            editing you will ever get, and it is free. Bring a draft, not a blank page.
          </p>

          <p>
            <strong>The Career Center</strong>, in your first year. Everyone goes in their
            last year, when the useful window has mostly closed.
          </p>

          <h2 style={H2}>What I could not confirm, and am therefore not claiming</h2>

          <p>
            Software licences, athletics ticket allocations, museum admission and health
            centre pricing all vary by year, by student status and sometimes by college. I
            found conflicting or undated information for each and I am not going to publish
            a number I cannot stand behind.
          </p>

          <p>
            If you know the current answer for any of them and can point at the page,{" "}
            <a href="mailto:elijah@purcell-ventures.com" style={link}>tell me</a> and I will
            add it with a link and say who corrected it.
          </p>

          <h2 style={H2}>The general rule</h2>

          <p>
            Before you pay for something as a student, spend five minutes checking whether
            the university already provides it. Tutoring, editing, printing, fitness,
            counselling, career advice, software, research databases and transport are all
            things students routinely buy that are frequently already covered.
          </p>

          <p>
            This list will go stale. Fees and policies change every year, so treat it as a
            starting point and confirm anything you are relying on. The date it was checked
            is at the top for exactly that reason.
          </p>

          <h2 style={H2}>Related</h2>

          <p>
            What is actually happening on campus this week is on{" "}
            <a href="https://ua-today.vercel.app" style={link}>UA Today</a>, which pulls six
            sources into one page and which I also built. If you are trying to work out how
            to study AI here, that is{" "}
            <Link href="/ai-at-alabama" style={link}>a separate guide</Link>.
          </p>

          <PostFaq qa={[
            ["Is the gym free for University of Alabama students?",
             "University Recreation membership is covered for every enrolled student registered for at least one credit hour, with no additional fee. That covers the Student Recreation Center, the Robert E. Witt Activity Center, the Aquatic Center, the Outdoor Pool Complex and the Tennis Court Complex."],
            ["Does the University of Alabama have free tutoring?",
             "Yes, through several offices. The Capstone Center for Student Success in Russell Hall is the umbrella, reachable at (205) 348-7011. The Mathematics Technology and Learning Center covers introductory maths courses, the Writing Center is described by the university as a free service open to all students, and the Speaking Studio covers presentations and oral communication."],
            ["Is the Writing Center at Alabama free?",
             "Yes. The University of Alabama Writing Center is described on ua.edu as a free service open to all students. Consultations run about fifty minutes and are available by appointment or drop-in, with online appointments and workshops as well. It is for any writing, not only English coursework."],
            ["What counseling is available to University of Alabama students?",
             "The Camellia Center provides free, confidential and voluntary counseling and advocacy services to members of the University of Alabama community."],
          ]} />

          <PostByline post={{
            slug: "free-at-alabama",
            title: "What you have already paid for at Alabama",
            description: "Services a University of Alabama student has already paid for through tuition and fees, with the exact office names, checked against ua.edu.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
