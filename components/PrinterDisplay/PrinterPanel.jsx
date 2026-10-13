// components/PrinterDisplay/PrinterPanel.jsx
"use client";

import { Folder, FileCode, CheckCircle2, AlertOctagon, PowerOff, Printer } from "lucide-react";
import PrinterStatusBadge from "./PrinterStatusBadge";
import PrinterProgress from "./PrinterProgress";
import { useTheme } from "@/components/ThemeContext";

/**
 * Border color mappings for each supported status
 */
const STATUS_BORDER_DARK = {
  PRINTING: "border-[#5F00BA]",
  READY: "border-emerald-500",
  IDLE: "border-[#7F7B82]/40",
  PAUSED: "border-[#F37021]",
  OFFLINE: "border-zinc-800",
  ERROR: "border-red-500",
};

const STATUS_BORDER_LIGHT = {
  PRINTING: "border-[#5F00BA]",
  READY: "border-emerald-500",
  IDLE: "border-zinc-300",
  PAUSED: "border-[#F37021]",
  OFFLINE: "border-zinc-300",
  ERROR: "border-red-500",
};

/**
 * Format ISO time into HH:mm (24-hour)
 */
function formatClockTime(isoString) {
  if (!isoString) return "--:--";
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "--:--";
  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/**
 * Calculate remaining duration based on estimated completion time and current tick
 */
function computeRemainingTime(estimatedEndAt, currentTime) {
  if (!estimatedEndAt) return "--";
  const end = new Date(estimatedEndAt).getTime();
  const now = (currentTime ? new Date(currentTime) : new Date()).getTime();

  if (isNaN(end) || isNaN(now)) return "--";

  const diffMs = end - now;
  if (diffMs <= 0) {
    return "Finishing…";
  }

  const totalMinutes = Math.floor(diffMs / (60 * 1000));
  if (totalMinutes <= 0) {
    return "Finishing…";
  }

  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}h ${String(mins).padStart(2, "0")}m`;
  }
  return `${mins}m`;
}

/**
 * Returns an operational icon for the empty state matching the status
 */
function getEmptyStateIcon(status, isLight) {
  switch (status) {
    case "READY":
      return <CheckCircle2 className={`w-10 h-10 2xl:w-12 2xl:h-12 ${isLight ? "text-emerald-600" : "text-emerald-500/60"}`} />;
    case "OFFLINE":
      return <PowerOff className={`w-10 h-10 2xl:w-12 2xl:h-12 ${isLight ? "text-zinc-400" : "text-zinc-600"}`} />;
    case "ERROR":
      return <AlertOctagon className={`w-10 h-10 2xl:w-12 2xl:h-12 ${isLight ? "text-red-600" : "text-red-500/60"}`} />;
    default:
      return <Printer className={`w-10 h-10 2xl:w-12 2xl:h-12 ${isLight ? "text-zinc-400" : "text-[#7F7B82]/50"}`} />;
  }
}

/**
 * Individual Printer Panel (reusable, props-driven, theme-responsive)
 * @param {{ printer: object, currentTime?: Date }} props
 */
export default function PrinterPanel({ printer, currentTime }) {
  const { resolvedTheme } = useTheme();
  if (!printer) return null;

  const isLight = resolvedTheme === "light";
  const normalizedStatus = (printer.status || "IDLE").toUpperCase();
  const borderMap = isLight ? STATUS_BORDER_LIGHT : STATUS_BORDER_DARK;
  const borderColor = borderMap[normalizedStatus] || borderMap.IDLE;
  const hasActivePrint = Boolean(printer.currentPrintName);
  const remainingTimeStr = computeRemainingTime(printer.estimatedEndAt, currentTime);

  return (
    <div
      className={`h-full min-w-0 flex flex-col justify-between rounded-xl 2xl:rounded-2xl border-2 ${borderColor} p-4 sm:p-5 2xl:p-7 overflow-hidden transition-all select-none ${
        isLight
          ? "bg-white text-[#080808] shadow-sm"
          : "bg-[#111111] text-[#FDFDFD] shadow-lg"
      }`}
    >
      {/* Top Header: Printer Name and Status Badge */}
      <div
        className={`flex items-center justify-between gap-3 border-b pb-3 2xl:pb-4 min-w-0 ${
          isLight ? "border-zinc-100" : "border-white/5"
        }`}
      >
        <div className="min-w-0">
          <h2
            className={`text-base sm:text-lg 2xl:text-xl font-bold tracking-wide truncate ${
              isLight ? "text-[#080808]" : "text-[#FDFDFD]"
            }`}
          >
            {printer.printerName || printer.printerCode}
          </h2>
          {printer.printerCode && printer.printerName !== printer.printerCode && (
            <span className="text-xs text-[#7F7B82] uppercase tracking-wider block truncate">
              {printer.printerCode}
            </span>
          )}
        </div>
        <div className="shrink-0">
          <PrinterStatusBadge status={printer.status} />
        </div>
      </div>

      {/* Main Body: Active Print Details OR Empty State */}
      <div className="my-auto py-3 2xl:py-5 min-w-0 flex-1 flex flex-col justify-center">
        {hasActivePrint ? (
          <div className="space-y-4 2xl:space-y-6 min-w-0">
            {/* Print & Project Info */}
            <div className="space-y-1.5 min-w-0">
              <div className="min-w-0">
                <span className="text-[10px] 2xl:text-xs uppercase font-semibold tracking-wider text-[#7F7B82] block">
                  Current Print
                </span>
                <p
                  title={printer.currentPrintName}
                  className={`text-base sm:text-lg 2xl:text-2xl font-bold truncate leading-tight mt-0.5 ${
                    isLight ? "text-[#080808]" : "text-[#FDFDFD]"
                  }`}
                >
                  {printer.currentPrintName}
                </p>
              </div>

              {printer.projectName && (
                <div className="flex items-center gap-1.5 min-w-0 text-xs 2xl:text-sm text-[#7F7B82]">
                  <Folder className="w-3.5 h-3.5 shrink-0 text-[#7F7B82]" />
                  <span className="truncate" title={printer.projectName}>
                    {printer.projectName}
                  </span>
                </div>
              )}

              {printer.fileName && (
                <div className="flex items-center gap-1.5 min-w-0 mt-1">
                  <FileCode className="w-3.5 h-3.5 shrink-0 text-[#7F7B82]" />
                  <span
                    className={`font-mono text-[11px] 2xl:text-xs px-2 py-0.5 rounded border truncate max-w-full ${
                      isLight
                        ? "bg-zinc-100 text-zinc-700 border-zinc-200"
                        : "bg-white/[0.04] text-[#7F7B82] border-white/5"
                    }`}
                    title={printer.fileName}
                  >
                    {printer.fileName}
                  </span>
                </div>
              )}
            </div>

            {/* Progress Section */}
            <div className="pt-1">
              <PrinterProgress progress={printer.progress} status={printer.status} />
            </div>
          </div>
        ) : (
          /* Empty State: exactly as required */
          <div className="flex flex-col items-center justify-center text-center py-6 px-3 space-y-3">
            <div
              className={`p-3 rounded-full border ${
                isLight
                  ? "bg-zinc-50 border-zinc-200"
                  : "bg-white/[0.03] border-white/5"
              }`}
            >
              {getEmptyStateIcon(normalizedStatus, isLight)}
            </div>
            <div className="space-y-1">
              <p
                className={`text-base 2xl:text-xl font-bold ${
                  isLight ? "text-[#080808]" : "text-[#FDFDFD]"
                }`}
              >
                No active print
              </p>
              <p className="text-xs 2xl:text-sm text-[#7F7B82]">
                Waiting for next job
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer: Timing Telemetry (Only for active prints) */}
      {hasActivePrint && (
        <div
          className={`pt-3 2xl:pt-4 border-t grid grid-cols-3 gap-2 text-center min-w-0 shrink-0 ${
            isLight ? "border-zinc-100" : "border-white/5"
          }`}
        >
          {/* Started Time */}
          <div
            className={`min-w-0 p-2 rounded-lg border ${
              isLight
                ? "bg-zinc-50 border-zinc-200"
                : "bg-white/[0.02] border-white/5"
            }`}
          >
            <span className="text-[10px] 2xl:text-xs uppercase font-medium text-[#7F7B82] block truncate">
              Started
            </span>
            <span
              className={`text-xs sm:text-sm 2xl:text-base font-semibold font-mono tabular-nums block mt-0.5 truncate ${
                isLight ? "text-[#080808]" : "text-[#FDFDFD]"
              }`}
            >
              {formatClockTime(printer.startedAt)}
            </span>
          </div>

          {/* Estimated End Time */}
          <div
            className={`min-w-0 p-2 rounded-lg border ${
              isLight
                ? "bg-zinc-50 border-zinc-200"
                : "bg-white/[0.02] border-white/5"
            }`}
          >
            <span className="text-[10px] 2xl:text-xs uppercase font-medium text-[#7F7B82] block truncate">
              Est. End
            </span>
            <span
              className={`text-xs sm:text-sm 2xl:text-base font-semibold font-mono tabular-nums block mt-0.5 truncate ${
                isLight ? "text-[#080808]" : "text-[#FDFDFD]"
              }`}
            >
              {formatClockTime(printer.estimatedEndAt)}
            </span>
          </div>

          {/* Remaining Time */}
          <div
            className={`min-w-0 p-2 rounded-lg border ${
              isLight
                ? "bg-zinc-50 border-zinc-200"
                : "bg-white/[0.03] border-white/5"
            }`}
          >
            <span className="text-[10px] 2xl:text-xs uppercase font-medium text-[#7F7B82] block truncate">
              Remaining
            </span>
            <span
              className={`text-xs sm:text-sm 2xl:text-base font-bold font-mono tabular-nums block mt-0.5 truncate ${
                remainingTimeStr === "Finishing…"
                  ? "text-[#F37021] animate-pulse"
                  : isLight
                  ? "text-[#080808]"
                  : "text-[#FDFDFD]"
              }`}
            >
              {remainingTimeStr}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
