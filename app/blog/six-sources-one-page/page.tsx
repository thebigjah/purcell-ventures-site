import Link from "next/link";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";

export const metadata = {
  alternates: { canonical: "/blog/six-sources-one-page" },
  title: { absolute: "Building a campus events site from six sources, by Elijah Purcell" },
  description:
    "How UA Today combines six separate feeds of University of Alabama events into one page, why the hard part is detecting a source that stops sending events without raising an error, and what a floor check is.",
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: "Building a campus events site from six sources", href: "/blog/six-sources-one-page" },
      ]} />}
      kicker="Engineering"
      title="Building a campus events site from six sources"
      meta="20 August 2026, 7 minute read"
    >
      <p>
        At a large university, events are listed in separate systems. At Alabama, the
        official calendar, department pages, student organisations&apos; social accounts and
        athletics each list their own. A student who wants to know what is happening
        tonight has to check several places, and many do not bother.
      </p>

      <p>
        <a href="https://ua-today.vercel.app">UA Today</a> pulls events from 6 sources on a
        schedule and shows them on one page. The hardest part of the build was detecting a
        source that stops sending events.
      </p>

      <h2>Combining the feeds</h2>

      <p>
        Fetching and normalising six feeds took a day of work. The feeds use different date
        formats, describe locations differently, and disagree on whether a recurring event
        is one record or forty.
      </p>

      <h2>Detecting a source that stops without an error</h2>

      <p>A source that returns an error is easy to catch, because you see the error and fix it.</p>

      <p>
        A source that returns <em>an empty list</em>, with a 200 status and a well-formed
        response, is harder to catch. Somebody renames a query parameter over winter break.
        The feed still answers with nothing, your site shows fewer events, and nobody
        notices because a broken feed looks like a quiet week on campus.
      </p>

      <p>
        Most of the bugs I wrote about this year fail the same way:{" "}
        <Link href="/blog/canonical-tag-noindex">a canonical tag telling Google to skip nine
        pages</Link>, and{" "}
        <Link href="/blog/what-the-agents-get-wrong">eleven agents that were never being
        invoked while the runner exited zero</Link>. Nothing raises an error because the
        failure is missing data.
      </p>

      <h2>Floor checks</h2>

      <p>
        The fix is to assert a minimum event count. Each source declares how many events it
        should plausibly produce, and returning fewer is a failure even when the request
        succeeded.
      </p>

      <pre><code>{`const SOURCES = [
  { name: "official",    floor: 40 },
  { name: "student org", floor: 20 },
  // ...
];`}</code></pre>

      <p>
        The floor is loose enough to pass a slow week and still catch a source that returns
        a 200 status with nothing in it. A health endpoint reports each source with its
        count and its response time, and the morning check reads that endpoint to see
        whether the job produced events.
      </p>

      <p>
        Choosing the number is a judgement call. A floor set too high fires on every quiet
        week, people learn to ignore it, and the alert that matters gets ignored with the
        rest.
      </p>

      <h2>Moderation and the unofficial notice</h2>

      <p>
        The first is a moderation queue. Anyone can submit an event, and nothing appears
        until a person reviews it. For a site with a university&apos;s name near it, the cost
        of one bad listing is much higher than the cost of a slower pipeline.
      </p>

      <p>
        The second is a notice in the masthead that the site is unofficial. It goes on the
        first screen. It says the site is a student project, it is not affiliated with the
        university, and event details are collected automatically and can be wrong.
      </p>

      <h2>What I would do differently</h2>

      <p>
        I would write the floor checks first. I added them only after a source went quiet,
        and until then I was trusting a status report I had never tested.
      </p>

      <p>
        Students use an events site only if they trust its listings, and a student who
        finds one wrong listing may stop coming back. That is why most of the work in the
        build went into getting the listings right.
      </p>

      <PostByline post={{
        slug: "six-sources-one-page",
        title: "Building a campus events site from six sources",
        description: "How UA Today combines six feeds into one page, and why the hard part is detecting a source that stops sending events without raising an error.",
        published: "2026-08-20",
      }} />
    </PostLayout>
  );
}
