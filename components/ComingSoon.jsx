// components/ComingSoon.jsx
// Shared placeholder for modules not yet implemented.
// Uses useTheme so it picks up the app theme correctly.
"use client";

import { useTheme } from "@/components/ThemeProvider";

export default function ComingSoon({ moduleName, icon: Icon, description }) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-8">
        <h1
          className={`text-2xl md:text-3xl font-bold tracking-tight ${
            isLight ? "text-[#080808]" : "text-[#FDFDFD]"
          }`}
        >
          {moduleName}
        </h1>
        <p className="mt-1 text-sm text-[#7F7B82]">
          {description || "This module is under active development."}
        </p>
      </div>

      <div
        className={`flex flex-col items-center justify-center py-20 rounded-2xl border ${
          isLight
            ? "bg-white border-zinc-200 shadow-sm"
            : "bg-[#111111] border-white/10"
        }`}
      >
        {Icon && (
          <div
            className={`p-4 rounded-2xl mb-4 ${
              isLight ? "bg-zinc-100 text-zinc-400" : "bg-white/5 text-zinc-500"
            }`}
          >
            <Icon className="w-10 h-10" />
          </div>
        )}
        <p
          className={`text-base font-bold ${
            isLight ? "text-[#080808]" : "text-[#FDFDFD]"
          }`}
        >
          Coming Soon
        </p>
        <p className="text-xs text-[#7F7B82] mt-1 text-center max-w-xs">
          This module is being built. It will integrate with the MOSAIC system
          when ready.
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full bg-[#5F00BA]/10 text-[#5F00BA] border border-[#5F00BA]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5F00BA] animate-pulse" />
          In Development
        </span>
      </div>
    </div>
  );
}
