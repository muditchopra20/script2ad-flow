import { Header } from "@/components/layout/Header";
import { ProjectGrid } from "@/components/dashboard/ProjectGrid";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-[var(--container-max)] py-8">
        <ProjectGrid />
      </main>
    </div>
  );
};

export default Dashboard;