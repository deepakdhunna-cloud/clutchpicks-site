"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { CONFIDENCE_TIERS } from "@/lib/site";
import { Eyebrow, Fade, MaskLines, useDesktop, useReducedSafe } from "./Reveal";

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

const STATS = [
  { value: <CountUp target={50000} />, label: "SIMULATIONS PER GAME" },
  { value: <CountUp target={11} />, label: "LEAGUES COVERED" },
  { value: <CountUp target={20} />, label: "FACTORS PER GAME" },
  { value: <span>24/7</span>, label: "LIVE UPDATES" },
];

/* ---- pinned gauge-wall scene (desktop) ---- */

function MeterBar({
  p,
  tier,
  index,
}: {
  p: MotionValue<number>;
  tier: (typeof CONFIDENCE_TIERS)[number];
  index: number;
}) {
  const a = 0.36 + index * 0.075;
  const b = a + 0.09;
  const fromLeft = index % 2 === 0;
  const x = useTransform(p, [a, b], [fromLeft ? "-70vw" : "70vw", "0vw"]);
  const opacity = useTransform(p, [a, b], [0, 1]);
  const fill = useTransform(p, [a + 0.03, b + 0.05], [0, tier.width / 100]);

  return (
    <motion.div
      style={{ x, opacity }}
      className="grid grid-cols-[9.5rem_1fr_5.5rem] items-center gap-6 px-[6vw] will-change-transform lg:grid-cols-[13rem_1fr_7rem]"
    >
      <span
        className="text-right font-serif text-[1.9vw] font-semibold italic leading-none"
        style={{ color: tier.color }}
      >
        {tier.label}
      </span>
      <div className="h-[6.2svh] overflow-hidden rounded-sm bg-white/[0.045]">
        <motion.div
          className="h-full origin-left rounded-sm"
          style={{
            scaleX: fill,
            backgroundColor: tier.color,
            boxShadow: `0 0 34px ${tier.color}55`,
          }}
        />
      </div>
      <span className="font-led text-xl text-l3 tabular">{tier.range}</span>
    </motion.div>
  );
}

function EngineScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const stOpacity = useTransform(p, [0.02, 0.1, 0.24, 0.33], [0, 1, 1, 0]);
  const stScale = useTransform(p, [0.02, 0.12, 0.24, 0.33], [0.94, 1, 1, 0.6]);
  const stY = useTransform(p, [0.24, 0.33], ["0svh", "-26svh"]);

  const [statsOn, setStatsOn] = useState(false);
  useMotionValueEvent(p, "change", (v) => setStatsOn(v > 0.72));

  const wallOpacity = useTransform(p, [0.33, 0.38], [0, 1]);
  const rulesOpacity = useTransform(p, [0.8, 0.88], [0, 1]);

  return (
    <section ref={ref} id="engine" className="relative h-[340svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* eyebrow pinned top */}
        <div className="absolute inset-x-0 top-[9svh] grid grid-cols-12 px-14">
          <Eyebrow
            index="03"
            title="The Engine Room"
            meta="50,000 runs per game · every league, every day"
          />
        </div>

        {/* the manifesto assembles center stage, then lifts away */}
        <motion.div
          style={{ opacity: stOpacity, scale: stScale, y: stY }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center will-change-transform"
        >
          <MaskLines
            as="h2"
            className="glow-serif-strong font-serif text-[4vw] font-semibold leading-[1.1] tracking-tight"
            lines={[
              "Every matchup runs through",
              "50,000 simulations before",
              "a pick reaches your screen.",
            ]}
            stagger={0.12}
            once={false}
          />
          <MaskLines
            as="p"
            className="mt-6 font-serif text-[2.1vw] font-medium italic leading-[1.2] text-l3"
            lines={[
              "No inflated confidence. No fabricated data.",
              "When the model isn't sure — it tells you.",
            ]}
            stagger={0.12}
            delay={0.15}
            once={false}
          />
        </motion.div>

        {/* the gauge wall */}
        <motion.div
          style={{ opacity: wallOpacity }}
          className="absolute inset-x-0 bottom-[17svh] top-[26svh] flex flex-col justify-center gap-[2svh]"
        >
          <p className="px-[6vw] font-led text-lg tracking-[0.1em] text-l4">
            CONFIDENCE READOUT — STRAIGHT FROM THE APP
          </p>
          {CONFIDENCE_TIERS.map((tier, i) => (
            <MeterBar key={tier.label} p={p} tier={tier} index={i} />
          ))}
        </motion.div>

        {/* stats slam into the corners */}
        {statsOn && (
          <>
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 2, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: i * 0.09, ease: EASE_OUT }}
                className={`absolute flex flex-col gap-1 ${
                  i === 0
                    ? "left-[5vw] top-[20svh]"
                    : i === 1
                      ? "right-[5vw] top-[20svh] items-end"
                      : i === 2
                        ? "bottom-[8svh] left-[5vw]"
                        : "bottom-[8svh] right-[5vw] items-end"
                }`}
              >
                <span className="glow-serif font-serif text-5xl font-semibold tracking-tight">
                  {s.value}
                </span>
                <span className="font-led text-base tracking-[0.08em] text-l3">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </>
        )}

        {/* house rules ticker line */}
        <motion.p
          style={{ opacity: rulesOpacity }}
          className="absolute inset-x-0 bottom-[3svh] text-center font-led text-base tracking-[0.1em] text-l4"
        >
          HOUSE RULES — {RULES.map((r) => r.toUpperCase()).join(" — ")}
        </motion.p>
      </div>
    </section>
  );
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ---- stacked fallback (phones / reduced motion) ---- */

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

