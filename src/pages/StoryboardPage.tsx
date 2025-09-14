import { Header } from "@/components/layout/Header";
import { StoryboardEditor } from "@/components/storyboard/StoryboardEditor";

const StoryboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-[var(--container-max)] py-8">
        <StoryboardEditor />
      </main>
    </div>
  );
};

export default StoryboardPage;