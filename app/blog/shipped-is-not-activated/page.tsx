import Link from "next/link";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";

export const metadata = {
  alternates: { canonical: "/blog/shipped-is-not-activated" },
  title: { absolute: "A shipped site can still fail to take a payment, by Elijah Purcell" },
  description:
    "A site can be live with every deploy check passing and still unable to accept a dollar. Usually one path is broken, and the owner never sees it because they already know where the checkout is.",
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: "A shipped site can still fail to take a payment", href: "/blog/shipped-is-not-activated" },
      ]} />}
      kicker="Opinion"
      title="A shipped site can still fail to take a payment"
      meta="17 August 2026, 3 minute read"
    >
      <p>
        A checkout button sits three clicks deep, behind a menu labeled Services, under a
        tab few visitors open. The site is live and cannot take a payment.
      </p>

      <p>
        Ask one question of everything you&apos;ve shipped: can a stranger pay for this today?
        Ask it about a visitor who found the page cold, decided quickly and reached for a
        card. Leave out the warm lead who already emailed you.
      </p>

      <h2>Small failures go unfixed</h2>

      <p>
        Most launched sites fail that question in small ways. A payment link still carries a
        placeholder token from testing, so it loads and looks finished but takes no money. A
        pricing page lists tiers with no way to select one. A form collects an email and
        promises a follow-up that never got automated.
      </p>

      <p>
        None of that shows up in a deploy log, where every check passes. The gap between a
        finished site and a working business is usually one broken path, and it stays broken
        because the owner can&apos;t see it from the inside. You know where the checkout is, so
        you never go looking for it.
      </p>

      <h2>Why nobody catches it</h2>

      <p>
        Building and buying are different jobs, and few owners do the second one on their
        own site. The person who built it tests that the page renders. Few people test that
        a stranger can complete a purchase, because that means spending money on yourself,
        and that feels absurd.
      </p>

      <p>So the check never happens, and the site sits there for months looking finished.</p>

      <h2>The check itself</h2>

      <p>
        Open your own site in a private window. Start from wherever a stranger would land,
        which is often a different page from the one you&apos;re proud of. Try to buy from
        yourself. Note where you stall.
      </p>

      <p>
        Write down every place you had to already know something to keep going. That list is
        the gap between shipped and activated. A clear path from the homepage to the payment
        usually fixes it, with no redesign needed.
      </p>

      <h2>Related reading</h2>
      <ul>
        <li><Link href="/blog/121-businesses-near-campus">The same gap, measured across 121 businesses near campus</Link></li>
        <li><Link href="/blog/is-your-business-invisible">A ten-minute self-check for whether yours is one of them</Link></li>
      </ul>

      <PostByline post={{
        slug: "shipped-is-not-activated",
        title: "A shipped site can still fail to take a payment",
        description: "A site can be live with every deploy check passing and still unable to accept a dollar. Usually one path is broken, and the owner never sees it because they already know where the checkout is.",
        published: "2026-08-17",
      }} />
    </PostLayout>
  );
}
