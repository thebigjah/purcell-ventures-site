// Tests for lib/rep-session.ts, the signed cookie in front of the rep portal and its AI routes.
// Run: npm test   (node --test, with Node's built-in TypeScript type stripping)

import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { signSession, verifySession, timingSafeEqualStr } from "../lib/rep-session.ts";

const DAY = 24 * 60 * 60 * 1000;

beforeEach(() => {
  delete process.env.REP_SESSION_SECRET;
  delete process.env.REP_PORTAL_PASSWORD;
  process.env.REP_PASSWORDS = "Test:pw,Other:pw2";
});

function b64url(s) {
  return Buffer.from(s, "utf8").toString("base64url");
}

test("valid round trip returns the name", async () => {
  const v = await signSession("Test");
  assert.equal(await verifySession(v), "Test");
});

test("non-ASCII names round trip", async () => {
  const v = await signSession("José Ñ");
  assert.equal(await verifySession(v), "José Ñ");
});

test("tampered name is rejected", async () => {
  const [, issued, sig] = (await signSession("Test")).split(".");
  assert.equal(await verifySession(`${b64url("Elijah")}.${issued}.${sig}`), null);
});

test("tampered timestamp is rejected", async () => {
  const [name, issued, sig] = (await signSession("Test")).split(".");
  assert.equal(await verifySession(`${name}.${Number(issued) + 1}.${sig}`), null);
});

test("tampered signature is rejected", async () => {
  const v = await signSession("Test");
  const flipped = v.slice(0, -1) + (v.endsWith("A") ? "B" : "A");
  assert.equal(await verifySession(flipped), null);
  assert.equal(await verifySession(v.slice(0, v.lastIndexOf(".") + 1)), null);
});

test("expired session is rejected, fresh one inside 30 days accepted", async () => {
  const now = Date.now();
  const old = await signSession("Test", now - 31 * DAY);
  assert.equal(await verifySession(old, now), null);
  const recent = await signSession("Test", now - 29 * DAY);
  assert.equal(await verifySession(recent, now), "Test");
});

test("issued far in the future is rejected", async () => {
  const now = Date.now();
  assert.equal(await verifySession(await signSession("Test", now + DAY), now), null);
});

test("empty secret: verification always fails and signing refuses", async () => {
  const v = await signSession("Test");
  delete process.env.REP_PASSWORDS;
  assert.equal(await verifySession(v), null);
  await assert.rejects(() => signSession("Test"));
});

test("a different secret invalidates existing sessions", async () => {
  const v = await signSession("Test");
  process.env.REP_SESSION_SECRET = "rotated";
  assert.equal(await verifySession(v), null);
});

test("malformed values are rejected", async () => {
  for (const bad of [undefined, null, "", "1", "anything", "a.b", "a.b.c.d", "..", `${b64url("x")}.notanumber.sig`, "x".repeat(2000)]) {
    assert.equal(await verifySession(bad), null, String(bad));
  }
});

test("timingSafeEqualStr", () => {
  assert.equal(timingSafeEqualStr("abc", "abc"), true);
  assert.equal(timingSafeEqualStr("abc", "abd"), false);
  assert.equal(timingSafeEqualStr("abc", "abcd"), false);
  assert.equal(timingSafeEqualStr("", ""), true);
});
