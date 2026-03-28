import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  text?: string;
}

const Loader = ({ className, text = "Loading..." }: LoaderProps) => (
  <div className={cn("flex flex-col items-center justify-center p-8 space-y-3", className)}>
    <Loader2 className="h-8 w-8 text-primary animate-spin" />
    <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
  </div>
);

export default Loader;
