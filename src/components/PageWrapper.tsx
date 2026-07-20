"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Skip Lenis on touch devices — iOS Safari has its own smooth momentum
    // scroll — and for users who prefer reduced motion.
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isTouchDevice || reducedMotion) return;

    const easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
    const lenis = new Lenis({
      duration: 1.2,
      easing,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let raf: number;
    function update(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(update);
    }
    raf = requestAnimationFrame(update);

    // Route in-page anchors through Lenis so nav clicks glide with the
    // same easing as wheel scrolling instead of the browser's default.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target =
        href === "#top" ? 0 : (document.querySelector(href) as HTMLElement);
      if (target !== 0 && !target) return;
      e.preventDefault();
      lenis.scrollTo(target, { duration: 1.5, easing });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
