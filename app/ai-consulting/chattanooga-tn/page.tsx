import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import { QA } from "./layout";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";
import chatt from "@/lib/research/chattanooga-2026-11-summary.json";
import al from "@/lib/research/alabama-2026-11-summary.json";

// City page on the same single-column PostLayout as the pillar. Chattanooga's version
// splits its length between the startups downtown, the supplier and freight work around
// the Volkswagen plant and the interstates, and the tourism and medical offices.

const PATH = "/ai-consulting/chattanooga-tn";
const STUDY = "/research/alabama-small-business-websites-2026";

// Local proof point, built like AlabamaCityWebsites. Every number comes from the Chattanooga
// summary (checked with the Alabama study's method) and the Alabama statewide sample at build
// time, so the page never carries a typed figure that can drift from the data.
function ChattanoogaWebsites() {
  const c = chatt.frames.city;
  const s = al.frames.statewide;
  return (
    <>
      <h2>How do Chattanooga business websites hold up?</h2>

      <p>
        In November 2026 I checked the home pages of all {c.domains_checked} business websites
        that OpenStreetMap lists inside the Chattanooga city limits, and{" "}
        {c.not_reachable.pct_of_checked} percent had no working home page, against{" "}
        {s.not_reachable.pct_of_checked} percent of my Alabama statewide sample. Of the{" "}
        {c.own_domain_pages} working pages on a business&rsquo;s own domain,{" "}
        {c.jsonld_org_or_localbusiness.pct_of_own_domain_pages} percent carried structured data
        that names the business and its type, against{" "}
        {s.jsonld_org_or_localbusiness.pct_of_own_domain_pages} percent in Alabama. On those
        pages, {c.all_three_ai_signals.pct_of_own_domain_pages} percent had all three signals I
        measured for AI tools, against {s.all_three_ai_signals.pct_of_own_domain_pages} percent
        in Alabama: business structured data, an llms.txt file and no AI crawler blocked in
        robots.txt.
      </p>

      <p>
        The checks, filters and scripts match my{" "}
        <Link href={STUDY}>study of Alabama small business websites</Link>.
      </p>
    </>
  );
}

