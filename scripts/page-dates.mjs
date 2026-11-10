// Writes lib/page-dates.json: for every route under app/, the date its files were first
// committed (datePublished) and last committed (dateModified), read from git history.
//
// Why git and not the build clock: a dateModified stamped at build time claims every page
// changed on every deploy, which is false, and Google learns to ignore the field. The
// commit history is a record of when each page's own files actually changed.
//
// Commits whose message contains "[meta-only]" are skipped for dateModified. Use that tag
// on commits that only touch metadata, schema or other invisible plumbing across many
// pages, so a sitewide sweep does not stamp every page as freshly rewritten.
//
// Runs as `prebuild`. On a shallow clone (Vercel clones shallow) the history is
// incomplete and every date would be wrong, so the script keeps the committed JSON and
// exits. Run `npm run page-dates` locally after substantive page edits and commit the
// result.

import { execFileSync } from "node:child_process";
import { readdirSync, statSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const APP = join(ROOT, "app");
const OUT = join(ROOT, "lib", "page-dates.json");

function git(args) {
  return execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
}

try {
  if (git(["rev-parse", "--is-shallow-repository"]) === "true") {
    console.log("page-dates: shallow clone, keeping committed lib/page-dates.json");
    process.exit(0);
  }
} catch {
  console.log("page-dates: no git history available, keeping committed lib/page-dates.json");
  process.exit(0);
}

// Route directories: any folder under app/ holding a page file, minus API routes, dynamic
// segments and private folders. Route groups "(x)" are stripped from the URL path.
const routes = [];
function walk(dir) {
  const entries = readdirSync(dir);
  if (entries.some((f) => /^page\.(tsx|ts|jsx|js|mdx)$/.test(f))) routes.push(dir);
  for (const e of entries) {
    const p = join(dir, e);
    if (!statSync(p).isDirectory()) continue;
    if (e === "api" || e.startsWith("_")) continue;
    if (e.startsWith("[") && !(dir.endsWith("digital/tools") && e === "[slug]")) continue;
    walk(p);
  }
}
walk(APP);

const dates = {};
for (const dir of routes) {
  const rel = relative(APP, dir);
  const path = "/" + rel.split("/").filter((s) => !/^\(.*\)$/.test(s)).join("/");
  // The files that belong to this route alone: everything directly in its folder, not in
  // child routes. The root route gets only its page, because app/layout.tsx changes with
  // every sitewide edit and would make the home page look new every week.
  const files = rel === ""
    ? readdirSync(dir).filter((f) => /^page\./.test(f)).map((f) => join("app", f))
    : readdirSync(dir).filter((f) => statSync(join(dir, f)).isFile()).map((f) => join("app", rel, f));
  if (files.length === 0) continue;
  const published = git(["log", "--format=%cs", "--reverse", "--", ...files]).split("\n")[0];
  const modified = git(["log", "-1", "--format=%cs", "--invert-grep", "--fixed-strings", "--grep=[meta-only]", "--", ...files]) || published;
  if (!published) continue;
  dates[path === "/" ? "/" : path.replace(/\/$/, "")] = { published, modified: modified < published ? published : modified };
}

const sorted = Object.fromEntries(Object.entries(dates).sort(([a], [b]) => a.localeCompare(b)));
const next = JSON.stringify(sorted, null, 2) + "\n";
if (!existsSync(OUT) || readFileSync(OUT, "utf8") !== next) writeFileSync(OUT, next);
console.log(`page-dates: ${Object.keys(sorted).length} routes`);
