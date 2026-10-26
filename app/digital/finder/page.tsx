"use client";

import { useState, useCallback } from "react";
import s from "../_demo/demo.module.css";

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
  { name: "Quick Trim Lawncare", type: "Landscaping", distance: "0.9 mi", reviews: 4, rating: 4.5, hasWebsite: false, hasSocial: false, hasBooking: false, googleProfile: "none", score: 96, address: "214 Pine St, Acworth, GA", notes: "4 reviews, no website, no social accounts and no booking." },
  { name: "Bella's Nail Spa", type: "Nail Salon", distance: "1.1 mi", reviews: 41, rating: 3.9, hasWebsite: true, hasSocial: true, hasBooking: false, googleProfile: "complete", score: 58, address: "3200 George Busbee Pkwy, Kennesaw, GA", notes: "Has an outdated Wix site. No online booking. Reviews mention difficulty reaching them." },
  { name: "Pro Clean Pressure Washing", type: "Services", distance: "1.4 mi", reviews: 12, rating: 4.7, hasWebsite: false, hasSocial: false, hasBooking: false, googleProfile: "partial", score: 88, address: "604 Roberts Rd NW, Marietta, GA", notes: "Good reviews but no website or social accounts. Competitors rank above them in search." },
  { name: "Fusion Tacos", type: "Restaurant", distance: "1.6 mi", reviews: 89, rating: 4.2, hasWebsite: true, hasSocial: true, hasBooking: false, googleProfile: "complete", score: 42, address: "1020 E Marietta St, Kennesaw, GA", notes: "Decent presence. Review management and social automation would help. Low priority." },
  { name: "Sunrise Cleaning Co", type: "Cleaning", distance: "2.0 mi", reviews: 6, rating: 5.0, hasWebsite: false, hasSocial: false, hasBooking: false, googleProfile: "none", score: 97, address: "888 Cherokee St, Marietta, GA", notes: "5-star rating with no marketing. A website and chatbot would give word-of-mouth customers a place to book." },
  { name: "Crown Auto Detail", type: "Auto", distance: "2.3 mi", reviews: 31, rating: 4.4, hasWebsite: false, hasSocial: true, hasBooking: false, googleProfile: "partial", score: 76, address: "2245 N Marietta Pkwy, Marietta, GA", notes: "Active Instagram but no website or booking." },
  { name: "The Brow Bar", type: "Beauty", distance: "2.7 mi", reviews: 18, rating: 4.0, hasWebsite: false, hasSocial: true, hasBooking: false, googleProfile: "partial", score: 80, address: "455 Ernest Barrett Pkwy, Kennesaw, GA", notes: "Posts regularly but sends customers to DMs for booking. Booking system would close that gap." },
  { name: "HandyPro Home Repair", type: "Contractor", distance: "3.1 mi", reviews: 3, rating: 4.3, hasWebsite: false, hasSocial: false, hasBooking: false, googleProfile: "none", score: 95, address: "112 Old 41 Hwy NW, Kennesaw, GA", notes: "3 reviews, no online presence. High value per job. Pitch a website and the estimating tool." },
  { name: "Magnolia Day Spa", type: "Spa", distance: "3.4 mi", reviews: 64, rating: 4.6, hasWebsite: true, hasSocial: true, hasBooking: true, googleProfile: "complete", score: 22, address: "700 Ernest W Barrett Pkwy, Kennesaw, GA", notes: "Well set up already. Low priority unless you can offer something they don't have." },
  { name: "Ramos Electrical", type: "Contractor", distance: "3.8 mi", reviews: 9, rating: 4.8, hasWebsite: false, hasSocial: false, hasBooking: false, googleProfile: "partial", score: 89, address: "3400 Canton Rd, Marietta, GA", notes: "Strong reviews for the work, weak online presence. Pitch a website and the estimating tool." },
];

const RADIUS_OPTIONS = [
  { label: "0.5 mi", value: 800 },
  { label: "1 mi", value: 1600 },
  { label: "2 mi", value: 3200 },
  { label: "5 mi", value: 8000 },
  { label: "10 mi", value: 16000 },
];

// Functional status colours from the site palette: green for the best prospects, red for the lowest.
const SCORE_COLOR = (score: number) =>
  score >= 85 ? "var(--ok)" : score >= 65 ? "var(--gold-text)" : score >= 40 ? "var(--gold)" : "var(--danger)";

const SCORE_LABEL = (score: number) =>
  score >= 85 ? "Hot lead" : score >= 65 ? "Good prospect" : score >= 40 ? "Possible" : "Low priority";

