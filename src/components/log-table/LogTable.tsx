"use client";

import { LogPopulated } from "@/types/Log";
import { Table, TableBody } from "../ui/table";
import { LogTableHeader } from "./components/TableHeader";
import { LogTableRow } from "./components/TableRow";
import { EmptyState } from "../basic-ui/EmptyState";

interface LogTableProps {
  logs: LogPopulated[];
  onDelete: (id: string) => void;
}

export function LogTable({ logs, onDelete }: LogTableProps) {
  if (!logs || logs.length === 0)
    return <EmptyState message="No logs found matching your criteria." />;

  return (
    <div className="rounded-md border">
      <Table>
        <LogTableHeader />
        <TableBody>
          {logs.map((log) => (
            <LogTableRow key={log._id} log={log} onDelete={onDelete} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
