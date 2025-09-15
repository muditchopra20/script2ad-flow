import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { GripVertical, Lock, Unlock, RefreshCw } from "lucide-react";
import type { StoryboardFrameData } from "./types";

interface StoryboardFrameProps {
  frame: StoryboardFrameData;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (frameId: string, updates: Partial<StoryboardFrameData>) => void;
  zoomLevel: number;
}

const shotTypes = [
  "Close-up",
  "Medium Shot",
  "Wide Shot",
  "Extreme Close-up",
  "Extreme Wide Shot",
  "Over the Shoulder",
  "Split Screen",
  "Graphic Overlay"
];

const visualStyles = [
  "Cinematic",
  "Documentary",
  "Commercial",
  "Energetic",
  "Bold",
  "Minimalist",
  "Dramatic",
  "Standard"
];

export const StoryboardFrame = ({
  frame,
  index,
  isSelected,
  onSelect,
  onUpdate,
  zoomLevel
}: StoryboardFrameProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: frame.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleUpdate = (field: keyof StoryboardFrameData, value: any) => {
    onUpdate(frame.id, { [field]: value });
  };

  const cardScale = zoomLevel / 100;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`card-studio cursor-pointer transition-all transform ${
        isSelected ? 'ring-2 ring-accent-blue shadow-lg' : 'hover:shadow-md'
      } ${isDragging ? 'z-50' : ''}`}
      onClick={onSelect}
    >
      {/* Drag Handle */}
      <div
        className="absolute top-2 left-2 z-10 cursor-grab active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <div className="w-6 h-6 rounded bg-black/20 flex items-center justify-center">
          <GripVertical className="w-3 h-3 text-white" />
        </div>
      </div>

      {/* Frame Number */}
      <div className="absolute top-2 right-2 z-10">
        <Badge className="bg-primary text-primary-foreground font-bold">
          #{index + 1}
        </Badge>
      </div>

      {/* Image Preview */}
      <div className="relative">
        <img 
          src={frame.imageUrl} 
          alt={frame.description}
          className="w-full h-48 object-cover rounded-t-lg"
          style={{ height: `${192 * cardScale}px` }}
        />
        
        <div className="absolute bottom-2 left-2">
          <Badge variant="secondary" className="text-xs bg-black/70 text-white border-0">
            {frame.timestamp}
          </Badge>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-8 w-8 h-8 p-0 bg-black/50 text-white hover:bg-black/70"
          onClick={(e) => {
            e.stopPropagation();
            // Handle regenerate
          }}
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      {/* Frame Content */}
      <div className="p-4 space-y-4">
        {/* Title & Duration */}
        <div>
          <Input
            value={frame.scene}
            onChange={(e) => handleUpdate('scene', e.target.value)}
            className="font-bold text-lg border-0 p-0 h-auto"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="text-sm text-muted-foreground mt-1">{frame.duration}</div>
        </div>

        {/* Shot Type & Visual Style */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs text-muted-foreground">Shot Type</Label>
            <Select 
              value={frame.shotType} 
              onValueChange={(value) => handleUpdate('shotType', value)}
            >
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {shotTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-xs text-muted-foreground">Style</Label>
            <Select 
              value={frame.visualStyle} 
              onValueChange={(value) => handleUpdate('visualStyle', value)}
            >
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {visualStyles.map(style => (
                  <SelectItem key={style} value={style}>{style}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Description */}
        <div>
          <Label className="text-xs text-muted-foreground">Description</Label>
          <Textarea
            value={frame.description}
            onChange={(e) => handleUpdate('description', e.target.value)}
            className="text-sm resize-none"
            rows={2}
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Script/Narration */}
        <div>
          <Label className="text-xs text-muted-foreground">Script/Narration</Label>
          <Textarea
            value={frame.scriptText}
            onChange={(e) => handleUpdate('scriptText', e.target.value)}
            className="text-sm resize-none"
            rows={2}
            placeholder="Add narration or script text..."
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Consistency Locks */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Consistency Locks</Label>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {frame.characterLock ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
              <span className="text-xs">Character</span>
            </div>
            <Switch
              checked={frame.characterLock}
              onCheckedChange={(checked) => handleUpdate('characterLock', checked)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {frame.brandLock ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
              <span className="text-xs">Brand</span>
            </div>
            <Switch
              checked={frame.brandLock}
              onCheckedChange={(checked) => handleUpdate('brandLock', checked)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {frame.visualLock ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
              <span className="text-xs">Visual Style</span>
            </div>
            <Switch
              checked={frame.visualLock}
              onCheckedChange={(checked) => handleUpdate('visualLock', checked)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};