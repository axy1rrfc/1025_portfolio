import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { ProjectsPreview } from '@/components/projects-preview'
import { SkillsOverview } from '@/components/skills-overview'
import { Footer } from '@/components/footer'
import { Hero3D } from '@/components/hero-3d'
import { ScrollFadeSection } from '@/components/scroll-fade-section'

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Full-page particle effect background */}
      <div className="fixed inset-0 z-0">
        <Hero3D />
      </div>
      
      {/* Content layer - pointer-events-none allows clicks to pass through to canvas */}
      <div className="relative z-10 pointer-events-none">
        <Navigation />
        <main>
          <ScrollFadeSection id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <HeroSection />
          </ScrollFadeSection>
          
          {/* About Section */}
          <ScrollFadeSection id="about" className="min-h-screen flex items-center justify-center pointer-events-auto">
            <div className="max-w-4xl mx-auto px-6">
              <div className="p-8 md:p-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center drop-shadow-lg">
                  <span className="text-gradient">About Me</span>
                </h2>
                <div className="space-y-6 text-xl md:text-2xl text-gray-900 dark:text-white leading-relaxed [text-shadow:_0_2px_8px_rgb(0_0_0_/_40%)] dark:[text-shadow:_0_2px_8px_rgb(0_0_0_/_80%)]">
                  <p>
                    I'm passionate about building meaningful projects and bringing ideas to life through technology. I'm constantly learning and refining my skills to become the best engineer I can be.
                  </p>
                  <p>
                    Beyond my love for technology and software development, I'm also deeply interested in sports, computer vision, and artificial intelligence.
                  </p>
                  <p>
                    Below are some of the projects I've developed over the past few years that reflect my growth as a developer.
                  </p>
                </div>
              </div>
            </div>
          </ScrollFadeSection>
          
          <ScrollFadeSection id="projects" className="min-h-screen flex items-center bg-transparent pointer-events-auto">
            <ProjectsPreview />
          </ScrollFadeSection>
          
          <ScrollFadeSection id="skills" className="min-h-screen flex items-center bg-transparent pointer-events-auto">
            <SkillsOverview />
          </ScrollFadeSection>
        </main>
        <Footer />
      </div>
    </div>
  )
}