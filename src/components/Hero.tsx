"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { EASE, LEAGUES } from "@/lib/site";
import { MaskLines, useReducedSafe } from "./Reveal";
import { introDelay } from "./Loader";

/** Stacked 3D logo with gentle float + mouse parallax tilt. */
function FloatingLogo() {
  const reduced = useReducedSafe();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 120,
    damping: 20,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 120,
    damping: 20,
  });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={reduced ? undefined : onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: EASE, delay: introDelay(1.5) }}
      style={{ perspective: 900 }}
      className="pointer-events-auto"
    >
      <motion.div
        style={reduced ? undefined : { rotateX: rx, rotateY: ry }}
        className="animate-float-slow"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-stacked.webp"
          fetchPriority="high"
          alt="Clutch Picks logo"
          className="w-[min(48vw,250px)] select-none lg:w-[19vw] lg:max-w-[340px]"
          style={{
            filter:
              "drop-shadow(0 24px 48px rgba(0,0,0,0.85)) drop-shadow(0 0 64px rgba(122,157,184,0.16))",
          }}
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}

/** Infinite league ticker with SPORT_META accent dots. */
function LeagueTicker() {
  const items = [...LEAGUES, ...LEAGUES];
  return (
    <div
      className="relative col-span-12 mt-10 overflow-hidden lg:mt-12"
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
            className="flex items-center gap-2.5 whitespace-nowrap font-mono text-xs uppercase tracking-[0.16em] text-l4"
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

export default function Hero() {
  return (
    <section
      id="top"
      className="hero-pad relative grid min-h-svh w-full grid-cols-12 content-between gap-y-10 px-4 pb-14 lg:px-14 lg:pb-20"
    >
      {/* Meta — one quiet cluster, top-left */}
      <div className="col-span-12 max-w-xs font-sans">
        <MaskLines
          as="p"
          className="text-[5.4svw] font-semibold leading-tight sm:text-2xl lg:text-3xl"
          lines={["AI Sports", "Predictions"]}
          delay={introDelay(1.35)}
        />
        <motion.p
          className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-l3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: introDelay(1.6) }}
        >
          Free on the App Store
        </motion.p>
      </div>

      {/* Floating logo — secondary element, upper right, clear of the statement */}
      <div className="pointer-events-none col-span-12 flex justify-center lg:absolute lg:right-[8vw] lg:top-[14vh] lg:justify-end">
        <FloatingLogo />
      </div>

      {/* Display statement */}
      <div className="col-span-12">
        <MaskLines
          as="h1"
          className="font-sans text-[10svw] font-black uppercase leading-[0.94] font-wide lg:text-[7svw]"
          lines={[
            "Every pick",
            <span key="l2">
              runs <span className="text-teal tabular">50,000</span>
            </span>,
            "simulations",
          ]}
          delay={introDelay(1.45)}
        />
        <LeagueTicker />
      </div>
    </section>
  );
}
