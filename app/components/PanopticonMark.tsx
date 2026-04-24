// Shared reverse-panopticon SVG mark — used in landing page and brand identity page.

const GOLD = "#d4af37";
const DARK = "#0c0a08";

export type PanopConfig = {
  numGroups?: number;
  includeFlankers?: boolean;
  flankerDeg?: number;
  numRings?: number;
  cellStyle?: "filled" | "outlined";
  tallH?: number;
  shortH?: number;
  pvSize?: number;          // PV text font size (default 30)
  pvClearR?: number;        // clearing circle radius behind PV text (default 34)
  ringStart?: number;       // inner radius of ring band (default 42)
  ringEnd?: number;         // outer radius of ring band (default 85)
  ringFadeToCenter?: boolean; // fade rings toward center — outer rings stronger (broadcast feel)
};

export function PanopticonElements({ cx, cy, color, cfg }: {
  cx: number; cy: number; color: string; cfg: PanopConfig;
}) {
  const {
    numGroups = 8, includeFlankers = true, flankerDeg = 10,
    numRings = 10, cellStyle = "filled", tallH = 32, shortH = 16,
    ringStart = 42, ringEnd = 85, ringFadeToCenter = false,
  } = cfg;
  const ringR = 135;
  const ringSW = cellStyle === "outlined" ? 3 : 20;
  const cellOuter = 124;
  const tallW = numGroups <= 4 ? 9 : numGroups <= 8 ? 7 : 5;
  const shortW = numGroups <= 4 ? 6 : numGroups <= 8 ? 4.5 : 3.5;
  const cells: [number, number, number, number][] = [];
  for (let g = 0; g < numGroups; g++) {
    const base = g * (360 / numGroups);
    cells.push([base, cellOuter, cellOuter - tallH, tallW]);
    if (includeFlankers) {
      cells.push([base - flankerDeg, cellOuter, cellOuter - shortH, shortW]);
      cells.push([base + flankerDeg, cellOuter, cellOuter - shortH, shortW]);
    }
  }
  const rings = numRings > 0
    ? Array.from({ length: numRings }, (_, i) => ringStart + (ringEnd - ringStart) * i / Math.max(numRings - 1, 1))
    : [];
  return (
    <>
      <circle cx={cx} cy={cy} r={ringR} stroke={color} strokeWidth={ringSW} fill="none" />
      {cellStyle === "outlined" && (
        <circle cx={cx} cy={cy} r={112} stroke={color} strokeWidth="0.7" fill="none" opacity={0.4} />
      )}
      {cells.map(([angle, outer, inner, w], i) => (
        <rect key={i}
          x={cx - w / 2} y={cy - outer} width={w} height={outer - inner}
          fill={cellStyle === "filled" ? color : "none"}
          stroke={cellStyle === "outlined" ? color : "none"}
          strokeWidth={cellStyle === "outlined" ? 0.8 : 0}
          transform={`rotate(${angle} ${cx} ${cy})`} />
      ))}
      {rings.map((r, i) => {
        const t = numRings > 1 ? i / (numRings - 1) : 1;
        const opacity = ringFadeToCenter ? 0.10 + 0.68 * t : 0.38 + 0.06 * i;
        return (
          <circle key={i} cx={cx} cy={cy} r={r} stroke={color}
            strokeWidth={cellStyle === "outlined" ? "0.8" : "1.1"}
            fill="none" opacity={opacity} />
        );
      })}
    </>
  );
}

export function PanopticonMark({ size = 280, color = GOLD, bg = DARK, cfg }: {
  size?: number; color?: string; bg?: string; cfg?: PanopConfig;
}) {
  const resolved = cfg ?? {};
  const cx = 150, cy = 150;
  const { pvSize = 30, pvClearR = 34 } = resolved;
  return (
    <svg width={size} height={size} viewBox="0 0 300 300" style={{ display: "block" }}>
      <rect width="300" height="300" fill={bg} rx="8" />
      <PanopticonElements cx={cx} cy={cy} color={color} cfg={resolved} />
      <circle cx={cx} cy={cy} r={pvClearR} fill={bg} />
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
        fontFamily="'Cinzel', Georgia, serif" fontSize={pvSize} fontWeight="700"
        fill={color} style={{ letterSpacing: "1.8px" }}>PV</text>
    </svg>
  );
}

export function PanopticonSplit({ size = 280 }: { size?: number }) {
  const cx = 150, cy = 150;
  const cfg: PanopConfig = { numGroups: 8, includeFlankers: true, numRings: 10 };
  const pvText = (fill: string) => (
    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
      fontFamily="'Cinzel', Georgia, serif" fontSize="30" fontWeight="700"
      fill={fill} style={{ letterSpacing: "1.8px" }}>PV</text>
  );
  return (
    <svg width={size} height={size} viewBox="0 0 300 300" style={{ display: "block" }}>
      <defs>
        <clipPath id="pv-left"><rect x="0" y="0" width="150" height="300" /></clipPath>
        <clipPath id="pv-right"><rect x="150" y="0" width="150" height="300" /></clipPath>
      </defs>
      <rect x="0" y="0" width="150" height="300" fill={DARK} />
      <rect x="150" y="0" width="150" height="300" fill={GOLD} />
      <g clipPath="url(#pv-left)">
        <PanopticonElements cx={cx} cy={cy} color={GOLD} cfg={cfg} />
        <circle cx={cx} cy={cy} r="34" fill={DARK} />
        {pvText(GOLD)}
      </g>
      <g clipPath="url(#pv-right)">
        <PanopticonElements cx={cx} cy={cy} color={DARK} cfg={cfg} />
        <circle cx={cx} cy={cy} r="34" fill={GOLD} />
        {pvText(DARK)}
      </g>
      <line x1="150" y1="0" x2="150" y2="300" stroke={GOLD} strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}
