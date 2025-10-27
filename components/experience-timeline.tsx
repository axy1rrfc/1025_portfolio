'use client'

import { motion } from 'framer-motion'

const experiences = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovations Inc.',
    period: '2022 - Present',
    description: 'Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and architecting solutions for high-traffic applications.',
    technologies: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker']
  },
  {
    title: 'Full Stack Developer',
    company: 'Digital Solutions Co.',
    period: '2020 - 2022',
    description: 'Developed and maintained multiple client projects using modern JavaScript frameworks. Built RESTful APIs and integrated third-party services for enhanced functionality.',
    technologies: ['Vue.js', 'Python', 'Django', 'PostgreSQL', 'Redis']
  },
  {
    title: 'Frontend Developer',
    company: 'Creative Web Studio',
    period: '2019 - 2020',
    description: 'Specialized in creating responsive and interactive user interfaces. Collaborated with design teams to implement pixel-perfect designs and smooth animations.',
    technologies: ['HTML/CSS', 'JavaScript', 'SASS', 'jQuery', 'Webpack']
  },
  {
    title: 'Junior Web Developer',
    company: 'Startup Hub',
    period: '2018 - 2019',
    description: 'Started my professional journey building websites and learning modern development practices. Gained experience in version control, agile methodologies, and collaborative development.',
    technologies: ['PHP', 'MySQL', 'Git', 'Bootstrap', 'Laravel']
  }
]

export function ExperienceTimeline() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal-element">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Professional <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            My career path and key milestones in technology
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-2 relative z-10">
                    <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-30"></div>
                  </div>
                  <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg card-3d">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{exp.title}</h3>
                      <span className="text-blue-600 dark:text-blue-400 font-mono text-sm mt-2 md:mt-0">{exp.period}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2 font-medium">{exp.company}</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}