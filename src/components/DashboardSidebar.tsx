"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FileText, 
  Clock, 
  Trash2, 
  User, 
  Layers, 
  ShieldCheck, 
  Menu, 
  Brain,
  FlaskConical,
  BarChart3,
  GraduationCap,
  Zap,
  Users,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Target,
  BookOpen,
  Lightbulb
} from "lucide-react";
import { useUser, UserButton } from "@clerk/nextjs";
import { useDocumentCounts } from '@/hooks/use-document-counts';
import { ThemeSwitcher } from "./ui/theme-switcher";
import { Badge } from "./ui/badge";
import { GradientButton } from "./ui/gradient-button";
import { useState } from "react";

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
  const [expandedSections, setExpandedSections] = useState<string[]>(['workspace']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleTabClick = (tab: 'documents' | 'saved' | 'trash' | 'prompt-gallery' | 'account' | 'models') => {
    console.log('Sidebar tab clicked:', tab);
    if (onTabChange) {
      console.log('Calling onTabChange with:', tab);
      onTabChange(tab);
    } else {
      console.log('onTabChange is not provided');
    }
  };

  const isWorkspaceExpanded = expandedSections.includes('workspace');
  const isToolsExpanded = expandedSections.includes('tools');
  const isInsightsExpanded = expandedSections.includes('insights');
  const isLearningExpanded = expandedSections.includes('learning');

  if (!isLoaded) {
    return (
      <aside className={`fixed left-0 top-0 w-64 bg-white dark:bg-zinc-900 border-r border-gray-100 dark:border-zinc-800 h-screen max-h-[100dvh] z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block shadow-sm overflow-hidden`}>
        <div className="flex flex-col h-full max-h-[100dvh]">
          <div className="flex-shrink-0 p-2 border-b border-gray-100 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-12 bg-gray-100 dark:bg-zinc-800 rounded animate-pulse"></div>
                <div className="h-6 w-6 bg-gray-100 dark:bg-zinc-800 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto px-2 py-2 min-h-0 max-h-[calc(100dvh-10rem)]">
            <nav className="space-y-0.5">
              <div className="h-8 bg-gray-100 dark:bg-zinc-800 rounded-lg animate-pulse"></div>
              <div className="h-8 bg-gray-100 dark:bg-zinc-800 rounded-lg animate-pulse"></div>
              <div className="h-8 bg-gray-100 dark:bg-zinc-800 rounded-lg animate-pulse"></div>
            </nav>
          </div>
          <div className="flex-shrink-0 p-2 border-t border-gray-100 dark:border-zinc-800 pb-[env(safe-area-inset-bottom,0.5rem)]">
            <div className="h-11 bg-gray-100 dark:bg-zinc-700 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`fixed left-0 top-0 w-64 bg-white dark:bg-zinc-900 border-r border-gray-100 dark:border-zinc-800 h-screen max-h-[100dvh] z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block shadow-sm overflow-hidden`}>
      <div className="flex flex-col h-full max-h-[100dvh]">
        {/* Header */}
        <div className="flex-shrink-0 p-3 border-b border-gray-100 dark:border-zinc-800">
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
              <button className="md:hidden p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-all duration-200 hover:scale-110" onClick={onClose} aria-label="Close sidebar">
                <Menu className="w-4 h-4 text-gray-600 dark:text-zinc-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation - Organized Sections */}
        <div className="flex-grow overflow-y-auto px-2 py-2 min-h-0 max-h-[calc(100dvh-10rem)]">
          <nav className="space-y-1">
            
            {/* Workspace Section */}
            <div>
              <SectionHeader 
                title="Workspace" 
                isExpanded={isWorkspaceExpanded}
                onToggle={() => toggleSection('workspace')}
              />
              {isWorkspaceExpanded && (
                <div className="ml-2 space-y-0.5 mt-1">
                  <SidebarLink 
                    label="All Prompts" 
                    icon={<FileText className="w-4 h-4" />} 
                    onClick={() => handleTabClick('documents')}
                    active={currentTab === 'documents'}
                    count={counts.documents + counts.saved}
                  />
                  <SidebarLink 
                    label="Saved" 
                    icon={<Clock className="w-4 h-4" />} 
                    onClick={() => handleTabClick('saved')}
                    active={currentTab === 'saved'}
                    count={counts.saved}
                  />
                  <SidebarLink 
                    label="Trash" 
                    icon={<Trash2 className="w-4 h-4" />} 
                    onClick={() => handleTabClick('trash')}
                    active={currentTab === 'trash'}
                    count={counts.trash}
                  />
                </div>
              )}
            </div>

            {/* Tools Section */}
            <div>
              <SectionHeader 
                title="Tools" 
                isExpanded={isToolsExpanded}
                onToggle={() => toggleSection('tools')}
              />
              {isToolsExpanded && (
                <div className="ml-2 space-y-0.5 mt-1">
                  <SidebarLink 
                    label="Template Gallery" 
                    icon={<Layers className="w-4 h-4" />} 
                    onClick={() => handleTabClick('prompt-gallery')}
                    active={currentTab === 'prompt-gallery'}
                  />
                  <SidebarLink 
                    label="Model Playground" 
                    icon={<Brain className="w-4 h-4" />} 
                    onClick={() => handleTabClick('models')}
                    active={currentTab === 'models'}
                  />
                  <SidebarLink 
                    label="Batch Tester" 
                    icon={<FlaskConical className="w-4 h-4" />} 
                    onClick={() => console.log('Batch Tester coming soon')}
                    active={false}
                    disabled
                    badge="Soon"
                  />
                </div>
              )}
            </div>

            {/* Insights Section - Only show if user has data */}
            {(counts.documents > 0 || counts.saved > 0) && (
              <div>
                <SectionHeader 
                  title="Insights" 
                  isExpanded={isInsightsExpanded}
                  onToggle={() => toggleSection('insights')}
                />
                {isInsightsExpanded && (
                  <div className="ml-2 space-y-2 mt-2">
                    <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Quick Stats</span>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Total</span>
                          <span className="font-medium text-gray-900 dark:text-white">{counts.documents + counts.saved}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Saved</span>
                          <span className="font-medium text-gray-900 dark:text-white">{counts.saved}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Success Rate</span>
                          <span className="font-medium text-green-600 dark:text-green-400">
                            {counts.saved > 0 ? Math.round((counts.saved / (counts.documents + counts.saved)) * 100) : 0}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Learning Section */}
            <div>
              <SectionHeader 
                title="Learning" 
                isExpanded={isLearningExpanded}
                onToggle={() => toggleSection('learning')}
              />
              {isLearningExpanded && (
                <div className="ml-2 space-y-0.5 mt-1">
                  <SidebarLink 
                    label="Prompting 101" 
                    icon={<GraduationCap className="w-4 h-4" />} 
                    onClick={() => console.log('Prompting 101 coming soon')}
                    active={false}
                    disabled
                    badge="Soon"
                  />
                  <SidebarLink 
                    label="Best Practices" 
                    icon={<Target className="w-4 h-4" />} 
                    onClick={() => console.log('Best Practices coming soon')}
                    active={false}
                    disabled
                    badge="Soon"
                  />
                  <SidebarLink 
                    label="Community" 
                    icon={<Users className="w-4 h-4" />} 
                    onClick={() => console.log('Community coming soon')}
                    active={false}
                    disabled
                    badge="Soon"
                  />
                </div>
              )}
            </div>

            {/* Account Section */}
            <div className="pt-2 mt-2 border-t border-gray-100 dark:border-zinc-800">
              <SidebarLink 
                label="Account Settings" 
                icon={<User className="w-4 h-4" />} 
                onClick={() => handleTabClick('account')}
                active={currentTab === 'account'}
              />
            </div>

            {/* Upgrade Section */}
            <div className="pt-2 mt-2 border-t border-gray-100 dark:border-zinc-800">
              <GradientButton className="w-full text-sm py-2.5 px-3 min-w-0 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg" onClick={() => console.log('Get Pro clicked')}>
                <ShieldCheck className="w-4 h-4 mr-2 transition-all duration-200 group-hover:scale-110 group-hover:rotate-3" />
                Upgrade Pro
              </GradientButton>
            </div>
          </nav>
        </div>

        {/* User section - Always at bottom */}
        <div className="flex-shrink-0 p-2 border-t border-gray-100 dark:border-zinc-800 pb-[env(safe-area-inset-bottom,0.5rem)]">
          <div className="flex items-center gap-2 p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-700/50 rounded-lg transition-all duration-200 cursor-pointer group">
            <div className="transition-all duration-200 group-hover:scale-105">
              <UserButton 
                afterSignOutUrl="/"
              />
            </div>
            <div className="flex flex-col items-start flex-1 min-w-0">
              <span className="text-xs font-semibold text-gray-900 dark:text-white truncate transition-all duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
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

function SectionHeader({ title, isExpanded, onToggle }: {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full px-2 py-1.5 text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-zinc-300 transition-all duration-200 group"
    >
      <span className="transition-all duration-200 group-hover:translate-x-1">{title}</span>
      <div className="transition-all duration-200 group-hover:scale-110">
        {isExpanded ? (
          <ChevronDown className="w-3 h-3 transition-transform duration-200" />
        ) : (
          <ChevronRight className="w-3 h-3 transition-transform duration-200" />
        )}
      </div>
    </button>
  );
}

function SidebarLink({ 
  label, 
  icon, 
  href, 
  onClick, 
  active, 
  isPro, 
  disabled, 
  count, 
  badge 
}: { 
  label: string; 
  icon: React.ReactNode; 
  href?: string; 
  onClick?: () => void;
  active?: boolean;
  isPro?: boolean;
  disabled?: boolean;
  count?: number;
  badge?: string;
}) {
  const baseStyles = `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 w-full text-left relative overflow-hidden group`;
  
  const getStyles = () => {
    if (disabled) {
      return `${baseStyles} text-gray-400 dark:text-zinc-500 cursor-not-allowed`;
    }
    if (isPro) {
      return `${baseStyles} bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg transform hover:scale-[1.02]`;
    }
    if (active) {
      return `${baseStyles} bg-blue-50 dark:bg-zinc-800 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 shadow-sm`;
    }
    return `${baseStyles} text-gray-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-800 hover:shadow-sm`;
  };

  const content = (
    <>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="transition-all duration-200 group-hover:scale-110 group-hover:rotate-3 group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {icon}
        </div>
        <span className="font-medium truncate">{label}</span>
      </div>
      <div className="flex items-center gap-1">
        {count !== undefined && count > 0 && (
          <span className="text-xs bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-zinc-300 px-1.5 py-0.5 rounded-full font-medium transition-all duration-200 group-hover:scale-105 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30">
            {count}
          </span>
        )}
        {badge && (
          <Badge variant="secondary" className="text-xs px-1.5 py-0.5 transition-all duration-200 group-hover:scale-105">
            {badge}
          </Badge>
        )}
        {isPro && (
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full transition-all duration-200 group-hover:scale-105 group-hover:bg-white/30">
            Pro
          </span>
        )}
      </div>
    </>
  );

  if (onClick && !disabled) {
    return (
      <button onClick={onClick} className={getStyles()} disabled={disabled}>
        {content}
      </button>
    );
  }

  if (href && !disabled) {
    return (
      <Link href={href} className={getStyles()}>
        {content}
      </Link>
    );
  }

  return (
    <div className={getStyles()}>
      {content}
    </div>
  );
} 