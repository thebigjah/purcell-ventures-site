"use client";
/**
 * Intro Lab — the Purcell Ventures motion-asset library, review gallery.
 * Every candidate "art" for the cinematic site intro plays in isolation here.
 * Tiles lazy-mount (IntersectionObserver) so only on-screen arts animate —
 * the gallery scales to 40 without choking. Click any art for fullscreen.
 *
 * To grow the library: drop a component in ./arts, then add an ARTS entry.
 */
import { useEffect, useState, type ComponentType } from "react";

import GunBarrelWalk from "./arts/GunBarrelWalk";
import RiflingSpiral from "./arts/RiflingSpiral";
import GoldInkInWater from "./arts/GoldInkInWater";
import SilhouetteDancers from "./arts/SilhouetteDancers";
import BulletThroughGlass from "./arts/BulletThroughGlass";
import CasinoMotifs from "./arts/CasinoMotifs";
import DreamscapeDescent from "./arts/DreamscapeDescent";
import HallOfMirrors from "./arts/HallOfMirrors";
import RosesToBlood from "./arts/RosesToBlood";
import BarrelIrisClose from "./arts/BarrelIrisClose";
import CrosshairTrackLock from "./arts/CrosshairTrackLock";
import RedactedDossier from "./arts/RedactedDossier";
import CoordinateStamps from "./arts/CoordinateStamps";
import PassportFlicker from "./arts/PassportFlicker";
import CctvGrid from "./arts/CctvGrid";
import TelephotoCompression from "./arts/TelephotoCompression";
import KineticCuts from "./arts/KineticCuts";
import SatelliteZoom from "./arts/SatelliteZoom";
import BurningFuse from "./arts/BurningFuse";
import MatchStrike from "./arts/MatchStrike";
import SceneFlashMontage from "./arts/SceneFlashMontage";
import DetonationReveal from "./arts/DetonationReveal";
import SelfDestructCountdown from "./arts/SelfDestructCountdown";
import TypographyFromRubble from "./arts/TypographyFromRubble";
import SnowGlobeFormation from "./arts/SnowGlobeFormation";
import DiegeticCredits from "./arts/DiegeticCredits";
import KineticTypeGesture from "./arts/KineticTypeGesture";
import VertigoSpiral from "./arts/VertigoSpiral";
import SlidingLineGrid from "./arts/SlidingLineGrid";
import BoldMetaphor from "./arts/BoldMetaphor";
import AnamorphicFlare from "./arts/AnamorphicFlare";
import BulletTimeOrbit from "./arts/BulletTimeOrbit";
import FilmGrainDust from "./arts/FilmGrainDust";
import ChromaticAberration from "./arts/ChromaticAberration";
import LightThroughGlass from "./arts/LightThroughGlass";
import SmokeInkPlume from "./arts/SmokeInkPlume";
import RackFocus from "./arts/RackFocus";
import SlowPushIn from "./arts/SlowPushIn";
import EyeAssembling from "./arts/EyeAssembling";
import WatchedWatchingBack from "./arts/WatchedWatchingBack";

type Art = { n: number; name: string; cat: string; comp: ComponentType; review: string };

