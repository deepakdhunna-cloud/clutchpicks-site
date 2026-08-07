"use client";

import { motion } from "framer-motion";
import { AppStoreButton, CountUp, EASE, Eyebrow, LivePill, PhoneFrame } from "./ui";

const heroStats = [
  { value: <CountUp to={11} />, label: "Leagues" },
  { value: <CountUp to={20} suffix="+" />, label: "Signals per matchup" },
  { value: "24/7", label: "Live updates" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-14 pt-32 sm:pt-36 lg:pb-20">
      <div className="hero-floor" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ---------------- Copy ---------------- */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="flex flex-wrap items-center gap-2.5"
          >
            <Eyebrow>Free on the App Store</Eyebrow>
            <LivePill label="Live now" />
          </motion.div>

          <h1
            className="scoreboard-type display-hero mt-6 text-white"
            aria-label="Live sports intelligence"
          >
            {["LIVE SPORTS", "INTELLIGENCE"].map((line, i) => (
              <span key={line} aria-hidden="true" className="block overflow-hidden">
                <motion.span
                  initial={{ y: "108%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.12 + i * 0.1, ease: EASE }}
                  className={`block ${i === 1 ? "text-electric" : ""}`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
            className="duo-underline mt-6 w-36 origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            className="mt-7 max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8"
          >
            Clutch Picks turns today&apos;s slate into one command center — live
            scores, matchup context, confidence-rated picks, and your own
            analyst card across 11 leagues.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62, ease: EASE }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <AppStoreButton />
            <a
              href="#live"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.04] px-6 text-sm font-bold text-white transition hover:border-[var(--color-electric)]/50 hover:bg-[var(--color-electric)]/10"
            >
              Explore the app
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </a>
          </motion.div>

          {/* stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.76, ease: EASE }}
            className="mt-10 grid max-w-lg grid-cols-3 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]"
          >
            {heroStats.map((stat, i) => (
              <div
                key={stat.label}
                className={`px-4 py-4 ${i > 0 ? "border-l border-white/[0.07]" : ""}`}
              >
                <div className="scoreboard-type tnum text-3xl text-white sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white/55">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ---------------- Phone cluster ---------------- */}
        <div className="relative mx-auto h-[440px] w-full max-w-[560px] sm:h-[540px] lg:h-[620px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 0.95, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            className="absolute left-0 top-[13%] z-10 w-[36%] max-w-[190px] -rotate-6"
          >
            <PhoneFrame src="/screenshots/best-pick-per-sport.jpg" alt="Best pick per sport screen in Clutch Picks" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 0.95, y: 0 }}
            transition={{ duration: 0.8, delay: 0.68, ease: EASE }}
            className="absolute right-0 top-[18%] z-10 w-[36%] max-w-[190px] rotate-6"
          >
            <PhoneFrame src="/screenshots/your-arena.jpg" alt="My Arena board in Clutch Picks" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 44, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            className="absolute left-1/2 top-0 z-20 w-[46%] max-w-[250px] -translate-x-1/2"
          >
            <PhoneFrame
              src="/screenshots/track-game-edge.jpg"
              alt="Live game detail with win probability in Clutch Picks"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
