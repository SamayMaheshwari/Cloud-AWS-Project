import { cn } from "@/lib/utils";
import { Loader2, CheckCircle2, XCircle, Clock } from "lucide-react";

export type StatusType = "completed" | "failed" | "processing" | "pending";

interface StatusBadgeProps {
  status: StatusType;
}

const statusConfig = {
  completed: { 
    label: "Completed", 
    className: "bg-success/15 text-success border-success/30",
    icon: CheckCircle2 
  },
  failed: { 
    label: "Failed", 
    className: "bg-destructive/15 text-destructive border-destructive/30",
    icon: XCircle 
  },
  processing: { 
    label: "Processing", 
    className: "bg-primary/15 text-primary border-primary/30",
    icon: Loader2 
  },
  pending: { 
    label: "Pending", 
    className: "bg-warning/15 text-warning border-warning/30",
    icon: Clock 
  },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border", config.className)}>
      <Icon className={cn("h-3 w-3", status === "processing" && "animate-spin")} />
      {config.label}
    </span>
  );
};

export default StatusBadge;
