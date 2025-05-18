
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Dashboard, Upload, CheckCircle, Home, LogOut } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  
  const routes = [
    {
      path: "/",
      name: "Home",
      icon: Home,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: Dashboard,
    },
    {
      path: "/upload",
      name: "Upload",
      icon: Upload,
    },
    {
      path: "/verify",
      name: "Verify",
      icon: CheckCircle,
    },
  ];

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <div className="h-full flex flex-col">
            <div className="p-6">
              <Link 
                to="/" 
                className="flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <div className="h-8 w-8 bg-gradient-to-br from-neon-purple via-neon-blue to-neon-pink rounded-md flex items-center justify-center font-bold text-white">
                  X
                </div>
                <span className="font-bold text-xl">Xinete</span>
              </Link>
            </div>
            <ScrollArea className="flex-1 border-t border-border/40">
              <div className="flex flex-col gap-1 p-2">
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    to={route.path}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      variant={location.pathname === route.path ? "secondary" : "ghost"}
                      className={cn("w-full justify-start gap-2", {
                        "bg-accent/50 text-accent-foreground": location.pathname === route.path,
                      })}
                    >
                      <route.icon className="h-4 w-4" />
                      {route.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-border/40">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-muted-foreground"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col border-r border-border/40 w-16 transition-all duration-300 hover:w-56 group overflow-hidden">
        <div className="p-4 flex items-center justify-center md:justify-start">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-to-br from-neon-purple via-neon-blue to-neon-pink rounded-md flex items-center justify-center font-bold text-white">
              X
            </div>
            <span className="font-bold text-xl hidden group-hover:inline-block whitespace-nowrap">Xinete</span>
          </Link>
        </div>
        <nav className="flex-1 flex flex-col gap-1 p-2">
          {routes.map((route) => (
            <Link key={route.path} to={route.path}>
              <Button
                variant={location.pathname === route.path ? "secondary" : "ghost"}
                className={cn("w-full justify-start gap-2 overflow-hidden", {
                  "bg-accent/50 text-accent-foreground": location.pathname === route.path,
                })}
              >
                <route.icon className="h-4 w-4 min-w-[1rem] relative z-10" />
                <span className="hidden group-hover:inline-block whitespace-nowrap">
                  {route.name}
                </span>
                {location.pathname === route.path && (
                  <span className="absolute inset-y-0 left-0 w-1 bg-primary" />
                )}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="p-2 border-t border-border/40">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-muted-foreground overflow-hidden"
          >
            <LogOut className="h-4 w-4 min-w-[1rem]" />
            <span className="hidden group-hover:inline-block whitespace-nowrap">
              Logout
            </span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
