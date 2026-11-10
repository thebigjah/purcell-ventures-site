import { GROUPS, pct } from "@/lib/research/measures.mjs";
import type alabamaSummary from "@/lib/research/alabama-2026-11-summary.json";

// Tables and bar charts shared by the Load Time research pages. Each takes a list of rows,
// one per area, with the summary frame for that area. Every figure is read from the frame
// through the measure code in lib/research/measures.mjs. Aggregates only.

// Every summary frame comes from the same agg() in summarize.py, so one frame shape covers
// every study. Pages cast their own summary frames to this type.
export type Frame = (typeof alabamaSummary.frames)["statewide"];
export type AreaRow = { key: string; name: string; frame: Frame };

export const num = (n: number) => n.toLocaleString("en-US");
export const p = (n: number, base: number) => `${pct(n, base).toFixed(1)}%`;

type Measure = { key: string; label: string; get: (f: Frame) => { n: number; base: number }; baseNote?: string; baseLabel: string };

export const MEASURE = Object.fromEntries(
  GROUPS.flatMap((g) => g.measures.map((m) => [m.key, { ...m, baseLabel: g.baseLabel }])),
) as Record<string, Measure>;

export function CheckTable({ caption, keys, baseLabel, rows }: { caption: string; keys: string[]; baseLabel: string; rows: AreaRow[] }) {
  const ms = keys.map((k) => MEASURE[k]);
  return (
    <table>
      <caption>{caption}</caption>
      <thead>
        <tr>
          <th scope="col">Area</th>
          <th scope="col">Base n ({baseLabel})</th>
          {ms.map((m) => (
            <th scope="col" key={m.key}>{m.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((a) => {
          const f = a.frame;
          const base = ms[0].get(f).base;
          return (
            <tr key={a.key}>
              <th scope="row">{a.name}</th>
              <td>{num(base)}</td>
              {ms.map((m) => {
                const v = m.get(f);
                return (
                  <td key={m.key}>
                    {v.base === base ? `${num(v.n)} (${p(v.n, v.base)})` : `${num(v.n)} of ${num(v.base)} (${p(v.n, v.base)})`}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function SpeedTable({ rows }: { rows: AreaRow[] }) {
  return (
    <table>
      <caption>Speed of the home page HTML, timed from one computer in Tuscaloosa</caption>
      <thead>
        <tr>
          <th scope="col">Area</th>
          <th scope="col">Base n (own-domain pages)</th>
          <th scope="col">Median first byte</th>
          <th scope="col">75th percentile first byte</th>
          <th scope="col">First byte over 800 ms</th>
          <th scope="col">Median HTML download</th>
          <th scope="col">HTML download over 2 seconds</th>
          <th scope="col">Median HTML size</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((a) => {
          const f = a.frame;
          const b = f.own_domain_pages;
          return (
            <tr key={a.key}>
              <th scope="row">{a.name}</th>
              <td>{num(b)}</td>
              <td>{num(f.ttfb_ms.median)} ms</td>
              <td>{num(f.ttfb_ms.p75)} ms</td>
              <td>{num(f.ttfb_ms.over_800ms_n)} ({p(f.ttfb_ms.over_800ms_n, b)})</td>
              <td>{num(f.html_download_ms.median)} ms</td>
              <td>{num(f.html_download_ms.over_2000ms_n)} ({p(f.html_download_ms.over_2000ms_n, b)})</td>
              <td>{num(Math.round(f.html_bytes.median / 1000))} KB</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export type Bar = { name: string; n: number; base: number; value: number; text: string; ref?: boolean };

export function BarChart({ title, bars, note }: { title: string; bars: Bar[]; note: string }) {
  const max = Math.max(...bars.map((b) => b.value)) * 1.1;
  return (
    <figure className="rs-chart">
      <figcaption>
        <span className="rs-chart__title">{title}</span>
        <span className="rs-chart__note">{note}</span>
      </figcaption>
      <ul className="rs-bars">
        {bars.map((b) => (
          <li className={`rs-bar${b.ref ? " rs-bar--ref" : ""}`} key={b.name}>
            <span className="rs-bar__label">
              {b.name}
              <span className="rs-bar__n">n = {num(b.base)}</span>
            </span>
            <span className="rs-bar__track" aria-hidden="true">
              <span className="rs-bar__fill" style={{ width: `${(b.value / max) * 100}%` }} />
            </span>
            <span className="rs-bar__val">{b.text}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

/** One bar per row for a count measure, as a percentage of its base. */
export function pctBars(key: string, rows: (AreaRow & { ref?: boolean })[]): Bar[] {
  const m = MEASURE[key];
  return rows.map((r) => {
    const v = m.get(r.frame);
    return { name: r.name, n: v.n, base: v.base, value: pct(v.n, v.base), text: p(v.n, v.base), ref: r.ref };
  });
}

/** One bar per row for the median time to first byte. */
export function ttfbBars(rows: (AreaRow & { ref?: boolean })[]): Bar[] {
  return rows.map((r) => ({
    name: r.name, n: r.frame.ttfb_ms.median, base: r.frame.own_domain_pages,
    value: r.frame.ttfb_ms.median, text: `${num(r.frame.ttfb_ms.median)} ms`, ref: r.ref,
  }));
}
