"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // This renders as an absolutely positioned bar — parent must be relative
  return (
    <motion.div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "2px",
        background:
          "linear-gradient(90deg, var(--color-coral, #7A9DB8), var(--color-teal, #E8936A))",
        transformOrigin: "0%",
        scaleX,
        zIndex: 10,
      }}
    />
  );
}
