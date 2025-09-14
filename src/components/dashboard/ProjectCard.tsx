import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Play, Clock, Users } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    status: 'draft' | 'in-progress' | 'completed' | 'review';
    thumbnail?: string;
    duration: string;
    collaborators: number;
    lastModified: string;
    format: '16:9' | '9:16' | '1:1';
  };
}

const statusColors = {
  draft: 'bg-neutral-200 text-neutral-700',
  'in-progress': 'bg-accent-blue/10 text-accent-blue',
  completed: 'bg-accent-green/10 text-accent-green',
  review: 'bg-accent-purple/10 text-accent-purple',
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card className="card-studio group cursor-pointer overflow-hidden">
      <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 relative overflow-hidden">
        {project.thumbnail ? (
          <img 
            src={project.thumbnail} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Play className="w-12 h-12 text-neutral-400" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Button size="sm" className="bg-white text-black hover:bg-white/90">
            Open Project
          </Button>
        </div>

        <div className="absolute top-3 left-3">
          <Badge className={`text-xs font-medium ${statusColors[project.status]}`}>
            {project.status.replace('-', ' ')}
          </Badge>
        </div>

        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 bg-white/10 backdrop-blur-sm hover:bg-white/20">
                <MoreVertical className="w-4 h-4 text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="absolute bottom-3 right-3">
          <Badge variant="secondary" className="text-xs bg-black/50 text-white border-0">
            {project.format}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg leading-tight group-hover:text-accent-blue transition-colors">
            {project.title}
          </h3>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{project.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{project.collaborators}</span>
            </div>
          </div>
          <span>{project.lastModified}</span>
        </div>
      </div>
    </Card>
  );
};