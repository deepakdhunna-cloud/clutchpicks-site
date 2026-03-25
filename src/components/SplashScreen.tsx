"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [phase, setPhase] = useState<"center" | "moving" | "settled" | "done">("center");

  useEffect(() => {
    // center: logo sits in middle of screen (0 - 1.2s)
    // moving: logo scales down and moves up to navbar position (1.2s - 2.2s)
    // settled: logo in place, backdrop fades revealing site (2.2s - 2.8s)
    // done: splash removed from DOM
    const t1 = setTimeout(() => setPhase("moving"), 1200);
    const t2 = setTimeout(() => setPhase("settled"), 2200);
    const t3 = setTimeout(() => setPhase("done"), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "done") return null;

  return (
    <>
      {/* Dark backdrop */}
      <motion.div
        animate={{ opacity: phase === "settled" ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          backgroundColor: "#040608",
          pointerEvents: phase === "settled" ? "none" : "auto",
        }}
      />

      {/* Loading bar — below logo when centered */}
      <AnimatePresence>
        {(phase === "center") && (
          <motion.div
            key="bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
            transition={{
              scaleX: { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.3 },
            }}
            style={{
              position: "fixed",
              zIndex: 10002,
              top: "calc(50% + 40px)",
              left: "50%",
              translateX: "-50%",
              height: "2px",
              width: "120px",
              background: "linear-gradient(90deg, var(--color-coral, #7A9DB8), var(--color-teal, #E8936A))",
              transformOrigin: "center",
              borderRadius: "2px",
            }}
          />
        )}
      </AnimatePresence>

      {/* Logo — starts centered, moves to navbar position */}
      <motion.div
        animate={
          phase === "center"
            ? { top: "50%", y: "-50%", scale: 1.8, opacity: 1 }
            : phase === "moving"
            ? { top: "20px", y: "0%", scale: 1, opacity: 1 }
            : { top: "20px", y: "0%", scale: 1, opacity: 0 }
        }
        transition={
          phase === "moving"
            ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
            : phase === "settled"
            ? { duration: 0.15, ease: "easeOut" }
            : { duration: 0 }
        }
        style={{
          position: "fixed",
          zIndex: 10002,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Clutch Picks"
          className="h-12 sm:h-14 md:h-16 w-auto object-contain"
          style={{ userSelect: "none" }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </motion.div>
    </>
  );
}
