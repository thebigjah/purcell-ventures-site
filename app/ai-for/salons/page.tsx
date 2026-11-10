import Link from "next/link";
import { PostLayout } from "@/app/components/ui";
import { TradeCrumbs, TradeEnd, TradeFaq } from "../TradeParts";
import { QA } from "./layout";

const SLUG = "salons";

export default function AiForSalons() {
  return (
    <PostLayout
      crumbs={<TradeCrumbs slug={SLUG} />}
      kicker="AI for small business, by trade"
      title="AI for salons"
      lede="Where AI helps a hair salon with booking, rebooking, service questions and captions, what stays with the stylist, and what Purcell Ventures sets up."
      meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC. I build AI software, train
        small business teams to use AI tools, and run my own company with COSMIC, a station
        of 57 AI agents in 17 rooms that drafts proposals, audits sites and handles outreach.
      </p>

      <h2>What can AI do for a hair salon?</h2>

      <p>
        AI handles four salon jobs well: booking appointments that run several hours,
        reminding clients when their next color or cut is due, answering the same service and
        price questions, and drafting captions for the work your stylists post. Each job
        repeats every week, and a stylist or manager checks anything that reaches a client.
      </p>

      <p>
        The front desk gains the most. A desk that stops answering the same question about
        balayage prices can greet the client in the chair and check out the one at the
        register.
      </p>

      <h2>How does AI handle long, multi-service salon bookings?</h2>

      <p>
        A booking page tied to each stylist&apos;s calendar books a cut, color and treatment
        as one block, with the processing time and gaps you set for each service. A website
        chatbot can walk a client to the right service and hand off to the page. The rules
        come from you, and the tool follows them.
      </p>

      <p>
        Write the rules down first: how long each service takes for short and long hair,
        which services need a consultation before a first booking, and which stylists offer
        which services. A color correction or extensions request should go to the stylist as
        a message, since a fixed time slot rarely fits that work.
      </p>

      <h2>How do rebooking reminders work for a salon?</h2>

      <p>
        Each service has a natural return date, such as six weeks for a cut or eight for a
        root touch-up. The booking system sends a text or email near that date with a link to
        the client&apos;s usual stylist. The schedule needs no AI. AI helps write short
        messages that name the service and the stylist.
      </p>

      <p>
        Marketing texts need the client&apos;s prior written consent under federal
        telemarketing rules, so ask for it at the first booking. Appointment confirmations
        and reminders for a visit the client booked fall in a different category, and your
        texting provider can tell you how it handles each.
      </p>

      <h2>Can AI answer salon service and price questions?</h2>

      <p>
        Yes, when the answers come from your own written list. A chatbot trained on your
        services, starting prices, policies and hours can tell a client what a gloss costs,
        how the cancellation fee works and whether you sell a brand. It should give
        &quot;starting at&quot; prices and send final quotes to the stylist.
      </p>

      <h2>What should a salon not hand to AI?</h2>

      <p>
        Keep color consultations, formulas, allergy decisions and pricing for unusual work
        with the stylist. A model cannot see the hair, feel its condition or read its
        history, and it will still answer with confidence. A wrong answer here can mean a
        damaged head of hair or an allergic reaction.
      </p>

      <ul>
        <li><strong>Color choices and formulas.</strong> The stylist decides after an in-person consultation.</li>
        <li><strong>Patch and strand tests.</strong> The stylist runs them as the color line directs, and a bot never waives one.</li>
        <li><strong>Corrections and extensions quotes.</strong> Drafts only, priced by the stylist who will do the work.</li>
        <li><strong>Complaints about a service.</strong> The owner or stylist replies in person.</li>
      </ul>

      <table>
        <thead>
          <tr>
            <th scope="col">Salon task</th>
            <th scope="col">AI role</th>
            <th scope="col">Stylist&apos;s role</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Multi-service booking</th><td>Books by your length rules</td><td>Sets the rules and reviews odd requests</td></tr>
          <tr><th scope="row">Rebooking reminders</th><td>Writes the message</td><td>Keeps return dates per service current</td></tr>
          <tr><th scope="row">Service and price questions</th><td>Answers from your list</td><td>Gives final quotes</td></tr>
          <tr><th scope="row">Captions</th><td>Drafts each one</td><td>Edits and posts with client permission</td></tr>
          <tr><th scope="row">Color and allergy calls</th><td>None</td><td>All of it</td></tr>
        </tbody>
      </table>

      <h2>What privacy rules apply to salon client data in AI tools?</h2>

      <p>
        Treat client names, phone numbers and service history as private, and keep allergy
        notes, patch-test results, scalp conditions and medications out of AI chats entirely.
        Use a business plan of your AI tool with training on your chats turned off. This is
        general information, and your own counsel can answer questions about your state.
      </p>

      <p>
        Photos need care too. Ask each client before their hair appears in a post, and keep
        their face out of the frame unless they agree to it.
      </p>

      <h2>What can Purcell Ventures set up for a salon?</h2>

      <p>
        I can train your front desk and stylists, add booking and AI tools to your website,
        or build software for a gap your booking system leaves. The first conversation about which route fits is free, and every project is quoted for your business after that call.
      </p>

      <ul>
        <li>
          <strong>Training.</strong> <Link href="/consulting">AI training</Link> on captions,
          reminder wording and review replies, in 1-on-1 sessions, small groups of 2 to 8, or a half-day workshop for up to 20 people.
        </li>
        <li>
          <strong>Website tools.</strong> The <Link href="/digital">Digital plans</Link> start
          with a caption generator and review response generator. Growth adds
          a staff scheduler, an AI FAQ builder and review request automation.
          Full Service adds branded online booking and an AI chatbot trained on your salon. Pricing is quoted per business, with no contract.
        </li>
        <li>
          <strong>Custom software.</strong> A <Link href="/software">small project</Link>,
          such as a tool that pulls return dates from your booking export, is quoted after a free call.
        </li>
      </ul>

      <p>
        Before you buy anything, the <Link href="/ai-readiness">AI readiness test</Link> scores
        your salon in ten questions, and the <Link href="/ai-cost-calculator">AI cost
        calculator</Link> shows whether the hours saved cover the cost. The{" "}
        <Link href="/ai-automation">AI automation guide</Link> covers booking and review
        requests in more depth.
      </p>

      <TradeFaq qa={QA} />
      <TradeEnd slug={SLUG} />
    </PostLayout>
  );
}
