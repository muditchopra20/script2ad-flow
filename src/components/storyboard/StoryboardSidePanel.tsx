import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { X, Save } from "lucide-react";
import { StoryboardFrameData } from "./StoryboardEditor";

interface StoryboardSidePanelProps {
  frame: StoryboardFrameData;
  onUpdate: (frameId: string, updates: Partial<StoryboardFrameData>) => void;
  onClose: () => void;
}

const cameraAngles = [
  "Eye Level",
  "High Angle",
  "Low Angle",
  "Bird's Eye",
  "Worm's Eye",
  "Dutch Angle"
];

const lighting = [
  "Natural",
  "Dramatic",
  "Soft",
  "Hard",
  "Backlit",
  "Side Lit",
  "Studio"
];

const moods = [
  "Professional",
  "Energetic",
  "Calm",
  "Dramatic",
  "Playful",
  "Serious",
  "Warm",
  "Cool"
];

export const StoryboardSidePanel = ({ frame, onUpdate, onClose }: StoryboardSidePanelProps) => {
  const handleUpdate = (field: keyof StoryboardFrameData, value: any) => {
    onUpdate(frame.id, { [field]: value });
  };

  return (
    <div className="w-96 border-l bg-background h-full overflow-auto">
      <Card className="h-full rounded-none border-0 shadow-none">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="font-semibold">Advanced Settings</h3>
            <p className="text-sm text-muted-foreground">Frame #{frame.id}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Basic Info */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Basic Information</h4>
            
            <div>
              <Label className="text-xs">Scene Title</Label>
              <Input
                value={frame.scene}
                onChange={(e) => handleUpdate('scene', e.target.value)}
              />
            </div>
            
            <div>
              <Label className="text-xs">Duration</Label>
              <Input
                value={frame.duration}
                onChange={(e) => handleUpdate('duration', e.target.value)}
              />
            </div>
            
            <div>
              <Label className="text-xs">Timestamp</Label>
              <Input
                value={frame.timestamp}
                onChange={(e) => handleUpdate('timestamp', e.target.value)}
              />
            </div>
          </div>

          <Separator />

          {/* Visual Settings */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Visual Settings</h4>
            
            <div>
              <Label className="text-xs">Shot Type</Label>
              <Select 
                value={frame.shotType} 
                onValueChange={(value) => handleUpdate('shotType', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Close-up">Close-up</SelectItem>
                  <SelectItem value="Medium Shot">Medium Shot</SelectItem>
                  <SelectItem value="Wide Shot">Wide Shot</SelectItem>
                  <SelectItem value="Extreme Close-up">Extreme Close-up</SelectItem>
                  <SelectItem value="Extreme Wide Shot">Extreme Wide Shot</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-xs">Camera Angle</Label>
              <Select defaultValue="Eye Level">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cameraAngles.map(angle => (
                    <SelectItem key={angle} value={angle}>{angle}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-xs">Lighting</Label>
              <Select defaultValue="Natural">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {lighting.map(light => (
                    <SelectItem key={light} value={light}>{light}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-xs">Mood</Label>
              <Select defaultValue="Professional">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {moods.map(mood => (
                    <SelectItem key={mood} value={mood}>{mood}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Content */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Content</h4>
            
            <div>
              <Label className="text-xs">Description</Label>
              <Textarea
                value={frame.description}
                onChange={(e) => handleUpdate('description', e.target.value)}
                rows={3}
              />
            </div>
            
            <div>
              <Label className="text-xs">Script/Narration</Label>
              <Textarea
                value={frame.scriptText}
                onChange={(e) => handleUpdate('scriptText', e.target.value)}
                rows={3}
                placeholder="Add narration or script text..."
              />
            </div>
          </div>

          <Separator />

          {/* Consistency Locks */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Consistency Locks</h4>
            
            <div className="flex items-center justify-between">
              <Label className="text-sm">Character Consistency</Label>
              <Switch
                checked={frame.characterLock}
                onCheckedChange={(checked) => handleUpdate('characterLock', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label className="text-sm">Brand Consistency</Label>
              <Switch
                checked={frame.brandLock}
                onCheckedChange={(checked) => handleUpdate('brandLock', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label className="text-sm">Visual Style Lock</Label>
              <Switch
                checked={frame.visualLock}
                onCheckedChange={(checked) => handleUpdate('visualLock', checked)}
              />
            </div>
          </div>

          <Separator />

          {/* Advanced Controls */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Advanced Controls</h4>
            
            <div>
              <Label className="text-xs">Motion Intensity</Label>
              <Slider defaultValue={[50]} max={100} step={1} className="mt-2" />
            </div>
            
            <div>
              <Label className="text-xs">Color Saturation</Label>
              <Slider defaultValue={[75]} max={100} step={1} className="mt-2" />
            </div>
            
            <div>
              <Label className="text-xs">Contrast</Label>
              <Slider defaultValue={[60]} max={100} step={1} className="mt-2" />
            </div>
            
            <div>
              <Label className="text-xs">Focus Depth</Label>
              <Slider defaultValue={[40]} max={100} step={1} className="mt-2" />
            </div>
          </div>

          <Separator />

          {/* AI Generation Settings */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">AI Generation</h4>
            
            <div>
              <Label className="text-xs">Style Strength</Label>
              <Slider defaultValue={[70]} max={100} step={1} className="mt-2" />
            </div>
            
            <div>
              <Label className="text-xs">Creativity Level</Label>
              <Slider defaultValue={[60]} max={100} step={1} className="mt-2" />
            </div>
            
            <Button className="w-full" variant="outline">
              Regenerate with Settings
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};