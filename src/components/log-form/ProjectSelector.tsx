"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Project } from "@/types/Project";
import React from "react";

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
  return (
    <div className="space-y-2">
      <Label className="text-lg font-medium text-foreground">Project</Label>
      {projects.length > 0 && (
        <div className="flex items-center space-x-4">
          <Button
            type="button"
            variant={!isCreatingNewProject ? "default" : "outline"}
            onClick={() => setIsCreatingNewProject(false)}
          >
            Select Existing
          </Button>
          <Button
            type="button"
            variant={isCreatingNewProject ? "default" : "outline"}
            onClick={() => setIsCreatingNewProject(true)}
          >
            New Project
          </Button>
        </div>
      )}

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
