'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ProjectCard } from '@/components/project-card'
import { ProjectFilters } from '@/components/project-filters'
import { ProjectStats } from '@/components/project-stats'
import { ProjectModal } from '@/components/project-modal'
import { GitHubProject } from '@/types'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<GitHubProject[]>([])
  const [filteredProjects, setFilteredProjects] = useState<GitHubProject[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<GitHubProject | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('all')
  const [sortBy, setSortBy] = useState('updated')

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    filterProjects()
  }, [projects, searchQuery, selectedLanguage, sortBy])

  const fetchProjects = async () => {
    try {
      const response = await fetch('https://api.github.com/users/octocat/repos?sort=updated&per_page=30')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      } else {
        setProjects(getMockProjects())
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
      setProjects(getMockProjects())
    } finally {
      setLoading(false)
    }
  }

  const getMockProjects = (): GitHubProject[] => [
    {
      id: 1,
      name: '3D-Portfolio-Website',
      full_name: 'user/3D-Portfolio-Website',
      description: 'Interactive portfolio with Three.js animations, modern design, and real-time GitHub integration',
      html_url: 'https://github.com/user/3d-portfolio',
      language: 'JavaScript',
      stargazers_count: 156,
      forks_count: 42,
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-10-20T14:30:00Z',
      topics: ['threejs', 'portfolio', 'webgl', 'animation', 'responsive'],
      size: 2456,
      license: { spdx_id: 'MIT' },
      owner: { login: 'user', avatar_url: 'https://github.com/user.png' }
    },
    {
      id: 2,
      name: 'React-Dashboard-Pro',
      full_name: 'user/React-Dashboard-Pro',
      description: 'Full-stack dashboard application with real-time data visualization and advanced analytics',
      html_url: 'https://github.com/user/react-dashboard',
      language: 'TypeScript',
      stargazers_count: 324,
      forks_count: 89,
      created_at: '2023-11-08T15:45:00Z',
      updated_at: '2024-10-18T09:15:00Z',
      topics: ['react', 'typescript', 'dashboard', 'charts', 'api'],
      size: 4532,
      license: { spdx_id: 'MIT' },
      owner: { login: 'user', avatar_url: 'https://github.com/user.png' }
    },
    {
      id: 3,
      name: 'Microservices-Architecture',
      full_name: 'user/Microservices-Architecture',
      description: 'Scalable microservices system with Docker, Kubernetes, and cloud-native patterns',
      html_url: 'https://github.com/user/microservices',
      language: 'Python',
      stargazers_count: 267,
      forks_count: 73,
      created_at: '2023-09-22T08:20:00Z',
      updated_at: '2024-09-30T16:45:00Z',
      topics: ['python', 'docker', 'kubernetes', 'microservices', 'cloud'],
      size: 6789,
      license: { spdx_id: 'Apache-2.0' },
      owner: { login: 'user', avatar_url: 'https://github.com/user.png' }
    },
    {
      id: 4,
      name: 'Mobile-App-Framework',
      full_name: 'user/Mobile-App-Framework',
      description: 'Cross-platform mobile development framework with native performance and modern UI',
      html_url: 'https://github.com/user/mobile-framework',
      language: 'Dart',
      stargazers_count: 198,
      forks_count: 56,
      created_at: '2024-02-10T11:30:00Z',
      updated_at: '2024-10-15T13:20:00Z',
      topics: ['flutter', 'dart', 'mobile', 'cross-platform', 'ui'],
      size: 3421,
      license: { spdx_id: 'MIT' },
      owner: { login: 'user', avatar_url: 'https://github.com/user.png' }
    },
    {
      id: 5,
      name: 'ML-DataScience-Toolkit',
      full_name: 'user/ML-DataScience-Toolkit',
      description: 'Comprehensive Python toolkit for machine learning and data science workflows',
      html_url: 'https://github.com/user/ml-toolkit',
      language: 'Python',
      stargazers_count: 445,
      forks_count: 132,
      created_at: '2023-06-15T14:20:00Z',
      updated_at: '2024-10-10T10:30:00Z',
      topics: ['python', 'machine-learning', 'data-science', 'pandas', 'scikit-learn'],
      size: 5678,
      license: { spdx_id: 'MIT' },
      owner: { login: 'user', avatar_url: 'https://github.com/user.png' }
    },
    {
      id: 6,
      name: 'DevOps-Automation-Pipeline',
      full_name: 'user/DevOps-Automation-Pipeline',
      description: 'Complete CI/CD pipeline automation with infrastructure as code and monitoring',
      html_url: 'https://github.com/user/devops-pipeline',
      language: 'Go',
      stargazers_count: 178,
      forks_count: 41,
      created_at: '2023-12-05T09:15:00Z',
      updated_at: '2024-09-25T15:40:00Z',
      topics: ['devops', 'cicd', 'terraform', 'monitoring', 'automation'],
      size: 2890,
      license: { spdx_id: 'Apache-2.0' },
      owner: { login: 'user', avatar_url: 'https://github.com/user.png' }
    }
  ]

  const filterProjects = () => {
    let filtered = [...projects]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(project => 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.topics?.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Filter by language
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(project => 
        project.language === selectedLanguage ||
        (selectedLanguage === 'Vue' && project.name.toLowerCase().includes('vue')) ||
        (selectedLanguage === 'React' && project.name.toLowerCase().includes('react'))
      )
    }

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count
        case 'forks':
          return b.forks_count - a.forks_count
        case 'created':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case 'updated':
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      }
    })

    setFilteredProjects(filtered)
  }

  const languages = ['all', 'JavaScript', 'TypeScript', 'Python', 'Dart', 'Go', 'React', 'Vue']

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navigation />
        <div className="pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                My <span className="text-gradient">Projects</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Loading projects...
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center reveal-element">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              My <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Explore my GitHub repositories and discover the technologies, tools, and creative solutions 
              I've built throughout my development journey.
            </p>
          </div>
        </div>
      </section>

      {/* Project Stats */}
      <ProjectStats projects={projects} />

      {/* Filters */}
      <ProjectFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        sortBy={sortBy}
        setSortBy={setSortBy}
        languages={languages}
      />

      {/* Projects Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No projects found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <Footer />
    </div>
  )
}