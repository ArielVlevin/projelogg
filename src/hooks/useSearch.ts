import { useState, useMemo, useEffect } from "react";
import { endOfDay, isWithinInterval, startOfDay } from "date-fns";
import { LogPopulated } from "@/types/Log";

interface UseSearchProps {
  logs: LogPopulated[];
  onFilter: (filtered: LogPopulated[]) => void;
}
/**
 * A custom React hook that provides search and filtering functionality for logs.
 *
 * This hook manages:
 * - Text-based search (description & subtopic).
 * - Filtering by project ID.
 * - Filtering by a date range (start and end dates).
 * - Filtering by change type (feature or bugfix).
 *
 * It ensures that only logs matching the selected criteria are displayed.
 *
 * @param {UseSearchProps} props - The properties for configuring the search behavior.
 * @param {LogPopulated[]} props.logs - The full list of logs to filter.
 * @param {(filtered: LogPopulated[]) => void} props.onFilter - Callback function to update the filtered logs.
 *
 * @returns {{
 *   searchTerm: string;
 *   setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
 *   selectedProjectId: string;
 *   setSelectedProjectId: React.Dispatch<React.SetStateAction<string>>;
 *   startDate: Date | undefined;
 *   setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
 *   endDate: Date | undefined;
 *   setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
 *   changeTypeFilter: "all" | "feature" | "bugfix";
 *   setChangeTypeFilter: React.Dispatch<React.SetStateAction<"all" | "feature" | "bugfix">>;
 *   resetFilters: () => void;
 * }} - The state and functions for managing search and filtering.
 */
export function useSearch({ logs, onFilter }: UseSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("all");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [changeTypeFilter, setChangeTypeFilter] = useState<
    "all" | "feature" | "bugfix"
  >("all");

  /**
   * Filters logs based on the selected search criteria.
   * Uses `useMemo` to optimize filtering performance.
   */
  const filteredLogs = useMemo(() => {
    let filtered = [...logs];

    // Filter by search term (matches in description or subtopic)
    if (searchTerm)
      filtered = filtered.filter(
        (log) =>
          log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.subTopic.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Filter by date range
    if (startDate && endDate) {
      if (startDate > endDate) setStartDate(new Date(endDate));
      const start = startOfDay(startDate);
      const end = endOfDay(endDate);
      filtered = filtered.filter((log) => {
        const logDate = new Date(log.date);
        return isWithinInterval(logDate, { start: start, end: end });
      });
    }

    // Filter by project ID
    if (selectedProjectId !== "all")
      filtered = filtered.filter(
        (log) => log.project_id._id === selectedProjectId
      );

    // Filter by change type (feature or bugfix)
    if (changeTypeFilter !== "all")
      filtered = filtered.filter((log) => log.logType === changeTypeFilter);

    return filtered;
  }, [
    endDate,
    logs,
    searchTerm,
    selectedProjectId,
    startDate,
    changeTypeFilter,
  ]);

  /**
   * Triggers the provided `onFilter` callback whenever the filtered logs change.
   */
  useEffect(() => {
    onFilter(filteredLogs);
  }, [filteredLogs, onFilter]);
  /**
   * Resets all filters to their default values.
   */
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
