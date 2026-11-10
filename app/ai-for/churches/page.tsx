import Link from "next/link";
import { PostLayout } from "@/app/components/ui";
import { TradeCrumbs, TradeEnd, TradeFaq } from "../TradeParts";
import { QA } from "./layout";

const SLUG = "churches";

export default function AiForChurches() {
  return (
    <PostLayout
      crumbs={<TradeCrumbs slug={SLUG} />}
      kicker="AI for small business, by trade"
      title="AI for churches"
      lede="Where AI helps a church with sermon clips and summaries, volunteer scheduling and the weekly newsletter, what stays with the pastor and staff, and what Purcell Ventures sets up."
      meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC. I build AI software, train
        small teams to use AI tools, and run my own company with COSMIC, a
        station of 57 AI agents in 17 rooms that drafts proposals, audits sites and handles
        outreach.
      </p>

      <h2>What can AI do for a church?</h2>

      <p>
        AI handles three church jobs well: turning Sunday&apos;s sermon into a written
        summary and short video clips, scheduling volunteers for each service and event, and
        drafting the weekly newsletter or bulletin from staff notes. Each one is
        administrative work that repeats every week, and a pastor or staff member approves
        everything before the congregation sees it.
      </p>

      <p>
        In a small church, one staff member or volunteer often carries all three jobs. An hour
        saved on the bulletin is an hour that person can spend with members.
      </p>

      <h2>How can AI turn a sermon into clips and summaries?</h2>

      <p>
        A transcription tool turns the sermon recording into text, and an AI model drafts a
        summary, discussion questions for small groups and a list of short sections worth
        clipping. Clipping tools then cut those sections from the video and add captions. The
        pastor reads the summary and approves each clip.
      </p>

      <p>
        Two checks matter. Each clip should keep enough context that it says what the pastor
        meant, since a 40-second cut can make a careful point sound like its opposite. And
        worship music in a recording can need its own streaming license, so check what your
        church&apos;s music license covers before posting clips with songs in them.
      </p>

      <h2>How does AI help with church volunteer scheduling?</h2>

      <p>
        Scheduling software builds a rotation for greeters, nursery, sound and parking from
        each volunteer&apos;s availability, then sends reminders and lets people swap shifts.
        Most of that needs no AI. AI helps write the reminder and thank-you messages and can
        draft a fair rotation for a coordinator to adjust.
      </p>

      <p>
        Children&apos;s ministry needs a person in charge of the roster. Your church&apos;s
        background check and two-adult rules decide who serves with kids, and the scheduler
        should only offer those slots to cleared volunteers.
      </p>

      <h2>Can AI write a church newsletter?</h2>

      <p>
        Yes, as a first draft. Staff drop event details, dates and ministry updates into one
        place, and an AI tool turns them into a newsletter or bulletin in your church&apos;s
        usual format. A staff member checks every date, time and name before it goes out,
        since a wrong date sends families to an empty building.
      </p>

      <h2>What should a church not hand to AI?</h2>

      <p>
        Keep teaching, pastoral care, prayer and anything confidential with the pastor and
        staff. A model has no calling, no relationship with your members and no
        accountability to your elders, and it will still answer questions about faith with
        confidence. Doctrine and counsel belong to people your church has entrusted with them.
      </p>

      <ul>
        <li><strong>Teaching and doctrine.</strong> A bot never answers a member&apos;s questions about faith on the church&apos;s behalf.</li>
        <li><strong>Prayer requests and pastoral care notes.</strong> They never go into an AI tool.</li>
        <li><strong>Counseling and crisis calls.</strong> A pastor or trained person responds, every time.</li>
        <li><strong>Giving records.</strong> They stay in your giving or church management system.</li>
      </ul>

      <table>
        <thead>
          <tr>
            <th scope="col">Church task</th>
            <th scope="col">AI role</th>
            <th scope="col">Staff role</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Sermon summaries and clips</th><td>Drafts and cuts</td><td>Pastor approves each one</td></tr>
          <tr><th scope="row">Volunteer scheduling</th><td>Drafts rotations and reminders</td><td>Coordinator adjusts and clears kids&apos; roles</td></tr>
          <tr><th scope="row">Newsletter</th><td>Drafts from staff notes</td><td>Checks dates and names</td></tr>
          <tr><th scope="row">Event sign-ups</th><td>Answers event questions</td><td>Runs the event</td></tr>
          <tr><th scope="row">Prayer and pastoral care</th><td>None</td><td>All of it</td></tr>
        </tbody>
      </table>

      <h2>What privacy rules apply to church data in AI tools?</h2>

      <p>
        Treat member names, phone numbers and attendance as private, and keep prayer
        requests, care notes, giving records and children&apos;s details out of AI chats
        entirely. Use a business plan of your AI tool with training on your chats turned off.
        This is general information, and your church&apos;s own counsel can answer legal
        questions.
      </p>

      <p>
        Photos of children need a parent&apos;s written permission before they appear in a
        post, a clip or the newsletter. Ask adults too before their face goes online.
      </p>

      <h2>What can Purcell Ventures set up for a church?</h2>

      <p>
        I can train your staff and volunteers, add event and scheduling tools to your
        website, or build software for a gap your church management system leaves. Each
        route below has a published price on its own page, and the first conversation about
        which one fits is free.
      </p>

      <ul>
        <li>
          <strong>Training.</strong> <Link href="/consulting">AI training</Link> on sermon
          summaries, newsletter drafts and safe use of member data: $175 an hour 1-on-1, $125
          a person for groups of 2 to 8, or $2,500 for a half-day workshop for up to 20 people.
        </li>
        <li>
          <strong>Website tools.</strong> The <Link href="/digital">Digital plans</Link> include
          an event registration system, a staff scheduler and an AI content generator at $179
          a month, and an email and SMS campaign system at $279 a month. Setup is $650 to
          $1,000, with no contract.
        </li>
        <li>
          <strong>Custom software.</strong> A <Link href="/software">small project</Link>,
          such as a tool that turns each sermon transcript into a summary, small group
          questions and a clip list, runs $1,500 to $3,500.
        </li>
      </ul>

      <p>
        Before you buy anything, the <Link href="/ai-readiness">AI readiness test</Link> scores
        your staff in ten questions, and the <Link href="/ai-cost-calculator">AI cost
        calculator</Link> shows whether the hours saved cover the cost. The{" "}
        <Link href="/ai-automation">AI automation guide</Link> covers reminders and follow-ups
        in more depth.
      </p>

      <TradeFaq qa={QA} />
      <TradeEnd slug={SLUG} />
    </PostLayout>
  );
}
