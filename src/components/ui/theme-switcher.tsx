'use client'

import { Moon, Sun } from "lucide-react"
import { Button } from "./button"
import { useEffect, useState } from "react"

export function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Get initial theme state
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
    setMounted(true)
  }, [])

  useEffect(() => {
    // Listen for theme changes from other sources
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isDarkMode = document.documentElement.classList.contains('dark')
          setIsDark(isDarkMode)
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    
    // Update the DOM immediately
    if (newIsDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.style.colorScheme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.colorScheme = 'light'
    }
    
    // Save to localStorage
    localStorage.setItem('promptly-theme', newIsDark ? 'dark' : 'light')
  }

  // Render a consistent placeholder until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9 relative">
        <div className="h-[1.1rem] w-[1.1rem] bg-muted-foreground/20 rounded animate-pulse" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="w-9 h-9 relative overflow-hidden hover:bg-accent hover:text-accent-foreground transition-colors"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <Sun className={`h-[1.1rem] w-[1.1rem] transition-all duration-300 ${isDark ? '-rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
      <Moon className={`absolute h-[1.1rem] w-[1.1rem] transition-all duration-300 ${isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 