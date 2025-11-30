import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Button variant="ghost" size="icon" className="hover:bg-primary/90">
          <User className="h-6 w-6" />
        </Button>
        
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-wide">شهاب</h1>
          <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
            <span className="text-2xl">⚡</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
