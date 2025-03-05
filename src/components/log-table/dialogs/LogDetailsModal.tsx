import type { LogPopulated } from "@/types/Log";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, FileText, Info, Package, Tag, X } from "lucide-react";
import { format } from "date-fns";

interface LogDetailsModalProps {
  log: LogPopulated;
  onClose: () => void;
}

export function LogDetailsModal({ log, onClose }: LogDetailsModalProps) {
  const formattedDate = format(new Date(log.date), "PPP");
  const formattedTime = format(new Date(log.date), "p");

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-bold flex items-center">
            <Info className="mr-2 h-5 w-5 text-primary" />
            Log Details
          </DialogTitle>
          <Badge
            variant={log.logType === "feature" ? "default" : "destructive"}
            className="w-fit text-xs"
          >
            {log.logType === "feature" ? "🆕 Feature" : "🐛 Bug Fix"}
          </Badge>
        </DialogHeader>

        <Separator />

        <Card className="border-none shadow-none">
          <CardContent className="p-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-2">
                <Package className="h-4 w-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Project
                  </p>
                  <p className="font-semibold">{log.project_id.name}</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Tag className="h-4 w-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Subtopic
                  </p>
                  <p className="font-semibold">{log.subTopic}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <FileText className="h-4 w-4 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Description
                </p>
                <p className="text-sm mt-1">{log.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-3 rounded-md">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Date
                  </p>
                  <p className="text-sm">{formattedDate}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Time
                  </p>
                  <p className="text-sm">{formattedTime}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose} className="gap-1">
            <X className="h-4 w-4" />
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
