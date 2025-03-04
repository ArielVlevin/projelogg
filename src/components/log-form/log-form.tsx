"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Log } from "@/types/Log";
import { Project } from "@/types/Project";
import { useNotification } from "@/context/NotificationContext";

interface LogFormProps {
  projects: Project[];
  onSubmit: (log: Log) => void;
  onAddNewProject: (newProject: Omit<Project, "_id">) => Promise<Project>;
  isSubmitting: boolean;
}

export function LogForm({
  projects,
  onSubmit,
  isSubmitting,
  onAddNewProject,
}: LogFormProps) {
  const { showError, showSuccess } = useNotification();
  const [selectedProject_id, setSelectedProject_id] = useState<string>("");
  const [isCreatingNewProject, setIsCreatingNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const [changeType, setChangeType] = useState<"feature" | "bugfix">("feature");
  const [subtopic, setSubtopic] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // בדיקות של שדות חובה
    if (!subtopic || !description)
      return showError("Please fill in Subtopic and Description");

    // כאשר בוחרים פרויקט חדש
    if (isCreatingNewProject) {
      if (!newProjectName) return showError("Missing project name");

      try {
        const newProject: Project = {
          name: newProjectName,
        };
        const newProj = await onAddNewProject(newProject);
        setSelectedProject_id(newProj._id!);

        showSuccess(`New project "${newProj.name}" created secussfully`);
      } catch (err) {
        showError(`Error creating project: ${err}`);
      }
    } else {
      if (!selectedProject_id)
        return showError(`Please select a project or create a new one`);
    }

    const newLog: Log = {
      project_id: selectedProject_id,
      logType: changeType,
      subTopic: subtopic,
      description,
    };
    onSubmit(newLog);

    cleanForm();

    showSuccess(`Log added successfully`);
  };

  const cleanForm = () => {
    setSelectedProject_id("");
    setNewProjectName("");
    setIsCreatingNewProject(false);
    setChangeType("feature");
    setSubtopic("");
    setDescription("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardHeader className="mb-4">
        <CardTitle className="text-2xl">Add New Log Entry</CardTitle>
        <CardDescription>
          Record a new feature or bug fix for your project
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* בחירת פרויקט קיים או יצירת חדש */}
        <div className="space-y-2">
          <Label className="text-lg font-medium text-foreground">Project</Label>
          <div className="flex space-x-4">
            {/* אם יש פרויקטים, מציגים כפתורי בחירה */}
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

            {!isCreatingNewProject && projects.length > 0 ? (
              <Select
                value={selectedProject_id}
                onValueChange={(val) => setSelectedProject_id(val)}
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
              // יוצרים פרויקט חדש – שדה טקסט
              <Input
                placeholder="Enter a new project name"
                className="w-full"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
              />
            )}
          </div>
        </div>

        {/* סוג השינוי (Feature/Bugfix) */}
        <div className="space-y-2">
          <Label className="text-lg font-medium text-foreground">
            Change Type
          </Label>
          <RadioGroup
            value={changeType}
            onValueChange={(value) =>
              setChangeType(value as "feature" | "bugfix")
            }
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="feature" id="feature" />
              <Label htmlFor="feature" className="cursor-pointer">
                🆕 New Feature
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bugfix" id="bugfix" />
              <Label htmlFor="bugfix" className="cursor-pointer">
                🐛 Bug Fix
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* תת-נושא */}
        <div className="space-y-2">
          <Label className="text-lg font-medium text-foreground">
            Subtopic
          </Label>
          <Input
            id="subtopic"
            placeholder="E.g., Authentication System, User Interface"
            value={subtopic}
            onChange={(e) => setSubtopic(e.target.value)}
          />
        </div>

        {/* תיאור */}
        <div className="space-y-2">
          <Label className="text-lg font-medium text-foreground">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Describe what was changed or fixed..."
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </CardContent>

      <CardFooter className="mt-4">
        <Button disabled={isSubmitting} type="submit" className="w-full">
          {!isSubmitting ? "Save Log Entry" : "Saving..."}
        </Button>
      </CardFooter>
    </form>
  );
}
