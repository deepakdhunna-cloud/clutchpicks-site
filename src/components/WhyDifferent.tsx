"use client";

import { type ReactNode } from "react";
import { FadeUp, SectionHeading } from "./ui";

const icons: Record<string, ReactNode> = {
  bolt: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L4.5 13.5H11l-1 8.5L19.5 10H13l0-8z" />
  ),
  chart: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  ),
  card: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7zM3 10h18M7 15h4" />
  ),
  pulse: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h4l3-8 4 16 3-8h6" />
  ),
};

const principles = [
  {
    icon: "bolt",
    tone: "text-[var(--color-electric)]",
    title: "Fast context",
    copy: "The first read tells you what matters right now — scores, state, and the lean, instantly.",
  },
  {
    icon: "chart",
    tone: "text-[var(--color-green)]",
    title: "Model clarity",
    copy: "Confidence, projections, and risk language — visible without the hype.",
  },
  {
    icon: "card",
    tone: "text-[var(--color-red-bright)]",
    title: "Personal tracking",
    copy: "Every pick feeds a record, a history, and your analyst card.",
  },
  {
    icon: "pulse",
    tone: "text-[var(--color-electric)]",
    title: "Live, all day",
    copy: "Scores and win probability update as the matchup moves — not after it ends.",
  },
];

export default function WhyDifferent() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why it feels different"
          title="Built for the read,"
          accent="not the noise."
          align="center"
          className="max-w-3xl"
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <FadeUp key={p.title} delay={0.05 + i * 0.06}>
              <div className="card card-hover h-full p-6">
                <svg
                  className={`h-7 w-7 ${p.tone}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  {icons[p.icon]}
                </svg>
                <h3 className="scoreboard-type mt-5 text-2xl text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{p.copy}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
