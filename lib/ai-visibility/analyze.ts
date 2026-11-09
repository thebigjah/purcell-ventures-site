// Pure functions that turn fetched text into findings. No network, no Node APIs, so each
// one can be run against a saved page. Regex parsing, not a DOM: the checks need a title,
// meta tags, JSON-LD blocks and the visible text, and a parser dependency for four lookups
// is more code than the lookups.

import { BOTS, CHECK_BY_ID, type CheckId, type Finding, type Item, type Status } from "./checks";

function finding(id: CheckId, status: Status, found: string, items?: Item[]): Finding {
  const c = CHECK_BY_ID[id];
  return { id, label: c.label, status, found, advice: c.advice, link: c.link, ...(items ? { items } : {}) };
}

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "-", mdash: "-", rsquo: "'", lsquo: "'", ldquo: '"', rdquo: '"', hellip: "..." };

export function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const code = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) && code > 0 && code < 0x110000 ? String.fromCodePoint(code) : m;
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

/** The text a person sees, with head, scripts, styles and markup removed. */
export function visibleText(html: string): string {
  return decodeEntities(
    html
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<head[\s>][\s\S]*?<\/head>/gi, " ")
      .replace(/<(script|style|noscript|template|svg|iframe|object)[\s>][\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();
}

export function wordCount(text: string): number {
  return text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

function attrs(tag: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of tag.matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))/g)) {
    out[m[1].toLowerCase()] = decodeEntities(m[3] ?? m[4] ?? m[5] ?? "");
  }
  return out;
}

export function pageTitle(html: string): string | null {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!m) return null;
  const t = decodeEntities(m[1]).replace(/\s+/g, " ").trim();
  return t || null;
}

export function metaDescription(html: string): string | null {
  for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
    const a = attrs(m[0]);
    if ((a.name || "").toLowerCase() === "description") {
      const c = (a.content || "").replace(/\s+/g, " ").trim();
      return c || "";
    }
  }
  return null;
}

// Schema.org types that are a LocalBusiness or an Organization. LocalBusiness has well
// over a hundred subtypes, so this covers the ones small businesses use and also accepts
// any type ending in a common business word.
const LOCAL_TYPES = new Set([
  "localbusiness", "professionalservice", "homeandconstructionbusiness", "foodestablishment", "restaurant", "cafeorcoffeeshop",
  "bakery", "barorpub", "store", "clothingstore", "autorepair", "automotivebusiness", "autodealer", "healthandbeautybusiness",
  "beautysalon", "hairsalon", "dayspa", "nailsalon", "medicalbusiness", "dentist", "physician", "medicalclinic", "optician",
  "legalservice", "attorney", "accountingservice", "financialservice", "insuranceagency", "realestateagent", "plumber",
  "electrician", "hvacbusiness", "roofingcontractor", "housepainter", "locksmith", "movingcompany", "generalcontractor",
  "lodgingbusiness", "hotel", "sportsactivitylocation", "exercisegym", "childcare", "drycleaningorlaundry", "veterinarycare",
  "petstore", "florist", "homegoodsstore", "furniturestore", "hardwarestore", "entertainmentbusiness", "travelagency",
  "employmentagency", "emergencyservice", "governmentoffice", "library", "recyclingcenter", "selfstorage", "shoppingcenter",
  "tattooparlor", "touristinformationcenter",
]);
const ORG_TYPES = new Set([
  "organization", "corporation", "ngo", "educationalorganization", "medicalorganization", "sportsorganization",
  "newsmediaorganization", "onlinebusiness", "onlinestore", "governmentorganization", "performinggroup", "project",
  "fundingscheme", "researchorganization", "workersunion", "airline", "consortium", "cooperative", "librarysystem",
  "politicalparty", "searchrescueorganization",
]);

type LdFacts = { types: string[]; hasHours: boolean; hasPhone: boolean; hasAddress: boolean; invalid: number };

