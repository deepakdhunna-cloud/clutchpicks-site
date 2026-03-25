"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const plans = [
  {
    name: "FREE",
    price: "$0",
    period: "forever",
    description: "Everything you need to follow your favorite games.",
    features: [
      "Live scores across 8 leagues",
      "Complete schedules & box scores",
      "Broadcasting info (TV & streaming)",
      "Pick creation & tracking",
      "Profile stats card",
      '"My Arena" game following',
    ],
    cta: "Download Free",
    highlighted: false,
  },
  {
    name: "CLUTCH PRO",
    price: "$4.99",
    period: "/month",
    description: "The full AI advantage. Cancel anytime.",
    features: [
      "Everything in Free, plus:",
      "AI winner predictions with confidence %",
      "Complete 20-factor breakdown",
      "Spread & over/under predictions",
      "Edge & value ratings",
      "Full pick history access",
    ],
    cta: "Go Pro",
    highlighted: true,
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[var(--color-coral)]/20 to-transparent" />

      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--color-coral)] opacity-[0.02] blur-[200px]" />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.2em] text-[var(--color-coral)] uppercase font-medium">
            Pricing
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mt-4 mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            START FREE.{" "}
            <span className="gradient-text">GO PRO.</span>
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-md mx-auto">
            No commitment. No credit card required. Upgrade when you&apos;re ready.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, i) => {
            const cardRef = useRef(null);
            const cardInView = useInView(cardRef, { once: true, margin: "-50px" });

            return (
              <motion.div
                key={plan.name}
                ref={cardRef}
                initial={{ opacity: 0, y: 40 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative rounded-2xl p-8 sm:p-10 ${
                  plan.highlighted
                    ? "gradient-border glass-card glow-coral"
                    : "glass-card"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-[var(--color-coral)] to-[var(--color-coral-light)] text-black text-xs font-bold tracking-wider">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3
                    className={`text-lg font-bold tracking-wider mb-4 ${
                      plan.highlighted ? "text-[var(--color-coral)]" : "text-white"
                    }`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-5xl font-bold"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-[var(--color-text-muted)]">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] mt-2">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        className={`w-5 h-5 mt-0.5 shrink-0 ${
                          plan.highlighted
                            ? "text-[var(--color-coral)]"
                            : "text-[var(--color-green)]"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      <span className="text-sm text-[var(--color-text-muted)]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#download"
                  className={`block w-full text-center py-3.5 rounded-full font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-[var(--color-coral)] to-[var(--color-coral-light)] text-black hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(122,157,184,0.3)]"
                      : "border border-white/10 text-white hover:border-white/25 hover:bg-white/5"
                  }`}
                >
                  {plan.cta}
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
