import { useState, useMemo, useEffect } from "react";
import { endOfDay, isWithinInterval, startOfDay } from "date-fns";
import { LogPopulated } from "@/types/Log";

interface UseSearchProps {
  logs: LogPopulated[];
  onFilter: (filtered: LogPopulated[]) => void;
}

/**
 * Custom hook for managing log search filters.
 * Handles search term, project selection, date range, and change type filtering.
 */
export function useSearch({ logs, onFilter }: UseSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("all");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [changeTypeFilter, setChangeTypeFilter] = useState<
    "all" | "feature" | "bugfix"
  >("all");
  const filteredLogs = useMemo(() => {
    let filtered = [...logs];

    if (searchTerm) {
      filtered = filtered.filter(
        (log) =>
          log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.subTopic.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (startDate && endDate) {
      if (startDate > endDate) setStartDate(new Date(endDate));
      const start = startOfDay(startDate);
      const end = endOfDay(endDate);
      filtered = filtered.filter((log) => {
        const logDate = new Date(log.date);
        return isWithinInterval(logDate, { start: start, end: end });
      });
    }

    if (selectedProjectId !== "all")
      filtered = filtered.filter(
        (log) => log.project_id._id === selectedProjectId
      );

    return filtered;
  }, [endDate, logs, searchTerm, selectedProjectId, startDate]);

  useEffect(() => {
    onFilter(filteredLogs);
  }, [filteredLogs, onFilter]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedProjectId("all");
    setStartDate(undefined);
    setEndDate(undefined);
    setChangeTypeFilter("all");
  };

  return {
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
  };
}
