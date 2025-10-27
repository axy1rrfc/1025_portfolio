'use client'

import { motion } from 'framer-motion'
import { GitHubProject } from '@/types'
import { getLanguageColor, formatDate } from '@/lib/utils'
import { Star, GitFork, ExternalLink } from 'lucide-react'

interface ProjectCardProps {
  project: GitHubProject
  index: number
  onClick: () => void
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const languageColor = getLanguageColor(project.language)
  const topics = project.topics || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="card-3d bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
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
          style={{ backgroundColor: languageColor }}
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
      
      {topics.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {topics.slice(0, 3).map((topic) => (
            <span 
              key={topic} 
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-mono"
            >
              {topic}
            </span>
          ))}
          {topics.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
              +{topics.length - 3}
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
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Code
          </a>
        </div>
      </div>
    </motion.div>
  )
}