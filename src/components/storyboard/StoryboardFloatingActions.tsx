import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Copy, 
  Trash2, 
  Lock, 
  Unlock, 
  Palette, 
  X,
  Download,
  Share2
} from "lucide-react";
import type { StoryboardFrameData } from "./types";

interface StoryboardFloatingActionsProps {
  selectedFrames: string[];
  frames: StoryboardFrameData[];
  onClearSelection: () => void;
  onBulkUpdate: (updates: Partial<StoryboardFrameData>) => void;
  onBulkDelete: () => void;
  onBulkDuplicate: () => void;
  onBulkExport: () => void;
}

export const StoryboardFloatingActions = ({
  selectedFrames,
  frames,
  onClearSelection,
  onBulkUpdate,
  onBulkDelete,
  onBulkDuplicate,
  onBulkExport
}: StoryboardFloatingActionsProps) => {
  if (selectedFrames.length === 0) return null;

  const selectedFrameData = frames.filter(f => selectedFrames.includes(f.id));
  const allHaveCharacterLock = selectedFrameData.every(f => f.characterLock);
  const allHaveBrandLock = selectedFrameData.every(f => f.brandLock);
  const allHaveVisualLock = selectedFrameData.every(f => f.visualLock);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
      <Card className="card-studio p-4 border-accent-blue bg-card/95 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          {/* Selection Info */}
          <div className="flex items-center gap-2">
            <Badge className="bg-accent-blue text-white">
              {selectedFrames.length} Selected
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              className="w-8 h-8 p-0 hover:bg-red-500/10 hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="w-px h-6 bg-border"></div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {/* Duplicate */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onBulkDuplicate}
              className="hover:bg-accent-blue/10 hover:text-accent-blue"
            >
              <Copy className="w-4 h-4 mr-1" />
              Duplicate
            </Button>

            {/* Delete */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onBulkDelete}
              className="hover:bg-red-500/10 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>

            <div className="w-px h-6 bg-border"></div>

            {/* Consistency Locks */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onBulkUpdate({ characterLock: !allHaveCharacterLock })}
              className={`hover:bg-accent-purple/10 hover:text-accent-purple ${
                allHaveCharacterLock ? 'text-accent-purple' : ''
              }`}
            >
              {allHaveCharacterLock ? (
                <Lock className="w-4 h-4 mr-1" />
              ) : (
                <Unlock className="w-4 h-4 mr-1" />
              )}
              Character
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onBulkUpdate({ brandLock: !allHaveBrandLock })}
              className={`hover:bg-accent-green/10 hover:text-accent-green ${
                allHaveBrandLock ? 'text-accent-green' : ''
              }`}
            >
              {allHaveBrandLock ? (
                <Lock className="w-4 h-4 mr-1" />
              ) : (
                <Unlock className="w-4 h-4 mr-1" />
              )}
              Brand
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onBulkUpdate({ visualLock: !allHaveVisualLock })}
              className={`hover:bg-accent-pink/10 hover:text-accent-pink ${
                allHaveVisualLock ? 'text-accent-pink' : ''
              }`}
            >
              {allHaveVisualLock ? (
                <Lock className="w-4 h-4 mr-1" />
              ) : (
                <Unlock className="w-4 h-4 mr-1" />
              )}
              Visual
            </Button>

            <div className="w-px h-6 bg-border"></div>

            {/* Export Actions */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onBulkExport}
              className="hover:bg-accent-blue/10 hover:text-accent-blue"
            >
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-accent-green/10 hover:text-accent-green"
            >
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};