import { Header } from "@/components/layout/Header";
import { ScriptInput } from "@/components/script/ScriptInput";

const ScriptEditor = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-[var(--container-max)] py-8">
        <ScriptInput />
      </main>
    </div>
  );
};

export default ScriptEditor;