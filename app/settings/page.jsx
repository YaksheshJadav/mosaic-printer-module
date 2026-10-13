// app/settings/page.jsx
"use client";

import { Sun, Moon, Monitor, CheckCircle2, Sliders, Bell, Cpu, ShieldCheck } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function SettingsPage() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  const themeOptions = [
    {
      id: "light",
      label: "Light",
      description: "Clean white surface with high-contrast operational text.",
      icon: Sun,
      previewBg: "bg-[#FDFDFD]",
      previewCard: "bg-white border-zinc-200",
      previewAccent: "bg-[#5F00BA]",
    },
    {
      id: "dark",
      label: "Dark",
      description: "Obsidian dark theme optimized for low-light workshop environments.",
      icon: Moon,
      previewBg: "bg-[#080808]",
      previewCard: "bg-[#141414] border-white/10",
      previewAccent: "bg-[#5F00BA]",
    },
    {
      id: "system",
      label: "System",
      description: "Automatically synchronize with your device's system theme preference.",
      icon: Monitor,
      previewBg: "bg-gradient-to-r from-[#FDFDFD] to-[#080808]",
      previewCard: "bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700",
      previewAccent: "bg-[#5F00BA]",
    },
  ];

  return (
    <div className="p-6 md:p-8 max-w-5xl transition-colors">
      {/* Header */}
      <div className="mb-8">
        <h1
          className={`text-2xl md:text-3xl font-bold tracking-tight ${
            isLight ? "text-[#080808]" : "text-[#FDFDFD]"
          }`}
        >
          Settings
        </h1>
        <p className="mt-1 text-sm text-[#7F7B82]">
          Manage your system configuration, display options, and hardware preferences.
        </p>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-white/10 pb-3 mb-8 text-sm">
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#5F00BA]/10 text-[#5F00BA] font-semibold"
        >
          <Sliders className="w-4 h-4" />
          <span>Preferences</span>
        </button>
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[#7F7B82] hover:text-[#080808] dark:hover:text-[#FDFDFD] transition-colors"
        >
          <Cpu className="w-4 h-4" />
          <span>Hardware</span>
        </button>
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[#7F7B82] hover:text-[#080808] dark:hover:text-[#FDFDFD] transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span>Alerts</span>
        </button>
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[#7F7B82] hover:text-[#080808] dark:hover:text-[#FDFDFD] transition-colors"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>System</span>
        </button>
      </div>

      {/* Preferences Section */}
      <div className="space-y-8">
        {/* THEME SECTION */}
        <section
          className={`p-6 rounded-2xl border transition-all ${
            isLight
              ? "bg-white border-zinc-200 shadow-sm"
              : "bg-[#111111] border-white/10"
          }`}
        >
          <div className="mb-5">
            <h2
              className={`text-lg font-bold ${
                isLight ? "text-[#080808]" : "text-[#FDFDFD]"
              }`}
            >
              Theme
            </h2>
            <p className="text-xs text-[#7F7B82] mt-1">
              Select your appearance preference. Default is Light. Changes apply across the entire application instantly.
            </p>
          </div>

          {/* 3 Selectable Cards for Light, Dark, System */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themeOptions.map((opt) => {
              const isSelected = theme === opt.id;
              const Icon = opt.icon;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTheme(opt.id)}
                  className={`text-left p-4 rounded-xl border-2 transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? "border-[#5F00BA] bg-[#5F00BA]/[0.03] ring-1 ring-[#5F00BA]"
                      : isLight
                      ? "border-zinc-200 hover:border-zinc-300 bg-zinc-50/50"
                      : "border-white/5 hover:border-white/15 bg-white/[0.02]"
                  }`}
                  aria-pressed={isSelected}
                >
                  {/* Top Bar with Icon & Radio Check */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`p-2 rounded-lg ${
                          isSelected
                            ? "bg-[#5F00BA] text-white"
                            : isLight
                            ? "bg-zinc-200/80 text-zinc-700"
                            : "bg-white/10 text-zinc-300"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-[#5F00BA]" />
                      ) : (
                        <div
                          className={`w-4 h-4 rounded-full border ${
                            isLight ? "border-zinc-300" : "border-zinc-700"
                          }`}
                        />
                      )}
                    </div>

                    <h3
                      className={`text-base font-bold mb-1 ${
                        isSelected
                          ? "text-[#5F00BA]"
                          : isLight
                          ? "text-[#080808]"
                          : "text-[#FDFDFD]"
                      }`}
                    >
                      {opt.label}
                    </h3>
                    <p className="text-xs text-[#7F7B82] leading-relaxed">
                      {opt.description}
                    </p>
                  </div>

                  {/* Visual Preview Bar */}
                  <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-white/5 flex items-center gap-2">
                    <span className="text-[10px] uppercase font-semibold text-[#7F7B82]">
                      Preview:
                    </span>
                    <div className="flex items-center gap-1.5 flex-1">
                      <div
                        className={`h-4 w-10 rounded border border-zinc-300/40 ${opt.previewBg}`}
                      />
                      <div className="h-4 w-4 rounded-full bg-[#5F00BA]" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active status indicator */}
          <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between text-xs text-[#7F7B82]">
            <span>
              Current Active Appearance:{" "}
              <strong
                className={`capitalize font-semibold ${
                  isLight ? "text-[#080808]" : "text-[#FDFDFD]"
                }`}
              >
                {resolvedTheme} Mode
              </strong>{" "}
              {theme === "system" && "(following OS)"}
            </span>
            <span className="font-mono text-[11px]">Storage: localStorage (persisted)</span>
          </div>
        </section>

        {/* WORKSPACE & TELEMETRY PREFERENCES */}
        <section
          className={`p-6 rounded-2xl border transition-all ${
            isLight
              ? "bg-white border-zinc-200 shadow-sm"
              : "bg-[#111111] border-white/10"
          }`}
        >
          <div className="mb-4">
            <h2
              className={`text-lg font-bold ${
                isLight ? "text-[#080808]" : "text-[#FDFDFD]"
              }`}
            >
              Telemetry & Display Units
            </h2>
            <p className="text-xs text-[#7F7B82] mt-0.5">
              Unit standards for temperature sensors, time formats, and update frequency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div
              className={`p-3.5 rounded-xl border ${
                isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/[0.02] border-white/5"
              }`}
            >
              <span className="text-[10px] font-semibold uppercase text-[#7F7B82] block">
                Temperature Unit
              </span>
              <span
                className={`text-sm font-bold block mt-1 ${
                  isLight ? "text-[#080808]" : "text-[#FDFDFD]"
                }`}
              >
                Celsius (°C)
              </span>
            </div>

            <div
              className={`p-3.5 rounded-xl border ${
                isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/[0.02] border-white/5"
              }`}
            >
              <span className="text-[10px] font-semibold uppercase text-[#7F7B82] block">
                Clock Time Format
              </span>
              <span
                className={`text-sm font-bold block mt-1 ${
                  isLight ? "text-[#080808]" : "text-[#FDFDFD]"
                }`}
              >
                24-Hour (HH:mm:ss)
              </span>
            </div>

            <div
              className={`p-3.5 rounded-xl border ${
                isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/[0.02] border-white/5"
              }`}
            >
              <span className="text-[10px] font-semibold uppercase text-[#7F7B82] block">
                Telemetry Refresh
              </span>
              <span
                className={`text-sm font-bold block mt-1 ${
                  isLight ? "text-[#080808]" : "text-[#FDFDFD]"
                }`}
              >
                Live (1 second tick)
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
