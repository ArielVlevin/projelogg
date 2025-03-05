import { Label } from "@/components/ui/label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const labelVariants = cva("text-lg font-medium text-foreground", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
    },
    color: {
      primary: "text-primary",
      secondary: "text-secondary",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    size: "lg",
    color: "muted",
  },
});

interface ExtendedLabelProps extends VariantProps<typeof labelVariants> {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

export function ExtendedLabel({
  children,
  size,
  color,
  className,
  htmlFor,
}: ExtendedLabelProps) {
  return (
    <Label
      className={cn(labelVariants({ size, color }), className)}
      htmlFor={htmlFor}
    >
      {children}
    </Label>
  );
}
