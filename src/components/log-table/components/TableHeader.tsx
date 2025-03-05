import { TableRow, TableHead, TableHeader } from "@/components/ui/table";

export function LogTableHeader() {
  return (
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
  );
}
