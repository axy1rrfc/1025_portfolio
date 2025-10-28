'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

export function InteractiveParticlesAdaptive() {
  const pointsRef = useRef<THREE.Points>(null!)
  const particleCount = 1000
  const [isMouseDown, setIsMouseDown] = useState(false)
  const { theme, systemTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  const colorTransitionProgress = useRef(1) // 0 to 1, 1 means transition complete
  const previousColors = useRef<Float32Array | null>(null)
  
  // Track mouse down/up events
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Check if clicking on a canvas element (particle background)
      // or clicking on areas with pointer-events enabled
      const isCanvas = target.tagName === 'CANVAS'
      const isInNav = target.closest('nav') !== null
      const isButton = target.tagName === 'BUTTON' || target.closest('button') !== null
      const isLink = target.tagName === 'A'
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT'
      
      // Activate particles only on canvas or when not on interactive elements
      if (isCanvas || (!isInNav && !isButton && !isLink && !isInput)) {
        setIsMouseDown(true)
      }
    }
    
    const handleMouseUp = () => setIsMouseDown(false)
    
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])
  
  // Generate positions ONCE - never regenerate
  const positions = useMemo(() => {
    const posArray = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 20
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 20
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    
    return posArray
  }, []) // No dependencies - only generate once!
  
  // Generate target colors based on theme
  const targetColors = useMemo(() => {
    const colorsArray = new Float32Array(particleCount * 3)
    // Default to dark if theme is undefined (during initial load)
    const isDark = currentTheme === 'dark' || currentTheme === undefined
    
    // Store previous colors before generating new ones
    if (pointsRef.current?.geometry.attributes.color) {
      const currentColors = pointsRef.current.geometry.attributes.color.array as Float32Array
      previousColors.current = new Float32Array(currentColors)
      colorTransitionProgress.current = 0 // Start new transition
    } else {
      // First render - no transition needed
      colorTransitionProgress.current = 1
    }
    
    for (let i = 0; i < particleCount; i++) {
      if (isDark) {
        // Brighter colors for dark mode
        colorsArray[i * 3] = 0.5 + Math.random() * 0.5     // R: 0.5-1.0
        colorsArray[i * 3 + 1] = 0.7 + Math.random() * 0.3 // G: 0.7-1.0
        colorsArray[i * 3 + 2] = 1                          // B: 1.0
      } else {
        // Very dark, highly visible colors for light mode
        colorsArray[i * 3] = 0.05 + Math.random() * 0.1    // R: 0.05-0.15 (very dark)
        colorsArray[i * 3 + 1] = 0.1 + Math.random() * 0.15 // G: 0.1-0.25 (very dark)
        colorsArray[i * 3 + 2] = 0.3 + Math.random() * 0.2  // B: 0.3-0.5 (darker blue)
      }
    }
    
    return colorsArray
  }, [currentTheme]) // Only regenerate colors when theme changes

  // Animation - only react to mouse when clicked
  useFrame((state, delta) => {
    if (!pointsRef.current) return
    
    // Smooth color transition
    if (colorTransitionProgress.current < 1) {
      colorTransitionProgress.current = Math.min(1, colorTransitionProgress.current + delta * 0.8) // 1.25 second transition
      
      if (previousColors.current && pointsRef.current.geometry.attributes.color) {
        const colors = pointsRef.current.geometry.attributes.color.array as Float32Array
        const progress = colorTransitionProgress.current
        
        // Smooth easing function
        const easedProgress = progress * progress * (3 - 2 * progress) // smoothstep
        
        // Interpolate between previous and target colors
        for (let i = 0; i < colors.length; i++) {
          colors[i] = previousColors.current[i] + (targetColors[i] - previousColors.current[i]) * easedProgress
        }
        
        pointsRef.current.geometry.attributes.color.needsUpdate = true
      }
    }
    
    // Use delta time to prevent spinning when tab is inactive
    // Clamp delta to prevent huge jumps (max 1/30th of a second)
    const cappedDelta = Math.min(delta, 1 / 30)
    
    // Base auto-rotation (smooth, frame-rate independent)
    let targetRotationY = pointsRef.current.rotation.y + cappedDelta * 0.05
    let targetRotationX = pointsRef.current.rotation.x + cappedDelta * 0.03
    
    // Only add mouse influence when mouse is held down
    if (isMouseDown) {
      targetRotationY += state.mouse.x * 0.002
      targetRotationX += state.mouse.y * 0.002
    }
    
    // Apply rotation directly with capped delta
    pointsRef.current.rotation.y = targetRotationY
    pointsRef.current.rotation.x = targetRotationX
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={targetColors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.95}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

