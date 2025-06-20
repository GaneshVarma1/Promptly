import { DashboardSidebar } from '@/components/DashboardSidebar';

export default function SavedPage() {
  return (
    <div className="flex min-h-screen bg-black">
      <DashboardSidebar />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Saved Prompts (Coming Soon)</div>
      </main>
    </div>
  );
} 