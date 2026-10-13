// components/Printers/TemperatureCard.jsx
"use client";

import { Flame, Thermometer, AlertCircle } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function TemperatureCard({ temperatures }) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  if (!temperatures) return null;

  const { nozzle, bed, chamber, sparkline = [24, 24, 24, 24] } = temperatures;

  // Simple SVG sparkline points
  const minTemp = Math.min(...sparkline, 20);
  const maxTemp = Math.max(...sparkline, 265);
  const range = maxTemp - minTemp || 1;
  const width = 140;
  const height = 36;
  const points = sparkline
    .map((val, idx) => {
      const x = (idx / (sparkline.length - 1)) * width;
      const y = height - ((val - minTemp) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(" ");

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
            Thermal Telemetry
          </h3>
          <p className="text-xs text-[#7F7B82]">
            Closed-loop PID hotend, heated bed, and ambient chamber thermal zones.
          </p>
        </div>

        {/* Small SVG Sparkline */}
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-[10px] text-[#7F7B82] font-mono">Nozzle Trend (10m)</span>
          <svg className="w-32 h-8 overflow-visible mt-1">
            <polyline
              fill="none"
              stroke="#5F00BA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Nozzle */}
        <div
          className={`p-4 rounded-xl border relative ${
            nozzle.isAlert
              ? "bg-red-500/10 border-red-500/40"
              : isLight
              ? "bg-zinc-50 border-zinc-200"
              : "bg-white/[0.02] border-white/5"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold text-[#7F7B82] flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              Hotend Nozzle
            </span>
            {nozzle.isAlert && <AlertCircle className="w-4 h-4 text-red-500" />}
          </div>

          <div className="flex items-baseline gap-1">
            <span
              className={`text-2xl font-mono font-extrabold ${
                nozzle.isAlert
                  ? "text-red-500"
                  : isLight
                  ? "text-[#080808]"
                  : "text-[#FDFDFD]"
              }`}
            >
              {nozzle.current}
            </span>
            <span className="text-sm font-semibold text-[#7F7B82]">°C</span>
            <span className="text-xs font-mono text-[#7F7B82] ml-2">
              / {nozzle.target}°C
            </span>
          </div>

          <div className="mt-2 text-[11px] text-[#7F7B82]">
            Target:{" "}
            <span className="font-semibold text-emerald-500">
              {nozzle.target > 0 ? `${nozzle.target}°C` : "Off"}
            </span>
          </div>
        </div>

        {/* Bed */}
        <div
          className={`p-4 rounded-xl border relative ${
            bed.isAlert
              ? "bg-red-500/10 border-red-500/40"
              : isLight
              ? "bg-zinc-50 border-zinc-200"
              : "bg-white/[0.02] border-white/5"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold text-[#7F7B82] flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5 text-blue-500" />
              Heated Bed
            </span>
            {bed.isAlert && <AlertCircle className="w-4 h-4 text-red-500" />}
          </div>

          <div className="flex items-baseline gap-1">
            <span
              className={`text-2xl font-mono font-extrabold ${
                bed.isAlert
                  ? "text-red-500"
                  : isLight
                  ? "text-[#080808]"
                  : "text-[#FDFDFD]"
              }`}
            >
              {bed.current}
            </span>
            <span className="text-sm font-semibold text-[#7F7B82]">°C</span>
            <span className="text-xs font-mono text-[#7F7B82] ml-2">
              / {bed.target}°C
            </span>
          </div>

          <div className="mt-2 text-[11px] text-[#7F7B82]">
            Target:{" "}
            <span className="font-semibold text-emerald-500">
              {bed.target > 0 ? `${bed.target}°C` : "Off"}
            </span>
          </div>
        </div>

        {/* Chamber */}
        <div
          className={`p-4 rounded-xl border relative ${
            chamber.isAlert
              ? "bg-red-500/10 border-red-500/40"
              : isLight
              ? "bg-zinc-50 border-zinc-200"
              : "bg-white/[0.02] border-white/5"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold text-[#7F7B82] flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5 text-purple-500" />
              Chamber
            </span>
            {chamber.isAlert && <AlertCircle className="w-4 h-4 text-red-500" />}
          </div>

          <div className="flex items-baseline gap-1">
            <span
              className={`text-2xl font-mono font-extrabold ${
                chamber.isAlert
                  ? "text-red-500"
                  : isLight
                  ? "text-[#080808]"
                  : "text-[#FDFDFD]"
              }`}
            >
              {chamber.current}
            </span>
            <span className="text-sm font-semibold text-[#7F7B82]">°C</span>
            <span className="text-xs font-mono text-[#7F7B82] ml-2">
              / {chamber.target}°C
            </span>
          </div>

          <div className="mt-2 text-[11px] text-[#7F7B82]">
            Target:{" "}
            <span className="font-semibold text-emerald-500">
              {chamber.target > 0 ? `${chamber.target}°C` : "Passive"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
