import Link from "next/link";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout, Note } from "@/app/components/ui";

export const metadata = {
  alternates: { canonical: "/blog/why-i-built-crm-from-scratch" },
  title: { absolute: "Why I built a CRM from scratch instead of paying HubSpot, by Elijah Purcell" },
  description: "HubSpot starts at $50 a month, and the features I needed put it at $200 to $400 a month. I built my own CRM in a week instead. The costs, what I gave up, and when you should not do this.",
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: "Why I built a CRM from scratch instead of paying HubSpot", href: "/blog/why-i-built-crm-from-scratch" },
      ]} />}
      kicker="Opinion"
      title="Why I built a CRM from scratch instead of paying for HubSpot"
      meta="25 May 2026, 5 minute read"
    >
      <p>When I set up sales at Purcell Ventures, HubSpot was the obvious choice, and it has a free tier.</p>

      <p>I evaluated HubSpot for two days and decided to build. The build took a week.</p>

      <h2>HubSpot pricing</h2>
      <p>
        The free tier excludes the features below. These are the plan prices HubSpot listed
        when I wrote this post in May 2026. Their current prices are{" "}
        <a href="https://www.hubspot.com/pricing/sales" rel="noopener">published here</a>.
      </p>

      <ul>
        <li>Custom properties beyond 5, at $50/mo (Starter)</li>
        <li>Workflow automation, at $890/mo (Marketing Hub Pro)</li>
        <li>Pipeline forecasting, at $720/mo (Sales Hub Pro)</li>
        <li>Custom reports, at $50/mo+</li>
        <li>API access beyond rate limits, at $720/mo</li>
      </ul>

      <p>
        I needed multi-rep visibility, AI-assisted next steps, custom contact stages, an
        activity timeline and email templates with tokens. That would have cost $200 to $400
        a month, or $2,400 to $4,800 a year.
      </p>

      <h2>What I built instead</h2>
      <p>
        One week of focused work produced a CRM with 6 views (List, Kanban, Tasks, Stats,
        Coach, Reps), per-rep auth, AI features specific to my workflow, and an activity log
        built around the sales conversations my reps and I have.
      </p>

      <p>
        The cost so far is $15 in Anthropic API usage for the AI features. There is no
        monthly subscription.
      </p>

      <h2>Why the math works</h2>
      <p>
        The usual objection is that a custom CRM takes more upkeep than HubSpot. For me it
        has taken less, for four reasons.
      </p>

      <ol>
        <li><strong>I control feature scope.</strong> When HubSpot adds features I don&apos;t need, its interface gets more complex. When I add a feature, the interface grows by that one feature.</li>
        <li><strong>I push fixes myself.</strong> If my CRM has a bug, I fix it the same day. If HubSpot has a bug in my workflow, I file a ticket and wait.</li>
        <li><strong>Integrations are small jobs.</strong> The Steady intake form and the /sales-rep form both create a CRM contact automatically. With HubSpot, that is either a paid feature at $50 a month or a Zapier connection at $30 a month plus API setup time.</li>
        <li><strong>AI features cost extra on third-party CRMs.</strong> HubSpot&apos;s AI features (Breeze) are tied to a $720 a month plan. Mine run on Claude Haiku at $0.001 per call.</li>
      </ol>

      <h2>What I gave up</h2>
      <p>Three things:</p>

      <ol>
        <li><strong>Polish.</strong> HubSpot looks more sophisticated. Mine looks like a small-team CRM, because that&apos;s what it is. It would matter if I needed to impress investors.</li>
        <li><strong>Mobile app.</strong> HubSpot has a native mobile app. Mine is a mobile-responsive web app, which works and is less smooth.</li>
        <li><strong>Ecosystem integrations.</strong> HubSpot integrates with hundreds of tools. Mine connects to the tools I choose to wire up. So far that has been enough.</li>
      </ol>

      <h2>When you should not do this</h2>

      <ul>
        <li><strong>If you don&apos;t code:</strong> use HubSpot.</li>
        <li><strong>If your team has more than 10 people:</strong> you need the permissions, audit logs and compliance features that commercial CRMs ship with, and building them costs far more.</li>
        <li><strong>If you need SOC 2 or HIPAA compliance:</strong> pay HubSpot or a similar vendor, because meeting those standards yourself is a large project.</li>
        <li><strong>If you have more than 1,000 contacts and a complex pipeline:</strong> the database work grows.</li>
        <li><strong>If you don&apos;t enjoy maintenance work:</strong> it will need maintenance now and then. If you hate that, pay someone else to do it.</li>
      </ul>

      <h2>When you should do this</h2>
      <ul>
        <li>You work alone or on a team of two or three</li>
        <li>You code (or have access to someone who does)</li>
        <li>Your workflow is non-standard and requires custom logic</li>
        <li>You care about owning your data</li>
        <li>You will run this business for a year or more, so the build cost spreads out</li>
        <li>You want to use AI in custom ways the SaaS CRMs don&apos;t support</li>
      </ul>

      <h2>A side benefit</h2>
      <p>
        Building my own CRM forced me to learn my sales process in detail, because I had to
        design every stage and field.
      </p>

      <h2>What this looks like in my shop</h2>
      <p>
        I packaged the system prompts, the reasoning behind the database schema and the
        operating handbook into the <Link href="/shop/starter-kit">$19 PV AI Starter Kit</Link>.
        It includes the prompts behind my CRM&apos;s AI features, and the kit runs on any AI tool
        you choose.
      </p>

      <p>
        If you want me to build a custom CRM for your business, see{" "}
        <Link href="/software">Custom Software</Link>. I would start from the patterns I used
        for my own.
      </p>

      <Note>I drafted this post with AI tools and edited it before publishing.</Note>

      <h2>Related reading</h2>
      <ul>
        <li><Link href="/blog/what-one-operator-can-deliver">What one operator can deliver</Link></li>
        <li><Link href="/blog/what-you-should-own">What you should own when a project finishes</Link></li>
      </ul>

      <PostByline post={{
        slug: "why-i-built-crm-from-scratch",
        title: "Why I built a CRM from scratch instead of paying for HubSpot",
        description: "HubSpot starts at $50 a month, and the features I needed put it at $200 to $400 a month. I built my own CRM in a week instead. The costs, what I gave up, and when you should not do this.",
        published: "2026-05-25",
      }} />
    </PostLayout>
  );
}
