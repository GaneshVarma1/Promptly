import { FC, useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Sparkles, Mail, Lock } from 'lucide-react';

/**
 * Props for the DemoLogin component.
 */
export interface DemoLoginProps {
  onLogin: () => void;
}

/**
 * Demo login form for user authentication simulation.
 * All actions simply trigger the onLogin callback.
 */
const DemoLogin: FC<DemoLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Memoized handler for demo login
  const handleDemoLogin = useCallback(() => {
    // Demo login - just redirect to main app
    onLogin();
  }, [onLogin]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Prompt Companion
          </h1>
          <p className="text-slate-400">
            Sign in to start crafting perfect AI prompts
          </p>
        </div>

        {/* Login Form */}
        <Card className="p-6 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <Input
                  type="email"
                  placeholder="demo@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-purple-500"
                />
              </div>
            </div>

            <Button 
              onClick={handleDemoLogin}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium"
            >
              Sign In
            </Button>

            <div className="text-center">
              <Button 
                variant="ghost" 
                onClick={handleDemoLogin}
                className="text-purple-400 hover:text-purple-300 hover:bg-slate-700/50"
              >
                Try Demo Instead
              </Button>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-slate-400 text-sm">
          Don't have an account? 
          <Button 
            variant="link" 
            onClick={handleDemoLogin}
            className="text-purple-400 hover:text-purple-300 p-0 ml-1 h-auto"
          >
            Start with demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DemoLogin;
