"use client";

import { motion } from "framer-motion";
import { LEAGUES } from "@/lib/site";
import { MaskLines } from "./Reveal";
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
        {/* fat foam index finger */}
        <rect x="3.4" y="0.5" width="7.2" height="14" rx="3.6" fill="currentColor" />
        {/* mitt */}
        <rect x="2" y="10" width="18" height="13.5" rx="5.2" fill="currentColor" />
        {/* thumb bump */}
        <rect x="17.2" y="8.2" width="4.3" height="9" rx="2.15" fill="currentColor" />
        {/* maroon wrist band */}
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
      className="relative mt-10 overflow-hidden lg:mt-12"
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

export default function Hero() {
  return (
    <section
      id="top"
      className="hero-pad relative flex min-h-svh w-full flex-col px-4 pb-10 lg:px-14 lg:pb-14"
    >
      {/* The broadcast rig — bottom of the tube on mobile, right wing on desktop */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[4svh] top-[57svh] lg:inset-y-0 lg:left-[44%] lg:right-[-3%] lg:bottom-0">
        <CrtRig className="h-full w-full" />
      </div>

      {/* Meta — one quiet cluster, top-left */}
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

      {/* Glowing display statement — left wing */}
      <div className="relative z-10 flex flex-1 flex-col justify-start pt-[7svh] lg:max-w-[56%] lg:justify-center lg:pt-0">
        <MaskLines
          as="h1"
          className="glow-serif-strong animate-glow-breathe font-serif text-[11.5svw] font-semibold leading-[1.02] tracking-tight sm:text-[9svw] lg:text-[5.6svw]"
          lines={[
            "Every Pick,",
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
          Scroll for Tonight&apos;s Board
          <span className="flex items-center gap-1.5 text-l1">
            <FoamFinger />
            <FoamFinger delay={0.18} />
          </span>
        </motion.p>
      </div>

      {/* Ticker rides the bottom edge */}
      <div className="relative z-10">
        <LeagueTicker />
      </div>
    </section>
  );
}
