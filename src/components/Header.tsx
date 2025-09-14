import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-lg bg-gradient-hero shadow-soft group-hover:shadow-glow transition-all duration-300">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Cura Health</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors hover:text-primary ${
                location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/assistant" 
              className={`font-medium transition-colors hover:text-primary ${
                location.pathname === '/assistant' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Assistant
            </Link>
            <Link 
              to="/about" 
              className={`font-medium transition-colors hover:text-primary ${
                location.pathname === '/about' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              About
            </Link>
          </nav>
          
          <Link to="/assistant">
            <Button className="btn-hero">
              Try Prototype
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;