"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import React from "react";

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
      <Label className="text-lg font-medium text-foreground">Change Type</Label>
      <RadioGroup
        value={value}
        onValueChange={(val) => onChange(val as "feature" | "bugfix")}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="feature" id="feature" />
          <Label htmlFor="feature" className="cursor-pointer">
            🆕 New Feature
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bugfix" id="bugfix" />
          <Label htmlFor="bugfix" className="cursor-pointer">
            🐛 Bug Fix
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
