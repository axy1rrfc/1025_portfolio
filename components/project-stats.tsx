'use client'

import { motion } from 'framer-motion'
import { GitHubProject } from '@/types'
import { Star, GitFork, Code, BookOpen } from 'lucide-react'

interface ProjectStatsProps {
  projects: GitHubProject[]
}

export function ProjectStats({ projects }: ProjectStatsProps) {
  const totalProjects = projects.length
  const totalStars = projects.reduce((sum, project) => sum + project.stargazers_count, 0)
  const totalForks = projects.reduce((sum, project) => sum + project.forks_count, 0)
  const languages = new Set(projects.map(project => project.language).filter(Boolean))

  const stats = [
    {
      icon: Code,
      value: totalProjects,
      label: 'Total Projects',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Star,
      value: totalStars,
      label: 'GitHub Stars',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: GitFork,
      value: totalForks,
      label: 'Forks',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: BookOpen,
      value: languages.size,
      label: 'Languages',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 reveal-element">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg`}
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-8 h-8 opacity-80" />
                <div className="text-right">
                  <div className="text-3xl font-bold">{stat.value.toLocaleString()}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}