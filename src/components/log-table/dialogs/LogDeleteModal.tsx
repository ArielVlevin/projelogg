import { LogPopulated } from "@/types/Log";
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
import { useState } from "react";
import { useNotification } from "@/contexts/NotificationContext";
import { ActionButton } from "../../basic-ui/actionButton";

interface LogDeleteModalProps {
  log: LogPopulated;
  onDelete: (id: string) => void;
}

export function LogDeleteModal({ log, onDelete }: LogDeleteModalProps) {
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

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <ActionButton
          Icon={<Trash2 />}
          onClick={() => setLogToDelete(log._id)}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Log Entry</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this log entry? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setLogToDelete(null)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
