"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LogPopulated } from "@/types/Log";
import { useNotification } from "@/context/NotificationContext";

interface LogTableProps {
  logs: LogPopulated[]; // רשימת הלוגים
  onDelete: (id: string) => void; // פונקציית מחיקה שמגיעה מהמנהל הראשי
  isLoading?: boolean; // בחרי (לא חובה) לטיפול בטעינה
  isDeleting?: boolean; // בחרי (לא חובה) לטיפול במחיקה
  isError?: boolean; // בחרי (לא חובה) לטיפול בשגיאה
}

export function LogTable({
  logs,
  onDelete,
  isLoading = false,
  isDeleting = false,
  isError = false,
}: LogTableProps) {
  const { showError, showSuccess } = useNotification();

  const [logToDelete, setLogToDelete] = useState<string | null>(null);

  const confirmDelete = async () => {
    if (!logToDelete) return;
    try {
      await onDelete(logToDelete);
      showSuccess("Log deleted successfully!");
    } catch (error) {
      showError(`Error deleting log: ${error}`);
    } finally {
      setLogToDelete(null);
    }
  };
  // מצבי טעינה/שגיאה
  if (isLoading || isDeleting) return <p>Loading logs...</p>;
  if (isError) return <p className="text-red-500">Error loading logs</p>;

  // אין לוגים
  if (!logs || logs.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-muted/50">
        <p className="text-muted-foreground">
          No logs found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Subtopic</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log._id}>
              <TableCell className="font-medium">
                {format(new Date(log.date), "MMM d, yyyy")}
              </TableCell>
              <TableCell>{log.project_id.name}</TableCell>
              <TableCell>
                <Badge
                  variant={log.logType === "feature" ? "default" : "secondary"}
                >
                  {log.logType === "feature" ? "🆕 Feature" : "🐛 Bug Fix"}
                </Badge>
              </TableCell>
              <TableCell>{log.subTopic}</TableCell>
              <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                {log.description}
              </TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setLogToDelete(log._id)}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Log Entry</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this log entry? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setLogToDelete(null)}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={confirmDelete}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
