"use client";

import { useEffect, useState } from "react";
import { captureRefFromURL, buildStripeURL, logClick } from "@/lib/affiliate";

/**
 * Buy button that appends ?client_reference_id=ref to the Stripe URL if a referrer was captured.
 */
export function BuyButton({ paymentLink, product, price, size = "large" }: { paymentLink: string; product: string; price: string; size?: "large" | "small" }) {
  const [ref, setRef] = useState<string | null>(null);

  useEffect(() => {
    setRef(captureRefFromURL());
  }, []);

  const href = buildStripeURL(paymentLink, ref);

  function handleClick() {
    logClick(product, "buy-button");
  }

  // Restyled on the page kit 26 Oct 2026. The link, the referral capture and the click
  // log are unchanged.
  if (size === "small") {
    return (
      <a href={href} onClick={handleClick} className="ui-btn" style={{ minHeight: 48 }}>
        Buy now
      </a>
    );
  }

  return (
    <>
      <a href={href} onClick={handleClick} className="ui-btn" style={{ minHeight: 52, fontSize: 17, padding: "16px 28px" }}>
        Buy now for {price}
      </a>
      {ref && (
        <p className="ui-muted ui-small" style={{ margin: 0, flexBasis: "100%" }}>
          Referred by <strong>{ref}</strong>, who gets credit if you buy.
        </p>
      )}
    </>
  );
}
