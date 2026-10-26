import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import { QA } from "./layout";

// Rebuilt on the page kit 26 Oct 2026 as a single readable column (PostLayout), since
// the page is one long answer to one question. The what-it-costs paragraphs now come
// before the reasons to hire locally, because that is what a business owner reads for.

export default function AiConsultantTuscaloosa() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Consulting", href: "/consulting" },
        { name: "AI Consultant in Tuscaloosa", href: "/ai-consultant-tuscaloosa" },
      ]} />}
      kicker="Tuscaloosa, Alabama"
      title="AI consultant in Tuscaloosa"
      lede="Websites, custom software and AI automation for Tuscaloosa businesses, built by one person who lives here. The first conversation is free."
      meta="Student websites $500, with optional upkeep at $25 a month. Software and automation quoted per project."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC and an autonomous AI agent
        systems engineer. I live in Tuscaloosa, I study psychology and data science in the
        University of Alabama Honors College, and I build websites, custom software and AI
        automation for businesses here.
      </p>

      <p>
        Most people who reach this page are asking one of two questions. They want something
        built and are trying to work out whether AI is involved, or somebody has told them they
        need AI and they want to know whether that is true.
      </p>

      <h2>What I do and what it costs</h2>

      <p>I do three kinds of work, listed in the order people most often ask for them.</p>

      <p>
        <strong>Websites.</strong> Built, hosted and maintained. For University of Alabama
        students and student-run businesses the price is <strong>$500</strong>, with an
        optional <strong>$25 a month</strong> to keep it current. I charge students less
        because their budgets are small.
      </p>

      <p>
        <strong>Custom software.</strong> Marketplaces, data pipelines, internal tools, and the
        compliance and review systems behind them. I quote each project after a free
        conversation.
      </p>

      <p>
        <strong>AI automation.</strong> Replacing a repeated manual task with something that
        runs on a schedule, or adding an AI feature to software you already have. This is also
        where I tell you not to bother, when that is the right answer.
      </p>

      <h2>Why hire someone local</h2>

      <p>
        You can hire an agency anywhere. The reason to hire someone in Tuscaloosa is that you
        can sit across a table from them, and the person you meet is the person who writes the
        code. Purcell Ventures is one operator.
      </p>

      <p>
        COSMIC, a station of 57 AI agents in 17 rooms that I built, does proposals, site
        audits, security checks, research and outreach. The agents are software, and the <Link href="/team">team page</Link> says
        so in its first sentence. A human does the building and a human answers your email.
      </p>

      <h2>Work you can check today</h2>

      <p>
        <a href="https://ua-today.vercel.app" target="_blank" rel="noopener noreferrer">UA Today</a>{" "}
        is a campus events site I built for students here. It pulls events from six sources:
        official University events, student organizations, ministries and athletics. It is free and needs no account. The
        University has no part in it, and the masthead says so.
      </p>

      <p>
        <Link href="/digital/tools">26 free AI tools for small businesses</Link> and{" "}
        <Link href="/tools">26 free single-file tools</Link> are live on the open web, each one
        built for a single problem. The <Link href="/portfolio">portfolio</Link> has client
        work, and the <Link href="/case-studies">case studies</Link> explain what was hard
        about a few of them.
      </p>

      <h2>When I am the wrong fit</h2>

      <p>
        I am nineteen and this is a one-person company. If you need a team of twelve, a signed
        enterprise MSA, and someone on call at three in the morning, I am the wrong person for
        the job and I will say so on the first call.
      </p>

      <p>
        If a language model cannot solve your problem, I will say so. If a chat box is all your
        problem needs, it is cheap and I will tell you how to set it up yourself.
      </p>

      <h2>Common questions</h2>

      {QA.map(([q, a]) => (
        <div key={q}>
          <h3>{q}</h3>
          <p style={{ marginTop: 6 }}>{a}</p>
        </div>
      ))}

      <h2>Getting in touch</h2>

      <p>
        Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call{" "}
        <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a> and tell me what you are trying
        to do. The first conversation is free, and I reply within one business day.
      </p>

      <p>
        More on the consulting work is on <Link href="/consulting">the consulting page</Link>,
        more about me on <Link href="/about">the about page</Link>, and the short factual
        version at <Link href="/who">who is Elijah Purcell</Link>.
      </p>
    </PostLayout>
  );
}
