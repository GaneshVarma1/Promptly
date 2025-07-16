"use client";

import { useState, useEffect } from "react";
import { Search, FileText, Copy, Star, Download } from 'lucide-react';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { useRouter } from 'next/navigation';
import { useUser } from "@clerk/nextjs";
import { useDocuments } from '@/hooks/use-documents';

// Sample prompt templates
const promptTemplates = [
  {
    id: 1,
    title: "Blog Post Writer",
    description: "Generate engaging blog posts on any topic",
    prompt: "Write a comprehensive blog post about [TOPIC]. Include an engaging introduction, 3-5 main points with examples, and a compelling conclusion. Target audience: [AUDIENCE]. Tone: [TONE].",
    category: "Content Writing",
    difficulty: "Beginner"
  },
  {
    id: 2,
    title: "Code Reviewer",
    description: "Review code for best practices and improvements",
    prompt: "Review the following code and provide feedback on:\n1. Code quality and readability\n2. Performance optimizations\n3. Security considerations\n4. Best practices\n5. Specific improvements\n\n```\n[YOUR_CODE]\n```",
    category: "Development",
    difficulty: "Intermediate"
  },
  {
    id: 3,
    title: "Email Marketing",
    description: "Create compelling marketing emails",
    prompt: "Create a marketing email for [PRODUCT/SERVICE]. Include:\n- Subject line (A/B test options)\n- Personalized greeting\n- Problem/solution narrative\n- Clear call-to-action\n- Professional closing\nTarget: [AUDIENCE], Goal: [OBJECTIVE]",
    category: "Marketing",
    difficulty: "Beginner"
  },
  {
    id: 4,
    title: "Data Analyst",
    description: "Analyze data and provide insights",
    prompt: "Analyze the following data and provide insights:\n\n[DATA]\n\nPlease provide:\n1. Key trends and patterns\n2. Statistical summary\n3. Actionable recommendations\n4. Potential next steps\n5. Data visualization suggestions",
    category: "Data Science",
    difficulty: "Advanced"
  },
  {
    id: 5,
    title: "Social Media Manager",
    description: "Create engaging social media content",
    prompt: "Create a social media post for [PLATFORM] about [TOPIC]. Include:\n- Engaging headline\n- Relevant hashtags\n- Call-to-action\n- Visual content suggestions\nTarget audience: [AUDIENCE]",
    category: "Marketing",
    difficulty: "Beginner"
  },
  {
    id: 6,
    title: "Product Manager",
    description: "Develop product strategy and roadmaps",
    prompt: "Create a product strategy for [PRODUCT/FEATURE]. Include:\n- Market analysis\n- User personas\n- Feature prioritization\n- Success metrics\n- Implementation timeline",
    category: "Business",
    difficulty: "Advanced"
  },
  {
    id: 7,
    title: "Creative Writer",
    description: "Generate creative stories and content",
    prompt: "Write a creative story about [THEME/TOPIC]. Include:\n- Compelling characters\n- Engaging plot\n- Vivid descriptions\n- Emotional arc\nStyle: [WRITING_STYLE]",
    category: "Creative Writing",
    difficulty: "Intermediate"
  },
  {
    id: 8,
    title: "Technical Writer",
    description: "Create technical documentation",
    prompt: "Write technical documentation for [FEATURE/SYSTEM]. Include:\n- Overview and purpose\n- Step-by-step instructions\n- Code examples\n- Troubleshooting guide\n- Best practices",
    category: "Development",
    difficulty: "Intermediate"
  },
  {
    id: 9,
    title: "Financial Analyst",
    description: "Analyze financial data and reports",
    prompt: "Analyze the financial data for [COMPANY/PROJECT]. Include:\n- Key financial metrics\n- Trend analysis\n- Risk assessment\n- Investment recommendations\n- Future projections",
    category: "Finance",
    difficulty: "Advanced"
  },
  {
    id: 10,
    title: "Customer Support",
    description: "Draft professional customer responses",
    prompt: "Write a customer support response for [ISSUE]. Include:\n- Empathetic acknowledgment\n- Clear explanation\n- Solution steps\n- Follow-up actions\n- Professional tone",
    category: "Business",
    difficulty: "Beginner"
  },
  {
    id: 11,
    title: "Research Assistant",
    description: "Conduct comprehensive research",
    prompt: "Research [TOPIC] and provide:\n- Key findings\n- Relevant sources\n- Analysis summary\n- Recommendations\n- Further research areas",
    category: "Research",
    difficulty: "Intermediate"
  },
  {
    id: 12,
    title: "Legal Assistant",
    description: "Draft legal documents and contracts",
    prompt: "Draft a [DOCUMENT_TYPE] for [PURPOSE]. Include:\n- Clear terms and conditions\n- Legal protections\n- Compliance requirements\n- Risk mitigation\n- Professional language",
    category: "Legal",
    difficulty: "Advanced"
  }
];

