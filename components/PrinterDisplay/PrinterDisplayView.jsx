// components/PrinterDisplay/PrinterDisplayView.jsx
"use client";

import { useState, useEffect, useMemo } from "react";
import PrinterDisplayHeader from "./PrinterDisplayHeader";
import PrinterPanel from "./PrinterPanel";
import { getDummyPrinters, getTestPrinters } from "@/data/printers";
import { ThemeProvider, useTheme } from "@/components/ThemeContext";

/**
 * TEST_SET constant for testing different scenarios:
 * - null: Default dummy data (Printer 01 printing at 67%, Printer 02 ready, Printer 03 printing at 32%)
 * - 0: Edge cases (Printer 01 PAUSED with extra long strings, Printer 02 ERROR at 88%, Printer 03 OFFLINE)
 * - 1: Edge cases (Printer 01 IDLE, Printer 02 PRINTING at 0%, Printer 03 PRINTING at 100% finished)
 */
const TEST_SET = null;

function PrinterDisplayInner({ defaultFullscreen = false }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [printers, setPrinters] = useState([]);
  const [now, setNow] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(defaultFullscreen);

  const isLight = resolvedTheme === "light";

  useEffect(() => {
    let isSubscribed = true;
    const initialNow = new Date();
    const data =
      TEST_SET !== null
        ? getTestPrinters(TEST_SET, initialNow)
        : getDummyPrinters(initialNow);

    const rafId = requestAnimationFrame(() => {
      if (!isSubscribed) return;
      setPrinters(data);
      setNow(initialNow);
      setMounted(true);
    });

    // Real-time live tick timer updating every second
    const intervalId = setInterval(() => {
      if (!isSubscribed) return;
      setNow(new Date());
    }, 1000);

    return () => {
      isSubscribed = false;
      cancelAnimationFrame(rafId);
      clearInterval(intervalId);
    };
  }, []);

  // Compute latest updatedAt among printers for the header
  const latestUpdatedAt = useMemo(() => {
    if (!printers || printers.length === 0) return null;
    const timestamps = printers
      .map((p) => p.updatedAt)
      .filter(Boolean)
      .map((iso) => new Date(iso).getTime())
      .filter((ts) => !isNaN(ts));

    if (timestamps.length === 0) return null;
    return new Date(Math.max(...timestamps));
  }, [printers]);

  // Avoid hydration mismatch by waiting for client mount
  if (!mounted) {
    return (
      <div
        className={`h-full w-full rounded-2xl flex items-center justify-center select-none p-8 min-h-[400px] transition-colors ${
          isLight ? "bg-[#F4F4F5] text-[#080808]" : "bg-[#080808] text-[#FDFDFD]"
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 rounded-full border-2 border-[#5F00BA] border-t-transparent animate-spin" />
          <p className="text-sm font-medium tracking-wider text-[#7F7B82] uppercase">
            Loading printers…
          </p>
        </div>
      </div>
    );
  }

  const containerClasses = isFullscreen
    ? `fixed inset-0 z-50 flex flex-col h-screen w-screen overflow-hidden select-none transition-colors ${
        isLight ? "bg-[#F4F4F5] text-[#080808]" : "bg-[#080808] text-[#FDFDFD]"
      }`
    : `h-full w-full flex flex-col rounded-2xl overflow-hidden select-none min-h-0 transition-colors ${
        isLight ? "bg-[#F4F4F5] text-[#080808]" : "bg-[#080808] text-[#FDFDFD]"
      }`;

  return (
    <div className={containerClasses}>
      {/* Header telemetry bar with 3-way theme selector & live clock */}
      <PrinterDisplayHeader
        lastUpdated={latestUpdatedAt}
        currentTime={now}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen((prev) => !prev)}
      />

      {/* Main 3-panel monitor layout */}
      <main className="flex-1 min-h-0 p-3 sm:p-4 2xl:p-6 overflow-hidden">
        <div className="grid grid-cols-3 gap-3 sm:gap-4 2xl:gap-6 h-full min-h-0 w-full">
          {printers.map((printer) => (
            <PrinterPanel
              key={printer.id}
              printer={printer}
              currentTime={now}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default function PrinterDisplayView(props) {
  return (
    <ThemeProvider>
      <PrinterDisplayInner {...props} />
    </ThemeProvider>
  );
}
