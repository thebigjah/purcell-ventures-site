import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout, Note } from "@/app/components/ui";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";

export const metadata = {
  alternates: { canonical: "/blog/can-ai-find-your-business" },
  title: { absolute: "Can an AI find your business? A test you can run in five minutes, by Elijah Purcell" },
  description:
    "People are starting to ask an assistant instead of searching. Five minutes to find out what ChatGPT and Google's AI answer say about your business, why they get it wrong, and four fixes that change the answer.",
};


export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: "Can an AI find your business", href: "/blog/can-ai-find-your-business" },
      ]} />}
      kicker="Guide"
      title="Can an AI find your business?"
      meta="20 August 2026, 7 minute read"
    >
      <p>
        Some people now ask an assistant instead of searching: "Where should I get a
        haircut near campus." "Is there a good ramen place in Tuscaloosa." They can act
        on the answer without ever seeing a results page.
      </p>

      <p>
        So there is a version of your business that exists only inside an assistant's
        answer, and you may never have seen it. The test below shows it to you.
      </p>

      <h2>The five-minute test</h2>

      <p>
        Run it signed out, in a private window, on a device that has not been to your
        website.
      </p>

      <p>
        <strong>Ask a general question first.</strong> Leave your name out. "What are the best
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
        sources they used. That list shows what you need to fix,
        because those are the pages shaping what people are told about you.
      </p>

      <Note>
        <strong>What I found doing this for my own name.</strong> The answer was drawn
        from a page I had corrected that morning, and it quoted the old version, stale by
        months. It also quoted my own LinkedIn describing me as an eighteen-year-old when
        I am nineteen. Assistants repeat what is written where they look, and they repeat
        it long after you change it.
      </Note>

      <h2>Why they get it wrong</h2>

      <p>
        <strong>They read cached copies.</strong> Correcting your website today does not
        correct the answer today. It can take weeks.
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

      <h2>Four fixes</h2>

      <p>
        <strong>1. Say the plain sentence somewhere on your site.</strong> "Joe's Barbers
        is a barber shop on 15th Street in Tuscaloosa, Alabama, open Tuesday to
        Saturday." That is the sentence an assistant will use, and if it
        does not exist on your site it will use one from somewhere you do not control.
      </p>

      <p>
        <strong>2. Make every source agree.</strong> Google Business Profile, your site,
        any directory that appears. Same name, same address format, same phone, same
        hours. When the sources agree, an assistant is more likely to repeat your details.
      </p>

      <p>
        <strong>3. Answer customer questions on your site.</strong> Use headings that are
        the questions customers ask, such as "Are you open on Sundays?", and answer each
        one. A question-answering system looks for that shape.
      </p>

      <p>
        <strong>4. If you share a name, say so outright.</strong> One sentence naming the
        confusion and distinguishing yourself helps assistants tell you apart. I have
        that sentence on my own site because three other people share my name, and it is
        the sentence that separates us.
      </p>

      <h2>What does not work</h2>

      <p>
        Keyword stuffing does not work. Neither does paying for an "AI optimisation"
        service that will not tell you what it does, or adding a page of text written for
        machines. Assistants summarise, and a page that reads as machine-written
        summarises badly.
      </p>

      <p>
        A{" "}
        <a href="https://arxiv.org/html/2607.14035v1" rel="noopener">2026 review of research on generative search</a>{" "}
        found the dominant factors are topical relevance and position, that statistics
        and quotable facts help, and that keyword stuffing measurably hurts. It found no
        established evidence that publishing volume does anything at all.
      </p>

      <h2>Why the Google Business Profile comes first</h2>

      <p>
        Assistant answers about local businesses draw on listings like Google Business
        Profile and directories, and the Google listing is free.{" "}
        <Link href="/blog/claim-your-google-listing">Claim your Google
        Business Profile</Link> and put accurate hours in it before you think about any
        of this.
      </p>

      <p>
        The rest of the self-check is in{" "}
        <Link href="/blog/is-your-business-invisible">Is your business invisible?</Link>.
      </p>

<PostFaq qa={[
            ["Is AI optimisation for local business worth paying for?",
             "Most of the work is the same work as being findable in the first place: a claimed listing, consistent details across sources, and pages that plainly state facts. Before paying anyone for AI optimisation, ask them to list exactly what they will change. If they will not, do not hire them."],
          ]} />

          <PostByline post={{
            slug: "can-ai-find-your-business",
            title: "Can an AI find your business? A test you can run in five minutes",
            description: "How to see what assistants say about your business, why they get it wrong, and the four fixes that change the answer.",
            published: "2026-08-20",
          }} />


    </PostLayout>
  );
}
