// app/projects/page.jsx
"use client";
import { FolderKanban } from "lucide-react";
import ComingSoon from "@/components/ComingSoon";

export default function ProjectsPage() {
  return (
    <ComingSoon
      moduleName="Projects"
      icon={FolderKanban}
      description="Organize prints into projects, track milestones, and manage multi-part assemblies."
    />
  );
}
