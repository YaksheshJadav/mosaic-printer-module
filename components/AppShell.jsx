// components/AppShell.jsx
"use client";

import Sidebar from "@/components/Sidebar";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";

function AppShellContent({ children }) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <div
      className={`flex h-screen transition-colors duration-200 ${
        isLight ? "bg-[#F4F4F5] text-[#080808]" : "bg-[#080808] text-[#FDFDFD]"
      }`}
    >
      <Sidebar />
      <main
        className={`flex-1 m-2 ml-0 rounded-2xl overflow-y-auto transition-colors duration-200 ${
          isLight
            ? "bg-[#FDFDFD] text-[#080808] shadow-sm border border-zinc-200/60"
            : "bg-[#0f0f0f] text-[#FDFDFD] border border-white/5"
        }`}
      >
        {children}
      </main>
    </div>
  );
}

export default function AppShell({ children }) {
  return (
    <ThemeProvider>
      <AppShellContent>{children}</AppShellContent>
    </ThemeProvider>
  );
}
