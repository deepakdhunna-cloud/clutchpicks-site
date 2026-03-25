"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Radial gradient */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[var(--color-coral)] opacity-[0.04] blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[var(--color-teal)] opacity-[0.03] blur-[150px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-coral)]/20 bg-[var(--color-coral)]/5 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-green)] animate-pulse" />
          <span className="text-sm text-[var(--color-coral)] font-medium tracking-wide">
            AI-POWERED SPORTS PREDICTIONS
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          KNOW WHO WINS
          <br />
          <span className="gradient-text">BEFORE THEY PLAY</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-lg sm:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Our AI analyzes{" "}
          <span className="text-white font-medium">20 different factors</span>{" "}
          per game across{" "}
          <span className="text-white font-medium">8 major leagues</span>{" "}
          to predict winners with confidence ratings and full breakdowns.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://apps.apple.com/us/app/clutch-picks/id6759183746"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[var(--color-coral)] to-[var(--color-coral-light)] text-black font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(122,157,184,0.35)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download on iOS
            </span>
            {/* Shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </a>
          <a
            href="#features"
            className="px-8 py-4 rounded-full border border-white/10 text-white font-medium hover:border-white/25 hover:bg-white/5 transition-all duration-300"
          >
            See How It Works
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0 sm:divide-x sm:divide-white/10"
        >
          {[
            { value: "8", label: "Leagues Covered" },
            { value: "20", label: "Factors Analyzed" },
            { value: "24/7", label: "AI Analysis" },
            { value: "FREE", label: "Live Scores" },
          ].map((stat) => (
            <div key={stat.label} className="text-center px-4">
              <div
                className="text-3xl sm:text-4xl font-bold gradient-text"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-[var(--color-text-muted)] mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-coral)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
