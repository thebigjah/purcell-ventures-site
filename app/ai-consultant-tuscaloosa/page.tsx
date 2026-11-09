import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import { QA } from "./layout";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";
import ServiceSchema from "@/app/components/ServiceSchema";

// Rebuilt on the page kit 26 Oct 2026 as a single readable column (PostLayout), since
// the page is one long answer to one question. The what-it-costs paragraphs now come
// before the reasons to hire locally, because that is what a business owner reads for.

export default function AiConsultantTuscaloosa() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Consulting", href: "/consulting" },
        { name: "AI consultant in Tuscaloosa", href: "/ai-consultant-tuscaloosa" },
      ]} />}
      kicker="Tuscaloosa, Alabama"
      title="AI consultant in Tuscaloosa"
      lede="AI systems, custom software and automation for Tuscaloosa businesses, built by one person who lives here. The first conversation is free."
      meta="Student websites $500, with optional upkeep at $25 a month. Software and automation quoted per project."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC and a psychology and data
        science student in New College and the Honors College at the University of Alabama. From Tuscaloosa, I build
        autonomous AI agent systems, AI automation, custom software and websites for
        businesses here.
      </p>

      <p>
        Most business owners who contact me have one of two questions. They want something
        built and are not sure whether it needs AI, or someone told them they need AI and they
        want to know if that is true.
      </p>

      <h2>What I do and what it costs</h2>

      <p>
        <strong>Websites.</strong> Built, hosted and maintained. For University of Alabama
        students and student-run businesses the price is $500, with an
        optional $25 a month to keep it updated.
      </p>

      <p>
        <strong>Custom software.</strong> Marketplaces, data pipelines, internal tools, and the
        compliance and review systems behind them. I quote each project after a free
        conversation.
      </p>

      <p>
        <strong>AI automation.</strong> Replacing a repeated manual task with something that
        runs on a schedule, or adding an AI feature to software you already have. If automation
        will not pay off for you, I will tell you that.
      </p>

      <h2>Working with someone local</h2>

      <p>
        If you hire someone in Tuscaloosa, you can meet them in person. Purcell Ventures is a
        one-person company, so the person you meet with is the person who writes the code.
      </p>

      <p>
        COSMIC, a station of 57 AI agents in 17 rooms that I built, handles proposals, site
        audits, security checks, research and outreach. You can see what each agent does on
        the <Link href="/team">COSMIC team list</Link>. I do the building and answer your email myself.
      </p>

      <h2>Work you can see</h2>

      <p>
        <a href="https://ua-today.vercel.app" target="_blank" rel="noopener noreferrer">UA Today</a>{" "}
        is a campus events site I built for students here. It pulls events from six sources:
        official University events, student organizations, ministries and athletics. It is free,
        needs no account and is not affiliated with the University.
      </p>

      <p>
        <Link href="/digital/tools">26 free AI tools for small businesses</Link> are live, each built for one task.
        My <Link href="/portfolio">portfolio</Link> has client work, and the{" "}
        <Link href="/case-studies">case studies</Link> cover what was hard about a few projects.
      </p>

      <h2>When I am the wrong fit</h2>

      <p>
        Purcell Ventures is one person, and I am 19. If you need a large team, a signed
        enterprise MSA or support around the clock, I am the wrong fit, and I will tell you on
        the first call.
      </p>

      <p>
        If AI cannot solve your problem, I will tell you. If an off-the-shelf chatbot is
        enough, I will show you how to set it up yourself, since that costs you less.
      </p>

      <h2>Do you work outside Tuscaloosa?</h2>
      <p>
        Yes. <Link href="/ai-consulting">AI consulting across Alabama</Link> covers how the work runs in
        other cities, with guides for <Link href="/ai-consulting/birmingham-al">Birmingham</Link>,{" "}
        <Link href="/ai-consulting/huntsville-al">Huntsville</Link>,{" "}
        <Link href="/ai-consulting/montgomery-al">Montgomery</Link>,{" "}
        <Link href="/ai-consulting/mobile-al">Mobile</Link> and{" "}
        <Link href="/ai-consulting/auburn-al">Auburn</Link>. The{" "}
        <Link href="/ai-for">trade guides</Link> cover what AI handles in twenty kinds of business, and the{" "}
        <Link href="/research/alabama-small-business-websites-2026">Alabama website study</Link> shows how
        1,176 business sites across the state hold up with Google and AI search.
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
        Related: <Link href="/consulting">AI consulting and team training</Link>,{" "}
        <Link href="/about">About Purcell Ventures</Link> and{" "}
        <Link href="/who">Who is Elijah Purcell</Link>.
      </p>
      <UpdatedLine path="/ai-consultant-tuscaloosa" bare />
      <ServiceSchema />
      <PageDates path="/ai-consultant-tuscaloosa" />
    </PostLayout>
  );
}
