import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  onClick: () => void;
  Icon: React.ReactNode;
  className?: string;
}

export function ActionButton({
  onClick,
  Icon,
  className = "hover:text-destructive",
}: ActionButtonProps) {
  return (
    <Button variant="ghost" size="icon" onClick={onClick}>
      <span className={cn("h-4 w-4 text-muted-foreground", className)}>
        {Icon}
      </span>
    </Button>
  );
}
