"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import {
  easeOut,
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { EASE, LEAGUES } from "@/lib/site";
import { MaskLines, useDesktop, useReducedSafe } from "./Reveal";
import { introDelay } from "./Loader";
import CrtRig from "./CrtRig";

/** Foam finger — the number-one hand, pointing down at the board. */
export function FoamFinger({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      animate={{ y: [0, 7, 0] }}
      transition={{
        duration: 1.7,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 22 28"
        fill="none"
        className="h-[1.3em] w-auto rotate-180"
      >
        <rect x="3.4" y="0.5" width="7.2" height="14" rx="3.6" fill="currentColor" />
        <rect x="2" y="10" width="18" height="13.5" rx="5.2" fill="currentColor" />
        <rect x="17.2" y="8.2" width="4.3" height="9" rx="2.15" fill="currentColor" />
        <rect x="4.6" y="23.8" width="12.8" height="3.7" rx="1.4" fill="#8B0A1F" />
      </svg>
    </motion.span>
  );
}

/** Infinite league ticker with SPORT_META accent dots. */
function LeagueTicker() {
  const items = [...LEAGUES, ...LEAGUES];
  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max items-center gap-8 pr-8">
        {items.map((l, i) => (
          <span
            key={`${l.abbr}-${i}`}
            className="flex items-center gap-2.5 whitespace-nowrap font-led text-base tracking-[0.1em] text-l4"
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: l.color }}
            />
            {l.abbr}
          </span>
        ))}
      </div>
    </div>
  );
}

