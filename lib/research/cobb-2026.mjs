// Cobb County, Georgia small business websites, November 2026. Binds the shared measure
// code in measures.mjs to the one Cobb County area. Cobb was checked in full, so the
// county row covers every domain in the frame. No domains, no business names.

import { countRows as rows, socialRows as social, aggregatesCsv as csv } from "./measures.mjs";

export { pct, GROUPS, TIMINGS } from "./measures.mjs";

export const AREAS = [{ key: "county", name: "Cobb County", whole: true }];

export const countRows = (summary) => rows(summary, AREAS);
export const socialRows = (summary) => social(summary, AREAS);
export const aggregatesCsv = (summary) => csv(summary, AREAS);
