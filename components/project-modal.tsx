'use client'

import { motion } from 'framer-motion'
import { GitHubProject } from '@/types'
import { getLanguageColor, formatDate } from '@/lib/utils'
import { X, Star, GitFork, ExternalLink, Calendar, FileText } from 'lucide-react'

interface ProjectModalProps {
  project: GitHubProject
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const languageColor = getLanguageColor(project.language)
  const topics = project.topics || []
  const createdDate = formatDate(project.created_at)
  const updatedDate = formatDate(project.updated_at)
  const sizeInKB = Math.round(project.size || 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{project.name}</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: languageColor }}
                ></div>
                <span className="font-medium font-mono text-gray-900 dark:text-white">
                  {project.language || 'Unknown'}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Created: {createdDate}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Updated: {updatedDate}
                </span>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {project.description || 'No description available'}
              </p>
            </div>
            
            {topics.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Technologies & Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <span 
                      key={topic} 
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-mono"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{project.stargazers_count}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center">
                  <Star className="w-4 h-4 mr-1" />
                  Stars
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{project.forks_count}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center">
                  <GitFork className="w-4 h-4 mr-1" />
                  Forks
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{sizeInKB}KB</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Size</div>
              </div>
            </div>
            
            {project.license && (
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">License</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{project.license.spdx_id}</p>
                </div>
                <a 
                  href={project.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on GitHub
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}