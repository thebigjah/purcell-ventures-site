import Link from "next/link";
import { PostLayout } from "@/app/components/ui";
import { TradeCrumbs, TradeEnd, TradeFaq } from "../TradeParts";
import { QA } from "./layout";

const SLUG = "restaurants";

export default function AiForRestaurants() {
  return (
    <PostLayout
      crumbs={<TradeCrumbs slug={SLUG} />}
      kicker="AI for small business, by trade"
      title="AI for restaurants"
      lede="Where AI helps a restaurant with menu questions, review replies and catering inquiries, why allergen answers need a person behind them, and what Purcell Ventures sets up."
      meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC. I build AI software, train
        small business teams on AI tools, and run my own company with COSMIC, a station of 57
        AI agents in 17 rooms that drafts proposals, audits sites and handles outreach.
      </p>

      <h2>What can AI do for a restaurant?</h2>

      <p>
        AI handles three restaurant jobs well: answering menu, hours and parking questions on
        your website, drafting replies to Google and Yelp reviews, and sorting catering
        inquiries into a clear quote request. Each job repeats every week, takes a
        manager&apos;s time between shifts, and gets a person&apos;s check before money or a
        guest&apos;s health depends on it.
      </p>

      <p>
        A fourth job fits most restaurants: social captions for specials and events, written
        from your own photos and notes. The free{" "}
        <Link href="/digital/tools/caption-generator">caption generator</Link> shows what a
        draft looks like.
      </p>

      <h2>How does an AI chatbot answer menu questions?</h2>

      <p>
        A chatbot on your website answers from the menu, hours, location, parking, reservation
        policy and private dining details you give it. Guests ask the same questions every
        day, such as whether you take reservations or have a kids menu, and the bot answers
        at any hour from your own written facts.
      </p>

      <p>
        The bot is only as current as its source. When the menu or hours change, update the
        bot the same day, or it will give a guest last month&apos;s answer with full
        confidence. Name one person who owns that update.
      </p>

      <h2>How should a restaurant handle allergen questions with AI?</h2>

      <p>
        Allergen answers must come from a written list that a person keeps current, covering
        each dish and its major allergens. The bot repeats that list and nothing else. For
        cross-contact, substitutions, a dish off the list or any doubt, it hands the question
        to staff and tells the guest to ask their server or the manager.
      </p>

      <p>
        A general AI model will guess at ingredients when it lacks the facts. For a guest with
        a severe allergy, a guess is the one answer the restaurant cannot afford, so the
        handoff rule goes into the bot before launch.
      </p>

      <h2>Can AI write restaurant review replies?</h2>

      <p>
        Yes. AI drafts help a manager reply to every review, good and bad, in less time. The
        manager reads each draft, adds a real detail from the visit, and removes anything
        defensive. The free{" "}
        <Link href="/digital/tools/review-response">review response generator</Link> shows
        what a draft looks like.
      </p>

      <p>
        A review that reports food poisoning, an allergic reaction or an injury needs a
        manager&apos;s own reply and an offer to talk offline. Keep AI out of that one.
      </p>

      <h2>How can AI handle catering inquiries?</h2>

      <p>
        A catering form or chatbot can collect the date, headcount, location, budget, service
        style and dietary needs, then draft a reply with your catering menu and the next
        step. The manager confirms the kitchen can take the date, sets the final price and
        approves the order.
      </p>

      <h2>What should a restaurant not hand to AI?</h2>

      <p>
        Keep food safety, allergy judgment calls, final catering prices, staff matters and
        replies to serious complaints with the owner and managers. A model cannot see the
        kitchen or know what changed on the line tonight, and it states a wrong answer in the
        same tone as a right one.
      </p>

      <table>
        <thead>
          <tr>
            <th scope="col">Restaurant task</th>
            <th scope="col">AI role</th>
            <th scope="col">Person&apos;s role</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Menu and hours questions</th><td>Answers from your written facts</td><td>Updates the facts when they change</td></tr>
          <tr><th scope="row">Allergen questions</th><td>Repeats the written list or hands off</td><td>Keeps the list current and answers the rest</td></tr>
          <tr><th scope="row">Review replies</th><td>Drafts each reply</td><td>Edits, posts and handles safety complaints</td></tr>
          <tr><th scope="row">Catering inquiries</th><td>Collects details and drafts a reply</td><td>Confirms the date and sets the price</td></tr>
          <tr><th scope="row">Food safety calls</th><td>None</td><td>All of it</td></tr>
        </tbody>
      </table>

      <h2>What privacy and compliance cautions apply to restaurants using AI?</h2>

      <p>
        Keep card numbers, guest phone lists and staff records out of consumer AI chats, and
        use a business plan with training on your chats turned off. Allergen and menu
        labeling rules come from your health department and federal law, and AI copy has to
        follow them. This is general information, and your own counsel can confirm details.
      </p>

      <h2>What can Purcell Ventures set up for a restaurant?</h2>

      <p>
        I can train your managers, add guest-facing tools to your website, or build a small
        tool for a gap your point-of-sale system leaves. The first conversation about which route fits is free, and every project is quoted for your business after that call.
      </p>

      <ul>
        <li>
          <strong>Training.</strong> <Link href="/consulting">AI training</Link> on review
          replies, captions and a staff AI rule, in 1-on-1 sessions, small groups of 2 to 8, or a half-day workshop for up to 20 people.
        </li>
        <li>
          <strong>Website tools.</strong> The <Link href="/digital">Digital plans</Link> add an
          AI FAQ builder, review request automation, event registration and a loyalty punch
          card, or an AI chatbot trained on your restaurant and online booking. Pricing is quoted per business, with no contract.
        </li>
        <li>
          <strong>Custom software.</strong> A <Link href="/software">small project</Link> such as
          a catering inquiry tool that drafts quotes from your menu is quoted after a free call.
        </li>
      </ul>

      <p>
        The <Link href="/ai-readiness">AI readiness test</Link> scores your restaurant in ten
        questions, and the <Link href="/ai-cost-calculator">AI cost calculator</Link> shows
        whether the hours saved cover the cost. The{" "}
        <Link href="/ai-automation">AI automation guide</Link> covers booking and review
        requests in more depth.
      </p>

      <TradeFaq qa={QA} />
      <TradeEnd slug={SLUG} />
    </PostLayout>
  );
}
