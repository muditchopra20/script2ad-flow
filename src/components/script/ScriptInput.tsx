import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Upload, FileText, Wand2 } from "lucide-react";

export const ScriptInput = () => {
  const [script, setScript] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  const suggestions = [
    { scene: "Opening Hook", suggestion: "Close-up shot of product with dramatic lighting", confidence: 95 },
    { scene: "Problem Statement", suggestion: "Split screen showing before/after scenarios", confidence: 88 },
    { scene: "Solution Demo", suggestion: "Dynamic product showcase with smooth transitions", confidence: 92 },
    { scene: "Call to Action", suggestion: "Bold text overlay with branded background", confidence: 90 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-display font-bold">Script to Storyboard</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Paste your script and let AI suggest the perfect visual frames for your ad
        </p>
      </div>

      <Card className="card-studio p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold">Your Script</label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload File
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Templates
                </Button>
              </div>
            </div>
            
            <Textarea
              placeholder="Paste your ad script here... 

Example:
[SCENE 1 - OPENING]
A busy professional struggles with morning routine, rushing to get ready.

[SCENE 2 - PROBLEM]
Coffee spills, clothes wrinkled, keys missing - chaos everywhere.

[SCENE 3 - SOLUTION]
Introduce your product/service as the solution..."
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="min-h-[300px] text-base leading-relaxed resize-none"
            />
          </div>

          <Button 
            onClick={handleAnalyze}
            disabled={!script.trim() || isAnalyzing}
            className="w-full bg-accent-blue hover:bg-accent-blue/90 h-12 text-lg font-semibold"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                Analyzing Script...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 mr-2" />
                Generate Storyboard
              </>
            )}
          </Button>
        </div>
      </Card>

      {(isAnalyzing || suggestions.length > 0) && (
        <Card className="card-studio p-6 animate-slide-up">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent-blue" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">AI Scene Suggestions</h3>
                <p className="text-muted-foreground">Smart recommendations based on your script</p>
              </div>
            </div>

            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="p-4 rounded-lg border bg-surface/50 hover:bg-surface transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-primary">{suggestion.scene}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {suggestion.confidence}% match
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{suggestion.suggestion}</p>
                </div>
              ))}
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90">
              Create Storyboard from Suggestions
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};