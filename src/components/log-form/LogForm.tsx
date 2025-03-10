"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNotification } from "@/contexts/NotificationContext";
import { Log } from "@/types/Log";
import { Project } from "@/types/Project";

import { ProjectSelector } from "./components/ProjectSelector";
import { ChangeTypeSelector } from "./components/TypeSelector";
import { TextField } from "../basic-ui/TextField";
import { Button } from "../theme/Button";
import { Title } from "../theme/Title";
import { Separator } from "../ui/separator";

interface LogFormProps {
  projects: Project[];
  onSubmit: (log: Log) => void;
  onAddNewProject: (newProject: Omit<Project, "_id">) => Promise<Project>;
  isSubmitting: boolean;
}

export function LogForm({
  projects,
  onSubmit,
  onAddNewProject,
  isSubmitting,
}: LogFormProps) {
  const { showError, showSuccess } = useNotification();
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [isCreatingNewProject, setIsCreatingNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const [changeType, setChangeType] = useState<"feature" | "bugfix">("feature");
  const [subtopic, setSubtopic] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let product_id = "";
    if (!subtopic || !description)
      return showError("Please fill in Subtopic and Description");

    if (isCreatingNewProject) {
      if (!newProjectName) return showError("Missing project name");
      try {
        const newProject: Project = {
          name: newProjectName,
        };
        const newProj = await onAddNewProject(newProject);
        product_id = newProj._id!;
        showSuccess(`New project "${newProj.name}" created successfully`);
      } catch (err) {
        return showError(`Error creating project: ${err}`);
      }
    } else if (!selectedProjectId)
      return showError("Please select a project or create a new one");

    try {
      const newLog: Log = {
        project_id: product_id || selectedProjectId,
        logType: changeType,
        subTopic: subtopic,
        description,
      };

      onSubmit(newLog);
      resetForm();
      showSuccess("Log added successfully");
    } catch (err) {
      showError(`Error adding log: ${err}`);
    }
  };

  const resetForm = () => {
    setSelectedProjectId("");
    setIsCreatingNewProject(false);
    setNewProjectName("");
    setChangeType("feature");
    setSubtopic("");
    setDescription("");
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit}>
        <CardHeader className="mb-4">
          <CardTitle>
            <Title as="h3" size="2xl">
              Add New Log Entry
            </Title>
          </CardTitle>
          <CardDescription>
            <Title as="h1" size="sm">
              Record a new feature or bug fix for your project
            </Title>
          </CardDescription>
        </CardHeader>
        <Separator className="my-2" />
        <CardContent className="space-y-4">
          <ProjectSelector
            projects={projects}
            selectedProjectId={selectedProjectId}
            setSelectedProjectId={setSelectedProjectId}
            isCreatingNewProject={isCreatingNewProject}
            setIsCreatingNewProject={setIsCreatingNewProject}
            newProjectName={newProjectName}
            setNewProjectName={setNewProjectName}
          />

          {/* Change Type */}
          <ChangeTypeSelector value={changeType} onChange={setChangeType} />

          {/* Subtopic */}
          <TextField
            label="Subtopic"
            placeholder="E.g., Authentication System"
            value={subtopic}
            onChange={setSubtopic}
          />

          {/* Description */}
          <TextField
            label="Description"
            placeholder="Describe what was changed or fixed..."
            value={description}
            onChange={setDescription}
            multiline
          />
        </CardContent>

        <CardFooter className="mt-4">
          <Button
            variant={"gradient"}
            disabled={isSubmitting}
            type="submit"
            className="w-full"
          >
            {isSubmitting ? "Saving..." : "Save Log Entry"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