export default function AiConsultingChattanooga() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "AI consulting", href: "/ai-consulting" },
        { name: "Chattanooga", href: PATH },
      ]} />}
      kicker="Chattanooga, Tennessee"
      title="AI consulting in Chattanooga"
      lede="AI training, automation and custom software for Chattanooga startups, suppliers, freight companies, hotels and medical offices, from Elijah Purcell of Purcell Ventures in Tuscaloosa. The first conversation is free."
      meta="Every job quoted per business after a free call. Training happens at your location."
    >
      <p>
        I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC and a psychology and data
        science student at the University of Alabama. From Tuscaloosa, I train Chattanooga
        teams to use AI tools on their own work, and I build automation and custom software
        for the tasks AI fits.
      </p>

      <h2>What does Chattanooga&rsquo;s economy mean for AI work?</h2>

      <p>
        Chattanooga built its own fiber network. EPB, the city&rsquo;s public electric
        utility, runs fiber to homes and businesses across its service area and was among the
        first in the country to offer gigabit internet. Startups gather downtown around the
        Edney Innovation Center and the Company Lab. Volkswagen builds cars at its Chattanooga
        plant, and suppliers, trucking companies and warehouses work along I-75 and I-24, which
        meet in the city.
      </p>

      <p>
        Tourism and healthcare fill out the rest. The Tennessee Aquarium on the riverfront and
        the attractions on Lookout Mountain bring visitors to hotels, restaurants and tour
        companies every season. Erlanger, the region&rsquo;s large public hospital, draws
        medical practices and clinics to the streets around it. Each of those businesses
        repeats some work every week, and repeated work is where AI helps most.
      </p>

      <ChattanoogaWebsites />

      <h2>What AI work fits Chattanooga businesses?</h2>

      <ul>
        <li>
          <strong>Startups and small software teams.</strong> Training on ChatGPT, Claude and
          Gemini for the emails, posts, research and support answers a small team writes every
          week, and a first version of the internal tools a young company needs.
        </li>
        <li>
          <strong>Automotive suppliers and manufacturers.</strong> Purchase orders and
          shipping notices turned into entries in your order system, quote drafts from your own
          past jobs, and a simple lookup for parts or job status.
        </li>
        <li>
          <strong>Trucking, freight and warehouse companies.</strong> Tracking updates,
          delivery confirmations and the same load details moved between a customer&rsquo;s
          portal and your dispatch system, so nobody types the same numbers twice.
        </li>
        <li>
          <strong>Hotels, restaurants and tour companies.</strong> Booking messages, answers to
          the guest questions that repeat every weekend, posts with seasonal hours and replies
          to reviews.
        </li>
        <li>
          <strong>Medical and dental practices.</strong> Appointment reminders and answers to
          the front-desk questions about hours, parking, forms and insurance, written with no
          patient details in the tool.
        </li>
      </ul>

      <p>
        The supplier and freight work usually becomes an{" "}
        <Link href="/ai-automation">AI automation</Link>, because the same data moves on the
        same schedule every day. The guest and patient questions usually start with training,
        so staff learn to draft answers fast and check them before they send.
      </p>

      <h2>What should stay with a person?</h2>

      <p>
        Quality and safety sign-offs, anything a customer contract restricts, refunds and
        complaints stay with a person. Patient health information stays out of any AI tool your
        practice has not cleared under HIPAA, and diagnosis and treatment stay with a
        clinician. So does any message where a wrong answer reaches a customer or patient
        before someone can catch it.
      </p>

      <p>
        Consumer and business plans of the same AI product can handle your data differently,
        so check the data and training settings before anyone pastes in customer information.
        Every session covers{" "}
        <Link href="/blog/keep-out-of-ai-chat-window">what to keep out of the chat window</Link>.
      </p>

      <h2>How does an engagement work from Tuscaloosa?</h2>

      <p>
        It starts with a free conversation by phone or email. You tell me what takes up your
        week, and I tell you whether training, automation or custom software fits, or that none
        of them does. I reply within one business day.
      </p>

      <p>
        Purcell Ventures has no office in Chattanooga. Training happens at your location,
        built around the tools your staff already use. Standard sessions need one to two weeks
        of notice, and custom training needs more. Planning and builds run over phone and
        email, and each project ends with a takeaway guide or handoff your team can run
        without me.
      </p>

      <h2>What does AI consulting cost in Chattanooga?</h2>

      <p>
        I quote every job per business after a free call, because the price depends on the
        size of your team, how many systems the work touches and how much of it is training
        or building. A founder working alone fits a 1-on-1 session. A dispatch office or a hotel front desk fits small group training for 2 to 8 people, and a half-day workshop covers up to 20.
      </p>

      <p>
        Custom software and automation get a written quote after the first conversation. The 
        <Link href="/ai-cost-calculator">AI cost calculator</Link> shows whether training pays
        for itself, using your team size, hourly cost and hours of manual work.
      </p>

      <h2>When is Purcell Ventures the wrong fit?</h2>

      <p>
        Purcell Ventures is one person. A plant, a hospital or a hotel group that needs a large
        team, a signed enterprise MSA or support around the clock should hire a bigger firm,
        and I will say so on the first call.
      </p>

      <p>
        If a free tool or software you already own covers the need, I show you how to set it
        up yourself, since that costs you less.
      </p>

      <h2>Who runs Purcell Ventures?</h2>

      <p>
        I do. I write the code, run the sessions and answer the email. I also built COSMIC, a
        station of 57 AI agents in 17 rooms that handles proposals, site audits, security
        checks, research and outreach for the company. The page on{" "}
        <Link href="/agentic-ai">autonomous AI agent systems</Link> covers how the agents work
        and what goes wrong with them in daily use.
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
        <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a> and tell me what your team is
        trying to do. The <Link href="/ai-readiness">AI readiness test</Link> scores your team
        out of 30 in about three minutes and asks for no email.
      </p>

      <p>
        Prices and services in full: <Link href="/ai-consulting">AI consulting</Link>. Other
        cities: <Link href="/ai-consulting/birmingham-al">Birmingham</Link>,{" "}
        <Link href="/ai-consulting/huntsville-al">Huntsville</Link> and{" "}
        <Link href="/ai-consulting/kennesaw-ga">Kennesaw</Link>.
      </p>
      <UpdatedLine path={PATH} bare />
      <PageDates path={PATH} />
    </PostLayout>
  );
}
