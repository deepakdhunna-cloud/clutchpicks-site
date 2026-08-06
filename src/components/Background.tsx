/**
 * Ambient animated backdrop — echoes the app's ClutchPicksBackground
 * (deep vertical gradient with teal/maroon light sheets) plus its warped
 * grid, kept at very low opacity so content always leads. Pure CSS
 * animations, transform-only, paused under prefers-reduced-motion.
 */
export default function Background() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ transform: "translateZ(0)" }}
      aria-hidden="true"
    >
      {/* base atmosphere (app background gradient stops) */}
      <div
        className="absolute inset-0"
        style={{
          background: "url(/bg-atmosphere.png) center / 100% 100% no-repeat",
        }}
      />

      {/* drifting steel-teal glow */}
      <div
        className="bg-drift-a absolute rounded-full"
        style={{
          width: "58vmax",
          height: "58vmax",
          top: "-20%",
          left: "-14%",
          background: "url(/glow-teal.png) center / 100% 100% no-repeat",
        }}
      />

      {/* drifting maroon glow */}
      <div
        className="bg-drift-b absolute rounded-full"
        style={{
          width: "50vmax",
          height: "50vmax",
          bottom: "-22%",
          right: "-12%",
          background: "url(/glow-maroon.png) center / 100% 100% no-repeat",
        }}
      />

      {/* faint silver sheen sweeping the middle (app center sheen #C0C8D0) */}
      <div
        className="bg-drift-c absolute rounded-full opacity-60"
        style={{
          width: "44vmax",
          height: "44vmax",
          top: "30%",
          left: "30%",
          background: "url(/glow-silver.png) center / 100% 100% no-repeat",
        }}
      />

      {/* studio smoke — slow violet-grey fog banks (after shader.se) */}
      <div
        className="fog-blob"
        style={{
          width: "52vmax",
          height: "34vmax",
          bottom: "-14%",
          left: "-10%",
          background:
            "radial-gradient(ellipse at center, rgba(98,90,128,0.16) 0%, rgba(98,90,128,0.06) 55%, transparent 75%)",
        }}
      />
      <div
        className="fog-blob"
        style={{
          width: "46vmax",
          height: "30vmax",
          top: "6%",
          right: "-12%",
          animationDelay: "-12s",
          background:
            "radial-gradient(ellipse at center, rgba(74,96,116,0.14) 0%, rgba(74,96,116,0.05) 55%, transparent 75%)",
        }}
      />
    </div>
  );
}
