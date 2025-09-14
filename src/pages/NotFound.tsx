import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-subtle">
      <div className="text-center space-y-8 animate-fade-in-up">
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-bold text-primary">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => window.history.back()} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button 
            onClick={() => window.location.href = '/'} 
            className="btn-hero flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
