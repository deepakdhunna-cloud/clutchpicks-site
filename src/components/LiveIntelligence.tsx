"use client";

import { CountUp, FadeUp, LivePill, PhoneFrame, SectionHeading, WinProbBar } from "./ui";

const leagueCounts = [
  { code: "MLB", n: 16 },
  { code: "MLS", n: 12 },
  { code: "TENNIS", n: 7 },
  { code: "NBA", n: 1 },
];

export default function LiveIntelligence() {
  return (
    <section id="live" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Home board"
          eyebrowTone="red"
          title="The whole slate,"
          accent="at a glance."
          kicker="Today's games, live states, and every league board sit in one focused view — readable in a glance, alive as the scores move."
          className="max-w-3xl"
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          {/* phone */}
          <FadeUp className="relative mx-auto w-full max-w-[300px]">
            <PhoneFrame
              src="/screenshots/live-sports-intelligence.jpg"
              alt="Clutch Picks home board with live games across leagues"
            />
          </FadeUp>

          {/* live data column */}
          <div className="grid gap-4">
            {/* today's games */}
            <FadeUp delay={0.08}>
              <div className="card p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="scoreboard-type text-xs uppercase tracking-[0.16em] text-white/55">
                    Today&apos;s games
                  </span>
                  <LivePill label="25 live" />
                </div>
                <div className="mt-2 flex items-end gap-3">
                  <span className="scoreboard-type text-6xl text-white">
                    <CountUp to={38} />
                  </span>
                  <span className="mb-2 text-sm text-white/55">across 7 sports</span>
                </div>
                <div className="mt-5 grid grid-cols-4 gap-2">
                  {leagueCounts.map((l) => (
                    <div
                      key={l.code}
                      className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-2 py-3 text-center"
                    >
                      <div className="scoreboard-type text-2xl text-[var(--color-electric)]">
                        <CountUp to={l.n} />
                      </div>
                      <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">
                        {l.code}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* live game card with win probability */}
            <FadeUp delay={0.16}>
              <div className="card p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[10px] font-black tracking-[0.1em] text-white/65">
                      MLB
                    </span>
                    <LivePill />
                  </div>
                  <span className="scoreboard-type text-sm text-white/60">Bot 7th</span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold text-white">Los Angeles Dodgers</div>
                    <div className="tnum text-xs text-white/50">34–18</div>
                  </div>
                  <div className="scoreboard-type tnum flex items-center gap-3 text-4xl text-white">
                    <span>6</span>
                    <span className="text-white/30">·</span>
                    <span>5</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-white">New York Mets</div>
                    <div className="tnum text-xs text-white/50">29–23</div>
                  </div>
                </div>

                <div className="mt-5">
                  <WinProbBar leftLabel="LAD" rightLabel="NYM" leftPct={68} />
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                  {[
                    { k: "Your pick", v: "LAD", tone: "text-[var(--color-electric)]" },
                    { k: "Momentum", v: "LAD surge", tone: "text-white" },
                    { k: "Model edge", v: "Solid", tone: "text-[var(--color-green)]" },
                  ].map((m) => (
                    <div
                      key={m.k}
                      className="rounded-lg border border-white/[0.06] bg-white/[0.025] py-2.5"
                    >
                      <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/50">
                        {m.k}
                      </div>
                      <div className={`mt-1 text-sm font-black ${m.tone}`}>{m.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
