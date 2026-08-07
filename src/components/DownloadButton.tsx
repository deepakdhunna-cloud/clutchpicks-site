"use client";

import { APP_STORE_URL } from "@/lib/site";

function AppleLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 384 512"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

/** App Store pill — white-on-black, inverts on hover. */
export default function DownloadButton({
  size = "default",
}: {
  size?: "default" | "large";
}) {
  const large = size === "large";
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center rounded-full border border-cream/30 bg-white/[0.03] text-l1 shadow-[0_0_36px_rgba(252,249,243,0.1)] transition-all duration-300 hover:border-cream hover:bg-cream hover:text-[#10130f] hover:shadow-[0_0_60px_rgba(252,249,243,0.32)] active:scale-[0.97] ${
        large ? "gap-4 px-8 py-4" : "gap-3 px-6 py-3"
      }`}
    >
      <AppleLogo className={large ? "h-7 w-7" : "h-5 w-5"} />
      <span className="flex flex-col items-start leading-none">
        <span
          className={`font-led tracking-[0.12em] text-l3 transition-colors duration-300 group-hover:text-[#10130f]/60 ${
            large ? "text-sm" : "text-xs"
          }`}
        >
          DOWNLOAD ON THE
        </span>
        <span
          className={`mt-1 font-serif font-semibold italic ${
            large ? "text-2xl" : "text-lg"
          }`}
        >
          App Store
        </span>
      </span>
    </a>
  );
}
