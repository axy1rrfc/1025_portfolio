'use client'

import { ReactNode } from 'react'
import { useReveal } from '@/hooks/use-reveal'

interface RevealWrapperProps {
  children: ReactNode
  className?: string
}

export function RevealWrapper({ children, className = '' }: RevealWrapperProps) {
  const ref = useReveal()

  return (
    <div ref={ref} className={`reveal-element ${className}`}>
      {children}
    </div>
  )
}