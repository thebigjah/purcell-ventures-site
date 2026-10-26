/* Purcell Ventures nebula, v2. Gas in layered sprites along two spiral arms, dark dust lanes, bloom on gold.
   createGalaxy(container, { map, onOpen, onFocus, phone, reducedMotion, labelsRoot, starD }) */
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const BG = new THREE.Color("#07060a");

/* ---------- CPU noise for cloud textures (made once) ---------- */
function mulberry(seed) { return function () { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function makeNoise(seed, size) {
  const rnd = mulberry(seed), g = new Float32Array(size * size); for (let i = 0; i < g.length; i++) g[i] = rnd();
  return function (x, y) { const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const i = (xi & (size - 1)), j = (yi & (size - 1)), i1 = ((xi + 1) & (size - 1)), j1 = ((yi + 1) & (size - 1));
    const a = g[j * size + i], b = g[j * size + i1], c = g[j1 * size + i], d = g[j1 * size + i1];
    return (a + (b - a) * u) * (1 - v) + (c + (d - c) * u) * v; };
}
function cloudTexture(seed, { size = 256, ridged = false, soft = 0.9, gain = 1.0 } = {}) {
  const n = makeNoise(seed, 64), cv = document.createElement("canvas"); cv.width = cv.height = size;
  const ctx = cv.getContext("2d"), img = ctx.createImageData(size, size), d = img.data;
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const u = x / size, v = y / size; let f = 0, a = 0.5, px = u * 6, py = v * 6;
    for (let o = 0; o < 5; o++) { let val = n(px, py); if (ridged) val = 1 - Math.abs(2 * val - 1); f += a * val; px *= 2.03; py *= 2.03; a *= 0.5; }
    const dx = u - 0.5, dy = v - 0.5, r = Math.sqrt(dx * dx + dy * dy) * 2;
    const fall = Math.max(0, 1 - Math.pow(r / soft, 2.2));
    let al = ridged ? Math.pow(Math.max(0, f - 0.35) / 0.65, 2.6) : Math.pow(Math.max(0, f - 0.3) / 0.7, 1.9);
    al = Math.min(1, al * fall * gain);
    const i = (y * size + x) * 4; d[i] = d[i + 1] = d[i + 2] = 255; d[i + 3] = Math.round(al * 255);
  }
  ctx.putImageData(img, 0, 0); const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
}
function spikeTexture(size = 128) {
  const cv = document.createElement("canvas"); cv.width = cv.height = size; const c = cv.getContext("2d"), m = size / 2;
  const g = c.createRadialGradient(m, m, 0, m, m, m); g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.12, "rgba(255,250,235,0.9)"); g.addColorStop(0.35, "rgba(255,240,210,0.12)"); g.addColorStop(1, "rgba(255,240,210,0)");
  c.fillStyle = g; c.fillRect(0, 0, size, size);
  c.globalCompositeOperation = "lighter";
  [[1, 0], [0, 1]].forEach(([dx, dy]) => { const lg = c.createLinearGradient(m - dx * m, m - dy * m, m + dx * m, m + dy * m); lg.addColorStop(0, "rgba(255,245,225,0)"); lg.addColorStop(0.5, "rgba(255,245,225,0.75)"); lg.addColorStop(1, "rgba(255,245,225,0)"); c.fillStyle = lg; if (dx) c.fillRect(0, m - 1, size, 2); else c.fillRect(m - 1, 0, 2, size); });
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
}
function glowTexture(size = 256, inner = 0.25) {
  const cv = document.createElement("canvas"); cv.width = cv.height = size; const c = cv.getContext("2d"), m = size / 2;
  const g = c.createRadialGradient(m, m, 0, m, m, m); g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(inner, "rgba(255,250,235,0.85)"); g.addColorStop(Math.min(0.99, inner + 0.12), "rgba(255,240,210,0.28)"); g.addColorStop(Math.max(Math.min(0.995, inner + 0.13), 0.7), "rgba(255,235,200,0.05)"); g.addColorStop(1, "rgba(255,235,200,0)");
  c.fillStyle = g; c.fillRect(0, 0, size, size); const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
}

const STAR_VERT = `
attribute float size; attribute float phase; attribute vec3 tint; varying vec3 vTint; varying float vPhase; uniform float t; uniform float dpr;
void main(){ vTint=tint; vPhase=phase; vec4 mv=modelViewMatrix*vec4(position,1.0);
  float tw=0.62+0.38*sin(t*1.6+phase*6.283)*sin(t*0.37+phase*3.1);
  gl_PointSize=min(size*dpr*tw*(170.0/-mv.z), 9.0*dpr); gl_Position=projectionMatrix*mv; }`;
const STAR_FRAG = `
precision mediump float; varying vec3 vTint; varying float vPhase;
void main(){ vec2 c=gl_PointCoord-0.5; float d=length(c)*2.0; float a=pow(max(0.0,1.0-d),2.4);
  gl_FragColor=vec4(vTint*a,a); }`;

