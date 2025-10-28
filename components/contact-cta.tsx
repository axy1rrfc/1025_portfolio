'use client'

import { motion } from 'framer-motion'

export function ContactCTA() {
  return (
    <section className="py-20 bg-gray-900/60 dark:bg-gray-950/60 backdrop-blur-md text-white pointer-events-auto">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Build Something <span className="text-gradient">Amazing</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's collaborate on your next project and create something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:your.email@example.com" 
              className="px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              Email Me
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 text-lg border-2 border-white/30 hover:border-white/50 text-white rounded-lg transition-colors font-medium"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}