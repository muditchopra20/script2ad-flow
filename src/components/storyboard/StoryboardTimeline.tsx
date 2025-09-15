import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import type { StoryboardFrameData } from "./types";

interface StoryboardTimelineProps {
  frames: StoryboardFrameData[];
  selectedFrame: string | null;
  onFrameSelect: (frameId: string) => void;
  isPlaying: boolean;
  onPlayToggle: () => void;
}

export const StoryboardTimeline = ({ 
  frames, 
  selectedFrame, 
  onFrameSelect, 
  isPlaying, 
  onPlayToggle 
}: StoryboardTimelineProps) => {
  const totalDuration = "0:30"; // Calculate from frames
  
  return (
    <Card className="card-studio p-4 mb-6">
      <div className="space-y-4">
        {/* Timeline Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onPlayToggle}
              className="w-10 h-10 p-0"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <SkipBack className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <SkipForward className="w-4 h-4" />
            </Button>
            
            <div className="text-sm text-muted-foreground">
              Total Duration: <span className="font-medium">{totalDuration}</span>
            </div>
          </div>
          
          <Badge className="bg-accent-green/10 text-accent-green">
            {frames.length} Scenes
          </Badge>
        </div>
        
        {/* Timeline Track */}
        <div className="relative">
          <div className="flex h-16 bg-surface rounded-lg overflow-hidden border">
            {frames.map((frame, index) => {
              const isSelected = selectedFrame === frame.id;
              const width = `${100 / frames.length}%`;
              
              return (
                <div
                  key={frame.id}
                  className={`relative cursor-pointer border-r border-border last:border-r-0 transition-all hover:bg-accent-blue/5 ${
                    isSelected ? 'bg-accent-blue/10 ring-2 ring-accent-blue' : ''
                  }`}
                  style={{ width }}
                  onClick={() => onFrameSelect(frame.id)}
                >
                  {/* Frame Thumbnail */}
                  <img
                    src={frame.imageUrl}
                    alt={frame.scene}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Frame Info Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-1 left-1 right-1">
                      <div className="text-white text-xs font-medium truncate">
                        {frame.scene}
                      </div>
                      <div className="text-white/80 text-xs">
                        {frame.timestamp}
                      </div>
                    </div>
                  </div>
                  
                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-1 right-1">
                      <div className="w-2 h-2 bg-accent-blue rounded-full"></div>
                    </div>
                  )}
                  
                  {/* Frame Number */}
                  <div className="absolute top-1 left-1">
                    <Badge variant="secondary" className="text-xs h-5 px-1">
                      {index + 1}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Playhead (when playing) */}
          {isPlaying && (
            <div className="absolute top-0 left-0 w-0.5 h-full bg-accent-blue animate-pulse">
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-accent-blue rounded-full"></div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};