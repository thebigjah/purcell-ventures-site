import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";
import { CONTACT } from "@/lib/contact";

// Comparison page, written 9 Nov 2026. PV facts come from /digital (the chatbot sits in
// the Full Service plan, quoted per business with no PV price) and /ai-automation, which
// states that Purcell Ventures does not sell a phone answering product. AI phone services,
// answering services and wages are described by how they charge, with no dollar figures.

const PATH = "/compare/ai-chatbot-vs-human-receptionist";
const URL = `https://purcellventures.co${PATH}`;

export const metadata: Metadata = {
  title: { absolute: "AI chatbot vs a human receptionist, Purcell Ventures" },
  description:
    "AI chatbot or phone answering vs a human receptionist: what software handles well, what a person must handle, and how each one charges a small business.",
  alternates: { canonical: URL },
  openGraph: {
    title: "AI chatbot vs a human receptionist",
    description: "AI chatbot or phone answering vs a human receptionist: what software handles well, what a person must handle, and how each one charges a small business.",
    url: URL,
    type: "article",
    images: ["/opengraph-image"],
  },
};

const QA: [string, string][] = [
  ["Can an AI chatbot replace a receptionist?",
   "For routine questions on your website, such as hours, prices, services and how to book, a chatbot can answer at any hour. It cannot calm an upset customer, make an exception or notice that something feels wrong. Most small businesses that use one keep a person for everything outside the routine."],
  ["Can AI answer the phone for a small business?",
   "Yes, for routine calls. AI voice tools can answer, give hours and prices, take a message and book into a connected calendar. They handle a caller with an unusual problem poorly, and an upset caller worse. Set one up with a script and a transfer to a person."],
  ["Does Purcell Ventures sell AI phone answering?",
   "No. Purcell Ventures does not sell a phone answering product. The Digital Full Service plan includes an AI chatbot trained on your business and branded online booking for your website. Pricing is quoted per business after a free call."],
  ["How do AI phone answering services charge?",
   "Most charge a monthly plan with a set number of minutes or calls, or a rate per minute. Some add setup fees or charge more for calendar and CRM connections. Prices change, so check current pricing on each provider's site."],
  ["What should a chatbot never handle on its own?",
   "Complaints, refunds and exceptions to policy, medical or legal questions, emergencies, and anything that needs payment details. Set the chatbot to hand those to a person with a phone number, an email or a callback form."],
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
          { name: "AI chatbot vs human receptionist", href: PATH },
        ]} />}
        kicker="Comparisons"
        title="AI chatbot vs a human receptionist"
        lede="What a website chatbot or AI phone answering handles well, what a person still has to handle, and how each one charges a small business."
        meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
      >
        <UpdatedLine path={PATH} bare />

        <table>
          <thead>
            <tr><td></td><th scope="col">Website chatbot</th><th scope="col">AI phone answering</th><th scope="col">Human receptionist</th></tr>
          </thead>
          <tbody>
            <tr><th scope="row">Where it works</th><td>Your website</td><td>Your phone line</td><td>Phone, front desk and email</td></tr>
            <tr><th scope="row">Hours</th><td>Any hour</td><td>Any hour</td><td>Set shifts, or an answering service after hours</td></tr>
            <tr><th scope="row">How it charges</th><td>A monthly plan, or a build fee plus usage. Check current pricing</td><td>A monthly plan by minutes or calls, or a rate per minute. Check current pricing</td><td>An hourly wage, or an answering service plan by minutes or calls</td></tr>
            <tr><th scope="row">Best at</th><td>Hours, prices, services and booking links</td><td>Routine calls, messages and simple bookings</td><td>Upset customers, exceptions and judgment calls</td></tr>
            <tr><th scope="row">Weak at</th><td>Questions outside what you trained it on</td><td>Unusual problems and upset callers</td><td>Covering every hour of every day</td></tr>
            <tr><th scope="row">Needs from you</th><td>Accurate answers to train it on</td><td>A script, an allowed list and a transfer number</td><td>Hiring, training and a schedule</td></tr>
          </tbody>
        </table>

        <p>
          I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC in Tuscaloosa. I add AI
          chatbots to small business websites, and I do not sell a phone answering product. For
          many businesses the person at the front desk does work no software should take over.
        </p>

        <h2>What does a website chatbot handle well?</h2>

        <p>
          A website chatbot answers the questions customers ask over and over. What time do you
          open on Saturday? Do you take walk-ins? How much is a standard cleaning? Where do I
          park? Trained on your own answers, a chatbot gives the same reply at 11 p.m. that you
          would give at noon, and it can send the customer to your booking page.
        </p>

        <p>
          It works best when the answers already exist in writing. If your prices, policies and
          service list sit in your head, write them down first. The chatbot can only repeat what
          you give it, and a chatbot without good source material guesses. The glossary entry on{" "}
          <Link href="/ai-glossary#hallucination">hallucination</Link> explains why that happens.
        </p>

        <h2>What can AI phone answering do?</h2>

        <p>
          AI voice tools can answer a call, give hours and prices, take a message and book into a
          connected calendar. They do well on short, predictable calls. They handle a caller with
          an unusual problem poorly, and an upset caller worse.
        </p>

        <p>
          If you try one, set it up with a script, a short list of questions it may answer, and a
          transfer to a person for everything else. Then check what happens to the calls it
          takes. If the calendar is not connected and nobody calls the leads back, the tool only
          records missed business in more detail.
        </p>

        <h2>What must a person handle?</h2>

        <p>
          A person should handle any conversation where the right answer depends on judgment,
          feelings or money:
        </p>

        <ul>
          <li>Complaints, refunds and requests for an exception to policy.</li>
          <li>Medical, legal or safety questions, and anything that sounds like an emergency.</li>
          <li>Payment details and other sensitive personal information.</li>
          <li>Long-time customers who expect to hear a familiar voice.</li>
          <li>Any call where the customer asks for a person.</li>
        </ul>

        <p>
          A receptionist also notices things software misses: a regular who sounds unwell, a
          supplier problem mentioned in passing, a customer about to leave for a competitor. If
          that kind of attention brings in your repeat business, keep a person on the phone and
          use software for the overflow. The glossary term{" "}
          <Link href="/ai-glossary#human-in-the-loop">human in the loop</Link> describes this
          setup.
        </p>

        <h2>How does each one charge?</h2>

        <p>
          Website chatbots come as monthly plans from chatbot companies, as a feature inside a
          website or CRM plan, or as a custom build with a fee up front and model usage after.
          AI phone answering services usually charge a monthly plan with a set number of minutes
          or calls, or a rate per minute. A receptionist costs an hourly wage plus payroll costs,
          and a live answering service charges by minutes or calls. Prices change, so check
          current pricing with each provider.
        </p>

        <p>
          At Purcell Ventures, an AI chatbot trained on your business comes with the{" "}
          <Link href="/digital">Digital Full Service plan</Link>, along with branded online
          booking and email and text campaigns. The plan is quoted for your business after a
          free call, with no contract. The{" "}
          <Link href="/ai-automation">AI automation guide</Link> covers which tasks to hand to
          software first.
        </p>

        <h2>Which one should you choose?</h2>

        <p>
          Start with the question your customers ask most and where they ask it. If most of
          them visit your website first and ask the same few things, a chatbot and an online
          booking page cover a lot of ground. If most of them call, and the calls are short and
          routine, an AI phone tool with a transfer to a person may help. If the calls are long,
          personal or emotional, keep a receptionist, and give them a booking page so they spend
          less time on scheduling.
        </p>

        <p>
          Count before you buy. Write down every call and website question for one week, mark
          which ones a script could answer, and run the total through the{" "}
          <Link href="/ai-cost-calculator">AI cost calculator</Link>.
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
          <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a> with the questions your
          customers ask most. If a chatbot will not help, I will say so. I reply within one
          business day.
        </p>
      </PostLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
      <PageDates path={PATH} name="AI chatbot vs human receptionist" />
    </>
  );
}
