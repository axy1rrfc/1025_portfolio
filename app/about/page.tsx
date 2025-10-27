import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { SkillsVisualization } from '@/components/skills-visualization'
import { ExperienceTimeline } from '@/components/experience-timeline'
import { EducationCerts } from '@/components/education-certs'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-element">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                About <span className="text-gradient">Me</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                I'm a passionate full-stack developer with over 5 years of experience creating 
                digital solutions that make a difference. I specialize in modern web technologies, 
                3D graphics, and building scalable applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/contact" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-center">
                  Get In Touch
                </a>
                <a href="/projects" className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors text-center">
                  View My Work
                </a>
              </div>
            </div>
            <div className="reveal-element">
              <div className="relative">
                <div className="w-full max-w-md mx-auto rounded-2xl shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 p-8">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-6xl">👨‍💻</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Full Stack Developer</h3>
                    <p className="text-gray-600 dark:text-gray-400">Specialized in modern web technologies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SkillsVisualization />
      <ExperienceTimeline />
      <EducationCerts />
      
      <Footer />
    </div>
  )
}