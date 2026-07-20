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
      transition={{ duration: 1.1, ease: EASE, delay: 1.5 }}
      style={{ perspective: 900 }}
      className="pointer-events-auto"
    >
      <motion.div
        style={reduced ? undefined : { rotateX: rx, rotateY: ry }}
        className="animate-float-slow"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-stacked.png"
          alt="Clutch Picks logo"
          className="w-[min(58vw,300px)] select-none lg:w-[24vw] lg:max-w-[420px]"
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
            className="flex items-center gap-2.5 whitespace-nowrap font-mono text-xs uppercase tracking-[0.16em] text-l3"
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
      className="relative grid min-h-svh w-full grid-cols-12 content-between gap-y-10 px-4 pb-14 pt-24 lg:px-14 lg:pb-20 lg:pt-28"
    >
      {/* Meta row */}
      <div className="col-span-12 grid grid-cols-12 gap-y-8 font-sans">
        <MaskLines
          as="p"
          className="col-span-8 text-[5.4svw] font-semibold leading-tight sm:text-2xl lg:col-span-3 lg:text-3xl"
          lines={["AI Sports", "Predictions"]}
          delay={1.35}
        />
        <MaskLines
          as="p"
          className="hidden text-sm leading-relaxed text-l2 lg:col-span-2 lg:col-start-5 lg:block"
          lines={["Calibrated confidence.", "Built for game day."]}
          delay={1.5}
        />
        <motion.p
          className="col-span-12 max-w-md text-[15px] leading-relaxed text-l2 lg:col-span-4 lg:col-start-9"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.6 }}
        >
          Clutch Picks is the AI sports companion for iOS —{" "}
          <span className="text-l1">live scores</span>,{" "}
          <span className="text-l1">projections</span> and{" "}
          <span className="text-l1">confidence-rated picks</span> across 11
          leagues, from an engine that never inflates its edge.
        </motion.p>
      </div>

      {/* Floating logo — anchored right on desktop, centered on mobile */}
      <div className="pointer-events-none col-span-12 flex justify-center lg:absolute lg:right-[7vw] lg:top-1/2 lg:-translate-y-1/2 lg:justify-end">
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
          delay={1.45}
        />
        <LeagueTicker />
      </div>
    </section>
  );
}
