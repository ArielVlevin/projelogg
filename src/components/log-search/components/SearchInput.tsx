"use client";

import { ExtendedLabel } from "@/components/basic-ui/ExtendedLabel";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export function SearchInput({ searchTerm, setSearchTerm }: SearchInputProps) {
  return (
    <div className="space-y-2">
      <ExtendedLabel>Search</ExtendedLabel>
      <Input
        id="search"
        placeholder="Search by description or subtopic..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
