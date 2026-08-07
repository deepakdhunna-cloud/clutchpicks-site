"use client";

import { AppStoreButton, FadeUp, SectionHeading } from "./ui";

const freeFeatures = [
  "Live scores across 11 leagues",
  "Daily schedules and game states",
  "Broadcast and streaming context",
  "Pick creation and personal tracking",
  "My Arena followed-game board",
  "Analyst card basics",
];

const proFeatures = [
  "Confidence-rated AI picks",
  "Projection center and pick strength",
  "20-factor matchup context",
  "Prep Mode slate ranking",
  "Full pick history access",
  "Live intelligence feed context",
];

function CheckIcon({ color = "var(--color-electric)" }: { color?: string }) {
  return (
    <svg
      className="mt-0.5 h-5 w-5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Start free."
          accent="Go Pro when ready."
          kicker="Follow the board for free. Upgrade when you want the full AI read behind the slate."
          align="center"
          className="max-w-3xl"
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 lg:grid-cols-2">
          {/* FREE */}
          <FadeUp delay={0.05}>
            <div className="card h-full p-6 sm:p-8">
              <div className="scoreboard-type text-xl text-white">FREE</div>
              <div className="mt-5 flex items-end gap-2">
                <span className="scoreboard-type tnum text-7xl leading-none text-white">$0</span>
                <span className="pb-2 text-white/55">forever</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-white/62">
                Everything needed to follow games, make picks, and build a daily rhythm.
              </p>
              <ul className="mt-8 space-y-4">
                {freeFeatures.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-white/70">
                    <CheckIcon color="var(--color-green)" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <AppStoreButton variant="ghost" size="md" label="Get the free app" />
              </div>
            </div>
          </FadeUp>

          {/* PRO */}
          <FadeUp delay={0.12}>
            <div className="relative h-full overflow-hidden rounded-[1.25rem] border border-[var(--color-electric)]/28 bg-[#0a0e15] p-6 sm:p-8">
              {/* two-tone top rail — the signature split */}
              <div className="duo-underline absolute inset-x-0 top-0 rounded-none" />

              <div className="flex items-center justify-between gap-4">
                <div className="scoreboard-type text-electric text-xl">CLUTCH PRO</div>
                <span className="rounded-full border border-[var(--color-red-bright)]/35 bg-[var(--color-red-bright)]/15 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
                  3-day trial
                </span>
              </div>
              <div className="mt-5 flex items-end gap-2">
                <span className="scoreboard-type tnum text-electric text-7xl leading-none">
                  $6.99
                </span>
                <span className="pb-2 text-white/55">/month</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-white/62">
                The full AI breakdown behind every matchup. App Store confirms final
                terms before purchase. Cancel anytime.
              </p>
              <ul className="mt-8 space-y-4">
                {proFeatures.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-white/80">
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <AppStoreButton size="md" label="Start with the free app" />
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
