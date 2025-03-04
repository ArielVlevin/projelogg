"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import React from "react";

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
      <Label className="text-lg font-medium text-foreground">{label}</Label>
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
