"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LEAGUES } from "@/lib/site";
import StripeMark from "./StripeMark";

const INTRO_KEY = "cp-intro";
const BARS = LEAGUES.length;

/** True once the intro has played this session — repeat visits skip the wait. */
export function introSeen(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Scale an intro reveal delay down to near-zero on repeat visits.
 * Base values are authored against the original 1.25s loader; the sign-on
 * sequence (bars + ON AIR + collapse) holds ~1.75s longer, so first-visit
 * reveals shift by that much and nothing plays behind the boot screen.
 */
export function introDelay(base: number): number {
  return introSeen() ? Math.min(base, 0.15) : base + 1.75;
}

function statusFor(lit: number): string {
  const f = lit / BARS;
  if (f < 0.35) return "ACQUIRING SIGNAL ···";
  if (f < 0.75) return `TUNING ${BARS} COMPETITIONS ···`;
  if (f < 1) return "LOCKING THE BOARD ···";
  return "SIGNAL LOCKED";
}

/**
 * Station sign-on — a broadcast test card in the supported competition colors that
 * powers up bar by bar over deep arena navy, stamps ON AIR, then cuts
 * into the page with a CRT collapse. Plays once per session.
 */
export default function Loader() {
  const [done, setDone] = useState(false);
  const [quick, setQuick] = useState(false);
  const [lit, setLit] = useState(0);
  const [onAir, setOnAir] = useState(false);

  useEffect(() => {
    if (introSeen()) {
      setQuick(true);
      const t = setTimeout(() => setDone(true), 50);
      return () => clearTimeout(t);
    }
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* private mode — just replay next time */
    }
    let n = 0;
    let cancelled = false;
    const timers: number[] = [];
    const step = () => {
      if (cancelled) return;
      n += 1;
      setLit(n);
      if (n < BARS) {
        timers.push(window.setTimeout(step, 90 + Math.random() * 140));
      } else {
        timers.push(
          window.setTimeout(() => {
            setOnAir(true);
            timers.push(window.setTimeout(() => setDone(true), 640));
          }, 260)
        );
      }
    };
    timers.push(window.setTimeout(step, 340));
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  const pct = Math.round((lit / BARS) * 100);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] bg-bg-deep p-2 sm:p-3.5"
          exit={{
            opacity: 0,
            transition: {
              duration: quick ? 0.25 : 0.26,
              delay: quick ? 0 : 0.34,
              ease: "easeOut",
            },
          }}
          aria-hidden="true"
        >
          {!quick && (
            <motion.div
              className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden rounded-[20px] px-6 py-[6svh] sm:rounded-[30px]"
              style={{
                backgroundColor: "var(--color-boot)",
                backgroundImage:
                  "radial-gradient(ellipse 90% 70% at 50% 20%, rgba(122,157,184,0.14), transparent 60%)",
              }}
              exit={{
                scaleY: 0.004,
                filter: "brightness(2.6)",
                transition: { duration: 0.36, ease: [0.83, 0, 1, 1] },
              }}
            >
              {/* network ident — the real mark, floodlit */}
              <div className="flex flex-col items-center gap-7 pt-[2svh]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-stacked.webp"
                  alt=""
                  draggable={false}
                  className="w-[min(300px,56vw)]"
                  style={{
                    filter:
                      "drop-shadow(0 12px 32px rgba(0,0,0,0.85)) drop-shadow(0 0 44px rgba(155,194,220,0.4))",
                  }}
                />
                <div className="boot-chroma flex items-center gap-3 text-center font-led text-xl leading-snug text-cream/85 sm:text-2xl">
                  <StripeMark size={18} className="text-cream" />
                  CLUTCH SPORTS NETWORK — CHANNEL 01
                </div>
              </div>

              {/* league test bars, powering up one by one */}
              <div className="flex w-[min(680px,84vw)] flex-col gap-3">
                <div
                  className="flex h-[24svh] min-h-[120px] w-full overflow-hidden rounded-sm"
                  style={{ boxShadow: "0 0 60px rgba(0,0,0,0.45)" }}
                >
                  {LEAGUES.map((l, i) => (
                    <div
                      key={l.abbr}
                      className="h-full flex-1 transition-all duration-200"
                      style={{
                        backgroundColor: l.color,
                        opacity: i < lit ? 1 : 0.13,
                        boxShadow:
                          i < lit ? `0 0 26px ${l.color}66` : "none",
                      }}
                    />
                  ))}
                </div>
                <div className="boot-chroma flex items-baseline justify-between font-led text-lg text-cream/80 sm:text-xl">
                  <span>{statusFor(lit)}</span>
                  <span className="tabular">SIGNAL {String(pct).padStart(3, "0")}%</span>
                </div>
              </div>

              {/* ON AIR stamp */}
              <div className="flex h-14 items-center">
                {onAir && (
                  <span
                    className="animate-on-air rounded-[4px] border-2 px-5 py-1.5 font-led text-2xl tracking-[0.18em]"
                    style={{
                      color: "#ff6b62",
                      borderColor: "#ff6b62",
                      textShadow: "0 0 18px rgba(255,107,98,0.8)",
                      boxShadow:
                        "0 0 24px rgba(255,107,98,0.35), inset 0 0 14px rgba(255,107,98,0.2)",
                    }}
                  >
                    ON AIR
                  </span>
                )}
              </div>

              {/* sign-off line */}
              <p className="boot-chroma px-4 text-center font-led text-lg text-maroon-text/90 sm:text-xl">
                COPYRIGHT (C) CLUTCH PICKS LLC, 2026 · 50,000 SIMULATIONS PER ELIGIBLE PICK
              </p>

              <div className="crt-vignette" />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