const ARTS: Art[] = [
  { n: 1, name: "Gun-Barrel Walk", cat: "Bond · opener", comp: GunBarrelWalk, review: "The icon. Instantly reads spy — the literal first beat." },
  { n: 2, name: "Rifling Spiral", cat: "Bond · barrel", comp: RiflingSpiral, review: "Down the barrel. Menacing, abstract, loops forever — a held backdrop." },
  { n: 3, name: "Gold Ink in Water", cat: "Bond · fluid title", comp: GoldInkInWater, review: "Casino Royale luxury. Calm and rich — perfect under a wordmark." },
  { n: 4, name: "Silhouette Dancers", cat: "Bond · Binder titles", comp: SilhouetteDancers, review: "Flowing silhouettes in a gold field. Sensual, abstract, classic 007 credits." },
  { n: 5, name: "Bullet Through Glass", cat: "Bond · slow-mo", comp: BulletThroughGlass, review: "Frozen-time shatter. Gold shards hang, glint, reform — a luxurious centerpiece." },
  { n: 6, name: "Casino Motifs", cat: "Bond · Casino Royale", comp: CasinoMotifs, review: "Card suits, chips, roulette. Graphic and rhythmic — playful spy energy." },
  { n: 7, name: "Dreamscape Descent", cat: "Bond · Skyfall", comp: DreamscapeDescent, review: "Sinking through surreal silhouettes. Dreamlike, ominous depth." },
  { n: 8, name: "Hall of Mirrors", cat: "Bond · infinity", comp: HallOfMirrors, review: "The eye reflected into infinity. Hypnotic recursion." },
  { n: 9, name: "Roses to Blood", cat: "Bond · motif", comp: RosesToBlood, review: "Gold rose blooms, bleeds crimson. Beauty corrupting — elegant and dark." },
  { n: 10, name: "Barrel Iris Close", cat: "Bond · transition", comp: BarrelIrisClose, review: "The classic iris-to-dot wipe. A reusable transition device." },
  { n: 11, name: "Crosshair Track-Lock", cat: "Bourne · surveillance", comp: CrosshairTrackLock, review: "Reticle hunts, snaps to TARGET LOCK. Precise, tense." },
  { n: 12, name: "Redacted Dossier", cat: "Bourne · intel", comp: RedactedDossier, review: "Redaction wipes to reveal brand keywords. On-message 'classified.'" },
  { n: 13, name: "Coordinate Stamps", cat: "Bourne · recon", comp: CoordinateStamps, review: "Coordinates + timecodes snap over a wire-globe. Surveillance-grade." },
  { n: 14, name: "Passport Flicker", cat: "Bourne · dossier", comp: PassportFlicker, review: "IDs strobing through a database, one freezing. Fast, kinetic." },
  { n: 15, name: "CCTV Grid", cat: "Bourne · CCTV", comp: CctvGrid, review: "Nine camera feeds, one zooms to subject. Surveillance-room energy." },
  { n: 16, name: "Telephoto Compression", cat: "Bourne · long lens", comp: TelephotoCompression, review: "Watched-from-distance bokeh + reticle + heat haze. Voyeuristic." },
  { n: 17, name: "Kinetic Cuts", cat: "Bourne · edit", comp: KineticCuts, review: "Beat-synced hard jump-cuts. Percussive, aggressive." },
  { n: 18, name: "Satellite Zoom", cat: "Bourne · orbital", comp: SatelliteZoom, review: "Orbit-to-rooftop punch-down with HUD. Relentless recon dolly." },
  { n: 19, name: "Burning Fuse", cat: "Mission: Impossible", comp: BurningFuse, review: "Spark races the fuse to ignition. Ticking-clock lead-in." },
  { n: 20, name: "Match Strike", cat: "Mission: Impossible", comp: MatchStrike, review: "A match flares to life in the dark. Real fire warmth." },
  { n: 21, name: "Scene-Flash Montage", cat: "Mission: Impossible", comp: SceneFlashMontage, review: "Strobing fragments between metallic credits. Frenetic title energy." },
  { n: 22, name: "Detonation Reveal", cat: "Mission: Impossible", comp: DetonationReveal, review: "Detonation bloom + shockwave + debris. The title-arrival beat." },
  { n: 23, name: "Self-Destruct Countdown", cat: "Mission: Impossible", comp: SelfDestructCountdown, review: "Ticking self-destruct timer to zero. Tense analog warmth." },
  { n: 24, name: "Typography From Rubble", cat: "Kingsman", comp: TypographyFromRubble, review: "Fragments assemble into the wordmark, then scatter. Impactful." },
  { n: 25, name: "Snow-Globe Formation", cat: "Kingsman", comp: SnowGlobeFormation, review: "Gold motes coalesce into the mark. Magical particle-drift." },
  { n: 26, name: "Diegetic Credits", cat: "Kingsman", comp: DiegeticCredits, review: "Credit words live in 3D space as the camera drifts past. Real depth." },
  { n: 27, name: "Kinetic Type Gesture", cat: "Saul Bass", comp: KineticTypeGesture, review: "Bold spy words snap and assemble on the beat. Mid-century graphic." },
  { n: 28, name: "Vertigo Spiral", cat: "Saul Bass", comp: VertigoSpiral, review: "Hypnotic spirograph rose, breathing. A held mesmerizer." },
  { n: 29, name: "Sliding Line Grid", cat: "Saul Bass", comp: SlidingLineGrid, review: "Gold lines slide into an architectural grid. Crisp, kinetic." },
  { n: 30, name: "Bold Metaphor — The Eye", cat: "Saul Bass · brand", comp: BoldMetaphor, review: "The panopticon eye, living and watching. One bold shape that IS the brand." },
  { n: 31, name: "Anamorphic Flare", cat: "Texture · lens", comp: AnamorphicFlare, review: "Wide gold lens streak with bloom + chromatic fringe. Cinematic light." },
  { n: 32, name: "Bullet-Time Orbit", cat: "Texture · Matrix", comp: BulletTimeOrbit, review: "Camera arcs 360° around a frozen bullet. Stopped-time depth." },
  { n: 33, name: "Film Grain + Dust", cat: "Texture · analog", comp: FilmGrainDust, review: "Authentic celluloid grain, dust, light-leaks. A reusable overlay plate." },
  { n: 34, name: "Chromatic Aberration", cat: "Texture · glitch", comp: ChromaticAberration, review: "RGB-split + signal glitch on the mark. Intercepted-feed feel." },
  { n: 35, name: "Light Through Glass", cat: "Texture · caustics", comp: LightThroughGlass, review: "Drifting gold caustics. Luxurious, organic ambience." },
  { n: 36, name: "Smoke / Ink Plume", cat: "Texture · atmosphere", comp: SmokeInkPlume, review: "Gold smoke rising. Slow, premium ambience — pairs with anything." },
  { n: 37, name: "Rack Focus", cat: "Texture · depth-of-field", comp: RackFocus, review: "Focus pulls reticle ↔ wordmark with creamy bokeh. Real lens feel." },
  { n: 38, name: "Slow Push-In", cat: "Texture · dolly", comp: SlowPushIn, review: "Relentless push toward the eye from darkness. Ominous, inevitable." },
  { n: 39, name: "Eye Assembling", cat: "Brand · panopticon", comp: EyeAssembling, review: "The eye draws itself on, blueprint-style, then awakens. Precise." },
  { n: 40, name: "Watched Watching Back", cat: "Brand · panopticon", comp: WatchedWatchingBack, review: "Many watchers converge into one opening eye. The climax / lock." },
];

