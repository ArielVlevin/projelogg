"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export function SearchInput({ searchTerm, setSearchTerm }: SearchInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="search">Search</Label>
      <Input
        id="search"
        placeholder="Search by description or subtopic..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
