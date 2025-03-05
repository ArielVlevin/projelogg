"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function LogTableSkeleton({ length = 20 }: { length?: number }) {
  const rows = Array.from({ length });

  return (
    <div className="rounded-md border animate-pulse">
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
          {rows.map((_, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </TableCell>
              <TableCell>
                <div className="h-3 w-24 bg-gray-200 rounded" />
              </TableCell>
              <TableCell>
                <div className="h-5 w-20 bg-gray-200 rounded" />
              </TableCell>
              <TableCell>
                <div className="h-3 w-24 bg-gray-200 rounded" />
              </TableCell>
              <TableCell className="hidden md:table-cell max-w-[300px]">
                <div className="h-3 w-32 bg-gray-200 rounded" />
              </TableCell>
              <TableCell>
                <div className="h-3 w-6 bg-gray-200 rounded mx-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