const LEGEND: [string, string, number][] = [
  ["Hot lead", "85 and up", 90],
  ["Good prospect", "65 to 84", 70],
  ["Possible", "40 to 64", 50],
  ["Low priority", "under 40", 10],
];

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
    if (!navigator.geolocation) { setError("This browser does not support location access."); return; }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchNearby(pos.coords.latitude, pos.coords.longitude),
      () => { setError("Location access was denied."); setLoading(false); },
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
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  return (
    <div>
      <header className={s.repHead}>
        <div className={`ui-wrap ${s.repHeadIn}`}>
          <div className={s.repLinks}>
            <p className={s.repTitle}>Business finder</p>
            <span className={isLive ? s.okText : "ui-gold"}>{isLive ? "Live data" : "Demo data"}</span>
            <a href="/digital/playbook">Sales playbook</a>
          </div>
          <p className="ui-small ui-muted" style={{ margin: 0 }}>
            {hotLeads} hot leads, {targets.size} targeted
          </p>
        </div>
      </header>

      <main className={`ui-wrap ${s.repMain}`}>
        <div className={s.bar}>
          <button onClick={useMyLocation} disabled={loading} className={`ui-btn ${s.primary}`}>
            {loading ? "Searching" : isLive ? "Search my area again" : "Search my area"}
          </button>
          <label className="ui-field">
            <span className="ui-small ui-muted">Radius</span>
            <select value={radius} onChange={e => setRadius(Number(e.target.value))}>
              {RADIUS_OPTIONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </label>
        </div>
        {!isLive && !loading && (
          <p className="ui-muted" style={{ marginTop: "-12px" }}>
            Search my area lists businesses near you from Google Places. The list below is demo data until then.
          </p>
        )}
        {error && <p className={s.error}>{error}</p>}

        <div className={s.grid3} style={{ margin: "28px 0 20px" }}>
          <label className="ui-field">
            <span className="ui-small ui-muted">Search</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Business name or type" />
          </label>
          <label className="ui-field">
            <span className="ui-small ui-muted">Type</span>
            <select value={filterType} onChange={e => setFilterType(e.target.value)}>
              {types.map(t => <option key={t}>{t}</option>)}
            </select>
          </label>
          <label className="ui-field">
            <span className="ui-small ui-muted">Sort</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as "score" | "distance" | "reviews")}>
              <option value="score">Best prospects first</option>
              <option value="distance">Nearest first</option>
              <option value="reviews">Fewest reviews first</option>
            </select>
          </label>
          <label className="ui-field">
            <span className="ui-small ui-muted">Minimum score: {minScore}</span>
            <input type="range" min={0} max={80} step={10} value={minScore} onChange={e => setMinScore(Number(e.target.value))} style={{ accentColor: "var(--gold)", minHeight: "44px", padding: 0, border: 0, background: "none" }} />
          </label>
        </div>

        <div className={s.legend}>
          {LEGEND.map(([label, range, sample]) => (
            <span key={label}><b style={{ color: SCORE_COLOR(sample) }}>{label}</b> {range}</span>
          ))}
        </div>
        <p className="ui-small ui-muted" style={{ margin: "-12px 0 28px" }}>
          The score adds up the gaps in each business&apos;s online presence, weighted by how much each gap costs them.
        </p>

        <div className={s.list}>
          {filtered.map(b => {
            const isExpanded = expanded === b.name;
            const isTargeted = targets.has(b.name);
            const color = SCORE_COLOR(b.score);
            const gaps = [!b.hasWebsite && "No website", !b.hasBooking && "No booking", !b.hasSocial && "No social"].filter(Boolean) as string[];
            return (
              <article key={b.name} className={s.item}>
                <div className={s.rowHead}>
                  <div>
                    <h2 className={s.itemName}>{b.name}</h2>
                    <p className={s.itemMeta}>{b.type}, {b.address}</p>
                  </div>
                  <div className={s.score} style={{ color }}>
                    {b.score}
                    <span className={s.scoreLabel}>{SCORE_LABEL(b.score)}</span>
                  </div>
                </div>
                <p className={s.itemMeta}>
                  {b.distance} away,{" "}
                  <span className={b.reviews < 15 ? s.dangerText : undefined}>{b.reviews} reviews</span>,{" "}
                  <span className={b.rating < 4.0 ? "ui-gold" : undefined}>{b.rating} rating</span>
                </p>
                {gaps.length > 0 && (
                  <p className={s.gaps}>
                    {gaps.map(g => <span key={g} className={s.dangerText}>{g}</span>)}
                  </p>
                )}
                <div className={s.actions} style={{ marginTop: "14px" }}>
                  <button onClick={() => setExpanded(isExpanded ? null : b.name)} className={s.btn}>
                    {isExpanded ? "Hide notes" : "Notes"}
                  </button>
                  <button onClick={() => toggleTarget(b.name)} className={`${s.btn} ${isTargeted ? s.btnOn : ""}`}>
                    {isTargeted ? "Targeted" : "Add to targets"}
                  </button>
                </div>
                {isExpanded && (
                  <div style={{ marginTop: "16px" }}>
                    <aside className="ui-note">{b.notes}</aside>
                    <div className={s.actions}>
                      <a href="/digital/playbook" className="ui-btn">Open the playbook</a>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
          {filtered.length === 0 && <p className={s.empty}>No businesses match these filters.</p>}
        </div>

        {targets.size > 0 && (
          <section style={{ marginTop: "40px", paddingTop: "28px", borderTop: "1px solid var(--line)" }}>
            <h2 className={s.sub}>Target list: {targets.size} businesses</h2>
            <div className={s.actions} style={{ marginTop: 0 }}>
              {Array.from(targets).map(name => (
                <button key={name} onClick={() => toggleTarget(name)} className={`${s.btn} ${s.btnOn}`} aria-label={`Remove ${name} from targets`}>
                  {name}, remove
                </button>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
