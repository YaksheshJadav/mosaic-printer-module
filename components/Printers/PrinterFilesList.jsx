// components/Printers/PrinterFilesList.jsx
"use client";

import { FileCode, Download, FileText } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function PrinterFilesList({ files = [] }) {
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
            Files for this Job
          </h3>
          <p className="text-xs text-[#7F7B82]">
            Production sliced files, build plate configurations, and master CAD models.
          </p>
        </div>
        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/10 text-[#7F7B82]">
          {files.length} files
        </span>
      </div>

      {files.length === 0 ? (
        <div className="py-6 text-center text-xs text-[#7F7B82]">
          No production files associated with this job yet.
        </div>
      ) : (
        <div className="divide-y divide-zinc-100 dark:divide-white/5">
          {files.map((file) => (
            <div
              key={file.id}
              className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 min-w-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    file.type === "GCODE"
                      ? "bg-[#5F00BA]/10 text-[#5F00BA]"
                      : file.type === "3MF"
                      ? "bg-blue-500/10 text-blue-500"
                      : "bg-emerald-500/10 text-emerald-500"
                  }`}
                >
                  <FileCode className="w-4 h-4" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-sm font-semibold truncate ${
                        isLight ? "text-[#080808]" : "text-[#FDFDFD]"
                      }`}
                      title={file.name}
                    >
                      {file.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-white/10 text-[#7F7B82]">
                      {file.type}
                    </span>
                    <span className="text-[10px] text-[#7F7B82] font-mono">
                      {file.version}
                    </span>
                  </div>

                  <p className="text-xs text-[#7F7B82] mt-0.5">
                    {file.size} • Uploaded {file.uploadedAt}
                  </p>
                </div>
              </div>

              {/* Download button (UI only) */}
              <button
                type="button"
                className={`p-2 rounded-lg border transition-colors shrink-0 ${
                  isLight
                    ? "text-zinc-600 hover:text-[#080808] hover:bg-zinc-100 border-zinc-200"
                    : "text-zinc-300 hover:text-white hover:bg-white/10 border-white/10"
                }`}
                title={`Download ${file.name}`}
                aria-label={`Download ${file.name}`}
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
