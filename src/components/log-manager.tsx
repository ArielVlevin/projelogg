"use client";

import { useLogs } from "@/hooks/useLogs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useProjects } from "@/hooks/useProjects";
import { LogTable } from "./table/log-table";
import { LogFormSkeleton } from "./log-form/formSkeleton";
import { LogTableSkeleton } from "./table/tableSkeleton";
import { LogForm } from "./log-form/LogForm";
import { useState } from "react";
import { LogPopulated } from "@/types/Log";
import { LogSearch } from "./log-search/LogSearch";

export function LogManager() {
  const {
    logs,
    isLoading: isLogsLoading,
    isError: isLogsError,
    addLog,
    deleteLog,
  } = useLogs();
  const {
    projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    addProject,
    isSubmitting,
  } = useProjects();

  const [filteredLogs, setFilteredLogs] = useState<LogPopulated[]>(logs ?? []);

  // 🔹 עדכון הלוגים המסוננים לפי מה שחוזר מ-LogSearch
  const handleFilter = (filtered: LogPopulated[]) => {
    setFilteredLogs(filtered);
  };

  if (
    (isLogsError && !isLogsLoading) ||
    (isProjectsError && !isProjectsLoading)
  )
    return <p className="text-red-500">Error loading logs</p>;

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <Tabs defaultValue="add" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="add">Add New Log</TabsTrigger>
          <TabsTrigger value="view">View Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="add">
          <Card className="p-6">
            {isProjectsLoading ? (
              <LogFormSkeleton />
            ) : (
              <LogForm
                projects={projects ?? []}
                onAddNewProject={addProject}
                onSubmit={addLog}
                isSubmitting={isSubmitting}
              />
            )}
          </Card>
        </TabsContent>

        <TabsContent value="view">
          <Card className="p-6 mb-6">
            <LogSearch
              logs={logs ?? []} // תיקון הלוגים כך שלא יהיה undefined
              projects={projects ?? []}
              onFilter={handleFilter} // שימוש בפונקציה שמעדכנת את הסטייט של הלוגים המסוננים
            />
          </Card>
          {isLogsLoading ? (
            <LogTableSkeleton />
          ) : (
            <LogTable logs={filteredLogs ?? []} onDelete={deleteLog} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

///            <LogSearch logs={logs} projects={Projects} onFilter={addLog} />
