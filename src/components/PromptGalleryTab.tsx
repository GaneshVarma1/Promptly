"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Copy, 
  FileText, 
  Mail, 
  Code, 
  Briefcase,
  Users,
  BookOpen,
  Zap,
  ArrowRight,
  X
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Template {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  icon: React.ReactNode;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  uses: number;
}

const templates: Template[] = [
  {
    id: 'email-professional',
    title: 'Professional Email Writer',
    description: 'Create polished business emails with proper tone and structure',
    content: 'Write a professional email to [RECIPIENT] about [SUBJECT]. The tone should be [TONE: formal/friendly/urgent]. Include: [MAIN_POINTS]. End with [CALL_TO_ACTION].',
    category: 'Business Communication',
    icon: <Mail className="w-5 h-5" />,
    difficulty: 'Beginner',
    uses: 1250
  },
  {
    id: 'code-review',
    title: 'Code Review Assistant',
    description: 'Get detailed feedback on code quality, performance, and best practices',
    content: 'Review the following [LANGUAGE] code and provide feedback on:\n1. Code quality and readability\n2. Performance optimizations\n3. Security considerations\n4. Best practices\n5. Specific improvements\n\nCode:\n```\n[YOUR_CODE]\n```',
    category: 'Development',
    icon: <Code className="w-5 h-5" />,
    difficulty: 'Intermediate',
    uses: 890
  },
  {
    id: 'product-description',
    title: 'Product Description Generator',
    description: 'Create compelling product descriptions that convert browsers to buyers',
    content: 'Write a compelling product description for [PRODUCT_NAME], a [PRODUCT_TYPE] designed for [TARGET_AUDIENCE]. Highlight these key features: [FEATURES]. Include benefits, use cases, and a compelling call-to-action. Tone: [TONE].',
    category: 'Marketing',
    icon: <Briefcase className="w-5 h-5" />,
    difficulty: 'Beginner',
    uses: 650
  },
  {
    id: 'meeting-summary',
    title: 'Meeting Summary Creator',
    description: 'Transform meeting notes into structured, actionable summaries',
    content: 'Create a structured summary of this meeting:\n\nMeeting: [MEETING_TITLE]\nDate: [DATE]\nAttendees: [ATTENDEES]\nNotes: [MEETING_NOTES]\n\nPlease organize into:\n- Key Decisions\n- Action Items (with owners and deadlines)\n- Follow-up Required\n- Next Steps',
    category: 'Business Communication',
    icon: <Users className="w-5 h-5" />,
    difficulty: 'Beginner',
    uses: 420
  },
  {
    id: 'learning-explainer',
    title: 'Concept Explainer',
    description: 'Break down complex topics into digestible explanations',
    content: 'Explain [CONCEPT/TOPIC] to someone who is [AUDIENCE_LEVEL: beginner/intermediate/advanced] in [FIELD]. Use analogies, examples, and break it down into simple steps. Include:\n1. Simple definition\n2. Why it matters\n3. Real-world examples\n4. Common misconceptions\n5. Next steps to learn more',
    category: 'Education',
    icon: <BookOpen className="w-5 h-5" />,
    difficulty: 'Intermediate',
    uses: 320
  },
  {
    id: 'content-optimizer',
    title: 'Content Performance Optimizer',
    description: 'Improve existing content for better engagement and SEO',
    content: 'Analyze and optimize this content for better performance:\n\n[CONTENT]\n\nPlease provide:\n1. SEO improvements (keywords, meta descriptions)\n2. Readability enhancements\n3. Engagement optimization\n4. Structure improvements\n5. Call-to-action recommendations\n\nTarget audience: [AUDIENCE]\nGoal: [GOAL]',
    category: 'Marketing',
    icon: <Zap className="w-5 h-5" />,
    difficulty: 'Advanced',
    uses: 180
  }
];

const categories = ['All', 'Business Communication', 'Development', 'Marketing', 'Education'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function PromptGalleryTab() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || template.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleUseTemplate = (template: Template) => {
    // Create new document with template content
    const newId = `doc-${Date.now()}`;
    localStorage.setItem(`document-${newId}`, template.content);
    localStorage.setItem(`title-${newId}`, template.title);
    
    // Trigger documents update
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('documents-updated'));
    }
    
    router.push(`/results?id=${newId}`);
  };

  const handleCopyTemplate = (content: string) => {
    navigator.clipboard.writeText(content);
    // Could add a toast notification here
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Advanced': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedDifficulty !== 'All' || searchQuery !== '';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Prompt Template Gallery
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Professional templates to accelerate your prompt engineering
          </p>
        </div>

        {/* Search and Filters Row */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar - 75% Width */}
          <div className="relative lg:w-3/4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 w-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filters - 25% Width */}
          <div className="lg:w-1/4">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex-1 min-w-0"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                {/* Difficulty Filter */}
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex-1 min-w-0"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>

              {/* Clear Filters and Results Count */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 text-xs"
                  >
                    Clear
                  </Button>
                )}
                
                {/* Results Count */}
                <div className="text-xs text-gray-500 dark:text-gray-400 ml-auto sm:ml-0">
                  {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="group hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600">
            <div className="p-4 md:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                    {template.icon}
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      {template.category}
                    </div>
                    <Badge className={`text-xs ${getDifficultyColor(template.difficulty)}`}>
                      {template.difficulty}
                    </Badge>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {template.uses} uses
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {template.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {template.description}
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-700 dark:text-gray-300 font-mono line-clamp-3">
                    {template.content}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-4 md:px-6 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => handleCopyTemplate(template.content)}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
                  title="Copy template"
                >
                  <Copy className="w-4 h-4" />
                </button>
                
                <Button 
                  onClick={() => handleUseTemplate(template)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                >
                  Use Template
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No templates found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Try adjusting your search or filter criteria
          </p>
          {hasActiveFilters && (
            <Button onClick={clearFilters} variant="outline">
              Clear all filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
} 