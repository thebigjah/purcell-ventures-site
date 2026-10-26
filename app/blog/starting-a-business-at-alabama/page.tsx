import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata = {
  alternates: { canonical: "/blog/starting-a-business-at-alabama" },
  title: { absolute: "Starting a business as a University of Alabama student, by Elijah Purcell" },
  description:
    "What helps a student running a business at UA: the campus resources that apply, why your first customer should be a local business, and three mistakes that cost time.",
};

const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "25px", fontWeight: 600, lineHeight: 1.2, margin: "40px 0 10px" } as const;
const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: "Starting a business at Alabama", href: "/blog/starting-a-business-at-alabama" },
        ]} />

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Business, August 20, 2026, 7 min read</div>
          <h1>
            Starting a business as a{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>student</em> at Alabama
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            I arrived at the University of Alabama in August 2026 with a company I had
            already been running for over a year. What follows covers running a company
            while enrolled.
          </p>

          <h2 style={H2}>An advantage most student businesses skip</h2>

          <p>
            You are surrounded by a concentrated, walkable market of thirty-eight thousand
            people with predictable needs and no purchasing bureaucracy, and by several
            hundred local businesses who serve them.
          </p>

          <p>
            Most student businesses aim at the students. Fewer aim at the businesses, and
            local businesses often decide quickly and you can walk in.
          </p>

          <p>
            Your first customer should probably be a local business. Students have little
            money and churn quickly. A local business with a specific problem is a better
            first customer, even though approaching one feels less comfortable.
          </p>

          <h2 style={H2}>The campus resources that apply</h2>

          <p>
            Most "resources for student entrepreneurs" lists are competitions, and a
            competition does not bring you customers. These are the ones that help with
            running a business.
          </p>

          <p>
            <a href="https://writingcenter.ua.edu/" style={link} rel="noopener">The Writing Center</a>{" "}
            is free, and a proposal is writing. You get fifty minutes of free editing from
            somebody who has to read your argument closely.
          </p>

          <p>
            The Speaking Studio is available if you are going to pitch.
          </p>

          <p>
            University Libraries give you database access that costs money outside a
            university. Use it when you need to understand an industry you are selling into.
          </p>

          <p>
            Some programs offer seed grants. New College's Levitetz Leadership Program offers
            them alongside workshops and internships. Read the criteria before
            you assume you do not qualify.
          </p>

          <p>
            The full list of what is already covered by tuition is{" "}
            <Link href="/blog/free-at-alabama" style={link}>here</Link>.
          </p>

          <h2 style={H2}>Three mistakes that cost time</h2>

          <p>
            The first is building the setup instead of the business. It is easy to spend a
            term on the logo, the LLC, the site and the email signature and never send an
            invoice. Send the first invoice before you polish the logo.{" "}
            <Link href="/blog/llc-at-seventeen" style={link}>Here is what the filing
            involves</Link>. It takes less work than most people expect.
          </p>

          <p>
            The second is waiting for a term with more free time. The schedule you have this
            semester is the schedule you will have, and a plan that needs a quiet
            fortnight will not happen.
          </p>

          <p>
            The third is hiding that you are a student. Clients find out, and if they find
            out after deciding to trust you, it looks like you concealed it. Lead with the
            work and answer truthfully when asked.
          </p>

          <h2 style={H2}>What competes for your hours</h2>

          <p>
            Classes are scheduled and finite, so they are easy to plan around.
          </p>

          <p>
            Interruptions compete for your hours. A client message at eleven in the morning
            between two lectures, a bug at nine at night, a call that cannot happen in a
            three-hour lab. The work itself fits. The interruptions are what make a fourteen
            hour day feel like it produced nothing.
          </p>

          <p>
            What has worked for me is deciding in advance which hours belong to which, and
            telling clients when I answer. A client who knows you answer between four and six is better served
            than one who gets an instant reply half the time and silence the rest.
          </p>

          <h2 style={H2}>Start with something that already exists</h2>

          <p>
            The best opening for a student here is that a lot of local businesses have a
            specific problem you can see from outside and fix, and no one has told them.
            Start with that problem on a local business, before you start on an idea.
          </p>

          <p>
            I audited 121 independent businesses within walking distance of campus and{" "}
            <Link href="/blog/121-businesses-near-campus" style={link}>twenty-seven had a
            website that answered</Link>. That gave me a list of conversations I could have
            by walking in.
          </p>

          <p>
            <Link href="/blog/audit-every-business-in-your-town" style={link}>The method is
            published</Link>, free, and takes an afternoon.
          </p>

          <PostByline post={{
            slug: "starting-a-business-at-alabama",
            title: "Starting a business as a student at Alabama",
            description: "The campus resources that apply, why your first customer should be a local business, and three mistakes that cost time.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
