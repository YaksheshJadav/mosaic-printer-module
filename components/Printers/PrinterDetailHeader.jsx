// components/Printers/PrinterDetailHeader.jsx
"use client";

import Link from "next/link";
import { ArrowLeft, Clock, ShieldCheck } from "lucide-react";
import PrinterStatusBadge from "@/components/PrinterDisplay/PrinterStatusBadge";
import { useTheme } from "@/components/ThemeProvider";

export default function PrinterDetailHeader({ printer, currentTime }) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  const formattedClock = (() => {
    if (!currentTime) return "--:--";
    return currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  })();

  const formattedLastUpdated = (() => {
    if (!printer?.updatedAt) return "--:--";
    const d = new Date(printer.updatedAt);
    if (isNaN(d.getTime())) return "--:--";
    return d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  })();

  return (
    <div
      className={`p-4 md:p-6 rounded-2xl border transition-all ${
        isLight
          ? "bg-white border-zinc-200 shadow-sm"
          : "bg-[#111111] border-white/10 shadow-lg"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Back button, Printer Name and Code */}
        <div className="flex items-start sm:items-center gap-3 md:gap-4 min-w-0">
          <Link
            href="/printers"
            className={`p-2 rounded-xl border transition-all shrink-0 ${
              isLight
                ? "text-zinc-700 bg-zinc-100 hover:bg-zinc-200 border-zinc-200"
                : "text-zinc-300 bg-white/5 hover:bg-white/10 border-white/10"
            }`}
            title="Back to Printers list"
            aria-label="Back to Printers list"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1
                className={`text-xl md:text-2xl font-black tracking-tight truncate ${
                  isLight ? "text-[#080808]" : "text-[#FDFDFD]"
                }`}
              >
                {printer?.printerName || "Printer"}
              </h1>
              {printer?.printerCode && (
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#5F00BA]/10 text-[#5F00BA] border border-[#5F00BA]/20">
                  {printer.printerCode}
                </span>
              )}
              <PrinterStatusBadge status={printer?.status} />
            </div>

            <p className="text-xs text-[#7F7B82] mt-1 truncate">
              {printer?.model || "3D Printer"} • Telemetry Active
            </p>
          </div>
        </div>

        {/* Right: Live Telemetry Metadata */}
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
          {/* Live Clock */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono tabular-nums ${
              isLight
                ? "bg-zinc-100 border-zinc-200 text-[#080808]"
                : "bg-white/[0.04] border-white/10 text-[#FDFDFD]"
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-[#5F00BA]" />
            <span className="font-semibold">{formattedClock}</span>
          </div>

          {/* Last updated */}
          <div className="text-xs text-[#7F7B82] flex items-center gap-1">
            <span>Updated:</span>
            <span className="font-mono text-[#080808] dark:text-[#FDFDFD] font-medium">
              {formattedLastUpdated}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
