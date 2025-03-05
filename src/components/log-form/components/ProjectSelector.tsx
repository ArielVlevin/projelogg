"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Project } from "@/types/Project";
import React from "react";
import { ExtendedLabel } from "../../basic-ui/ExtendedLabel";
import { FileText, Plus } from "lucide-react";

interface ProjectSelectorProps {
  projects: Project[];
  selectedProjectId: string;
  isCreatingNewProject: boolean;
  newProjectName: string;
  setSelectedProjectId: (val: string) => void;
  setIsCreatingNewProject: (val: boolean) => void;
  setNewProjectName: (val: string) => void;
}

export function ProjectSelector({
  projects,
  selectedProjectId,
  isCreatingNewProject,
  newProjectName,
  setSelectedProjectId,
  setIsCreatingNewProject,
  setNewProjectName,
}: ProjectSelectorProps) {
  if (projects.length === 0) setIsCreatingNewProject(true);
  return (
    <div className="space-y-2">
      {projects.length > 0 && (
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant={!isCreatingNewProject ? "default" : "outline"}
            onClick={() => setIsCreatingNewProject(false)}
          >
            <FileText className="h-4 w-4" />
            Existing Project
          </Button>
          <Button
            type="button"
            variant={isCreatingNewProject ? "default" : "outline"}
            onClick={() => setIsCreatingNewProject(true)}
          >
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      )}
      <ExtendedLabel>Project</ExtendedLabel>

      {projects.length === 0 && (
        <p className="text-sm text-gray-500">
          No existing projects found. Create one below:
        </p>
      )}

      {!isCreatingNewProject && projects.length > 0 ? (
        <Select
          value={selectedProjectId}
          onValueChange={(val) => setSelectedProjectId(val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an existing project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((proj) => (
              <SelectItem key={proj._id} value={proj._id!}>
                {proj.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          placeholder="Enter a new project name"
          className="w-full"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />
      )}
    </div>
  );
}
