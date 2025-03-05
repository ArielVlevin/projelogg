"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { ExtendedLabel } from "./ExtendedLabel";

export const LABEL_CLASSNAME = "text-lg font-medium text-foreground";
interface TextFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  multiline?: boolean;
}

export function TextField({
  label,
  value,
  onChange,
  placeholder = "",
  multiline = false,
}: TextFieldProps) {
  return (
    <div className="space-y-2">
      <ExtendedLabel>{label}</ExtendedLabel>
      {multiline ? (
        <Textarea
          rows={4}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
