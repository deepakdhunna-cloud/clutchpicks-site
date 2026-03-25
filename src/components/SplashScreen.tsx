"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SplashScreen() {
  const [phase, setPhase] = useState<"show" | "fade" | "done">("show");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fade"), 1600);
    const t2 = setTimeout(() => setPhase("done"), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "done") return null;

  return (
    <motion.div
      animate={{ opacity: phase === "fade" ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        backgroundColor: "#040608",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: phase === "fade" ? "none" : "auto",
      }}
    >
      {/* Spotlight beams — soft, no hard edges */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Left glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.35, 0.35] }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          style={{
            position: "absolute",
            width: "50%",
            height: "200px",
            left: 0,
            filter: "blur(100px)",
            background: "radial-gradient(ellipse at 70% 50%, var(--color-coral, #7A9DB8), transparent 70%)",
          }}
        />
        {/* Right glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.35, 0.35] }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          style={{
            position: "absolute",
            width: "50%",
            height: "200px",
            right: 0,
            filter: "blur(100px)",
            background: "radial-gradient(ellipse at 30% 50%, var(--color-teal, #E8936A), transparent 70%)",
          }}
        />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Clutch Picks"
          className="h-16 sm:h-20 md:h-24 w-auto object-contain relative z-10"
          style={{ userSelect: "none" }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </motion.div>
    </motion.div>
  );
}
