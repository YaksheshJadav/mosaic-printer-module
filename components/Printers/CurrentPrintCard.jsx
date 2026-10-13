// components/Printers/CurrentPrintCard.jsx
"use client";

import { Layers, Clock, Calendar, User, Folder, Box, Printer, CheckCircle2 } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

function formatClock(iso) {
  if (!iso) return "--:--";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "--:--";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

function computeRemaining(estimatedEndAt, currentTime) {
  if (!estimatedEndAt) return "--";
  const end = new Date(estimatedEndAt).getTime();
  const now = (currentTime ? new Date(currentTime) : new Date()).getTime();
  if (isNaN(end) || isNaN(now)) return "--";
  const diffMs = end - now;
  if (diffMs <= 0) return "Finishing…";
  const totalMinutes = Math.floor(diffMs / (60 * 1000));
  if (totalMinutes <= 0) return "Finishing…";
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  if (hours > 0) return `${hours}h ${String(mins).padStart(2, "0")}m`;
  return `${mins}m`;
}

export default function CurrentPrintCard({ currentPrint, status, currentTime }) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  if (!currentPrint) {
    // Empty state: No active print
    return (
      <div
        className={`p-6 md:p-8 rounded-2xl border text-center transition-all ${
          isLight
            ? "bg-white border-zinc-200 shadow-sm"
            : "bg-[#111111] border-white/10 shadow-lg"
        }`}
      >
        <div className="max-w-md mx-auto flex flex-col items-center justify-center py-6">
          <div
            className={`p-4 rounded-full mb-3 ${
              isLight ? "bg-zinc-100 text-zinc-500" : "bg-white/5 text-zinc-400"
            }`}
          >
            <Printer className="w-10 h-10" />
          </div>
          <h2
            className={`text-lg font-bold ${
              isLight ? "text-[#080808]" : "text-[#FDFDFD]"
            }`}
          >
            No active print
          </h2>
          <p className="text-xs text-[#7F7B82] mt-1">
            Waiting for next job in the queue. Send a print job from the Print Queue module to begin.
          </p>
        </div>
      </div>
    );
  }

  const progress = Math.min(100, Math.max(0, currentPrint.progress || 0));
  const remainingStr = computeRemaining(currentPrint.estimatedEndAt, currentTime);

  return (
    <div
      className={`p-6 md:p-8 rounded-2xl border transition-all ${
        isLight
          ? "bg-white border-zinc-200 shadow-sm"
          : "bg-[#111111] border-white/10 shadow-lg"
      }`}
    >
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        {/* Print Thumbnail Preview */}
        <div
          className={`w-full lg:w-48 h-44 rounded-xl border flex flex-col items-center justify-center relative overflow-hidden shrink-0 ${
            isLight
              ? "bg-zinc-50 border-zinc-200"
              : "bg-white/[0.02] border-white/10"
          }`}
        >
          {/* Schematic SVG model wireframe preview */}
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full stroke-current text-[#5F00BA] opacity-80"
              fill="none"
              strokeWidth="2"
            >
              <polygon points="50,15 85,35 85,65 50,85 15,65 15,35" strokeDasharray="2 2" />
              <polygon points="50,25 75,40 75,60 50,75 25,60 25,40" />
              <circle cx="50" cy="50" r="14" fill="#5F00BA" fillOpacity="0.15" />
            </svg>
            <span className="absolute bottom-1 text-[10px] font-mono text-[#7F7B82]">
              {currentPrint.version}
            </span>
          </div>

          <span className="text-[10px] uppercase font-bold tracking-wider text-[#7F7B82] pb-2">
            Isometric Preview
          </span>
        </div>

        {/* Main Details and Progress */}
        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#5F00BA]">
                Active Print
              </span>
              <span className="text-xs text-[#7F7B82]">•</span>
              <span className="text-xs font-mono text-[#7F7B82]">
                {currentPrint.version}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#7F7B82]">
              <Layers className="w-3.5 h-3.5" />
              <span>
                Layer{" "}
                <strong className={isLight ? "text-[#080808]" : "text-[#FDFDFD]"}>
                  {currentPrint.currentLayer}
                </strong>{" "}
                of {currentPrint.totalLayers}
              </span>
            </div>
          </div>

          <h2
            className={`text-xl md:text-2xl font-black tracking-tight truncate ${
              isLight ? "text-[#080808]" : "text-[#FDFDFD]"
            }`}
          >
            {currentPrint.name}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#7F7B82] mt-2">
            <span className="flex items-center gap-1.5 truncate">
              <Folder className="w-3.5 h-3.5" />
              {currentPrint.project}
            </span>
            <span className="flex items-center gap-1.5 truncate">
              <Box className="w-3.5 h-3.5" />
              {currentPrint.object}
            </span>
          </div>

          {/* Progress Bar & Percentage */}
          <div className="mt-5 space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase font-semibold text-[#7F7B82]">
                Job Completion
              </span>
              <div className="flex items-baseline gap-0.5">
                <span
                  className={`text-2xl md:text-3xl font-extrabold font-mono tabular-nums ${
                    isLight ? "text-[#080808]" : "text-[#FDFDFD]"
                  }`}
                >
                  {progress}
                </span>
                <span className="text-sm font-bold text-[#7F7B82]">%</span>
              </div>
            </div>

            <div
              className={`w-full h-3 rounded-full overflow-hidden p-0.5 ${
                isLight ? "bg-zinc-200" : "bg-white/10"
              }`}
            >
              <div
                className="h-full rounded-full bg-[#5F00BA] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Time Telemetry & Operator Card */}
          <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div
              className={`p-2.5 rounded-xl border ${
                isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/[0.02] border-white/5"
              }`}
            >
              <span className="text-[10px] uppercase font-semibold text-[#7F7B82] block">
                Started
              </span>
              <span
                className={`text-xs sm:text-sm font-mono font-bold block mt-0.5 ${
                  isLight ? "text-[#080808]" : "text-[#FDFDFD]"
                }`}
              >
                {formatClock(currentPrint.startedAt)}
              </span>
            </div>

            <div
              className={`p-2.5 rounded-xl border ${
                isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/[0.02] border-white/5"
              }`}
            >
              <span className="text-[10px] uppercase font-semibold text-[#7F7B82] block">
                Est. Finish
              </span>
              <span
                className={`text-xs sm:text-sm font-mono font-bold block mt-0.5 ${
                  isLight ? "text-[#080808]" : "text-[#FDFDFD]"
                }`}
              >
                {formatClock(currentPrint.estimatedEndAt)}
              </span>
            </div>

            <div
              className={`p-2.5 rounded-xl border ${
                isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/[0.02] border-white/5"
              }`}
            >
              <span className="text-[10px] uppercase font-semibold text-[#7F7B82] block">
                Remaining
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold text-[#5F00BA] block mt-0.5">
                {remainingStr}
              </span>
            </div>

            <div
              className={`p-2.5 rounded-xl border ${
                isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/[0.02] border-white/5"
              }`}
            >
              <span className="text-[10px] uppercase font-semibold text-[#7F7B82] block truncate">
                Printed By
              </span>
              <div className="flex items-center gap-1.5 mt-0.5 min-w-0">
                <span className="w-4 h-4 rounded-full bg-[#5F00BA] text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                  {currentPrint.printedBy?.initials || "U"}
                </span>
                <span
                  className={`text-xs font-semibold truncate ${
                    isLight ? "text-[#080808]" : "text-[#FDFDFD]"
                  }`}
                  title={currentPrint.printedBy?.name}
                >
                  {currentPrint.printedBy?.name || "Operator"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
