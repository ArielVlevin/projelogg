"use client";

import { useState, useEffect } from "react";
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
import { Log } from "@/types/Log";
import { Project } from "@/types/Project";

interface LogSearchProps {
  logs: Log[];
  projects: Project[]; // רשימת הפרויקטים - כל פרויקט { _id, name }
  onFilter: (filtered: Log[]) => void;
}

export function LogSearch({ logs, projects, onFilter }: LogSearchProps) {
  // חיפוש בטקסט (description / subTopic)
  const [searchTerm, setSearchTerm] = useState("");
  // בחירת פרויקט, נשמור את ה־_id
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  // בחירת תאריך
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  // סינון לפי changeType
  const [changeTypeFilter, setChangeTypeFilter] = useState<
    "all" | "feature" | "bugfix"
  >("all");

  useEffect(() => {
    let filtered = [...logs];

    // חיפוש טקסטואלי ב-description / subTopic
    if (searchTerm) {
      filtered = filtered.filter(
        (log) =>
          log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.subTopic.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // סינון לפי פרויקט
    // נבדוק אם יש selectedProjectId ולא שווה ל-""
    if (selectedProjectId) {
      filtered = filtered.filter((log) => log.projectId === selectedProjectId);
      // אם בלוג יש רק שם של פרויקט (טקסט), אז:
      // filtered = filtered.filter(log => log.project === selectedProjectName);
    }

    // סינון לפי תאריך יחיד
    if (selectedDate) {
      filtered = filtered.filter((log) => {
        const logDate = new Date(log.date);
        return (
          logDate.getDate() === selectedDate.getDate() &&
          logDate.getMonth() === selectedDate.getMonth() &&
          logDate.getFullYear() === selectedDate.getFullYear()
        );
      });
    }

    // סינון לפי changeType
    // if (changeTypeFilter !== "all") {
    //   filtered = filtered.filter((log) => log.changeType === changeTypeFilter);
    // }

    onFilter(filtered);
  }, [
    logs,
    searchTerm,
    selectedProjectId,
    selectedDate,
    changeTypeFilter,
    onFilter,
  ]);

  // איפוס הפילטרים
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedProjectId("");
    setSelectedDate(undefined);
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
              {/* ערך "" = כל הפרויקטים */}
              <SelectItem value="">All Projects</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project._id} value={project._id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* בחירת תאריך + סינון לפי סוג שינוי */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
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
      </div>

      <Button variant="outline" onClick={resetFilters} className="mt-2">
        Reset Filters
      </Button>
    </div>
  );
}
