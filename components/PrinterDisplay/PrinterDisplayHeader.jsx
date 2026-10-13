// components/PrinterDisplay/PrinterDisplayHeader.jsx
"use client";

import Link from "next/link";
import { Clock, ArrowLeft, Maximize2, Minimize2 } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

/**
 * Compact header for the MOSAIC printer display
 * @param {{
 *   lastUpdated?: string | Date,
 *   currentTime?: Date,
 *   isFullscreen?: boolean,
 *   onToggleFullscreen?: () => void
 * }} props
 */
export default function PrinterDisplayHeader({
  lastUpdated,
  currentTime,
  isFullscreen,
  onToggleFullscreen,
}) {
  const { resolvedTheme } = useTheme();

  const formattedClock = (() => {
    if (!currentTime) return "--:--:--";
    return currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  })();

  const formattedLastUpdated = (() => {
    if (!lastUpdated) return "--:--";
    const d = new Date(lastUpdated);
    if (isNaN(d.getTime())) return "--:--";
    return d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  })();

  const isLight = resolvedTheme === "light";

  return (
    <header
      className={`h-14 2xl:h-16 px-4 sm:px-6 2xl:px-8 border-b transition-colors flex items-center justify-between shrink-0 select-none ${
        isLight
          ? "bg-[#FDFDFD] border-zinc-200 text-[#080808]"
          : "bg-[#080808] border-white/10 text-[#FDFDFD]"
      }`}
    >
      {/* Navigation & Module Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Reciprocal Back to Dashboard Link */}
        <Link
          href="/"
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
            isLight
              ? "text-zinc-600 hover:text-[#080808] bg-zinc-100 hover:bg-zinc-200 border-zinc-200"
              : "text-[#7F7B82] hover:text-[#FDFDFD] bg-white/[0.04] hover:bg-white/[0.08] border-white/10"
          }`}
          title="Return to Dashboard preview"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>

        <div className="flex items-center gap-2">
          <span
            className={`text-base 2xl:text-lg font-black tracking-widest ${
              isLight ? "text-[#080808]" : "text-[#FDFDFD]"
            }`}
          >
            MOSAIC
          </span>
          <span className="text-zinc-400 font-light">/</span>
          <span className="text-sm 2xl:text-base font-medium tracking-wide text-[#7F7B82]">
            Printer Monitor
          </span>
        </div>
      </div>

      {/* Live Status, Clock, & Kiosk Toggle */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Real-Time Live Clock */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs 2xl:text-sm transition-colors ${
            isLight
              ? "bg-zinc-100 border-zinc-200 text-[#080808]"
              : "bg-white/[0.04] border-white/10 text-[#FDFDFD]"
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-[#5F00BA]" />
          <span className="font-mono font-semibold tabular-nums">
            {formattedClock}
          </span>
        </div>

        {/* LIVE Telemetry Indicator */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-xs font-bold tracking-wider text-emerald-500">
            LIVE
          </span>
        </div>

        {/* Last Updated Timestamp */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs 2xl:text-sm text-[#7F7B82]">
          <span>Updated:</span>
          <span
            className={`font-mono font-medium tabular-nums ${
              isLight ? "text-[#080808]" : "text-[#FDFDFD]"
            }`}
          >
            {formattedLastUpdated}
          </span>
        </div>

        {/* Fullscreen Kiosk Mode Toggle */}
        {onToggleFullscreen && (
          <button
            type="button"
            onClick={onToggleFullscreen}
            className={`p-1.5 rounded-md transition-colors border ${
              isLight
                ? "text-zinc-600 hover:text-[#080808] hover:bg-zinc-100 border-zinc-200"
                : "text-[#7F7B82] hover:text-[#FDFDFD] hover:bg-white/10 border-transparent hover:border-white/10"
            }`}
            title={isFullscreen ? "Exit Fullscreen Kiosk" : "Enter Fullscreen Kiosk"}
            aria-label={isFullscreen ? "Exit Fullscreen Kiosk" : "Enter Fullscreen Kiosk"}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </header>
  );
}
