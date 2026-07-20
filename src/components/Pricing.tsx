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
    <ul className="flex flex-col gap-2.5 font-mono text-[13px] leading-relaxed text-l2">
      {items.map((f) => (
        <li key={f} className="flex gap-2.5">
          <span className={accent ? "text-pro" : "text-teal"}>+</span>
          {f}
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
          className="font-sans text-[10svw] font-black uppercase leading-[0.94] font-wide lg:text-[4.6svw]"
          lines={[
            "Start free.",
            <span key="pro" className="text-teal">
              Go Pro.
            </span>,
          ]}
        />
      </div>

      {/* Free card */}
      <Fade className="col-span-12 lg:col-span-5" y={24}>
        <div className="flex h-full flex-col rounded-2xl border border-line bg-white/[0.02] p-6 lg:p-8">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-l3">
            Free forever
          </span>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-sans text-6xl font-black font-wide lg:text-7xl">
              $0
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-l4">
              No credit card
            </span>
          </div>
          <div className="my-7 h-px bg-line" />
          <FeatureList items={FREE_FEATURES} />
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="dotted-hover mt-8 inline-flex w-fit items-center p-3 font-mono text-[13px] uppercase tracking-[0.14em] text-l1"
          >
            Download free ↓
          </a>
        </div>
      </Fade>

      {/* Pro card */}
      <Fade className="col-span-12 lg:col-span-6 lg:col-start-7" y={24} delay={0.08}>
        <div
          className="relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 lg:p-8"
          style={{
            borderColor: "rgba(122,157,184,0.3)",
            background:
              "linear-gradient(160deg, rgba(122,157,184,0.08) 0%, rgba(255,255,255,0.02) 45%, rgba(139,10,31,0.06) 100%)",
          }}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-pro">
              Clutch Pro
            </span>
            <span
              className="rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-pro"
              style={{
                borderColor: "rgba(180,211,235,0.28)",
                backgroundColor: "rgba(122,157,184,0.12)",
              }}
            >
              3-day free trial
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-sans text-6xl font-black font-wide lg:text-7xl">
              $6.99
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-l4">
              / month
            </span>
          </div>
          <div className="my-7 h-px bg-line" />
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-l3">
            Everything in Free, plus:
          </p>
          <FeatureList items={PRO_FEATURES} accent />
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-teal px-7 py-3.5 font-sans text-[15px] font-bold uppercase tracking-wide text-[#04121A] transition-all duration-300 font-wide-110 hover:brightness-110 active:scale-[0.97]"
          >
            Start 3-day free trial
          </a>
        </div>
      </Fade>

      {/* Paywall stats + disclosures */}
      <Fade className="col-span-12 flex flex-col gap-3 border-t border-line pt-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-l3">
          11 leagues · 20 factors · 24/7 updates — every game, every league,
          every AI prediction.
        </p>
        <p className="max-w-3xl font-mono text-[11px] leading-relaxed uppercase tracking-[0.08em] text-l4">
          Eligible users receive a 3-day free trial, then $6.99/month. App
          Store confirms final terms before purchase. Auto-renews unless
          canceled at least 24 hours before the end of the period — cancel in
          Settings › Subscriptions. Family Sharing enabled.
        </p>
      </Fade>
    </section>
  );
}
