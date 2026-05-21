// Phyllotaxis dot generator — golden-angle spiral.
// Reused by every page that uses the Vignette background.
export function generatePhiDots(
  cx = 600,
  cy = 800,
  n = 380,
  spread = 26
): string {
  const golden = Math.PI * (3 - Math.sqrt(5));
  let s = "";
  for (let i = 0; i < n; i++) {
    const r = spread * Math.sqrt(i);
    const t = i * golden;
    const x = cx + r * Math.cos(t);
    const y = cy + r * Math.sin(t);
    const dot = 1.4 + (i / n) * 0.6;
    const op = 0.12 + 0.7 * (1 - i / n);
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${dot.toFixed(2)}" opacity="${op.toFixed(2)}"/>`;
  }
  return s;
}
