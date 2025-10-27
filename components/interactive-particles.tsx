'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function InteractiveParticles() {
  const pointsRef = useRef<THREE.Points>(null!)
  const particleCount = 1000
  const [isMouseDown, setIsMouseDown] = useState(false)
  
  // Track mouse down/up events
  useEffect(() => {
    const handleMouseDown = () => setIsMouseDown(true)
    const handleMouseUp = () => setIsMouseDown(false)
    
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])
  
  // Simple particle generation - just positions and colors
  const particleData = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      
      colors[i * 3] = 0.5 + Math.random() * 0.5
      colors[i * 3 + 1] = 0.7 + Math.random() * 0.3
      colors[i * 3 + 2] = 1
    }
    
    return { positions, colors }
  }, [])

  // Animation - only react to mouse when clicked
  useFrame((state) => {
    if (!pointsRef.current) return
    
    // Base auto-rotation
    let targetRotationY = state.clock.elapsedTime * 0.05
    let targetRotationX = state.clock.elapsedTime * 0.03
    
    // Only add mouse influence when mouse is held down
    if (isMouseDown) {
      targetRotationY += state.mouse.x * 0.2
      targetRotationX += state.mouse.y * 0.2
    }
    
    // Smoother interpolation with easing
    pointsRef.current.rotation.y += (targetRotationY - pointsRef.current.rotation.y) * 0.08
    pointsRef.current.rotation.x += (targetRotationX - pointsRef.current.rotation.x) * 0.08
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particleData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particleData.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

