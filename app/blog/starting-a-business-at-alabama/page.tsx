import Link from "next/link";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";

export const metadata = {
  alternates: { canonical: "/blog/starting-a-business-at-alabama" },
  title: { absolute: "Starting a business as a University of Alabama student" },
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
        been running for over a year. Running it alongside classes has taught me where a
        student business should start and what slows it down.
      </p>

      <h2>Local businesses as customers</h2>

      <p>
        Campus is a walkable market of thirty-eight thousand people with predictable needs.
        Several hundred local businesses serve them, and their owners can say yes without a
        purchasing department.
      </p>

      <p>
        Most student businesses aim at the students. Fewer aim at local businesses, which
        often decide quickly and sit within walking distance.
      </p>

      <p>
        Students have little money and stop paying quickly. A local business with a specific
        problem is a better first customer, even though walking in to pitch one feels less
        comfortable.
      </p>

      <h2>Campus resources that help</h2>

      <p>
        Most &quot;resources for student entrepreneurs&quot; lists are competitions, and a competition
        does not bring you customers. These campus services help with running the business.
      </p>

      <p>
        <a href="https://writingcenter.ua.edu/" rel="noopener">The Writing Center</a> is free
        and will review a client proposal. You get fifty minutes of editing from somebody
        who reads your argument closely.
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
        Tuition already pays for more than this. See{" "}
        <Link href="/blog/free-at-alabama">the full list of what UA students already have</Link>.
      </p>

      <h2>Three mistakes that cost time</h2>

      <p>
        The first is building the setup instead of the business. It is easy to spend a term
        on the logo, the LLC, the site and the email signature and never send an invoice.
        Send the first invoice before you polish the logo. The LLC filing is one online
        form, and the steps are in{" "}
        <Link href="/blog/llc-at-seventeen">my post on filing an LLC at seventeen</Link>.
      </p>

      <p>
        The second is waiting for a term with more free time. Next semester will be as busy
        as this one, so a plan that needs two quiet weeks will not happen.
      </p>

      <p>
        The third is hiding that you are a student. Clients find out, and if they find out
        after deciding to trust you, it looks like you concealed it. Lead with the work and
        answer truthfully when asked.
      </p>

      <h2>Managing interruptions</h2>

      <p>
        Classes run on a fixed schedule, so they are easy to plan around. Interruptions are
        harder, such as a client message between two lectures or a call that cannot happen
        during a three-hour lab. The work itself fits in the week, but the interruptions can
        make a fourteen hour day feel like it produced nothing.
      </p>

      <p>
        What has worked for me is deciding in advance which hours belong to which, and
        telling clients when I answer. A client who knows you answer between four and six is
        better served than one who gets an instant reply half the time and silence the rest.
      </p>

      <h2>Finding your first problem to fix</h2>

      <p>
        Many local businesses have a specific problem you can see from outside and fix, and
        nobody has told them about it. Start with one of those before you invent a product.
      </p>

      <p>
        I audited 121 independent businesses within walking distance of campus and{" "}
        <Link href="/blog/121-businesses-near-campus">twenty-seven had a website that
        answered</Link>. That gave me a list of conversations I could have by walking in.
      </p>

      <p>
        <Link href="/blog/audit-every-business-in-your-town">The audit method</Link> is free
        to use and takes an afternoon.
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
