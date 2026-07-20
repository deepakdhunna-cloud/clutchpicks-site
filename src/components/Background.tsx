/**
 * Ambient animated backdrop — echoes the app's ClutchPicksBackground
 * (deep vertical gradient with teal/maroon light sheets) plus its warped
 * grid, kept at very low opacity so content always leads. Pure CSS
 * animations, transform-only, paused under prefers-reduced-motion.
 */
export default function Background() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* base atmosphere (app background gradient stops) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #010101 0%, #061119 28%, #07070B 66%, #010101 100%)",
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
          background:
            "radial-gradient(circle, rgba(122,157,184,0.15) 0%, rgba(122,157,184,0.05) 45%, transparent 70%)",
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
          background:
            "radial-gradient(circle, rgba(139,10,31,0.13) 0%, rgba(139,10,31,0.045) 45%, transparent 70%)",
        }}
      />

      {/* faint silver sheen sweeping the middle (app center sheen #C0C8D0) */}
      <div
        className="bg-drift-c absolute rounded-full"
        style={{
          width: "44vmax",
          height: "44vmax",
          top: "30%",
          left: "30%",
          background:
            "radial-gradient(circle, rgba(192,200,208,0.07) 0%, rgba(192,200,208,0.02) 45%, transparent 70%)",
        }}
      />

      {/* slow-panning grid, faded toward the edges */}
      <div
        className="bg-grid-pan absolute inset-[-15%]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(160,170,180,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(160,170,180,0.07) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 75% 60% at 50% 38%, black 0%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 60% at 50% 38%, black 0%, transparent 78%)",
        }}
      />
    </div>
  );
}
