// components/Printers/PrintHistoryCard.jsx
"use client";

import { useTheme } from "@/components/ThemeProvider";
import { CheckCircle2, XCircle, MinusCircle } from "lucide-react";

const resultConfig = {
  Success: {
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    label: "Success",
  },
  Failed: {
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-500/10",
    label: "Failed",
  },
  Cancelled: {
    icon: MinusCircle,
    color: "text-[#7F7B82]",
    bg: "bg-zinc-100 dark:bg-white/5",
    label: "Cancelled",
  },
};

export default function PrintHistoryCard({ history = [] }) {
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
            Print History
          </h3>
          <p className="text-xs text-[#7F7B82]">
            Recent completed jobs on this machine.
          </p>
        </div>
        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/10 text-[#7F7B82]">
          {history.length} jobs
        </span>
      </div>

      {history.length === 0 ? (
        <div className="py-6 text-center text-xs text-[#7F7B82]">
          No print history recorded for this machine yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[560px]">
            <thead>
              <tr
                className={`border-b ${
                  isLight ? "border-zinc-100" : "border-white/5"
                }`}
              >
                {["Print Name", "Project", "Operator", "Started", "Duration", "Filament", "Result"].map(
                  (col) => (
                    <th
                      key={col}
                      className="text-left py-2 pr-3 text-[10px] uppercase font-semibold text-[#7F7B82] last:pr-0"
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-white/5">
              {history.map((row) => {
                const cfg =
                  resultConfig[row.result] || resultConfig["Cancelled"];
                const Ic = cfg.icon;
                return (
                  <tr key={row.id}>
                    <td
                      className={`py-2.5 pr-3 font-semibold truncate max-w-[140px] ${
                        isLight ? "text-[#080808]" : "text-[#FDFDFD]"
                      }`}
                      title={row.name}
                    >
                      {row.name}
                    </td>
                    <td className="py-2.5 pr-3 text-[#7F7B82] truncate max-w-[100px]">
                      {row.project}
                    </td>
                    <td className="py-2.5 pr-3 text-[#7F7B82] truncate max-w-[100px]">
                      {row.printedBy}
                    </td>
                    <td className="py-2.5 pr-3 text-[#7F7B82] font-mono whitespace-nowrap">
                      {row.startedAt}
                    </td>
                    <td className="py-2.5 pr-3 font-mono text-[#7F7B82]">
                      {row.duration}
                    </td>
                    <td className="py-2.5 pr-3 font-mono text-[#7F7B82]">
                      {row.filamentUsed}
                    </td>
                    <td className="py-2.5">
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${cfg.color} ${cfg.bg}`}
                      >
                        <Ic className="w-3 h-3" />
                        {cfg.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
