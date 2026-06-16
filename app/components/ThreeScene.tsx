"use client";
/**
 * ThreeScene — the 3D camera journey for the spy intro. A PerspectiveCamera
 * dollies forward through a rifled gold tunnel, orbits a frozen bullet-time
 * particle burst, the gold fluid "washes" past the lens once, then arrives on
 * the panopticon mark. Fires onArrive when the camera lands; then dims so the
 * DOM lock overlay (wordmark + founder credit + scroll) reads clean.
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";

const GOLD = 0xd4af37, GOLDL = 0xe8c96a, DARK = 0x0c0a08;

// piecewise-linear keyframe sampler
function key(frames: [number, number][], t: number) {
  if (t <= frames[0][0]) return frames[0][1];
  for (let i = 1; i < frames.length; i++) {
    if (t <= frames[i][0]) {
      const [t0, v0] = frames[i - 1], [t1, v1] = frames[i];
      const a = (t - t0) / (t1 - t0);
      return v0 + (v1 - v0) * (a * a * (3 - 2 * a)); // smoothstep
    }
  }
  return frames[frames.length - 1][1];
}

// draw the reverse-panopticon mark to a canvas for use as a texture
function markTexture(): THREE.CanvasTexture {
  const s = 512, cv = document.createElement("canvas"); cv.width = cv.height = s;
  const c = cv.getContext("2d")!; const cx = s / 2, cy = s / 2;
  const gold = "#d4af37";
  c.clearRect(0, 0, s, s);
  // concentric rings
  c.strokeStyle = gold; c.lineWidth = 2;
  for (let i = 1; i <= 10; i++) { c.globalAlpha = 0.12 + i * 0.05; c.beginPath(); c.arc(cx, cy, 60 + i * 14, 0, 7); c.stroke(); }
  c.globalAlpha = 1;
  // outer ring band
  c.lineWidth = 30; c.beginPath(); c.arc(cx, cy, 232, 0, 7); c.stroke();
  // radial cells
  c.fillStyle = gold;
  for (let g = 0; g < 8; g++) {
    const a = (g / 8) * Math.PI * 2 - Math.PI / 2;
    for (const [off, w, h] of [[0, 14, 54], [-0.17, 9, 28], [0.17, 9, 28]]) {
      c.save(); c.translate(cx + Math.cos(a + off) * 212, cy + Math.sin(a + off) * 212); c.rotate(a + off + Math.PI / 2);
      c.fillRect(-w / 2, -h / 2, w, h); c.restore();
    }
  }
  // PV
  c.fillStyle = DARK_HEX; c.beginPath(); c.arc(cx, cy, 58, 0, 7); c.fill();
  c.fillStyle = gold; c.font = "700 64px Cinzel, Georgia, serif"; c.textAlign = "center"; c.textBaseline = "middle";
  c.fillText("PV", cx, cy + 2);
  const tex = new THREE.CanvasTexture(cv); tex.anisotropy = 4; return tex;
}
const DARK_HEX = "#0c0a08";

const WASH_FRAG = `precision highp float;
varying vec2 vUv; uniform float u_time; uniform float u_alpha;
float hash(vec2 p){ p=fract(p*vec2(123.34,345.45)); p+=dot(p,p+34.345); return fract(p.x*p.y); }
float noise(vec2 p){ vec2 i=floor(p),f=fract(p); vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y); }
float fbm(vec2 p){ float v=0.,a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p=p*2.02+vec2(11.3,7.7); a*=0.5; } return v; }
void main(){
  vec2 p=vUv*2.0; float t=u_time*0.3;
  vec2 q=vec2(fbm(p+vec2(0.,t)),fbm(p+vec2(5.2,-t)));
  float f=fbm(p+2.5*q);
  vec3 gold=vec3(0.831,0.686,0.216), goldL=vec3(0.91,0.79,0.42);
  vec3 col=mix(vec3(0.05,0.04,0.03), gold, smoothstep(0.4,0.95,f));
  col+=goldL*smoothstep(0.8,1.05,f)*0.6;
  float edge=smoothstep(0.0,0.35,vUv.x)*smoothstep(1.0,0.65,vUv.x)*smoothstep(0.0,0.35,vUv.y)*smoothstep(1.0,0.65,vUv.y);
  gl_FragColor=vec4(col, u_alpha*edge*(0.4+f*0.7));
}`;
const WASH_VERT = `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`;

export function ThreeScene({ onArrive, dim }: { onArrive: () => void; dim: boolean }) {
  const mount = useRef<HTMLDivElement>(null);
  const arrived = useRef(false);

  useEffect(() => {
    const el = mount.current; if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false }); }
    catch { onArrive(); return; }
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.3 : 1.6);
    renderer.setPixelRatio(dpr);
    renderer.setSize(innerWidth, innerHeight);
    renderer.setClearColor(DARK, 1);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(DARK, 0.011);
    const camera = new THREE.PerspectiveCamera(62, innerWidth / innerHeight, 0.1, 400);

    const disposables: { dispose: () => void }[] = [];
    const reg = <T extends { dispose: () => void }>(x: T) => { disposables.push(x); return x; };

    // 1. rifled tunnel of gold rings
    const ringGeo = reg(new THREE.TorusGeometry(6, 0.06, 8, 64));
    const ringMat = reg(new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.5 }));
    for (let i = 0; i < 34; i++) {
      const m = new THREE.Mesh(ringGeo, ringMat);
      m.position.z = -i * 6; m.rotation.z = i * 0.32; // rifling twist
      const s = 1 + Math.sin(i * 0.6) * 0.18; m.scale.set(s, s, 1);
      scene.add(m);
    }
    // faint inner rails
    const railMat = reg(new THREE.MeshBasicMaterial({ color: GOLDL, transparent: true, opacity: 0.16 }));
    const railGeo = reg(new THREE.TorusGeometry(4.2, 0.02, 6, 48));
    for (let i = 0; i < 34; i++) { const m = new THREE.Mesh(railGeo, railMat); m.position.z = -i * 6 - 3; scene.add(m); }

    // 2. bullet-time particle burst (frozen) around z=-72
    const N = coarse ? 260 : 520;
    const ppos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = Math.pow(Math.random(), 0.5) * 11, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      ppos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      ppos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      ppos[i * 3 + 2] = -72 + r * Math.cos(ph) * 0.7;
    }
    const pGeo = reg(new THREE.BufferGeometry()); pGeo.setAttribute("position", new THREE.BufferAttribute(ppos, 3));
    const pMat = reg(new THREE.PointsMaterial({ color: GOLDL, size: 0.13, transparent: true, opacity: 0.92, sizeAttenuation: true }));
    const burst = new THREE.Points(pGeo, pMat); scene.add(burst);

    // 3. transient "wash" plane — gold fluid that sweeps past the lens once
    const washMat = reg(new THREE.ShaderMaterial({
      vertexShader: WASH_VERT, fragmentShader: WASH_FRAG,
      uniforms: { u_time: { value: 0 }, u_alpha: { value: 0 } },
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
    const washGeo = reg(new THREE.PlaneGeometry(60, 38));
    const wash = new THREE.Mesh(washGeo, washMat); scene.add(wash);

    // 4. panopticon mark plane at the end of the tunnel
    const markTex = reg(markTexture());
    const markMat = reg(new THREE.MeshBasicMaterial({ map: markTex, transparent: true, opacity: 0 }));
    const markGeo = reg(new THREE.PlaneGeometry(20, 20));
    const mark = new THREE.Mesh(markGeo, markMat); mark.position.z = -196; scene.add(mark);
    // glow behind mark
    const glowMat = reg(new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
    const glow = new THREE.Mesh(reg(new THREE.CircleGeometry(16, 48)), glowMat); glow.position.z = -198; scene.add(glow);

    // camera keyframes (seconds → value). Arrive ~8.6s.
    const camZ: [number, number][] = [[0, 14], [2, -34], [4.2, -78], [6, -120], [7.6, -168], [8.6, -188]];
    const orbit: [number, number][] = [[0, 0], [2, 2.0], [3.6, 4.2], [5.4, 2.4], [7, 0.8], [8.6, 0]];
    const roll: [number, number][] = [[0, 0], [3.8, 0.18], [6, -0.08], [8.6, 0]];
    const ARRIVE = 8.6;

    let raf = 0; const clock = new THREE.Clock(); let elapsed = 0;
    const onResize = () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); };
    window.addEventListener("resize", onResize);

    const tick = () => {
      elapsed += clock.getDelta();
      const t = elapsed;
      const cz = key(camZ, t), amp = key(orbit, t);
      camera.position.set(Math.sin(t * 0.9) * amp, Math.cos(t * 0.75) * amp * 0.7, cz);
      camera.up.set(0, 1, 0); camera.lookAt(0, 0, cz - 30);
      camera.rotation.z += key(roll, t);

      burst.rotation.y = t * 0.05; burst.rotation.x = t * 0.03;

      // wash sweeps from ahead of the camera to behind it around t∈[3.8,5.8]
      const wp = Math.min(1, Math.max(0, (t - 3.8) / 2.0));
      wash.position.set(camera.position.x, camera.position.y, cz - 26 + wp * 46);
      wash.lookAt(camera.position);
      washMat.uniforms.u_time.value = t;
      washMat.uniforms.u_alpha.value = Math.sin(wp * Math.PI) * 0.85;

      // mark fades/grows in over the final approach
      const ma = Math.min(1, Math.max(0, (t - 6.2) / 2.2));
      markMat.opacity = ma; glowMat.opacity = ma * 0.5 * (0.7 + Math.sin(t * 2) * 0.3);

      if (!arrived.current && t >= ARRIVE) { arrived.current = true; onArrive(); }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf); window.removeEventListener("resize", onResize);
      disposables.forEach((d) => d.dispose());
      renderer.dispose(); el.removeChild(renderer.domElement);
    };
  }, [onArrive]);

  return <div ref={mount} style={{ position: "absolute", inset: 0, opacity: dim ? 0.35 : 1, transition: "opacity 1.1s ease" }} />;
}
