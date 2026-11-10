// Alabama small business websites, November 2026. Binds the shared measure code in
// measures.mjs to the Alabama areas. No domains, no business names.

import { countRows as rows, socialRows as social, aggregatesCsv as csv } from "./measures.mjs";

export { pct, GROUPS, TIMINGS } from "./measures.mjs";

export const AREAS = [
  { key: "statewide", name: "Alabama (random sample)", whole: true },
  { key: "tuscaloosa", name: "Tuscaloosa" },
  { key: "birmingham", name: "Birmingham" },
  { key: "huntsville", name: "Huntsville" },
  { key: "montgomery", name: "Montgomery" },
  { key: "mobile", name: "Mobile" },
];

export const CITIES = AREAS.slice(1);

export const countRows = (summary) => rows(summary, AREAS);
export const socialRows = (summary) => social(summary, AREAS);
export const aggregatesCsv = (summary) => csv(summary, AREAS);
