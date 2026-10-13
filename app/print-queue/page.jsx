// app/print-queue/page.jsx
"use client";
import { ListOrdered } from "lucide-react";
import ComingSoon from "@/components/ComingSoon";

export default function PrintQueuePage() {
  return (
    <ComingSoon
      moduleName="Print Queue"
      icon={ListOrdered}
      description="Schedule, prioritize, and dispatch print jobs to your 3D printer fleet."
    />
  );
}
