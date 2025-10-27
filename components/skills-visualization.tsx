'use client'

import { useState, useEffect } from 'react'
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

export function SkillsVisualization() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal-element">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Technical <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Interactive visualization of my skills and technologies I work with
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Skills Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card-3d bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedSkill(skill)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
                        <span key={tech} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Skill Details Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 sticky top-24">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Skill Details</h3>
              
              {selectedSkill ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{selectedSkill.name}</h4>
                    <div className="text-3xl font-bold text-gradient mb-2">{selectedSkill.level}%</div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{ width: `${selectedSkill.level}%` }} />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-1">Experience</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{selectedSkill.experience}</p>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-1">Technologies</h5>
                      <div className="flex flex-wrap gap-1">
                        {selectedSkill.technologies.map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-1">Category</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{selectedSkill.category}</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  <p>Click on a skill to see details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}