import { LogForm } from "@/components/log-form/LogForm";
import { LogFormSkeleton } from "@/components/skeletons/formSkeleton";
import { TabsContent } from "@/components/ui/tabs";
import { Log } from "@/types/Log";

import { Project } from "@/types/Project";

interface AddLogTabProps {
  isLoading: boolean;
  projects: Project[];
  onAddProject: (project: Omit<Project, "_id">) => Promise<Project>;
  onSubmitLog: (log: Log) => void;
  isSubmitting: boolean;
}

export function AddLogTab({
  isLoading,
  projects,
  onAddProject,
  onSubmitLog,
  isSubmitting,
}: AddLogTabProps) {
  return (
    <TabsContent value="add">
      {isLoading ? (
        <LogFormSkeleton />
      ) : (
        <LogForm
          projects={projects}
          onAddNewProject={onAddProject}
          onSubmit={onSubmitLog}
          isSubmitting={isSubmitting}
        />
      )}
    </TabsContent>
  );
}
