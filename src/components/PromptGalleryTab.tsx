"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Copy, 
  Star, 
  FileText, 
  Mail, 
  Code, 
  Briefcase,
  Users,
  BookOpen,
  Zap,
  ArrowRight,
  X,
  Filter,
  Grid,
  List,
  TrendingUp,
  Award,
  Clock,
  Brain,
  Target,
  BarChart3,
  Shield,
  Heart,
  GraduationCap,
  Building,
  Lightbulb,
  Palette,
  Calculator,
  Scale
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AdvancedTemplateLibrary } from "@/lib/advanced-templates";
import { useDocuments } from '@/hooks/use-documents';
import { useUser } from '@clerk/nextjs';

// Icon mapping for different domains and categories
const getDomainIcon = (domain: string, category?: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'business': <Briefcase className="w-5 h-5" />,
    'technology': <Code className="w-5 h-5" />,
    'marketing': <TrendingUp className="w-5 h-5" />,
    'design': <Palette className="w-5 h-5" />,
    'finance': <Calculator className="w-5 h-5" />,
    'legal': <Scale className="w-5 h-5" />,
    'creative': <Lightbulb className="w-5 h-5" />,
    'healthcare': <Heart className="w-5 h-5" />,
    'education': <GraduationCap className="w-5 h-5" />,
    'research': <BookOpen className="w-5 h-5" />,
    'consulting': <Target className="w-5 h-5" />,
    'strategy': <BarChart3 className="w-5 h-5" />,
    'general': <Brain className="w-5 h-5" />,
    'analysis': <Brain className="w-5 h-5" />
  };
  
  return iconMap[domain] || <FileText className="w-5 h-5" />;
};

const getComplexityColor = (complexity: string) => {
  const colorMap: Record<string, string> = {
    'beginner': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'intermediate': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'expert': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  };
  
  return colorMap[complexity] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
};

export default function PromptGalleryTab() {
  const router = useRouter();
  const { user } = useUser();
  const { createDocument } = useDocuments();

  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedComplexity, setSelectedComplexity] = useState("all");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recent' | 'alphabetical'>('alphabetical');

  // Get all templates and organize them
  const allTemplates = useMemo(() => AdvancedTemplateLibrary.getAllTemplates(), []);
  const categorizedTemplates = useMemo(() => AdvancedTemplateLibrary.getTemplatesByCategory(), []);
  const libraryStats = useMemo(() => AdvancedTemplateLibrary.getLibraryStats(), []);

  // Get unique domains and complexities for filters
  const domains = useMemo(() => {
    const domainSet = new Set(allTemplates.map(t => t.domain));
    return Array.from(domainSet).sort();
  }, [allTemplates]);

  const complexities = useMemo(() => {
    const complexitySet = new Set(allTemplates.map(t => t.complexity));
    return Array.from(complexitySet).sort();
  }, [allTemplates]);

  // Filter and sort templates
  const filteredTemplates = useMemo(() => {
    let filtered = allTemplates;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(query) ||
        template.description.toLowerCase().includes(query) ||
        template.metadata.tags.some(tag => tag.includes(query))
      );
    }

    // Apply domain filter
    if (selectedDomain !== "all") {
      filtered = filtered.filter(template => template.domain === selectedDomain);
    }

    // Apply complexity filter
    if (selectedComplexity !== "all") {
      filtered = filtered.filter(template => template.complexity === selectedComplexity);
    }

    // Apply sorting
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.metadata.updated_at).getTime() - new Date(a.metadata.updated_at).getTime());
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [allTemplates, searchQuery, selectedDomain, selectedComplexity, sortBy]);

  const handleUseTemplate = async (template: any) => {
    try {
      if (!user) {
        router.push('/sign-in');
        return;
      }

      // Create a new document with the template
      const newDoc = await createDocument(
        `${template.name} - ${new Date().toLocaleDateString()}`,
        template.template
      );

      if (newDoc) {
        router.push(`/results?id=${newDoc}`);
      }
    } catch (error) {
      console.error('Error using template:', error);
    }
  };

  const copyTemplateToClipboard = (template: any) => {
    navigator.clipboard.writeText(template.template);
    // Could add a toast notification here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Prompt Templates
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Professional templates organized by categories and complexity levels
        </p>
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search templates, tags, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <Select value={selectedDomain} onValueChange={setSelectedDomain}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Domain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Domains</SelectItem>
                {domains.map(domain => (
                  <SelectItem key={domain} value={domain}>
                    {domain.charAt(0).toUpperCase() + domain.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {complexities.map(complexity => (
                  <SelectItem key={complexity} value={complexity}>
                    {complexity.charAt(0).toUpperCase() + complexity.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="alphabetical">A-Z</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Active filters */}
        {(searchQuery || selectedDomain !== 'all' || selectedComplexity !== 'all') && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t">
            <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                Search: {searchQuery}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
              </Badge>
            )}
            {selectedDomain !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                Domain: {selectedDomain}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedDomain('all')} />
              </Badge>
            )}
            {selectedComplexity !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                Level: {selectedComplexity}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedComplexity('all')} />
              </Badge>
            )}
          </div>
        )}
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredTemplates.length} of {allTemplates.length} templates
        </p>
      </div>

      {/* Templates Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "space-y-4"
      }>
        {filteredTemplates.map((template) => (
          <Card 
            key={template.id} 
            className={`group hover:shadow-lg transition-all duration-200 ${
              viewMode === 'list' ? 'p-4' : 'p-6'
            }`}
          >
            <div className={viewMode === 'list' ? 'flex items-start gap-4' : 'space-y-4'}>
              {/* Icon and Title */}
              <div className={viewMode === 'list' ? 'flex-shrink-0' : ''}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    {getDomainIcon(template.domain)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {template.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={viewMode === 'list' ? 'flex-1' : ''}>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {template.description}
                </p>

                {/* Metadata */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={getComplexityColor(template.complexity)}>
                    {template.complexity}
                  </Badge>
                  <Badge variant="outline">
                    {template.domain}
                  </Badge>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.metadata.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {template.metadata.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{template.metadata.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleUseTemplate(template)}
                    className="flex-1"
                    size="sm"
                  >
                    Use Template
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyTemplateToClipboard(template)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <Card className="p-12 text-center">
          <div className="max-w-md mx-auto">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No templates found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search criteria or filters to find the templates you're looking for.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedDomain('all');
                setSelectedComplexity('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}