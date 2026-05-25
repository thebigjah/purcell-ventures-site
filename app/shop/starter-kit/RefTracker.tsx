"use client";

import { useEffect } from "react";
import { captureRefFromURL, logClick } from "@/lib/affiliate";

/**
 * Captures ?ref=NAME from URL into localStorage + logs a click event.
 * Mount on the shop landing pages. No-op visually.
 */
export function RefTracker({ product }: { product: string }) {
  useEffect(() => {
    const ref = captureRefFromURL();
    if (ref) {
      logClick(product, "landing");
    }
  }, [product]);

  return null;
}
