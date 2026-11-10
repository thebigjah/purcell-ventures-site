import Link from "next/link";
import { PostLayout } from "@/app/components/ui";
import { TradeCrumbs, TradeEnd, TradeFaq } from "../TradeParts";
import { QA } from "./layout";

const SLUG = "auto-repair-shops";

export default function AiForAutoRepairShops() {
  return (
    <PostLayout
      crumbs={<TradeCrumbs slug={SLUG} />}
      kicker="AI for small business, by trade"
      title="AI for auto repair shops"
      lede="Where AI helps an auto repair shop with repair explanations, status updates, service reminders and estimates, what stays with the technician, and what Purcell Ventures sets up."
      meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC. I build AI software, train
        small business teams to use AI tools, and run my own company with COSMIC, a station
        of 57 AI agents in 17 rooms that drafts proposals, audits sites and handles outreach.
      </p>

      <h2>What can AI do for an auto repair shop?</h2>

      <p>
        AI handles four shop jobs well: turning a technician&apos;s notes into a repair
        explanation a customer can follow, writing status updates while the car sits in the
        bay, wording service reminders, and drafting estimates from the findings. Each one is
        writing work that repeats on every car, and a service advisor checks it before the
        customer sees it.
      </p>

      <p>
        The service counter gains the most. An advisor translates shop talk for customers
        and answers &quot;is it ready yet&quot; calls, and both jobs follow a pattern a tool
        can draft.
      </p>

      <h2>How can AI explain repairs from technician notes?</h2>

      <p>
        A technician types or dictates what they found, such as worn front pads, a leaking
        valve cover gasket and a weak battery, and a model writes a short explanation of
        each item: what the part does, what the tech saw and what happens if it waits. The
        advisor reads it, fixes anything wrong and sends it.
      </p>

      <p>
        Ask the tool to sort items into &quot;needs it now&quot;, &quot;soon&quot; and
        &quot;watch it&quot;, using the technician&apos;s own rating. The model should never
        upgrade or downgrade an item on its own, because that rating carries the
        technician&apos;s judgment and your shop&apos;s name.
      </p>

      <h2>How do I send repair status updates with AI?</h2>

      <p>
        Most shop management systems and texting tools can send a message when a repair
        order changes stage: checked in, inspected, waiting on parts, in progress and ready
        for pickup. The trigger needs no AI. AI helps write each message so it names the car
        and the next step in plain words.
      </p>

      <p>
        Keep updates factual and short. A delay message should give the reason and a new
        time when you have one, and an advisor should call instead of texting when the news
        is bad or the bill has grown.
      </p>

      <h2>How do service reminders and estimates work with AI?</h2>

      <p>
        Your shop system already knows each car&apos;s mileage and last service, so it can
        send oil change and inspection reminders on a schedule. AI writes the reminder
        wording and drafts estimates from the technician&apos;s findings and your parts and
        labor lines. The advisor checks every price, part number and labor time.
      </p>

      <p>
        Marketing texts, such as a seasonal tire promo, need the customer&apos;s prior
        written consent under federal telemarketing rules, so collect it at the first visit.
      </p>

      <h2>What should an auto repair shop not hand to AI?</h2>

      <p>
        Keep diagnosis, safety calls and the customer&apos;s approval for work with people. A
        model cannot hear the noise, feel the brake pedal or read the scan data in context,
        and it will still answer with confidence. A wrong answer here can send a car back on
        the road with a safety problem.
      </p>

      <ul>
        <li><strong>Diagnosis.</strong> A bot can collect symptoms. A technician finds the fault.</li>
        <li><strong>Safety calls.</strong> Brakes, steering, tires and anything that makes a car unsafe to drive go to a technician.</li>
        <li><strong>Authorization for work.</strong> An advisor gets the customer&apos;s approval and records it as your state requires.</li>
        <li><strong>Final prices and warranty terms.</strong> Drafts only, signed off by a person.</li>
      </ul>

      <table>
        <thead>
          <tr>
            <th scope="col">Shop task</th>
            <th scope="col">AI role</th>
            <th scope="col">Person&apos;s role</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Repair explanations</th><td>Drafts from tech notes</td><td>Advisor checks and sends</td></tr>
          <tr><th scope="row">Status updates</th><td>Writes the message</td><td>Calls when news is bad</td></tr>
          <tr><th scope="row">Service reminders</th><td>Writes the wording</td><td>Keeps mileage and dates current</td></tr>
          <tr><th scope="row">Estimates</th><td>Drafts from findings</td><td>Sets prices and gets approval</td></tr>
          <tr><th scope="row">Diagnosis and safety</th><td>None</td><td>All of it</td></tr>
        </tbody>
      </table>

      <h2>What privacy rules apply to auto shop customer data in AI tools?</h2>

      <p>
        Treat customer names, phone numbers, vehicle details and repair history as private,
        and keep card numbers, license details and key or lockbox codes out of AI chats
        entirely. Use a business plan of your AI tool with training on your chats turned off.
        This is general information, and your own counsel can answer questions about your
        state.
      </p>

      <h2>What can Purcell Ventures set up for an auto repair shop?</h2>

      <p>
        I can train your advisors and technicians, add estimate and review tools to your
        website, or build software for a gap your shop management system leaves. Each route
        below has a published price on its own page, and the first conversation about which
        one fits is free.
      </p>

      <ul>
        <li>
          <strong>Training.</strong> <Link href="/consulting">AI training</Link> on repair
          explanations, update wording and review replies: $175 an hour 1-on-1, $125 a person
          for groups of 2 to 8, or $2,500 for a half-day workshop for up to 20 people.
        </li>
        <li>
          <strong>Website tools.</strong> The <Link href="/digital">Digital plans</Link> add an
          online estimating form and review request automation at $179 a month, or an AI
          chatbot trained on your shop, online booking and an email and SMS campaign system at
          $279 a month. Setup is $650 to $1,000, with no contract.
        </li>
        <li>
          <strong>Custom software.</strong> A <Link href="/software">small project</Link>,
          such as a tool that turns tech notes into customer explanations in your format,
          runs $1,500 to $3,500.
        </li>
      </ul>

      <p>
        Before you buy anything, the <Link href="/ai-readiness">AI readiness test</Link> scores
        your shop in ten questions, and the <Link href="/ai-cost-calculator">AI cost
        calculator</Link> shows whether the hours saved cover the cost. The{" "}
        <Link href="/ai-automation">AI automation guide</Link> covers reminders and
        follow-ups in more depth.
      </p>

      <TradeFaq qa={QA} />
      <TradeEnd slug={SLUG} />
    </PostLayout>
  );
}
