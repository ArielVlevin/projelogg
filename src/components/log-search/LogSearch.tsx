import { LogPopulated } from "@/types/Log";
import { Project } from "@/types/Project";
import { SearchInput } from "./components/SearchInput";
import { ProjectSelect } from "./components/ProjectSelect";
import { DateFilter } from "./components/DateFilter";
import { ChangeTypeFilter } from "./components/TypeFilter";
import { useSearch } from "@/hooks/useSearch";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Filter } from "lucide-react";
import { ResetFiltersButton } from "./components/resetFilters";
import { Card } from "../ui/card";

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
    <Card className="p-4 mb-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="filters">
          <AccordionTrigger className="flex items-center gap-2 text-lg text-gray-500 font-semibold">
            <Filter className="h-4 w-4" />
            Search & Filters
          </AccordionTrigger>
          <AccordionContent className="pb-2">
            <div className="space-y-4">
              <SearchInput
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              <ChangeTypeFilter
                changeTypeFilter={changeTypeFilter}
                setChangeTypeFilter={setChangeTypeFilter}
              />
              <DateFilter
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />

              <div className="flex justify-between items-end">
                <ProjectSelect
                  projects={projects}
                  selectedProjectId={selectedProjectId}
                  setSelectedProjectId={setSelectedProjectId}
                />
                <ResetFiltersButton onReset={resetFilters} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
