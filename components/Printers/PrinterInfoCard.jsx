// components/Printers/PrinterInfoCard.jsx
"use client";

import { Wrench, Calendar, Clock, AlertTriangle } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function PrinterInfoCard({ printerInfo }) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  if (!printerInfo) return null;

  return (
    <div
      className={`p-6 rounded-2xl border transition-all ${
        isLight
          ? "bg-white border-zinc-200 shadow-sm"
          : "bg-[#111111] border-white/10 shadow-lg"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3
            className={`text-base font-bold ${
              isLight ? "text-[#080808]" : "text-[#FDFDFD]"
            }`}
          >
            Hardware & Maintenance
          </h3>
          <p className="text-xs text-[#7F7B82]">
            Physical machine specifications and maintenance schedule.
          </p>
        </div>

        {printerInfo.isMaintenanceDueSoon && (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-[#F37021]/15 text-[#F37021] border border-[#F37021]/30">
            <AlertTriangle className="w-3.5 h-3.5" />
            Service Due Soon
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          className={`p-3 rounded-xl border ${
            isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/[0.02] border-white/5"
          }`}
        >
          <span className="text-[10px] uppercase font-semibold text-[#7F7B82] block truncate">
            Machine Model
          </span>
          <span
            className={`text-xs font-bold block mt-1 truncate ${
              isLight ? "text-[#080808]" : "text-[#FDFDFD]"
            }`}
            title={printerInfo.model}
          >
            {printerInfo.model}
          </span>
          <span className="text-[10px] font-mono text-[#7F7B82] block mt-0.5 truncate">
            {printerInfo.firmwareVersion}
          </span>
        </div>

        <div
          className={`p-3 rounded-xl border ${
            isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/[0.02] border-white/5"
          }`}
        >
          <span className="text-[10px] uppercase font-semibold text-[#7F7B82] block truncate">
            Build Envelope
          </span>
          <span
            className={`text-xs font-bold block mt-1 truncate ${
              isLight ? "text-[#080808]" : "text-[#FDFDFD]"
            }`}
          >
            {printerInfo.buildVolume}
          </span>
          <span className="text-[10px] font-mono text-[#7F7B82] block mt-0.5 truncate">
            Nozzle: {printerInfo.nozzleSize}
          </span>
        </div>

        <div
          className={`p-3 rounded-xl border ${
            isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/[0.02] border-white/5"
          }`}
        >
          <span className="text-[10px] uppercase font-semibold text-[#7F7B82] block truncate">
            Total Service
          </span>
          <span
            className={`text-xs font-bold block mt-1 truncate ${
              isLight ? "text-[#080808]" : "text-[#FDFDFD]"
            }`}
          >
            {printerInfo.totalPrintHours}
          </span>
          <span className="text-[10px] font-mono text-[#7F7B82] block mt-0.5 truncate">
            {printerInfo.totalPrintsCompleted} prints finished
          </span>
        </div>

        <div
          className={`p-3 rounded-xl border ${
            printerInfo.isMaintenanceDueSoon
              ? "bg-[#F37021]/10 border-[#F37021]/40"
              : isLight
              ? "bg-zinc-50 border-zinc-200"
              : "bg-white/[0.02] border-white/5"
          }`}
        >
          <span className="text-[10px] uppercase font-semibold text-[#7F7B82] block truncate">
            Next Maintenance
          </span>
          <span
            className={`text-xs font-mono font-bold block mt-1 truncate ${
              printerInfo.isMaintenanceDueSoon
                ? "text-[#F37021]"
                : isLight
                ? "text-[#080808]"
                : "text-[#FDFDFD]"
            }`}
          >
            {printerInfo.nextMaintenanceDue}
          </span>
          <span className="text-[10px] text-[#7F7B82] block mt-0.5 truncate">
            Last: {printerInfo.lastMaintenanceDate}
          </span>
        </div>
      </div>
    </div>
  );
}
