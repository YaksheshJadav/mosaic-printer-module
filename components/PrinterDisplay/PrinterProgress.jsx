// components/PrinterDisplay/PrinterProgress.jsx
"use client";

import { useTheme } from "@/components/ThemeContext";

/**
 * Renders large percentage number and clamped progress bar
 * @param {{ progress: number, status?: string }} props
 */
export default function PrinterProgress({ progress = 0, status = "PRINTING" }) {
  const { resolvedTheme } = useTheme();
  const numericProgress = Number(progress);
  const clampedProgress = Math.min(100, Math.max(0, isNaN(numericProgress) ? 0 : Math.round(numericProgress)));

  const normalizedStatus = (status || "").toUpperCase();

  // Progress fill color based on status
  let barColor = "bg-[#5F00BA]";
  if (normalizedStatus === "PAUSED") {
    barColor = "bg-[#F37021]";
  } else if (normalizedStatus === "ERROR") {
    barColor = "bg-red-500";
  }

  const trackBg = resolvedTheme === "light" ? "bg-zinc-200" : "bg-white/10";
  const numberColor = resolvedTheme === "light" ? "text-[#080808]" : "text-[#FDFDFD]";

  return (
    <div className="w-full space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-xs uppercase font-medium tracking-wider text-[#7F7B82]">
          Progress
        </span>
        <div className="flex items-baseline gap-0.5">
          <span className={`text-3xl lg:text-4xl 2xl:text-5xl font-extrabold tracking-tight tabular-nums ${numberColor}`}>
            {clampedProgress}
          </span>
          <span className="text-lg 2xl:text-xl font-semibold text-[#7F7B82]">%</span>
        </div>
      </div>

      {/* Progress Track & Bar */}
      <div
        className={`w-full h-2.5 2xl:h-3.5 ${trackBg} rounded-full overflow-hidden p-0.5 transition-colors`}
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${barColor}`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}
