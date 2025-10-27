'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Float, MeshDistortMaterial } from '@react-three/drei'
import { useRef, useMemo, useState } from 'react'
import * as THREE from 'three'

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>
    </Float>
  )
}

// ENHANCED: Interactive particle field with mouse tracking and wave motion
function EnhancedParticleField() {
  const pointsRef = useRef<THREE.Points>(null!)
  const particleCount = 2000 // Increased from 1000
  const mousePos = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()
  
  // Store original positions for wave effect
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const originalPositions = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      // Create spherical distribution instead of cube
      const radius = 10 + Math.random() * 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)
      
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      
      originalPositions[i * 3] = x
      originalPositions[i * 3 + 1] = y
      originalPositions[i * 3 + 2] = z
      
      // Enhanced color palette with more variation
      const colorChoice = Math.random()
      if (colorChoice < 0.33) {
        // Blue particles
        colors[i * 3] = 0.3 + Math.random() * 0.3
        colors[i * 3 + 1] = 0.6 + Math.random() * 0.4
        colors[i * 3 + 2] = 1
      } else if (colorChoice < 0.66) {
        // Purple particles
        colors[i * 3] = 0.6 + Math.random() * 0.4
        colors[i * 3 + 1] = 0.3 + Math.random() * 0.3
        colors[i * 3 + 2] = 1
      } else {
        // Cyan particles
        colors[i * 3] = 0.2 + Math.random() * 0.3
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2
        colors[i * 3 + 2] = 1
      }
      
      // Varied particle sizes
      sizes[i] = 0.03 + Math.random() * 0.07
    }
    
    return { positions, colors, sizes, originalPositions }
  }, [])

  // Animation and mouse tracking in single useFrame for better performance
  useFrame((state) => {
    if (pointsRef.current) {
      // Update mouse position
      mousePos.current.x = state.mouse.x * 5 // Scale to world coordinates
      mousePos.current.y = state.mouse.y * 5
      
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      const time = state.clock.elapsedTime
      
      // Gentle rotation
      pointsRef.current.rotation.y = time * 0.03
      pointsRef.current.rotation.x = Math.sin(time * 0.2) * 0.1
      
      // Wave motion and mouse interaction
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        
        // Get original position
        const origX = particles.originalPositions[i3]
        const origY = particles.originalPositions[i3 + 1]
        const origZ = particles.originalPositions[i3 + 2]
        
        // Add wave motion
        const waveX = Math.sin(origY * 0.3 + time) * 0.3
        const waveY = Math.cos(origX * 0.3 + time) * 0.3
        const waveZ = Math.sin(origZ * 0.3 + time * 0.5) * 0.2
        
        // Mouse interaction - particles move away from cursor
        const mouseInfluence = 3
        const dx = origX - mousePos.current.x
        const dy = origY - mousePos.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 8
        const force = Math.max(0, 1 - distance / maxDistance)
        
        // Apply repulsion force
        const repelX = (dx / distance) * force * mouseInfluence
        const repelY = (dy / distance) * force * mouseInfluence
        
        positions[i3] = origX + waveX + (isNaN(repelX) ? 0 : repelX)
        positions[i3 + 1] = origY + waveY + (isNaN(repelY) ? 0 : repelY)
        positions[i3 + 2] = origZ + waveZ
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending} // Enhanced glow effect
        depthWrite={false}
      />
    </points>
  )
}

function FloatingGeometries() {
  const geometries = useMemo(() => {
    const geo = []
    for (let i = 0; i < 15; i++) { // Reduced from 20 for better performance
      const position = [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      ] as [number, number, number]
      
      const rotation = [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ] as [number, number, number]
      
      const scale = 0.3 + Math.random() * 0.4
      
      geo.push({ position, rotation, scale })
    }
    return geo
  }, [])

  return (
    <>
      {geometries.map((geo, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={geo.position} rotation={geo.rotation} scale={geo.scale}>
            {i % 3 === 0 && <boxGeometry args={[0.5, 0.5, 0.5]} />}
            {i % 3 === 1 && <sphereGeometry args={[0.3, 16, 16]} />}
            {i % 3 === 2 && <coneGeometry args={[0.3, 0.6, 8]} />}
            <meshStandardMaterial
              color={`hsl(${200 + Math.random() * 60}, 70%, 60%)`}
              transparent
              opacity={0.6}
              wireframe={Math.random() > 0.5}
              emissive={`hsl(${200 + Math.random() * 60}, 70%, 30%)`}
              emissiveIntensity={0.3}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

export function Hero3DEnhanced() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]} // Adaptive pixel ratio for performance
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[0, 10, -10]} intensity={0.3} color="#8b5cf6" />
        
        <AnimatedSphere />
        <EnhancedParticleField />
        <FloatingGeometries />
        
        <Stars 
          radius={100} 
          depth={50} 
          count={3000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1} 
        />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI - Math.PI / 4}
        />
      </Canvas>
    </div>
  )
}

