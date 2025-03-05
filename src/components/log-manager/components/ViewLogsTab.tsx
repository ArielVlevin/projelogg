import { TabsContent } from "@/components/ui/tabs";

import { Project } from "@/types/Project";
import { LogPopulated } from "@/types/Log";
import { LogTable } from "@/components/log-table/LogTable";
import { LogTableSkeleton } from "@/components/skeletons/tableSkeleton";
import { LogSearch } from "@/components/log-search/LogSearch";

interface ViewLogsTabProps {
  logs: LogPopulated[];
  filteredLogs: LogPopulated[];
  projects: Project[];
  isLogsLoading: boolean;
  onFilter: (filtered: LogPopulated[]) => void;
  onDeleteLog: (id: string) => void;
}

export function ViewLogsTab({
  logs,
  filteredLogs,
  projects,
  isLogsLoading,
  onFilter,
  onDeleteLog,
}: ViewLogsTabProps) {
  return (
    <TabsContent value="view">
      <LogSearch logs={logs} projects={projects} onFilter={onFilter} />
      {isLogsLoading ? (
        <LogTableSkeleton />
      ) : (
        <LogTable logs={filteredLogs} onDelete={onDeleteLog} />
      )}
    </TabsContent>
  );
}
