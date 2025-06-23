"use client";

import Link from 'next/link';
import { ArrowLeft, FileSearch, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileSearch className="w-10 h-10 text-gray-400 dark:text-zinc-500" />
        </div>
        
        {/* Error Code */}
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4 font-sussie">
          404
        </h1>
        
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-zinc-400 mb-8 leading-relaxed">
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard">
            <Button className="bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-700 shadow-sm w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
        
        {/* Additional Help */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-zinc-800">
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Need help? 
            <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
              Start a new document
            </Link>
            {" "}or check our{" "}
            <Link href="/dashboard" className="text-blue-600 dark:text-blue-400 hover:underline">
              dashboard
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
