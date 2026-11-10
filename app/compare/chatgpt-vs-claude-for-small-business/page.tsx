import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";
import { CONTACT } from "@/lib/contact";

// Comparison page, written 9 Nov 2026. PV runs on Claude (COSMIC's agents are Claude
// sessions, the CRM's AI features run on Claude), and the page says so up front. Both
// products are described by plan structure and broad features with no dollar figures and
// no quality ranking, because both change with every release. No PV prices: training is
// quoted per business (rule set 9 Nov 2026).

const PATH = "/compare/chatgpt-vs-claude-for-small-business";
const URL = `https://purcellventures.co${PATH}`;

export const metadata: Metadata = {
  title: { absolute: "ChatGPT vs Claude for a small business, Purcell Ventures" },
  description:
    "ChatGPT vs Claude for a small business: plan structure, team data controls, the features that differ, and how to test both on your own work before you buy.",
  alternates: { canonical: URL },
  openGraph: {
    title: "ChatGPT vs Claude for a small business",
    description: "ChatGPT vs Claude for a small business: plan structure, team data controls, the features that differ, and how to test both on your own work before you buy.",
    url: URL,
    type: "article",
    images: ["/opengraph-image"],
  },
};

const QA: [string, string][] = [
  ["Is ChatGPT or Claude better for a small business?",
   "Neither wins for every business, and the answer shifts with each model release. Run the same three tasks from your own week through both free plans and pick the one whose drafts need the least editing."],
  ["Do ChatGPT and Claude train on my business data?",
   "Both companies say their business and team plans do not train models on your data by default. Personal plans have their own settings. Read each company's current data policy before staff paste customer information into either one."],
  ["How much do ChatGPT and Claude cost?",
   "Both offer a free plan, paid plans for one person, team plans billed per seat and enterprise plans. Prices change, so check current pricing on each company's site."],
  ["Should my whole team pay for an AI assistant?",
   "Start with one paid seat for the person who writes the most. Move the team to a team plan once two or three people use it every week, because the team plan adds the admin and data controls a staff policy needs."],
  ["Which one does Purcell Ventures use?",
   "Claude. COSMIC, the station of 57 AI agents that runs the company's proposals, audits and outreach, runs on Claude, and so do the AI features in the company's CRM."],
];

const LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${URL}#faq`,
  mainEntity: QA.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function Page() {
  return (
    <>
      <PostLayout
        crumbs={<Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Comparisons", href: "/compare" },
          { name: "ChatGPT vs Claude for small business", href: PATH },
        ]} />}
        kicker="Comparisons"
        title="ChatGPT vs Claude for a small business"
        lede="How the two assistants differ in plans, data controls and features, when one paid seat is enough, and how to test both on your own work before you buy."
        meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
      >
        <UpdatedLine path={PATH} bare />

        <table>
          <thead>
            <tr><td></td><th scope="col">ChatGPT</th><th scope="col">Claude</th></tr>
          </thead>
          <tbody>
            <tr><th scope="row">Made by</th><td>OpenAI</td><td>Anthropic</td></tr>
            <tr><th scope="row">Plans</th><td>Free, individual, team and enterprise</td><td>Free, individual, team and enterprise</td></tr>
            <tr><th scope="row">How it charges</th><td>Per person per month. Check current pricing on their site</td><td>Per person per month. Check current pricing on their site</td></tr>
            <tr><th scope="row">Team data</th><td>Business plans exclude your data from training by default</td><td>Business plans exclude your data from training by default</td></tr>
            <tr><th scope="row">Built-in extras</th><td>Image generation, voice conversations, custom GPTs</td><td>Artifacts for documents and small apps, Claude Code for software</td></tr>
            <tr><th scope="row">Shared in both</th><td colSpan={2}>Web search, file uploads, projects with saved instructions, connectors to apps such as Google Drive, and an API for developers</td></tr>
          </tbody>
        </table>

        <p>
          I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC in Tuscaloosa. My company runs
          on Claude: COSMIC, the station of 57 AI agents that writes proposals, runs audits and
          handles outreach, runs on it, and so does the AI in my CRM. Weigh what follows with that
          in mind.
        </p>

        <h2>Which one writes better?</h2>

        <p>
          Both write drafts good enough for emails, review replies, proposals and website copy,
          and the gap between them shifts with each model release. A ranking from six months
          ago may already be out of date, so test them on your own work.
        </p>

        <p>Run this test before you pay for either:</p>

        <ol>
          <li>Pick three real tasks from last week, such as a reply to a review, a quote follow-up and a paragraph for your website.</li>
          <li>Give both free plans the same instructions and the same facts.</li>
          <li>Count how many edits each draft needs before you would send it.</li>
          <li>Pick the one that needed fewer edits, and repeat the test in six months.</li>
        </ol>

        <h2>When is ChatGPT the better pick?</h2>

        <ul>
          <li>Your staff already use it at home and will adopt it faster.</li>
          <li>You want images for social posts and text in the same app.</li>
          <li>You want to talk to the assistant by voice while you drive between jobs.</li>
          <li>You want to share custom GPTs, saved assistants for one repeat task, with your team.</li>
        </ul>

        <h2>When is Claude the better pick?</h2>

        <ul>
          <li>Your work involves long documents, such as contracts, manuals or bid packages.</li>
          <li>You want a draft to appear in a side panel you can edit and download, which Claude calls an Artifact.</li>
          <li>You or a developer plan to build software with an AI assistant, where Claude Code works in the code directly.</li>
          <li>Your team prefers its writing voice after the test above.</li>
        </ul>

        <h2>Is the free plan enough?</h2>

        <p>
          For one owner trying AI on a few tasks a week, often yes. Both free plans limit how
          much you can use them and which models you get. Upgrade when you hit those
          limits more than once a week.
        </p>

        <p>
          Before anyone types business information into a free or personal plan, sign up with a
          business email and turn off the setting that lets the provider train on your chats. The
          post on <Link href="/blog/keep-out-of-ai-chat-window">what to keep out of the AI chat
          window</Link> lists what never goes in, on any plan.
        </p>

        <h2>When does a team plan make sense?</h2>

        <p>
          Once two or three people use an assistant every week, move them to a team plan. Team
          plans on both products add central billing, admin controls and the business data terms
          described in the table. Those controls make a staff AI policy enforceable. The{" "}
          <Link href="/ai-for-small-business">AI for small business guide</Link> covers writing
          that policy.
        </p>

        <p>
          Paying for both rarely makes sense for a small team. Pick one, write down the tasks you
          use it for, and spend the second subscription on training instead.
        </p>

        <h2>What about building your own tools on them?</h2>

        <p>
          Both companies sell API access that developers use to build AI into your own software,
          billed by usage. The chat subscription and the API are separate purchases. The free AI
          tools on this site run on the Claude API. When I wrote about my CRM in May 2026, its
          AI features had cost $15 in API usage. The{" "}
          <Link href="/compare/custom-ai-agent-vs-zapier">custom AI agent vs Zapier</Link>{" "}
          comparison covers when a build is worth it.
        </p>

        <h2>What does training your team cost?</h2>

        <p>
          Purcell Ventures runs 1-on-1 sessions, small groups of 2 to 8 and half-day workshops
          for up to 20 people. Every session is quoted for your business after a free call.
          Bring examples of your own work to the session. The <Link href="/consulting">consulting
          page</Link> lists the sessions, and the <Link href="/ai-readiness">AI readiness
          test</Link> shows where your team stands in three minutes.
        </p>

        <h2>Common questions</h2>

        {QA.map(([q, a]) => (
          <div key={q}>
            <h3>{q}</h3>
            <p style={{ marginTop: 6 }}>{a}</p>
          </div>
        ))}

        <h2>How do I get in touch?</h2>

        <p>
          Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call{" "}
          <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a> with the tasks you want AI to
          help with. I reply within one business day.
        </p>
      </PostLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
      <PageDates path={PATH} name="ChatGPT vs Claude for small business" />
    </>
  );
}
