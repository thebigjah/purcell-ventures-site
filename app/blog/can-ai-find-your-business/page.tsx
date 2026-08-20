import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata = {
  alternates: { canonical: "/blog/can-ai-find-your-business" },
  title: "Can an AI find your business? A test you can run in five minutes | Elijah Purcell",
  description:
    "People are starting to ask an assistant instead of searching. Five minutes to find out what ChatGPT and Google's AI answer say about your business, why they get it wrong, and the four fixes that actually change the answer.",
};

const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "25px", fontWeight: 600, lineHeight: 1.2, margin: "40px 0 10px" } as const;
const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };
const box: React.CSSProperties = {
  background: "rgba(0,0,0,0.22)", borderTop: "2px solid rgba(212,175,55,0.4)",
  padding: "16px 18px", margin: "16px 0", fontSize: "15px",
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
          { name: "Can an AI find your business", href: "/blog/can-ai-find-your-business" },
        ]} />

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Guide · August 20, 2026 · 7 min read</div>
          <h1>
            Can an AI{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>find</em> your business?
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            A growing number of people do not search any more. They ask. "Where should I get
            a haircut near campus." "Is there a good ramen place in Tuscaloosa." And they act
            on the answer without ever seeing a results page.
          </p>

          <p>
            Which means there is now a version of your business that exists only inside an
            assistant's answer, and most owners have never seen it. Here is how to look.
          </p>

          <h2 style={H2}>The five-minute test</h2>

          <p>
            Do this signed out, in a private window, on a device that has not been to your
            website.
          </p>

          <p>
            <strong>Ask a general question first.</strong> Not your name. "What are the best
            barbers in Tuscaloosa" or "where can I get a laptop repaired near the University
            of Alabama." Are you mentioned at all? Who is?
          </p>

          <p>
            <strong>Then ask about you specifically.</strong> "Tell me about [your business
            name] in [your town]." Read the answer as though you were a customer. Are the
            hours right? The address? Does it say something that was true two years ago? Does
            it confuse you with a different business that shares your name?
          </p>

          <p>
            <strong>Then ask where it got that.</strong> Most assistants will tell you which
            sources they used. That list is the actual answer to what you need to fix,
            because those are the pages shaping what people are told about you.
          </p>

          <div style={box}>
            <strong>What I found doing this for my own name.</strong> The answer was drawn
            from a page I had corrected that morning, and it quoted the old version, stale by
            months. It also quoted my own LinkedIn describing me as an eighteen-year-old when
            I am nineteen. Assistants repeat what is written where they look, and they repeat
            it long after you change it.
          </div>

          <h2 style={H2}>Why they get it wrong</h2>

          <p>
            <strong>They read cached copies.</strong> Correcting your website today does not
            correct the answer today. Weeks, sometimes.
          </p>

          <p>
            <strong>They average across sources.</strong> If your hours are right on Google
            and wrong on three directories, the assistant is reconciling four things and it
            may not pick yours.
          </p>

          <p>
            <strong>They cannot tell you apart from your namesake.</strong> If another
            business shares your name, an assistant will often blend the two, because nothing
            it can read says which is which.
          </p>

          <p>
            <strong>They quote what is stated plainly.</strong> This is the useful one. A
            model summarising your page needs a sentence it can lift. Marketing copy that
            never plainly states what you do, where, and for whom gives it nothing to take,
            so it takes something from a directory instead.
          </p>

          <h2 style={H2}>The four fixes that actually change the answer</h2>

          <p>
            <strong>1. Say the plain sentence somewhere on your site.</strong> "Joe's Barbers
            is a barber shop on 15th Street in Tuscaloosa, Alabama, open Tuesday to
            Saturday." No adjectives. That is the sentence an assistant will use, and if it
            does not exist on your site it will use one from somewhere you do not control.
          </p>

          <p>
            <strong>2. Make every source agree.</strong> Google Business Profile, your site,
            any directory that appears. Same name, same address format, same phone, same
            hours. Consistency across sources is most of what makes an assistant confident.
          </p>

          <p>
            <strong>3. Answer the actual questions on your site.</strong> Not "About Us" and
            "Services." A section that says "Are you open on Sundays?" and answers it. That
            is the shape a question-answering system is looking for, and almost no small
            business site has one.
          </p>

          <p>
            <strong>4. If you share a name, say so outright.</strong> One sentence naming the
            confusion and distinguishing yourself does more than any amount of hoping. I have
            that sentence on my own site because three other people share my name, and it is
            the only thing that reliably separates us.
          </p>

          <h2 style={H2}>What does not work</h2>

          <p>
            Keyword stuffing. Paying for an "AI optimisation" service that will not tell you
            what it does. Adding a page of text written for machines: assistants are
            summarising, and a page that reads as machine-written summarises badly.
          </p>

          <p>
            There is no ranking dial here. What there is: be findable, be consistent, and
            state plainly what you are.
          </p>

          <h2 style={H2}>Do the ordinary thing first</h2>

          <p>
            Almost every assistant answer about a local business is downstream of the same
            handful of sources, and the biggest one is free.{" "}
            <Link href="/blog/claim-your-google-listing" style={link}>Claim your Google
            Business Profile</Link> and put accurate hours in it before you think about any
            of this.
          </p>

          <p>
            The rest of the self-check is{" "}
            <Link href="/blog/is-your-business-invisible" style={link}>here</Link>.
          </p>

          <PostFaq qa={[
            ["How do I find out what ChatGPT says about my business?",
             "Open a private window, signed out, and ask it directly: tell me about your business name in your town. Then ask a general question in your category without naming yourself, to see whether you are mentioned at all. Then ask which sources it used, because that list is what you actually need to fix."],
            ["Why does AI give wrong information about my business?",
             "Four common reasons. It reads cached copies, so correcting your site today does not correct the answer today. It averages across sources, so wrong hours on three directories can outweigh right hours on your own site. It cannot distinguish you from a business with a similar name unless something says which is which. And it quotes what is stated plainly, so marketing copy that never says what you do, where, and for whom gives it nothing to lift."],
            ["How do I get my business mentioned by AI assistants?",
             "Put the plain sentence on your site saying what you are, where, and when you are open, without adjectives. Make every source agree on name, address, phone and hours. Add a section that asks and answers the questions customers actually ask. And if you share a name with another business, say so outright and distinguish yourself in one sentence."],
            ["Is AI optimisation for local business a real thing or a scam?",
             "The underlying work is real and it is mostly the same work as being findable in the first place: a claimed listing, consistent details across sources, and pages that plainly state facts. Be careful with anyone selling AI optimisation who will not describe what they will actually change. There is no ranking dial inside an assistant to buy access to."],
          ]} />

          <PostByline post={{
            slug: "can-ai-find-your-business",
            title: "Can an AI find your business? A test you can run in five minutes",
            description: "How to see what assistants say about your business, why they get it wrong, and the four fixes that change the answer.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
