"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ExtendedLabel } from "@/components/basic-ui/ExtendedLabel";

interface DateFilterProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
}

export function DateFilter({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: DateFilterProps) {
  // const [dateError, setDateError] = useState<string | null>(null);

  /*
  const handleEndDateChange = (date: Date | undefined) => {
    if (date && startDate && isAfter(startDate, date)) {
      setDateError("End date cannot be earlier than start date.");
      setEndDate(new Date(startDate));
    } else {
      setDateError(null);
      setEndDate(date);
    }
  };
*/
  return (
    <div className="grid gap-4 grid-cols-2">
      <div className="space-y-2">
        <ExtendedLabel>Start Date</ExtendedLabel>
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
        <ExtendedLabel>End Date</ExtendedLabel>
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
  );
}
//{dateError && <p className="text-red-500 text-sm">{dateError}</p>}
