
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, UserRound } from "lucide-react";
import XineteLogo from "./XineteLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          
          <Link to="/" className="flex items-center gap-2">
            <XineteLogo className="h-8 w-8" />
            <span className="hidden font-bold text-xl sm:inline-block">Xinete</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Dashboard
          </Link>
          <Link 
            to="/upload" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/upload" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Upload
          </Link>
          <Link 
            to="/verify" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/verify" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Verify
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <UserRound className="h-5 w-5" />
                <span className="sr-only">User menu</span>
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-neon-green" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
