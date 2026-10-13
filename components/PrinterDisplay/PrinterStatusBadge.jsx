// components/PrinterDisplay/PrinterStatusBadge.jsx
"use client";

import { useTheme } from "@/components/ThemeContext";

/**
 * Status configurations for both dark and light modes
 */
const STATUS_CONFIG_DARK = {
  PRINTING: {
    label: "PRINTING",
    textColor: "text-[#c084fc]",
    bgColor: "bg-[#5F00BA]/15",
    borderColor: "border-[#5F00BA]/60",
    dotColor: "bg-[#9333ea]",
    isPulsing: true,
  },
  READY: {
    label: "READY",
    textColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/40",
    dotColor: "bg-emerald-400",
    isPulsing: false,
  },
  IDLE: {
    label: "IDLE",
    textColor: "text-[#a39fa6]",
    bgColor: "bg-[#7F7B82]/10",
    borderColor: "border-[#7F7B82]/30",
    dotColor: "bg-[#7F7B82]",
    isPulsing: false,
  },
  PAUSED: {
    label: "PAUSED",
    textColor: "text-[#fb923c]",
    bgColor: "bg-[#F37021]/15",
    borderColor: "border-[#F37021]/60",
    dotColor: "bg-[#F37021]",
    isPulsing: false,
  },
  OFFLINE: {
    label: "OFFLINE",
    textColor: "text-zinc-400",
    bgColor: "bg-zinc-900/60",
    borderColor: "border-zinc-800",
    dotColor: "bg-zinc-600",
    isPulsing: false,
  },
  ERROR: {
    label: "ERROR",
    textColor: "text-red-400",
    bgColor: "bg-red-500/15",
    borderColor: "border-red-500/60",
    dotColor: "bg-red-500",
    isPulsing: false,
  },
};

const STATUS_CONFIG_LIGHT = {
  PRINTING: {
    label: "PRINTING",
    textColor: "text-[#5F00BA]",
    bgColor: "bg-[#5F00BA]/10",
    borderColor: "border-[#5F00BA]/40",
    dotColor: "bg-[#5F00BA]",
    isPulsing: true,
  },
  READY: {
    label: "READY",
    textColor: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-300",
    dotColor: "bg-emerald-600",
    isPulsing: false,
  },
  IDLE: {
    label: "IDLE",
    textColor: "text-zinc-600",
    bgColor: "bg-zinc-100",
    borderColor: "border-zinc-300",
    dotColor: "bg-zinc-500",
    isPulsing: false,
  },
  PAUSED: {
    label: "PAUSED",
    textColor: "text-[#F37021]",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-300",
    dotColor: "bg-[#F37021]",
    isPulsing: false,
  },
  OFFLINE: {
    label: "OFFLINE",
    textColor: "text-zinc-500",
    bgColor: "bg-zinc-100",
    borderColor: "border-zinc-300",
    dotColor: "bg-zinc-400",
    isPulsing: false,
  },
  ERROR: {
    label: "ERROR",
    textColor: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-300",
    dotColor: "bg-red-600",
    isPulsing: false,
  },
};

export default function PrinterStatusBadge({ status = "IDLE" }) {
  const { resolvedTheme } = useTheme();
  const normalizedStatus = (status || "IDLE").toUpperCase();
  const configMap = resolvedTheme === "light" ? STATUS_CONFIG_LIGHT : STATUS_CONFIG_DARK;
  const config = configMap[normalizedStatus] || configMap.IDLE;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold tracking-wider border uppercase transition-colors ${config.bgColor} ${config.borderColor} ${config.textColor}`}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        {config.isPulsing && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dotColor}`}
          />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${config.dotColor}`}
        />
      </span>
      <span>{config.label}</span>
    </span>
  );
}
