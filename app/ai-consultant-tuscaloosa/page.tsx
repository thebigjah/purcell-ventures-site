import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { QA } from "./layout";

const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };
const H2 = {
  fontFamily: "'Cinzel', Georgia, serif", fontSize: "26px", fontWeight: 600,
  lineHeight: 1.2, margin: "44px 0 14px", color: "var(--color-warm-text)",
} as const;

export default function AiConsultantTuscaloosa() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Consulting", href: "/consulting" },
          { name: "AI Consultant in Tuscaloosa", href: "/ai-consultant-tuscaloosa" },
        ]} />

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Tuscaloosa, Alabama</div>
          <h1>
            AI consultant in <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Tuscaloosa</em>
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            I am Elijah Purcell, founder and CEO of Purcell Ventures LLC and an autonomous AI
            agent systems engineer. I live in Tuscaloosa, I study psychology and data science
            at the University of Alabama Honors College, and I build websites, custom software
            and AI automation for businesses here.
          </p>

          <p>
            Most people who reach this page are asking one of two questions. Either they want
            something built and are trying to work out whether AI is involved, or somebody has
            told them they need AI and they are trying to work out whether that is true. Both
            are good questions. The second one gets an honest answer more often than the people
            selling AI would like.
          </p>

          <h2 style={H2}>What I actually do</h2>

          <p>
            Three kinds of work, in roughly the order people ask for them.
          </p>

          <p>
            <strong>Websites.</strong> Built, hosted, and maintained. For University of Alabama
            students and student-run businesses the price is <strong>$500</strong>, with an
            optional <strong>$25 a month</strong> to keep it current. That rate exists because
            student businesses are the ones who most need a real site and least often have the
            budget for one.
          </p>

          <p>
            <strong>Custom software.</strong> Marketplaces, data pipelines, internal tools, and
            the boring compliance and review systems that keep them honest. Quoted per project
            after a conversation, which is free.
          </p>

          <p>
            <strong>AI automation.</strong> Replacing a repeated manual task with something
            that runs on a schedule, or adding an AI feature to software that already exists.
            This is also where I will tell you not to bother, if that is the right answer.
          </p>

          <h2 style={H2}>Why hire someone local</h2>

          <p>
            You can hire an agency anywhere. The reason to hire someone in Tuscaloosa is that
            you can sit across a table from them, and that the person you meet is the person
            who writes the code. Purcell Ventures is one operator. There is no account manager,
            no handoff to a team you never meet, and no offshore subcontractor you were not
            told about.
          </p>

          <p>
            The work is supported by a fifteen-agent AI workforce I built, which handles
            proposals, audits, compliance and outreach on a schedule. That is software, not
            staff, and the{" "}
            <Link href="/team" style={link}>team page</Link> says so in its first sentence. A
            human does the building and a human answers your email.
          </p>

          <h2 style={H2}>Work you can check right now</h2>

          <p>
            Claims are cheap, so here are things you can open in another tab.
          </p>

          <p>
            <a href="https://ua-today.vercel.app" style={link} target="_blank" rel="noopener noreferrer">UA Today</a>{" "}
            is a campus events site I built for students here. It pulls from six sources and
            carries roughly a hundred events in any given week across official University
            events, student organizations, ministries and athletics. It is free, there is no
            account, and it is not affiliated with the University, which the masthead says
            plainly.
          </p>

          <p>
            <Link href="/tools" style={link}>Twenty-nine free tools</Link> are live on the open
            web, each one a small piece of software solving one problem. The{" "}
            <Link href="/portfolio" style={link}>portfolio</Link> has client work, and the{" "}
            <Link href="/case-studies" style={link}>case studies</Link> explain what was
            actually hard about a few of them.
          </p>

          <h2 style={H2}>What I am not</h2>

          <p>
            I am nineteen and this is a one-person company. If you need a team of twelve, a
            signed enterprise MSA, and someone on call at three in the morning, I am the wrong
            call and I will say so on the first phone call rather than the third invoice.
          </p>

          <p>
            I also will not tell you that a language model solves a problem it does not solve.
            A lot of what gets sold as AI consulting is a wrapper around a chat box. If that is
            what your problem needs, it is cheap and I will tell you how to do it yourself.
          </p>

          <h2 style={H2}>Common questions</h2>

          {QA.map(([q, a]) => (
            <div key={q} style={{ marginTop: "24px" }}>
              <p style={{ fontWeight: 600, marginBottom: "6px", color: "var(--color-warm-text)" }}>{q}</p>
              <p style={{ margin: 0 }}>{a}</p>
            </div>
          ))}

          <h2 style={H2}>Getting in touch</h2>

          <p>
            Email{" "}
            <a href="mailto:elijah@purcell-ventures.com" style={link}>elijah@purcell-ventures.com</a>{" "}
            and tell me what you are trying to do. Not what you think you need built, what you
            are trying to do. The first conversation is free and frequently ends with me saying
            the problem is smaller than you thought.
          </p>

          <p style={{ marginTop: "32px" }}>
            More on the consulting work at{" "}
            <Link href="/consulting" style={link}>the consulting page</Link>, more about me at{" "}
            <Link href="/about" style={link}>the about page</Link>, and the short factual
            version at <Link href="/who" style={link}>who is Elijah Purcell</Link>.
          </p>

        </article>
      </main>
    </div>
  );
}
