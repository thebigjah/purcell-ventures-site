import type { ReactNode } from "react";
import { PageHero, Section, Figures, Rows, Tiers, Faq, Button, Note, Prose } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import WaitlistForm from "../WaitlistForm";

// THE COLLEGE APPLICATION PLAYBOOK, rebuilt on the page kit 26 Oct 2026.
//
// - This is the one page on the site allowed to print the scholarship total ($530,384).
// - The pay-in-full / payment-plan toggle is gone: each tier now shows both prices at
//   once, which is one less tap on a phone and hides nothing.
// - Every enroll button pointed at #waitlist while the Lemon Squeezy account is not live.
//   When it is, swap the tier buttons to the checkout links.

type Lesson = { title: string; duration: string; format: string };
type Module = { title: string; totalMin: number; lessons: Lesson[] };

const MODULES: Module[] = [
  {
    title: "How admissions works", totalMin: 20,
    lessons: [
      { title: "How the admissions system works", duration: "12 min", format: "Camera" },
      { title: "The timeline from 9th grade to senior fall", duration: "8 min", format: "Screen share" },
    ],
  },
  {
    title: "Building your school list", totalMin: 35,
    lessons: [
      { title: "How I found 98 schools: a live spreadsheet walkthrough", duration: "14 min", format: "Screen share" },
      { title: "Reach, match and safety schools by the numbers", duration: "10 min", format: "Camera" },
      { title: "Hunting for scholarships before you apply", duration: "11 min", format: "Camera and screen" },
    ],
  },
  {
    title: "Your application foundation", totalMin: 24,
    lessons: [
      { title: "Writing the activities list", duration: "9 min", format: "Camera" },
      { title: "Honors, awards and where to find more", duration: "8 min", format: "Camera" },
      { title: "A strategy for recommendation letters", duration: "7 min", format: "Camera" },
    ],
  },
  {
    title: "The essays", totalMin: 51,
    lessons: [
      { title: "What admissions readers look for in a personal statement", duration: "13 min", format: "Camera" },
      { title: "Writing your essay live", duration: "18 min", format: "Screen share" },
      { title: "Writing many supplemental essays efficiently", duration: "12 min", format: "Camera and screen" },
      { title: "Getting feedback and revising", duration: "8 min", format: "Camera" },
    ],
  },
  {
    title: "Financial aid and scholarships", totalMin: 41,
    lessons: [
      { title: "The FAFSA and the CSS Profile explained", duration: "15 min", format: "Screen share" },
      { title: "My scholarship search process", duration: "16 min", format: "Screen share" },
      { title: "Negotiating your award package", duration: "10 min", format: "Camera" },
    ],
  },
  {
    title: "The final stretch", totalMin: 20,
    lessons: [
      { title: "Early action and early decision: when to commit early", duration: "11 min", format: "Camera" },
      { title: "Comparing offers and making the decision", duration: "9 min", format: "Camera" },
    ],
  },
];

const JOIN = <p style={{ marginTop: 18 }}><Button href="#waitlist" ghost>Join the waitlist</Button></p>;

const TIERS = [
  {
    name: "Self-paced",
    price: "$297, or 3 payments of $109",
    items: [
      "All 6 modules and 17 lessons",
      "Camera lessons, screen shares and written notes",
      "My school list spreadsheet as a template",
      "An essay brainstorm worksheet",
      "A scholarship tracker template",
      "Every lesson as it is released, and access for life",
    ],
    children: JOIN,
  },
  {
    name: "Coaching track",
    price: "$997, or 3 payments of $349",
    items: [
      "Everything in Self-paced",
      "Three monthly group Q&A sessions with me",
      "Recordings of every session",
      "Priority essay feedback in the group calls",
      "Access to the cohort community",
    ],
    children: JOIN,
  },
  {
    name: "One-on-one intensive",
    price: "$2,500, with payment plans available",
    items: [
      "Everything in the Coaching track",
      "Three hours one-on-one with me",
      "A review of your personal statement, with feedback",
      "A school list strategy session",
      "Preparation for your financial aid negotiation",
      "Email me directly during application season",
    ],
    children: JOIN,
  },
];

