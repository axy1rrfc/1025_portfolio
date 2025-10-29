'use client'

import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import { useRef } from 'react'

interface ScrollFadeSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function ScrollFadeSection({ children, className = '', id }: ScrollFadeSectionProps) {
  const ref = useRef<HTMLElement>(null)
  
  // Track scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"] // Starts when section enters viewport, ends when it leaves
  })
  
  // DRAMATIC transitions - extended fade periods for maximum impact
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],     // Very extended fade periods (40% in, 40% out)
    [0, 1, 1, 0]          // Full fade range
  )
  
  // Very dramatic scale effect for cinematic feel
  const scale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0.8, 1, 1, 0.8]      // 20% scale change - very noticeable
  )
  
  // Large vertical movement for dramatic entrance/exit
  const y = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [150, 0, 0, -150]     // 150px slide - highly visible
  )
  
  // Blur effect for depth of field (like camera focus)
  const blurValue = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [10, 0, 0, 10]        // Blur when entering/exiting
  )
  
  const filter = useMotionTemplate`blur(${blurValue}px)`
  
  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      style={{ 
        opacity, 
        scale, 
        y,
        filter
      }}
    >
      {children}
    </motion.section>
  )
}

