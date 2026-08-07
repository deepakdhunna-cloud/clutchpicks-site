"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;
export { APP_STORE_URL } from "@/lib/site";
import { APP_STORE_URL } from "@/lib/site";

/* ---------------------------------------------------------------
   FadeUp — scroll-triggered reveal used across sections
--------------------------------------------------------------- */
export function FadeUp({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------
   Eyebrow pill — the "● CLUTCH PICKS" chip from the app
--------------------------------------------------------------- */
export function Eyebrow({
  children,
  tone = "cyan",
}: {
  children: ReactNode;
  tone?: "cyan" | "red";
}) {
  const dot =
    tone === "red" ? "bg-[var(--color-red-bright)]" : "bg-[var(--color-electric)]";
  const text =
    tone === "red" ? "text-[var(--color-red-bright)]" : "text-[var(--color-electric)]";
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em]">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      <span className={text}>{children}</span>
    </span>
  );
}

/* ---------------------------------------------------------------
   Section heading — Bebas title with the two-tone underline
--------------------------------------------------------------- */
export function SectionHeading({
  eyebrow,
  eyebrowTone = "cyan",
  title,
  accent,
  kicker,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  eyebrowTone?: "cyan" | "red";
  title: ReactNode;
  /** second line, rendered with the white→cyan accent */
  accent?: ReactNode;
  /** supporting paragraph under the underline */
  kicker?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const centered = align === "center";

  return (
    <div ref={ref} className={`${centered ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>
        </motion.div>
      ) : null}

      <motion.h2
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
        className="scoreboard-type display-section mt-4 text-white"
      >
        {title}
        {accent ? <span className="text-electric block">{accent}</span> : null}
      </motion.h2>

      <div className={`mt-5 flex ${centered ? "justify-center" : ""}`}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          className="duo-underline w-[104px]"
        />
      </div>

      {kicker ? (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className={`mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8 ${
            centered ? "mx-auto" : ""
          }`}
        >
          {kicker}
        </motion.p>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------------
   LIVE pill
--------------------------------------------------------------- */
export function LivePill({ label = "LIVE" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-red-bright)]/40 bg-[var(--color-red-bright)]/15 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white">
      <span className="live-dot h-1.5 w-1.5 rounded-full bg-[var(--color-red-bright)]" />
      {label}
    </span>
  );
}

/* ---------------------------------------------------------------
   Win-probability split bar (cyan ← → red, matches the app)
--------------------------------------------------------------- */
export function WinProbBar({
  leftLabel,
  rightLabel,
  leftPct,
}: {
  leftLabel: string;
  rightLabel: string;
  leftPct: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const rightPct = 100 - leftPct;

  return (
    <div ref={ref}>
      <div className="tnum flex items-center justify-between text-xs font-bold">
        <span className="text-[var(--color-electric)]">
          {leftLabel} {leftPct}%
        </span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-white/50">
          Win probability
        </span>
        <span className="text-[var(--color-red-bright)]">
          {rightPct}% {rightLabel}
        </span>
      </div>
      <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: "50%" }}
          animate={inView ? { width: `${leftPct}%` } : {}}
          transition={{ duration: 1, ease: EASE }}
          className="h-full bg-gradient-to-r from-[var(--color-electric)] to-[var(--color-electric-deep)]"
        />
        <motion.div
          initial={{ width: "50%" }}
          animate={inView ? { width: `${rightPct}%` } : {}}
          transition={{ duration: 1, ease: EASE }}
          className="h-full bg-gradient-to-r from-[var(--color-maroon-light)] to-[var(--color-red-bright)]"
        />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Count-up number (fires when scrolled into view)
--------------------------------------------------------------- */
export function CountUp({
  to,
  suffix = "",
  duration = 1.4,
  className = "",
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {Math.round(val)}
      {suffix}
    </span>
  );
}

/* ---------------------------------------------------------------
   Phone frame — app screenshot in a device shell
--------------------------------------------------------------- */
export function PhoneFrame({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`phone-rim relative overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#05070b] p-1.5 ${className}`}
    >
      <div className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-black/85" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={1320}
        height={2868}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className="aspect-[1320/2868] h-auto w-full rounded-[1.6rem] object-cover"
      />
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/[0.1] via-transparent to-black/25" />
    </div>
  );
}

/* ---------------------------------------------------------------
   App Store button — the one primary action on the site
--------------------------------------------------------------- */
export function AppStoreIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

export function AppStoreButton({
  variant = "primary",
  size = "lg",
  label = "Download on the App Store",
  className = "",
}: {
  variant?: "primary" | "ghost";
  size?: "lg" | "md";
  label?: string;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2.5 rounded-full font-bold transition active:scale-[0.99]";
  const sizing = size === "lg" ? "h-14 px-7 text-sm" : "h-12 px-5 text-sm";
  const look =
    variant === "primary"
      ? "bg-white text-black hover:bg-[var(--color-silver)]"
      : "border border-white/[0.14] bg-white/[0.05] text-white hover:border-[var(--color-electric)]/50 hover:bg-[var(--color-electric)]/10";
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${sizing} ${look} ${className}`}
    >
      <AppStoreIcon className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
      {label}
    </a>
  );
}
