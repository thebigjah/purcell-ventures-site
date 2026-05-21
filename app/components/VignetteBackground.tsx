"use client";

import { useEffect, useRef } from "react";
import { generatePhiDots } from "@/lib/phi";

/**
 * Drop-in fixed Phi-vignette backdrop for any page that adopts the
 * Field Ledger / Vignette design language. Renders an SVG behind
 * content (z-index 0, pointer-events none) with a radial-gradient
 * mask cutting out the reading zone.
 */
export function VignetteBackground() {
  const phiRef = useRef<SVGGElement>(null);
  useEffect(() => {
    if (phiRef.current) phiRef.current.innerHTML = generatePhiDots();
  }, []);

  return (
    <div className="pv-phi-field" aria-hidden="true">
      <svg viewBox="0 0 1200 1600" preserveAspectRatio="xMidYMid slice">
        <g ref={phiRef} fill="#d4af37"></g>
      </svg>
    </div>
  );
}
