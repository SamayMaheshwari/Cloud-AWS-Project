import { FileQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: any;
  className?: string;
}

const EmptyState = ({ 
  title = "No data found", 
  description = "There are no items to display at this time.", 
  icon: Icon = FileQuestion,
  className 
}: EmptyStateProps) => (
  <div className={cn("flex flex-col items-center justify-center p-12 text-center glass-card", className)}>
    <div className="p-4 bg-muted rounded-full mb-4">
      <Icon className="h-8 w-8 text-muted-foreground" />
    </div>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-muted-foreground mt-1 max-w-xs">{description}</p>
  </div>
);

export default EmptyState;
