// URL CHECKS FOR THE AI VISIBILITY TOOL, WHICH FETCHES A URL A STRANGER TYPED.
//
// A public route that fetches any URL is a server-side request forgery risk: without these
// checks a visitor could point it at localhost, the cloud metadata address or a private
// network and read the reply through our server. Every hop goes through two gates:
//
//   1. checkUrl() on the text of the URL: http or https only, no credentials, default
//      ports only, no localhost-style names, no private IP literals.
//   2. isPublicIp() on every address DNS returns, called from the socket's own lookup in
//      lib/ai-visibility/fetch.ts, so the address that gets connected to is the address
//      that was checked. Checking DNS once and then letting fetch resolve again would let
//      a rebinding domain answer "public" to us and "127.0.0.1" to the connection.
//
// Plain TypeScript with no path aliases, so scripts/test-url-safety.mjs can import it
// directly under Node's type stripping.

import { isIP } from "node:net";

export type UrlCheck = { ok: true; url: URL } | { ok: false; reason: string };

const BLOCKED_SUFFIXES = [".localhost", ".local", ".internal", ".lan", ".home", ".corp", ".intranet", ".arpa"];

/** Parse what the visitor typed and refuse anything that is not a public web address. */
export function checkUrl(input: string): UrlCheck {
  const raw = (input || "").trim();
  if (!raw) return { ok: false, reason: "Enter a website address." };
  if (raw.length > 2048) return { ok: false, reason: "That address is too long." };

  // "example.com" with no scheme is what most people type. Anything with a scheme other
  // than http or https, such as file: or ftp:, keeps it and fails the protocol check.
  const withScheme = /^[a-z][a-z0-9+.-]*:/i.test(raw) && !/^[^:/]+:\d+(\/|$)/.test(raw) ? raw : `https://${raw}`;

  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    return { ok: false, reason: "That does not look like a website address." };
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { ok: false, reason: "Only http and https addresses can be checked." };
  }
  if (url.username || url.password) {
    return { ok: false, reason: "Addresses with a username or password cannot be checked." };
  }
  // url.port is "" when the port is the default for the scheme, so ":443" on https and
  // ":80" on http already read as "". Anything left is a non-standard port.
  if (url.port !== "") {
    return { ok: false, reason: "Only addresses on the standard web ports can be checked." };
  }

  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  const bare = host.startsWith("[") ? host.slice(1, -1) : host;

  if (isIP(bare)) {
    if (!isPublicIp(bare)) return { ok: false, reason: "That address points to a private or reserved network." };
    return { ok: true, url };
  }

  if (host === "localhost" || BLOCKED_SUFFIXES.some((s) => host.endsWith(s))) {
    return { ok: false, reason: "That address points to a private or local network." };
  }
  if (!host.includes(".")) {
    return { ok: false, reason: "Enter a full public address, such as example.com." };
  }
  return { ok: true, url };
}

function v4ToInt(ip: string): number {
  return ip.split(".").reduce((n, part) => n * 256 + Number(part), 0);
}

// [network, prefix length]. Every range here is private, loopback, link-local, shared,
// documentation, benchmarking, multicast or otherwise not a public web server.
const V4_BLOCKED: [string, number][] = [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.0.0.0", 24],
  ["192.0.2.0", 24],
  ["192.88.99.0", 24],
  ["192.168.0.0", 16],
  ["198.18.0.0", 15],
  ["198.51.100.0", 24],
  ["203.0.113.0", 24],
  ["224.0.0.0", 4],
  ["240.0.0.0", 4],
];

function v4Public(ip: string): boolean {
  const n = v4ToInt(ip);
  return !V4_BLOCKED.some(([net, bits]) => {
    const size = 2 ** (32 - bits);
    const start = v4ToInt(net);
    return n >= start && n < start + size;
  });
}

/** Expand an IPv6 address to eight 16-bit groups. Handles "::" and a dotted IPv4 tail. */
function v6Groups(ip: string): number[] | null {
  let addr = ip.split("%")[0].toLowerCase();
  const v4Tail = addr.match(/(\d+\.\d+\.\d+\.\d+)$/);
  if (v4Tail) {
    const n = v4ToInt(v4Tail[1]);
    addr = addr.slice(0, -v4Tail[1].length) + `${(n >>> 16).toString(16)}:${(n & 0xffff).toString(16)}`;
  }
  const halves = addr.split("::");
  if (halves.length > 2) return null;
  const head = halves[0] ? halves[0].split(":") : [];
  const tail = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  const fill = halves.length === 2 ? 8 - head.length - tail.length : 0;
  const groups = [...head, ...Array(fill).fill("0"), ...tail].map((g) => parseInt(g, 16));
  if (groups.length !== 8 || groups.some((g) => Number.isNaN(g))) return null;
  return groups;
}

function v6Public(ip: string): boolean {
  const g = v6Groups(ip);
  if (!g) return false;
  const allZero = (from: number, to: number) => g.slice(from, to).every((x) => x === 0);
  const embeddedV4 = () => `${g[6] >> 8}.${g[6] & 255}.${g[7] >> 8}.${g[7] & 255}`;

  if (allZero(0, 8)) return false;                                   // ::
  if (allZero(0, 7) && g[7] === 1) return false;                     // ::1
  if (allZero(0, 5) && g[5] === 0xffff) return v4Public(embeddedV4()); // ::ffff:a.b.c.d
  if (allZero(0, 6)) return v4Public(embeddedV4());                  // ::a.b.c.d (deprecated form)
  if (g[0] === 0x64 && g[1] === 0xff9b) return v4Public(embeddedV4()); // 64:ff9b::/96 NAT64
  if ((g[0] & 0xfe00) === 0xfc00) return false;                      // fc00::/7 unique local
  if ((g[0] & 0xffc0) === 0xfe80) return false;                      // fe80::/10 link-local
  if ((g[0] & 0xffc0) === 0xfec0) return false;                      // fec0::/10 site-local
  if ((g[0] & 0xff00) === 0xff00) return false;                      // ff00::/8 multicast
  if (g[0] === 0x2001 && g[1] === 0x0db8) return false;              // 2001:db8::/32 documentation
  if (g[0] === 0x2002) return false;                                 // 6to4 wraps an IPv4 we would not see
  if (g[0] === 0x2001 && g[1] === 0) return false;                   // Teredo, same reason
  return true;
}

/** True only for an address a public website could be served from. */
export function isPublicIp(ip: string): boolean {
  const kind = isIP(ip.split("%")[0]);
  if (kind === 4) return v4Public(ip);
  if (kind === 6) return v6Public(ip);
  return false;
}
