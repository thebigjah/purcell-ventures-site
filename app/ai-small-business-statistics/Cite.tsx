import Link from "next/link";
import { SOURCES, type SourceKey } from "./sources";

// Inline citation for a figure taken from /ai-small-business-statistics. Name, date and URL
// come from ./sources.ts, so a guide that quotes a figure cites it the same way that page does.
export default function Cite({ k, more }: { k: SourceKey; more?: boolean }) {
  const s = SOURCES[k];
  return (
    <>
      (<a href={s.url}>{s.name}</a>, {s.short}
      {more && <>, <Link href="/ai-small-business-statistics">more figures</Link></>})
    </>
  );
}
