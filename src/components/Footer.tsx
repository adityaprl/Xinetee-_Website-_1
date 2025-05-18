
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 py-6 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Xinete. All rights reserved.
          </p>
        </div>
        
        <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <Link to="/about" className="hover:text-foreground transition-colors">
            About
          </Link>
          <Link to="/privacy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-foreground transition-colors">
            Terms of Service
          </Link>
          <Link to="/contact" className="hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
