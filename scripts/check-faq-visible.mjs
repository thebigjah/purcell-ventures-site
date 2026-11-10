// Checks that every FAQPage question and answer in the built HTML also appears in the
// visible text of the same page. Schema that promises an answer the page does not show is
// a misleading-structured-data problem, so this runs after `npm run build`.
//
// Also checks the JSON-LD on every page: each block parses, every {"@id": ...} reference
// resolves to a node defined on that page (the sitewide graph from app/layout.tsx is on
// every page, and it holds the one full Person node, https://elijahpurcell.com/#person),
// there is exactly one Person and one Organization definition, and at most one
// BreadcrumbList.
//
// Usage: node scripts/check-faq-visible.mjs   (exit 1 on any mismatch)

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const BUILT = join(ROOT, ".next", "server", "app");

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
}

// Whitespace is dropped entirely so inline markup and React text separators cannot cause
// false mismatches. Curly quotes are folded to straight ones.
function norm(s) {
  return decode(s)
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, "")
    .toLowerCase();
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<template[\s\S]*?<\/template>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ");
}

function nodesOf(json) {
  const out = [];
  const visit = (v) => {
    if (Array.isArray(v)) return v.forEach(visit);
    if (v && typeof v === "object") {
      out.push(v);
      Object.values(v).forEach(visit);
    }
  };
  visit(json);
  return out;
}

const pages = walk(BUILT).filter((p) => !p.endsWith("/_not-found.html") && !p.endsWith("/_global-error.html"));
let faqMismatches = 0;
let ldErrors = 0;
let faqCount = 0;

for (const file of pages) {
  const route = "/" + relative(BUILT, file).replace(/\.html$/, "").replace(/^index$/, "");
  const html = readFileSync(file, "utf8");
  const visible = norm(visibleText(html));
  const defined = new Set();
  const refs = [];
  let breadcrumbs = 0;
  const personDefs = [];
  const orgDefs = [];
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    let json;
    try {
      json = JSON.parse(m[1]);
    } catch (e) {
      console.log(`LD-PARSE ${route}: ${e.message}`);
      ldErrors++;
      continue;
    }
    for (const n of nodesOf(json)) {
      const keys = Object.keys(n);
      if (typeof n["@id"] === "string") {
        if (keys.length === 1) refs.push(n["@id"]);
        else defined.add(n["@id"]);
      }
      const types = [].concat(n["@type"] ?? []);
      if (types.includes("BreadcrumbList")) breadcrumbs++;
      // A definition is any Person or Organization-like node that carries more than a
      // reference. Nested publisher stubs for outside sources (a cited report's publisher)
      // have no @id and are counted only when they name this company or its founder.
      const isDef = keys.some((k) => k !== "@id" && k !== "@type");
      if (isDef && types.includes("Person") && (n["@id"] || /Purcell/.test(n.name ?? ""))) personDefs.push(n["@id"] ?? "(no @id)");
      if (isDef && types.some((t) => ["Organization", "LocalBusiness"].includes(t)) && (n["@id"] || /Purcell Ventures/.test(n.name ?? ""))) orgDefs.push(n["@id"] ?? "(no @id)");
      if (isDef && n["@id"] === "https://purcellventures.co/#organization" && !types.includes("Organization")) orgDefs.push(`${n["@id"]} as ${types.join("/")}`);
      if (!types.includes("FAQPage")) continue;
      for (const q of [].concat(n.mainEntity ?? [])) {
        faqCount++;
        const name = q.name ?? "";
        const text = q.acceptedAnswer?.text ?? "";
        const missing = [];
        if (!visible.includes(norm(name))) missing.push("question");
        if (!visible.includes(norm(text))) missing.push("answer");
        if (missing.length) {
          faqMismatches++;
          console.log(`FAQ ${route}: ${missing.join("+")} not visible: "${name}"`);
        }
      }
    }
  }
  if (breadcrumbs > 1) {
    console.log(`LD-CRUMBS ${route}: ${breadcrumbs} BreadcrumbList nodes`);
    ldErrors++;
  }
  if (personDefs.length !== 1) {
    console.log(`LD-PERSON ${route}: ${personDefs.length} Person definitions ${JSON.stringify(personDefs)}`);
    ldErrors++;
  }
  if (orgDefs.length !== 1) {
    console.log(`LD-ORG ${route}: ${orgDefs.length} Organization definitions ${JSON.stringify(orgDefs)}`);
    ldErrors++;
  }
  for (const r of refs) {
    if (!defined.has(r)) {
      console.log(`LD-REF ${route}: ${r} is referenced but not defined on the page`);
      ldErrors++;
    }
  }
}

console.log(`\n${pages.length} pages, ${faqCount} FAQ entries, ${faqMismatches} FAQ mismatches, ${ldErrors} JSON-LD errors`);
process.exit(faqMismatches || ldErrors ? 1 : 0);
