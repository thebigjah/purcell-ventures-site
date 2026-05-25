/**
 * Affiliate / referral tracking — v0.
 *
 * URL: ?ref=name appends to /shop/* URLs.
 * Client-side: captures ref into localStorage so it survives page transitions.
 * Stripe Payment Link: appends client_reference_id=ref so it flows through to
 *   Stripe's records (you can see it in the Stripe dashboard per purchase).
 *
 * Once Firestore lands, the ref → purchase mapping can be persisted and
 * commission attribution becomes automatic.
 */

const REF_STORAGE_KEY = "pv_referrer";
const CLICK_LOG_KEY = "pv_affiliate_clicks";

export interface ClickEvent {
  ref: string;
  product: string;
  timestamp: string;
  source?: string;
}

/**
 * Reads the ?ref= URL param if present; stores it in localStorage.
 * Returns the captured ref so caller can use it.
 */
export function captureRefFromURL(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");
  if (ref && ref.trim()) {
    const clean = ref.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 32);
    if (clean) {
      localStorage.setItem(REF_STORAGE_KEY, clean);
      return clean;
    }
  }
  return localStorage.getItem(REF_STORAGE_KEY);
}

export function getReferrer(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REF_STORAGE_KEY);
}

export function clearReferrer(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(REF_STORAGE_KEY);
}

/**
 * Log a click event locally (for admin to see in /rep-portal/affiliates).
 * Once Firestore: send to backend instead.
 */
export function logClick(product: string, source?: string): void {
  if (typeof window === "undefined") return;
  const ref = getReferrer();
  if (!ref) return;
  try {
    const raw = localStorage.getItem(CLICK_LOG_KEY);
    const events: ClickEvent[] = raw ? JSON.parse(raw) : [];
    events.push({ ref, product, timestamp: new Date().toISOString(), source });
    // Cap at 500 events
    const trimmed = events.slice(-500);
    localStorage.setItem(CLICK_LOG_KEY, JSON.stringify(trimmed));
  } catch { /* ignore */ }
}

/**
 * Build a Stripe Payment Link URL with the referrer attached.
 * If the base URL has query params, appends correctly.
 */
export function buildStripeURL(basePaymentLink: string, ref?: string | null): string {
  if (!basePaymentLink || basePaymentLink === "#configure-stripe") return basePaymentLink;
  const refToUse = ref || getReferrer();
  if (!refToUse) return basePaymentLink;
  const separator = basePaymentLink.includes("?") ? "&" : "?";
  // Stripe Payment Links accept ?client_reference_id=XXX which flows into the resulting Stripe session
  return `${basePaymentLink}${separator}client_reference_id=${encodeURIComponent(refToUse)}`;
}

export function getClickEvents(): ClickEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CLICK_LOG_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch { return []; }
}

export function clearClickLog(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CLICK_LOG_KEY);
}
