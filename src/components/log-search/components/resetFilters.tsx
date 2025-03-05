import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface ResetFiltersButtonProps {
  onReset: () => void;
}

export function ResetFiltersButton({ onReset }: ResetFiltersButtonProps) {
  return (
    <Button variant="outline" onClick={onReset} className="gap-2">
      <Filter className="h-4 w-4" />
      Reset Filters
    </Button>
  );
}
