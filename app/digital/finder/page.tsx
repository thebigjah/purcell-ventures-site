"use client";

import { useState, useCallback } from "react";

type Business = {
  name: string;
  type: string;
  distance: string;
  reviews: number;
  rating: number;
  hasWebsite: boolean;
  hasSocial: boolean;
  hasBooking: boolean;
  googleProfile: "complete" | "partial" | "none";
  score: number;
  address: string;
  notes: string;
};

const MOCK_BUSINESSES: Business[] = [
  { name: "Martinez Hair Studio", type: "Salon", distance: "0.3 mi", reviews: 7, rating: 4.1, hasWebsite: false, hasSocial: false, hasBooking: false, googleProfile: "partial", score: 94, address: "412 Canton Rd, Marietta, GA", notes: "No website, 7 reviews, no social presence. Owner visible on Google listing." },
  { name: "Kennesaw Cuts Barbershop", type: "Barber", distance: "0.6 mi", reviews: 23, rating: 3.8, hasWebsite: false, hasSocial: true, hasBooking: false, googleProfile: "partial", score: 82, address: "1806 Jiles Rd NW, Kennesaw, GA", notes: "Low rating, no website, phone-only booking. Last IG post 8 months ago." },
  { name: "Quick Trim Lawncare", type: "Landscaping", distance: "0.9 mi", reviews: 4, rating: 4.5, hasWebsite: false, hasSocial: false, hasBooking: false, googleProfile: "none", score: 96, address: "214 Pine St, Acworth, GA", notes: "Barely exists online. 4 reviews only. No website, no socials, no booking." },
  { name: "Bella's Nail Spa", type: "Nail Salon", distance: "1.1 mi", reviews: 41, rating: 3.9, hasWebsite: true, hasSocial: true, hasBooking: false, googleProfile: "complete", score: 58, address: "3200 George Busbee Pkwy, Kennesaw, GA", notes: "Has a site but it's outdated Wix. No online booking. Reviews mention difficulty reaching them." },
  { name: "Pro Clean Pressure Washing", type: "Services", distance: "1.4 mi", reviews: 12, rating: 4.7, hasWebsite: false, hasSocial: false, hasBooking: false, googleProfile: "partial", score: 88, address: "604 Roberts Rd NW, Marietta, GA", notes: "Great reviews but zero digital presence. Lost in search behind competitors." },
  { name: "Fusion Tacos", type: "Restaurant", distance: "1.6 mi", reviews: 89, rating: 4.2, hasWebsite: true, hasSocial: true, hasBooking: false, googleProfile: "complete", score: 42, address: "1020 E Marietta St, Kennesaw, GA", notes: "Decent presence. Could use review management and social automation, not a priority." },
  { name: "Sunrise Cleaning Co", type: "Cleaning", distance: "2.0 mi", reviews: 6, rating: 5.0, hasWebsite: false, hasSocial: false, hasBooking: false, googleProfile: "none", score: 97, address: "888 Cherokee St, Marietta, GA", notes: "5-star with zero marketing. Website + chatbot would convert their word-of-mouth into referrals." },
  { name: "Crown Auto Detail", type: "Auto", distance: "2.3 mi", reviews: 31, rating: 4.4, hasWebsite: false, hasSocial: true, hasBooking: false, googleProfile: "partial", score: 76, address: "2245 N Marietta Pkwy, Marietta, GA", notes: "Active Instagram but no website or booking. Social following ready to convert." },
  { name: "The Brow Bar", type: "Beauty", distance: "2.7 mi", reviews: 18, rating: 4.0, hasWebsite: false, hasSocial: true, hasBooking: false, googleProfile: "partial", score: 80, address: "455 Ernest Barrett Pkwy, Kennesaw, GA", notes: "Posts regularly but sends customers to DMs for booking. Booking system would close that gap." },
  { name: "HandyPro Home Repair", type: "Contractor", distance: "3.1 mi", reviews: 3, rating: 4.3, hasWebsite: false, hasSocial: false, hasBooking: false, googleProfile: "none", score: 95, address: "112 Old 41 Hwy NW, Kennesaw, GA", notes: "3 reviews, completely invisible online. High value per job — website + estimating tool = strong pitch." },
  { name: "Magnolia Day Spa", type: "Spa", distance: "3.4 mi", reviews: 64, rating: 4.6, hasWebsite: true, hasSocial: true, hasBooking: true, googleProfile: "complete", score: 22, address: "700 Ernest W Barrett Pkwy, Kennesaw, GA", notes: "Well set up already. Low priority unless you can offer something they don't have." },
  { name: "Ramos Electrical", type: "Contractor", distance: "3.8 mi", reviews: 9, rating: 4.8, hasWebsite: false, hasSocial: false, hasBooking: false, googleProfile: "partial", score: 89, address: "3400 Canton Rd, Marietta, GA", notes: "Exceptional work, terrible online presence. Estimating + website would be perfect fit." },
];

