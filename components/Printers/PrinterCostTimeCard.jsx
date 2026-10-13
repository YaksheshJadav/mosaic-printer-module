// components/Printers/PrinterCostTimeCard.jsx
"use client";

import { DollarSign, Clock, Zap } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function PrinterCostTimeCard({ costAndTime }) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  if (!costAndTime) return null;

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
            Cost & Energy Telemetry
          </h3>
          <p className="text-xs text-[#7F7B82]">
            Production job duration, consumable costs, and kilowatt draw.
          </p>
        </div>
        <DollarSign className="w-4 h-4 text-[#5F00BA]" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          className={`p-3 rounded-xl border ${
            isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/[0.02] border-white/5"
          }`}
        >
          <span className="text-[10px] uppercase font-semibold text-[#7F7B82] block">
            Elapsed Time
          </span>
          <span
            className={`text-base font-mono font-bold block mt-1 ${
              isLight ? "text-[#080808]" : "text-[#FDFDFD]"
            }`}
          >
            {costAndTime.elapsedTime}
          </span>
          <span className="text-[11px] text-[#7F7B82] block mt-0.5">
            of {costAndTime.estimatedTotalTime} est.
          </span>
        </div>

        <div
          className={`p-3 rounded-xl border ${
            isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/[0.02] border-white/5"
          }`}
        >
          <span className="text-[10px] uppercase font-semibold text-[#7F7B82] block">
            Material Cost
          </span>
          <span
            className={`text-base font-mono font-bold block mt-1 ${
              isLight ? "text-[#080808]" : "text-[#FDFDFD]"
            }`}
          >
            {costAndTime.materialCost}
          </span>
          <span className="text-[11px] text-[#7F7B82] block mt-0.5">
            Filament mass
          </span>
        </div>

        <div
          className={`p-3 rounded-xl border ${
            isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/[0.02] border-white/5"
          }`}
        >
          <span className="text-[10px] uppercase font-semibold text-[#7F7B82] block">
            Machine Time
          </span>
          <span
            className={`text-base font-mono font-bold block mt-1 ${
              isLight ? "text-[#080808]" : "text-[#FDFDFD]"
            }`}
          >
            {costAndTime.machineTimeCost}
          </span>
          <span className="text-[11px] text-[#7F7B82] block mt-0.5">
            Depreciation rate
          </span>
        </div>

        <div
          className={`p-3 rounded-xl border ${
            isLight
              ? "bg-[#5F00BA]/[0.03] border-[#5F00BA]/30"
              : "bg-[#5F00BA]/10 border-[#5F00BA]/30"
          }`}
        >
          <span className="text-[10px] uppercase font-bold text-[#5F00BA] block">
            Total Job Cost
          </span>
          <span className="text-base font-mono font-extrabold text-[#5F00BA] block mt-1">
            {costAndTime.totalCost}
          </span>
          <span className="text-[11px] text-[#7F7B82] block mt-0.5 truncate">
            {costAndTime.powerEstimate}
          </span>
        </div>
      </div>
    </div>
  );
}
