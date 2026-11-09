// Tests for lib/url-safety.ts, the gate in front of the AI visibility check's fetcher.
// Run: npm test   (node --test, with Node's built-in TypeScript type stripping)

import { test } from "node:test";
import assert from "node:assert/strict";
import { checkUrl, isPublicIp } from "../lib/url-safety.ts";

const rejected = [
  // loopback and local names
  "http://localhost",
  "localhost",
  "https://LOCALHOST./",
  "http://app.localhost",
  "http://printer.local",
  "http://db.internal",
  "http://intranet",
  // private, reserved and metadata IPv4 literals
  "http://127.0.0.1",
  "http://127.1",
  "http://2130706433",
  "http://0x7f000001",
  "http://0.0.0.0",
  "http://10.0.0.5",
  "http://172.16.0.1",
  "http://172.31.255.255",
  "http://192.168.1.1",
  "http://169.254.169.254/latest/meta-data/",
  "http://100.64.0.1",
  "http://198.18.0.1",
  "http://224.0.0.1",
  "http://255.255.255.255",
  // IPv6 literals
  "http://[::1]",
  "http://[::]",
  "http://[fd00::1]",
  "http://[fe80::1]",
  "http://[::ffff:127.0.0.1]",
  "http://[::ffff:10.0.0.1]",
  "http://[64:ff9b::a9fe:a9fe]",
  // other schemes
  "file:///etc/passwd",
  "ftp://example.com",
  "gopher://example.com",
  "javascript:alert(1)",
  "data:text/html,hi",
  // non-standard ports
  "http://example.com:8080",
  "https://example.com:8443/",
  "example.com:3000",
  "http://example.com:443",
  "https://example.com:80",
  // credentials
  "https://user:pass@example.com",
  // junk
  "",
  "   ",
  "not a url at all",
];

const accepted = [
  "https://purcellventures.co",
  "purcellventures.co",
  "http://example.com/",
  "https://example.com:443/page",
  "http://example.com:80",
  "https://www.example.com/path?q=1",
  "http://8.8.8.8",
  "http://[2606:4700:4700::1111]",
];

for (const u of rejected) {
  test(`rejects ${JSON.stringify(u)}`, () => {
    const r = checkUrl(u);
    assert.equal(r.ok, false, `expected ${u} to be rejected`);
  });
}

for (const u of accepted) {
  test(`accepts ${JSON.stringify(u)}`, () => {
    const r = checkUrl(u);
    assert.equal(r.ok, true, `expected ${u} to be accepted: ${r.ok ? "" : r.reason}`);
  });
}

test("isPublicIp sorts resolved addresses", () => {
  for (const ip of ["127.0.0.1", "10.1.2.3", "192.168.0.10", "172.20.1.1", "169.254.169.254", "::1", "fc00::1", "::ffff:192.168.0.1", "0.0.0.0"]) {
    assert.equal(isPublicIp(ip), false, ip);
  }
  for (const ip of ["8.8.8.8", "1.1.1.1", "76.76.21.21", "2606:4700:4700::1111", "::ffff:8.8.8.8"]) {
    assert.equal(isPublicIp(ip), true, ip);
  }
  assert.equal(isPublicIp("not-an-ip"), false);
});
