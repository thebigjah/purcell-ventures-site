import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";

// THE HONEST VERSION OF THIS PIECE.
//
// The tempting headline was "93 businesses near campus have no website." That claim does
// not survive checking, and one claim that does not survive checking discounts every
// other sentence next to it, which is the rule the whole positioning file is built on.
//
// OpenStreetMap is volunteer-maintained. A missing `website` tag is not proof that no
// website exists; it is proof that no machine reading that source can find one. So the
// piece is written around the claim that IS true and is actually the more interesting
// one: the question is not whether these businesses have a website. It is whether a
// phone can find it. That is the same question a student is asking, which is what makes
// it worth writing down.
//
// Numbers are from ~/storefront/scout.py, run 20 August 2026. Every one of them is
// reproducible with `python3 scout.py`.

export const metadata = {
  title: "121 businesses near the University of Alabama, and what a phone can find",
  description:
    "An audit of every independent business within 2500 metres of the Quad: how many list a website a machine can actually reach, and what that means for a shop competing with a chain three miles away.",
};

const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };

const ROWS: [string, number, number][] = [
  ["Restaurants", 64, 14],
  ["Clothing", 12, 1],
  ["Barbers and salons", 11, 3],
  ["Cafes", 8, 2],
  ["Gift shops", 4, 2],
  ["Bakeries", 3, 1],
  ["Bookshops", 3, 1],
  ["Car repair", 3, 0],
  ["Phone repair", 3, 0],
  ["Bike shops", 2, 2],
  ["Ice cream", 2, 0],
  ["Laundry", 2, 0],
  ["Florists", 2, 0],
  ["Jewellers", 1, 0],
  ["Tailors", 1, 0],
];

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All posts</Link>

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Reporting · August 20, 2026 · The Tuscaloosa Storefront Project</div>
          <h1>
            121 businesses near campus, and what a phone can{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>find</em>
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            I pulled every independent business inside a 2500 metre circle around the Quad,
            dropped anything carrying a chain brand, and then tried to open each one&apos;s
            website. There were 121 of them. Twenty-six had a site that answered.
          </p>

          <h2>What was actually measured</h2>

          <p>
            This matters more than the number, so it goes first. The source is
            OpenStreetMap, which is maintained by volunteers, and a business with no
            website recorded there might still have one. So the honest claim is not that
            ninety-five businesses near campus have no website.
          </p>

          <p>
            The honest claim is that for ninety-five of them, <em>a machine looking for a
            website does not find one</em>. Ninety list none at all. Three list one that no
            longer answers. Two return an error page.
          </p>

          <p>
            That is the more interesting claim anyway, because it is the same question a
            student with a phone is asking. Nobody types a business into a search bar
            hoping it exists somewhere. They type it hoping something comes back.
          </p>

          <h2>By category</h2>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", margin: "20px 0" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "8px 0", borderBottom: "2px solid rgba(212,175,55,0.3)", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-text-muted)" }}>Category</th>
                  <th style={{ textAlign: "right", padding: "8px 12px", borderBottom: "2px solid rgba(212,175,55,0.3)", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-text-muted)" }}>Found</th>
                  <th style={{ textAlign: "right", padding: "8px 0", borderBottom: "2px solid rgba(212,175,55,0.3)", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-text-muted)" }}>Reachable site</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([name, total, ok]) => (
                  <tr key={name}>
                    <td style={{ padding: "7px 0", borderBottom: "1px solid rgba(212,175,55,0.12)" }}>{name}</td>
                    <td style={{ padding: "7px 12px", borderBottom: "1px solid rgba(212,175,55,0.12)", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{total}</td>
                    <td style={{ padding: "7px 0", borderBottom: "1px solid rgba(212,175,55,0.12)", textAlign: "right", fontVariantNumeric: "tabular-nums", color: ok === 0 ? "var(--color-warm-text-muted)" : "inherit" }}>{ok}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            Restaurants do best, and they still only clear one in four. Every laundry,
            florist, jeweller, tailor, ice cream shop, phone repair place and car repair
            shop in the circle came back with nothing.
          </p>

          <h2>The number that surprised me</h2>

          <p>
            Twenty-three of the 121 have opening hours recorded anywhere a machine can read
            them. Not a website. Just the hours.
          </p>

          <p>
            Which means that for roughly eight in ten businesses within walking distance of
            forty thousand students, the answer to &ldquo;are they open right now&rdquo; is
            not available to anyone who is not already standing in front of the door.
          </p>

          <h2>Why this is not a sales pitch</h2>

          <p>
            I build websites, so the obvious read is that this is an argument for buying
            one from me. A few honest caveats against my own interest.
          </p>

          <p>
            Some of these businesses genuinely do not need a website. A barber shop with a
            forty-year queue out the door is not being held back by its web presence. A
            restaurant that fills every night on word of mouth has already solved the
            problem a website solves.
          </p>

          <p>
            And for many of the rest, the cheapest fix is not a website at all. It is
            claiming the Google listing and putting the hours in it. That is free, it takes
            twenty minutes, and it would move more of these businesses further than
            anything I could sell them.
          </p>

          <h2>What happens next</h2>

          <p>
            I am visiting these places and writing about them one at a time. Who runs it,
            how long it has been here, what it does well, and what a student trying to find
            it runs into. That is{" "}
            <Link href="/blog/tuscaloosa-small-business-online" style={link}>the Storefront Project</Link>,
            and it is reporting rather than sales: a business does not have to be a client
            to be in one, and several will not be.
          </p>

          <p>
            If you run something near campus, I would like twenty minutes at your place.
            You get a written piece about your business either way, and no obligation to
            buy anything.{" "}
            <a href="tel:+12054627839" style={link}>(205) 462-7839</a> or{" "}
            <a href="mailto:elijah@purcell-ventures.com" style={link}>elijah@purcell-ventures.com</a>.
          </p>

          <h2>Method</h2>

          <p>
            One Overpass query against OpenStreetMap for shops and food businesses within
            2500 metres of the Quad, on 20 August 2026. Anything tagged with a chain brand
            was dropped. Every listed website got a real HTTP request, and a 403 or a 405
            was counted as working, because plenty of live sites refuse a bare HEAD. The
            script is <code>scout.py</code> and re-running it reproduces every figure above.
          </p>

          <PostByline post={{
            slug: "121-businesses-near-campus",
            title: "121 businesses near the University of Alabama, and what a phone can find",
            description: "An audit of every independent business within 2500 metres of the Quad: how many list a website a machine can actually reach.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
