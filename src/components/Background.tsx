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
            "radial-gradient(circle closest-side, rgba(122,157,184,0.15) 0%, rgba(122,157,184,0.135) 12%, rgba(122,157,184,0.115) 24%, rgba(122,157,184,0.09) 36%, rgba(122,157,184,0.065) 48%, rgba(122,157,184,0.045) 60%, rgba(122,157,184,0.028) 71%, rgba(122,157,184,0.015) 81%, rgba(122,157,184,0.006) 90%, rgba(122,157,184,0) 100%)",
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
            "radial-gradient(circle closest-side, rgba(139,10,31,0.13) 0%, rgba(139,10,31,0.115) 12%, rgba(139,10,31,0.095) 24%, rgba(139,10,31,0.073) 36%, rgba(139,10,31,0.052) 48%, rgba(139,10,31,0.034) 60%, rgba(139,10,31,0.02) 71%, rgba(139,10,31,0.01) 81%, rgba(139,10,31,0.004) 90%, rgba(139,10,31,0) 100%)",
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
            "radial-gradient(circle closest-side, rgba(192,200,208,0.07) 0%, rgba(192,200,208,0.06) 18%, rgba(192,200,208,0.047) 34%, rgba(192,200,208,0.033) 50%, rgba(192,200,208,0.02) 65%, rgba(192,200,208,0.01) 78%, rgba(192,200,208,0.004) 89%, rgba(192,200,208,0) 100%)",
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
