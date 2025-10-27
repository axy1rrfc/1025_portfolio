'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from './ui/button'

export function ContactCTA() {
  return (
    <section className="py-20 bg-gray-900 text-white dark:bg-gray-950">
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
          <Link href="/contact">
            <Button size="lg" className="px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700">
              Start a Conversation
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}