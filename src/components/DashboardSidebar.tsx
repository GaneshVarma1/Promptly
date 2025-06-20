"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Clock, Trash2, User, Layers, ShieldCheck } from "lucide-react";
import { useUser, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface DocumentCounts {
  documents: number;
  saved: number;
  trash: number;
}

interface DashboardSidebarProps {
  currentTab?: 'documents' | 'saved' | 'trash' | 'prompt-gallery';
  onTabChange?: (tab: 'documents' | 'saved' | 'trash' | 'prompt-gallery') => void;
}

export function DashboardSidebar({ currentTab = 'documents', onTabChange }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();
  const [counts, setCounts] = useState<DocumentCounts>({ documents: 0, saved: 0, trash: 0 });

  // Calculate document counts
  useEffect(() => {
    const calculateCounts = () => {
      let documents = 0;
      let saved = 0;
      let trash = 0;

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('document-')) {
          const documentId = key.replace('document-', '');
          const status = localStorage.getItem(`status-${documentId}`) as 'active' | 'saved' | 'trash' || 'active';
          
          if (status === 'active') documents++;
          else if (status === 'saved') saved++;
          else if (status === 'trash') trash++;
        }
      }

      setCounts({ documents, saved, trash });
    };

    calculateCounts();
    
    // Listen for storage changes
    const handleStorageChange = () => calculateCounts();
    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleTabClick = (tab: 'documents' | 'saved' | 'trash' | 'prompt-gallery') => {
    console.log('Sidebar tab clicked:', tab);
    if (onTabChange) {
      console.log('Calling onTabChange with:', tab);
      onTabChange(tab);
    } else {
      console.log('onTabChange is not provided');
    }
  };

  if (!isLoaded) {
    return (
      <aside className="fixed left-0 top-0 w-64 bg-gray-50 dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-900 flex flex-col justify-between py-6 px-4 h-screen z-50">
        <div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-sussie">Promptly</h1>
            <p className="text-sm text-gray-500 dark:text-zinc-400">AI Writing Assistant</p>
          </div>
          <nav className="space-y-1">
            <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse"></div>
            <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse"></div>
            <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse"></div>
          </nav>
        </div>
        <div className="pt-8 border-t border-gray-200 dark:border-zinc-800">
          <div className="h-12 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse"></div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="fixed left-0 top-0 w-64 bg-gray-50 dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-900 flex flex-col justify-between py-6 px-4 h-screen z-50">
      <div>
        <div className="mb-8">
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-sussie">Promptly</h1>
          <p className="text-sm text-gray-500 dark:text-zinc-400">AI Writing Assistant</p>
        </div>
        <nav className="space-y-1">
          <SidebarLink 
            label="Documents" 
            icon={<FileText />} 
            onClick={() => handleTabClick('documents')}
            active={currentTab === 'documents'} 
            badge={counts.documents + counts.saved}
          />
          <SidebarLink 
            label="Saved" 
            icon={<Clock />} 
            onClick={() => handleTabClick('saved')}
            active={currentTab === 'saved'} 
            badge={counts.saved}
          />
          <SidebarLink 
            label="Trash" 
            icon={<Trash2 />} 
            onClick={() => handleTabClick('trash')}
            active={currentTab === 'trash'} 
            badge={counts.trash}
          />
          <SidebarLink label="Account" icon={<User />} href="/dashboard/account" active={pathname === "/dashboard/account"} />
          <SidebarLink 
            label="Prompt Gallery" 
            icon={<Layers />} 
            onClick={() => handleTabClick('prompt-gallery')}
            active={currentTab === 'prompt-gallery'} 
            badge={4}
          />
          <SidebarLink label="Get Pro" icon={<ShieldCheck />} href="#" />
        </nav>
      </div>
      <div className="pt-8 border-t border-gray-200 dark:border-zinc-800">
        <div className="flex items-center gap-3 p-2">
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
                userButtonPopoverCard: "shadow-lg border border-gray-200 dark:border-zinc-700",
                userButtonPopoverActionButton: "hover:bg-gray-100 dark:hover:bg-zinc-800",
              },
            }}
          />
          <div className="flex flex-col items-start flex-1 min-w-0">
            <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user?.firstName || user?.fullName || 'User'}
            </span>
            <span className="text-xs text-gray-500 dark:text-zinc-400 truncate">
              {user?.emailAddresses?.[0]?.emailAddress || 'user@example.com'}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({ label, icon, href, onClick, active, badge }: { 
  label: string; 
  icon: React.ReactNode; 
  href?: string; 
  onClick?: () => void;
  active?: boolean; 
  badge?: number 
}) {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
          active 
            ? "bg-blue-100 dark:bg-zinc-800 text-blue-900 dark:text-white" 
            : "text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-900"
        }`}
      >
        <div className="flex items-center gap-3 flex-1">
          {icon}
          <span>{label}</span>
          {badge !== undefined && <span className="ml-auto bg-blue-500 dark:bg-zinc-700 text-white text-xs rounded-full px-2 py-0.5">{badge}</span>}
        </div>
      </button>
    );
  }

  return (
    <Link 
      href={href || "#"} 
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        active 
          ? "bg-blue-100 dark:bg-zinc-800 text-blue-900 dark:text-white" 
          : "text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-900"
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        {icon}
        <span>{label}</span>
        {badge !== undefined && <span className="ml-auto bg-blue-500 dark:bg-zinc-700 text-white text-xs rounded-full px-2 py-0.5">{badge}</span>}
      </div>
    </Link>
  );
} 