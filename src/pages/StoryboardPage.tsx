import { Header } from "@/components/layout/Header";
import { StoryboardEditor } from "@/components/storyboard/StoryboardEditor";

const StoryboardPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <StoryboardEditor />
      </main>
    </div>
  );
};

export default StoryboardPage;