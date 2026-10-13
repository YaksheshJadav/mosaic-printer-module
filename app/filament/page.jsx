// app/filament/page.jsx
"use client";
import { Spool } from "lucide-react";
import ComingSoon from "@/components/ComingSoon";

export default function FilamentPage() {
  return (
    <ComingSoon
      moduleName="Filament"
      icon={Spool}
      description="Track filament spools, material inventory, consumption per print, and reorder alerts."
    />
  );
}
