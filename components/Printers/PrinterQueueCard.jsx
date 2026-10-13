// components/Printers/PrinterQueueCard.jsx
"use client";

import { ListOrdered, Clock, User } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function PrinterQueueCard({ queue = [] }) {
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
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3
            className={`text-base font-bold ${
              isLight ? "text-[#080808]" : "text-[#FDFDFD]"
            }`}
          >
            Machine Job Queue
          </h3>
          <p className="text-xs text-[#7F7B82]">
            Next scheduled prints assigned to this machine.
          </p>
        </div>
        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/10 text-[#7F7B82]">
          {queue.length} in queue
        </span>
      </div>

      {queue.length === 0 ? (
        <div className="py-6 text-center text-xs text-[#7F7B82]">
          Queue is clear. No upcoming jobs scheduled for this machine.
        </div>
      ) : (
        <div className="space-y-2.5">
          {queue.map((item, index) => (
            <div
              key={item.id}
              className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                isLight
                  ? "bg-zinc-50 border-zinc-200"
                  : "bg-white/[0.02] border-white/5"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-white/10 text-xs font-mono font-bold flex items-center justify-center shrink-0 text-[#7F7B82]">
                  {index + 1}
                </span>

                <div className="min-w-0">
                  <span
                    className={`text-xs font-bold block truncate ${
                      isLight ? "text-[#080808]" : "text-[#FDFDFD]"
                    }`}
                    title={item.name}
                  >
                    {item.name}
                  </span>
                  <span className="text-[11px] text-[#7F7B82] block truncate">
                    {item.project} • Queued by {item.queuedBy}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-mono font-semibold text-[#5F00BA] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.estimatedDuration}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
