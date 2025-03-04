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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { LogPopulated } from "@/types/Log";
import { Project } from "@/types/Project";

interface LogSearchProps {
  logs: LogPopulated[];
  projects: Project[];
  onFilter: (filtered: LogPopulated[]) => void;
}
export function LogSearch({ logs, projects, onFilter }: LogSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
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

    if (selectedDate)
      filtered = filtered.filter((log) => {
        const logDate = new Date(log.date);
        return (
          logDate.getDate() === selectedDate.getDate() &&
          logDate.getMonth() === selectedDate.getMonth() &&
          logDate.getFullYear() === selectedDate.getFullYear()
        );
      });

    if (selectedProjectId !== "all")
      filtered = filtered.filter(
        (log) => log.project_id._id === selectedProjectId
      );

    return filtered;
  }, [logs, searchTerm, selectedProjectId, selectedDate]);

  // שליחת הלוגים המסוננים ל-LogManager דרך useEffect
  useEffect(() => {
    onFilter(filteredLogs);
  }, [filteredLogs, onFilter]);

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
    </div>
  );
}
