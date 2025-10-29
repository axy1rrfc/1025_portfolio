'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FaPython, FaJava, FaHtml5, FaReact, FaAws, FaDocker, FaGitAlt } from 'react-icons/fa'
import { SiC, SiTailwindcss } from 'react-icons/si'
import { MdRemoveRedEye } from 'react-icons/md'
import { Skill } from '@/types'

const skills: Skill[] = [
  {
    name: 'Python',
    category: 'backend',
    level: 90,
    experience: '3 years',
    technologies: ['Flask', 'FastAPI', 'Selenium', 'RESTful APIs', 'NumPy', 'Pandas']
  },
  {
    name: 'Java',
    category: 'backend',
    level: 80,
    experience: '3 years',
    technologies: ['OOP', 'JUnit Testing', 'Android Studio']
  },
  {
    name: 'HTML & CSS',
    category: 'frontend',
    level: 85,
    experience: '3 years',
    technologies: ['Responsive Design', 'Flexbox/Grid', 'SEO Optimization']
  },
  {
    name: 'C',
    category: 'backend',
    level: 70,
    experience: '1 year',
    technologies: ['Algorithms', 'Memory Management', 'Data Structures']
  },
  {
    name: 'React',
    category: 'frontend',
    level: 75,
    experience: '2 years',
    technologies: ['Hooks', 'Context API', 'React Router', 'Component Architecture']
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    level: 65,
    experience: '1 year',
    technologies: ['Responsive UI', 'Custom Themes', 'Utility-first Design', 'Dark/Light Mode']
  },
  {
    name: 'AWS',
    category: 'devops',
    level: 70,
    experience: '1 year',
    technologies: ['EC2', 'S3', 'Lambda', 'IAM', 'Route 53', 'ELB']
  },
  {
    name: 'Docker',
    category: 'devops',
    level: 70,
    experience: '1 year',
    technologies: ['Dockerfiles', 'Docker Compose', 'Image Optimization', 'Container Deployment']
  },
  {
    name: 'Git',
    category: 'devops',
    level: 80,
    experience: '2+ years',
    technologies: ['Version Control', 'Branching Strategies', 'GitHub Actions', 'Collaboration']
  },
  {
    name: 'Computer Vision',
    category: 'backend',
    level: 70,
    experience: '1.5 years',
    technologies: ['OpenCV', 'TensorFlow', 'Image Classification', 'Object Detection', 'YOLO', 'Roboflow']
  }
]

// Helper function to get the icon for each skill
const getSkillIcon = (skillName: string) => {
  const iconProps = { className: "w-5 h-5" }
  
  switch (skillName) {
    case 'Python':
      return <FaPython {...iconProps} />
    case 'Java':
      return <FaJava {...iconProps} />
    case 'HTML & CSS':
      return <FaHtml5 {...iconProps} />
    case 'C':
      return <SiC {...iconProps} />
    case 'React':
      return <FaReact {...iconProps} />
    case 'Tailwind CSS':
      return <SiTailwindcss {...iconProps} />
    case 'AWS':
      return <FaAws {...iconProps} />
    case 'Docker':
      return <FaDocker {...iconProps} />
    case 'Git':
      return <FaGitAlt {...iconProps} />
    case 'Computer Vision':
      return <MdRemoveRedEye {...iconProps} />
    default:
      return <FaPython {...iconProps} />
  }
}

export function SkillsOverview() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)

  // Update cards per view based on screen size
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1) // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2) // Tablet: 2 cards
      } else {
        setCardsPerView(3) // Desktop: 3 cards
      }
    }

    // Set initial value
    updateCardsPerView()

    // Add event listener
    window.addEventListener('resize', updateCardsPerView)

    // Cleanup
    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [])

  // Reset to first slide when cardsPerView changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [cardsPerView])

  const maxIndex = Math.max(0, skills.length - cardsPerView)

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

  return (
    <div className="max-w-6xl mx-auto px-6 w-full py-8">
        <div className="text-center mb-8 reveal-element">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">
            <span className="text-gradient">Technical Skills</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-900 dark:text-white max-w-3xl mx-auto [text-shadow:_0_2px_8px_rgb(0_0_0_/_40%)] dark:[text-shadow:_0_2px_8px_rgb(0_0_0_/_80%)]">
            Proficient in modern web technologies, 3D graphics, and full-stack development
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
              aria-label="Previous skills"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-900 dark:text-white" />
            </button>

            {/* Right Arrow - Always visible in viewport */}
            <button
              onClick={nextSlide}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Next skills"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-900 dark:text-white" />
            </button>

            <div className="overflow-hidden px-1">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
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
                {skills.slice(currentIndex, currentIndex + cardsPerView).map((skill, index) => {
                  return (
                    <div
                      key={`skill-${skill.name}`}
                      className="card-3d bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedSkill(skill)}
                    >
                    <div className="flex items-center mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                        skill.category === 'frontend' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' :
                        skill.category === 'backend' ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' :
                        skill.category === 'database' ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400' :
                        'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400'
                      }`}>
                        {getSkillIcon(skill.name)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{skill.category}</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Proficiency</span>
                        <span className="text-sm text-gray-500 dark:text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
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
                  </div>
                  )
                })}
              </motion.div>
            </div>
          </div>
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
  )
}