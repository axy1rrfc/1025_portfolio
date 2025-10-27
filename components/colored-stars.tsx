'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function ColoredStars() {
  const starsRef = useRef<THREE.Points>(null!)
  const planetsRef = useRef<THREE.Group>(null!)
  const starCount = 5000
  const planetCount = 20
  
  // Generate stars with mostly white, some colored
  const starData = useMemo(() => {
    const positions = new Float32Array(starCount * 3)
    const colors = new Float32Array(starCount * 3)
    const sizes = new Float32Array(starCount)
    
    for (let i = 0; i < starCount; i++) {
      // Random position in sphere
      const radius = 50 + Math.random() * 50
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      
      // 85% white stars, 15% colored stars
      const isColored = Math.random() > 0.85
      
      if (isColored) {
        const colorType = Math.random()
        if (colorType < 0.25) {
          // Blue stars
          colors[i * 3] = 0.5 + Math.random() * 0.3
          colors[i * 3 + 1] = 0.7 + Math.random() * 0.3
          colors[i * 3 + 2] = 1
        } else if (colorType < 0.5) {
          // Red/Orange stars
          colors[i * 3] = 1
          colors[i * 3 + 1] = 0.4 + Math.random() * 0.4
          colors[i * 3 + 2] = 0.2 + Math.random() * 0.3
        } else if (colorType < 0.75) {
          // Purple/Pink stars
          colors[i * 3] = 0.8 + Math.random() * 0.2
          colors[i * 3 + 1] = 0.3 + Math.random() * 0.3
          colors[i * 3 + 2] = 0.9 + Math.random() * 0.1
        } else {
          // Green/Cyan stars
          colors[i * 3] = 0.3 + Math.random() * 0.3
          colors[i * 3 + 1] = 0.8 + Math.random() * 0.2
          colors[i * 3 + 2] = 0.7 + Math.random() * 0.3
        }
      } else {
        // White stars
        const brightness = 0.8 + Math.random() * 0.2
        colors[i * 3] = brightness
        colors[i * 3 + 1] = brightness
        colors[i * 3 + 2] = brightness
      }
      
      // Varied sizes
      sizes[i] = Math.random() * 2 + 0.5
    }
    
    return { positions, colors, sizes }
  }, [])
  
  // Generate colored planets
  const planets = useMemo(() => {
    const planetArray = []
    
    for (let i = 0; i < planetCount; i++) {
      const radius = 60 + Math.random() * 40
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      
      const position = [
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      ] as [number, number, number]
      
      const size = 0.3 + Math.random() * 0.8
      
      // Random planet colors
      const colorType = Math.random()
      let color
      if (colorType < 0.2) {
        color = '#3b82f6' // Blue
      } else if (colorType < 0.4) {
        color = '#8b5cf6' // Purple
      } else if (colorType < 0.6) {
        color = '#ec4899' // Pink
      } else if (colorType < 0.8) {
        color = '#10b981' // Green
      } else {
        color = '#f59e0b' // Orange
      }
      
      planetArray.push({ position, size, color })
    }
    
    return planetArray
  }, [])
  
  // Slow rotation
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.01
      starsRef.current.rotation.x = state.clock.elapsedTime * 0.005
    }
    if (planetsRef.current) {
      planetsRef.current.rotation.y = state.clock.elapsedTime * 0.015
      planetsRef.current.rotation.x = state.clock.elapsedTime * 0.008
    }
  })
  
  return (
    <>
      {/* Stars */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starCount}
            array={starData.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={starCount}
            array={starData.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={starCount}
            array={starData.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={1}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Planets */}
      <group ref={planetsRef}>
        {planets.map((planet, i) => (
          <mesh key={i} position={planet.position}>
            <sphereGeometry args={[planet.size, 16, 16]} />
            <meshStandardMaterial
              color={planet.color}
              emissive={planet.color}
              emissiveIntensity={0.3}
              roughness={0.7}
              metalness={0.3}
            />
          </mesh>
        ))}
      </group>
    </>
  )
}

