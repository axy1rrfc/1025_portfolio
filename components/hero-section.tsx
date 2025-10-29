'use client'

import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gray-900 dark:text-white drop-shadow-lg">
          Hi there, I'm <span className="text-gradient">Alex Yu</span>.
        </h1>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <p className="text-xl md:text-2xl text-gray-900 dark:text-white max-w-3xl mx-auto leading-relaxed [text-shadow:_0_2px_8px_rgb(0_0_0_/_40%)] dark:[text-shadow:_0_2px_8px_rgb(0_0_0_/_80%)]">
          I'm an aspiring full-stack engineer. Welcome to my portfolio!
        </p>
      </motion.div>
    </div>
  )
}