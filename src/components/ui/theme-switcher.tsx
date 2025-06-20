'use client'

import { Moon, Sun } from "lucide-react"
import { Button } from "./button"
import { useEffect, useState } from "react"

export function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if dark mode is already set
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    console.log('Toggling theme, current isDark:', isDark)
    
    const newIsDark = !isDark
    setIsDark(newIsDark)
    
    // Toggle the dark class on the html element
    document.documentElement.classList.toggle('dark', newIsDark)
    
    // Save to localStorage
    localStorage.setItem('promptly-theme', newIsDark ? 'dark' : 'light')
    
    console.log('Theme toggled to:', newIsDark ? 'dark' : 'light')
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9">
        <div className="w-4 h-4 animate-pulse bg-muted-foreground/20 rounded" />
      </Button>
    )
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="w-9 h-9 relative overflow-hidden hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      <Sun className={`h-[1.1rem] w-[1.1rem] transition-all ${isDark ? '-rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
      <Moon className={`absolute h-[1.1rem] w-[1.1rem] transition-all ${isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 