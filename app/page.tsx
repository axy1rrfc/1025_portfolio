import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { ProjectsPreview } from '@/components/projects-preview'
import { SkillsOverview } from '@/components/skills-overview'
import { Footer } from '@/components/footer'
import { Hero3D } from '@/components/hero-3d'

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
          <section id="home">
            <HeroSection />
          </section>
          
          <section id="about" className="pointer-events-auto">
            <SkillsOverview />
          </section>
          
          <section id="projects">
            <ProjectsPreview />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
}