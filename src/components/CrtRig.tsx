"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { CONFIDENCE_TIERS, LEAGUES } from "@/lib/site";
import { useReducedSafe } from "./Reveal";

/**
 * The jumbotron — a four-faced arena cube hung from its truss, swaying
 * gently in the haze, every face playing the Clutch channel loop
 * (ident → live scores → simulation counter → confidence tiers) drawn
 * onto a shared canvas texture with phosphor glow, scanlines, and
 * channel-change static. Mouse parallax + pendulum sway; paused
 * offscreen; still frame under reduced motion.
 */

const SCREEN_W = 512;
const SCREEN_H = 384;
const CHANNEL_SECONDS = 4.4;

/* ---- 2D screen channels ---- */

function scanlinesAndVignette(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.fillStyle = "#000";
  for (let y = 0; y < SCREEN_H; y += 4) ctx.fillRect(0, y, SCREEN_W, 1.6);
  ctx.restore();
  const v = ctx.createRadialGradient(
    SCREEN_W / 2,
    SCREEN_H / 2,
    SCREEN_H * 0.32,
    SCREEN_W / 2,
    SCREEN_H / 2,
    SCREEN_H * 0.78
  );
  v.addColorStop(0, "rgba(0,0,0,0)");
  v.addColorStop(1, "rgba(0,0,0,0.55)");
  ctx.fillStyle = v;
  ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);
}

/* next/font hashes family names — resolved from a probe element at init */
let LED_FAMILY = "'VT323', monospace";
let SERIF_FAMILY = "Georgia, serif";

function resolveFamilies() {
  const probe = document.createElement("span");
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  document.body.appendChild(probe);
  probe.style.fontFamily = "var(--font-led)";
  const led = getComputedStyle(probe).fontFamily;
  if (led) LED_FAMILY = led;
  probe.style.fontFamily = "var(--font-serif)";
  const serif = getComputedStyle(probe).fontFamily;
  if (serif) SERIF_FAMILY = serif;
  probe.remove();
}

function led(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  size: number,
  color: string,
  align: CanvasTextAlign = "left"
) {
  ctx.font = `${size}px ${LED_FAMILY}`;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.shadowColor = color;
  ctx.shadowBlur = size * 0.55;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  ctx.shadowBlur = 0;
}

function chrome(ctx: CanvasRenderingContext2D, t: number, channel: number) {
  led(ctx, `CH 0${channel + 1}`, SCREEN_W - 22, 30, 26, "#9bc2dc", "right");
  if (Math.floor(t * 1.6) % 2 === 0) {
    ctx.fillStyle = "#ff5a52";
    ctx.shadowColor = "#ff5a52";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(28, 30, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
  led(ctx, "LIVE", 44, 30, 26, "#f4d7d2");
}

function drawIdent(
  ctx: CanvasRenderingContext2D,
  t: number,
  logo: HTMLImageElement | null
) {
  ctx.fillStyle = "#0b1226";
  ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);
  if (logo && logo.complete && logo.naturalWidth > 0) {
    const w = SCREEN_W * 0.52;
    const h = (logo.naturalHeight / logo.naturalWidth) * w;
    const bob = Math.sin(t * 1.4) * 5;
    ctx.save();
    ctx.shadowColor = "rgba(155,194,220,0.9)";
    ctx.shadowBlur = 30;
    ctx.drawImage(logo, (SCREEN_W - w) / 2, SCREEN_H * 0.16 + bob, w, h);
    ctx.restore();
  } else {
    led(ctx, "CLUTCH PICKS", SCREEN_W / 2, SCREEN_H * 0.4, 66, "#eef4fa", "center");
  }
  led(
    ctx,
    "AI SPORTS NETWORK",
    SCREEN_W / 2,
    SCREEN_H * 0.82,
    34,
    "#9bc2dc",
    "center"
  );
}

const SCORE_ROWS = [
  ["NBA", "BOS 108 — LAL 102", "FINAL", "#eef4fa"],
  ["NFL", "KC 27 — BUF 24", "Q4 2:11", "#f2c94c"],
  ["NHL", "TOR 3 — NYR 2", "OT", "#9bc2dc"],
  ["MLB", "NYY 5 — HOU 3", "TOP 8", "#eef4fa"],
] as const;

function drawScores(ctx: CanvasRenderingContext2D, _t: number) {
  ctx.fillStyle = "#060a10";
  ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);
  led(ctx, "TONIGHT ON THE BOARD", SCREEN_W / 2, 78, 30, "#7a9db8", "center");
  SCORE_ROWS.forEach(([lg, score, status, color], i) => {
    const y = 132 + i * 58;
    led(ctx, lg, 30, y, 30, "#8ea4b8");
    led(ctx, score, SCREEN_W / 2 + 8, y, 34, color, "center");
    led(ctx, status, SCREEN_W - 26, y, 26, "#d25668", "right");
  });
}

