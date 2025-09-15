import { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
import { StoryboardFrame } from "./StoryboardFrame";
import { StoryboardSidePanel } from "./StoryboardSidePanel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Plus, Play, Settings, ZoomIn } from "lucide-react";

// Import storyboard images
import storyboardFrame1 from "@/assets/storyboard-frame-1.jpg";
import storyboardFrame2 from "@/assets/storyboard-frame-2.jpg";
import storyboardFrame3 from "@/assets/storyboard-frame-3.jpg";
import storyboardFrame4 from "@/assets/storyboard-frame-4.jpg";
import storyboardFrame5 from "@/assets/storyboard-frame-5.jpg";

import type { StoryboardFrameData } from "./types";

const mockFrames: StoryboardFrameData[] = [
  {
    id: '1',
    scene: 'Opening Hook',
    duration: '0:00-0:03',
    description: 'Close-up of hands holding product with dramatic lighting',
    shotType: 'Close-up',
    visualStyle: 'Cinematic',
    characterLock: false,
    brandLock: true,
    visualLock: false,
    timestamp: '0:00',
    imageUrl: storyboardFrame1,
    scriptText: "Introducing the revolutionary product that changes everything...",
  },
  {
    id: '2',
    scene: 'Problem Setup',
    duration: '0:03-0:08',
    description: 'Wide shot of cluttered workspace, person looking frustrated',
    shotType: 'Wide Shot',
    visualStyle: 'Documentary',
    characterLock: true,
    brandLock: true,
    visualLock: true,
    timestamp: '0:03',
    imageUrl: storyboardFrame2,
    scriptText: "Tired of dealing with messy, disorganized workflows?",
  },
  {
    id: '3',
    scene: 'Solution Reveal',
    duration: '0:08-0:15',
    description: 'Product in action, smooth camera movement, brand colors prominent',
    shotType: 'Medium Shot',
    visualStyle: 'Commercial',
    characterLock: false,
    brandLock: true,
    visualLock: false,
    timestamp: '0:08',
    imageUrl: storyboardFrame3,
    scriptText: "Our solution streamlines your process in seconds.",
  },
  {
    id: '4',
    scene: 'Benefits Demo',
    duration: '0:15-0:22',
    description: 'Split screen showing before/after, upbeat music',
    shotType: 'Split Screen',
    visualStyle: 'Energetic',
    characterLock: false,
    brandLock: false,
    visualLock: false,
    timestamp: '0:15',
    imageUrl: storyboardFrame4,
    scriptText: "See the difference for yourself - before and after.",
  },
  {
    id: '5',
    scene: 'Call to Action',
    duration: '0:22-0:30',
    description: 'Bold text overlay, website/app screenshot, brand logo',
    shotType: 'Graphic Overlay',
    visualStyle: 'Bold',
    characterLock: true,
    brandLock: true,
    visualLock: true,
    timestamp: '0:22',
    imageUrl: storyboardFrame5,
    scriptText: "Get started today - visit our website now!",
  },
];

export const StoryboardEditor = () => {
  const [frames, setFrames] = useState<StoryboardFrameData[]>(mockFrames);
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState([100]);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setFrames((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const updateFrame = (frameId: string, updates: Partial<StoryboardFrameData>) => {
    setFrames(frames.map(frame => 
      frame.id === frameId ? { ...frame, ...updates } : frame
    ));
  };

  const addNewFrame = () => {
    const newFrame: StoryboardFrameData = {
      id: `frame-${Date.now()}`,
      scene: `New Scene ${frames.length + 1}`,
      duration: '0:00-0:03',
      description: 'New frame description',
      shotType: 'Medium Shot',
      visualStyle: 'Standard',
      characterLock: false,
      brandLock: false,
      visualLock: false,
      timestamp: '0:00',
      imageUrl: storyboardFrame1,
      scriptText: 'Add your narration here...',
    };
    setFrames([...frames, newFrame]);
  };

  const selectedFrameData = selectedFrame ? frames.find(f => f.id === selectedFrame) : null;

  return (
    <div className="flex h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-display font-bold">Storyboard Editor</h1>
              <p className="text-muted-foreground mt-1">Fine-tune your video sequence and maintain brand consistency</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setSidePanelOpen(!sidePanelOpen)}>
                <Settings className="w-4 h-4 mr-2" />
                Advanced Settings
              </Button>
              <Button className="bg-accent-green hover:bg-accent-green/90">
                <Play className="w-4 h-4 mr-2" />
                Preview Video
              </Button>
            </div>
          </div>

          {/* Stats & Controls */}
          <Card className="card-studio p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge className="bg-accent-blue/10 text-accent-blue">Total: 0:30</Badge>
                <Badge className="bg-neutral-200 text-neutral-700">16:9 Format</Badge>
                <Badge className="bg-accent-purple/10 text-accent-purple">{frames.length} Scenes</Badge>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Consistency: </span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-accent-green"></div>
                    <span className="text-sm font-medium text-accent-green">95%</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <ZoomIn className="w-4 h-4 text-muted-foreground" />
                  <Slider
                    value={zoomLevel}
                    onValueChange={setZoomLevel}
                    max={200}
                    min={50}
                    step={25}
                    className="w-24"
                  />
                  <span className="text-sm text-muted-foreground w-12">{zoomLevel[0]}%</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Storyboard Grid */}
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={frames.map(f => f.id)} strategy={rectSortingStrategy}>
              <div 
                className="grid gap-6 mb-6"
                style={{
                  gridTemplateColumns: `repeat(auto-fit, minmax(${Math.max(300, 400 * (zoomLevel[0] / 100))}px, 1fr))`,
                }}
              >
                {frames.map((frame, index) => (
                  <StoryboardFrame
                    key={frame.id}
                    frame={frame}
                    index={index}
                    isSelected={selectedFrame === frame.id}
                    onSelect={() => setSelectedFrame(frame.id)}
                    onUpdate={updateFrame}
                    zoomLevel={zoomLevel[0]}
                  />
                ))}
                
                {/* Add Frame Card */}
                <Card 
                  className="border-dashed border-2 hover:border-accent-blue/50 transition-colors cursor-pointer flex items-center justify-center min-h-[400px]"
                  onClick={addNewFrame}
                >
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-accent-blue/10 flex items-center justify-center mx-auto">
                      <Plus className="w-6 h-6 text-accent-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Add Frame</h3>
                      <p className="text-sm text-muted-foreground">Generate or upload new scene</p>
                    </div>
                  </div>
                </Card>
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* Side Panel */}
      {sidePanelOpen && selectedFrameData && (
        <StoryboardSidePanel
          frame={selectedFrameData}
          onUpdate={updateFrame}
          onClose={() => setSidePanelOpen(false)}
        />
      )}
    </div>
  );
};