export function jsonLd(html: string): LdFacts {
  const facts: LdFacts = { types: [], hasHours: false, hasPhone: false, hasAddress: false, invalid: 0 };
  const walk = (node: unknown, depth: number) => {
    if (depth > 12 || node === null || typeof node !== "object") return;
    if (Array.isArray(node)) return node.forEach((n) => walk(n, depth + 1));
    const o = node as Record<string, unknown>;
    const t = o["@type"];
    for (const x of Array.isArray(t) ? t : t ? [t] : []) if (typeof x === "string") facts.types.push(x.replace(/^.*[/#]/, ""));
    if (o.openingHours || o.openingHoursSpecification) facts.hasHours = true;
    if (o.telephone) facts.hasPhone = true;
    if (o.address) facts.hasAddress = true;
    for (const v of Object.values(o)) walk(v, depth + 1);
  };
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if ((attrs(`<x ${m[1]}>`).type || "").toLowerCase() !== "application/ld+json") continue;
    try {
      walk(JSON.parse(m[2].trim()), 0);
    } catch {
      facts.invalid++;
    }
  }
  facts.types = [...new Set(facts.types)];
  return facts;
}

export function businessTypes(types: string[]): { local: string[]; org: string[] } {
  const local = types.filter((t) => LOCAL_TYPES.has(t.toLowerCase()) || /(Business|Store|Service|Shop|Clinic|Agency|Contractor)$/.test(t));
  const org = types.filter((t) => ORG_TYPES.has(t.toLowerCase()) && !local.includes(t));
  return { local, org };
}

const PHONE = /(?:\+?1[\s.-]?)?\(?\b[2-9]\d{2}\)?[\s.-]?[2-9]\d{2}[\s.-]\d{4}\b/;
const STREET = /\b\d{1,6}\s+(?:[NSEW]\.?\s+)?(?:[A-Za-z0-9][\w'.-]*\s+){0,4}(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Drive|Dr|Lane|Ln|Way|Parkway|Pkwy|Highway|Hwy|Court|Ct|Place|Pl|Circle|Cir|Trail|Trl|Square|Sq|Terrace|Ter|Pike|Loop)\b\.?/i;
const STATES = "AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY";
const CITY_ZIP = new RegExp(`\\b[A-Z][A-Za-z .'-]{1,30},\\s*(?:${STATES})\\.?\\s+\\d{5}(?:-\\d{4})?\\b`);
const DAY = "(?:mon|tue|tues|wed|thu|thur|thurs|fri|sat|sun)(?:day|\\.)?";
const TIME = "\\d{1,2}(?::\\d{2})?\\s*(?:am|pm|a\\.m\\.|p\\.m\\.)";
const HOURS = new RegExp(`\\b${DAY}\\b[^.]{0,60}?${TIME}|${TIME}[^.]{0,60}?\\b${DAY}\\b|\\bopen 24 hours\\b|\\b24/7\\b`, "i");

function clip(s: string, n = 90) {
  return s.length > n ? `${s.slice(0, n - 3)}...` : s;
}

// ROBOTS.TXT, per RFC 9309: a group is one or more user-agent lines followed by rules.
// A crawler obeys the group that names it, or the "*" group if none does. Within a group
// the longest matching pattern wins, and allow wins a tie.

type Group = { agents: string[]; rules: { allow: boolean; path: string }[] };

export function parseRobots(text: string): Group[] {
  const groups: Group[] = [];
  let cur: Group | null = null;
  let lastWasAgent = false;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, "").trim();
    const m = line.match(/^([a-z-]+)\s*:\s*(.*)$/i);
    if (!m) continue;
    const key = m[1].toLowerCase();
    const val = m[2].trim();
    if (key === "user-agent") {
      if (!cur || !lastWasAgent) {
        cur = { agents: [], rules: [] };
        groups.push(cur);
      }
      cur.agents.push(val.toLowerCase());
      lastWasAgent = true;
    } else if ((key === "allow" || key === "disallow") && cur) {
      cur.rules.push({ allow: key === "allow", path: val });
      lastWasAgent = false;
    } else {
      lastWasAgent = false;
    }
  }
  return groups;
}

function patternMatches(pattern: string, path: string): boolean {
  const anchored = pattern.endsWith("$");
  const body = (anchored ? pattern.slice(0, -1) : pattern)
    .split("*")
    .map((p) => p.replace(/[.+?^${}()|[\]\\]/g, "\\$&"))
    .join(".*");
  return new RegExp(`^${body}${anchored ? "$" : ""}`).test(path);
}

/** Whether a crawler may fetch a path, and which group decided it. */
export function robotsVerdict(groups: Group[], token: string, path = "/"): { allowed: boolean; named: boolean; rules: number } {
  const t = token.toLowerCase();
  let chosen = groups.filter((g) => g.agents.includes(t));
  const named = chosen.length > 0;
  if (!named) chosen = groups.filter((g) => g.agents.includes("*"));
  const rules = chosen.flatMap((g) => g.rules).filter((r) => r.path !== "");
  let best: { allow: boolean; len: number } | null = null;
  for (const r of rules) {
    if (!patternMatches(r.path, path)) continue;
    const len = r.path.length;
    if (!best || len > best.len || (len === best.len && r.allow)) best = { allow: r.allow, len };
  }
  return { allowed: best ? best.allow : true, named, rules: rules.filter((r) => !r.allow).length };
}

function looksLikeHtml(body: string) {
  return /^\s*(<!doctype html|<html|<head|<body)/i.test(body);
}

export type Fetched = { ok: true; status: number; body: string; contentType: string; finalUrl: string } | { ok: false; error: string };

export function checkHttps(finalUrl: string): Finding {
  return finalUrl.startsWith("https:")
    ? finding("https", "pass", "The home page loads over https.")
    : finding("https", "fail", "The home page loads over plain http, so browsers label it not secure.");
}

export function checkCrawlers(robots: Fetched): Finding {
  if (!robots.ok || robots.status >= 500) {
    return finding("crawlers", "warn", "The robots.txt file could not be read. Google stops crawling a site while its robots.txt returns a server error, so check that the file loads.");
  }
  if (robots.status >= 400 || looksLikeHtml(robots.body)) {
    const items = BOTS.map((b) => ({ name: b.token, status: "pass" as Status, note: `Allowed. ${b.owner}'s crawler ${b.role}.` }));
    return finding("crawlers", "pass", "There is no robots.txt file, so every crawler may read the site.", items);
  }
  const groups = parseRobots(robots.body);
  const items: Item[] = BOTS.map((b) => {
    const v = robotsVerdict(groups, b.token);
    const who = `${b.owner}'s ${b.token} ${b.role}.`;
    if (v.allowed) {
      const partial = v.rules > 0 ? " The home page is open and some other paths are blocked." : "";
      return { name: b.token, status: "pass", note: `Allowed.${partial} ${who}` };
    }
    const how = v.named ? `robots.txt blocks ${b.token} by name.` : "A rule for every crawler (User-agent: *) blocks it.";
    return { name: b.token, status: b.live ? "fail" : "warn", note: `Blocked. ${how} ${who}` };
  });
  const blockedLive = items.filter((i) => i.status === "fail").length;
  const blockedAny = items.filter((i) => i.status !== "pass").length;
  const status: Status = blockedLive ? "fail" : blockedAny ? "warn" : "pass";
  const found = blockedAny === 0
    ? "robots.txt lets all five AI crawlers read the home page."
    : blockedAny === items.length
      ? "robots.txt blocks all five AI crawlers from the home page."
      : `robots.txt blocks ${["one", "two", "three", "four"][blockedAny - 1]} of the five AI crawlers from the home page.`;
  return finding("crawlers", status, found, items);
}

export function checkLlms(llms: Fetched): Finding {
  if (llms.ok && llms.status === 200 && llms.body.trim() && !looksLikeHtml(llms.body)) {
    const lines = llms.body.trim().split(/\r?\n/).length;
    return finding("llms", "pass", `The site has an llms.txt file (${lines} lines).`);
  }
  if (llms.ok && llms.status === 200 && looksLikeHtml(llms.body)) {
    return finding("llms", "info", "/llms.txt returns a web page instead of a text file, so the site has no llms.txt.");
  }
  return finding("llms", "info", "The site has no llms.txt file. It is optional.");
}

/** Every finding about the home page itself. */
export function checkHome(html: string): Finding[] {
  const out: Finding[] = [];

  const title = pageTitle(html);
  if (!title) out.push(finding("title", "fail", "The home page has no title."));
  else if (title.length < 15) out.push(finding("title", "warn", `The title is short: "${clip(title)}"`));
  else out.push(finding("title", "pass", `The title reads "${clip(title)}"`));

  const desc = metaDescription(html);
  if (desc === null) out.push(finding("description", "fail", "The home page has no meta description."));
  else if (!desc) out.push(finding("description", "fail", "The meta description is empty."));
  else if (desc.length < 50) out.push(finding("description", "warn", `The description is short: "${clip(desc)}"`));
  else out.push(finding("description", "pass", `The description reads "${clip(desc, 160)}"`));

  const ld = jsonLd(html);
  const { local, org } = businessTypes(ld.types);
  const bad = ld.invalid ? ` ${ld.invalid} JSON-LD block${ld.invalid > 1 ? "s" : ""} failed to parse.` : "";
  if (local.length) out.push(finding("schema", "pass", `The page has ${local.join(", ")} structured data.${bad}`));
  else if (org.length) out.push(finding("schema", "warn", `The page has ${org.join(", ")} structured data. A business with a storefront or service area should also use LocalBusiness or one of its subtypes.${bad}`));
  else if (ld.types.length) out.push(finding("schema", "fail", `The page has structured data (${clip(ld.types.join(", "))}) with no business type.${bad}`));
  else out.push(finding("schema", "fail", `The page has no JSON-LD structured data.${bad}`));

  const text = visibleText(html);
  const words = wordCount(text);

  const phone = text.match(PHONE);
  const telLink = /href\s*=\s*["']tel:/i.test(html);
  if (phone) out.push(finding("phone", "pass", `The page text shows a phone number: ${phone[0].trim()}.`));
  else if (telLink || ld.hasPhone) out.push(finding("phone", "warn", "A phone number appears only in a link or in the markup. Print it as text too."));
  else out.push(finding("phone", "warn", "No US phone number appears in the page text."));

  const street = text.match(STREET);
  const cityZip = text.match(CITY_ZIP);
  const addr = street?.[0] || cityZip?.[0];
  if (addr) out.push(finding("address", "pass", `The page text shows an address: ${clip(addr.trim(), 70)}.`));
  else if (ld.hasAddress) out.push(finding("address", "warn", "An address appears only in the structured data. Print it as text too."));
  else out.push(finding("address", "warn", "No street address or city, state and ZIP appears in the page text."));

  const hours = text.match(HOURS);
  if (hours) out.push(finding("hours", "pass", `The page text shows opening hours: ${clip(hours[0].trim(), 70)}.`));
  else if (ld.hasHours) out.push(finding("hours", "warn", "Opening hours appear only in the structured data. Print them as text too."));
  else out.push(finding("hours", "warn", "No opening hours appear in the page text."));

  if (words < 50) out.push(finding("words", "fail", `The page has ${words} words of readable text before any JavaScript runs. A crawler that skips scripts sees an almost empty page.`));
  else if (words < 200) out.push(finding("words", "warn", `The page has ${words} words of readable text before any JavaScript runs. That leaves little for an assistant to quote.`));
  else out.push(finding("words", "pass", `The page has ${words} words of readable text before any JavaScript runs.`));

  return out;
}
