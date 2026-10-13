// components/Printers/ActivityLogCard.jsx
"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Clock } from "lucide-react";

export default function ActivityLogCard({ activityLog = [] }) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <div
      className={`p-6 rounded-2xl border transition-all ${
        isLight
          ? "bg-white border-zinc-200 shadow-sm"
          : "bg-[#111111] border-white/10 shadow-lg"
      }`}
    >
      <div className="mb-4">
        <h3
          className={`text-base font-bold ${
            isLight ? "text-[#080808]" : "text-[#FDFDFD]"
          }`}
        >
          Activity Log
        </h3>
        <p className="text-xs text-[#7F7B82]">
          Timeline of recent events and operator actions on this printer.
        </p>
      </div>

      {activityLog.length === 0 ? (
        <div className="py-6 text-center text-xs text-[#7F7B82]">
          No recent activity recorded.
        </div>
      ) : (
        <div className="relative">
          {/* Vertical line */}
          <div
            className={`absolute left-[15px] top-2 bottom-2 w-px ${
              isLight ? "bg-zinc-200" : "bg-white/10"
            }`}
          />

          <div className="space-y-4 pl-9">
            {activityLog.map((entry) => (
              <div key={entry.id} className="relative">
                {/* Dot */}
                <div
                  className={`absolute -left-9 top-0.5 w-3 h-3 rounded-full border-2 ${
                    isLight
                      ? "border-[#5F00BA] bg-white"
                      : "border-[#5F00BA] bg-[#111111]"
                  }`}
                />

                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p
                      className={`text-xs font-semibold ${
                        isLight ? "text-[#080808]" : "text-[#FDFDFD]"
                      }`}
                    >
                      {entry.event}
                    </p>
                    <p className="text-[11px] text-[#7F7B82] mt-0.5">
                      {entry.actor}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#7F7B82] shrink-0 font-mono">
                    <Clock className="w-3 h-3" />
                    {entry.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
