import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus } from "lucide-react";

interface LogTabsProps {
  children: React.ReactNode;
}

export function LogTabs({ children }: LogTabsProps) {
  return (
    <Tabs defaultValue="add" className="w-full">
      <TabsList className="grid w-full mx-auto grid-cols-2 mb-4">
        <TabsTrigger value="add" className="flex items-center gap-2 ">
          <Plus className="h-4 w-4" />
          Add New Log
        </TabsTrigger>
        <TabsTrigger value="view" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          View Logs
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
}
