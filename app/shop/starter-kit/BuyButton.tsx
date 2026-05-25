"use client";

import { useEffect, useState } from "react";
import { captureRefFromURL, buildStripeURL, logClick } from "@/lib/affiliate";

/**
 * Buy button that appends ?client_reference_id=ref to the Stripe URL if a referrer was captured.
 */
export function BuyButton({ paymentLink, product, size = "large" }: { paymentLink: string; product: string; size?: "large" | "small" }) {
  const [ref, setRef] = useState<string | null>(null);

  useEffect(() => {
    setRef(captureRefFromURL());
  }, []);

  const href = buildStripeURL(paymentLink, ref);

  function handleClick() {
    logClick(product, "buy-button");
  }

  if (size === "small") {
    return (
      <a
        href={href}
        onClick={handleClick}
        style={{
          display: "inline-block",
          padding: "12px 24px",
          background: "var(--color-warm-accent)",
          color: "var(--color-warm-bg)",
          fontFamily: "'Cinzel', Georgia, serif",
          fontSize: "14px",
          fontWeight: 700,
          textDecoration: "none",
          letterSpacing: "0.04em",
        }}
      >
        Buy now →
      </a>
    );
  }

  return (
    <>
      <a
        href={href}
        onClick={handleClick}
        style={{
          display: "inline-block",
          padding: "16px 40px",
          background: "var(--color-warm-accent)",
          color: "var(--color-warm-bg)",
          fontFamily: "'Cinzel', Georgia, serif",
          fontSize: "18px",
          fontWeight: 700,
          textDecoration: "none",
          border: "none",
          letterSpacing: "0.04em",
          cursor: "pointer",
        }}
      >
        Buy now — $19 →
      </a>
      {ref && (
        <p style={{ fontSize: "11px", color: "var(--color-warm-text-light)", marginTop: "8px", fontStyle: "italic" }}>
          Referred by <strong>{ref}</strong> · they get credit if you purchase
        </p>
      )}
    </>
  );
}
