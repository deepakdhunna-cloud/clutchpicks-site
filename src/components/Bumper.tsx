/**
 * Broadcast bumper — the slim "UP NEXT" ticker strip that rejoins one
 * segment to the next, in place of an abrupt section start.
 */
export default function Bumper({ next, note }: { next: string; note: string }) {
  const text = `UP NEXT — ${next.toUpperCase()} · ${note.toUpperCase()} · `;
  return (
    <div
      className="relative overflow-hidden border-y border-line bg-black/30 py-2.5"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max font-led text-base tracking-[0.12em] text-l3">
        <span className="whitespace-pre">{text.repeat(6)}</span>
        <span className="whitespace-pre">{text.repeat(6)}</span>
      </div>
    </div>
  );
}