/** A statement word staged in space — loads in on its own, scatters on scroll. */
function SceneWord({
  p,
  style,
  className = "",
  rotate,
  scatter,
  delay,
  children,
}: {
  p: MotionValue<number>;
  style: CSSProperties;
  className?: string;
  rotate: number;
  scatter: { x: string; y: string; r: number };
  delay: number;
  children: ReactNode;
}) {
  const x = useTransform(p, [0.3, 0.52], ["0vw", scatter.x], { ease: easeOut });
  const y = useTransform(p, [0, 0.3, 0.52], ["0svh", "-2svh", scatter.y], {
    ease: [easeOut, easeOut],
  });
  const r = useTransform(p, [0.3, 0.52], [rotate, rotate + scatter.r], {
    ease: easeOut,
  });
  const opacity = useTransform(p, [0.32, 0.5], [1, 0]);
  const blur = useTransform(p, [0.32, 0.5], [0, 12]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  return (
    <motion.span
      className="absolute block will-change-transform"
      style={{ ...style, x, y, rotate: r, opacity, filter }}
    >
      <motion.span
        className={`block ${className}`}
        initial={{ opacity: 0, y: 110, scale: 1.08 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: EASE, delay: introDelay(delay) }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedSafe();
  const desktop = useDesktop();
  const cinema = desktop && !reduced;

  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* scene drivers — the dolly rides a spring so scrubbing feels weighted */
  const zoomRaw = useTransform(p, [0.46, 0.88], [0, 1]);
  const zoom = useSpring(zoomRaw, { stiffness: 90, damping: 24 });
  const uiOpacity = useTransform(p, [0.24, 0.38], [1, 0]);
  const staticOpacity = useTransform(p, [0.8, 0.94], [0, 1]);

  /* stacked-fallback drivers (mobile) */
  const rigY = useTransform(p, [0, 1], [0, -110]);
  const rigOpacity = useTransform(p, [0, 0.55, 1], [1, 0.85, 0]);

  if (cinema) {
    return (
      <section ref={ref} id="top" className="relative h-[320svh]">
        <div className="sticky top-0 h-svh overflow-hidden">
          {/* the jumbotron, center stage */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[5svh]">
            <CrtRig zoom={zoom} className="h-full w-full" />
          </div>

          {/* statement words staged around the rig */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <SceneWord
              p={p}
              style={{ top: "17svh", left: "4.5vw" }}
              rotate={-3.5}
              scatter={{ x: "-42vw", y: "-20svh", r: -9 }}
              delay={1.45}
              className="glow-serif-strong animate-glow-breathe font-serif text-[7vw] font-semibold leading-none tracking-tight"
            >
              Eligible Model Picks,
            </SceneWord>
            <SceneWord
              p={p}
              style={{ top: "31svh", right: "5vw" }}
              rotate={2.5}
              scatter={{ x: "40vw", y: "-14svh", r: 8 }}
              delay={1.58}
              className="glow-serif font-serif text-[5.6vw] font-medium italic leading-none tracking-tight"
            >
              Run Through
            </SceneWord>
            <SceneWord
              p={p}
              style={{ bottom: "27svh", left: "6vw" }}
              rotate={-2}
              scatter={{ x: "-46vw", y: "20svh", r: -7 }}
              delay={1.7}
              className="glow-ice font-serif text-[10.5vw] font-semibold leading-none tracking-tight tabular"
            >
              50,000
            </SceneWord>
            <SceneWord
              p={p}
              style={{ bottom: "12svh", right: "6.5vw" }}
              rotate={1.5}
              scatter={{ x: "42vw", y: "24svh", r: 8 }}
              delay={1.82}
              className="glow-serif-strong font-serif text-[6.8vw] font-semibold leading-none tracking-tight"
            >
              Simulations
            </SceneWord>
          </div>

          {/* bottom-left stack: cue + meta, balancing "Simulations" opposite */}
          <motion.div
            style={{ opacity: uiOpacity }}
            className="pointer-events-none absolute bottom-[10.5svh] left-[6vw] z-10 flex flex-col gap-2.5"
          >
            <motion.p
              className="flex items-center gap-4 font-serif text-xl text-l2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: introDelay(1.95) }}
            >
              Scroll Into the Broadcast
              <span className="flex items-center gap-1.5 text-l1">
                <FoamFinger />
                <FoamFinger delay={0.18} />
              </span>
            </motion.p>
            <motion.p
              className="font-led text-base tracking-[0.14em] text-l3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: introDelay(2.15) }}
            >
              AI SPORTS PREDICTIONS · FREE ON THE APP STORE
            </motion.p>
          </motion.div>

          <motion.div
            style={{ opacity: uiOpacity }}
            className="pointer-events-none absolute inset-x-0 bottom-[6.5svh] z-10"
          >
            <LeagueTicker />
          </motion.div>

          {/* the cut — static swallows the screen as the dolly lands */}
          <motion.div
            style={{ opacity: staticOpacity, backgroundImage: "url(/noise.png)" }}
            className="static-loop pointer-events-none absolute inset-0 z-20"
          />
        </div>
      </section>
    );
  }

  /* stacked hero — phones and reduced motion */
  return (
    <section
      ref={ref}
      id="top"
      className="hero-pad relative flex min-h-svh w-full flex-col px-4 pb-10 lg:px-14 lg:pb-14"
    >
      <motion.div
        style={reduced ? undefined : { y: rigY, opacity: rigOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-[4svh] top-[57svh]"
      >
        <CrtRig className="h-full w-full" />
      </motion.div>

      <div className="relative z-10 max-w-xs">
        <MaskLines
          as="p"
          className="font-serif text-xl font-medium italic leading-snug text-l2 sm:text-2xl"
          lines={["AI Sports", "Predictions"]}
          delay={introDelay(1.35)}
        />
        <motion.p
          className="mt-3 font-led text-base tracking-[0.1em] text-l3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: introDelay(1.6) }}
        >
          FREE ON THE APP STORE
        </motion.p>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-start pt-[7svh]">
        <MaskLines
          as="h1"
          className="glow-serif-strong animate-glow-breathe font-serif text-[11.5svw] font-semibold leading-[1.02] tracking-tight sm:text-[9svw]"
          lines={[
            "Eligible Model Picks,",
            <span key="l2">
              Run Through <span className="glow-ice tabular">50,000</span>
            </span>,
            "Simulations",
          ]}
          delay={introDelay(1.45)}
        />
        <motion.p
          className="mt-7 flex items-center gap-4 font-serif text-lg text-l2 sm:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: introDelay(1.85) }}
        >
          Scroll Into the Broadcast
          <span className="flex items-center gap-1.5 text-l1">
            <FoamFinger />
            <FoamFinger delay={0.18} />
          </span>
        </motion.p>
      </div>

      <div className="relative z-10 mt-10">
        <LeagueTicker />
      </div>
    </section>
  );
}
