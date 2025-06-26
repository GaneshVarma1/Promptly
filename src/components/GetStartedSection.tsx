import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusIcon, 
  BookTemplateIcon, 
  ImportIcon, 
  FileUpIcon,
  ArrowRightIcon,
  SparklesIcon,
  RocketIcon,
  ClockIcon
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useRouter } from 'next/navigation';
import { useDocuments } from '@/hooks/use-documents';
import { useDocumentCounts } from '@/hooks/use-document-counts';

interface GetStartedSectionProps {
  onNewPrompt: () => void;
  onTabChange: (tab: 'prompt-gallery' | 'models') => void;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
} as const;

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 25,
      duration: 0.5
    }
  }
} as const;

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    rotateX: 10,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
      duration: 0.6
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    rotateX: 2,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1
    }
  }
} as const;

const iconVariants = {
  hidden: { 
    scale: 0,
    rotate: -180
  },
  visible: { 
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
      delay: 0.3
    }
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 15
    }
  }
} as const;

const buttonVariants = {
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 17
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1
    }
  }
} as const;

const recentWorkVariants = {
  hidden: { 
    opacity: 0, 
    x: -20 
  },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 25,
      delay: index * 0.1
    }
  }),
  hover: {
    x: 5,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 17
    }
  }
} as const;

const welcomeVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: -20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
      duration: 0.8
    }
  }
} as const;

const sparkleVariants = {
  hidden: { 
    scale: 0,
    rotate: -180,
    opacity: 0
  },
  visible: { 
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 15,
      delay: 0.5
    }
  },
  pulse: {
    scale: [1, 1.2, 1] as number[],
    rotate: [0, 10, 0] as number[],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

const dialogVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 25
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.2
    }
  }
} as const;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
} as const;

