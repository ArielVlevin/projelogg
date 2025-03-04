import { LogPopulated } from "@/types/Log";
import { Project } from "@/types/Project";
import { SearchInput } from "./SearchInput";
import { ProjectSelect } from "./ProjectSelect";
import { DateFilter } from "./DateFilter";
import { ChangeTypeFilter } from "./ChangeTypeFilter";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/hooks/useSearch";

interface LogSearchProps {
  logs: LogPopulated[];
  projects: Project[];
  onFilter: (filtered: LogPopulated[]) => void;
}

export function LogSearch({ logs, projects, onFilter }: LogSearchProps) {
  const {
    searchTerm,
    setSearchTerm,
    selectedProjectId,
    setSelectedProjectId,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    changeTypeFilter,
    setChangeTypeFilter,
    resetFilters,
  } = useSearch({ logs, onFilter });

  return (
    <div className="space-y-4">
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ProjectSelect
        projects={projects}
        selectedProjectId={selectedProjectId}
        setSelectedProjectId={setSelectedProjectId}
      />
      <DateFilter
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <ChangeTypeFilter
        changeTypeFilter={changeTypeFilter}
        setChangeTypeFilter={setChangeTypeFilter}
      />
      <Button variant="outline" onClick={resetFilters}>
        Reset Filters
      </Button>
    </div>
  );
}
