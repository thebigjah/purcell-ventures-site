// The one fetcher behind /api/ai-visibility-check. Server only.
//
// Built on node:http and node:https rather than fetch() because the socket needs its own
// DNS lookup: safeLookup() resolves the name, refuses the connection if any address is
// private, and hands the checked address straight to the socket. With fetch(), a name
// checked here could resolve again inside the connection to something else.
//
// Limits per request: 8 seconds total, 2 MB of body after decompression, 3 redirects,
// each redirect target re-checked by checkUrl(). No cookies are sent or kept.

import http from "node:http";
import https from "node:https";
import dns from "node:dns";
import zlib from "node:zlib";
import type { LookupFunction } from "node:net";
import { checkUrl, isPublicIp } from "@/lib/url-safety";

export const TIMEOUT_MS = 8000;
export const MAX_BYTES = 2 * 1024 * 1024;
export const MAX_REDIRECTS = 3;

export type FetchResult =
  | { ok: true; status: number; finalUrl: string; contentType: string; body: string; truncated: boolean; redirects: number }
  | { ok: false; error: string; finalUrl?: string };

class BlockedAddress extends Error {}

const safeLookup: LookupFunction = (hostname, options, callback) => {
  dns.lookup(hostname, { ...options, all: true }, (err, addresses) => {
    if (err) return callback(err, "", 4);
    const list = addresses as dns.LookupAddress[];
    if (!list.length) return callback(new Error("no address"), "", 4);
    if (list.some((a) => !isPublicIp(a.address))) {
      return callback(new BlockedAddress("private address"), "", 4);
    }
    if ((options as dns.LookupOptions).all) {
      (callback as unknown as (e: null, a: dns.LookupAddress[]) => void)(null, list);
    } else {
      callback(null, list[0].address, list[0].family);
    }
  });
};

function once(url: URL, deadline: number): Promise<
  | { kind: "redirect"; location: string; status: number }
  | { kind: "done"; status: number; contentType: string; body: string; truncated: boolean }
> {
  return new Promise((resolve, reject) => {
    const lib = url.protocol === "https:" ? https : http;
    const remaining = deadline - Date.now();
    if (remaining <= 0) return reject(new Error("timeout"));

    const req = lib.request(
      url,
      {
        method: "GET",
        lookup: safeLookup,
        agent: false,
        headers: {
          "user-agent": "PurcellVenturesVisibilityCheck/1.0 (+https://purcellventures.co/ai-visibility-check)",
          accept: "text/html,text/plain;q=0.9,*/*;q=0.5",
          "accept-encoding": "gzip, deflate, br",
        },
      },
      (res) => {
        const status = res.statusCode || 0;
        if (status >= 300 && status < 400 && res.headers.location) {
          res.resume();
          return resolve({ kind: "redirect", location: res.headers.location, status });
        }

        const enc = String(res.headers["content-encoding"] || "").toLowerCase();
        let stream: NodeJS.ReadableStream = res;
        if (enc === "gzip" || enc === "x-gzip") stream = res.pipe(zlib.createGunzip());
        else if (enc === "deflate") stream = res.pipe(zlib.createInflate());
        else if (enc === "br") stream = res.pipe(zlib.createBrotliDecompress());

        const chunks: Buffer[] = [];
        let size = 0;
        let truncated = false;
        const finish = () =>
          resolve({
            kind: "done",
            status,
            contentType: String(res.headers["content-type"] || ""),
            body: Buffer.concat(chunks).toString("utf8"),
            truncated,
          });

        stream.on("data", (c: Buffer) => {
          if (truncated) return;
          size += c.length;
          if (size > MAX_BYTES) {
            // Keep what fits and stop reading. Counting after decompression means a
            // small compressed reply cannot expand past the cap.
            chunks.push(c.subarray(0, c.length - (size - MAX_BYTES)));
            truncated = true;
            req.destroy();
            finish();
            return;
          }
          chunks.push(c);
        });
        stream.on("end", () => { if (!truncated) finish(); });
        stream.on("error", (e) => { if (!truncated) reject(e); });
      }
    );

    req.setTimeout(remaining, () => req.destroy(new Error("timeout")));
    req.on("error", (e) => reject(e));
    req.end();
  });
}

/** Fetch one URL under the limits above. Never throws. */
export async function safeFetch(input: string | URL): Promise<FetchResult> {
  const first = checkUrl(String(input));
  if (!first.ok) return { ok: false, error: first.reason };

  const deadline = Date.now() + TIMEOUT_MS;
  let url = first.url;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    try {
      const r = await once(url, deadline);
      if (r.kind === "done") {
        return { ok: true, status: r.status, finalUrl: url.toString(), contentType: r.contentType, body: r.body, truncated: r.truncated, redirects: hop };
      }
      if (hop === MAX_REDIRECTS) {
        return { ok: false, error: `More than ${MAX_REDIRECTS} redirects.`, finalUrl: url.toString() };
      }
      const next = checkUrl(new URL(r.location, url).toString());
      if (!next.ok) return { ok: false, error: `A redirect pointed somewhere the check will not follow. ${next.reason}`, finalUrl: url.toString() };
      url = next.url;
    } catch (e) {
      const err = e as NodeJS.ErrnoException;
      let msg = "The site could not be reached.";
      if (e instanceof BlockedAddress || err?.message === "private address") msg = "That address points to a private or reserved network.";
      else if (err?.message === "timeout") msg = `The site did not answer within ${TIMEOUT_MS / 1000} seconds.`;
      else if (err?.code === "ENOTFOUND" || err?.code === "EAI_AGAIN") msg = "That domain name does not resolve.";
      else if (err?.code?.startsWith("ERR_TLS") || err?.code === "CERT_HAS_EXPIRED" || err?.code === "DEPTH_ZERO_SELF_SIGNED_CERT" || err?.code === "UNABLE_TO_VERIFY_LEAF_SIGNATURE") msg = "The site's security certificate failed verification.";
      return { ok: false, error: msg, finalUrl: url.toString() };
    }
  }
  return { ok: false, error: "The site could not be reached." };
}
