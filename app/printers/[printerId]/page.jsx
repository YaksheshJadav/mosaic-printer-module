// app/printers/[printerId]/page.jsx
// Full read-only printer detail page with all telemetry sections (A–L).
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Printer } from "lucide-react";

import { getPrinterDetail } from "@/data/printerDetails";
import { useTheme } from "@/components/ThemeProvider";

import PrinterDetailHeader from "@/components/Printers/PrinterDetailHeader";
import CurrentPrintCard from "@/components/Printers/CurrentPrintCard";
import PrinterFilesList from "@/components/Printers/PrinterFilesList";
import FilamentUsageCard from "@/components/Printers/FilamentUsageCard";
import TemperatureCard from "@/components/Printers/TemperatureCard";
import PrinterSettingsCard from "@/components/Printers/PrinterSettingsCard";
import PrinterCostTimeCard from "@/components/Printers/PrinterCostTimeCard";
import PrinterInfoCard from "@/components/Printers/PrinterInfoCard";
import PrinterQueueCard from "@/components/Printers/PrinterQueueCard";
import PrintHistoryCard from "@/components/Printers/PrintHistoryCard";
import ActivityLogCard from "@/components/Printers/ActivityLogCard";
import AlertsCard from "@/components/Printers/AlertsCard";

export default function PrinterDetailPage() {
  const { printerId } = useParams();
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  const [printer, setPrinter] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Resolve data after mount to avoid hydration mismatch
    const data = getPrinterDetail(printerId);
    setPrinter(data);
    setCurrentTime(new Date());
    setMounted(true);

    // Live clock tick every second
    const id = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(id);
  }, [printerId]);

  // Loading skeleton
  if (!mounted) {
    return (
      <div className="p-6 md:p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 rounded-full border-2 border-[#5F00BA] border-t-transparent animate-spin" />
          <p className="text-xs text-[#7F7B82] uppercase tracking-widest font-medium">
            Loading telemetry…
          </p>
        </div>
      </div>
    );
  }

  // Unknown printer ID
  if (!printer) {
    return (
      <div className="p-6 md:p-8">
        <Link
          href="/printers"
          className={`inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-colors ${
            isLight
              ? "text-[#7F7B82] hover:text-[#080808]"
              : "text-[#7F7B82] hover:text-[#FDFDFD]"
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Printers
        </Link>
        <div
          className={`flex flex-col items-center justify-center py-20 rounded-2xl border ${
            isLight
              ? "bg-white border-zinc-200"
              : "bg-[#111111] border-white/10"
          }`}
        >
          <Printer
            className={`w-10 h-10 mb-3 ${
              isLight ? "text-zinc-300" : "text-zinc-600"
            }`}
          />
          <p
            className={`text-base font-bold ${
              isLight ? "text-[#080808]" : "text-[#FDFDFD]"
            }`}
          >
            Printer not found
          </p>
          <p className="text-xs text-[#7F7B82] mt-1">
            No printer with ID{" "}
            <code className="font-mono bg-zinc-100 dark:bg-white/10 px-1 rounded">
              {printerId}
            </code>{" "}
            exists.
          </p>
          <Link
            href="/printers"
            className="mt-4 text-xs font-semibold text-[#5F00BA] hover:underline"
          >
            ← Back to fleet
          </Link>
        </div>
      </div>
    );
  }

  const isPrinting = printer.status === "PRINTING";

  return (
    <div className="p-4 md:p-6 max-w-6xl space-y-4">
      {/* A. Header */}
      <PrinterDetailHeader printer={printer} currentTime={currentTime} />

      {/* L. Alerts – shown at top if there are any */}
      {printer.alerts && printer.alerts.length > 0 && (
        <AlertsCard alerts={printer.alerts} />
      )}

      {/* B. Current Print (hero) */}
      <CurrentPrintCard
        currentPrint={printer.currentPrint}
        status={printer.status}
        currentTime={currentTime}
      />

      {/* Two-column grid for secondary sections */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* E. Temperatures */}
        <TemperatureCard temperatures={printer.temperatures} />

        {/* D. Filament */}
        <FilamentUsageCard filament={printer.filament} />
      </div>

      {/* F. Print Settings */}
      <PrinterSettingsCard settings={printer.printSettings} />

      {/* G. Cost & Time */}
      <PrinterCostTimeCard costAndTime={printer.costAndTime} />

      {/* C. Files – only shown when a job is active */}
      {printer.files && printer.files.length > 0 && (
        <PrinterFilesList files={printer.files} />
      )}

      {/* Two-column grid: Queue + Hardware Info */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* I. Queue */}
        <PrinterQueueCard queue={printer.queue} />

        {/* H. Printer Information */}
        <PrinterInfoCard printerInfo={printer.printerInfo} />
      </div>

      {/* J. Print History */}
      <PrintHistoryCard history={printer.history} />

      {/* K. Activity Log */}
      <ActivityLogCard activityLog={printer.activityLog} />
    </div>
  );
}
