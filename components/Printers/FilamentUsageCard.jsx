// components/Printers/FilamentUsageCard.jsx
"use client";

import { Spool, AlertTriangle, DollarSign } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function FilamentUsageCard({ filament }) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  if (!filament) return null;

  const isLowSpool = (filament.spoolRemainingPercent || 100) < 25;

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
            Filament & Material
          </h3>
          <p className="text-xs text-[#7F7B82]">
            Active loaded spool telemetry and mass consumption.
          </p>
        </div>

        {isLowSpool && (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-[#F37021]/15 text-[#F37021] border border-[#F37021]/30">
            <AlertTriangle className="w-3.5 h-3.5" />
            Low Spool
          </span>
        )}
      </div>

      {/* Loaded Spool Header */}
      <div
        className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
          isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/[0.02] border-white/5"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-5 h-5 rounded-full border border-black/20 shadow-inner shrink-0"
            style={{ backgroundColor: filament.colorHex }}
            title={filament.colorName}
          />
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-bold ${
                  isLight ? "text-[#080808]" : "text-[#FDFDFD]"
                }`}
              >
                {filament.material}
              </span>
              <span className="text-xs text-[#7F7B82]">• {filament.colorName}</span>
            </div>
            <p className="text-[11px] text-[#7F7B82]">{filament.brand}</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase font-semibold text-[#7F7B82] block">
            Job Material Cost
          </span>
          <span className="text-sm font-mono font-bold text-[#5F00BA]">
            {filament.costForPrint}
          </span>
        </div>
      </div>

      {/* Consumption Numbers */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div
          className={`p-3 rounded-xl border ${
            isLight ? "bg-zinc-50/50 border-zinc-200" : "bg-white/[0.01] border-white/5"
          }`}
        >
          <span className="text-[10px] uppercase font-semibold text-[#7F7B82] block">
            Used for this Print
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span
              className={`text-lg font-mono font-extrabold ${
                isLight ? "text-[#080808]" : "text-[#FDFDFD]"
              }`}
            >
              {filament.usedGrams}
            </span>
            <span className="text-xs font-semibold text-[#7F7B82]">g</span>
            <span className="text-xs text-[#7F7B82] ml-1 font-mono">
              ({filament.usedMeters} m)
            </span>
          </div>
          <span className="text-[11px] text-[#7F7B82] block mt-0.5">
            of {filament.totalGramsForJob}g est. total
          </span>
        </div>

        <div
          className={`p-3 rounded-xl border ${
            isLight ? "bg-zinc-50/50 border-zinc-200" : "bg-white/[0.01] border-white/5"
          }`}
        >
          <span className="text-[10px] uppercase font-semibold text-[#7F7B82] block">
            Spool Remaining
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span
              className={`text-lg font-mono font-extrabold ${
                isLowSpool
                  ? "text-[#F37021]"
                  : isLight
                  ? "text-[#080808]"
                  : "text-[#FDFDFD]"
              }`}
            >
              {filament.spoolRemainingGrams}
            </span>
            <span className="text-xs font-semibold text-[#7F7B82]">g</span>
            <span
              className={`text-xs font-bold ml-1 font-mono ${
                isLowSpool ? "text-[#F37021]" : "text-[#7F7B82]"
              }`}
            >
              ({filament.spoolRemainingPercent}%)
            </span>
          </div>
          <span className="text-[11px] text-[#7F7B82] block mt-0.5">
            Initial spool: 1,000g
          </span>
        </div>
      </div>

      {/* Spool Remaining Bar */}
      <div className="mt-4 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-[#7F7B82]">
          <span>Spool Capacity Gauge</span>
          <span className="font-mono font-semibold">
            {filament.spoolRemainingPercent}%
          </span>
        </div>
        <div
          className={`w-full h-2 rounded-full overflow-hidden ${
            isLight ? "bg-zinc-200" : "bg-white/10"
          }`}
        >
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isLowSpool ? "bg-[#F37021]" : "bg-[#5F00BA]"
            }`}
            style={{ width: `${filament.spoolRemainingPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
