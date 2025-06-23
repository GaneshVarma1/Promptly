"use client";

import { User, Crown, CreditCard, Settings, Shield, Calendar, Mail } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { GradientButton } from './ui/gradient-button';

export function AccountSettings() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 p-6">
          <div className="animate-pulse">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gray-200 dark:bg-zinc-700 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 dark:bg-zinc-700 rounded w-48"></div>
                <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-64"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.imageUrl ? (
                <img 
                  src={user.imageUrl} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <User className="w-10 h-10" />
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {user?.fullName || `${user?.firstName} ${user?.lastName}` || 'User'}
              </h2>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300">
                  <Crown className="w-3 h-3 mr-1" />
                  Free User
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400">
                <Mail className="w-4 h-4" />
                {user?.emailAddresses?.[0]?.emailAddress || 'No email provided'}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400">
                <Calendar className="w-4 h-4" />
                Member since {new Date(user?.createdAt || '').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Subscription Plan</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Plan */}
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-lg border border-gray-200 dark:border-zinc-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-zinc-400">Current Plan</span>
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-zinc-300">
                  Free
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">$0<span className="text-sm font-normal text-gray-500 dark:text-zinc-400">/month</span></div>
              <p className="text-sm text-gray-600 dark:text-zinc-400">Basic AI models and limited features</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Current Features:</h4>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-zinc-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Free AI models (Llama, Mixtral)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Basic prompt analysis
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Document management
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  <span className="line-through">Premium AI models</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  <span className="line-through">Advanced analytics</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="space-y-4">
            <div className="relative p-4 rounded-lg border-2 border-purple-200 dark:border-purple-800" style={{
              background: 'radial-gradient(150% 180.06% at 11.14% 140%, rgba(0,0,0,0.05) 37.35%, rgba(8,1,44,0.1) 61.36%, rgba(78,30,64,0.15) 78.42%, rgba(112,70,78,0.1) 89.52%, rgba(136,57,76,0.05) 100%)'
            }}>
              <div className="absolute -top-2 left-4">
                <span className="text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg" style={{
                  background: 'radial-gradient(150% 180.06% at 11.14% 140%, #000 37.35%, #08012c 61.36%, #4e1e40 78.42%, #70464e 89.52%, #88394c 100%)'
                }}>
                  RECOMMENDED
                </span>
              </div>
              <div className="flex items-center justify-between mb-2 mt-2">
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Pro Plan</span>
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium text-white" style={{
                  background: 'radial-gradient(150% 180.06% at 11.14% 140%, rgba(0,0,0,0.8) 37.35%, rgba(8,1,44,0.9) 61.36%, rgba(78,30,64,0.8) 78.42%, rgba(112,70,78,0.7) 89.52%, rgba(136,57,76,0.6) 100%)'
                }}>
                  Upgrade
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">$19<span className="text-sm font-normal text-gray-500 dark:text-zinc-400">/month</span></div>
              <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">All paid ChatGPT models included</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Pro Features:</h4>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-zinc-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{
                    background: 'radial-gradient(150% 180.06% at 11.14% 140%, #000 37.35%, #08012c 61.36%, #4e1e40 78.42%, #70464e 89.52%, #88394c 100%)'
                  }}></div>
                  <span className="font-medium">GPT-4, GPT-4 Turbo, GPT-4o</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{
                    background: 'radial-gradient(150% 180.06% at 11.14% 140%, #000 37.35%, #08012c 61.36%, #4e1e40 78.42%, #70464e 89.52%, #88394c 100%)'
                  }}></div>
                  <span className="font-medium">Claude 3.5 Sonnet, Claude 3 Opus</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{
                    background: 'radial-gradient(150% 180.06% at 11.14% 140%, #000 37.35%, #08012c 61.36%, #4e1e40 78.42%, #70464e 89.52%, #88394c 100%)'
                  }}></div>
                  Advanced prompt analysis
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{
                    background: 'radial-gradient(150% 180.06% at 11.14% 140%, #000 37.35%, #08012c 61.36%, #4e1e40 78.42%, #70464e 89.52%, #88394c 100%)'
                  }}></div>
                  Unlimited document exports
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{
                    background: 'radial-gradient(150% 180.06% at 11.14% 140%, #000 37.35%, #08012c 61.36%, #4e1e40 78.42%, #70464e 89.52%, #88394c 100%)'
                  }}></div>
                  Priority support
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{
                    background: 'radial-gradient(150% 180.06% at 11.14% 140%, #000 37.35%, #08012c 61.36%, #4e1e40 78.42%, #70464e 89.52%, #88394c 100%)'
                  }}></div>
                  Advanced analytics dashboard
                </li>
              </ul>
            </div>

            <GradientButton className="w-full text-sm py-3 px-4" onClick={() => console.log('Upgrade to Pro clicked')}>
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Pro - $19/month
            </GradientButton>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
            <Settings className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Account Settings</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-lg border border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-left">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-600 dark:text-zinc-400" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Profile Settings</div>
                <div className="text-sm text-gray-500 dark:text-zinc-400">Update your personal information</div>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-lg border border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-left">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-600 dark:text-zinc-400" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Security</div>
                <div className="text-sm text-gray-500 dark:text-zinc-400">Password and 2FA settings</div>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 