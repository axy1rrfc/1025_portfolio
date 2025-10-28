'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

function UnifiedBackgroundStars() {
  const starsRef = useRef<THREE.Points>(null!)
  const starCount = 5000
  const { theme, systemTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  // Default to dark if theme is undefined (during initial load)
  const isDark = currentTheme === 'dark' || currentTheme === undefined
  const colorTransitionProgress = useRef(1)
  const previousColors = useRef<Float32Array | null>(null)
  
  // Generate positions ONCE - never regenerate
  const positions = useMemo(() => {
    const posArray = new Float32Array(starCount * 3)
    const sizes = new Float32Array(starCount)
    
    for (let i = 0; i < starCount; i++) {
      // Random position in sphere
      const radius = 50 + Math.random() * 50
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      
      posArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      posArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      posArray[i * 3 + 2] = radius * Math.cos(phi)
      
      // Very small sizes for tiny background stars
      sizes[i] = Math.random() * 0.8 + 0.2
    }
    
    return { positions: posArray, sizes }
  }, []) // No dependencies - only generate once!
  
  // Generate target colors based on theme - can change without shifting positions
  const targetColors = useMemo(() => {
    const colorsArray = new Float32Array(starCount * 3)
    
    // Store previous colors before generating new ones
    if (starsRef.current?.geometry.attributes.color) {
      const currentColors = starsRef.current.geometry.attributes.color.array as Float32Array
      previousColors.current = new Float32Array(currentColors)
      colorTransitionProgress.current = 0
    } else {
      // First render - no transition needed
      colorTransitionProgress.current = 1
    }
    
    for (let i = 0; i < starCount; i++) {
      const isColored = Math.random() > 0.85
      
      if (isDark) {
        // Bright colors for dark mode
        if (isColored) {
          const colorType = Math.random()
          if (colorType < 0.25) {
            // Blue stars
            colorsArray[i * 3] = 0.5 + Math.random() * 0.3
            colorsArray[i * 3 + 1] = 0.7 + Math.random() * 0.3
            colorsArray[i * 3 + 2] = 1
          } else if (colorType < 0.5) {
            // Red/Orange stars
            colorsArray[i * 3] = 1
            colorsArray[i * 3 + 1] = 0.4 + Math.random() * 0.4
            colorsArray[i * 3 + 2] = 0.2 + Math.random() * 0.3
          } else if (colorType < 0.75) {
            // Purple/Pink stars
            colorsArray[i * 3] = 0.8 + Math.random() * 0.2
            colorsArray[i * 3 + 1] = 0.3 + Math.random() * 0.3
            colorsArray[i * 3 + 2] = 0.9 + Math.random() * 0.1
          } else {
            // Green/Cyan stars
            colorsArray[i * 3] = 0.3 + Math.random() * 0.3
            colorsArray[i * 3 + 1] = 0.8 + Math.random() * 0.2
            colorsArray[i * 3 + 2] = 0.7 + Math.random() * 0.3
          }
        } else {
          // White stars
          const brightness = 0.8 + Math.random() * 0.2
          colorsArray[i * 3] = brightness
          colorsArray[i * 3 + 1] = brightness
          colorsArray[i * 3 + 2] = brightness
        }
      } else {
        // Dark colors for light mode
        if (isColored) {
          const colorType = Math.random()
          if (colorType < 0.5) {
            // Very dark blue
            colorsArray[i * 3] = 0.05 + Math.random() * 0.1
            colorsArray[i * 3 + 1] = 0.1 + Math.random() * 0.15
            colorsArray[i * 3 + 2] = 0.3 + Math.random() * 0.2
          } else {
            // Very dark purple
            colorsArray[i * 3] = 0.2 + Math.random() * 0.1
            colorsArray[i * 3 + 1] = 0.05 + Math.random() * 0.1
            colorsArray[i * 3 + 2] = 0.3 + Math.random() * 0.15
          }
        } else {
          // Very dark gray/black stars
          const darkness = 0.1 + Math.random() * 0.2
          colorsArray[i * 3] = darkness
          colorsArray[i * 3 + 1] = darkness
          colorsArray[i * 3 + 2] = darkness
        }
      }
    }
    
    return colorsArray
  }, [isDark, currentTheme]) // Only regenerate colors when theme changes
  
  // Slow rotation and smooth color transition
  useFrame((state, delta) => {
    if (!starsRef.current) return
    
    // Smooth color transition
    if (colorTransitionProgress.current < 1) {
      colorTransitionProgress.current = Math.min(1, colorTransitionProgress.current + delta * 0.8)
      
      if (previousColors.current && starsRef.current.geometry.attributes.color) {
        const colors = starsRef.current.geometry.attributes.color.array as Float32Array
        const progress = colorTransitionProgress.current
        const easedProgress = progress * progress * (3 - 2 * progress)
        
        for (let i = 0; i < colors.length; i++) {
          colors[i] = previousColors.current[i] + (targetColors[i] - previousColors.current[i]) * easedProgress
        }
        
        starsRef.current.geometry.attributes.color.needsUpdate = true
      }
    }
    
    // Use delta time to prevent spinning when tab is inactive
    const cappedDelta = Math.min(delta, 1 / 30)
    
    // Increment rotation by small amount per frame
    starsRef.current.rotation.y += cappedDelta * 0.01
    starsRef.current.rotation.x += cappedDelta * 0.005
  })
  
  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starCount}
          array={positions.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={starCount}
          array={targetColors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={starCount}
          array={positions.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.4}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.NormalBlending}
      />
    </points>
  )
}

export function BackgroundStarsAdaptive() {
  return <UnifiedBackgroundStars />
}

