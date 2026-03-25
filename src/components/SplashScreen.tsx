"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [phase, setPhase] = useState<"hold" | "done">("hold");

  useEffect(() => {
    // Hold for 1.8s, then fade the backdrop away — logo stays in place
    const t = setTimeout(() => setPhase("done"), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {phase === "hold" && (
        <>
          {/* Dark backdrop — fades out to reveal the site */}
          <motion.div
            key="splash-bg"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 10000,
              backgroundColor: "#040608",
            }}
          />

          {/* Loading bar — positioned below center */}
          <motion.div
            key="splash-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              scaleX: { duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.3 },
            }}
            style={{
              position: "fixed",
              zIndex: 10001,
              bottom: "38%",
              left: "50%",
              translateX: "-50%",
              height: "2px",
              width: "clamp(100px, 15vw, 180px)",
              background: "linear-gradient(90deg, var(--color-coral, #7A9DB8), var(--color-teal, #E8936A))",
              transformOrigin: "center",
              borderRadius: "2px",
            }}
          />

          {/* Logo — sits exactly where the navbar logo will be, no movement at all */}
          <motion.div
            key="splash-logo"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              position: "fixed",
              zIndex: 10001,
              top: 0,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              paddingTop: "calc(1.25rem + env(safe-area-inset-top, 0px))",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Clutch Picks"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
              style={{ userSelect: "none" }}
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.style.display = "none";
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
