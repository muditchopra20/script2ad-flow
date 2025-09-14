import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Play, Lock, Edit3, Copy, Trash2, Settings } from "lucide-react";

// Import storyboard images
import storyboardFrame1 from "@/assets/storyboard-frame-1.jpg";
import storyboardFrame2 from "@/assets/storyboard-frame-2.jpg";
import storyboardFrame3 from "@/assets/storyboard-frame-3.jpg";
import storyboardFrame4 from "@/assets/storyboard-frame-4.jpg";
import storyboardFrame5 from "@/assets/storyboard-frame-5.jpg";

interface StoryboardFrame {
  id: string;
  scene: string;
  duration: string;
  description: string;
  shotType: string;
  isLocked: boolean;
  timestamp: string;
  imageUrl: string;
}

const mockFrames: StoryboardFrame[] = [
  {
    id: '1',
    scene: 'Opening Hook',
    duration: '0:00-0:03',
    description: 'Close-up of hands holding product with dramatic lighting',
    shotType: 'Close-up',
    isLocked: false,
    timestamp: '0:00',
    imageUrl: storyboardFrame1,
  },
  {
    id: '2',
    scene: 'Problem Setup',
    duration: '0:03-0:08',
    description: 'Wide shot of cluttered workspace, person looking frustrated',
    shotType: 'Wide',
    isLocked: true,
    timestamp: '0:03',
    imageUrl: storyboardFrame2,
  },
  {
    id: '3',
    scene: 'Solution Reveal',
    duration: '0:08-0:15',
    description: 'Product in action, smooth camera movement, brand colors prominent',
    shotType: 'Medium',
    isLocked: false,
    timestamp: '0:08',
    imageUrl: storyboardFrame3,
  },
  {
    id: '4',
    scene: 'Benefits Demo',
    duration: '0:15-0:22',
    description: 'Split screen showing before/after, upbeat music',
    shotType: 'Split Screen',
    isLocked: false,
    timestamp: '0:15',
    imageUrl: storyboardFrame4,
  },
  {
    id: '5',
    scene: 'Call to Action',
    duration: '0:22-0:30',
    description: 'Bold text overlay, website/app screenshot, brand logo',
    shotType: 'Graphic',
    isLocked: true,
    timestamp: '0:22',
    imageUrl: storyboardFrame5,
  },
];

export const StoryboardEditor = () => {
  const [frames, setFrames] = useState<StoryboardFrame[]>(mockFrames);
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);

  const toggleLock = (frameId: string) => {
    setFrames(frames.map(frame => 
      frame.id === frameId ? { ...frame, isLocked: !frame.isLocked } : frame
    ));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display font-bold">Storyboard Editor</h1>
          <p className="text-muted-foreground mt-2">Fine-tune your video sequence and maintain brand consistency</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Brand Settings
          </Button>
          <Button className="bg-accent-green hover:bg-accent-green/90">
            <Play className="w-4 h-4 mr-2" />
            Preview Video
          </Button>
        </div>
      </div>

      {/* Timeline Header */}
      <Card className="card-studio p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge className="bg-accent-blue/10 text-accent-blue">Total: 0:30</Badge>
            <Badge className="bg-neutral-200 text-neutral-700">16:9 Format</Badge>
            <Badge className="bg-accent-purple/10 text-accent-purple">5 Scenes</Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Consistency: </span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-accent-green"></div>
              <span className="text-sm font-medium text-accent-green">95%</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Storyboard Frames */}
      <div className="grid gap-6">
        {frames.map((frame, index) => (
          <Card 
            key={frame.id} 
            className={`card-studio p-6 cursor-pointer transition-all ${
              selectedFrame === frame.id ? 'ring-2 ring-accent-blue' : ''
            }`}
            onClick={() => setSelectedFrame(frame.id)}
          >
            <div className="space-y-4">
              {/* Frame Preview - Large and prominent */}
              <div className="relative">
                <img 
                  src={frame.imageUrl} 
                  alt={frame.description}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="text-xs bg-black/70 text-white border-0">
                    {frame.timestamp}
                  </Badge>
                </div>
                
                <div className="absolute top-3 right-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-8 h-8 p-0 ${frame.isLocked ? 'bg-accent-blue/90 text-white' : 'bg-black/50 text-white hover:bg-black/70'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLock(frame.id);
                    }}
                  >
                    <Lock className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>
              </div>

              {/* Frame Details - Below image */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary">{frame.scene}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge className="bg-neutral-200 text-neutral-700 text-xs">
                        {frame.shotType}
                      </Badge>
                      <span className="text-sm text-muted-foreground font-medium">{frame.duration}</span>
                      {frame.isLocked && (
                        <Badge className="bg-accent-blue/10 text-accent-blue text-xs">
                          <Lock className="w-3 h-3 mr-1" />
                          Locked
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="w-9 h-9 p-0 hover:bg-neutral-100">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="w-9 h-9 p-0 hover:bg-neutral-100">
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="w-9 h-9 p-0 text-destructive hover:text-destructive hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">{frame.description}</p>
                
                <div className="flex items-center gap-3 pt-2">
                  <Button variant="outline" size="sm" className="hover:bg-neutral-50">
                    Customize Frame
                  </Button>
                  <Button variant="ghost" size="sm" className="text-accent-blue hover:bg-accent-blue/10">
                    AI Suggestions
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
        
        {/* Add Frame Button */}
        <Card className="card-studio p-6 border-dashed border-2 hover:border-accent-blue/50 transition-colors cursor-pointer">
          <div className="flex items-center justify-center py-8">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-accent-blue/10 flex items-center justify-center mx-auto">
                <Plus className="w-6 h-6 text-accent-blue" />
              </div>
              <div>
                <h3 className="font-semibold">Add New Scene</h3>
                <p className="text-sm text-muted-foreground">Create another frame for your storyboard</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};