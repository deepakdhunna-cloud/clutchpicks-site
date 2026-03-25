"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Skip Lenis on touch devices — iOS Safari has its own smooth momentum scroll
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let raf: number;
    function update(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(update);
    }
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
