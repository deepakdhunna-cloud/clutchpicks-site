"use client";

import { type ReactNode } from "react";
import { MotionConfig } from "framer-motion";

interface PageWrapperProps {
  children: ReactNode;
}

/**
 * Native scrolling everywhere — no scroll hijacking. JS-driven smooth
 * scroll (Lenis) added latency and judder on Safari/trackpads; the
 * compositor's own scrolling is the smoothest thing available on every
 * device. Anchor glides come from CSS scroll-behavior: smooth.
 */
export default function PageWrapper({ children }: PageWrapperProps) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
