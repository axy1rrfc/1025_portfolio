'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { InteractiveParticlesAdaptive } from './interactive-particles-adaptive'
import { BackgroundStarsAdaptive } from './background-stars-adaptive'

export function Hero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        
        <InteractiveParticlesAdaptive />
        
        {/* Theme-aware stars: bright in dark mode, dark in light mode */}
        <BackgroundStarsAdaptive />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI - Math.PI / 4}
        />
      </Canvas>
    </div>
  )
}