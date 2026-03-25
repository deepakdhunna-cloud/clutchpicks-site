"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface DownloadButtonProps {
  size?: "default" | "small";
}

export default function DownloadButton({ size = "default" }: DownloadButtonProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const isSmall = size === "small";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative inline-block"
    >
      {/* Pulsing glow rings */}
      <div
        className={`absolute rounded-full bg-gradient-to-r from-[var(--color-coral)] to-[var(--color-teal)] opacity-30 blur-lg animate-pulse-glow-ring ${
          isSmall ? "-inset-2" : "-inset-3"
        }`}
      />
      <div
        className={`absolute rounded-full bg-gradient-to-r from-[var(--color-coral)] to-[var(--color-teal)] opacity-20 animate-pulse-glow-ring ${
          isSmall ? "-inset-1" : "-inset-1.5"
        }`}
        style={{ animationDelay: "0.5s" }}
      />

      <a
        href="https://apps.apple.com/us/app/clutch-picks/id6759183746"
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[var(--color-coral)] to-[var(--color-coral-light)] text-black font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_80px_rgba(122,157,184,0.45)] z-10 ${
          isSmall
            ? "px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base"
            : "px-8 sm:px-12 py-5 sm:py-6 text-base sm:text-lg md:text-xl"
        }`}
      >
        <span className="relative z-10 flex items-center gap-3">
          <svg
            className={isSmall ? "w-5 h-5" : "w-7 h-7"}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          Download on the App Store
        </span>
        {/* Shine sweep */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </a>
    </motion.div>
  );
}
