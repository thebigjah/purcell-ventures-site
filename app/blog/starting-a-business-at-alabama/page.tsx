import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata = {
  alternates: { canonical: "/blog/starting-a-business-at-alabama" },
  title: { absolute: "Starting a business as a University of Alabama student | Elijah Purcell" },
  description:
    "What actually helps a student running a business at UA: the campus resources that apply, why your first customer should not be a student, and the three mistakes that cost the most time.",
};

const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "25px", fontWeight: 600, lineHeight: 1.2, margin: "40px 0 10px" } as const;
const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: "Starting a business at Alabama", href: "/blog/starting-a-business-at-alabama" },
        ]} />

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Business · August 20, 2026 · 7 min read</div>
          <h1>
            Starting a business as a{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>student</em> at Alabama
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            I arrived at the University of Alabama in August 2026 with a company I had
            already been running for over a year. That is a slightly unusual starting
            position, and it means what follows is about the collision between the two rather
            than a plan for launching something.
          </p>

          <h2 style={H2}>The advantage nobody uses</h2>

          <p>
            You are surrounded by a concentrated, walkable market of thirty-eight thousand
            people with predictable needs and no purchasing bureaucracy, and by several
            hundred local businesses who serve them.
          </p>

          <p>
            Almost every student business aims at the students. Very few aim at the
            businesses, and the businesses have money, decide quickly, and are dramatically
            easier to reach: you walk in.
          </p>

          <p>
            <strong>Your first customer probably should not be a student.</strong> Students
            are broke, price-sensitive, and hard to charge repeatedly. A local business with
            a real problem is a better first customer in every dimension except how
            comfortable it feels to approach one.
          </p>

          <h2 style={H2}>The campus resources that actually apply</h2>

          <p>
            Most "resources for student entrepreneurs" lists are competitions. Competitions
            are fine and they are not customers. The ones that transfer directly to running
            something:
          </p>

          <p>
            <strong><a href="https://writingcenter.ua.edu/" style={link} rel="noopener">The Writing Center</a>.</strong>{" "}
            Free, and a proposal is writing. Fifty minutes with somebody who has to read your
            argument closely is the cheapest editing anywhere, and almost nobody brings
            commercial writing to it.
          </p>

          <p>
            <strong>The Speaking Studio.</strong> If you are going to pitch, this exists and
            is almost unused.
          </p>

          <p>
            <strong>University Libraries.</strong> Database access that costs real money
            outside a university, useful the moment you need to understand an industry you
            are selling into.
          </p>

          <p>
            <strong>Seed grants where they exist.</strong> New College's Levitetz Leadership
            Program offers them alongside workshops and internships. Read the criteria before
            you assume you do not qualify.
          </p>

          <p>
            The full list of what is already covered by tuition is{" "}
            <Link href="/blog/free-at-alabama" style={link}>here</Link>.
          </p>

          <h2 style={H2}>Three mistakes that cost the most time</h2>

          <p>
            <strong>Building the apparatus instead of the business.</strong> It is very easy
            to spend a term on the logo, the LLC, the site and the email signature and never
            once send an invoice. The company does not exist until money has moved through
            it.{" "}
            <Link href="/blog/llc-at-seventeen" style={link}>What the filing actually
            involves is here</Link>, and it is a smaller task than the anxiety around it.
          </p>

          <p>
            <strong>Waiting for a term with more time in it.</strong> There is not one. The
            schedule you have this semester is roughly the schedule you will have, and a
            plan that requires a quiet fortnight is a plan that does not run.
          </p>

          <p>
            <strong>Hiding that you are a student.</strong> It comes out. Discovered after
            somebody has decided to trust you, it reads as concealment rather than as
            something you did not lead with. Lead with the work, answer honestly when asked,
            and the question stops mattering.
          </p>

          <h2 style={H2}>What actually competes for your hours</h2>

          <p>
            Not classes. Classes are scheduled and finite.
          </p>

          <p>
            What competes is the fragmentation: a client message at eleven in the morning
            between two lectures, a bug at nine at night, a call that cannot happen in a
            three-hour lab. The work itself fits. The interruptions are what make a fourteen
            hour day feel like it produced nothing.
          </p>

          <p>
            The only thing that has worked for me is deciding in advance which hours belong
            to which, and telling clients when I answer rather than being available
            constantly. A client who knows you answer between four and six is better served
            than one who gets an instant reply half the time and silence the rest.
          </p>

          <h2 style={H2}>Start with something that already exists</h2>

          <p>
            The highest-leverage thing available to a student here is that a lot of local
            businesses have a specific, visible, fixable problem and no one has told them.
            Not an idea. A problem, on a real business, that you can see from outside.
          </p>

          <p>
            I audited 121 independent businesses within walking distance of campus and{" "}
            <Link href="/blog/121-businesses-near-campus" style={link}>twenty-seven had a
            website that answered</Link>. That is not a market analysis, it is a list of
            conversations available to anyone willing to walk in.
          </p>

          <p>
            <Link href="/blog/audit-every-business-in-your-town" style={link}>The method is
            published</Link>, free, and takes an afternoon.
          </p>

          <PostFaq qa={[
            ["Can you run a business while attending the University of Alabama?",
             "Yes, and what competes for the hours is not classes, which are scheduled and finite. It is fragmentation: a client message between lectures, a bug at nine at night, a call that cannot happen during a three-hour lab. Deciding in advance which hours belong to which, and telling clients when you answer rather than being constantly available, is what makes it workable."],
            ["What campus resources help a student running a business?",
             "The ones that transfer directly rather than the competitions. The Writing Center, because a proposal is writing and the consultation is free. The Speaking Studio if you are going to pitch. University Libraries for industry databases that cost real money outside a university. And seed grants where they exist, including through New College's Levitetz Leadership Program."],
            ["Who should a student business sell to first?",
             "Usually not other students. Students are broke, price-sensitive and hard to charge repeatedly. Local businesses have money, decide quickly, and are far easier to reach, because you can walk in. Almost every student business aims at students and very few aim at the businesses serving them."],
            ["Should a student hide that they are a student from clients?",
             "No. It comes out, and discovered after somebody has decided to trust you it reads as concealment rather than as something you did not lead with. Lead with the specific work, answer honestly when asked, and by the time it comes up the relevant question has already been settled."],
          ]} />

          <PostByline post={{
            slug: "starting-a-business-at-alabama",
            title: "Starting a business as a student at Alabama",
            description: "The campus resources that apply, why your first customer should not be a student, and the three mistakes that cost the most time.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
