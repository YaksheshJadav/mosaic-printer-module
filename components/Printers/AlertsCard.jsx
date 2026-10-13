// components/Printers/AlertsCard.jsx
"use client";

import { useTheme } from "@/components/ThemeProvider";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";

const alertStyle = {
  warning: {
    icon: AlertTriangle,
    color: "text-[#F37021]",
    border: "border-[#F37021]/30",
    bg: "bg-[#F37021]/10",
  },
  error: {
    icon: AlertCircle,
    color: "text-red-500",
    border: "border-red-500/30",
    bg: "bg-red-500/10",
  },
  info: {
    icon: Info,
    color: "text-blue-500",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
  },
};

export default function AlertsCard({ alerts = [] }) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  if (alerts.length === 0) return null;

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
          Active Alerts
        </h3>
        <p className="text-xs text-[#7F7B82]">
          Conditions that require attention on this printer.
        </p>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const style = alertStyle[alert.type] || alertStyle.info;
          const Icon = style.icon;
          return (
            <div
              key={alert.id}
              className={`flex items-start gap-3 p-3.5 rounded-xl border ${style.bg} ${style.border}`}
            >
              <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${style.color}`} />
              <div>
                <p
                  className={`text-sm font-bold ${style.color}`}
                >
                  {alert.title}
                </p>
                <p className="text-xs text-[#7F7B82] mt-0.5 leading-relaxed">
                  {alert.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
