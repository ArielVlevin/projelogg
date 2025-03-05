"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ExtendedLabel } from "../../basic-ui/ExtendedLabel";

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
      <ExtendedLabel>Change Type</ExtendedLabel>
      <RadioGroup
        value={changeTypeFilter}
        onValueChange={(value) => {
          setChangeTypeFilter(value as "all" | "feature" | "bugfix");
        }}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem value="all" id="all" className="cursor-pointer" />
          <ExtendedLabel
            color="primary"
            className="cursor-pointer"
            htmlFor="all"
          >
            All
          </ExtendedLabel>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem
            value="feature"
            id="feature-filter"
            className="cursor-pointer"
          />
          <ExtendedLabel
            color="primary"
            className="cursor-pointer"
            htmlFor="feature-filter"
          >
            🆕 Features
          </ExtendedLabel>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem
            value="bugfix"
            id="bugfix-filter"
            className="cursor-pointer"
          />
          <ExtendedLabel
            color="primary"
            className="cursor-pointer"
            htmlFor="bugfix-filter"
          >
            🐛 Bug Fixes
          </ExtendedLabel>
        </div>
      </RadioGroup>
    </div>
  );
}
