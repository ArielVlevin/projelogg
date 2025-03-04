"use client";

import { useLogs } from "@/hooks/useLogs";
import { LogForm } from "@/components/log-form";
import { LogSearch } from "@/components/log-search";
import { LogTable } from "@/components/log-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useProjects } from "@/hooks/useProjects";

export function ProjectLogManager() {
  const { logs, isLoading, isError, addLog, deleteLog } = useLogs();
  const {
    projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    addProject,
    isAdding,
  } = useProjects();
  /*
  // עוטפים את addProject בפונקציה שמחזירה Promise
  const handleAddNewProject = async (name: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      addProject(
        { name },
        {
          onSuccess: (newProj) => {
            // newProj נראה { name: "SomeName" }
            resolve(newProj.name);
          },
          onError: (err) => {
            reject(err);
          },
        }
      );
    });
  };*/

  if (isLoading || isProjectsLoading) return <p>Loading logs...</p>;
  if (!logs) return <p>error...</p>;
  if (isError || isProjectsError)
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
            <LogForm
              projects={projects ?? []}
              onAddNewProject={addProject}
              onSubmit={addLog}
            />
          </Card>
        </TabsContent>

        <TabsContent value="view">
          <Card className="p-6 mb-6">
            {/* למשל אפשר להחזיר את LogSearch כאן */}
          </Card>
          <LogTable logs={logs} onDelete={deleteLog} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

///            <LogSearch logs={logs} projects={Projects} onFilter={addLog} />
