"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { ExtendedLabel } from "../../basic-ui/ExtendedLabel";

interface ChangeTypeSelectorProps {
  value: "feature" | "bugfix";
  onChange: (val: "feature" | "bugfix") => void;
}

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
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="feature" id="feature" />
          <ExtendedLabel
            color="primary"
            className="cursor-pointer"
            htmlFor="feature"
          >
            🆕 New Feature
          </ExtendedLabel>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bugfix" id="bugfix" />
          <ExtendedLabel
            color="primary"
            className="cursor-pointer"
            htmlFor="bugfix"
          >
            🐛 Bug Fix
          </ExtendedLabel>
        </div>
      </RadioGroup>
    </div>
  );
}
