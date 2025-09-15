import { useState, useCallback } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
import { StoryboardFrame } from "./StoryboardFrame";
import { StoryboardSidePanel } from "./StoryboardSidePanel";
import { StoryboardTimeline } from "./StoryboardTimeline";
import { StoryboardFloatingActions } from "./StoryboardFloatingActions";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Plus, 
  Play, 
  Settings, 
  ZoomIn, 
  Grid3X3, 
  List,
  Layers,
  MoreHorizontal,
  Command
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [selectedFrames, setSelectedFrames] = useState<string[]>([]);
  const [zoomLevel, setZoomLevel] = useState([100]);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();

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

  const addNewFrame = useCallback(() => {
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
    toast({
      title: "Frame Added",
      description: "New storyboard frame created successfully",
    });
  }, [frames, toast]);

  const duplicateFrame = useCallback((frameId: string) => {
    const frameIndex = frames.findIndex(f => f.id === frameId);
    if (frameIndex === -1) return;
    
    const originalFrame = frames[frameIndex];
    const duplicatedFrame = {
      ...originalFrame,
      id: `frame-${Date.now()}`,
      scene: `${originalFrame.scene} (Copy)`
    };
    
    const newFrames = [...frames];
    newFrames.splice(frameIndex + 1, 0, duplicatedFrame);
    setFrames(newFrames);
    
    toast({
      title: "Frame Duplicated",
      description: "Frame copied successfully",
    });
  }, [frames, toast]);

  const deleteFrame = useCallback((frameId: string) => {
    setFrames(frames.filter(f => f.id !== frameId));
    if (selectedFrame === frameId) {
      setSelectedFrame(null);
    }
    setSelectedFrames(selectedFrames.filter(id => id !== frameId));
    
    toast({
      title: "Frame Deleted",
      description: "Frame removed from storyboard",
    });
  }, [frames, selectedFrame, selectedFrames, toast]);

  const handleMultiSelect = useCallback((frameId: string, checked: boolean) => {
    if (checked) {
      setSelectedFrames([...selectedFrames, frameId]);
    } else {
      setSelectedFrames(selectedFrames.filter(id => id !== frameId));
    }
  }, [selectedFrames]);

  const handleSelectAll = useCallback(() => {
    if (selectedFrames.length === frames.length) {
      setSelectedFrames([]);
    } else {
      setSelectedFrames(frames.map(f => f.id));
    }
  }, [selectedFrames, frames]);

  const handleBulkUpdate = useCallback((updates: Partial<StoryboardFrameData>) => {
    setFrames(frames.map(frame => 
      selectedFrames.includes(frame.id) ? { ...frame, ...updates } : frame
    ));
    
    toast({
      title: "Bulk Update Applied",
      description: `Updated ${selectedFrames.length} frames`,
    });
  }, [frames, selectedFrames, toast]);

  const handleBulkDelete = useCallback(() => {
    setFrames(frames.filter(f => !selectedFrames.includes(f.id)));
    setSelectedFrames([]);
    if (selectedFrame && selectedFrames.includes(selectedFrame)) {
      setSelectedFrame(null);
    }
    
    toast({
      title: "Frames Deleted",
      description: `Removed ${selectedFrames.length} frames`,
    });
  }, [frames, selectedFrames, selectedFrame, toast]);

  const handleBulkDuplicate = useCallback(() => {
    const framesToDuplicate = frames.filter(f => selectedFrames.includes(f.id));
    const duplicatedFrames = framesToDuplicate.map(frame => ({
      ...frame,
      id: `frame-${Date.now()}-${Math.random()}`,
      scene: `${frame.scene} (Copy)`
    }));
    
    setFrames([...frames, ...duplicatedFrames]);
    setSelectedFrames([]);
    
    toast({
      title: "Frames Duplicated",
      description: `Created ${duplicatedFrames.length} duplicate frames`,
    });
  }, [frames, selectedFrames, toast]);

  const navigateFrame = useCallback((direction: 'prev' | 'next') => {
    if (!selectedFrame) return;
    
    const currentIndex = frames.findIndex(f => f.id === selectedFrame);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : frames.length - 1;
    } else {
      newIndex = currentIndex < frames.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedFrame(frames[newIndex].id);
  }, [selectedFrame, frames]);

  const handleZoom = useCallback((direction: 'in' | 'out') => {
    const currentZoom = zoomLevel[0];
    const step = 25;
    let newZoom;
    
    if (direction === 'in') {
      newZoom = Math.min(200, currentZoom + step);
    } else {
      newZoom = Math.max(50, currentZoom - step);
    }
    
    setZoomLevel([newZoom]);
  }, [zoomLevel]);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSelectAll: handleSelectAll,
    onDelete: selectedFrames.length > 0 ? handleBulkDelete : undefined,
    onDuplicate: selectedFrames.length > 0 ? handleBulkDuplicate : undefined,
    onZoomIn: () => handleZoom('in'),
    onZoomOut: () => handleZoom('out'),
    onEscape: () => {
      setSelectedFrames([]);
      setSelectedFrame(null);
      setSidePanelOpen(false);
    },
    onArrowLeft: () => navigateFrame('prev'),
    onArrowRight: () => navigateFrame('next'),
    onSpace: () => setIsPlaying(!isPlaying),
  });

  const selectedFrameData = selectedFrame ? frames.find(f => f.id === selectedFrame) : null;

  return (
    <div className="flex h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-display font-bold">Storyboard Editor</h1>
                <p className="text-muted-foreground mt-1">Fine-tune your video sequence and maintain brand consistency</p>
              </div>
              
              {/* Keyboard Shortcuts Hint */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-surface rounded-lg border">
                <Command className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Press ⌘A to select all</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              
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

          {/* Timeline */}
          <StoryboardTimeline
            frames={frames}
            selectedFrame={selectedFrame}
            onFrameSelect={setSelectedFrame}
            isPlaying={isPlaying}
            onPlayToggle={() => setIsPlaying(!isPlaying)}
          />

          {/* Stats & Controls */}
          <Card className="card-studio p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge className="bg-accent-blue/10 text-accent-blue">Total: 0:30</Badge>
                <Badge className="bg-neutral-200 text-neutral-700">16:9 Format</Badge>
                <Badge className="bg-accent-purple/10 text-accent-purple">{frames.length} Scenes</Badge>
                {selectedFrames.length > 0 && (
                  <Badge className="bg-accent-green/10 text-accent-green">
                    {selectedFrames.length} Selected
                  </Badge>
                )}
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
                
                {/* Bulk Actions */}
                {selectedFrames.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAll}
                    className="text-xs"
                  >
                    {selectedFrames.length === frames.length ? 'Deselect All' : 'Select All'}
                  </Button>
                )}
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
                className={`gap-6 mb-6 ${
                  viewMode === 'grid' 
                    ? 'grid' 
                    : 'flex flex-col max-w-4xl mx-auto'
                }`}
                style={viewMode === 'grid' ? {
                  gridTemplateColumns: `repeat(auto-fit, minmax(${Math.max(300, 400 * (zoomLevel[0] / 100))}px, 1fr))`,
                } : {}}
              >
                {frames.map((frame, index) => (
                  <StoryboardFrame
                    key={frame.id}
                    frame={frame}
                    index={index}
                    isSelected={selectedFrame === frame.id}
                    isMultiSelected={selectedFrames.includes(frame.id)}
                    onSelect={() => setSelectedFrame(frame.id)}
                    onMultiSelect={(checked) => handleMultiSelect(frame.id, checked)}
                    onUpdate={updateFrame}
                    onDuplicate={() => duplicateFrame(frame.id)}
                    onDelete={() => deleteFrame(frame.id)}
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

      {/* Floating Actions */}
      <StoryboardFloatingActions
        selectedFrames={selectedFrames}
        frames={frames}
        onClearSelection={() => setSelectedFrames([])}
        onBulkUpdate={handleBulkUpdate}
        onBulkDelete={handleBulkDelete}
        onBulkDuplicate={handleBulkDuplicate}
        onBulkExport={() => {
          toast({
            title: "Export Started",
            description: "Preparing frames for export...",
          });
        }}
      />

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