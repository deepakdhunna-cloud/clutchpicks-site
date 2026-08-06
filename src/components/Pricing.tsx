"use client";

import { APP_STORE_URL } from "@/lib/site";
import { Eyebrow, Fade, MaskLines } from "./Reveal";

const FREE_FEATURES = [
  "Live scores across 11 leagues",
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
  "Full matchup reads — 20 factors",
  "Live intelligence in My Arena",
  "Postgame review & season trends",
];

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

/** Free vs Clutch Pro — pricing from the app's paywall config ($6.99/mo, 3-day trial). */
export default function Pricing() {
  return (
    <section
      id="pricing"
      className="grid w-full grid-cols-12 gap-x-6 gap-y-12 px-4 py-24 lg:px-14 lg:py-32"
    >
      <Eyebrow index="04" title="Pricing" meta="Free forever · Pro when ready" />

      <div className="col-span-12">
        <MaskLines
          as="h2"
          className="glow-serif-strong font-serif text-[10svw] font-semibold leading-[1.04] tracking-tight lg:text-[4.4svw]"
          lines={[
            "Start Free.",
            <span key="pro" className="glow-ice italic">
              Go Pro.
            </span>,
          ]}
        />
      </div>

      {/* Free card */}
      <Fade className="col-span-12 lg:col-span-5" y={24}>
        <div className="flex h-full flex-col rounded-2xl border border-line bg-white/[0.02] p-6 lg:p-8">
          <span className="font-led text-base tracking-[0.14em] text-l3">
            FREE FOREVER
          </span>
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
      </Fade>

      {/* Pro card */}
      <Fade
        className="col-span-12 lg:col-span-6 lg:col-start-7"
        y={24}
        delay={0.08}
      >
        <div
          className="relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 shadow-[0_0_80px_rgba(122,157,184,0.09)] lg:p-8"
          style={{
            borderColor: "rgba(122,157,184,0.3)",
            background:
              "linear-gradient(160deg, rgba(122,157,184,0.08) 0%, rgba(255,255,255,0.02) 45%, rgba(139,10,31,0.06) 100%)",
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
      </Fade>

      {/* Paywall stats + disclosures */}
      <Fade className="col-span-12 flex flex-col gap-3 border-t border-line pt-8">
        <p className="font-led text-base tracking-[0.08em] text-l3">
          11 LEAGUES · 20 FACTORS · 24/7 UPDATES — EVERY GAME, EVERY LEAGUE,
          EVERY AI PREDICTION.
        </p>
        <p className="max-w-3xl font-mono text-[11px] leading-relaxed uppercase tracking-[0.08em] text-l3">
          Eligible users receive a 3-day free trial, then $6.99/month. App
          Store confirms final terms before purchase. Auto-renews unless
          canceled at least 24 hours before the end of the period — cancel in
          Settings › Subscriptions. Family Sharing enabled.
        </p>
      </Fade>
    </section>
  );
}
