import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  variant?: "default" | "primary" | "success" | "warning" | "destructive";
}

const variantStyles = {
  default: "border-border",
  primary: "border-primary/30",
  success: "border-success/30",
  warning: "border-warning/30",
  destructive: "border-destructive/30",
};

const iconStyles = {
  default: "text-muted-foreground bg-muted",
  primary: "text-primary bg-primary/10",
  success: "text-success bg-success/10",
  warning: "text-warning bg-warning/10",
  destructive: "text-destructive bg-destructive/10",
};

const StatCard = ({ title, value, icon: Icon, trend, variant = "default" }: StatCardProps) => (
  <div className={cn(
    "glass-card p-5 hover:border-primary/40 transition-all duration-300 hover:-translate-y-0.5 group",
    variantStyles[variant]
  )}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold mt-2 tracking-tight">{value}</p>
        {trend && <p className="text-xs text-success mt-2 font-medium">{trend}</p>}
      </div>
      <div className={cn("p-3 rounded-xl group-hover:scale-110 transition-transform", iconStyles[variant])}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </div>
);

export default StatCard;
