// components/Printers/PrinterSettingsCard.jsx
"use client";

import { SlidersHorizontal, Settings2 } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function PrinterSettingsCard({ settings }) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  if (!settings) return null;

  const items = [
    { label: "Layer Height", value: settings.layerHeight },
    { label: "Infill Density", value: settings.infill },
    { label: "Print Speed", value: settings.printSpeed },
    { label: "Nozzle Size", value: settings.nozzleDiameter },
    { label: "Support Structure", value: settings.supports },
    { label: "Plate Adhesion", value: settings.buildPlateAdhesion },
    { label: "Part Cooling Fan", value: settings.fanSpeed },
  ];

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
            Slicer & Print Settings
          </h3>
          <p className="text-xs text-[#7F7B82]">
            Active slicing profile parameters for this production run.
          </p>
        </div>
        <SlidersHorizontal className="w-4 h-4 text-[#7F7B82]" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {items.map((it, idx) => (
          <div
            key={idx}
            className={`p-2.5 rounded-xl border ${
              isLight
                ? "bg-zinc-50 border-zinc-200/80"
                : "bg-white/[0.02] border-white/5"
            }`}
          >
            <span className="text-[10px] uppercase font-semibold text-[#7F7B82] block truncate">
              {it.label}
            </span>
            <span
              className={`text-xs font-mono font-bold block mt-1 truncate ${
                isLight ? "text-[#080808]" : "text-[#FDFDFD]"
              }`}
              title={it.value}
            >
              {it.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
