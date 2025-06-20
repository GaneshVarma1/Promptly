import { DashboardSidebar } from '@/components/DashboardSidebar';

export default function AccountPage() {
  return (
    <div className="flex min-h-screen bg-black">
      <DashboardSidebar />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Account Settings (Coming Soon)</div>
      </main>
    </div>
  );
} 