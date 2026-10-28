import type { Metadata } from "next";
import data from "./data.json";
import ProgressTable, { type Row } from "./ProgressTable";

// The complete inventory he asked for on 28 Oct 2026. Nothing on the site links here, it is
// noindex and it is not in the sitemap. Unlinked is still public, so family work, his money,
// his girlfriend, political items and secrets are left out of data.json by the build script
// in ~/pv-brand/inventory. Regenerate data.json from there; do not hand-edit grades.

export const metadata: Metadata = {
  title: { absolute: "Progress, Elijah Purcell" },
  description: "A complete inventory of everything Elijah Purcell has built, with grades, activity and status.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/progress" },
};

const TIER_LABEL: Record<string, string> = {
  featured: "Featured on the portfolio",
  listed: "Listed on the portfolio",
  "index line": "In the portfolio index",
  off: "Not on the portfolio",
};

export default function ProgressPage() {
  const rows = data.projects as Row[];
  const count = (k: keyof Row, v: string) => rows.filter((r) => r[k] === v).length;
  const grades = ["Shipped", "Working", "In progress", "Started"];
  const tiers = ["featured", "listed", "index line", "off"];

  return (
    <main className="pg">
      <style dangerouslySetInnerHTML={{ __html: PG_CSS }} />
      <div className="ui-wrap">
        <header className="pg-head">
          <h1>Progress</h1>
          <p>
            Everything I have built, {rows.length} projects and {data.achievements.length} achievements, inventoried on {data.generated}.
            Each project was graded twice from evidence, once from its repo and once by a reviewer who opened it, then judged for the portfolio and résumé.
          </p>
        </header>

        <section className="pg-figs" aria-label="Totals">
          <div>
            <h2>Final grade</h2>
            <dl>
              {grades.map((g) => (<div key={g}><dt>{g}</dt><dd>{count("final", g)}</dd></div>))}
            </dl>
          </div>
          <div>
            <h2>Portfolio</h2>
            <dl>
              {tiers.map((t) => (<div key={t}><dt>{TIER_LABEL[t]}</dt><dd>{count("tier", t)}</dd></div>))}
            </dl>
          </div>
          <div>
            <h2>Résumé</h2>
            <dl>
              <div><dt>Projects on the résumé</dt><dd>{count("resume", "include")}</dd></div>
              <div><dt>Achievements on the résumé</dt><dd>{data.achievements.filter((a) => a.resume === "include").length}</dd></div>
            </dl>
          </div>
        </section>

        <ProgressTable rows={rows} />

        <section className="pg-ach">
          <h2>Achievements</h2>
          <ul>
            {data.achievements.map((a) => (
              <li key={a.name}>
                <span>{a.name}</span>
                <span>{TIER_LABEL[a.tier] ?? a.tier}{a.resume === "include" ? ", on the résumé" : ""}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

const PG_CSS = `
.pg { padding-block: clamp(48px, 7vw, 96px); }
.pg h1 { font: 600 clamp(40px, 6vw, 72px)/1 var(--font-display); margin: 0 0 16px; }
.pg h2 { font: 600 20px/1.2 var(--font-display); margin: 0 0 12px; }
.pg-head p { color: var(--muted); max-width: 70ch; line-height: 1.6; margin: 0; }
.pg-figs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0; margin: 40px 0; border-top: 1px solid var(--line); }
.pg-figs > div { padding: 20px 24px 20px 0; }
.pg-figs > div + div { border-left: 1px solid var(--line); padding-left: 24px; }
.pg-figs dl { margin: 0; display: grid; gap: 6px; }
.pg-figs dl div { display: flex; justify-content: space-between; gap: 16px; border-bottom: 1px solid var(--line-soft); padding-bottom: 6px; }
.pg-figs dt { color: var(--muted); }
.pg-figs dd { margin: 0; font-variant-numeric: tabular-nums; font-weight: 600; }
.pg-ach { margin-top: 56px; }
.pg-ach ul { list-style: none; margin: 0; padding: 0; columns: 2; column-gap: 48px; }
.pg-ach li { break-inside: avoid; display: grid; gap: 2px; padding: 10px 0; border-bottom: 1px solid var(--line-soft); }
.pg-ach li span + span { color: var(--muted); font-size: 14px; }
@media (max-width: 800px) {
  .pg-figs { grid-template-columns: minmax(0, 1fr); }
  .pg-figs > div + div { border-left: 0; padding-left: 0; border-top: 1px solid var(--line); }
  .pg-ach ul { columns: 1; }
}
`;
