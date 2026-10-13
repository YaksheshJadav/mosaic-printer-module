// app/page.jsx
"use client";

import Link from "next/link";
import { Printer, ArrowRight, Activity, Settings } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function Home() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <div className="p-6 md:p-8 max-w-5xl transition-colors">
      <div className="mb-8">
        <h1
          className={`text-2xl md:text-3xl font-bold tracking-tight ${
            isLight ? "text-[#080808]" : "text-[#FDFDFD]"
          }`}
        >
          MOSAIC System Dashboard
        </h1>
        <p className="mt-1 text-sm text-[#7F7B82]">
          Modular Observability System for Asset Inventory and Coordination
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Module Link: Printer Management */}
        <Link
          href="/printers"
          className={`group block p-5 rounded-xl border transition-all ${
            isLight
              ? "bg-white border-zinc-200 hover:border-[#5F00BA] hover:shadow-md"
              : "bg-[#141414] border-white/10 hover:border-[#5F00BA] hover:shadow-lg"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="p-2.5 rounded-lg bg-[#5F00BA]/10 text-[#5F00BA]">
              <Printer className="w-6 h-6" />
            </div>
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                isLight
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active System
            </span>
          </div>

          <div className="mt-4">
            <h2
              className={`text-base font-bold group-hover:text-[#5F00BA] transition-colors flex items-center justify-between ${
                isLight ? "text-[#080808]" : "text-[#FDFDFD]"
              }`}
            >
              <span>Printers & Telemetry</span>
              <ArrowRight className="w-4 h-4 text-[#7F7B82] group-hover:text-[#5F00BA] transition-transform group-hover:translate-x-1" />
            </h2>
            <p className="text-xs text-[#7F7B82] mt-1.5 leading-relaxed">
              Real-time fleet monitoring, printer status telemetry, and detailed diagnostics for all 3D printers.
            </p>
          </div>

          <div
            className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-medium text-[#5F00BA] ${
              isLight ? "border-zinc-100" : "border-white/5"
            }`}
          >
            <span>Open fleet monitor</span>
            <Activity className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Quick Link: Settings & Preferences */}
        <Link
          href="/settings"
          className={`group block p-5 rounded-xl border transition-all ${
            isLight
              ? "bg-white border-zinc-200 hover:border-[#5F00BA] hover:shadow-md"
              : "bg-[#141414] border-white/10 hover:border-[#5F00BA] hover:shadow-lg"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300">
              <Settings className="w-6 h-6" />
            </div>
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                isLight
                  ? "bg-zinc-100 text-zinc-700 border-zinc-200"
                  : "bg-white/5 text-zinc-400 border-white/10"
              }`}
            >
              Config
            </span>
          </div>

          <div className="mt-4">
            <h2
              className={`text-base font-bold group-hover:text-[#5F00BA] transition-colors flex items-center justify-between ${
                isLight ? "text-[#080808]" : "text-[#FDFDFD]"
              }`}
            >
              <span>Settings & Preferences</span>
              <ArrowRight className="w-4 h-4 text-[#7F7B82] group-hover:text-[#5F00BA] transition-transform group-hover:translate-x-1" />
            </h2>
            <p className="text-xs text-[#7F7B82] mt-1.5 leading-relaxed">
              Configure system themes (Light, Dark, System), notifications, telemetry rates, and unit preferences.
            </p>
          </div>

          <div
            className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-medium text-[#5F00BA] ${
              isLight ? "border-zinc-100" : "border-white/5"
            }`}
          >
            <span>Manage preferences</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>
    </div>
  );
}