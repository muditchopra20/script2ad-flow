import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Video, Zap } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-accent-blue" />
        <div className="absolute bottom-40 right-32 w-24 h-24 rounded-full bg-accent-purple" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-accent-green" />
      </div>

      <div className="container max-w-[var(--container-max)] z-10">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border text-sm font-medium">
              <Sparkles className="w-4 h-4 text-accent-blue" />
              AI-Powered Ad Creation
            </div>
            
            <h1 className="text-hero max-w-4xl mx-auto leading-none tracking-tight">
              Script to Video
              <br />
              <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                In One Workflow
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Transform your scripts into professional video ads with AI-powered storyboarding, 
              brand consistency, and multi-format export. The future of ad creation is here.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold">
              Start Creating
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg font-semibold border-2 hover-accent">
              <Video className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="text-center space-y-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 rounded-full bg-accent-blue/10 flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6 text-accent-blue" />
              </div>
              <h3 className="text-title font-semibold">Smart Storyboarding</h3>
              <p className="text-muted-foreground">AI reads your script and suggests optimal frames automatically</p>
            </div>
            
            <div className="text-center space-y-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 rounded-full bg-accent-purple/10 flex items-center justify-center mx-auto">
                <Video className="w-6 h-6 text-accent-purple" />
              </div>
              <h3 className="text-title font-semibold">Brand Consistency</h3>
              <p className="text-muted-foreground">Lock characters and visual style across your entire ad</p>
            </div>
            
            <div className="text-center space-y-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6 text-accent-green" />
              </div>
              <h3 className="text-title font-semibold">Multi-Format Export</h3>
              <p className="text-muted-foreground">16:9, 9:16, 1:1 - optimized for every platform</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};