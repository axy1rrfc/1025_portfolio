'use client'

import { Search, Filter } from 'lucide-react'

interface ProjectFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedLanguage: string
  setSelectedLanguage: (language: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
  languages: string[]
}

export function ProjectFilters({
  searchQuery,
  setSearchQuery,
  selectedLanguage,
  setSelectedLanguage,
  sortBy,
  setSortBy,
  languages
}: ProjectFiltersProps) {
  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between reveal-element">
          {/* Search */}
          <div className="w-full lg:w-1/3">
            <div className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..." 
                className="w-full px-4 py-3 pl-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          {/* Language Filters */}
          <div className="flex flex-wrap gap-3">
            {languages.map((language) => (
              <button
                key={language}
                onClick={() => setSelectedLanguage(language)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedLanguage === language
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {language === 'all' ? 'All Projects' : language}
              </button>
            ))}
          </div>
          
          {/* Sort */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              <option value="updated">Recently Updated</option>
              <option value="stars">Most Stars</option>
              <option value="forks">Most Forks</option>
              <option value="created">Recently Created</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  )
}