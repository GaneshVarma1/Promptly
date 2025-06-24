"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Clock, Trash2, User, Layers, ShieldCheck, Menu, Brain } from "lucide-react";
import { useUser, UserButton } from "@clerk/nextjs";
import { useDocumentCounts } from '@/hooks/use-document-counts';
import { ThemeSwitcher } from "./ui/theme-switcher";
import { Badge } from "./ui/badge";
import { GradientButton } from "./ui/gradient-button";

interface DashboardSidebarProps {
  currentTab?: 'documents' | 'saved' | 'trash' | 'prompt-gallery' | 'account' | 'models';
  onTabChange?: (tab: 'documents' | 'saved' | 'trash' | 'prompt-gallery' | 'account' | 'models') => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function DashboardSidebar({ currentTab = 'documents', onTabChange, isOpen = true, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();
  const counts = useDocumentCounts();

  const handleTabClick = (tab: 'documents' | 'saved' | 'trash' | 'prompt-gallery' | 'account' | 'models') => {
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
      <aside className={`fixed left-0 top-0 w-64 bg-white dark:bg-zinc-900 border-r border-gray-100 dark:border-zinc-800 h-screen z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block shadow-sm`}>
        <div className="flex flex-col h-full">
          {/* Top controls skeleton */}
          <div className="flex-shrink-0 p-2 border-b border-gray-100 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-12 bg-gray-100 dark:bg-zinc-800 rounded animate-pulse"></div>
                <div className="h-6 w-6 bg-gray-100 dark:bg-zinc-800 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
          
          {/* Navigation skeleton */}
          <div className="flex-grow overflow-y-auto px-2 py-2 min-h-0">
            <nav className="space-y-0.5">
              <div className="h-8 bg-gray-100 dark:bg-zinc-800 rounded-lg animate-pulse"></div>
              <div className="h-8 bg-gray-100 dark:bg-zinc-800 rounded-lg animate-pulse"></div>
              <div className="h-8 bg-gray-100 dark:bg-zinc-800 rounded-lg animate-pulse"></div>
              <div className="h-8 bg-gray-100 dark:bg-zinc-800 rounded-lg animate-pulse"></div>
              <div className="pt-1.5 mt-1.5 border-t border-gray-100 dark:border-zinc-800">
                <div className="h-8 bg-gradient-to-r from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800 rounded-lg animate-pulse"></div>
              </div>
            </nav>
          </div>
          
          {/* User skeleton at bottom */}
          <div className="flex-shrink-0 p-2 border-t border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50">
            <div className="h-11 bg-gray-100 dark:bg-zinc-700 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`fixed left-0 top-0 w-64 bg-white dark:bg-zinc-900 border-r border-gray-100 dark:border-zinc-800 h-screen z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block shadow-sm`}>
      <div className="flex flex-col h-full">
        {/* Top controls - Theme + Beta + Mobile close */}
        <div className="flex-shrink-0 p-2 border-b border-gray-100 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground font-league-spartan">
                Promptly.
              </span>
              <Badge variant="secondary" className="text-xs px-2 py-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse mr-1" />
                Beta
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <button className="md:hidden p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors" onClick={onClose} aria-label="Close sidebar">
                <Menu className="w-4 h-4 text-gray-600 dark:text-zinc-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation - Takes most space */}
        <div className="flex-grow overflow-y-auto px-2 py-2 min-h-0">
          <nav className="space-y-0.5">
            <SidebarLink 
              label="Documents" 
              icon={<FileText className="w-4 h-4" />} 
              onClick={() => handleTabClick('documents')}
              active={currentTab === 'documents'} 
            />
            <SidebarLink 
              label="Saved" 
              icon={<Clock className="w-4 h-4" />} 
              onClick={() => handleTabClick('saved')}
              active={currentTab === 'saved'} 
            />
            <SidebarLink 
              label="Trash" 
              icon={<Trash2 className="w-4 h-4" />} 
              onClick={() => handleTabClick('trash')}
              active={currentTab === 'trash'} 
            />
            <SidebarLink 
              label="Account" 
              icon={<User className="w-4 h-4" />} 
              onClick={() => handleTabClick('account')}
              active={currentTab === 'account'} 
            />
            <SidebarLink 
              label="Prompt Gallery" 
              icon={<Layers className="w-4 h-4" />} 
              onClick={() => handleTabClick('prompt-gallery')}
              active={currentTab === 'prompt-gallery'} 
            />
            <SidebarLink 
              label="Models Testing" 
              icon={<Brain className="w-4 h-4" />} 
              onClick={() => handleTabClick('models')}
              active={currentTab === 'models'} 
            />
            <div className="pt-1.5 mt-1.5 border-t border-gray-100 dark:border-zinc-800">
              <GradientButton className="w-full text-sm py-2.5 px-3 min-w-0" onClick={() => console.log('Get Pro clicked')}>
                <ShieldCheck className="w-4 h-4 mr-2" />
                Get Pro
              </GradientButton>
            </div>
          </nav>
        </div>

        {/* User section - Always at bottom */}
        <div className="flex-shrink-0 p-2 border-t border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50">
          <div className="flex items-center gap-2 p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-700/50 rounded-lg transition-colors cursor-pointer">
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 ring-2 ring-white dark:ring-zinc-700 shadow-sm",
                  userButtonPopoverCard: "shadow-xl border border-gray-200 dark:border-zinc-700",
                  userButtonPopoverActionButton: "hover:bg-gray-100 dark:hover:bg-zinc-800",
                },
              }}
            />
            <div className="flex flex-col items-start flex-1 min-w-0">
              <span className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                {user?.firstName || user?.fullName || 'User'}
              </span>
              <span className="text-xs text-gray-500 dark:text-zinc-400 truncate">
                {user?.emailAddresses?.[0]?.emailAddress || 'user@example.com'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({ label, icon, href, onClick, active, isPro }: { 
  label: string; 
  icon: React.ReactNode; 
  href?: string; 
  onClick?: () => void;
  active?: boolean;
  isPro?: boolean;
}) {
  const baseStyles = `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 w-full text-left relative overflow-hidden`;
  
  const getStyles = () => {
    if (isPro) {
      return `${baseStyles} bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg transform hover:scale-[1.02]`;
    }
    if (active) {
      return `${baseStyles} bg-blue-50 dark:bg-zinc-800 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 shadow-sm`;
    }
    return `${baseStyles} text-gray-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-800 hover:shadow-sm`;
  };

  if (onClick) {
    return (
      <button onClick={onClick} className={getStyles()}>
        <div className="flex items-center gap-3 flex-1">
          {icon}
          <span className="font-medium">{label}</span>
        </div>
        {isPro && (
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
            Pro
          </span>
        )}
      </button>
    );
  }

  return (
    <Link href={href || "#"} className={getStyles()}>
      <div className="flex items-center gap-3 flex-1">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      {isPro && (
        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
          Pro
        </span>
      )}
    </Link>
  );
} 