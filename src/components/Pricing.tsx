"use client";

import { motion } from "framer-motion";
import { APP_STORE_URL } from "@/lib/site";
import { Eyebrow, Fade, MaskLines, useReducedSafe } from "./Reveal";

const FREE_FEATURES = [
  "Live scores across supported competitions",
  "Schedules & full box scores",
  "Where to watch — TV & streaming",
  "Pick making & pick history",
  "My Arena game following",
  "Notifications, 7 categories",
];

const PRO_FEATURES = [
  "Daily Model Board — ranked picks",
  "AI predictions & confidence tiers",
  "Score & outcome projections",
  "Full matchup and model context",
  "Live intelligence in My Arena",
  "Postgame review & season trends",
];

const SPRING = { type: "spring", stiffness: 130, damping: 17 } as const;

function FeatureList({
  items,
  accent = false,
}: {
  items: string[];
  accent?: boolean;
}) {
  return (
    <ul className="flex flex-col gap-2.5 font-led text-lg leading-snug text-l2">
      {items.map((f) => (
        <li key={f} className="flex gap-2.5">
          <span className={accent ? "text-pro" : "text-teal"}>+</span>
          {f.toUpperCase()}
        </li>
      ))}
    </ul>
  );
}

function FreeCard() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-[#070a0f]/95 p-6 shadow-[0_30px_70px_rgba(0,0,0,0.6)] lg:p-8">
      <div className="flex items-center justify-between">
        <span className="font-led text-base tracking-[0.14em] text-l3">
          FREE FOREVER
        </span>
        <span className="font-led text-sm tracking-[0.1em] text-l4">
          HOME TEAM
        </span>
      </div>
      <div className="mt-4 flex items-baseline gap-3">
        <span className="glow-serif font-serif text-6xl font-semibold tracking-tight lg:text-7xl">
          $0
        </span>
        <span className="font-led text-base tracking-[0.1em] text-l4">
          NO CREDIT CARD
        </span>
      </div>
      <div className="my-7 h-px bg-line" />
      <FeatureList items={FREE_FEATURES} />
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="retro-link mt-8 inline-flex w-fit items-center gap-2 py-2 font-serif text-lg text-l1"
      >
        Download Free
      </a>
    </div>
  );
}

