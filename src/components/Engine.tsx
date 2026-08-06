"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { CONFIDENCE_TIERS } from "@/lib/site";
import { Eyebrow, Fade, MaskLines } from "./Reveal";

const RULES = [
  "No inflated confidence",
  "No fabricated data — ever",
  "Picks lock before tip-off",
  "When data is thin, we say so",
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
            className="font-serif text-[17px] font-semibold italic"
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
          <span className="text-right font-led text-base text-l3 tabular">
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
      className="grid w-full grid-cols-12 gap-y-14 px-4 py-20 lg:px-14 lg:py-28"
    >
      <Eyebrow
        index="03"
        title="The Engine Room"
        meta="50,000 runs per game · every league, every day"
      />

      {/* Statement — the manifesto lives here now, where the proof is */}
      <div className="col-span-12 lg:col-span-5">
        <MaskLines
          as="h2"
          className="glow-serif-strong font-serif text-[7.2svw] font-semibold leading-[1.12] tracking-tight sm:text-3xl lg:text-[2.9svw]"
          lines={[
            "Every matchup runs through",
            "50,000 simulations before",
            "a pick reaches your screen.",
          ]}
          stagger={0.12}
        />
        <MaskLines
          as="p"
          className="mt-5 font-serif text-[5.4svw] font-medium italic leading-[1.18] text-l3 sm:text-2xl lg:text-[2.1svw]"
          lines={[
            "No inflated confidence. No fabricated",
            "data. When the model isn't sure —",
            "it tells you.",
          ]}
          stagger={0.12}
          delay={0.15}
        />
        <Fade delay={0.25}>
          <p className="mt-7 max-w-md font-serif text-[17px] leading-relaxed text-l2">
            Every pick carries a{" "}
            <span className="text-l1">confidence rating that means what it
            says</span>. When the numbers are strong, you&apos;ll know — and
            when they aren&apos;t, Clutch tells you that too, instead of
            pretending. <span className="italic text-l1">No hype. No hedging.</span>
          </p>
        </Fade>

        {/* Ground rules */}
        <Fade delay={0.3}>
          <p className="mb-3 mt-9 font-led text-base tracking-[0.1em] text-l4">
            HOUSE RULES — HONEST BY DESIGN
          </p>
          <ul className="grid grid-cols-1 gap-2.5 font-led text-base tracking-[0.06em] text-l3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {RULES.map((rule) => (
              <li key={rule} className="flex gap-2.5">
                <span className="text-teal">—</span>
                {rule.toUpperCase()}
              </li>
            ))}
          </ul>
        </Fade>
      </div>

      {/* Ladder */}
      <div className="col-span-12 flex flex-col gap-10 lg:col-span-6 lg:col-start-7">
        <Fade>
          <p className="mb-4 font-led text-base tracking-[0.08em] text-l4">
            CONFIDENCE TIERS — STRAIGHT FROM THE APP
          </p>
          <Ladder />
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
            <span className="glow-serif font-serif text-5xl font-semibold tracking-tight lg:text-6xl">
              {stat.value}
            </span>
            <span className="font-led text-base tracking-[0.08em] text-l3">
              {stat.label.toUpperCase()}
            </span>
          </Fade>
        ))}
      </div>
    </section>
  );
}
