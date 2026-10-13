// app/printers/page.jsx
// Printers list – clickable cards navigate to /printers/[printerId]
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getDummyPrinters } from "@/data/printers";
import { useTheme } from "@/components/ThemeProvider";
import PrinterStatusBadge from "@/components/PrinterDisplay/PrinterStatusBadge";
import { Clock, Layers, ArrowRight, Printer } from "lucide-react";

function computeRemaining(estimatedEndAt, now) {
  if (!estimatedEndAt) return null;
  const end = new Date(estimatedEndAt).getTime();
  const cur = (now || new Date()).getTime();
  if (isNaN(end)) return null;
  const diff = end - cur;
  if (diff <= 0) return "Finishing…";
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const m = mins % 60;
  return hours > 0 ? `${hours}h ${String(m).padStart(2, "0")}m` : `${mins}m`;
}

function PrinterCard({ printer, now, isLight }) {
  const isActive = printer.status === "PRINTING" || printer.status === "PAUSED";
  const remaining = computeRemaining(printer.estimatedEndAt, now);
  const progress = Math.min(100, Math.max(0, printer.progress || 0));

  return (
    <Link
      href={`/printers/${printer.id}`}
      className={`group block p-5 rounded-2xl border transition-all outline-none
        focus-visible:ring-2 focus-visible:ring-[#5F00BA] focus-visible:ring-offset-2
        ${
          isLight
            ? "bg-white border-zinc-200 hover:border-[#5F00BA] hover:shadow-md"
            : "bg-[#111111] border-white/10 hover:border-[#5F00BA] hover:shadow-lg"
        }`}
    >
      {/* Card header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`p-2.5 rounded-xl shrink-0 ${
              isLight ? "bg-zinc-100 text-zinc-600" : "bg-white/5 text-zinc-300"
            }`}
          >
            <Printer className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h2
              className={`text-base font-black tracking-tight truncate group-hover:text-[#5F00BA] transition-colors ${
                isLight ? "text-[#080808]" : "text-[#FDFDFD]"
              }`}
            >
              {printer.printerName || printer.printerCode}
            </h2>
            <p className="text-xs text-[#7F7B82] font-mono">{printer.id}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <PrinterStatusBadge status={printer.status} />
          <ArrowRight
            className={`w-4 h-4 text-[#7F7B82] transition-transform group-hover:translate-x-0.5 group-hover:text-[#5F00BA]`}
          />
        </div>
      </div>

      {/* Active print details */}
      {isActive && printer.currentPrintName ? (
        <div
          className={`rounded-xl p-3.5 border ${
            isLight
              ? "bg-zinc-50 border-zinc-200"
              : "bg-white/[0.02] border-white/5"
          }`}
        >
          <p
            className={`text-sm font-bold truncate mb-0.5 ${
              isLight ? "text-[#080808]" : "text-[#FDFDFD]"
            }`}
            title={printer.currentPrintName}
          >
            {printer.currentPrintName}
          </p>
          {printer.projectName && (
            <p className="text-xs text-[#7F7B82] truncate mb-3">
              {printer.projectName}
            </p>
          )}

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#7F7B82] uppercase font-semibold text-[10px]">
                Progress
              </span>
              <span
                className={`font-mono font-bold ${
                  isLight ? "text-[#080808]" : "text-[#FDFDFD]"
                }`}
              >
                {progress}%
              </span>
            </div>
            <div
              className={`w-full h-2 rounded-full overflow-hidden ${
                isLight ? "bg-zinc-200" : "bg-white/10"
              }`}
            >
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  printer.status === "PAUSED"
                    ? "bg-[#F37021]"
                    : "bg-[#5F00BA]"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Time remaining */}
          {remaining && (
            <div className="flex items-center gap-1.5 mt-2.5 text-xs">
              <Clock className="w-3.5 h-3.5 text-[#7F7B82]" />
              <span className="text-[#7F7B82]">Remaining:</span>
              <span className="font-mono font-bold text-[#5F00BA]">
                {remaining}
              </span>
            </div>
          )}
        </div>
      ) : (
        /* Idle/offline/error state */
        <div
          className={`rounded-xl p-3.5 border flex items-center justify-center ${
            isLight
              ? "bg-zinc-50 border-zinc-200"
              : "bg-white/[0.02] border-white/5"
          }`}
        >
          <p className="text-xs text-[#7F7B82]">
            {printer.status === "OFFLINE"
              ? "Printer is offline"
              : printer.status === "ERROR"
              ? "Printer error — check device"
              : "No active print"}
          </p>
        </div>
      )}

      {/* Footer */}
      <div
        className={`mt-3 pt-3 border-t flex items-center justify-between text-[11px] ${
          isLight ? "border-zinc-100" : "border-white/5"
        }`}
      >
        <span className="text-[#7F7B82]">View full telemetry →</span>
        <span className="text-[#5F00BA] font-semibold group-hover:underline">
          Open detail
        </span>
      </div>
    </Link>
  );
}

export default function PrintersPage() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const [printers, setPrinters] = useState([]);
  const [now, setNow] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const base = new Date();
    setPrinters(getDummyPrinters(base));
    setNow(base);
    setMounted(true);
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return (
      <div className="p-6 md:p-8 flex items-center justify-center min-h-[300px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 rounded-full border-2 border-[#5F00BA] border-t-transparent animate-spin" />
          <p className="text-xs text-[#7F7B82] uppercase tracking-widest font-medium">
            Loading printers…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-8">
        <h1
          className={`text-2xl md:text-3xl font-bold tracking-tight ${
            isLight ? "text-[#080808]" : "text-[#FDFDFD]"
          }`}
        >
          Printers
        </h1>
        <p className="mt-1 text-sm text-[#7F7B82]">
          Live fleet status. Click a printer card for full telemetry and
          diagnostics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {printers.map((printer) => (
          <PrinterCard
            key={printer.id}
            printer={printer}
            now={now}
            isLight={isLight}
          />
        ))}
      </div>
    </div>
  );
}
