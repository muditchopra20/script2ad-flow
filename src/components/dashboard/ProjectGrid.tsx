import { ProjectCard } from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockProjects = [
  {
    id: '1',
    title: 'Summer Fashion Campaign',
    status: 'in-progress' as const,
    duration: '0:30',
    collaborators: 3,
    lastModified: '2 hours ago',
    format: '16:9' as const,
  },
  {
    id: '2',
    title: 'Product Launch Teaser',
    status: 'completed' as const,
    duration: '0:15',
    collaborators: 2,
    lastModified: '1 day ago',
    format: '9:16' as const,
  },
  {
    id: '3',
    title: 'Brand Story Video',
    status: 'review' as const,
    duration: '1:00',
    collaborators: 5,
    lastModified: '3 days ago',
    format: '16:9' as const,
  },
  {
    id: '4',
    title: 'Social Media Ad Set',
    status: 'draft' as const,
    duration: '0:20',
    collaborators: 1,
    lastModified: '5 days ago',
    format: '1:1' as const,
  },
  {
    id: '5',
    title: 'Holiday Campaign',
    status: 'in-progress' as const,
    duration: '0:45',
    collaborators: 4,
    lastModified: '1 week ago',
    format: '9:16' as const,
  },
  {
    id: '6',
    title: 'Tutorial Series',
    status: 'draft' as const,
    duration: '2:30',
    collaborators: 2,
    lastModified: '2 weeks ago',
    format: '16:9' as const,
  },
];

export const ProjectGrid = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-display font-bold">Your Projects</h1>
          <p className="text-muted-foreground mt-2">Manage and create your video ad campaigns</p>
        </div>
        
        <Button className="bg-accent-blue hover:bg-accent-blue/90">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search projects..." className="pl-10" />
        </div>
        <Button variant="outline" className="shrink-0">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid-studio">
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};