"use client";

import { useLogs } from "@/hooks/useLogs";
import { LogForm } from "@/components/log-form/log-form";
import { LogSearch } from "@/components/log-search/log-search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useProjects } from "@/hooks/useProjects";
import { LogTable } from "./table/log-table";
import { LogFormSkeleton } from "./log-form/formSkeleton";
import { LogTableSkeleton } from "./table/tableSkeleton";

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

  if (
    (isLogsError && !isLogsLoading) ||
    (isProjectsError && !isProjectsLoading)
  )
    return <p className="text-red-500">Error loading logs</p>;

  return (
    <div className="space-y-8">
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
            {/* למשל אפשר להחזיר את LogSearch כאן */}
          </Card>
          {isLogsLoading ? (
            <LogTableSkeleton />
          ) : (
            <LogTable logs={logs ?? []} onDelete={deleteLog} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

///            <LogSearch logs={logs} projects={Projects} onFilter={addLog} />
