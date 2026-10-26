import Link from "next/link";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";

export const metadata = {
  alternates: { canonical: "/blog/what-you-should-own" },
  title: { absolute: "What you should own at the end of a website project, by Elijah Purcell" },
  description:
    "The seven accounts and assets that should be in your name when a web project finishes, why the domain matters most, and the two questions to ask before you sign anything.",
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: "What you should own", href: "/blog/what-you-should-own" },
      ]} />}
      kicker="Business"
      title="What you should own at the end of a project"
      meta="20 August 2026, 6 minute read"
    >
      <p>
        Before you sign for a website, ask who will own each account and asset when the
        project ends, because most proposals do not say.
      </p>

      <p>
        I build websites, and I want my clients to own all of it. I would rather a client
        stay because the work is good than because leaving is hard.
      </p>

      <h2>Seven accounts and assets to own</h2>

      <table>
        <thead>
          <tr><th>Asset</th><th>Why it matters</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>The domain</strong></td><td>Registered to you, in an account you can log into. Providers often register it in their own name.</td></tr>
          <tr><td><strong>Hosting</strong></td><td>An account in your name, with your billing on it. A sub-account inside a provider&apos;s reseller plan leaves them in control of it.</td></tr>
          <tr><td><strong>The code</strong></td><td>A repository you have access to, or at minimum a copy of the files delivered to you at launch.</td></tr>
          <tr><td><strong>The content management login</strong></td><td>An administrator account. An editor account cannot export the site or add users.</td></tr>
          <tr><td><strong>Google Business Profile</strong></td><td>Yours, in your own Google account.</td></tr>
          <tr><td><strong>Analytics</strong></td><td>Your property, with the provider added as a user. The reverse arrangement means your traffic history leaves with them.</td></tr>
          <tr><td><strong>Email at the domain</strong></td><td>Under your control, because losing it means losing password resets for everything else on this list.</td></tr>
        </tbody>
      </table>

      <h2>Why the domain comes first</h2>

      <p>
        You can replace everything else with some effort. Code can be rebuilt, hosting can
        move in a day, and you can recover from losing analytics history.
      </p>

      <p>
        Your email, your printed materials and the address customers type all depend on the
        domain. If your provider holds it, you cannot leave without their cooperation.
      </p>

      <p>
        Providers usually register it in their own name because that was faster during
        setup, and then nobody changes it for years. Ask early, and a good provider will
        transfer it.
      </p>

      <h2>Two questions before you sign</h2>

      <p>
        <strong>&quot;When we finish, which of these will be in my name?&quot;</strong> Ask it about
        the list above, specifically, and get the answer in writing. The answer should be
        all of them.
      </p>

      <p>
        <strong>&quot;If I wanted to move to another provider next year, what would that
        involve?&quot;</strong> The answer you want is a description of a process. The answer
        that should worry you is reassurance that you would not want to.
      </p>

      <h2>What a provider can reasonably keep</h2>

      <p>
        Providers can reasonably keep their own internal tooling, their project management
        system, and any general-purpose components they built before you and will use again
        after you. Reusing components is normal, and it keeps prices down.
      </p>

      <p>
        They should not keep your domain, your listing, your analytics history, or a content
        management system you cannot administer. If something is specific to{" "}
        <em>your business</em>, it should be yours.
      </p>

      <h2>If you are already in this situation</h2>

      <p>
        Ask for the transfer plainly. Most providers will do it, and some never realised the
        client wanted it.
      </p>

      <p>
        If the provider resists, you have learned what kind of provider you hired before any
        dispute starts. A domain can be recovered through the registrar&apos;s own transfer
        process in most cases, and it is much easier while the relationship is still
        cordial.
      </p>

      <p>
        Related, on choosing between a solo operator and an agency and what to ask either:{" "}
        <Link href="/blog/what-one-operator-can-deliver">what one operator can deliver</Link>,
        and <Link href="/blog/what-a-website-actually-costs">what a website costs</Link>.
      </p>

      <PostByline post={{
        slug: "what-you-should-own",
        title: "What you should own at the end of a website project",
        description: "The seven accounts and assets that should be in your name, and the two questions to ask before you sign anything.",
        published: "2026-08-20",
      }} />
    </PostLayout>
  );
}
