'use client'

import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

export function useReveal() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '-50px 0px -50px 0px'
  })

  useEffect(() => {
    if (inView && ref.current) {
      ref.current.classList.add('revealed')
    }
  }, [inView, ref])

  return ref
}