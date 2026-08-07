"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CountUp, EASE, FadeUp, PhoneFrame, SectionHeading } from "./ui";

// W/L streak like the app's "last 20 predictions"
const streak = "WWLWWWLWWWLWWWWLWWWW".split("");

const calls = [
  { sport: "NBA", line: "OKC vs SA", result: "Win", note: "Called the 114–109 close. Smart, clean execution." },
  { sport: "MLB", line: "LAD vs NYM", result: "Win", note: "High-value edge on the home side held late." },
  { sport: "Tennis", line: "Wang vs Koizumi", result: "Win", note: "Momentum read flipped the in-progress match." },
];

export default function AnalystProof() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-110px" });

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* phone */}
          <FadeUp className="relative order-2 mx-auto w-full max-w-[300px] lg:order-1">
            <PhoneFrame
              src="/screenshots/analyst-card.jpg"
              alt="Analyst card profile in Clutch Picks"
            />
          </FadeUp>

          {/* content */}
          <div className="order-1 lg:order-2" ref={ref}>
            <SectionHeading
              eyebrow="Your record"
              title="Track it"
              accent="like an analyst."
              className="max-w-xl"
            />

            {/* accuracy + streak card */}
            <FadeUp delay={0.12}>
              <div className="card mt-8 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="scoreboard-type text-xs uppercase tracking-[0.16em] text-white/55">
                      Accuracy
                    </div>
                    <div className="mt-1 flex items-end gap-2">
                      <span className="scoreboard-type text-electric text-6xl">
                        <CountUp to={72} suffix="%" />
                      </span>
                      <span className="mb-2 text-sm font-bold text-[var(--color-green)]">
                        +6% this week
                      </span>
                    </div>
                  </div>
                  <span className="rounded-full border border-[var(--color-electric)]/30 bg-[var(--color-electric)]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[var(--color-electric)]">
                    Verified
                  </span>
                </div>

                {/* streak */}
                <div className="mt-5 flex flex-wrap gap-1" aria-label="Last 20 predictions: 16 wins, 4 losses">
                  {streak.map((r, i) => (
                    <motion.span
                      key={i}
                      aria-hidden="true"
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.02, ease: EASE }}
                      className={`flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-black ${
                        r === "W"
                          ? "bg-[var(--color-electric)]/18 text-[var(--color-electric)]"
                          : "bg-[var(--color-red-bright)]/18 text-[var(--color-red-bright)]"
                      }`}
                    >
                      {r}
                    </motion.span>
                  ))}
                </div>
                <div className="mt-3 text-xs text-white/50">Last 20 predictions · 84 all-time</div>
              </div>
            </FadeUp>

            {/* signature calls */}
            <div className="mt-4 space-y-3">
              {calls.map((c, i) => (
                <FadeUp key={c.line} delay={0.2 + i * 0.08}>
                  <div className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
                    <span className="rounded-md bg-white/[0.06] px-2 py-1 text-[10px] font-black tracking-[0.1em] text-white/65">
                      {c.sport}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{c.line}</span>
                        <span className="rounded-full border border-[var(--color-green)]/35 bg-[var(--color-green)]/12 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.1em] text-[var(--color-green)]">
                          {c.result}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-xs text-white/55">{c.note}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