const RADIUS_OPTIONS = [
  { label: "0.5 mi", value: 800 },
  { label: "1 mi", value: 1600 },
  { label: "2 mi", value: 3200 },
  { label: "5 mi", value: 8000 },
  { label: "10 mi", value: 16000 },
];

const SCORE_COLORS = (score: number) =>
  score >= 85 ? "#7aaa6a" : score >= 65 ? "#d4af37" : score >= 40 ? "#e8a030" : "#e05c5c";

const SCORE_LABEL = (score: number) =>
  score >= 85 ? "Hot Lead" : score >= 65 ? "Good Prospect" : score >= 40 ? "Possible" : "Low Priority";

function PresenceDot({ active, label }: { active: boolean; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: active ? "#e05c5c" : "#7aaa6a", flexShrink: 0 }} />
      <span style={{ fontSize: "10px", color: "#8a8070" }}>{label}</span>
    </div>
  );
}

export default function FinderPage() {
  const [businesses, setBusinesses] = useState<Business[]>(MOCK_BUSINESSES);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [radius, setRadius] = useState(5000);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [minScore, setMinScore] = useState(0);
  const [targets, setTargets] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"score" | "distance" | "reviews">("score");

  const fetchNearby = useCallback(async (lat: number, lng: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/finder?lat=${lat}&lng=${lng}&radius=${radius}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Search failed");
      setBusinesses(data.businesses);
      setIsLive(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [radius]);

  function useMyLocation() {
    if (!navigator.geolocation) { setError("Geolocation not supported by your browser"); return; }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchNearby(pos.coords.latitude, pos.coords.longitude),
      () => { setError("Location access denied"); setLoading(false); },
    );
  }

  const types = ["All", ...Array.from(new Set(businesses.map(b => b.type)))];

  const filtered = businesses
    .filter(b =>
      (filterType === "All" || b.type === filterType) &&
      b.score >= minScore &&
      (b.name.toLowerCase().includes(search.toLowerCase()) || b.type.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "score") return b.score - a.score;
      if (sortBy === "reviews") return a.reviews - b.reviews;
      return parseFloat(a.distance) - parseFloat(b.distance);
    });

  const hotLeads = filtered.filter(b => b.score >= 85).length;

  function toggleTarget(name: string) {
    setTargets(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0c0a08", color: "#f5f0e0", fontFamily: "Inter, sans-serif" }}>

      {/* Header */}
      <div style={{ background: "#141210", borderBottom: "1px solid #2e2820", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a href="/digital/playbook" style={{ fontSize: "12px", color: "#524d45", textDecoration: "none" }}>← Playbook</a>
          <span style={{ color: "#2e2820" }}>|</span>
          <span style={{ fontSize: "15px", fontWeight: 700, color: "#d4af37", fontFamily: "'Cinzel', Georgia, serif" }}>Business Finder</span>
          <span style={{ fontSize: "10px", padding: "2px 7px", background: isLive ? "#7aaa6a18" : "#e8a03015", border: `1px solid ${isLive ? "#7aaa6a40" : "#e8a03040"}`, borderRadius: "3px", color: isLive ? "#7aaa6a" : "#e8a030" }}>
            {isLive ? "Live Data" : "Demo Data"}
          </span>
        </div>
        <div style={{ fontSize: "12px", color: "#524d45" }}>
          {hotLeads} hot leads · {targets.size} targeted
        </div>
      </div>

      {/* Location Search Bar */}
      <div style={{ background: "#0f0d0b", borderBottom: "1px solid #2e2820", padding: "14px 24px", display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
        <button
          onClick={useMyLocation}
          disabled={loading}
          style={{
            padding: "9px 18px", background: loading ? "#2e2820" : "#d4af37", border: "none", borderRadius: "6px",
            color: loading ? "#524d45" : "#0c0a08", fontSize: "13px", fontWeight: 700, cursor: loading ? "default" : "pointer",
            display: "flex", alignItems: "center", gap: "7px",
          }}
        >
          {loading ? (
            <>
              <span style={{ display: "inline-block", width: "12px", height: "12px", border: "2px solid #524d45", borderTopColor: "#d4af37", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
              Searching...
            </>
          ) : (
            <>{isLive ? "Re-search My Area" : "Search My Area"}</>
          )}
        </button>

        <select
          value={radius}
          onChange={e => setRadius(Number(e.target.value))}
          style={{ padding: "9px 12px", background: "#141210", border: "1px solid #2e2820", borderRadius: "6px", color: "#f5f0e0", fontSize: "13px" }}
        >
          {RADIUS_OPTIONS.map(r => <option key={r.value} value={r.value}>{r.label} radius</option>)}
        </select>

        {!isLive && !loading && (
          <span style={{ fontSize: "12px", color: "#524d45" }}>
            Hit the button to scan real businesses near your location using Google Places.
          </span>
        )}
        {error && (
          <span style={{ fontSize: "12px", color: "#e05c5c" }}>{error}</span>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px" }}>

        {/* Filters */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px", alignItems: "center" }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search businesses..."
            style={{ flex: 1, minWidth: "200px", padding: "9px 14px", background: "#141210", border: "1px solid #2e2820", borderRadius: "6px", color: "#f5f0e0", fontSize: "13px" }}
          />
          <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ padding: "9px 14px", background: "#141210", border: "1px solid #2e2820", borderRadius: "6px", color: "#f5f0e0", fontSize: "13px" }}>
            {types.map(t => <option key={t}>{t}</option>)}
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as "score" | "distance" | "reviews")} style={{ padding: "9px 14px", background: "#141210", border: "1px solid #2e2820", borderRadius: "6px", color: "#f5f0e0", fontSize: "13px" }}>
            <option value="score">Sort: Best Prospects</option>
            <option value="distance">Sort: Nearest</option>
            <option value="reviews">Sort: Fewest Reviews</option>
          </select>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "12px", color: "#8a8070", whiteSpace: "nowrap" }}>Min Score: {minScore}</span>
            <input type="range" min={0} max={80} step={10} value={minScore} onChange={e => setMinScore(Number(e.target.value))} style={{ width: "80px", accentColor: "#d4af37" }} />
          </div>
        </div>

        {/* Score legend */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
          {[["Hot Lead","85+","#7aaa6a"],["Good Prospect","65–84","#d4af37"],["Possible","40–64","#e8a030"],["Low Priority","<40","#e05c5c"]].map(([l,r,c]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#8a8070" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: c }} />
              <span style={{ color: c as string, fontWeight: 600 }}>{l}</span>
              <span>({r})</span>
            </div>
          ))}
          <span style={{ fontSize: "11px", color: "#3a3530", marginLeft: "auto" }}>Score = gaps in online presence weighted by impact</span>
        </div>

        {/* Results */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {filtered.map(b => {
            const isExpanded = expanded === b.name;
            const isTargeted = targets.has(b.name);
            const sc = SCORE_COLORS(b.score);
            return (
              <div key={b.name} style={{
                background: isTargeted ? "#d4af3708" : "#141210",
                border: `1px solid ${isTargeted ? "#d4af3740" : "#2e2820"}`,
                borderRadius: "8px", overflow: "hidden",
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "48px 1fr auto auto auto auto auto", gap: "12px", alignItems: "center", padding: "14px 16px" }}>
                  {/* Score */}
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: 800, color: sc, lineHeight: 1 }}>{b.score}</div>
                    <div style={{ fontSize: "9px", color: sc, fontWeight: 600 }}>{SCORE_LABEL(b.score).split(" ")[0]}</div>
                  </div>
                  {/* Name */}
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#f5f0e0", marginBottom: "3px" }}>{b.name}</div>
                    <div style={{ fontSize: "11px", color: "#524d45" }}>{b.type} · {b.address}</div>
                  </div>
                  {/* Distance */}
                  <div style={{ fontSize: "12px", color: "#8a8070", textAlign: "center" }}>
                    <div style={{ fontWeight: 600, color: "#c8c0b0" }}>{b.distance}</div>
                    <div style={{ fontSize: "10px" }}>away</div>
                  </div>
                  {/* Reviews */}
                  <div style={{ fontSize: "12px", color: b.reviews < 15 ? "#e05c5c" : "#8a8070", textAlign: "center" }}>
                    <div style={{ fontWeight: 600 }}>{b.reviews}</div>
                    <div style={{ fontSize: "10px" }}>reviews</div>
                  </div>
                  {/* Rating */}
                  <div style={{ fontSize: "12px", color: b.rating < 4.0 ? "#e8a030" : "#8a8070", textAlign: "center" }}>
                    <div style={{ fontWeight: 600 }}>★ {b.rating}</div>
                    <div style={{ fontSize: "10px" }}>rating</div>
                  </div>
                  {/* Gaps */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                    <PresenceDot active={!b.hasWebsite} label="No website" />
                    <PresenceDot active={!b.hasBooking} label="No booking" />
                    <PresenceDot active={!b.hasSocial} label="No social" />
                  </div>
                  {/* Actions */}
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button onClick={() => setExpanded(isExpanded ? null : b.name)} style={{ padding: "6px 12px", background: "none", border: "1px solid #2e2820", borderRadius: "5px", color: "#8a8070", fontSize: "11px", cursor: "pointer" }}>
                      {isExpanded ? "Less" : "Notes"}
                    </button>
                    <button onClick={() => toggleTarget(b.name)} style={{
                      padding: "6px 12px", borderRadius: "5px", fontSize: "11px", fontWeight: 600, cursor: "pointer", border: `1px solid ${isTargeted ? "#d4af37" : "#2e2820"}`,
                      background: isTargeted ? "#d4af37" : "none",
                      color: isTargeted ? "#0c0a08" : "#8a8070",
                    }}>
                      {isTargeted ? "Targeted ✓" : "+ Target"}
                    </button>
                  </div>
                </div>
                {isExpanded && (
                  <div style={{ padding: "0 16px 14px", display: "grid", gridTemplateColumns: "1fr auto", gap: "16px", alignItems: "start" }}>
                    <div style={{ fontSize: "13px", color: "#c8c0b0", lineHeight: 1.7, padding: "12px 14px", background: "#0c0a08", borderRadius: "6px", border: "1px solid #1e1c18" }}>
                      <span style={{ color: "#d4af37", fontWeight: 600 }}>Intel: </span>{b.notes}
                    </div>
                    <a href="/digital/playbook" style={{ padding: "8px 16px", background: "#d4af37", color: "#0c0a08", fontSize: "12px", fontWeight: 700, borderRadius: "6px", textDecoration: "none", whiteSpace: "nowrap" }}>
                      Open Playbook →
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Target List Summary */}
        {targets.size > 0 && (
          <div style={{ marginTop: "24px", padding: "20px 24px", background: "#141210", border: "2px solid #d4af3740", borderRadius: "10px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#d4af37", marginBottom: "12px" }}>Target List — {targets.size} businesses</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {Array.from(targets).map(name => (
                <div key={name} style={{ padding: "5px 12px", background: "#d4af3718", border: "1px solid #d4af3740", borderRadius: "20px", fontSize: "12px", color: "#d4af37", display: "flex", alignItems: "center", gap: "6px" }}>
                  {name}
                  <button onClick={() => toggleTarget(name)} style={{ background: "none", border: "none", color: "#d4af37", cursor: "pointer", fontSize: "14px", padding: 0, lineHeight: 1 }}>×</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
