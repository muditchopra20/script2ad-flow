import { Button } from "@/components/ui/button";
import { Play, Plus, Settings, User } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-[var(--container-max)]">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-heading font-bold">Studio</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-accent-blue transition-colors">
              Projects
            </a>
            <a href="#" className="text-sm font-medium hover:text-accent-blue transition-colors">
              Templates
            </a>
            <a href="#" className="text-sm font-medium hover:text-accent-blue transition-colors">
              Brand Library
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button size="sm" className="bg-accent-blue hover:bg-accent-blue/90">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
          <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};