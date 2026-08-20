import { QA } from "./layout";
import Breadcrumbs from "@/app/components/Breadcrumbs";

// Written in the THIRD PERSON on purpose. A search engine can lift "Elijah Purcell is the
// founder of Purcell Ventures LLC" out of a page and present it as a fact about a named
// entity. It cannot do that with "I'm 19 years old," which is what the About page says,
// which is why the About page has never answered this query.
//
// Every claim here is checkable: the LLC control number is a Georgia state filing, the
// university and class year are enrolment facts, the Mercor sentence is the exact wording
// their agreement permits. Nothing on this page is a superlative, because a superlative is
// the one kind of sentence that makes the rest look unreliable.

const FACTS: [string, string][] = [
  ["Full name", "Elijah Brent Purcell"],
  ["Born", "August 2007"],
  ["Founder of", "Purcell Ventures LLC, Georgia, control number 25075361, formed 8 April 2025"],
  ["University", "University of Alabama Honors College, Tuscaloosa, Class of 2030"],
  ["Studying", "Psychology and data science, pre-med track toward psychiatry"],
  ["Also", "Independent contractor with Mercor Intelligence"],
  ["Based", "Tuscaloosa, Alabama"],
];

const DATED = [
  ["2026", "Founded and operates a fifteen-agent AI workforce that runs proposals, audits, compliance and outreach for Purcell Ventures."],
  ["2026", "Built UA Today, a campus events service aggregating six sources, used by University of Alabama students."],
  ["2026", "Enrolled at the University of Alabama Honors College to study psychology and data science."],
  ["2025", "Founded Purcell Ventures LLC in Georgia at seventeen."],
  ["2024", "Christian Character Award, Grove Christian School."],
  ["2023", "Steadfast Award, Grove Christian School."],
];

export default function WhoPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Who is Elijah Purcell", href: "/who" },
      ]} />
      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
        Who is Elijah Purcell?
      </h1>

      <div className="mt-8 flex gap-6">
        <img
          src="/brand/elijah.jpg"
          alt="Elijah Purcell, founder of Purcell Ventures LLC and University of Alabama student"
          width={128}
          height={128}
          className="h-32 w-32 shrink-0 object-cover"
          style={{ objectPosition: "50% 20%" }}
        />
        <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
          <strong>Elijah Purcell</strong> is the founder of Purcell Ventures LLC, a Georgia
          software company that builds websites and software for local businesses, and a
          psychology and data science student at the University of Alabama Honors College,
          Class of 2030, on a pre-med track toward psychiatry. He founded the company at
          seventeen and builds and operates the autonomous AI agent systems that run it.
        </p>
      </div>

      <h2 className="mt-14 border-b border-neutral-300 pb-2 text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 dark:border-neutral-700">
        At a glance
      </h2>
      <dl className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-[auto_1fr]">
        {FACTS.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-sm font-semibold text-neutral-500">{k}</dt>
            <dd className="text-sm">{v}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-14 border-b border-neutral-300 pb-2 text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 dark:border-neutral-700">
        Dated record
      </h2>
      {/* Every entry carries its year in the visible sentence, not just in metadata. An
          undated 2023 award reads as a present-tense fact to both a person skimming and
          an AI summarising, and that is how a school award becomes a current credential. */}
      <ul className="mt-5 space-y-3">
        {DATED.map(([year, what]) => (
          <li key={what} className="flex gap-5 text-sm">
            <span className="w-12 shrink-0 font-mono font-semibold text-neutral-500">
              {year}
            </span>
            <span>{what}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-14 border-b border-neutral-300 pb-2 text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 dark:border-neutral-700">
        Common questions
      </h2>
      <div className="mt-5 space-y-7">
        {QA.map(([q, a]) => (
          <div key={q}>
            <h3 className="font-semibold">{q}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {a}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14 border-t border-neutral-200 pt-6 text-sm text-neutral-500 dark:border-neutral-800">
        <p>
          Contact: <a href="tel:+12054627839" className="underline">(205) 462-7839</a>{" "}
          or <a href="mailto:elijah@purcell-ventures.com" className="underline">elijah@purcell-ventures.com</a>.
          Elsewhere:{" "}
          <a href="https://www.linkedin.com/in/theelijahpurcell" className="underline">LinkedIn</a>,{" "}
          <a href="https://github.com/thebigjah" className="underline">GitHub</a>,{" "}
          <a href="https://www.instagram.com/elijah_the_tall/" className="underline">Instagram</a>.
        </p>
        <p className="mt-3">Last reviewed 20 August 2026.</p>
      </div>
    </main>
  );
}