export function createGalaxy(container, opts = {}) {
  const map = opts.map, phone = !!opts.phone, rm = !!opts.reducedMotion, labelsRoot = opts.labelsRoot || container;
  const A = opts.assets || {};
  const manager = new THREE.LoadingManager(); let resolveReady; const ready = new Promise((r) => { resolveReady = r; }); let loaded = false; manager.onLoad = () => { loaded = true; };
  const loader = new THREE.TextureLoader(manager);
  const loadTex = (url, cb) => { if (!url) return null; const t = loader.load(url, cb); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
  const DPR = Math.min(window.devicePixelRatio || 1, phone ? 2 : 2.5);
  const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(DPR); renderer.setClearColor(BG, 1); renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 0.9;
  container.appendChild(renderer.domElement);
  renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;z-index:0"; labelsRoot.style.zIndex = "1";

  const scene = new THREE.Scene(); scene.background = BG;
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 600);
  const pmrem = new THREE.PMREMGenerator(renderer); scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  /* photographic backdrop: a far sprite that always faces the camera, drifting very slowly */
  const backTex = loadTex(phone ? A.nebulaTall : A.nebulaWide);
  const backdrop = backTex ? new THREE.Sprite(new THREE.SpriteMaterial({ map: backTex, depthWrite: false, depthTest: false, transparent: false, opacity: 1 })) : null;
  if (backdrop) { backdrop.renderOrder = -10; backdrop.material.color.setScalar(0.5); scene.add(backdrop); }
  const blurTex = loadTex(phone ? A.nebulaTallBlur : A.nebulaWideBlur);
  const backBlur = blurTex ? new THREE.Sprite(new THREE.SpriteMaterial({ map: blurTex, depthWrite: false, depthTest: false, transparent: true, opacity: 0 })) : null;
  if (backBlur) { backBlur.renderOrder = -9; backBlur.material.color.setScalar(0.42); scene.add(backBlur); }

  const ORBIT_R = phone ? 80 : 56, ORBIT_EL = phone ? 1.2 : 0.72;
  const SHIFT = phone ? { x: 0, y: -8 } : { x: -9, y: 1.5 }, SHIFT_FOCUS = phone ? { x: 0, y: -2.2 } : { x: 0, y: -0.9 };
  let camAngle = 0.4 + Math.PI;
  const view = { r: ORBIT_R, el: ORBIT_EL, target: new THREE.Vector3() }, viewGoal = { r: ORBIT_R, el: ORBIT_EL, target: new THREE.Vector3() };

  scene.add(new THREE.HemisphereLight(0x6d6a7a, 0x120d08, 0.35));
  const coreLight = new THREE.PointLight(0xffc46a, 260, 0, 1.55); coreLight.position.set(0, 2, 0); scene.add(coreLight);

  /* ---------- spiral geometry shared by gas and systems ---------- */
  const ARM_A = 2.4, ARM_B = 0.3; /* r = A * e^(B theta) */
  const armPoint = (theta, arm) => { const r = ARM_A * Math.exp(ARM_B * theta); const a = theta + arm * Math.PI; return new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r); };

  /* ---------- gas: layered sprites ---------- */
  const texSoft = cloudTexture(11, { size: 256, soft: 0.95, gain: 1.0 }), texSoft2 = cloudTexture(23, { size: 256, soft: 0.9, gain: 1.1 });
  const texRidge = cloudTexture(37, { size: 256, ridged: true, soft: 0.95, gain: 1.4 }), texDust = cloudTexture(53, { size: 256, soft: 0.85, gain: 1.2 });
  const PAL = { blue: "#2a52b8", teal: "#128a94", rust: "#b0451a", amber: "#d08a3a", cream: "#f2d9a8", purple: "#5a2a8a" };
  const rnd = mulberry(7);
  const gas = new THREE.Group(); scene.add(gas);
  function puff(pos, scale, color, opacity, tex, blending = THREE.AdditiveBlending) {
    const m = new THREE.SpriteMaterial({ map: tex, color: new THREE.Color(color), transparent: true, opacity, blending, depthWrite: false, rotation: rnd() * Math.PI * 2 });
    const s = new THREE.Sprite(m); s.position.copy(pos); s.scale.set(scale, scale, 1); s.userData = { base: scale, spin: (rnd() - 0.5) * 0.05, ph: rnd() * 6.28 }; gas.add(s); return s;
  }
  const gasBlue = loadTex(A.gasBlue), gasRust = loadTex(A.gasRust);
  const N_GAS = phone ? 22 : 44;
  for (let arm = 0; arm < 2; arm++) for (let k = 0; k < N_GAS; k++) {
    const th = 0.2 + rnd() * 8.2, p = armPoint(th, arm); const r = p.length();
    const spread = 1.4 + r * 0.16; p.x += (rnd() - 0.5) * spread * 2; p.z += (rnd() - 0.5) * spread * 2; p.y = (rnd() - 0.5) * (1.2 + r * 0.08) - 0.6;
    const u = rnd();
    if (gasBlue && gasRust) { const warm = r < 7 || u > 0.72; puff(p, 5 + rnd() * 8 + r * 0.2, warm ? "#ffd9a0" : "#dfe8ff", (warm ? 0.06 : 0.045) * (0.7 + rnd() * 0.6), warm ? gasRust : gasBlue); }
    else { const col = r < 7 ? (u < 0.5 ? PAL.amber : PAL.cream) : u < 0.42 ? PAL.blue : u < 0.72 ? PAL.teal : u < 0.9 ? PAL.rust : PAL.purple; puff(p, 5 + rnd() * 9 + r * 0.25, col, (r < 7 ? 0.07 : 0.1) * (0.7 + rnd() * 0.6), u < 0.3 ? texRidge : (u < 0.65 ? texSoft : texSoft2)); }
    if (rnd() < 0.45 && r > 5) { const q = armPoint(th - 0.18, arm); q.x += (rnd() - 0.5) * spread; q.z += (rnd() - 0.5) * spread; q.y = 0.35 + rnd() * 0.5; puff(q, 4 + rnd() * 7, "#0a0806", 0.6, texDust, THREE.NormalBlending); }
  }
  for (let k = 0; k < (phone ? 10 : 18); k++) { const a = rnd() * Math.PI * 2, r = rnd() * 4.5; puff(new THREE.Vector3(Math.cos(a) * r, (rnd() - 0.5) * 1.5, Math.sin(a) * r), 6 + rnd() * 8, k % 3 ? PAL.amber : PAL.cream, 0.05, texSoft); }
  if (!backdrop) for (let k = 0; k < (phone ? 10 : 16); k++) { const a = rnd() * Math.PI * 2, r = 30 + rnd() * 60; puff(new THREE.Vector3(Math.cos(a) * r, -18 - rnd() * 24, Math.sin(a) * r), 40 + rnd() * 50, [PAL.blue, PAL.teal, PAL.purple, PAL.rust][k % 4], 0.06, texSoft2); }

  /* ---------- stars ---------- */
  const N = phone ? 2600 : 6500;
  const pos = new Float32Array(N * 3), size = new Float32Array(N), phase = new Float32Array(N), tint = new Float32Array(N * 3);
  const cream = new THREE.Color("#fff3dc"), warm = new THREE.Color("#ffd28a"), cool = new THREE.Color("#cfd9ff");
  for (let i = 0; i < N; i++) {
    const inDisc = rnd() < 0.55; let x, y, z;
    if (inDisc) { const th = rnd() * 9, arm = rnd() < 0.5 ? 0 : 1, p = armPoint(th, arm), sp = 1 + p.length() * 0.22; x = p.x + (rnd() - 0.5) * sp * 2; z = p.z + (rnd() - 0.5) * sp * 2; y = (rnd() - 0.5) * 2.5; }
    else { const r = 25 + Math.pow(rnd(), 0.7) * 220, a = rnd() * Math.PI * 2; x = Math.cos(a) * r; z = Math.sin(a) * r; y = (rnd() - 0.5) * 160; }
    pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
    size[i] = 0.25 + Math.pow(rnd(), 3) * 1.4; phase[i] = rnd();
    const c = rnd() < 0.2 ? warm : rnd() < 0.35 ? cool : cream; tint[i * 3] = c.r; tint[i * 3 + 1] = c.g; tint[i * 3 + 2] = c.b;
  }
  const sg = new THREE.BufferGeometry(); sg.setAttribute("position", new THREE.BufferAttribute(pos, 3)); sg.setAttribute("size", new THREE.BufferAttribute(size, 1)); sg.setAttribute("phase", new THREE.BufferAttribute(phase, 1)); sg.setAttribute("tint", new THREE.BufferAttribute(tint, 3));
  const starMat = new THREE.ShaderMaterial({ uniforms: { t: { value: 0 }, dpr: { value: DPR } }, vertexShader: STAR_VERT, fragmentShader: STAR_FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  scene.add(new THREE.Points(sg, starMat));
  const spikeTex = spikeTexture(128), glowTex = glowTexture(256, 0.22), haloTex = glowTexture(256, 0.04);
  for (let i = 0; i < (phone ? 18 : 40); i++) { const r = 18 + rnd() * 120, a = rnd() * Math.PI * 2; const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: spikeTex, color: rnd() < 0.3 ? warm : cream, transparent: true, opacity: 0.35 + rnd() * 0.35, blending: THREE.AdditiveBlending, depthWrite: false })); s.position.set(Math.cos(a) * r, (rnd() - 0.5) * 60, Math.sin(a) * r); const k = 0.9 + rnd() * 1.6; s.scale.set(k, k, 1); scene.add(s); }

  /* ---------- the core: the mark, live star ---------- */
  const coreCanvas = document.createElement("canvas"); coreCanvas.width = coreCanvas.height = phone ? 768 : 1024;
  const cctx = coreCanvas.getContext("2d"); const coreTex = new THREE.CanvasTexture(coreCanvas); coreTex.colorSpace = THREE.SRGBColorSpace; coreTex.anisotropy = 8;
  const bhTex = loadTex(A.blackhole);
  const coreMat = new THREE.SpriteMaterial({ map: bhTex || coreTex, transparent: true, depthWrite: false, opacity: 1, blending: bhTex ? THREE.AdditiveBlending : THREE.NormalBlending });
  const coreMesh = new THREE.Sprite(coreMat); coreMesh.scale.set(bhTex ? 13 : 7.2, bhTex ? 13 : 7.2, 1); coreMesh.position.y = 0.4; scene.add(coreMesh);
  /* the shadow of the hole: a black disc so the backdrop does not show through the centre */
  const shadow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(128, 0.9), color: new THREE.Color("#000000"), transparent: true, opacity: 1, depthWrite: false })); shadow.scale.set(bhTex ? 3.0 : 0.01, bhTex ? 3.0 : 0.01, 1); shadow.position.y = 0.4; scene.add(shadow);
  const coreHalo = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTex, color: new THREE.Color("#ffb85c"), transparent: true, opacity: 0.10, blending: THREE.AdditiveBlending, depthWrite: false })); coreHalo.scale.set(30, 30, 1); scene.add(coreHalo);
  const coreHalo2 = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: new THREE.Color("#ffd99a"), transparent: true, opacity: 0.14, blending: THREE.AdditiveBlending, depthWrite: false })); coreHalo2.scale.set(12, 12, 1); scene.add(coreHalo2);
  const HEX = (() => { const p = new Path2D(); const pts = [[400, 40], [88.231, 220], [88.231, 580], [400, 760], [711.769, 580], [711.769, 220]]; p.moveTo(pts[0][0], pts[0][1]); pts.slice(1).forEach(([x, y]) => p.lineTo(x, y)); p.closePath(); return p; })();
  let corePhi = 0;
  function drawCore() {
    const W = coreCanvas.width, k = W / 800; cctx.clearRect(0, 0, W, W); cctx.save(); cctx.scale(k, k);
    const g = cctx.createLinearGradient(0, 0, 800, 800); g.addColorStop(0, "#9a7230"); g.addColorStop(0.5, "#e2b35a"); g.addColorStop(1, "#a9823a");
    cctx.fillStyle = g; cctx.fill(HEX); cctx.globalCompositeOperation = "destination-out"; cctx.fill(new Path2D(opts.starD(corePhi))); cctx.restore(); coreTex.needsUpdate = true;
  }
  if (!bhTex) drawCore();

  /* ---------- systems on the arms ---------- */
  const systems = [], pickables = [], labels = []; let starTexShared = null;
  const planetMat = () => new THREE.MeshStandardMaterial({ color: 0xd9a24a, roughness: 0.32, metalness: 0.85, emissive: 0x6b4a14, emissiveIntensity: 0.55, envMapIntensity: 1.1 });
  /* the rendered gold sphere, cut to a circle with a soft edge, used as a sprite */
  let planetTex = null; const planetCache = {};
  /* each render is cut to a soft circle so the black background never shows; the comet keeps its tail */
  function loadPlanet(url, round, cb) { if (!url) return; if (planetCache[url]) { if (planetCache[url].tex) cb(planetCache[url].tex); else planetCache[url].cbs.push(cb); return; }
    const entry = planetCache[url] = { tex: null, cbs: [cb] }; const img = new Image(); img.crossOrigin = "anonymous";
    img.onload = () => { const S = 1024, cv = document.createElement("canvas"); cv.width = cv.height = S; const c = cv.getContext("2d"); c.drawImage(img, 0, 0, S, S);
      /* find the body: the largest radius where the lit limb is still bright, sampled around the centre */
      const id = c.getImageData(0, 0, S, S), d = id.data, cx = S / 2, cy = S / 2;
      const found = []; for (const base of [90, 270]) for (let off = -35; off <= 35; off += 5) { const ang = (base + off) * Math.PI / 180, ca = Math.cos(ang), sa = Math.sin(ang); for (let rr = S * 0.49; rr > S * 0.15; rr -= 2) { const x = Math.round(cx + ca * rr), y = Math.round(cy + sa * rr); const k = (y * S + x) * 4; if (Math.max(d[k], d[k + 1], d[k + 2]) > 45) { found.push(rr); break; } } }
      found.sort((p, q) => p - q); let body = found.length ? found[Math.floor(found.length / 2)] : S * 0.4; body = round ? Math.min(body, S * 0.47) : 0;
      /* inside the body nothing is touched (dark sides stay); outside it, black fades to transparent so rings and tails survive */
      for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) { const dx = x - cx, dy = y - cy, rr = Math.sqrt(dx * dx + dy * dy); if (rr <= body - 2) continue; const k = (y * S + x) * 4; const lum = Math.max(d[k], d[k + 1], d[k + 2]); const al = lum < 5 ? 0 : lum < 30 ? (lum - 5) / 25 : 1; d[k + 3] = Math.round(255 * al); }
      c.putImageData(id, 0, 0);
      c.globalCompositeOperation = "destination-in"; const gr = c.createRadialGradient(cx, cy, S * 0.44, cx, cy, S * 0.5); gr.addColorStop(0, "rgba(0,0,0,1)"); gr.addColorStop(1, "rgba(0,0,0,0)"); c.fillStyle = gr; c.fillRect(0, 0, S, S);
      const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; tx.anisotropy = 8; entry.tex = tx; entry.cbs.forEach((f) => f(tx)); entry.cbs = []; };
    img.src = url; }
  if (A.planet) loadPlanet(A.planet, true, (tx) => { planetTex = tx; planetSprites.forEach((sp) => { if (!sp.material.map) { sp.material.map = tx; sp.material.needsUpdate = true; } }); });
  const planetSprites = [];
  map.systems.forEach((sys, i) => {
    const arm = i % 2, th = (sys.id === "services" ? 4.5 : sys.id === "contact" ? 6.9 : 5.0 + Math.floor(i / 2) * 1.0) + (arm ? 0.5 : 0); const base = armPoint(th, arm);
    const g = new THREE.Group(); g.position.copy(base); g.position.y = (i % 3 - 1) * 0.5;
    g.userData = { system: sys, theta: th, arm, rad: base.length() };
    const starTex = A.star ? (starTexShared || (starTexShared = loadTex(A.star))) : null;
    const sun = new THREE.Sprite(new THREE.SpriteMaterial({ map: starTex || glowTex, color: new THREE.Color(starTex ? "#ffffff" : "#ffd27a"), transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false })); sun.scale.set(sys.star ? 4.2 : 2.6, sys.star ? 4.2 : 2.6, 1);
    sun.userData = { kind: "system", system: sys, group: g, ph: i * 1.3, base: sys.star ? 4.2 : 2.6 }; g.add(sun);
    const sunPick = new THREE.Mesh(new THREE.SphereGeometry(2.2, 10, 8), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })); sunPick.userData = sun.userData; g.add(sunPick); pickables.push(sunPick);
    const total = sys.planets.length;
    sys.planets.forEach((p, j) => {
      const r = 0.2 + 0.1 * Math.sqrt(p.children || 0);
      const m = new THREE.Mesh(new THREE.SphereGeometry(r, phone ? 24 : 40, phone ? 16 : 28), planetMat()); m.material.visible = false;
      const dot = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: new THREE.Color("#ffd98a"), transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false })); dot.scale.set(r * 2.2 + 0.25, r * 2.2 + 0.25, 1); dot.userData = { dot: true }; m.add(dot);
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ transparent: true, depthWrite: false, opacity: 0 })); sp.scale.set(r * 2.5, r * 2.5, 1); sp.userData = { rim: true }; m.add(sp); planetSprites.push(sp);
      const own = p.tex && A.planets && A.planets[p.tex]; if (own) loadPlanet(own, p.tex !== "blog", (tx) => { sp.material.map = tx; sp.material.needsUpdate = true; });
      m.userData = { kind: "planet", planet: p, system: sys, orbit: 1.15 + j * (total > 5 ? 0.32 : 0.42), speed: (2 * Math.PI) / (45 + j * 14), a0: (j / total) * Math.PI * 2, group: g };
      g.add(m);
      const pick = new THREE.Mesh(new THREE.SphereGeometry(r * 2.2 + 0.35, 10, 8), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })); pick.userData = m.userData; m.add(pick); pickables.push(pick); m.userData.mesh = m;
      const ring = new THREE.Mesh(new THREE.RingGeometry(m.userData.orbit - 0.01, m.userData.orbit + 0.01, 128), new THREE.MeshBasicMaterial({ color: 0xd9a24a, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false })); ring.rotation.x = -Math.PI / 2; ring.userData = { ring: true }; g.add(ring);
      const pl = document.createElement("div"); pl.className = "gx-label gx-planet"; pl.textContent = p.name; labelsRoot.appendChild(pl); labels.push({ el: pl, obj: m, off: r + 0.45, kind: "planet", group: g });
    });
    if (sys.belt) {
      const n = sys.belt.count, bp = new Float32Array(n * 3), bs = new Float32Array(n), bph = new Float32Array(n), bt = new Float32Array(n * 3), R0 = 1.15 + total * (total > 5 ? 0.32 : 0.42) + 0.4;
      for (let k = 0; k < n; k++) { const a = (k / n) * Math.PI * 2 + rnd() * 0.1, rr = R0 + (rnd() - 0.5) * 0.5; bp[k * 3] = Math.cos(a) * rr; bp[k * 3 + 1] = (rnd() - 0.5) * 0.12; bp[k * 3 + 2] = Math.sin(a) * rr; bs[k] = 1.1 + rnd() * 0.9; bph[k] = rnd(); bt[k * 3] = 1; bt[k * 3 + 1] = 0.82; bt[k * 3 + 2] = 0.45; }
      const bg = new THREE.BufferGeometry(); bg.setAttribute("position", new THREE.BufferAttribute(bp, 3)); bg.setAttribute("size", new THREE.BufferAttribute(bs, 1)); bg.setAttribute("phase", new THREE.BufferAttribute(bph, 1)); bg.setAttribute("tint", new THREE.BufferAttribute(bt, 3));
      const belt = new THREE.Points(bg, starMat); belt.userData = { belt: true }; g.add(belt);
    }
    scene.add(g); systems.push(g);
    const lab = document.createElement("div"); lab.className = "gx-label"; lab.textContent = sys.name; labelsRoot.appendChild(lab); labels.push({ el: lab, obj: g, off: 2.5, kind: "system", sys });
  });

  /* ---------- blog: a comet with a trail ---------- */
  const BN = map.blog.count, cp = new Float32Array(BN * 3), cs = new Float32Array(BN), cph = new Float32Array(BN), ct = new Float32Array(BN * 3);
  for (let k = 0; k < BN; k++) { const u = k / (BN - 1), th = 4.9 + u * 2.0, p = armPoint(th, 0); p.y = 2.2 + u * 2.0; cp[k * 3] = p.x; cp[k * 3 + 1] = p.y; cp[k * 3 + 2] = p.z; cs[k] = 1.9 - u * 1.1; cph[k] = u; ct[k * 3] = 1; ct[k * 3 + 1] = 0.85; ct[k * 3 + 2] = 0.5; }
  const cg = new THREE.BufferGeometry(); cg.setAttribute("position", new THREE.BufferAttribute(cp, 3)); cg.setAttribute("size", new THREE.BufferAttribute(cs, 1)); cg.setAttribute("phase", new THREE.BufferAttribute(cph, 1)); cg.setAttribute("tint", new THREE.BufferAttribute(ct, 3));
  const comet = new THREE.Group(); scene.add(comet);
  const trailPts = new THREE.Points(cg, starMat); comet.add(trailPts);
  const cometHead = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: new THREE.Color("#ffe0a0"), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })); cometHead.scale.set(1.8, 1.8, 1);
  cometHead.scale.set(2.2, 2.2, 1); cometHead.position.set(cp[0], cp[1], cp[2]); cometHead.userData = { kind: "blog" }; comet.add(cometHead); pickables.push(cometHead);
  const blogLab = document.createElement("div"); blogLab.className = "gx-label"; blogLab.textContent = map.blog.name; labelsRoot.appendChild(blogLab); labels.push({ el: blogLab, obj: cometHead, off: 1.1, kind: "blog" });
  const coreLab = document.createElement("div"); coreLab.className = "gx-label gx-core"; coreLab.textContent = map.core.name; labelsRoot.appendChild(coreLab); labels.push({ el: coreLab, obj: coreMesh, off: 0, kind: "core", dy: phone ? 60 : 84 });

  /* ---------- post: bloom ---------- */
  const composer = new EffectComposer(renderer); composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(2, 2), phone ? 0.4 : 0.5, 0.5, 0.82); composer.addPass(bloom); composer.addPass(new OutputPass());

  /* ---------- interaction ---------- */
  const cometAge = new Float32Array(BN).map(() => Math.random()), cometSeed = new Float32Array(BN).map(() => Math.random() * 6.28);
  const cometPath = []; for (let k = 0; k < BN; k++) cometPath.push(new THREE.Vector3(cp[k * 3], cp[k * 3 + 1], cp[k * 3 + 2]));
  const cometCurve = new THREE.CatmullRomCurve3(cometPath.slice().reverse());
  const meteorTex = spikeTexture(64); const meteors = [];
  for (let i = 0; i < 3; i++) { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: meteorTex, color: new THREE.Color("#fff1cc"), transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })); s.scale.set(1.4, 1.4, 1); scene.add(s); meteors.push({ s, t0: -99, from: new THREE.Vector3(), to: new THREE.Vector3(), next: 4 + rnd() * 8 }); }
  const ray = new THREE.Raycaster(); ray.params.Points.threshold = 0.6; const ptr = new THREE.Vector2(-9, -9); let hovered = null, focused = null, focusedPlanet = null;
  const par = new THREE.Vector2(0, 0), parGoal = new THREE.Vector2(0, 0);
  function pick() { ray.setFromCamera(ptr, camera); const hits = ray.intersectObjects(pickables, false); return hits.length ? hits[0].object : null; }
  const el = renderer.domElement;
  el.addEventListener("pointermove", (e) => { const r = el.getBoundingClientRect(); ptr.x = ((e.clientX - r.left) / r.width) * 2 - 1; ptr.y = -((e.clientY - r.top) / r.height) * 2 + 1; parGoal.set(ptr.x, ptr.y); });
  el.addEventListener("pointerleave", () => { ptr.set(-9, -9); parGoal.set(0, 0); });
  el.addEventListener("click", (e) => { const r = el.getBoundingClientRect(); ptr.x = ((e.clientX - r.left) / r.width) * 2 - 1; ptr.y = -((e.clientY - r.top) / r.height) * 2 + 1; const o = pick(); if (!o) { if (focused) back(); return; } activate(o); });
  function activate(o) { const u = o.userData;
    if (u.kind === "system") focus(u.group, u.system);
    else if (u.kind === "planet") { const pm = u.mesh || o; if (focused === u.group) { focusedPlanet = focusedPlanet === pm ? null : pm; opts.onPlanet && opts.onPlanet(focusedPlanet ? u.planet : null, u.system); } else focus(u.group, u.system); }
    else if (u.kind === "blog") opts.onOpen && opts.onOpen({ name: map.blog.name, href: map.blog.href }, null); }
  function focus(group, sys) { focused = group; focusedPlanet = null; viewGoal.el = phone ? 0.75 : 0.5; viewGoal.target.copy(group.position); viewGoal.r = phone ? 15 : 9.5; viewGoal.el = phone ? 0.75 : 0.5; document.body.classList.add("gx-focused"); opts.onFocus && opts.onFocus(sys); }
  function back() { if (focusedPlanet) { focusedPlanet = null; opts.onPlanet && opts.onPlanet(null, focused.userData.system); return; } focused = null; viewGoal.target.set(0, 0, 0); viewGoal.r = ORBIT_R; viewGoal.el = ORBIT_EL; document.body.classList.remove("gx-focused"); opts.onFocus && opts.onFocus(null); }

  function resize() { const w = container.clientWidth, h = container.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); composer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); }
  new ResizeObserver(resize).observe(container); resize();

  /* ---------- loop ---------- */
  const clock = new THREE.Clock(); let t = 0, running = true, visible = true, coreTick = 0, active = true;
  new IntersectionObserver((es) => { visible = es[0].isIntersecting; }).observe(container);
  document.addEventListener("visibilitychange", () => { running = !document.hidden; });
  const tmpV = new THREE.Vector3();
  function frame() {
    requestAnimationFrame(frame); if (!running || !visible || !active) return;
    const dt = Math.min(clock.getDelta(), 0.1); if (!rm) t += dt;
    const k = 1 - Math.pow(0.001, dt);
    const sysA = (t * 2 * Math.PI) / 600;
    systems.forEach((g) => { const u = g.userData; const p = armPoint(u.theta + sysA * 0.35, u.arm); g.position.x = p.x; g.position.z = p.z;
      const open = focused === g; const pf = !!focusedPlanet; const sunO = pf ? 0 : 1;
      g.children[0].material.opacity += (sunO - g.children[0].material.opacity) * k;
      g.children.forEach((c) => { const d = c.userData; if (d.kind === "planet") { const a2 = d.a0 + t * d.speed; c.position.set(Math.cos(a2) * d.orbit, 0, Math.sin(a2) * d.orbit);
          c.children.forEach((ch) => { const mine = c === focusedPlanet; if (ch.userData.dot) ch.material.opacity += ((open || pf ? 0 : 0.9) - ch.material.opacity) * k; if (ch.userData.rim) { ch.material.opacity += ((open && ch.material.map && (!pf || mine) ? 1 : 0) - ch.material.opacity) * k; ch.material.rotation = (ch.material.rotation || 0); } }); }
        if (d.ring) c.material.opacity += ((open && !pf ? 0.16 : 0) - c.material.opacity) * k;
        if (d.belt) c.material = starMat;
        if (d.belt) c.rotation.y = t * 0.02; }); });
    gas.rotation.y = rm ? 0 : t * (2 * Math.PI) / 900; gas.visible = !focusedPlanet; comet.visible = !focusedPlanet; trailPts.visible = !focusedPlanet;
    if (focusedPlanet) { focusedPlanet.getWorldPosition(viewGoal.target); const rim = focusedPlanet.children.find((ch) => ch.userData.rim); const sz = rim ? rim.scale.x : 1; viewGoal.r = (sz / (phone ? 0.3 : 0.5)) / (2 * Math.tan((camera.fov * Math.PI) / 360)); viewGoal.el = 0.28; } else if (focused) { viewGoal.target.copy(focused.position); viewGoal.r = phone ? 15 : 9.5; }
    camAngle += rm ? 0 : dt * (2 * Math.PI) / 420;
    par.lerp(parGoal, 1 - Math.pow(0.02, dt));
    view.r += (viewGoal.r - view.r) * k; view.el += (viewGoal.el - view.el) * k; view.target.lerp(viewGoal.target, k);
    const elv = view.el + (rm ? 0 : Math.sin(t / 23) * 0.05), rad = view.r * (1 + (rm ? 0 : Math.sin(t / 31) * 0.03));
    camera.position.set(view.target.x + Math.cos(camAngle) * rad * Math.cos(elv), view.target.y + Math.sin(elv) * rad, view.target.z + Math.sin(camAngle) * rad * Math.cos(elv));
    camera.lookAt(view.target);
    coreMat.opacity += ((focusedPlanet ? 0 : focused ? 0.3 : 1) - coreMat.opacity) * k; shadow.material.opacity = coreMat.opacity; coreHalo.material.opacity = 0.16 * coreMat.opacity; coreHalo2.material.opacity = 0.14 * coreMat.opacity;
    const sh = focusedPlanet ? (phone ? { x: 0, y: -viewGoal.r * 0.12 } : { x: 0, y: 0 }) : focused ? SHIFT_FOCUS : SHIFT; camera.translateX(sh.x + (phone ? 0 : par.x * (focused ? 0.12 : 1.2))); camera.translateY(sh.y + (phone ? 0 : par.y * (focused ? 0.08 : 1) * 0.8));
    if (backdrop) { const fwd = new THREE.Vector3(); camera.getWorldDirection(fwd); backdrop.position.copy(camera.position).addScaledVector(fwd, 420);
      const hgt = 2 * 420 * Math.tan((camera.fov * Math.PI) / 360) * 1.25, asp = phone ? 9 / 16 : 16 / 9; const wid = Math.max(hgt * asp, hgt * camera.aspect * 1.05); backdrop.scale.set(wid, Math.max(hgt, wid / asp), 1);
      if (backBlur) { backBlur.position.copy(backdrop.position); backBlur.scale.copy(backdrop.scale); backBlur.material.rotation = backdrop.material.rotation; blurTex.center.set(0.5, 0.5); blurTex.offset.copy(backTex.offset); blurTex.repeat.copy(backTex.repeat); backBlur.material.opacity += ((focusedPlanet ? 1 : 0) - backBlur.material.opacity) * k; }
      backdrop.material.rotation = rm ? 0 : Math.sin(t / 240) * 0.05; backTex.center.set(0.5, 0.5); backTex.offset.set(rm ? 0 : Math.sin(t / 97) * 0.012 + par.x * 0.006, rm ? 0 : Math.cos(t / 83) * 0.008 + par.y * 0.004); backTex.repeat.setScalar(0.94); }
    gas.children.forEach((s) => { const u = s.userData; if (!u || rm) return; s.material.rotation += u.spin * dt; const b = 1 + Math.sin(t * 0.21 + u.ph) * 0.06; s.scale.set(u.base * b, u.base * b, 1); });
    systems.forEach((g) => { const sun = g.children[0]; const b = 1 + Math.sin(t * 1.1 + sun.userData.ph) * 0.05; const sz = (focused === g ? 3.6 : sun.userData.base) * b; sun.scale.set(sz, sz, 1); sun.material.rotation = rm ? 0 : Math.sin(t * 0.3 + sun.userData.ph) * 0.04; });
    const cu = ((t / 80) % 1); const cpos = cometCurve.getPointAt(cu); cometHead.position.copy(cpos);
    cometHead.scale.setScalar(2.2 + Math.sin(t * 5) * 0.12);
    /* particles stream off the head: each lives about three seconds, drifting back along the path and sideways, then respawns at the head */
    { const ap = cg.attributes.position.array, asz = cg.attributes.size.array; for (let k = 0; k < BN; k++) { let age = cometAge[k] + dt / 3.2; if (age >= 1) { age -= 1; cometSeed[k] = rnd() * 6.28; } cometAge[k] = age; const back = ((cu - age * 0.05) % 1 + 1) % 1; const q = cometCurve.getPointAt(back); const sd = cometSeed[k]; ap[k * 3] = q.x + Math.cos(sd) * age * 0.9; ap[k * 3 + 1] = q.y + Math.sin(sd * 1.3) * age * 0.5; ap[k * 3 + 2] = q.z + Math.sin(sd) * age * 0.9; asz[k] = (1 - age) * 1.8 + 0.2; } cg.attributes.position.needsUpdate = true; cg.attributes.size.needsUpdate = true; }
    meteors.forEach((m) => { if (t - m.t0 > m.next) { m.t0 = t; m.next = 6 + rnd() * 10; const a = rnd() * 6.28, r = 40 + rnd() * 60; m.from.set(Math.cos(a) * r, 10 + rnd() * 30, Math.sin(a) * r); m.to.copy(m.from).add(new THREE.Vector3((rnd() - 0.5) * 30, -6 - rnd() * 8, (rnd() - 0.5) * 30)); }
      const u = (t - m.t0) / 1.1; if (u < 1) { m.s.position.lerpVectors(m.from, m.to, u); m.s.material.opacity = Math.sin(u * Math.PI) * 0.9; } else m.s.material.opacity = 0; });
    if (bhTex) { coreMesh.material.rotation = rm ? 0 : -t * (2 * Math.PI) / 150; } else { corePhi = -(t / 60) * 360; coreTick += dt; if (coreTick > 1 / 30) { coreTick = 0; drawCore(); } }
    if (loaded && !ready.done) { ready.done = true; resolveReady(); }
    starMat.uniforms.t.value = t;
    const o = pick(); if (o !== hovered) { hovered = o; el.style.cursor = o ? "pointer" : "default"; }
    composer.render();
    const w = container.clientWidth, h = container.clientHeight;
    labels.forEach((L) => {
      tmpV.setFromMatrixPosition(L.obj.matrixWorld); tmpV.y += L.off; tmpV.project(camera);
      let x = (tmpV.x * 0.5 + 0.5) * w, y = (-tmpV.y * 0.5 + 0.5) * h + (L.dy || 0);
      if (phone && L.kind !== "planet") { const half = (L.el.offsetWidth || 60) / 2 + 8; x = Math.min(Math.max(x, half), w - half); }
      const vis = tmpV.z < 1 && x > -40 && x < w + 40 && y > -20 && y < h + 20;
      L.el.style.transform = `translate(-50%,-50%) translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`; L.el.style.opacity = vis ? "" : "0";
      const hot = hovered && (hovered.userData.group === L.obj || hovered === L.obj || (hovered.userData.mesh && hovered.userData.mesh === L.obj)); L.el.classList.toggle("gx-hot", !!hot);
      L.el.classList.toggle("gx-dim", !!focused && focused !== L.obj && L.kind !== "core" && L.kind !== "planet");
      L.el.classList.toggle("gx-hide", (!!focused && (focused === L.obj || L.kind === "core")) || !!focusedPlanet);
      if (L.kind === "planet") L.el.classList.toggle("gx-show", focused === L.group);
      L._x = x; L._y = y; L._vis = vis && L.el.style.opacity !== "0" && !L.el.classList.contains("gx-hide") && (L.kind !== "planet" || focused === L.group);
    });
    /* separate overlapping labels: push the lower one down, up to three passes */
    const live = labels.filter((L) => L._vis);
    for (let pass = 0; pass < 3; pass++) for (let i = 0; i < live.length; i++) for (let j = i + 1; j < live.length; j++) {
      const A = live[i], B = live[j]; const aw = (A.el.offsetWidth || 60) / 2, bw = (B.el.offsetWidth || 60) / 2; const dx = Math.abs(A._x - B._x), dy = Math.abs(A._y - B._y);
      if (dx < aw + bw + 6 && dy < 18) { const lo = A._y > B._y ? A : B, hi = lo === A ? B : A; lo._y = hi._y + 18; } }
    live.forEach((L) => { L.el.style.transform = `translate(-50%,-50%) translate(${L._x.toFixed(1)}px,${L._y.toFixed(1)}px)`; });
  }
  frame();
  return { back, ready, selectPlanet: (href, notify) => { const m = pickables.find((o) => o.userData.kind === "planet" && o.userData.planet.href === href && o.userData.group === focused); if (m) { focusedPlanet = m.userData.mesh || m; if (notify && opts.onPlanet) opts.onPlanet(m.userData.planet, m.userData.system); } }, setActive: (v) => { active = !!v; }, focus: (id) => { const g = systems.find((s) => s.userData.system.id === id); if (g) focus(g, g.userData.system); }, renderer, get time() { return t; } };
}
