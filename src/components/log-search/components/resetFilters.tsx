import { Button } from "@/components/theme/Button";
import { Filter } from "lucide-react";

interface ResetFiltersButtonProps {
  onReset: () => void;
}

export function ResetFiltersButton({ onReset }: ResetFiltersButtonProps) {
  return (
    <Button variant="outlined" onClick={onReset} className="gap-2">
      <Filter className="h-4 w-4" />
      Reset Filters
    </Button>
  );
}
