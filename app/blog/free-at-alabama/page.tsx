import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import PostByline from "@/app/components/PostByline";

// SOURCED, NOT REMEMBERED.
//
// Every service named here was checked against a ua.edu page on 20 August 2026, and where
// a source did not say a thing was free, this page does not say it either. That
// distinction is the whole value: a list of "free stuff" that quietly includes things
// which are not free is worse than no list, because the reader finds out at the counter.

export const metadata = {
  alternates: { canonical: "/blog/free-at-alabama" },
  title: { absolute: "What is already free at the University of Alabama" },
  description:
    "Services a University of Alabama student has already paid for through tuition and fees, with the exact office names: University Recreation, the Writing Center, the Capstone Center for Student Success, the Career Center, CrimsonRide and more, checked against ua.edu.",
};


const ROWS: [string, string][] = [
  ["University Recreation", "Membership is covered for every enrolled student registered for at least one credit hour. That covers the Student Recreation Center, the Robert E. Witt Activity Center, the Aquatic Center, the Outdoor Pool Complex and the Tennis Court Complex."],
  ["The Writing Center", "Described on ua.edu as a free service open to all students. Consultations run fifty minutes, by appointment or drop-in, with online appointments and workshops as well. It is for any writing, not only English coursework."],
  ["Capstone Center for Student Success", "Russell Hall, second and third floors. (205) 348-7011. It oversees academic support, and it is the place to start if you do not know which office you need."],
  ["Mathematics Technology and Learning Center", "Tutoring for introductory mathematics courses, homework help and self-paced support."],
  ["The Speaking Studio", "Help with public speaking, presentations and oral communication."],
  ["The Career Center", "Major selection, career planning, job search strategy, and professional school planning. Visit in your first year."],
  ["University Libraries", "Ten libraries and more than three million print and electronic resources. The electronic resources include database access you would otherwise pay for outside a university."],
  ["The Cube", "A 3D printing and production lab in the College of Engineering."],
  ["ENGenuity Lab", "Tutoring, mentoring and career preparation for engineering students."],
  ["History Peer Mentor Program", "Peer tutoring for the history survey courses."],
  ["The Camellia Center", "Free, confidential and voluntary counseling and advocacy for members of the UA community."],
  ["CrimsonRide", "The campus bus system, serving students, staff, faculty and the public on and around campus."],
];

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: "What is already free at the University of Alabama", href: "/blog/free-at-alabama" },
      ]} />}
      kicker="Guide"
      title="What you have already paid for at Alabama"
      meta="20 August 2026, 5 minute read, checked against ua.edu"
    >
      <p>
        Tuition and fees already cover at least 12 services the university runs for
        students. I marked a service as free or covered only where ua.edu says it is.
      </p>

      <p>
        This is my first semester here, so I am writing as I find things. I checked
        every service against ua.edu pages on 20 August 2026. The two most useful starting points are{" "}
        <a href="https://success.ua.edu/academic-resources-at-ua" rel="noopener">the Capstone Center for Student Success</a>{" "}
        and{" "}
        <a href="https://writingcenter.ua.edu/" rel="noopener">the Writing Center</a>.
      </p>

      <table>
        <thead>
          <tr><th>Service</th><th>What it is</th></tr>
        </thead>
        <tbody>
          {ROWS.map(([a, b]) => (
            <tr key={a}>
              <td><strong>{a}</strong></td>
              <td>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>The three I would use first</h2>

      <p>
        <strong>University Recreation</strong>, because it is covered and because the
        habit is easier to start in the first two weeks than in the eighth.
      </p>

      <p>
        <strong>The Writing Center</strong>, because a fifty-minute session gets a trained
        reader to go through your argument closely at no cost. Bring a draft.
      </p>

      <p>
        <strong>The Career Center</strong>, in your first year, even though many students
        wait until their last year.
      </p>

      <h2>What I could not confirm</h2>

      <p>
        Software licences, athletics ticket allocations, museum admission and health
        centre pricing all vary by year, by student status and sometimes by college. I
        found conflicting or undated information for each, so I left them out until I
        can verify a number.
      </p>

      <p>
        If you know the current answer for any of them and can point at the page,{" "}
        <a href="mailto:elijah@purcell-ventures.com">tell me</a> and I will
        add it with a link and say who corrected it.
      </p>

      <h2>Checking before you pay</h2>

      <p>
        Before you pay for something as a student, spend five minutes checking whether
        the university already provides it. Tutoring, editing, printing, fitness,
        counselling, career advice, research databases and transport are things students
        often pay for when the university already offers them.
      </p>

      <p>
        Fees and policies change every year, so treat this list as a starting point and
        confirm anything you are relying on. I checked it on
        20 August 2026.
      </p>

      <h2>Related</h2>

      <p>
        Campus events for this week are on{" "}
        <a href="https://ua-today.vercel.app">UA Today</a>, which I built and
        which combines six sources. If you are trying to work out how
        to study AI here, that is{" "}
        <Link href="/ai-at-alabama">a separate guide</Link>.
      </p>

<PostByline post={{
            slug: "free-at-alabama",
            title: "What you have already paid for at Alabama",
            description: "Services a University of Alabama student has already paid for through tuition and fees, with the exact office names, checked against ua.edu.",
            published: "2026-08-20",
          }} />


    </PostLayout>
  );
}
