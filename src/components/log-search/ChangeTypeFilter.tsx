"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ChangeTypeFilterProps {
  changeTypeFilter: "all" | "feature" | "bugfix";
  setChangeTypeFilter: (value: "all" | "feature" | "bugfix") => void;
}

export function ChangeTypeFilter({
  changeTypeFilter,
  setChangeTypeFilter,
}: ChangeTypeFilterProps) {
  return (
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
  );
}
