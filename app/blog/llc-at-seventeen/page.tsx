import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout, Note } from "@/app/components/ui";
import PostByline from "@/app/components/PostByline";

export const metadata = {
  alternates: { canonical: "/blog/llc-at-seventeen" },
  title: { absolute: "What registering an LLC at seventeen involved, by Elijah Purcell" },
  description:
    "The steps I followed: the Georgia filing, the EIN, the bank account, the registered agent question, and renaming the company nine months later. A description of what I did and not legal advice.",
};


export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: "What registering an LLC at seventeen involved", href: "/blog/llc-at-seventeen" },
      ]} />}
      kicker="Business"
      title="What registering an LLC at seventeen involved"
      meta="20 August 2026, 6 minute read"
    >
      <Note>
        I am not a lawyer or an accountant. This describes what I did in one state, in
        2025, at one age, and is not legal advice. Rules differ by state and change,
        and the parts that involve money and taxes are worth twenty minutes with somebody
        qualified.
      </Note>

      <p>
        I filed Purcell Ventures with the Georgia Secretary of State on 8 April 2025.
        The control number is 25075361 and the filing is public, so everything below is
        checkable.
      </p>

      <p>
        The internet is full of "how to start an LLC" pages written by companies that
        sell LLC formation. This post includes the parts that went badly.
      </p>

      <h2>The filing itself is the easy part</h2>

      <p>
        An online form, a name, an address, a registered agent, and a fee. It takes
        longer to choose the name than to file it. You get a control number and a public
        record, and at that point the company exists.
      </p>

      <p>
        Most guides cover this step in detail. The bank account, later in this post, was
        harder.
      </p>

      <h2>The registered agent is you, and that has an address consequence</h2>

      <p>
        Somebody has to be the legal point of contact, and for a one-person company that
        is usually you. That address goes on a public filing.
      </p>

      <p>
        If you work from home, your home address becomes a searchable public record
        attached to your name. Decide on purpose which address goes on the filing.
        Commercial registered agent services exist for this reason.
      </p>

      <h2>The EIN takes ten minutes and is free</h2>

      <p>
        You get it directly from{" "}
        <a href="https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number" rel="noopener">the IRS</a>.
        Some sites charge for an EIN, which the IRS issues free. If a page wants money for
        an EIN, close the page.
      </p>

      <h2>The bank account is the hardest part</h2>

      <p>
        Banks have their own policies about account holders under eighteen, and those
        policies are separate from state law about whether a minor can form an LLC.
        Branch policies varied, and one branch told me yes on the phone and no at the
        desk.
      </p>

      <p>
        Call first, ask specifically about a business account for an LLC whose member is
        under eighteen, and be prepared to try more than one institution. Bring the
        filing, the EIN letter and your identification, and expect to explain the company
        in one sentence to somebody who has not encountered this before.
      </p>

      <p>
        Until the bank account opens, you cannot get paid or keep the company&apos;s money
        separate from yours.
      </p>

      <h2>You can rename it later, and I did</h2>

      <p>
        I filed as Zultar LLC. On 27 January 2026 I amended it to Purcell Ventures LLC.
        Same entity, same control number, same EIN, new name.
      </p>

      <p>
        This is worth knowing because the fear of choosing the wrong name stops people
        for months. A rename is an amendment and a fee. It also means you have to update
        anything that carries the old name, and for a while the filing says one thing and
        half your accounts say another.
      </p>

      <p>
        <strong>What I would do differently:</strong> spend one afternoon on the name
        rather than one week, and then file. The cost of the wrong name is an amendment.
        The cost of not filing is every month you did not have a company.
      </p>

      <h2>What the LLC does and does not do for you</h2>

      <p>
        It gives you a legal entity that can hold a bank account, sign a contract, and
        invoice a client. For most small operations that is most of the value.
      </p>

      <p>
        Clients rarely check your filing. They judge you by whether you answer the phone,
        send correct invoices and deliver by the date you said.
      </p>

      <p>
        It also does not protect you from your own conduct, and it comes with obligations:
        annual registration, keeping the company's money separate from yours, and filing
        things on time.
      </p>

      <h2>The sequence I followed</h2>

      <ol>
        <li>Decide the name in an afternoon.</li>
        <li>File with your Secretary of State.</li>
        <li>Get the EIN from the IRS, free, same week.</li>
        <li>Open the bank account. Budget more time than the filing and the EIN took combined.</li>
        <li>Send an invoice to somebody. Until money has moved through it, none of the above has been tested.</li>
      </ol>

      <p>
        I would stress that last step most to anybody doing this young. It is easy to
        spend months on paperwork and never once run the business the paperwork exists for.
      </p>

      <p>
        More about what the company does is on{" "}
        <Link href="/what-is-purcell-ventures">What is Purcell Ventures</Link>.
      </p>

<PostByline post={{
            slug: "llc-at-seventeen",
            title: "What registering an LLC at seventeen involved",
            description: "The Georgia filing, the EIN, the bank account, and renaming the company nine months later.",
            published: "2026-08-20",
          }} />


    </PostLayout>
  );
}
