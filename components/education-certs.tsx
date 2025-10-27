import { BookOpen, Award, Calendar } from 'lucide-react'

export function EducationCerts() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal-element">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Education & <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Academic background and professional certifications
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="reveal-element">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg card-3d">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Education</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Bachelor of Science in Computer Science</h4>
                  <p className="text-gray-600 dark:text-gray-400">University of Technology • 2014 - 2018</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Specialized in software engineering and web technologies</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="reveal-element">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg card-3d">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Certifications</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">AWS Certified Solutions Architect</h4>
                  <p className="text-gray-600 dark:text-gray-400">Amazon Web Services • 2023</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Google Cloud Professional Developer</h4>
                  <p className="text-gray-600 dark:text-gray-400">Google Cloud • 2022</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">React Advanced Certification</h4>
                  <p className="text-gray-600 dark:text-gray-400">Meta (Facebook) • 2021</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}