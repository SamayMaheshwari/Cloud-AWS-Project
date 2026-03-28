import { Cloud } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconClassName?: string;
}

const Logo = ({ className, iconClassName }: LogoProps) => (
  <Link to="/" className={cn("flex items-center gap-2 text-xl font-bold", className)}>
    <Cloud className={cn("h-6 w-6 text-primary", iconClassName)} />
    <span>CloudAnalyzer</span>
  </Link>
);

export default Logo;
