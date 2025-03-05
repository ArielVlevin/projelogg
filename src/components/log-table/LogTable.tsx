"use client";

import { useState, useMemo } from "react";
import { LogPopulated } from "@/types/Log";
import { Table, TableBody } from "../ui/table";
import { LogTableHeader } from "./components/TableHeader";
import { LogTableRow } from "./components/TableRow";
import { EmptyState } from "@/components/basic-ui/EmptyState";
import { PaginationControls } from "@/components/basic-ui/PaginationControls";
import { Separator } from "../ui/separator";

interface LogTableProps {
  logs: LogPopulated[];
  onDelete: (id: string) => void;
}

export function LogTable({ logs, onDelete }: LogTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 20;

  const totalPages = Math.ceil(logs.length / logsPerPage);

  // Compute the logs for the current page
  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * logsPerPage;
    const endIndex = startIndex + logsPerPage;
    return logs.slice(startIndex, endIndex);
  }, [logs, currentPage]);

  if (!logs || logs.length === 0)
    return <EmptyState message="No logs found matching your criteria." />;

  return (
    <div className="rounded-md border">
      <Table>
        <LogTableHeader />
        <TableBody>
          {paginatedLogs.map((log) => (
            <LogTableRow key={log._id} log={log} onDelete={onDelete} />
          ))}
        </TableBody>
      </Table>
      <Separator />
      {/* Pagination Controls */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
