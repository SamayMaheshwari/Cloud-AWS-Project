import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isLanding?: boolean;
  user?: any;
}

const Navbar = ({ isLanding = false, user }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl",
      !isLanding && "sticky border-b-0 bg-transparent"
    )}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Logo />

        <div className="hidden md:flex items-center gap-6">
          {isLanding && (
            <>
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
            </>
          )}
          
          <ThemeToggle />
          
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium hidden sm:inline-block">{user.name}</span>
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full bg-primary/10 text-primary">
                  {user.avatar || <User className="h-4 w-4" />}
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background p-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
          {isLanding && (
            <>
              <a href="#features" className="block text-sm text-muted-foreground">Features</a>
              <a href="#about" className="block text-sm text-muted-foreground">About</a>
            </>
          )}
          {user ? (
              <Link to="/profile" className="block">
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                  <User className="h-4 w-4" /> Profile
                </Button>
              </Link>
          ) : (
            <>
              <Link to="/login" className="block"><Button variant="ghost" size="sm" className="w-full">Login</Button></Link>
              <Link to="/register" className="block"><Button size="sm" className="w-full">Register</Button></Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
