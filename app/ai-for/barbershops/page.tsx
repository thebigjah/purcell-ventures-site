import Link from "next/link";
import { PostLayout } from "@/app/components/ui";
import { AlabamaKindFact, TradeCrumbs, TradeEnd, TradeFaq } from "../TradeParts";
import { QA } from "./layout";

const SLUG = "barbershops";

export default function AiForBarbershops() {
  return (
    <PostLayout
      crumbs={<TradeCrumbs slug={SLUG} />}
      kicker="AI for small business, by trade"
      title="AI for barbershops"
      lede="Where AI helps a barbershop with booking by barber, no-show reminders, shop questions and posts from cut photos, what stays with the barber, and what Purcell Ventures sets up."
      meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC. I build AI software, train
        small business teams to use AI tools, and run my own company with COSMIC, a station
        of 57 AI agents in 17 rooms that drafts proposals, audits sites and handles outreach.
      </p>

      <h2>What can AI do for a barbershop?</h2>

      <p>
        AI and simple automation handle four barbershop jobs well: booking each barber&apos;s
        chair online, sending reminders that cut down on empty chairs, answering the same shop
        questions about hours, prices and walk-ins, and drafting posts and review replies from
        the cuts your barbers finish. A barber still checks anything a customer sees.
      </p>

      <p>
        Most of this work happens between cuts, when a barber has clippers in one hand and a
        ringing phone on the counter. Every question a customer can answer without calling
        keeps the barber on the cut.
      </p>

      <AlabamaKindFact kind="shops" />

      <h2>How should a barbershop handle walk-ins next to online booking?</h2>

      <p>
        Decide which hours each barber takes appointments and which hours stay open for
        walk-ins, then put only the bookable hours on the booking page. Some shops keep one
        chair for walk-ins all day. A website chatbot can tell a customer the walk-in hours
        and send everyone else to book.
      </p>

      <p>
        Booking by barber matters more here than in most trades, because customers come back
        for one person. Each barber needs their own calendar, services and lengths, so a
        customer who wants a beard trim from a particular barber books that chair and nobody
        else&apos;s.
      </p>

      <h2>How do reminders cut down on barbershop no-shows?</h2>

      <p>
        A text the day before and another a few hours before the cut gives a customer an easy
        way to cancel or move the time, and the open slot can go to a walk-in or the next
        booking. The booking system sends these on its own schedule. AI helps write short,
        friendly reminder wording in your shop&apos;s voice.
      </p>

      <p>
        A written no-show policy shown at booking backs the reminders up. Marketing texts,
        such as a promo for a slow Tuesday, need the customer&apos;s prior written consent
        under federal telemarketing rules, so collect it when the customer first books.
      </p>

      <h2>Can AI write barbershop posts and review replies?</h2>

      <p>
        Yes, as drafts. A barber snaps the finished cut, notes the style, and an AI tool
        drafts a caption with the barber&apos;s name and the booking link. The same tools
        draft replies to Google reviews. The barber or owner edits each one and posts it, so
        the shop still sounds like the shop.
      </p>

      <p>
        Ask the customer before their photo goes up, and keep their face out of the frame
        unless they say yes. The free{" "}
        <Link href="/digital/tools/caption-generator">caption generator</Link> shows what a
        first draft looks like.
      </p>

      <h2>What should a barbershop not hand to AI?</h2>

      <p>
        Keep the cut itself, the customer relationship and anything about skin or scalp with
        the barber. A model cannot see the hairline, the growth pattern or a razor bump, and it
        will still answer with confidence. Customers come back for the barber, and AI should
        handle the errands around that.
      </p>

      <ul>
        <li><strong>Skin and scalp questions.</strong> A barber looks in person and refers medical concerns to a doctor.</li>
        <li><strong>Complaints about a cut.</strong> The barber or owner talks to the customer directly.</li>
        <li><strong>Prices for unusual work.</strong> Designs and long-hair cuts get a quote from the barber.</li>
        <li><strong>Chair rent and staff matters.</strong> All of it stays between the owner and each barber.</li>
      </ul>

      <table>
        <thead>
          <tr>
            <th scope="col">Barbershop task</th>
            <th scope="col">AI or automation role</th>
            <th scope="col">Barber&apos;s role</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Booking by chair</th><td>Books each barber&apos;s open hours</td><td>Sets hours and walk-in time</td></tr>
          <tr><th scope="row">No-show reminders</th><td>Sends them on a schedule</td><td>Sets the no-show policy</td></tr>
          <tr><th scope="row">Shop questions</th><td>Answers from your list</td><td>Handles anything off the list</td></tr>
          <tr><th scope="row">Posts and review replies</th><td>Drafts each one</td><td>Edits, asks permission and posts</td></tr>
          <tr><th scope="row">The cut and skin concerns</th><td>None</td><td>All of it</td></tr>
        </tbody>
      </table>

      <h2>What privacy rules apply to barbershop customer data in AI tools?</h2>

      <p>
        Treat customer names, phone numbers and cut notes as private, and keep card numbers
        and any notes about skin or scalp conditions out of AI chats entirely. Use a business
        plan of your AI tool with training on your chats turned off. This is general
        information, and your own counsel can answer questions about your state.
      </p>

      <h2>What can Purcell Ventures set up for a barbershop?</h2>

      <p>
        I can train your barbers on drafting posts and replies, add booking and loyalty tools
        to your website, or build software for a gap your booking app leaves. The first conversation about which route fits is free, and every project is quoted for your business after that call.
      </p>

      <ul>
        <li>
          <strong>Training.</strong> <Link href="/consulting">AI training</Link> on captions,
          reminder wording and review replies, in 1-on-1 sessions, small groups of 2 to 8, or a half-day workshop for up to 20 people.
        </li>
        <li>
          <strong>Website tools.</strong> The <Link href="/digital">Digital plans</Link> start
          with a caption generator and review response generator. Growth adds
          a loyalty punch card with QR check-ins, a staff scheduler and review request
          automation. Full Service adds branded online booking and an AI
          chatbot trained on your shop. Pricing is quoted per business, with no contract.
        </li>
        <li>
          <strong>Custom software.</strong> A <Link href="/software">small project</Link>,
          such as a walk-in wait list that texts the next customer, is quoted after a free call.
        </li>
      </ul>

      <p>
        Before you buy anything, the <Link href="/ai-readiness">AI readiness test</Link> scores
        your shop in ten questions, and the <Link href="/ai-cost-calculator">AI cost
        calculator</Link> shows whether the hours saved cover the cost. The{" "}
        <Link href="/ai-automation">AI automation guide</Link> covers booking and review
        requests in more depth.
      </p>

      <TradeFaq qa={QA} />
      <TradeEnd slug={SLUG} />
    </PostLayout>
  );
}