export function GetStartedSection({ onNewPrompt, onTabChange }: GetStartedSectionProps) {
  const router = useRouter();
  const { documents } = useDocuments();
  const counts = useDocumentCounts();
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  // Get recent documents (last 3 for main dashboard)
  const recentDocuments = documents
    .filter(doc => {
      const status = localStorage.getItem(`status-${doc.id}`) || 'active';
      return status === 'active' || status === 'saved';
    })
    .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
    .slice(0, 3);

  const isFirstTimeUser = counts.documents === 0 && counts.saved === 0;

  const handleTemplateStart = () => {
    onTabChange('prompt-gallery');
  };

  const handleImportPrompt = () => {
    setShowUploadDialog(true);
  };

  const handleRecentWork = (documentId: string) => {
    router.push(`/results?id=${documentId}`);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const newId = `doc-${Date.now()}`;
        localStorage.setItem(`document-${newId}`, content);
        localStorage.setItem(`title-${newId}`, file.name.replace(/\.[^/.]+$/, ''));
        
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('documents-updated'));
        }
        
        router.push(`/results?id=${newId}`);
        setShowUploadDialog(false);
      };
      reader.readAsText(file);
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Message for First-Time Users */}
      <AnimatePresence>
        {isFirstTimeUser && (
          <motion.div
            variants={welcomeVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-6 overflow-hidden relative shadow-2xl"
          >
            {/* Subtle background animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/5 to-gray-100/5 dark:from-gray-900/10 dark:to-gray-800/10"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(128, 128, 128, 0.05))",
                  "linear-gradient(45deg, rgba(128, 128, 128, 0.05), rgba(255, 255, 255, 0.05))",
                  "linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(128, 128, 128, 0.05))"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="flex items-start gap-4 relative z-10">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg backdrop-blur-sm"
                variants={sparkleVariants}
                animate={["visible", "pulse"]}
              >
                <SparklesIcon className="w-6 h-6 text-white dark:text-black" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Welcome to Professional Prompt Engineering
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Transform your AI interactions from basic chat to systematic prompt engineering. 
                  Start with your first prompt below, or explore templates and tools in the sidebar.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Core Actions - Streamlined */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        variants={containerVariants}
      >
        {/* New Prompt - Primary Action */}
        <motion.div variants={cardVariants}>
          <motion.div
            whileHover="hover"
            whileTap="tap"
            variants={cardVariants}
            className="group relative overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 hover:shadow-2xl rounded-2xl cursor-pointer backdrop-blur-xl bg-white/10 dark:bg-black/10"
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/5 to-gray-100/5 dark:from-gray-900/10 dark:to-gray-800/10"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="relative z-10 p-6 bg-transparent border border-slate-200 dark:border-slate-800 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-100 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <PlusIcon className="w-6 h-6 text-white dark:text-black" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">New Prompt</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Start fresh</p>
                </motion.div>
              </div>
              <motion.p 
                className="text-gray-600 dark:text-gray-300 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Create a new prompt from scratch with our AI-powered analysis
              </motion.p>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button 
                  onClick={onNewPrompt} 
                  className="w-full bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black font-medium py-3 backdrop-blur-sm border border-slate-200 dark:border-slate-800"
                >
                  Create Prompt
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Templates - Secondary */}
        <motion.div variants={cardVariants}>
          <motion.div
            whileHover="hover"
            whileTap="tap"
            variants={cardVariants}
            className="group cursor-pointer backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-2xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <motion.div 
                  className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors backdrop-blur-sm border border-slate-200 dark:border-slate-800"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <BookTemplateIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Templates</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Professional examples</p>
                </motion.div>
              </div>
              <motion.p 
                className="text-gray-600 dark:text-gray-300 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Browse curated templates for common use cases
              </motion.p>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button 
                  onClick={handleTemplateStart} 
                  variant="outline" 
                  className="w-full border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white/10 dark:hover:bg-black/20 py-3 backdrop-blur-sm text-gray-900 dark:text-white"
                >
                  Browse Gallery
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Import - Tertiary */}
        <motion.div variants={cardVariants}>
          <motion.div
            whileHover="hover"
            whileTap="tap"
            variants={cardVariants}
            className="group cursor-pointer backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-2xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <motion.div 
                  className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/50 transition-colors backdrop-blur-sm border border-slate-200 dark:border-slate-800"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <ImportIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Import</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">From files</p>
                </motion.div>
              </div>
              <motion.p 
                className="text-gray-600 dark:text-gray-300 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Upload existing prompts from text files
              </motion.p>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button 
                  onClick={handleImportPrompt} 
                  variant="outline" 
                  className="w-full border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white/10 dark:hover:bg-black/20 py-3 backdrop-blur-sm text-gray-900 dark:text-white"
                >
                  Upload File
                  <FileUpIcon className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Recent Work - Only for Returning Users */}
      <AnimatePresence>
        {!isFirstTimeUser && recentDocuments.length > 0 && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl">
              <div className="p-6">
                <motion.div 
                  className="flex items-center gap-3 mb-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    <RocketIcon className="w-5 h-5 text-gray-900 dark:text-white" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Continue Recent Work</h3>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {recentDocuments.map((doc, index) => (
                    <motion.button
                      key={doc.id}
                      onClick={() => handleRecentWork(doc.id)}
                      className="text-left p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white/10 dark:hover:bg-black/20 transition-colors group backdrop-blur-sm"
                      variants={recentWorkVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      custom={index}
                    >
                      <div className="flex items-start gap-3">
                        <motion.div
                          animate={{ rotate: [0, 10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        >
                          <ClockIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white mt-1 flex-shrink-0" />
                        </motion.div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-900 dark:text-white truncate group-hover:text-gray-900 dark:group-hover:text-white">
                            {doc.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {new Date(doc.lastModified).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Import Dialog */}
      <AnimatePresence>
        {showUploadDialog && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                variants={dialogVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="w-full max-w-md backdrop-blur-xl bg-white/90 dark:bg-black/90 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl">
                  <div className="p-6">
                    <motion.h3 
                      className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Import Prompt
                    </motion.h3>
                    <motion.p 
                      className="text-sm text-gray-600 dark:text-gray-300 mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Upload a text file containing your prompt content. Supported formats: .txt, .md, .json
                    </motion.p>
                    <motion.input
                      type="file"
                      accept=".txt,.md,.json"
                      onChange={handleFileUpload}
                      className="w-full p-3 border border-slate-200 dark:border-slate-800 rounded-lg bg-white/50 dark:bg-black/50 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    />
                    <motion.div 
                      className="flex gap-3 mt-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.div
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="flex-1"
                      >
                        <Button variant="outline" onClick={() => setShowUploadDialog(false)} className="w-full backdrop-blur-sm border-slate-200 dark:border-slate-800 text-gray-900 dark:text-white hover:bg-white/10 dark:hover:bg-black/20">
                          Cancel
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 