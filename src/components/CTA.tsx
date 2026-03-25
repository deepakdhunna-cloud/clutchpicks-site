"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="download" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[var(--color-teal)]/20 to-transparent" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full bg-[var(--color-coral)] opacity-[0.04] blur-[200px]" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-4xl mx-auto px-6 text-center"
      >
        <h2
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          STOP GUESSING.
          <br />
          <span className="gradient-text">START KNOWING.</span>
        </h2>

        <p className="text-lg sm:text-xl text-[var(--color-text-muted)] max-w-xl mx-auto mb-10">
          Join thousands of sports fans using AI to make smarter picks.
          Available now on the App Store.
        </p>

        <a
          href="https://apps.apple.com/us/app/clutch-picks/id6759183746"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-[var(--color-coral)] to-[var(--color-coral-light)] text-black font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(122,157,184,0.35)]"
        >
          <span className="relative z-10 flex items-center gap-3">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Download on the App Store
          </span>
          {/* Shine sweep */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </a>

        <p className="mt-6 text-sm text-[var(--color-text-muted)]">
          Free to download. No credit card required.
        </p>
      </motion.div>
    </section>
  );
}
