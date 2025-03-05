interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = "No data found." }: EmptyStateProps) {
  return (
    <div className="text-center p-8 border rounded-lg bg-muted/50">
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
