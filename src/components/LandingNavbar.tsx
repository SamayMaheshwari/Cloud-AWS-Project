import { Link } from "react-router-dom";
import { Cloud, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { useState } from "react";

const LandingNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Cloud className="h-6 w-6 text-primary" />
          <span>CloudAnalyzer</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
          <ThemeToggle />
          <Link to="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Register</Button>
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background p-4 space-y-3">
          <a href="#features" className="block text-sm text-muted-foreground">Features</a>
          <a href="#about" className="block text-sm text-muted-foreground">About</a>
          <Link to="/login" className="block"><Button variant="ghost" size="sm" className="w-full">Login</Button></Link>
          <Link to="/register" className="block"><Button size="sm" className="w-full">Register</Button></Link>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
