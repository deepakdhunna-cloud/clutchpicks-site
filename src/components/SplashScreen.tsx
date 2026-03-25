"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [phase, setPhase] = useState<"center" | "move" | "done">("center");

  useEffect(() => {
    // Phase 1: Logo centered with fade-in (0 - 1.2s)
    // Phase 2: Logo moves up to navbar position (1.2s - 2s)
    // Phase 3: Splash fades out, logo is in place (2s+)
    const t1 = setTimeout(() => setPhase("move"), 1200);
    const t2 = setTimeout(() => setPhase("done"), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="splash"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            backgroundColor: "#040608",
            pointerEvents: phase === "move" ? "none" : "auto",
          }}
        >
          {/* Gradient sweep line — center */}
          <motion.div
            initial={{ scaleX: 0, opacity: 1 }}
            animate={
              phase === "center"
                ? { scaleX: 1, opacity: 1 }
                : { scaleX: 0, opacity: 0 }
            }
            transition={{ duration: 0.5, delay: phase === "center" ? 0.5 : 0, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "calc(50% + 36px)",
              left: "50%",
              translateX: "-50%",
              height: "3px",
              width: "clamp(120px, 20vw, 240px)",
              background: "linear-gradient(90deg, var(--color-coral, #7A9DB8), var(--color-teal, #E8936A))",
              transformOrigin: "left center",
              borderRadius: "2px",
            }}
          />

          {/* Logo image — starts centered, moves to navbar position */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={
              phase === "center"
                ? {
                    opacity: 1,
                    scale: 1,
                    top: "50%",
                    left: "50%",
                    x: "-50%",
                    y: "-50%",
                  }
                : {
                    opacity: 1,
                    scale: 0.45,
                    top: "20px",
                    left: "50%",
                    x: "-50%",
                    y: "0%",
                  }
            }
            transition={
              phase === "center"
                ? { duration: 0.6, ease: "easeOut" }
                : { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
            }
            style={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Clutch Picks"
              style={{
                height: "clamp(60px, 12vw, 120px)",
                width: "auto",
                objectFit: "contain",
                userSelect: "none",
              }}
              onError={(e) => {
                // Fallback to text if no logo
                const el = e.target as HTMLImageElement;
                el.style.display = "none";
                const span = document.createElement("span");
                span.textContent = "CLUTCH PICKS";
                span.style.fontFamily = '"Bebas Neue", sans-serif';
                span.style.fontSize = "clamp(2.4rem, 6vw, 4.5rem)";
                span.style.letterSpacing = "0.12em";
                span.style.color = "#ffffff";
                span.style.lineHeight = "1";
                el.parentElement?.appendChild(span);
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