function drawSims(ctx: CanvasRenderingContext2D, t: number) {
  ctx.fillStyle = "#0a0812";
  ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);
  const cycle = (t % CHANNEL_SECONDS) / CHANNEL_SECONDS;
  const eased = 1 - Math.pow(1 - Math.min(1, cycle * 1.6), 3);
  const n = Math.round(50000 * eased);
  led(
    ctx,
    n.toLocaleString("en-US"),
    SCREEN_W / 2,
    SCREEN_H * 0.42,
    104,
    "#eef4fa",
    "center"
  );
  led(
    ctx,
    "SIMULATIONS PER GAME",
    SCREEN_W / 2,
    SCREEN_H * 0.68,
    34,
    "#9bc2dc",
    "center"
  );
  const dots = Math.floor(eased * 24);
  for (let i = 0; i < 24; i++) {
    ctx.fillStyle = i < dots ? "#7a9db8" : "rgba(122,157,184,0.18)";
    ctx.fillRect(SCREEN_W / 2 - 144 + i * 12, SCREEN_H * 0.8, 8, 8);
  }
}

function drawTiers(ctx: CanvasRenderingContext2D, t: number) {
  ctx.fillStyle = "#070b0d";
  ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);
  led(ctx, "CONFIDENCE READOUT", SCREEN_W / 2, 70, 30, "#7a9db8", "center");
  const cycle = Math.min(1, ((t % CHANNEL_SECONDS) / CHANNEL_SECONDS) * 2.2);
  CONFIDENCE_TIERS.forEach((tier, i) => {
    const y = 118 + i * 52;
    led(ctx, tier.label.toUpperCase(), 30, y, 27, tier.color);
    const w = (SCREEN_W - 200) * (tier.width / 100) * cycle;
    ctx.fillStyle = tier.color;
    ctx.shadowColor = tier.color;
    ctx.shadowBlur = 8;
    ctx.fillRect(180, y - 8, w, 16);
    ctx.shadowBlur = 0;
  });
}

function drawStatic(ctx: CanvasRenderingContext2D) {
  const img = ctx.createImageData(SCREEN_W / 2, SCREEN_H / 2);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() * 255;
    img.data[i] = v;
    img.data[i + 1] = v;
    img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  ctx.drawImage(ctx.canvas, 0, 0, SCREEN_W / 2, SCREEN_H / 2, 0, 0, SCREEN_W, SCREEN_H);
}

type ChannelFn = (
  ctx: CanvasRenderingContext2D,
  t: number,
  logo: HTMLImageElement | null
) => void;

const CHANNELS: ChannelFn[] = [drawIdent, drawScores, drawSims, drawTiers];

/* ---- helper textures ---- */

function makeHazeTexture(rgb: string) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(128, 128, 12, 128, 128, 126);
  g.addColorStop(0, `rgba(${rgb},0.4)`);
  g.addColorStop(0.6, `rgba(${rgb},0.15)`);
  g.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Vertical league-color stripes for the cube's lower trim band. */
