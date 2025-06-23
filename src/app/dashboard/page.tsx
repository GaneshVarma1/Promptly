"use client";

import { useState, useEffect } from "react";
import { Menu } from 'lucide-react';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { DocumentsTab } from '@/components/DocumentsTab';
import { SavedTab } from '@/components/SavedTab';
import { TrashTab } from '@/components/TrashTab';
import PromptGalleryTab from '@/components/PromptGalleryTab';
import { AccountSettings } from '@/components/AccountSettings';
import ModelsTestingPage from './models/page';

export default function DashboardPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<'documents' | 'saved' | 'trash' | 'prompt-gallery' | 'account' | 'models'>('documents');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to home page if user is not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    }
  }, [isLoaded, isSignedIn, router]);

  const handleTabChange = (tab: 'documents' | 'saved' | 'trash' | 'prompt-gallery' | 'account' | 'models') => {
    setCurrentTab(tab);
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case 'documents':
        return <DocumentsTab />;
      case 'saved':
        return <SavedTab />;
      case 'trash':
        return <TrashTab />;
      case 'prompt-gallery':
        return <PromptGalleryTab />;
      case 'account':
        return <AccountSettings />;
      case 'models':
        return <ModelsTestingPage />;
      default:
        return <DocumentsTab />;
    }
  };

  // Show loading spinner while checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render the dashboard if user is not signed in
  if (!isSignedIn) {
    return null; // This will be handled by the useEffect redirect
  }

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-zinc-950 overflow-hidden">
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center p-3 bg-gray-50 dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-900 h-16">
        <button 
          onClick={() => setSidebarOpen(true)} 
          className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors" 
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5 text-gray-600 dark:text-zinc-400" />
        </button>
        <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white font-sussie">Promptly</span>
      </div>
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}
      
      {/* Fixed Sidebar */}
      <DashboardSidebar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          setSidebarOpen(false);
        }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Main Content */}
      <main className="flex-1 h-screen overflow-hidden pt-16 md:pt-0 md:ml-0">
        <div className="h-full flex flex-col p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="flex-1 overflow-y-auto">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
