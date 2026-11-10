import Link from "next/link";
import al from "@/lib/research/alabama-2026-11-summary.json";

// Local proof point for the Alabama city consulting pages. Every number comes from the
// Alabama website study summary at build time, so the page never carries a typed figure
// that can drift from the study. Bases under MIN_BASE get a note on how much one site moves
// each share.

type City = "birmingham" | "huntsville" | "montgomery" | "mobile";

const MIN_BASE = 50;
const STUDY = "/research/alabama-small-business-websites-2026";

export default function AlabamaCityWebsites({ city, name }: { city: City; name: string }) {
  const c = al.frames[city];
  const s = al.frames.statewide;
  const own = c.own_domain_pages;
  const checked = c.domains_checked;
  const lo = Math.round(100 / checked);
  const hi = Math.round(100 / own);
  return (
    <>
      <h2>How do {name} business websites hold up?</h2>

      <p>
        I checked the home pages of all {checked} {name} business websites listed in
        OpenStreetMap for my{" "}
        <Link href={STUDY}>study of Alabama small business websites</Link> on 9 November 2026,
        and {c.not_reachable.pct_of_checked} percent had no working home page, against{" "}
        {s.not_reachable.pct_of_checked} percent of the statewide sample. Of the {own} working
        pages on a business&rsquo;s own domain, {c.jsonld_org_or_localbusiness.pct_of_own_domain_pages}{" "}
        percent carried structured data that names the business and its type, against{" "}
        {s.jsonld_org_or_localbusiness.pct_of_own_domain_pages} percent statewide. On those pages,{" "}
        {c.all_three_ai_signals.pct_of_own_domain_pages} percent had all three signals I measured
        for AI tools, against {s.all_three_ai_signals.pct_of_own_domain_pages} percent statewide:
        business structured data, an llms.txt file and no AI crawler blocked in robots.txt.
        {(own < MIN_BASE || checked < MIN_BASE) && (
          <>
            {" "}
            With bases of {checked} sites and {own} pages, one {name} site moves a share by{" "}
            {lo === hi ? `about ${hi}` : `${lo} to ${hi}`} points.
          </>
        )}
      </p>
    </>
  );
}
