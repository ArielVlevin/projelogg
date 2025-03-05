"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { ExtendedLabel } from "../../basic-ui/ExtendedLabel";

interface ChangeTypeSelectorProps {
  value: "feature" | "bugfix";
  onChange: (val: "feature" | "bugfix") => void;
}

// Define options in an array for better scalability
const changeTypeOptions = [
  { value: "feature", label: "New Feature", icon: "🆕" },
  { value: "bugfix", label: "Bug Fix", icon: "🐛" },
];

export function ChangeTypeSelector({
  value,
  onChange,
}: ChangeTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <ExtendedLabel>Change Type</ExtendedLabel>
      <RadioGroup
        value={value}
        onValueChange={(val) => onChange(val as "feature" | "bugfix")}
        className="flex space-x-4"
      >
        {changeTypeOptions.map(({ value, label, icon }) => (
          <div
            key={value}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <RadioGroupItem
              value={value}
              id={value}
              className="cursor-pointer"
            />
            <ExtendedLabel
              color="primary"
              size="md"
              className="cursor-pointer"
              htmlFor={value}
            >
              {icon} {label}
            </ExtendedLabel>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
