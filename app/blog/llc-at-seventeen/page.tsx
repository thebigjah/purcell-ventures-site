import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout, Note } from "@/app/components/ui";
import PostByline from "@/app/components/PostByline";

export const metadata = {
  alternates: { canonical: "/blog/llc-at-seventeen" },
  title: { absolute: "What registering an LLC at seventeen involved, by Elijah Purcell" },
  description:
    "The steps I followed: the Georgia filing, the EIN, the bank account, the registered agent question, and renaming the company nine months later. It describes what I did and is not legal advice.",
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
        I filed the LLC as Zultar LLC with the Georgia Secretary of State on 8 April 2025,
        and renamed it Purcell Ventures LLC on 27 January 2026. The control number is
        25075361 and the filing is public, so anyone can check the names and dates.
      </p>

      <p>
        Most "how to start an LLC" pages online are written by companies that sell LLC
        formation, and they skip the parts that go badly, like the bank account and the
        rename.
      </p>

      <h2>The filing itself is the easy part</h2>

      <p>
        The filing is an online form with a name, an address, a registered agent and a
        fee. Choosing the name took me longer than filing it. You get a control number
        and a public record, and at that point the company exists.
      </p>

      <p>
        Most guides cover this step in detail, and for me the bank account was harder.
      </p>

      <h2>The registered agent and the public address</h2>

      <p>
        Somebody has to be the legal point of contact, and for a one-person company that
        is usually you. That address goes on a public filing.
      </p>

      <p>
        If you work from home, your home address becomes a searchable public record
        attached to your name. Commercial registered agent services exist for this
        reason, so choose the address on the filing deliberately.
      </p>

      <h2>The EIN takes ten minutes and is free</h2>

      <p>
        You get it directly from{" "}
        <a href="https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number" rel="noopener">the IRS</a>.
        Some sites charge for an EIN even though the IRS issues it free, so skip any page
        that asks for money.
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

      <h2>Renaming the company</h2>

      <p>
        I filed as Zultar LLC and amended the name to Purcell Ventures LLC on 27 January
        2026. The entity, the control number and the EIN stayed the same.
      </p>

      <p>
        Some people put off filing for months because they are afraid of picking the
        wrong name. A rename takes an amendment and a fee. You also have to update
        anything that carries the old name, and for a while the filing says one thing and
        half your accounts say another.
      </p>

      <p>
        <strong>What I would do differently:</strong> spend one afternoon on the name
        instead of one week, and then file, because a wrong name only costs an amendment.
      </p>

      <h2>What the LLC does and does not do for you</h2>

      <p>
        It gives you a legal entity that can hold a bank account, sign a contract, and
        invoice a client. For most small operations that is most of the value.
      </p>

      <p>
        Clients rarely check your filing, and they judge you by whether you answer the
        phone, send correct invoices and deliver by the date you said.
      </p>

      <p>
        The LLC does not protect you from your own conduct, and it comes with obligations:
        annual registration, keeping the company's money separate from yours, and filing
        things on time.
      </p>

      <h2>The sequence I followed</h2>

      <ol>
        <li>Decide the name in an afternoon.</li>
        <li>File with your Secretary of State.</li>
        <li>Get the EIN from the IRS, free, same week.</li>
        <li>Open the bank account. Budget more time than the filing and the EIN took combined.</li>
        <li>Send an invoice to somebody, because none of the above is tested until money moves through the account.</li>
      </ol>

      <p>
        I would stress that last step most to anybody doing this young, because it is easy
        to spend months on paperwork before sending a single invoice.
      </p>

      <p>
        Purcell Ventures now builds websites, AI tools and custom software for small
        businesses. You can read more in{" "}
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
