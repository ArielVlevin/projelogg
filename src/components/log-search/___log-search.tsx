"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { LogPopulated } from "@/types/Log";
import { Project } from "@/types/Project";
import { cn } from "@/lib/utils";
import { format, isWithinInterval } from "date-fns";

interface LogSearchProps {
  logs: LogPopulated[];
  projects: Project[];
  onFilter: (filtered: LogPopulated[]) => void;
}
export function LogSearch({ logs, projects, onFilter }: LogSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("all");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [changeTypeFilter, setChangeTypeFilter] = useState<
    "all" | "feature" | "bugfix"
  >("all");

  // חישוב הלוגים המסוננים בצורה אופטימלית
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

      filtered = filtered.filter((log) => {
        const logDate = new Date(log.date);
        return isWithinInterval(logDate, { start: startDate, end: endDate });
      });
    }

    if (selectedProjectId !== "all")
      filtered = filtered.filter(
        (log) => log.project_id._id === selectedProjectId
      );

    return filtered;
  }, [endDate, logs, searchTerm, selectedProjectId, startDate]);

  // שליחת הלוגים המסוננים ל-LogManager דרך useEffect
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

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Search & Filter Logs</h3>

      {/* חיפוש טקסטואלי */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search by description or subtopic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* בחירת פרויקט */}
        <div className="space-y-2">
          <Label htmlFor="project-filter">Project</Label>
          <Select
            value={selectedProjectId}
            onValueChange={(val) => setSelectedProjectId(val)}
          >
            <SelectTrigger id="project-filter">
              <SelectValue placeholder="All Projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project._id} value={project._id!}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-2">
        <div className="space-y-2">
          <Label>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : "Select start date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : "Select end date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Change Type</Label>
        <RadioGroup
          value={changeTypeFilter}
          onValueChange={(value) =>
            setChangeTypeFilter(value as "all" | "feature" | "bugfix")
          }
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all" className="cursor-pointer">
              All
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="feature" id="feature-filter" />
            <Label htmlFor="feature-filter" className="cursor-pointer">
              🆕 Features
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bugfix" id="bugfix-filter" />
            <Label htmlFor="bugfix-filter" className="cursor-pointer">
              🐛 Bug Fixes
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Button variant="outline" onClick={resetFilters} className="mt-2">
        Reset Filters
      </Button>
    </div>
  );
}

/*


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

  */
