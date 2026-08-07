"use client";

import { FadeUp, PhoneFrame, SectionHeading } from "./ui";

const steps = [
  {
    number: "01",
    title: "Open the slate",
    copy: "Start with today's board, filtered by sport, status, and the games you care about.",
  },
  {
    number: "02",
    title: "Read the edge",
    copy: "Compare score context, projection movement, pick strength, and the factors behind the lean.",
  },
  {
    number: "03",
    title: "Prep your pick",
    copy: "Use Prep Mode to rank matchups by conviction, edge, and value before the game starts.",
  },
  {
    number: "04",
    title: "Build your card",
    copy: "Every pick feeds your record, recent calls, and analyst card so your history becomes visible.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="The daily flow"
              eyebrowTone="red"
              title="From slate"
              accent="to analyst card."
              kicker="Move from a quick scan to deeper context, then keep a visible record of the picks and reads you make over time."
              className="max-w-xl"
            />

            <div className="relative mt-10 space-y-3">
              {/* connecting rail */}
              <div
                aria-hidden="true"
                className="absolute bottom-6 left-[30px] top-6 w-px bg-gradient-to-b from-[var(--color-electric)]/50 via-white/10 to-[var(--color-red-bright)]/50"
              />
              {steps.map((step, index) => (
                <FadeUp key={step.number} delay={0.08 + index * 0.07}>
                  <div className="relative grid grid-cols-[62px_1fr] items-start gap-4 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
                    <div className="scoreboard-type tnum relative z-10 text-4xl leading-none text-[var(--color-electric)]">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white">{step.title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-white/62">{step.copy}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* visual */}
          <FadeUp delay={0.15} className="relative mx-auto w-full max-w-[320px]">
            <PhoneFrame
              src="/screenshots/live-intelligence-feed.jpg"
              alt="Live intelligence feed in Clutch Picks"
            />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