function EngineStacked() {
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
        <Fade delay={0.3}>
          <p className="mb-3 mt-9 font-led text-base tracking-[0.1em] text-l4">
            HOUSE RULES — HONEST BY DESIGN
          </p>
          <ul className="grid grid-cols-1 gap-2.5 font-led text-base tracking-[0.06em] text-l3 sm:grid-cols-2">
            {RULES.map((rule) => (
              <li key={rule} className="flex gap-2.5">
                <span className="text-teal">—</span>
                {rule.toUpperCase()}
              </li>
            ))}
          </ul>
        </Fade>
      </div>

      <div className="col-span-12 flex flex-col gap-10 lg:col-span-6 lg:col-start-7">
        <Fade>
          <p className="mb-4 font-led text-base tracking-[0.08em] text-l4">
            CONFIDENCE TIERS — STRAIGHT FROM THE APP
          </p>
          <Ladder />
        </Fade>
      </div>

      <div className="col-span-12 mt-6 grid grid-cols-2 gap-y-10 border-t border-line pt-10 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Fade key={stat.label} delay={i * 0.06} className="flex flex-col gap-2">
            <span className="glow-serif font-serif text-5xl font-semibold tracking-tight lg:text-6xl">
              {stat.value}
            </span>
            <span className="font-led text-base tracking-[0.08em] text-l3">
              {stat.label}
            </span>
          </Fade>
        ))}
      </div>
    </section>
  );
}

/** The engine room — proof of work, staged as a gauge wall. */
export default function Engine() {
  const desktop = useDesktop();
  const reduced = useReducedSafe();

  if (!(desktop && !reduced)) return <EngineStacked />;

  return (
    <>
      <EngineScene />
      {/* footnote — the reading copy that doesn't belong on the wall */}
      <div className="grid w-full grid-cols-12 px-14 pb-20">
        <Fade className="col-span-6 col-start-4">
          <p className="text-center font-serif text-[17px] leading-relaxed text-l2">
            Every pick carries a{" "}
            <span className="text-l1">confidence rating that means what it
            says</span>. When the numbers are strong, you&apos;ll know — and
            when they aren&apos;t, Clutch tells you that too, instead of
            pretending. <span className="italic text-l1">No hype. No hedging.</span>
          </p>
        </Fade>
      </div>
    </>
  );
}
