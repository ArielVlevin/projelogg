import { useState } from "react";
import { LogPopulated } from "@/types/Log";
import { Eye } from "lucide-react";
import { LogDeleteModal } from "../dialogs/LogDeleteModal";
import { ActionButton } from "@/components/basic-ui/actionButton";
import { LogDetailsModal } from "../dialogs/LogDetailsModal";
interface ActionsProps {
  log: LogPopulated;
  onDelete: (id: string) => void;
}

export function LogTableActions({ log, onDelete }: ActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <LogDeleteModal log={log} onDelete={onDelete} />

      <ActionButton
        Icon={<Eye />}
        className="hover:text-blue-400"
        onClick={() => setIsModalOpen(true)}
      />

      {isModalOpen && (
        <LogDetailsModal log={log} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
