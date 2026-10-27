import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import { QA } from "./layout";

// Rebuilt on the page kit 26 Oct 2026 as a guide in PostLayout. Every course code and
// credit figure was read off catalog.ua.edu on 20 Aug 2026 and is unchanged.

const CORE: [string, string, string][] = [
  ["CS 265", "Intro to AI and Data Science", "The entry point"],
  ["CS 465", "Artificial Intelligence", ""],
  ["CS 483", "Computational Foundations of Machine Learning", ""],
  ["CS 423", "Python for Big Data", ""],
  ["CS 470", "Computer Algorithms", ""],
  ["CS 301", "Database Management Systems", ""],
  ["CS 201", "Data Structures and Algorithms", ""],
  ["CS 247", "Cyber Law and Ethics", ""],
  ["CS 495", "Capstone Computing, AI section", ""],
  ["400-level", "Four AI electives, twelve hours", "CS 451, 452, 455, 456, 460, 461, 463, 464, 466, 481, 484"],
];

export default function AiAtAlabama() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "Studying AI at Alabama", href: "/ai-at-alabama" },
      ]} />}
      kicker="Guide"
      title="Studying AI at the University of Alabama"
      meta="20 August 2026. Checked against catalog.ua.edu."
    >
      <p>
        Alabama now has an artificial intelligence degree. The catalog lists the requirements and says nothing about what to do with them, and if you are not in the College of Engineering it is not clear the degree applies to you at all. In July I looked for a plain explanation of it and could not find one.
      </p>

      <h2>What the AI degree requires</h2>

      <p>
        The <strong>Bachelor of Science in Artificial Intelligence</strong> runs through the College of Engineering, in the Department of Computer Science. It is 121 credit hours, with 52 in the major and 47 in ancillary mathematics, statistics and science.
      </p>

      <p>The AI core, by course code:</p>

      <table>
        <tbody>
          {CORE.map(([code, name, note]) => (
            <tr key={code}>
              <th scope="row" style={{ whiteSpace: "nowrap" }}>{code}</th>
              <td>
                {name}
                {note && <span className="ui-muted ui-small" style={{ display: "block" }}>{note}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        The degree requires this mathematics: Calculus I through III, MATH 237 Linear Algebra, MATH 301 Discrete Mathematics, MATH 355 Theory of Probability, and GES 255 Engineering Statistics I. It also requires eight hours of natural science and three of cognitive science or neuroscience.
      </p>

      <p>
        One rule limits your plan: <strong>an AI major cannot also major in Computer Science.</strong> The catalog states this directly, since the two degrees overlap too heavily to count twice.
      </p>

      <h2>Students outside engineering</h2>

      <p>
        The catalog does not cover students outside engineering, and most students asking about AI are in that group. There is no single second path, but there are three options:
      </p>

      <ul>
        <li>
          <strong>New College.</strong> You design the degree. A psychology and data science combination reaches AI from the behavioral side without entering engineering. I took that route, and it fits if your interest in AI is about human behavior.
        </li>
        <li>
          <strong>CS 265 as an elective.</strong> Intro to AI and Data Science is the usual first course, subject to prerequisites.
        </li>
        <li>
          <strong>The Informatics minor</strong> in Communication and Information Sciences, which touches data work without the engineering mathematics sequence.
        </li>
      </ul>

      <h2>Experience outside the degree</h2>

      <p>
        I run production AI agent systems. COSMIC, a station of 57 named agents in 17 rooms, does proposals, site audits, security checks, research and outreach for my company. The first agents were running before I had taken an AI course.
      </p>

      <p>
        The degree gives you the mathematics, the formal grounding and the credential, and I value the probability sequence highly. It does not give you the experience of running software other people depend on and fixing it when it breaks.
      </p>

      <p>
        Any student here can get that experience now, for free, by building something another person uses and keeping it running.
      </p>

      <h2>Common questions</h2>

      {QA.map(([q, a]) => (
        <div key={q}>
          <h3>{q}</h3>
          <p>{a}</p>
        </div>
      ))}

      <h2>Corrections</h2>

      <p>
        I read every course code and credit figure above off{" "}
        <a href="https://catalog.ua.edu/undergraduate/engineering/computer-science/artificial-intelligence-bs/">catalog.ua.edu</a>{" "}
        on 20 August 2026. If the curriculum has changed or something here is wrong, tell me and I will fix it the same day and note what changed: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
      </p>

      <p>
        If you are a UA student building something and want a second pair of eyes on it, I will look at it for free. Campus events for this week are on{" "}
        <a href="https://ua-today.vercel.app">UA Today</a>, which I also built.
      </p>

      <PostByline post={{
        slug: "/ai-at-alabama",
        title: "Studying AI at the University of Alabama",
        description: "The new AI BS, its exact requirements, why the CS double major is blocked, and the routes for students who are not in engineering.",
        published: "2026-08-20",
      }} />
    </PostLayout>
  );
}