const GOLD = "#d4af37";

/* Mounts the art ONLY when `play` — so at most one or two animate at a time
 * (the hovered tile, or the fullscreen one). Everything else is a static poster,
 * which is what keeps the gallery smooth with 40 heavy canvas loops. */
function Frame({ comp: Comp, play }: { comp: ComponentType; play: boolean }) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {play ? <Comp /> : (
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 42%, #16120c, #0c0a08 72%)", display: "grid", placeItems: "center" }}>
          <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#5a5346", fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase" }}>▶ hover to play</span>
        </div>
      )}
    </div>
  );
}

export default function IntroLab() {
  const [open, setOpen] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const cur = open !== null ? ARTS.find((a) => a.n === open) ?? null : null;
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  return (
    <main style={{ minHeight: "100vh", background: "#0a0807", color: "#f5f0e0", padding: "clamp(20px,4vw,52px)" }}>
      <header style={{ marginBottom: 34, borderBottom: `1px solid ${GOLD}33`, paddingBottom: 22 }}>
        <div style={{ fontFamily: "var(--font-cinzel), serif", fontWeight: 700, fontSize: "clamp(22px,4vw,40px)", letterSpacing: "0.12em", color: GOLD }}>
          PURCELL VENTURES · MOTION LIBRARY
        </div>
        <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#8a8070", fontSize: 13, letterSpacing: "0.16em", marginTop: 10, textTransform: "uppercase" }}>
          40 spy-intro arts · click any to view fullscreen
        </div>
        <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#6b6358", fontSize: 12, marginTop: 8, lineHeight: 1.6, maxWidth: 660 }}>
          Each is a self-contained, reusable motion component. Watch them, then tell ElijahBot the numbers + order you want spliced into the real intro — the rest stay in the PV library for future use.
        </div>
      </header>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 18 }}>
        {ARTS.map((a) => (
          <button key={a.n} onClick={() => setOpen(a.n)} onMouseEnter={() => setHover(a.n)} onMouseLeave={() => setHover((h) => (h === a.n ? null : h))} style={{ all: "unset", cursor: "pointer", display: "block" }}>
            <div style={{ position: "relative", aspectRatio: "16 / 9", overflow: "hidden", border: `1px solid ${hover === a.n ? GOLD + "99" : GOLD + "26"}`, background: "#0c0a08", boxShadow: "0 10px 40px rgba(0,0,0,0.5)", transform: hover === a.n ? "translateY(-2px)" : "none", transition: "border-color 0.2s, transform 0.2s" }}>
              <Frame comp={a.comp} play={hover === a.n && open === null} />
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "26px 14px 11px", background: "linear-gradient(0deg, rgba(8,6,5,0.92), transparent)", pointerEvents: "none" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontFamily: "var(--font-dm-sans), monospace", color: GOLD, fontSize: 12, fontWeight: 700 }}>{String(a.n).padStart(2, "0")}</span>
                  <span style={{ fontFamily: "var(--font-cinzel), serif", fontWeight: 700, fontSize: 15, letterSpacing: "0.04em" }}>{a.name}</span>
                </div>
                <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#8a8070", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 3 }}>{a.cat}</div>
              </div>
            </div>
            <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#7d7466", fontSize: 12, lineHeight: 1.5, marginTop: 9, paddingRight: 6 }}>{a.review}</div>
          </button>
        ))}
      </div>
      {cur && (
        <div onClick={() => setOpen(null)} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(4,3,2,0.92)", display: "flex", flexDirection: "column", padding: "clamp(12px,3vw,40px)" }}>
          <div style={{ position: "relative", flex: 1, minHeight: 0, border: `1px solid ${GOLD}44`, overflow: "hidden", background: "#0c0a08" }} onClick={(e) => e.stopPropagation()}>
            <cur.comp />
            <button onClick={() => setOpen(null)} style={{ position: "absolute", top: 14, right: 14, zIndex: 2, background: "rgba(0,0,0,0.4)", border: `1px solid ${GOLD}66`, color: GOLD, fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 12, letterSpacing: "0.1em", padding: "7px 14px", cursor: "pointer" }}>ESC ✕</button>
          </div>
          <div onClick={(e) => e.stopPropagation()} style={{ paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 20, flexWrap: "wrap" }}>
            <div>
              <span style={{ fontFamily: "var(--font-dm-sans), monospace", color: GOLD, fontSize: 14, fontWeight: 700, marginRight: 10 }}>{String(cur.n).padStart(2, "0")}</span>
              <span style={{ fontFamily: "var(--font-cinzel), serif", fontWeight: 700, fontSize: 20 }}>{cur.name}</span>
              <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#8a8070", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", marginLeft: 14 }}>{cur.cat}</span>
            </div>
            <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#9a9080", fontSize: 13, maxWidth: 560 }}>{cur.review}</div>
          </div>
        </div>
      )}
    </main>
  );
}
