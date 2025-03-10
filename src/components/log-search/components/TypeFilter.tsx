"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ExtendedLabel } from "@/components/basic-ui/ExtendedLabel";

interface ChangeTypeFilterProps {
  changeTypeFilter: "all" | "feature" | "bugfix";
  setChangeTypeFilter: (value: "all" | "feature" | "bugfix") => void;
}

const changeTypeOptions = [
  { value: "all", label: "All", icon: "" },
  { value: "feature", label: "Features", icon: "🆕" },
  { value: "bugfix", label: "Bug Fixes", icon: "🐛" },
];

export function ChangeTypeFilter({
  changeTypeFilter,
  setChangeTypeFilter,
}: ChangeTypeFilterProps) {
  return (
    <div className="space-y-2">
      <ExtendedLabel>Change Type</ExtendedLabel>
      <RadioGroup
        value={changeTypeFilter}
        onValueChange={(value) =>
          setChangeTypeFilter(value as "all" | "feature" | "bugfix")
        }
        className="flex space-x-4"
      >
        {changeTypeOptions.map(({ value, label, icon }) => (
          <div
            key={value}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <RadioGroupItem
              value={value}
              id={`${value}-filter`}
              className="cursor-pointer"
            />
            <ExtendedLabel
              color="primary"
              size="md"
              className="cursor-pointer"
              htmlFor={`${value}-filter`}
            >
              {icon} {label}
            </ExtendedLabel>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
