'use client'

import * as React from 'react'
import { Menu, X } from 'lucide-react'
import { SiDiscord, SiGithub, SiLinkedin } from 'react-icons/si'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from './theme-toggle'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
]

const socialLinks = [
  { name: 'Discord', icon: SiDiscord, href: 'https://discord.com/users/YOUR_DISCORD_ID' },
  { name: 'GitHub', icon: SiGithub, href: 'https://github.com/YOUR_USERNAME' },
  { name: 'LinkedIn', icon: SiLinkedin, href: 'https://linkedin.com/in/YOUR_PROFILE' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState('home')

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsOpen(false)
    }
  }

  // Track active section on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 pointer-events-auto">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Hamburger Menu and Social Icons */}
          <div className="flex items-center gap-3">
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-md"
              aria-label="Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Social Icons - No spacing between them */}
            <div className="flex items-center">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-md"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Right side - Theme Toggle */}
          <div className="shadow-md rounded-lg">
            <ThemeToggle />
          </div>
        </div>

        {/* Navigation Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-4 mt-2 w-48 overflow-hidden"
            >
              <div className="py-2 space-y-1 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={cn(
                      'block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
                      activeSection === item.href.slice(1) && 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    )}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}