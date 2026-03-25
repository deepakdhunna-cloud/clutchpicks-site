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
      {/* Spotlight beams behind logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Left beam */}
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: [0, 0.5, 0.3], x: [-200, 0, 0] }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute w-[400px] h-[120px] rounded-full blur-[80px]"
          style={{
            left: "calc(50% - 300px)",
            background: "radial-gradient(ellipse at right, var(--color-coral, #7A9DB8) 0%, transparent 70%)",
          }}
        />
        {/* Right beam */}
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: [0, 0.5, 0.3], x: [200, 0, 0] }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute w-[400px] h-[120px] rounded-full blur-[80px]"
          style={{
            right: "calc(50% - 300px)",
            background: "radial-gradient(ellipse at left, var(--color-teal, #E8936A) 0%, transparent 70%)",
          }}
        />
        {/* Center merge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.4, 0.25], scale: [0.5, 1.1, 1] }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="absolute w-[500px] h-[80px] rounded-full blur-[60px]"
          style={{
            background: "radial-gradient(ellipse, var(--color-coral, #7A9DB8) 0%, var(--color-teal, #E8936A) 50%, transparent 80%)",
          }}
        />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
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
