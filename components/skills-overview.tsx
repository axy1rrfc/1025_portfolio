'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Skill } from '@/types'

const skills: Skill[] = [
  {
    name: 'React',
    category: 'frontend',
    level: 95,
    experience: '5+ years',
    technologies: ['Next.js', 'Redux', 'Hooks', 'Context API']
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    level: 90,
    experience: '4+ years',
    technologies: ['Generics', 'Interfaces', 'Decorators', 'Type System']
  },
  {
    name: 'Three.js',
    category: 'frontend',
    level: 85,
    experience: '3+ years',
    technologies: ['WebGL', 'Shaders', '3D Math', 'Animation']
  },
  {
    name: 'Node.js',
    category: 'backend',
    level: 88,
    experience: '4+ years',
    technologies: ['Express', 'NestJS', 'GraphQL', 'WebSocket']
  },
  {
    name: 'Python',
    category: 'backend',
    level: 82,
    experience: '3+ years',
    technologies: ['Django', 'FastAPI', 'Pandas', 'NumPy']
  },
  {
    name: 'PostgreSQL',
    category: 'database',
    level: 85,
    experience: '4+ years',
    technologies: ['ORM', 'Query Optimization', 'Indexing', 'Migrations']
  },
  {
    name: 'Docker',
    category: 'devops',
    level: 78,
    experience: '3+ years',
    technologies: ['Containers', 'Compose', 'Multi-stage Builds', 'Registry']
  },
  {
    name: 'AWS',
    category: 'devops',
    level: 75,
    experience: '2+ years',
    technologies: ['EC2', 'S3', 'Lambda', 'RDS', 'CloudFormation']
  }
]

export function SkillsOverview() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal-element">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Proficient in modern web technologies, 3D graphics, and full-stack development
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-3d bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setSelectedSkill(skill)}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                  skill.category === 'frontend' ? 'bg-blue-100 dark:bg-blue-900' :
                  skill.category === 'backend' ? 'bg-green-100 dark:bg-green-900' :
                  skill.category === 'database' ? 'bg-purple-100 dark:bg-purple-900' :
                  'bg-orange-100 dark:bg-orange-900'
                }`}>
                  <span className="text-2xl">
                    {skill.category === 'frontend' && '⚛️'}
                    {skill.category === 'backend' && '🔧'}
                    {skill.category === 'database' && '🗄️'}
                    {skill.category === 'devops' && '☁️'}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{skill.category}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Proficiency</span>
                  <span className="text-sm text-gray-500 dark:text-gray-500">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  />
                </div>
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p className="mb-2">Experience: {skill.experience}</p>
                <div className="flex flex-wrap gap-1">
                  {skill.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill Details Modal */}
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{selectedSkill.name}</h3>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Proficiency</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{selectedSkill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" style={{ width: `${selectedSkill.level}%` }} />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Experience</h4>
                  <p className="text-gray-600 dark:text-gray-400">{selectedSkill.experience}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedSkill(null)}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}