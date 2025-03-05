"use client";

import { useLogs } from "@/hooks/useLogs";
import { useProjects } from "@/hooks/useProjects";
import { useState } from "react";
import { LogPopulated } from "@/types/Log";
import { LogTabs } from "./components/LogTabs";
import { AddLogTab } from "./components/AddLogTab";
import { ViewLogsTab } from "./components/ViewLogsTab";
import { ErrorMessage } from "../basic-ui/ErrorMessage";

export function LogManager() {
  const {
    logs,
    isLoading: isLogsLoading,
    isError: isLogsError,
    addLog,
    deleteLog,
    isDeleting,
  } = useLogs();

  const {
    projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    addProject,
    isSubmitting,
  } = useProjects();

  const [filteredLogs, setFilteredLogs] = useState<LogPopulated[]>(logs ?? []);

  const handleFilter = (filtered: LogPopulated[]) => setFilteredLogs(filtered);

  if (
    (isLogsError && !isLogsLoading) ||
    (isProjectsError && !isProjectsLoading)
  ) {
    return <ErrorMessage message="Error loading logs" />;
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <LogTabs>
        <AddLogTab
          isLoading={isProjectsLoading}
          projects={projects ?? []}
          onAddProject={addProject}
          onSubmitLog={addLog}
          isSubmitting={isSubmitting}
        />
        <ViewLogsTab
          logs={logs ?? []}
          filteredLogs={filteredLogs ?? []}
          projects={projects ?? []}
          isLogsLoading={isLogsLoading || isDeleting}
          onFilter={handleFilter}
          onDeleteLog={deleteLog}
        />
      </LogTabs>
    </div>
  );
}