const categories = ["All", "Content Writing", "Development", "Marketing", "Data Science", "Business", "Creative Writing", "Finance", "Research", "Legal"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

export default function PromptGalleryPage() {
  const { isSignedIn, isLoaded } = useUser();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [currentTab, setCurrentTab] = useState<'documents' | 'saved' | 'trash' | 'prompt-gallery'>('prompt-gallery');
  const [loadingTemplate, setLoadingTemplate] = useState<string | null>(null);
  const router = useRouter();
  const { createDocument } = useDocuments();

  // Redirect to home page if user is not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    }
  }, [isLoaded, isSignedIn, router]);

  const handleTabChange = (tab: 'documents' | 'saved' | 'trash' | 'prompt-gallery') => {
    setCurrentTab(tab);
    if (tab !== 'prompt-gallery') {
      router.push(`/dashboard${tab === 'documents' ? '' : `/${tab}`}`);
    }
  };

  const filteredTemplates = promptTemplates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(search.toLowerCase()) ||
                         template.description.toLowerCase().includes(search.toLowerCase()) ||
                         template.prompt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || template.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const handleUseTemplate = async (template: any) => {
    try {
      if (!isSignedIn) {
        router.push('/');
        return;
      }

      setLoadingTemplate(template.id.toString());

      // Create a new document with the template
      const newDocId = await createDocument(
        `${template.title} - ${new Date().toLocaleDateString()}`,
        template.prompt
      );

      if (newDocId) {
        // Navigate to the new document's results page with id as query param
        router.push(`/results?id=${newDocId}`);
      }
    } catch (error) {
      console.error('Error using template:', error);
      // Fallback to copying to clipboard
      copyToClipboard(template.prompt);
    } finally {
      setLoadingTemplate(null);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400";
      case "Intermediate": return "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Advanced": return "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400";
      default: return "bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  // Show loading spinner while checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-300 dark:border-gray-600"></div>
      </div>
    );
  }

  // Don't render the page if user is not signed in
  if (!isSignedIn) {
    return null; // This will be handled by the useEffect redirect
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-950">
      <DashboardSidebar currentTab={currentTab} onTabChange={handleTabChange} />
      
      <main className="flex-1 p-8 ml-64">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight font-sussie">
              Prompt Templates
            </h1>
            <p className="text-gray-600 dark:text-zinc-400 mt-1">
              Ready-to-use prompt templates organized by categories
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-zinc-500" />
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-80 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-800 transition-all duration-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-500 dark:text-zinc-400 mb-1">
                        {template.category}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                        {template.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {template.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-zinc-400 mb-4">
                    {template.description}
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-700 dark:text-zinc-300 line-clamp-3 font-mono">
                      {template.prompt}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-3 border-t border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => copyToClipboard(template.prompt)}
                      className="p-2 text-gray-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors" 
                      title="Copy prompt"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    
                    <button 
                      className="p-2 text-gray-500 dark:text-zinc-400 hover:text-yellow-600 dark:hover:text-yellow-400 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors" 
                      title="Add to favorites"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                    
                    <button 
                      onClick={() => copyToClipboard(template.prompt)}
                      className="p-2 text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-300 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors" 
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => handleUseTemplate(template)}
                    disabled={loadingTemplate === template.id.toString()}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    {loadingTemplate === template.id.toString() ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Creating...
                      </>
                    ) : (
                      'Use Template'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 dark:text-zinc-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No templates found
            </h3>
            <p className="text-gray-600 dark:text-zinc-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
