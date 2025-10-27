import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { ProjectsPreview } from '@/components/projects-preview'
import { SkillsOverview } from '@/components/skills-overview'
import { ContactCTA } from '@/components/contact-cta'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <ProjectsPreview />
        <SkillsOverview />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  )
}