'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { GitHubProject } from '@/types'
import { getLanguageColor, formatDate } from '@/lib/utils'
import { Button } from './ui/button'
import { Star, GitFork, ExternalLink } from 'lucide-react'

export function ProjectsPreview() {
  const [projects, setProjects] = useState<GitHubProject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      // Using a demo username - replace with your GitHub username
      const response = await fetch('https://api.github.com/users/octocat/repos?sort=updated&per_page=6')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      } else {
        // Fallback to mock data
        setProjects(getMockProjects())
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
      setProjects(getMockProjects())
    } finally {
      setLoading(false)
    }
  }

  const getMockProjects = (): GitHubProject[] => [
    {
      id: 1,
      name: '3D-Portfolio-Website',
      full_name: 'user/3D-Portfolio-Website',
      description: 'Interactive portfolio with Three.js animations and modern design',
      html_url: 'https://github.com/user/3d-portfolio',
      language: 'JavaScript',
      stargazers_count: 156,
      forks_count: 42,
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-10-20T14:30:00Z',
      topics: ['threejs', 'portfolio', 'webgl', 'animation'],
      size: 2456,
      license: { spdx_id: 'MIT' },
      owner: { login: 'user', avatar_url: 'https://github.com/user.png' }
    },
    {
      id: 2,
      name: 'React-Dashboard-Pro',
      full_name: 'user/React-Dashboard-Pro',
      description: 'Full-stack dashboard application with real-time data visualization',
      html_url: 'https://github.com/user/react-dashboard',
      language: 'TypeScript',
      stargazers_count: 324,
      forks_count: 89,
      created_at: '2023-11-08T15:45:00Z',
      updated_at: '2024-10-18T09:15:00Z',
      topics: ['react', 'typescript', 'dashboard', 'charts'],
      size: 4532,
      license: { spdx_id: 'MIT' },
      owner: { login: 'user', avatar_url: 'https://github.com/user.png' }
    },
    {
      id: 3,
      name: 'Microservices-Architecture',
      full_name: 'user/Microservices-Architecture',
      description: 'Scalable microservices system with Docker and Kubernetes',
      html_url: 'https://github.com/user/microservices',
      language: 'Python',
      stargazers_count: 267,
      forks_count: 73,
      created_at: '2023-09-22T08:20:00Z',
      updated_at: '2024-09-30T16:45:00Z',
      topics: ['python', 'docker', 'kubernetes', 'microservices'],
      size: 6789,
      license: { spdx_id: 'Apache-2.0' },
      owner: { login: 'user', avatar_url: 'https://github.com/user.png' }
    }
  ]

  if (loading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Explore my latest work from GitHub, showcasing real-world applications and innovative solutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 animate-pulse">
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
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal-element">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore my latest work from GitHub, showcasing real-world applications and innovative solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 6).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-3d bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg mb-4 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💻</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
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
              
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {project.name}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                {project.description || 'No description available'}
              </p>
              
              {project.topics && project.topics.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.topics.slice(0, 3).map((topic) => (
                    <span 
                      key={topic} 
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-mono"
                    >
                      {topic}
                    </span>
                  ))}
                  {project.topics.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                      +{project.topics.length - 3}
                    </span>
                  )}
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
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12 reveal-element">
          <Link href="/projects">
            <Button size="lg" variant="outline" className="px-6 py-3">
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}