function ProCard() {
  return (
    <div
      className="relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 shadow-[0_0_80px_rgba(122,157,184,0.14)] lg:p-8"
      style={{
        borderColor: "rgba(122,157,184,0.35)",
        background:
          "linear-gradient(160deg, rgba(122,157,184,0.1) 0%, rgba(7,10,15,0.96) 45%, rgba(139,10,31,0.1) 100%)",
      }}
    >
      <div className="flex items-center justify-between">
        <span className="glow-ice font-serif text-lg font-semibold italic">
          Clutch Pro
        </span>
        <span
          className="rounded-full border px-3 py-1 font-led text-sm tracking-[0.1em] text-pro"
          style={{
            borderColor: "rgba(180,211,235,0.28)",
            backgroundColor: "rgba(122,157,184,0.12)",
          }}
        >
          3-DAY FREE TRIAL
        </span>
      </div>
      <div className="mt-4 flex items-baseline gap-3">
        <span className="glow-serif font-serif text-6xl font-semibold tracking-tight lg:text-7xl">
          $6.99
        </span>
        <span className="font-led text-base tracking-[0.1em] text-l4">
          / MONTH
        </span>
      </div>
      <div className="my-7 h-px bg-line" />
      <p className="mb-4 font-led text-base tracking-[0.1em] text-l3">
        EVERYTHING IN FREE, PLUS:
      </p>
      <FeatureList items={PRO_FEATURES} accent />
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-cream px-8 py-3.5 font-serif text-lg font-semibold italic text-[#10130f] shadow-[0_0_40px_rgba(252,249,243,0.25)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(252,249,243,0.4)] hover:brightness-105 active:scale-[0.97]"
      >
        Start 3-Day Free Trial
      </a>
    </div>
  );
}

/** The matchup — Free vs Pro staged as tonight's game card. */
export default function Pricing() {
  const reduced = useReducedSafe();

  return (
    <section
      id="pricing"
      className="w-full overflow-x-clip px-4 py-20 lg:px-14 lg:py-28"
    >
      <div className="grid w-full grid-cols-12">
        <Eyebrow index="05" title="The Matchup" meta="Free forever · Pro when ready" />
      </div>

      {/* scoreboard header */}
      <div className="text-center">
        <Fade>
          <p className="font-led text-lg tracking-[0.18em] text-l3">
            TONIGHT&apos;S MATCHUP
          </p>
        </Fade>
        <MaskLines
          as="h2"
          className="glow-serif-strong mt-3 font-serif text-[10svw] font-semibold leading-[1.04] tracking-tight lg:text-[4.2svw]"
          lines={[
            <span key="line">
              Start Free. <span className="glow-ice italic">Go Pro.</span>
            </span>,
          ]}
        />
      </div>

      {/* the collision */}
      <div className="relative mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-0">
        <motion.div
          initial={
            reduced ? { opacity: 0 } : { opacity: 0, x: -170, rotate: -9 }
          }
          whileInView={
            reduced ? { opacity: 1 } : { opacity: 1, x: 0, rotate: -2.6 }
          }
          viewport={{ once: true, margin: "-18% 0px" }}
          transition={SPRING}
          className="will-change-transform lg:mr-[-22px] lg:mt-6"
        >
          <FreeCard />
        </motion.div>

        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, x: 170, rotate: 9 }}
          whileInView={
            reduced ? { opacity: 1 } : { opacity: 1, x: 0, rotate: 2.6 }
          }
          viewport={{ once: true, margin: "-18% 0px" }}
          transition={{ ...SPRING, delay: 0.08 }}
          className="relative z-[1] will-change-transform lg:ml-[-22px]"
        >
          <ProCard />
        </motion.div>

        {/* the VS stamp */}
        <motion.div
          initial={
            reduced
              ? { opacity: 0 }
              : { opacity: 0, scale: 0, rotate: -14 }
          }
          whileInView={
            reduced ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: -6 }
          }
          viewport={{ once: true, margin: "-18% 0px" }}
          transition={{ ...SPRING, delay: 0.26 }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
        >
          <span
            className="flex h-28 w-28 items-center justify-center rounded-full border-2 font-serif text-5xl font-semibold italic"
            style={{
              color: "#eef4fa",
              borderColor: "rgba(210,86,104,0.65)",
              background: "rgba(4,6,10,0.92)",
              boxShadow:
                "0 0 44px rgba(210,86,104,0.3), 0 0 90px rgba(122,157,184,0.2), inset 0 0 30px rgba(210,86,104,0.12)",
              textShadow: "0 0 18px rgba(238,244,250,0.5)",
            }}
          >
            VS
          </span>
        </motion.div>
      </div>

      {/* projected outcome + disclosures */}
      <Fade className="mx-auto mt-12 flex max-w-4xl flex-col gap-3 border-t border-line pt-8 text-center">
        <p className="font-led text-base tracking-[0.1em] text-l3">
          PROJECTED OUTCOME — PRO BY A MILE · CANCEL ANYTIME
        </p>
        <p className="font-led text-base tracking-[0.08em] text-l4">
          LIVE SCORES · MODEL CONTEXT · PERSONAL PICK TRACKING — WITH HONEST
          UNAVAILABLE AND NO-PICK STATES WHEN VERIFIED DATA IS INSUFFICIENT.
        </p>
        <p className="mx-auto max-w-3xl font-mono text-[10px] uppercase leading-relaxed tracking-[0.08em] text-l3">
          Eligible users receive a 3-day free trial, then $6.99/month. App
          Store confirms final terms before purchase. Auto-renews unless
          canceled at least 24 hours before the end of the period — cancel in
          Settings › Subscriptions. Family Sharing enabled.
        </p>
      </Fade>
    </section>
  );
}
