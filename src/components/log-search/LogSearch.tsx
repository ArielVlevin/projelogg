import { LogPopulated } from "@/types/Log";
import { Project } from "@/types/Project";
import { SearchInput } from "./components/SearchInput";
import { ProjectSelect } from "./components/ProjectSelect";
import { DateFilter } from "./components/DateFilter";
import { ChangeTypeFilter } from "./components/TypeFilter";
import { useSearch } from "@/hooks/useSearch";

import { AccordionContent } from "@/components/ui/accordion";
import { Filter } from "lucide-react";
import { ResetFiltersButton } from "./components/resetFilters";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Title } from "../theme/Title";
import {
  ThemedAccordion,
  ThemedAccordionItem,
  ThemedAccordionTrigger,
} from "../theme/ThemedAccordion";

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
      <CardHeader>
        <CardTitle>
          <Title as="h3" size="2xl">
            View Logs
          </Title>
        </CardTitle>
        <CardDescription>
          {" "}
          <Title as="h1" size="sm">
            Search and filter your project logs
          </Title>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ThemedAccordion type="single" collapsible className="w-full">
          <ThemedAccordionItem value="filters">
            <ThemedAccordionTrigger
              icon={<Filter className="h-4 w-4" />}
              variant="outline"
              layout="spaceBetween"
              className="mb-2"
            >
              <span>Search & Filters</span>
            </ThemedAccordionTrigger>
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
          </ThemedAccordionItem>
        </ThemedAccordion>
      </CardContent>
    </Card>
  );
}
