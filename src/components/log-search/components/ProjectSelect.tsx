"use client";

import { ExtendedLabel } from "@/components/basic-ui/ExtendedLabel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project } from "@/types/Project";

interface ProjectSelectProps {
  projects: Project[];
  selectedProjectId: string;
  setSelectedProjectId: (value: string) => void;
}

export function ProjectSelect({
  projects,
  selectedProjectId,
  setSelectedProjectId,
}: ProjectSelectProps) {
  return (
    <div className="space-y-2">
      <ExtendedLabel>Project</ExtendedLabel>
      <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
        <SelectTrigger id="project-filter">
          <SelectValue placeholder="All Projects" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Projects</SelectItem>
          {projects.map((project) => (
            <SelectItem key={project._id} value={project._id!}>
              {project.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
