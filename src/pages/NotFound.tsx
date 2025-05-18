
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="text-center max-w-md px-4">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-neon-purple/30 rounded-full blur-lg animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink">
              404
            </span>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button asChild size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground">
          <Link to="/">
            <Home className="mr-2 h-5 w-5" />
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
