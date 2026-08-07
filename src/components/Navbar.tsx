"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppStoreButton, EASE } from "./ui";

const navLinks = [
  { name: "Live board", href: "/#live", section: "live" },
  { name: "Features", href: "/#features", section: "features" },
  { name: "Pricing", href: "/#pricing", section: "pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      let current = "";
      for (const link of navLinks) {
        const el = document.getElementById(link.section);
        if (el && el.getBoundingClientRect().top <= 160) {
          current = link.section;
        }
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/[0.08] bg-[#05070b]/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <a href="/" className="flex min-w-0 items-center" aria-label="Clutch Picks home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Clutch Picks"
            width={3352}
            height={523}
            className="h-8 w-auto shrink-0 object-contain sm:h-9"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center rounded-full border border-white/[0.08] bg-white/[0.035] p-1 md:flex">
          {navLinks.map((link) => {
            const active = activeSection === link.section;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full border border-[var(--color-electric)]/30 bg-[var(--color-electric)]/12"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <AppStoreButton size="md" label="Download" />
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] text-white transition hover:bg-white/[0.1] md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden border-t border-white/[0.06] md:hidden"
          >
            <div className="space-y-1 px-4 pb-5 pt-3 sm:px-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-semibold text-white/80 transition hover:bg-white/[0.06] hover:text-white"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 sm:hidden">
                <AppStoreButton size="md" className="w-full" />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
