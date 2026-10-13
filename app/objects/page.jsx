// app/objects/page.jsx
"use client";
import { Box } from "lucide-react";
import ComingSoon from "@/components/ComingSoon";

export default function ObjectsPage() {
  return (
    <ComingSoon
      moduleName="Objects"
      icon={Box}
      description="Browse, version, and manage all 3D printable objects across your MOSAIC projects."
    />
  );
}