const FAQS: { q: ReactNode; a: ReactNode }[] = [
  {
    q: "Is this for high school students or parents?",
    a: "Both. I wrote it so a student can follow it alone, and parents can use it too, especially the financial aid and scholarship modules.",
  },
  {
    q: "I am already a junior or senior. Is it too late?",
    a: "No. The essay, financial aid and scholarship modules apply at any point in the timeline. The modules on building a list still help if you have not finalized your schools.",
  },
  {
    q: "You are nineteen. Why take college advice from you?",
    a: "I went through it in the last two years. I researched 98 schools and got 34 acceptances and $530,384 a year in scholarship offers, and I wrote down what worked and what failed as I went. A counselor has more years of experience. I have a recent, documented process.",
  },
  {
    q: "Does it cover scholarships, or only admissions?",
    a: "Both. Module 5 covers the FAFSA, the CSS Profile and the scholarship search I used to find and apply for the offers that added up to $530,384 a year.",
  },
  {
    q: "How does the access code work?",
    a: "After you buy, Lemon Squeezy emails you a confirmation with a unique access code. You enter it once on the course page and your browser remembers it. You need no login or account.",
  },
  {
    q: "How long do I have access?",
    a: "For life. The course stays on this site as long as Purcell Ventures exists, and you get every update: new lessons, revised templates and changes based on student feedback.",
  },
  {
    q: "How do the Coaching track and the one-on-one intensive differ?",
    a: "The Coaching track puts you in monthly group calls where I answer your questions live. The one-on-one intensive is private hours with me: we review your personal statement, build your school list strategy together and prepare your financial aid negotiation.",
  },
  {
    q: "Can I upgrade later?",
    a: "Yes. If you start with Self-paced and want coaching, email me and I will credit what you paid toward the upgrade.",
  },
];

export default function CollegeAppsPage() {
  return (
    <main>
      <PageHero
        planet="courses"
        kicker="Course: The College Application Playbook"
        title="34 acceptances from 98 schools, and $530,384 a year in scholarship offers."
        lede="I am Elijah Purcell. I am 19 and went through college applications in the last two years. This course teaches what I learned, in the order I would have wanted it."
        meta="Waitlist open. I am still recording the course."
        actions={<>
          <Button href="#waitlist">Join the waitlist</Button>
          <Button href="#curriculum" ghost>See what is inside</Button>
        </>}
      />

      <Section title="The numbers behind it">
        <Figures
          items={[
            ["34", "Acceptances"],
            ["$530,384", "Scholarship offers a year"],
            ["98", "Schools researched"],
            ["17", "Lessons"],
          ]}
        />
      </Section>

      <Section title="Who it is for" intro="Four groups get the most from this course.">
        <Rows
          items={[
            { name: "High school students, 9th to 12th grade", line: "Whether you are starting to think about college or finalizing your list in senior year, the course covers your stage." },
            { name: "Parents of applicants", line: "Especially when scholarship money is the goal. Two modules cover financial aid and scholarships." },
            { name: "First-generation students", line: "No one in your family has applied to college before. The course starts at the beginning: applications, financial aid and choosing schools." },
            { name: "Students who were turned down", line: "Waitlisted, deferred or rejected by your top choice last cycle. The course covers what affects admissions decisions." },
          ]}
        />
      </Section>

      <Section
        id="curriculum"
        title="Six modules, 17 lessons"
        intro="Camera lessons, screen shares of my process and written notes for every lesson. Planned length: 3 hours of video."
      >
        <Faq
          items={MODULES.map((m, i) => ({
            q: `Module ${i + 1}: ${m.title}, ${m.lessons.length} lessons, ${m.totalMin} min`,
            a: (
              <Prose>
                <ol>
                  {m.lessons.map((l) => (
                    <li key={l.title}>
                      {l.title} <span className="ui-muted ui-small">({l.format}, {l.duration})</span>
                    </li>
                  ))}
                </ol>
              </Prose>
            ),
          }))}
        />
      </Section>

      <Section title="What the course includes">
        <Rows
          items={[
            { name: "Recent experience", line: "I went through admissions in the last two years. Every lesson is based on what I did." },
            { name: "My numbers", line: "34 acceptances and $530,384 a year in scholarship offers. The course shows the spreadsheet, the emails and the timelines." },
            { name: "The process on screen", line: "Screen shares of the tools I used, the templates I built and step-by-step walkthroughs of each major task." },
          ]}
        />
      </Section>

      <Section
        id="pricing"
        title="Three ways to enroll"
        intro="The course opens when recording is complete. Waitlist members get the early-access price."
      >
        <Tiers tiers={TIERS} />
        <div style={{ marginTop: 28 }}>
          <Note>Prices are in US dollars. Lemon Squeezy processes payments, and the access code arrives by email within 5 minutes of purchase.</Note>
        </div>
      </Section>

      <Section
        id="waitlist"
        title="The waitlist"
        intro="Waitlist members get the early-access price and hear first when the course opens. I send one email when enrollment opens."
      >
        <WaitlistForm course="college-apps" />
        <p className="ui-muted" style={{ marginTop: 20 }}>
          The course is not finished. Ask me and I will send the material I have so far:{" "}
          <a className="ui-link" href={`mailto:${CONTACT.email}?subject=College%20Application%20Playbook`}>{CONTACT.email}</a>.
        </p>
      </Section>

      <Section title="Questions">
        <Faq items={FAQS} />
        <p className="ui-muted" style={{ marginTop: 28 }}>
          Questions this page does not answer go to{" "}
          <a className="ui-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. I reply within one business day.
        </p>
      </Section>
    </main>
  );
}
