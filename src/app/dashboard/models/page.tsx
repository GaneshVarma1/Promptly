"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Zap, 
  Activity,
  Clock,
  RefreshCw,
  Brain,
  Settings
} from "lucide-react";
import { AI_MODELS } from "@/constants";
import { ModelType, AIModels } from "@/types";
import { analyzePromptClient } from "@/lib/ai-client";

interface ModelStatus {
  id: ModelType;
  name: string;
  provider: string;
  status: 'checking' | 'working' | 'error';
  responseTime?: number;
  lastChecked?: string;
  error?: string;
}

export default function ModelsTestingPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  
  const [modelStatuses, setModelStatuses] = useState<ModelStatus[]>([]);
  const [isTestingAll, setIsTestingAll] = useState(false);
  const [lastTestRun, setLastTestRun] = useState<string>('');
  const [hasInitialTestRun, setHasInitialTestRun] = useState(false);

  // Redirect to home page if user is not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    }
  }, [isLoaded, isSignedIn, router]);

  // Load cached results or initialize model statuses
  useEffect(() => {
    const cacheKey = 'ai-models-test-results';
    const cachedResults = localStorage.getItem(cacheKey);
    
    if (cachedResults) {
      try {
        const { statuses, lastTestTime } = JSON.parse(cachedResults);
        setModelStatuses(statuses);
        setLastTestRun(lastTestTime);
        setHasInitialTestRun(true);
      } catch (error) {
        console.error('Failed to parse cached results:', error);
        initializeWithAutoTest();
      }
    } else {
      initializeWithAutoTest();
    }
  }, []);

  const initializeWithAutoTest = () => {
    const initialStatuses: ModelStatus[] = Object.entries(AI_MODELS).map(([key, config]) => ({
      id: config.id as ModelType,
      name: config.name,
      provider: config.provider,
      status: 'checking' as const,
    }));
    setModelStatuses(initialStatuses);
    
    // Auto-test only on first load (no cached results)
    testAllModels(initialStatuses);
  };

  const testModel = async (model: ModelStatus): Promise<ModelStatus> => {
    const startTime = Date.now();
    
    try {
      // Test with a simple prompt
      const testPrompt = "Test prompt for model validation";
      const result = await analyzePromptClient(testPrompt, model.id);
      
      const responseTime = Date.now() - startTime;
      
      return {
        ...model,
        status: 'working',
        responseTime,
        lastChecked: new Date().toLocaleTimeString(),
        error: undefined
      };
    } catch (error) {
      return {
        ...model,
        status: 'error',
        responseTime: Date.now() - startTime,
        lastChecked: new Date().toLocaleTimeString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };

  // Cache results to localStorage
  const cacheResults = (statuses: ModelStatus[], testTime: string) => {
    const cacheKey = 'ai-models-test-results';
    const cacheData = {
      statuses,
      lastTestTime: testTime
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  };

  const testAllModels = async (initialStatuses?: ModelStatus[]) => {
    setIsTestingAll(true);
    const statusesToTest = initialStatuses || modelStatuses;
    
    try {
      // Test models concurrently but with a delay to avoid overwhelming
      const results = await Promise.allSettled(
        statusesToTest.map(async (model, index) => {
          // Add a small delay between tests
          await new Promise(resolve => setTimeout(resolve, index * 200));
          return testModel(model);
        })
      );

      const updatedStatuses = results.map((result, index) => {
        if (result.status === 'fulfilled') {
          return result.value;
        } else {
          return {
            ...statusesToTest[index],
            status: 'error' as const,
            lastChecked: new Date().toLocaleTimeString(),
            error: 'Test failed'
          };
        }
      });

      const testTime = new Date().toLocaleString();
      setModelStatuses(updatedStatuses);
      setLastTestRun(testTime);
      setHasInitialTestRun(true);
      
      // Cache the results
      cacheResults(updatedStatuses, testTime);
    } finally {
      setIsTestingAll(false);
    }
  };

  const testSingleModel = async (modelId: ModelType) => {
    const modelIndex = modelStatuses.findIndex(m => m.id === modelId);
    if (modelIndex === -1) return;

    // Set model status to checking
    setModelStatuses(prev => prev.map((model, index) => 
      index === modelIndex ? { ...model, status: 'checking' } : model
    ));

    const updatedModel = await testModel(modelStatuses[modelIndex]);
    
    const updatedStatuses = modelStatuses.map((model, index) => 
      index === modelIndex ? updatedModel : model
    );
    
    const testTime = new Date().toLocaleString();
    setModelStatuses(updatedStatuses);
    setLastTestRun(testTime);
    
    // Cache the updated results
    cacheResults(updatedStatuses, testTime);
  };

  const getStatusIcon = (status: ModelStatus['status']) => {
    switch (status) {
      case 'checking':
        return <Loader2 className="w-5 h-5 animate-spin text-blue-500" />;
      case 'working':
        return <CheckCircle className="w-5 h-5 text-green-500 animate-pulse" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusBadge = (status: ModelStatus['status']) => {
    switch (status) {
      case 'checking':
        return <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700">Testing</Badge>;
      case 'working':
        return <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700 animate-pulse">Working</Badge>;
      case 'error':
        return <Badge className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700">Error</Badge>;
    }
  };

  const workingModels = modelStatuses.filter(m => m.status === 'working').length;
  const totalModels = modelStatuses.length;
  const allWorking = workingModels === totalModels && totalModels > 0;

  // Don't render the page if user is not signed in
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="p-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-lg">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-sussie mb-2">
                  AI Models Testing
                </h1>
                <p className="text-lg text-gray-600 dark:text-zinc-400 font-sussie">
                  Monitor and test all available AI models in real-time
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => {
                  localStorage.removeItem('ai-models-test-results');
                  setHasInitialTestRun(false);
                  initializeWithAutoTest();
                }}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                Clear Cache
              </Button>
              <Button
                onClick={() => testAllModels()}
                disabled={isTestingAll}
                variant="outline"
                className="border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white shadow-lg px-6 py-3 font-medium"
              >
                {isTestingAll ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin text-purple-600" />
                    Testing All Models
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 text-purple-600" />
                    Test All Models
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Overview */}
        <div className="mb-8">
          <Card className="p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {allWorking ? (
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  ) : (
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  )}
                  <span className="text-lg font-semibold text-gray-900 dark:text-white font-sussie">
                    System Status: {allWorking ? 'All Systems Operational' : 'Partial Availability'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-zinc-400">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>{workingModels}/{totalModels} Models Active</span>
                </div>
                {lastTestRun && (
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Last tested: {lastTestRun}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modelStatuses.map((model) => (
            <Card 
              key={model.id}
              className="p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(model.status)}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white font-sussie">
                      {model.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-zinc-500 font-mono">
                      {model.id}
                    </p>
                  </div>
                </div>
                {getStatusBadge(model.status)}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-zinc-400">Provider:</span>
                  <span className="font-mono text-gray-900 dark:text-white text-xs">
                    {model.provider}
                  </span>
                </div>

                {model.responseTime && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-zinc-400">Response Time:</span>
                    <span className="text-gray-900 dark:text-white">
                      {model.responseTime}ms
                    </span>
                  </div>
                )}

                {model.lastChecked && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-zinc-400">Last Checked:</span>
                    <span className="text-gray-900 dark:text-white">
                      {model.lastChecked}
                    </span>
                  </div>
                )}

                {model.error && (
                  <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
                    <p className="text-xs text-red-600 dark:text-red-400 font-mono">
                      {model.error}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-zinc-700">
                <Button
                  onClick={() => testSingleModel(model.id)}
                  disabled={model.status === 'checking'}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  {model.status === 'checking' ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Test Model
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Technical Details */}
        <div className="mt-8">
          <Card className="p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
            <div className="flex items-center space-x-2 mb-4">
              <Settings className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-sussie">
                Technical Information
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-white">API Endpoint</h4>
                <p className="text-gray-600 dark:text-zinc-400 font-mono">api.together.ai</p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-white">Test Method</h4>
                <p className="text-gray-600 dark:text-zinc-400">Live API calls with timeout</p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-white">Fallback Mode</h4>
                <p className="text-gray-600 dark:text-zinc-400">
                  {workingModels === 0 ? 'Active (Mock responses)' : 'Inactive'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 