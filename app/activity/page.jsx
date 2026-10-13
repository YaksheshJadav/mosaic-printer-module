// app/activity/page.jsx
"use client";
import { Activity } from "lucide-react";
import ComingSoon from "@/components/ComingSoon";

export default function ActivityPage() {
  return (
    <ComingSoon
      moduleName="Activity"
      icon={Activity}
      description="System-wide event log: all printer events, operator actions, and audit trail."
    />
  );
}
