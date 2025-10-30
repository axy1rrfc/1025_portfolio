'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { GitHubProject } from '@/types'
import { getLanguageColor, formatDate } from '@/lib/utils'
import { Button } from './ui/button'
import { Star, GitFork, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'

export function ProjectsPreview() {
  const [projects, setProjects] = useState<GitHubProject[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)

  // Always show 1 project at a time for better focus
  useEffect(() => {
    setCardsPerView(1) // Always 1 card on all screen sizes
  }, [])

  const maxIndex = Math.max(0, projects.length - cardsPerView)

  useEffect(() => {
    fetchProjects()
  }, [])

  const nextSlide = () => {
    setDirection(1)
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Loop back to beginning
      setCurrentIndex(0)
    }
  }

  const prevSlide = () => {
    setDirection(-1)
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      // Loop to end
      setCurrentIndex(maxIndex)
    }
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 1
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 1
    })
  }

  const fetchProjects = async () => {
    try {
      // Use manual projects locally for consistency and sort chronologically (oldest -> newest)
      const manual = getMockProjects().sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime())
      setProjects(manual)
    } finally {
      setLoading(false)
    }
  }

  const getMockProjects = (): GitHubProject[] => [
    {
      id: 1,
      name: 'Folio',
      description: 'A modern portfolio website with interactive animations',
      html_url: 'https://github.com/axy1rrfc/1025_portfolio',
      image: '/projects/folio.png',
      language: 'TypeScript',
      topics: ['react', 'nextjs', 'tailwind', 'framer-motion'],
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2025-10-15',
      full_name: 'axy1rrfc/1025_portfolio',
      created_at: '2024-10-15T10:30:00Z',
      size: 2456,
      license: { spdx_id: 'MIT' },
      owner: { login: 'axy1rrfc', avatar_url: 'https://github.com/axy1rrfc.png' }
    },
    {
      id: 2,
      name: 'BallQ',
      description: 'Full-stack web app where players can upload their Veo/Spideo game footage and get actionable insights into their game. Build a FIFA-style player card, join a club, and share your profile with recruiters. Built to make soccer coaching more affordable and equitable for all athletes. Built with @hershb',
      html_url: 'https://github.com/axy1rrfc',
      image: '/projects/ballq.png',
      language: 'Python',
      topics: ['flask', 'react', 'computer-vision', 'sports-analytics', 'python', 'aws', 'mongodb'],
      stargazers_count: 2,
      forks_count: 13,
      updated_at: '2025-10-25',
      full_name: 'axy1rrfc/ballq',
      created_at: '2024-06-01T10:30:00Z',
      size: 8900,
      license: { spdx_id: 'MIT' },
      owner: { login: 'axy1rrfc', avatar_url: 'https://github.com/axy1rrfc.png' }
    },
    {
      id: 3,
      name: 'RUAlergic',
      description: 'Full-stack web app where users can upload pictures of food and detect possible allergens. Built with @hershb & @natea at the Rutgers Spring 24 Hackathon in Busch Dining Hall',
      html_url: 'https://github.com/axy1rrfc/hackRUproject',
      language: 'Python',
      topics: ['flask', 'tensorflow', 'computer-vision', 'hackathon', 'react', 'tailwind'],
      stargazers_count: 2,
      forks_count: 0,
      updated_at: '2025-02-25',
      full_name: 'axy1rrfc/hackRUproject',
      created_at: '2024-03-20T10:30:00Z',
      size: 3200,
      license: { spdx_id: 'MIT' },
      owner: { login: 'axy1rrfc', avatar_url: 'https://github.com/axy1rrfc.png' }
    },
    {
      id: 4,
      name: 'Team Donation Tracker',
      description: 'Inspired by @colinc\'s Beautiful Soup HTML parser, the Team Donation Tracker uses Selenium to dynamically scrape web pages and update Excel spreadsheets. This script calculates team totals to keep members motivated and engaged with donation goals',
      html_url: 'https://github.com/axy1rrfc/rudmTeamScrape',
      image: '/projects/teamtracker.png',
      language: 'Python',
      topics: ['selenium', 'automation', 'excel', 'python'],
      stargazers_count: 2,
      forks_count: 0,
      updated_at: '2025-04-25',
      full_name: 'axy1rrfc/rudmTeamScrape',
      created_at: '2024-04-01T10:30:00Z',
      size: 1200,
      license: { spdx_id: 'MIT' },
      owner: { login: 'axy1rrfc', avatar_url: 'https://github.com/axy1rrfc.png' }
    },
    {
      id: 5,
      name: 'Face/Digit Detection Testing',
      description: 'Implemented a perceptron and custom neural network to compare the behavior of different detection algorithms for face and digit recognition',
      html_url: 'https://github.com/axy1rrfc/digitAndFacialRecognition',
      image: '/projects/digitclassification.png',
      language: 'Python',
      topics: ['machine-learning', 'neural-networks', 'perceptron', 'python'],
      stargazers_count: 2,
      forks_count: 0,
      updated_at: '2025-05-25',
      full_name: 'axy1rrfc/digitAndFacialRecognition',
      created_at: '2024-02-15T10:30:00Z',
      size: 2800,
      license: { spdx_id: 'MIT' },
      owner: { login: 'axy1rrfc', avatar_url: 'https://github.com/axy1rrfc.png' }
    },
    {
      id: 6,
      name: 'Android Pizza App',
      description: 'Project that uses Java OOP to build an Android app in Android Studio, allowing users to create and order pizzas',
      html_url: 'https://github.com/axy1rrfc/project4',
      language: 'Java',
      topics: ['android', 'java', 'oop', 'mobile-app', 'android-studio'],
      stargazers_count: 2,
      forks_count: 0,
      updated_at: '2025-11-25',
      full_name: 'axy1rrfc/project4',
      created_at: '2023-11-01T10:30:00Z',
      size: 1800,
      license: { spdx_id: 'MIT' },
      owner: { login: 'axy1rrfc', avatar_url: 'https://github.com/axy1rrfc.png' }
    }
  ]

  if (loading) {
    return (
      <section className="py-20 bg-transparent pointer-events-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Explore my latest work from GitHub, showcasing real-world applications and innovative solutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 w-full py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">
            <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-900 dark:text-white max-w-3xl mx-auto [text-shadow:_0_2px_8px_rgb(0_0_0_/_40%)] dark:[text-shadow:_0_2px_8px_rgb(0_0_0_/_80%)]">
            Explore my latest work from GitHub, showcasing real-world applications and innovative solutions
          </p>
        </div>
        
        {/* Carousel Container */}
        <div className="relative select-none">
          {/* Cards Container */}
          <div className="relative px-14 md:px-20">
            {/* Left Arrow - Always visible in viewport */}
            <button
              onClick={prevSlide}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Previous projects"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-900 dark:text-white" />
            </button>

            {/* Right Arrow - Always visible in viewport */}
            <button
              onClick={nextSlide}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Next projects"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-900 dark:text-white" />
            </button>

            <div className="overflow-hidden px-1">
              <motion.div 
                className="flex justify-center"
                animate={{
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }
                }}
                key={currentIndex}
              >
                {projects.slice(currentIndex, currentIndex + cardsPerView).map((project, index) => (
                  <div
                    key={project.id}
                    className="card-3d bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 hover:shadow-xl transition-all duration-300 w-full max-w-xl mx-auto"
                  >
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg mb-3 overflow-hidden relative max-h-48 mx-auto grid place-items-center p-2">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.name}
                          className="block mx-auto max-w-full max-h-full object-contain object-center"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
                            <span className="text-xl">💻</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: getLanguageColor(project.language) }}
                      ></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                        {project.language || 'Unknown'}
                      </span>
                      <span className="ml-auto text-xs text-gray-500 dark:text-gray-500">
                        Updated {formatDate(project.updated_at)}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-1.5 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {project.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {project.description || 'No description available'}
                    </p>
                    
                    {project.topics && project.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.topics.map((topic) => (
                          <span 
                            key={topic} 
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-mono"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
                        <span className="flex items-center hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
                          <Star className="w-4 h-4 mr-1" />
                          {project.stargazers_count}
                        </span>
                        <span className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <GitFork className="w-4 h-4 mr-1" />
                          {project.forks_count}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <a 
                          href={project.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors flex items-center"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Code
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
    </div>
  )
}