function makeLeagueBandTexture() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 32;
  const ctx = c.getContext("2d")!;
  const w = 512 / LEAGUES.length;
  LEAGUES.forEach((l, i) => {
    ctx.fillStyle = l.color;
    ctx.fillRect(i * w, 0, w + 1, 32);
  });
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Serif wordmark plate for the truss beam. */
function makeBeamPlateTexture() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 64;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const draw = () => {
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, 512, 64);
    ctx.fillStyle = "#10141b";
    ctx.fillRect(0, 0, 512, 64);
    ctx.font = `italic 600 38px ${SERIF_FAMILY}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(238,244,250,0.75)";
    ctx.shadowBlur = 12;
    ctx.fillStyle = "#eef4fa";
    ctx.fillText("Clutch Picks", 256, 35);
    tex.needsUpdate = true;
  };
  draw();
  document.fonts?.ready.then(draw).catch(() => {});
  return tex;
}

interface CrtRigProps {
  className?: string;
  /** 0→1 dolly into the front screen (any object with .get(), e.g. a framer MotionValue). */
  zoom?: { get(): number };
}

export default function CrtRig({ className = "", zoom }: CrtRigProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedSafe();
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    resolveFamilies();

    /* renderer */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
    camera.position.set(0, 0.32, 5.7);

    /* arena lighting — cool floodlight key, maroon low rim */
    scene.add(new THREE.HemisphereLight(0x22303e, 0x04060a, 0.8));
    const key = new THREE.DirectionalLight(0xcfe4f4, 1.6);
    key.position.set(2.8, 3.2, 2.6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x8b2333, 1.0);
    rim.position.set(-3.2, -1.2, -1.6);
    scene.add(rim);
    const tube = new THREE.PointLight(0x9bc2dc, 2.0, 7, 1.6);
    tube.position.set(0, 0.55, 1.9);
    scene.add(tube);

    /* the rig, hung from its beam — group origin at the beam so the
     * whole assembly sways like a pendulum */
    const rig = new THREE.Group();
    rig.position.set(0, 1.82, 0);
    scene.add(rig);

    const graphite = new THREE.MeshStandardMaterial({
      color: 0x232a34,
      roughness: 0.46,
      metalness: 0.55,
    });
    const steel = new THREE.MeshStandardMaterial({
      color: 0x39424e,
      roughness: 0.38,
      metalness: 0.7,
    });
    const maroonTrim = new THREE.MeshStandardMaterial({
      color: 0x6a0818,
      roughness: 0.5,
      metalness: 0.3,
    });

    const disposables: { dispose(): void }[] = [graphite, steel, maroonTrim];
    const add = (
      geo: THREE.BufferGeometry,
      mat: THREE.Material,
      x = 0,
      y = 0,
      z = 0
    ) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      rig.add(m);
      disposables.push(geo);
      return m;
    };

    /* truss beam + hanger cables (y is relative to the beam) */
    add(new THREE.BoxGeometry(3.1, 0.1, 0.2), steel, 0, 0, 0);
    add(new THREE.BoxGeometry(0.1, 0.1, 1.4), steel, -1.35, 0, 0);
    add(new THREE.BoxGeometry(0.1, 0.1, 1.4), steel, 1.35, 0, 0);
    const cableGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.5, 6);
    disposables.push(cableGeo);
    add(cableGeo, steel, -0.85, -0.28, 0);
    const cable2 = new THREE.Mesh(cableGeo, steel);
    cable2.position.set(0.85, -0.28, 0);
    rig.add(cable2);

    /* beam wordmark plate */
    const beamTex = makeBeamPlateTexture();
    const beamMat = new THREE.MeshBasicMaterial({ map: beamTex });
    const beamPlate = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 0.145), beamMat);
    beamPlate.position.set(0, 0.002, 0.102);
    rig.add(beamPlate);
    disposables.push(beamPlate.geometry, beamMat, beamTex);

    /* ON AIR lamp on the beam */
    const lampMat = new THREE.MeshStandardMaterial({
      color: 0x30060a,
      emissive: 0xff3b30,
      emissiveIntensity: 1.6,
      roughness: 0.4,
    });
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.07, 0.07), lampMat);
    lamp.position.set(0, 0.085, 0.06);
    rig.add(lamp);
    disposables.push(lamp.geometry, lampMat);
    const lampLight = new THREE.PointLight(0xff3b30, 0.9, 2.4, 2);
    lampLight.position.set(0, 0.14, 0.3);
    rig.add(lampLight);

    /* cube body — centered below the beam */
    const CUBE_Y = -1.32;
    add(new RoundedBoxGeometry(2.1, 1.66, 2.1, 4, 0.1), graphite, 0, CUBE_Y, 0);
    /* top cap + maroon lower trim */
    add(new RoundedBoxGeometry(2.18, 0.12, 2.18, 2, 0.05), steel, 0, CUBE_Y + 0.86, 0);
    add(new RoundedBoxGeometry(2.16, 0.1, 2.16, 2, 0.04), maroonTrim, 0, CUBE_Y - 0.85, 0);

    /* league-stripe band under the trim */
    const bandTex = makeLeagueBandTexture();
    const bandMat = new THREE.MeshBasicMaterial({ map: bandTex });
    disposables.push(bandTex, bandMat);
    const bandGeo = new THREE.BoxGeometry(2.12, 0.09, 2.12);
    disposables.push(bandGeo);
    const band = new THREE.Mesh(
      bandGeo,
      [bandMat, bandMat, graphite, graphite, bandMat, bandMat]
    );
    band.position.set(0, CUBE_Y - 0.94, 0);
    rig.add(band);

    /* four screens — one shared animated texture */
    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = SCREEN_W;
    screenCanvas.height = SCREEN_H;
    const sctx = screenCanvas.getContext("2d")!;
    const screenTex = new THREE.CanvasTexture(screenCanvas);
    screenTex.colorSpace = THREE.SRGBColorSpace;
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTex });
    disposables.push(screenMat, screenTex);
    const faceGeo = new THREE.PlaneGeometry(1.86, 1.36);
    disposables.push(faceGeo);
    const HALF = 1.06;
    const faces: [number, number, number][] = [
      [0, 0, HALF],
      [HALF, Math.PI / 2, 0],
      [0, Math.PI, -HALF],
      [-HALF, -Math.PI / 2, 0],
    ];
    faces.forEach(([x, ry, z]) => {
      const f = new THREE.Mesh(faceGeo, screenMat);
      f.position.set(x, CUBE_Y + 0.03, z);
      f.rotation.y = ry;
      rig.add(f);
    });

    /* arena haze */
    const hazeA = makeHazeTexture("74,96,116");
    const hazeB = makeHazeTexture("96,44,58");
    const hazes: THREE.Sprite[] = [];
    const hazeSeeds = [
      { x: -2.5, y: -2.2, z: -1.5, s: 5.4, tex: hazeA },
      { x: 2.3, y: -2.6, z: -0.9, s: 4.6, tex: hazeB },
      { x: 0.3, y: -3.0, z: 0.8, s: 3.8, tex: hazeA },
      { x: -1.1, y: -1.6, z: 0.3, s: 3.0, tex: hazeA },
    ];
    hazeSeeds.forEach((f) => {
      const mat = new THREE.SpriteMaterial({
        map: f.tex,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      });
      const sp = new THREE.Sprite(mat);
      sp.position.set(f.x, f.y + 1.82, f.z);
      sp.scale.setScalar(f.s);
      scene.add(sp);
      hazes.push(sp);
      disposables.push(mat);
    });
    disposables.push(hazeA, hazeB);

    /* logo for the ident channel */
    const logo = new Image();
    logo.src = "/logo-stacked.webp";

    /* interaction state */
    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    /* pause offscreen */
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    io.observe(host);

    let baseZ = 5.7;
    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      /* keep the whole hang in frame on narrow columns */
      baseZ = w / h < 0.95 ? 7.1 : 5.7;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let raf = 0;
    let lastScreenDraw = 0;
    const start = performance.now();

    const drawScreen = (t: number) => {
      const channel =
        ((Math.floor(t / CHANNEL_SECONDS) % CHANNELS.length) +
          CHANNELS.length) %
        CHANNELS.length;
      const inChannel = t % CHANNEL_SECONDS;
      if (inChannel > CHANNEL_SECONDS - 0.22) {
        drawStatic(sctx);
      } else {
        CHANNELS[channel](sctx, t, logo);
        chrome(sctx, t, channel);
      }
      scanlinesAndVignette(sctx);
      screenTex.needsUpdate = true;
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      /* rAF timestamps can predate `start` on the very first frame */
      const t = Math.max(0, now - start) / 1000;
      const still = reducedRef.current;

      /* screens refresh at ~20fps — plenty for phosphor */
      if (now - lastScreenDraw > 50) {
        lastScreenDraw = now;
        drawScreen(still ? 1.2 : t);
      }

      /* dolly toward the front screen when the scene drives a zoom */
      const zRaw = Math.min(1, Math.max(0, zoomRef.current?.get() ?? 0));
      const ze = zRaw * zRaw * (3 - 2 * zRaw); // smoothstep
      camera.position.z = baseZ + (2.85 - baseZ) * ze;
      camera.position.y = 0.32 + (0.5 - 0.32) * ze;

      if (!still) {
        /* pendulum sway from the beam + slow turn + parallax,
         * all blending to a square-on face as the dolly closes in */
        const calm = 1 - ze;
        const swayZ = (Math.sin(t * 0.55) * 0.028 + mouse.x * 0.05) * calm;
        const turnY =
          (-0.42 + Math.sin(t * 0.22) * 0.16 + mouse.x * 0.4) * calm;
        const nodX = (mouse.y * 0.14 + Math.sin(t * 0.4) * 0.012) * calm;
        rig.rotation.z += (swayZ - rig.rotation.z) * 0.04;
        rig.rotation.y += (turnY - rig.rotation.y) * (0.05 + ze * 0.06);
        rig.rotation.x += (nodX - rig.rotation.x) * 0.05;
        hazes.forEach((f, i) => {
          f.position.x = hazeSeeds[i].x + Math.sin(t * 0.1 + i * 2.1) * 0.6;
          f.position.y =
            hazeSeeds[i].y + 1.82 + Math.sin(t * 0.13 + i * 1.3) * 0.2;
          (f.material as THREE.SpriteMaterial).opacity =
            (0.46 + Math.sin(t * 0.2 + i) * 0.13) * (1 - ze * 0.85);
        });
        tube.intensity = 1.9 + Math.sin(t * 9) * 0.12;
        lampMat.emissiveIntensity = Math.floor(t * 1.8) % 2 === 0 ? 1.8 : 0.5;
        lampLight.intensity = lampMat.emissiveIntensity * 0.5;
      }
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={`relative ${className}`}
      aria-hidden="true"
    />
  );
}
