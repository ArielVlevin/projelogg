import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LogPopulated } from "@/types/Log";
import { format } from "date-fns";
import { LogTableActions } from "./TableActions";

interface LogTableRowProps {
  log: LogPopulated;
  onDelete: (id: string) => void;
}

export function LogTableRow({ log, onDelete }: LogTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        {format(new Date(log.date), "MMM d, yyyy")}
      </TableCell>
      <TableCell>{log.project_id.name}</TableCell>
      <TableCell>
        <Badge variant={log.logType === "feature" ? "default" : "secondary"}>
          {log.logType === "feature" ? "🆕 Feature" : "🐛 Bug Fix"}
        </Badge>
      </TableCell>
      <TableCell>{log.subTopic}</TableCell>
      <TableCell className="hidden md:table-cell max-w-[300px] truncate">
        {log.description}
      </TableCell>
      <TableCell>
        <LogTableActions log={log} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
}
