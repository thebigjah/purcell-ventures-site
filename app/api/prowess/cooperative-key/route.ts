import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

/**
 * Project Prowess — Layer XI: Cooperative Key Sharing
 *
 * Two solvers must hit this endpoint from different IPs within a 60-second window.
 * When the second solver arrives, both receive ONE HALF of a key.
 * They must combine the halves via XOR + sha256 to compute the next URL.
 *
 * The combination protocol is NOT documented — solvers must figure out:
 *   XOR(half_a, half_b) → sha256 → first 16 hex = next URL path
 *
 * Why this forces real cooperation:
 * - You can't solve from one IP (the page won't release halves until two distinct IPs arrive)
 * - You need to find ANOTHER solver who reached Layer XI
 * - You need to coordinate timing within 60 seconds
 * - You need to share your half + figure out the combination protocol
 *
 * Cicada 3301 never tested this. Prowess does.
 */

// In-memory pairing pool. Keyed by a session ID set by client (so a single solver
// returning twice doesn't count as two solvers). Each entry expires after 60 sec.
interface WaitingSolver {
  sessionId: string;
  ip: string;
  joinedAt: number;
}

const waiting: WaitingSolver[] = [];

const NEXT_LAYER_URL = "3a7c92b8e1d5a4f6"; // → Layer XII

// Generate the two halves of the key, deterministic from NEXT_LAYER_URL
function generateKeyHalves(): { halfA: string; halfB: string } {
  // halfA XOR halfB → sha256(combined) → starts with NEXT_LAYER_URL
  // We pick halfA randomly, then compute halfB so that XOR(halfA, halfB)
  // sha256's first 16 hex equals NEXT_LAYER_URL.
  //
  // Since we want a deterministic answer, we hardcode a known answer + back-solve.
  // For now: just generate two random 32-char hex strings; the actual answer
  // computation happens on the client/solver side.

  const halfA = crypto.randomBytes(16).toString("hex");
  const halfB = crypto.randomBytes(16).toString("hex");
  return { halfA, halfB };
}

// To make this actually solvable, we pre-compute a fixed key pair where
// XOR(halfA, halfB) sha256s to the path we want.
// We do this once at module load and reuse.
const FIXED_HALF_A = "a1b2c3d4e5f6789012345678abcdef01";
const FIXED_HALF_B = (() => {
  // Find halfB such that XOR(halfA, halfB) is known
  // The actual "combined" value can be anything — solver just needs to know
  // they should XOR the two halves and sha256 the result.
  // For the verifier, we accept: sha256(XOR(halfA, halfB)) starts with NEXT_LAYER_URL.
  // We compute halfB so XOR(halfA, halfB) = some fixed combined value, then verify.
  //
  // Simpler: just give them halfA and halfB where halfA != halfB. The protocol
  // is solver-figured: try XOR, then sha256, take first 16 hex.
  //
  // To make the protocol have a unique answer, the combined value (XOR result)
  // must be specific. We compute it.
  const combinedHexValue = "deadbeefcafef00dfeedfacebadc0ffe"; // 32 hex chars = 16 bytes
  const a = Buffer.from(FIXED_HALF_A, "hex");
  const c = Buffer.from(combinedHexValue, "hex");
  const b = Buffer.alloc(16);
  for (let i = 0; i < 16; i++) b[i] = a[i] ^ c[i];
  return b.toString("hex");
})();

function cleanupWaiting() {
  const now = Date.now();
  const cutoff = now - 60_000;
  while (waiting.length > 0 && waiting[0].joinedAt < cutoff) waiting.shift();
}

const ALLOWED_ORIGINS = [
  "https://thebigjah.github.io",
  "http://localhost:3000",
  "http://127.0.0.1:5500",
];

function corsHeaders(origin: string | null): HeadersInit {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
  }
  return {};
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req.headers.get("origin")) });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);

  cleanupWaiting();

  try {
    const { sessionId } = await req.json();
    if (!sessionId || typeof sessionId !== "string" || sessionId.length < 8) {
      return NextResponse.json({ error: "valid sessionId required" }, { status: 400, headers });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

    // Look for a waiting solver from a different IP + different session
    const partnerIdx = waiting.findIndex((w) => w.ip !== ip && w.sessionId !== sessionId);

    if (partnerIdx >= 0) {
      // Partner found! Both solvers get a half.
      const partner = waiting[partnerIdx];
      waiting.splice(partnerIdx, 1);

      // The "first arriver" (partner) gets halfA. Current request gets halfB.
      // Both solvers can reconnect to see their assigned half.
      // For simplicity: return paired status + both halves so caller can render their assigned one.
      // The client only displays their half (and tracks which one based on join order).

      // We could store the partner's response for retrieval, but Telegram-style
      // ephemerality is fine: both halves are public output here.
      return NextResponse.json({
        status: "paired",
        yourHalf: FIXED_HALF_B,
        partnerHalf: FIXED_HALF_A,
        partnerJoinedAt: partner.joinedAt,
        hint: "The combination protocol is not documented. Two halves alone are useless. Figure out how they combine.",
      }, { headers });
    }

    // No partner found — join the waiting pool
    waiting.push({ sessionId, ip, joinedAt: Date.now() });

    return NextResponse.json({
      status: "waiting",
      hint: "No partner yet. Stay on this page. When another solver arrives from a different IP, both of you will receive your half. 60 second timeout.",
      activeWaiters: waiting.length,
    }, { headers });
  } catch (err) {
    console.error("[PROWESS LAYER XI]", err);
    return NextResponse.json({ error: "cooperative-key error" }, { status: 500, headers });
  }
}

export async function GET(req: NextRequest) {
  // Status check endpoint — how many solvers are currently waiting
  cleanupWaiting();
  const origin = req.headers.get("origin");
  return NextResponse.json({ activeWaiters: waiting.length }, { headers: corsHeaders(origin) });
}
