import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata = {
  alternates: { canonical: "/blog/llc-at-seventeen" },
  title: "What registering an LLC at seventeen actually involved | Elijah Purcell",
  description:
    "The real sequence: the Georgia filing, the EIN, the bank account that is the actual hard part, the registered agent question, and renaming the company nine months later. What I did, not legal advice.",
};

const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "25px", fontWeight: 600, lineHeight: 1.2, margin: "42px 0 10px" } as const;
const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };
const box: React.CSSProperties = {
  background: "rgba(0,0,0,0.22)", borderTop: "2px solid rgba(212,175,55,0.4)",
  padding: "16px 18px", margin: "18px 0", fontSize: "15px",
};

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: "What registering an LLC at seventeen actually involved", href: "/blog/llc-at-seventeen" },
        ]} />
        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Business · August 20, 2026 · 6 min read</div>
          <h1>
            What registering an LLC at{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>seventeen</em> actually involved
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <div style={box}>
            I am not a lawyer or an accountant and this is not advice. It is a description of
            what I did in one state, in 2025, at one age. Rules differ by state and change,
            and the parts that involve money and taxes are worth twenty minutes with somebody
            qualified.
          </div>

          <p style={{ fontSize: "18px" }}>
            I filed Purcell Ventures with the Georgia Secretary of State on 8 April 2025.
            Control number 25075361, and the filing is public, which is the point of this
            post: everything below is checkable.
          </p>

          <p>
            The internet is full of "how to start an LLC" pages written by companies that
            sell LLC formation. This is the version with the awkward parts left in.
          </p>

          <h2 style={H2}>The filing itself is the easy part</h2>

          <p>
            An online form, a name, an address, a registered agent, and a fee. It takes
            longer to choose the name than to file it. You get a control number and a public
            record, and at that point the company exists.
          </p>

          <p>
            The reason people find this step intimidating is that it is the only step anybody
            writes about, so it absorbs all the anxiety that actually belongs to the next
            three.
          </p>

          <h2 style={H2}>The registered agent is you, and that has an address consequence</h2>

          <p>
            Somebody has to be the legal point of contact, and for a one-person company that
            is usually you. The consequence nobody mentions: that address goes on a public
            filing.
          </p>

          <p>
            If you work from home, your home address becomes a searchable public record
            attached to your name. That is not a reason not to do it, but it is a decision
            rather than a checkbox, and it is worth making deliberately. Commercial
            registered agent services exist for exactly this reason.
          </p>

          <h2 style={H2}>The EIN takes ten minutes and is free</h2>

          <p>
            Directly from{" "}
            <a href="https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number" style={link} rel="noopener">the IRS</a>.
            There is an entire industry charging for this and it is free and it is fast. If a
            page wants money for an EIN, close the page.
          </p>

          <h2 style={H2}>The bank account is the actual hard part</h2>

          <p>
            This is the step that stops people, and it is the one the formation companies do
            not warn you about.
          </p>

          <p>
            Banks have their own policies about account holders under eighteen, and those
            policies are not the same as state law about whether a minor can form an LLC.
            Some branches will open a business account for a minor-owned entity. Some will
            not. Some will say yes on the phone and no at the desk, because the person on the
            phone and the person at the desk are reading different documents.
          </p>

          <p>
            Call first, ask specifically about a business account for an LLC whose member is
            under eighteen, and be prepared to try more than one institution. Bring the
            filing, the EIN letter and your identification, and expect to explain the company
            in one sentence to somebody who has not encountered this before.
          </p>

          <p>
            Until this step is done, you do not really have a business. You have a filing.
            Everything downstream, invoicing, getting paid, keeping your money separate from
            the company's, depends on it.
          </p>

          <h2 style={H2}>You can rename it later, and I did</h2>

          <p>
            I filed as Zultar LLC. On 27 January 2026 I amended it to Purcell Ventures LLC.
            Same entity, same control number, same EIN, new name.
          </p>

          <p>
            This is worth knowing because the fear of choosing the wrong name stops people
            for months. It is an amendment and a fee. What it is not is free of consequences:
            anything carrying the old name has to be updated, and there is a period where the
            filing says one thing and half your accounts say another.
          </p>

          <p>
            <strong>What I would do differently:</strong> spend one afternoon on the name
            rather than one week, and then file. The cost of the wrong name is an amendment.
            The cost of not filing is every month you did not have a company.
          </p>

          <h2 style={H2}>What the LLC does and does not do for you</h2>

          <p>
            It gives you a legal entity that can hold a bank account, sign a contract, and
            invoice a client. For most small operations that is the entire value, and it is a
            large value.
          </p>

          <p>
            It does not make you look serious. Clients do not check your filing. What makes
            you look serious is answering the phone, sending an invoice that is correct, and
            doing what you said by the date you said.
          </p>

          <p>
            It also does not protect you from your own conduct, and it comes with obligations:
            annual registration, keeping the company's money separate from yours, and filing
            things on time. Those are real and ongoing.
          </p>

          <h2 style={H2}>The honest sequence</h2>

          <ol style={{ paddingLeft: "1.15rem" }}>
            <li style={{ marginBottom: "8px" }}>Decide the name in an afternoon.</li>
            <li style={{ marginBottom: "8px" }}>File with your Secretary of State.</li>
            <li style={{ marginBottom: "8px" }}>Get the EIN from the IRS, free, same week.</li>
            <li style={{ marginBottom: "8px" }}>Fight for the bank account. Budget more time than you think.</li>
            <li style={{ marginBottom: "8px" }}>Send an invoice to somebody. Until money has moved through it, none of the above has been tested.</li>
          </ol>

          <p>
            That last one is the step I would emphasise to anybody doing this young. It is
            very easy to spend months on the apparatus of having a company and never once run
            the thing the apparatus exists for.
          </p>

          <p>
            More about what the company actually does is on{" "}
            <Link href="/what-is-purcell-ventures" style={link}>this page</Link>.
          </p>

          <PostFaq qa={[
            ["Can a seventeen-year-old start an LLC?",
             "State rules differ and this is a description rather than legal advice, but it is possible: Purcell Ventures LLC was filed with the Georgia Secretary of State on 8 April 2025 by a seventeen-year-old, control number 25075361, and the filing is public. The obstacle is usually not the filing, it is the bank."],
            ["What is the hardest part of starting an LLC?",
             "The business bank account. Banks have their own policies about account holders under eighteen, and those policies are not the same as state law about whether a minor can form an LLC, so the answer can differ between the phone and the desk. Call ahead, ask specifically, and expect to try more than one institution."],
            ["Do you have to pay for an EIN?",
             "No. An EIN comes directly from the IRS, takes about ten minutes, and is free. There is an entire industry charging for it. If a page wants money for an EIN, close the page."],
            ["Can you change an LLC name after registering it?",
             "Yes, by filing an amendment. Purcell Ventures LLC was originally filed as Zultar LLC on 8 April 2025 and amended to its current name on 27 January 2026, keeping the same entity, control number and EIN. The cost of a wrong name is an amendment fee; the cost of not filing is every month without a company."],
          ]} />

          <PostByline post={{
            slug: "llc-at-seventeen",
            title: "What registering an LLC at seventeen actually involved",
            description: "The Georgia filing, the EIN, the bank account that is the actual hard part, and renaming the company nine months later.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
