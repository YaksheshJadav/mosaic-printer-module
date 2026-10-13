"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Box,
  FolderKanban,
  ListOrdered,
  Spool,
  Printer,
  Activity,
  Settings,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const items = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Objects", href: "/objects", icon: Box },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Print Queue", href: "/print-queue", icon: ListOrdered },
  { label: "Filament", href: "/filament", icon: Spool },
  { label: "Printers", href: "/printers", icon: Printer },
  { label: "Activity", href: "/activity", icon: Activity },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <aside
      className={`w-60 shrink-0 p-4 flex flex-col justify-between transition-colors select-none ${
        isLight
          ? "bg-[#FDFDFD] text-[#080808] border-r border-zinc-200"
          : "bg-[#080808] text-[#FDFDFD] border-r border-white/5"
      }`}
    >
      <div className="flex flex-col gap-6">
        <div className="px-2 text-xl font-black tracking-wide flex items-center justify-between">
          <span>MOSAIC</span>
        </div>
        <nav className="flex flex-col gap-1">
          {items.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? isLight
                      ? "bg-zinc-100 text-[#080808] border-l-4 border-[#5F00BA] font-semibold"
                      : "bg-[#FDFDFD] text-[#080808] border-l-4 border-[#5F00BA] font-semibold"
                    : isLight
                    ? "text-[#7F7B82] hover:text-[#080808] hover:bg-zinc-100"
                    : "text-[#7F7B82] hover:text-[#FDFDFD] hover:bg-white/5"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Clean operational footer */}
      <div className="px-2 py-3 border-t border-zinc-200/50 dark:border-white/5 text-[11px] text-[#7F7B82] flex items-center justify-between">
        <span className="font-mono">v1.2.0-rc</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Online</span>
        </span>
      </div>
    </aside>
  );
}