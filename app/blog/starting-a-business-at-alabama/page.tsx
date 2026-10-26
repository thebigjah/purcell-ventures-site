import Link from "next/link";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";

export const metadata = {
  alternates: { canonical: "/blog/starting-a-business-at-alabama" },
  title: { absolute: "Starting a business as a University of Alabama student, by Elijah Purcell" },
  description:
    "What helps a student running a business at UA: the campus resources that apply, why your first customer should be a local business, and three mistakes that cost time.",
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: "Starting a business at Alabama", href: "/blog/starting-a-business-at-alabama" },
      ]} />}
      kicker="Business"
      title="Starting a business as a student at Alabama"
      meta="20 August 2026, 7 minute read"
    >
      <p>
        I arrived at the University of Alabama in August 2026 with a company I had already
        been running for over a year. What follows covers running a company while enrolled.
      </p>

      <h2>An advantage most student businesses skip</h2>

      <p>
        You are surrounded by a concentrated, walkable market of thirty-eight thousand people
        with predictable needs and no purchasing bureaucracy, and by several hundred local
        businesses who serve them.
      </p>

      <p>
        Most student businesses aim at the students. Fewer aim at local businesses, which
        often decide quickly and sit within walking distance.
      </p>

      <p>
        Your first customer should be a local business. Students have little money and churn
        quickly. A local business with a specific problem is a better first customer, even
        though approaching one feels less comfortable.
      </p>

      <h2>The campus resources that apply</h2>

      <p>
        Most &quot;resources for student entrepreneurs&quot; lists are competitions, and a competition
        does not bring you customers. These are the ones that help with running a business.
      </p>

      <p>
        <a href="https://writingcenter.ua.edu/" rel="noopener">The Writing Center</a> is free,
        and a proposal is writing. You get fifty minutes of free editing from somebody who
        has to read your argument closely.
      </p>

      <p>The Speaking Studio is available if you are going to pitch.</p>

      <p>
        University Libraries give you database access that costs money outside a university.
        Use it when you need to understand an industry you are selling into.
      </p>

      <p>
        Some programs offer seed grants. New College&apos;s Levitetz Leadership Program offers
        them alongside workshops and internships. Read the criteria before you assume you do
        not qualify.
      </p>

      <p>
        Tuition already covers more than this. The full list is{" "}
        <Link href="/blog/free-at-alabama">here</Link>.
      </p>

      <h2>Three mistakes that cost time</h2>

      <p>
        The first is building the setup instead of the business. It is easy to spend a term
        on the logo, the LLC, the site and the email signature and never send an invoice.
        Send the first invoice before you polish the logo.{" "}
        <Link href="/blog/llc-at-seventeen">Here is what the filing involves</Link>. The
        filing is an online form.
      </p>

      <p>
        The second is waiting for a term with more free time. The schedule you have this
        semester is the schedule you will have, and a plan that needs a quiet fortnight will
        not happen.
      </p>

      <p>
        The third is hiding that you are a student. Clients find out, and if they find out
        after deciding to trust you, it looks like you concealed it. Lead with the work and
        answer truthfully when asked.
      </p>

      <h2>What competes for your hours</h2>

      <p>Classes are scheduled and finite, so they are easy to plan around.</p>

      <p>
        Interruptions are what compete. A client message at eleven in the morning between two
        lectures, a bug at nine at night, a call that cannot happen in a three-hour lab. The
        work itself fits. The interruptions are what make a fourteen hour day feel like it
        produced nothing.
      </p>

      <p>
        What has worked for me is deciding in advance which hours belong to which, and
        telling clients when I answer. A client who knows you answer between four and six is
        better served than one who gets an instant reply half the time and silence the rest.
      </p>

      <h2>A problem that already exists is the best place to start</h2>

      <p>
        The best opening for a student here is that many local businesses have a specific
        problem you can see from outside and fix, and nobody has told them. Begin with one
        of those problems before you invent an idea.
      </p>

      <p>
        I audited 121 independent businesses within walking distance of campus and{" "}
        <Link href="/blog/121-businesses-near-campus">twenty-seven had a website that
        answered</Link>. That gave me a list of conversations I could have by walking in.
      </p>

      <p>
        <Link href="/blog/audit-every-business-in-your-town">The method is published</Link>,
        free, and takes an afternoon.
      </p>

      <PostByline post={{
        slug: "starting-a-business-at-alabama",
        title: "Starting a business as a student at Alabama",
        description: "The campus resources that apply, why your first customer should be a local business, and three mistakes that cost time.",
        published: "2026-08-20",
      }} />
    </PostLayout>
  );
}
