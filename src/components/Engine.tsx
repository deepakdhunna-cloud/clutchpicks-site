"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { CONFIDENCE_TIERS } from "@/lib/site";
import { Eyebrow, Fade, MaskLines } from "./Reveal";

const PIPELINE = [
  "Factors",
  "Rating Delta",
  "50K Simulations",
  "Probability + Scores",
  "Market Calibration",
  "Confidence Cap",
];

const RULES = [
  "No confidence floor above 50%",
  "No sigmoid scaling multipliers",
  "No fabricated data — ever",
  "Missing data lowers confidence",
  "Predictions lock before tip-off",
  "Market can calibrate, never override",
];

function CountUp({
  target,
  format = (n: number) => Math.round(n).toLocaleString("en-US"),
}: {
  target: number;
  format?: (n: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(target);
      return;
    }
    const start = performance.now();
    const dur = 1400;
    let frame: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(target * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, reduced]);

  return (
    <span ref={ref} className="tabular">
      {format(value)}
    </span>
  );
}

function Ladder() {
  return (
    <div className="flex flex-col">
      {CONFIDENCE_TIERS.map((tier, i) => (
        <div
          key={tier.label}
          className="grid grid-cols-[7.5rem_1fr_4.5rem] items-center gap-4 border-t border-line py-4 last:border-b sm:grid-cols-[9rem_1fr_5.5rem]"
        >
          <span
            className="text-[15px] font-bold"
            style={{ color: tier.color }}
          >
            {tier.label}
          </span>
          <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
            <motion.div
              className="h-full origin-left rounded-full"
              style={{ backgroundColor: `${tier.color}B3` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: tier.width / 100 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15 + i * 0.08,
              }}
            />
          </div>
          <span className="text-right font-mono text-xs text-l3 tabular">
            {tier.range}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Engine() {
  return (
    <section
      id="engine"
      className="grid w-full grid-cols-12 gap-y-14 px-4 py-24 lg:px-14 lg:py-32"
    >
      <Eyebrow
        index="02"
        title="The Engine"
        meta="v3.0 Unified Simulation Architecture"
      />

      {/* Statement */}
      <div className="col-span-12 lg:col-span-5">
        <MaskLines
          as="h2"
          className="font-sans text-[10svw] font-black uppercase leading-[0.94] font-wide lg:text-[4.6svw]"
          lines={["Honest", "by design"]}
        />
        <Fade delay={0.2}>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-l2">
            Win probability and projected scores come from the{" "}
            <span className="text-l1">same simulation pass</span> — so the
            number and the score line always agree. Confidence is the model&apos;s
            true probability, and missing data{" "}
            <span className="text-l1">reduces</span> it. The engine knows what
            it doesn&apos;t know.
          </p>
        </Fade>

        {/* Ground rules */}
        <Fade delay={0.3}>
          <ul className="mt-8 grid grid-cols-1 gap-2 font-mono text-xs uppercase tracking-[0.1em] text-l3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {RULES.map((rule) => (
              <li key={rule} className="flex gap-2">
                <span className="text-teal">—</span>
                {rule}
              </li>
            ))}
          </ul>
        </Fade>
      </div>

      {/* Ladder + pipeline */}
      <div className="col-span-12 flex flex-col gap-10 lg:col-span-6 lg:col-start-7">
        <Fade>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-l4">
            Confidence tiers — straight from the app
          </p>
          <Ladder />
        </Fade>

        <Fade delay={0.1}>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-l4">
            Every game, one pipeline
          </p>
          <div className="flex flex-wrap items-center gap-y-3 font-mono text-xs uppercase tracking-[0.08em]">
            {PIPELINE.map((step, i) => (
              <span key={step} className="flex items-center">
                <span className="border border-line px-2.5 py-1.5 text-l2">
                  {step}
                </span>
                {i < PIPELINE.length - 1 && (
                  <span className="px-1.5 text-l4">→</span>
                )}
              </span>
            ))}
          </div>
        </Fade>
      </div>

      {/* Stats bar */}
      <div className="col-span-12 mt-6 grid grid-cols-2 gap-y-10 border-t border-line pt-10 lg:grid-cols-4">
        {[
          { value: <CountUp target={50000} />, label: "Simulations per game" },
          { value: <CountUp target={11} />, label: "Leagues covered" },
          { value: <CountUp target={20} />, label: "Factors per game" },
          { value: <span>24/7</span>, label: "Live updates" },
        ].map((stat, i) => (
          <Fade key={stat.label} delay={i * 0.06} className="flex flex-col gap-2">
            <span className="font-sans text-5xl font-black font-wide lg:text-6xl">
              {stat.value}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-l3">
              {stat.label}
            </span>
          </Fade>
        ))}
      </div>

      {/* Data sources */}
      <Fade className="col-span-12">
        <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-l3">
          Data — ESPN · MLB StatsAPI · stats.nba.com · FBref &amp; Understat xG
          · UmpScorecards · Open-Meteo weather · SharpAPI market consensus ·
          SportsDataIO — verified feeds only, never mock data
        </p>
      </Fade>
    </section>
  );
}
