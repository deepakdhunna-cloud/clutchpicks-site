"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#040608",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {/* Logo text */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              fontFamily: 'var(--font-heading, "Bebas Neue", sans-serif)',
              fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
              letterSpacing: "0.12em",
              color: "#ffffff",
              margin: 0,
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            CLUTCH PICKS
          </motion.h1>

          {/* Gradient sweep line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
            style={{
              marginTop: "0.6rem",
              height: "3px",
              width: "clamp(160px, 30vw, 320px)",
              background:
                "linear-gradient(90deg, var(--color-coral, #7A9DB8), var(--color-teal, #E8936A))",
              transformOrigin: "left center",
              borderRadius: "2px",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
