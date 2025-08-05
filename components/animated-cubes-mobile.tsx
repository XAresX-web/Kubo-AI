"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Box, Sphere } from "@react-three/drei"
import type * as THREE from "three"

// Versión simplificada para móviles
function SimpleCube({
  position,
  scale,
  color,
  speed,
}: { position: [number, number, number]; scale: number; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Rotación más simple
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5

      // Movimiento flotante reducido
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5

      // Pulsación de opacidad más suave
      const material = meshRef.current.material as THREE.MeshStandardMaterial
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * speed) * 0.1
    }
  })

  return (
    <Box ref={meshRef} position={position} scale={scale}>
      <meshStandardMaterial color={color} transparent opacity={0.4} emissive={color} emissiveIntensity={0.05} />
    </Box>
  )
}

function SimpleParticle({
  position,
  scale,
  color,
}: { position: [number, number, number]; scale: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Solo pulsación simple
      const material = meshRef.current.material as THREE.MeshStandardMaterial
      material.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <Sphere ref={meshRef} position={position} scale={scale}>
      <meshStandardMaterial color={color} transparent opacity={0.3} />
    </Sphere>
  )
}

export function AnimatedCubesMobile() {
  const cubes = useMemo(() => {
    const cubeData = []
    const colors = ["#ffffff", "#666666", "#999999"]

    // Solo 6 cubos para móviles
    for (let i = 0; i < 6; i++) {
      cubeData.push({
        position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15] as [
          number,
          number,
          number,
        ],
        scale: Math.random() * 0.6 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.3 + 0.2,
      })
    }

    return cubeData
  }, [])

  const particles = useMemo(() => {
    const particleData = []
    const colors = ["#ffffff", "#888888"]

    // Solo 12 partículas para móviles
    for (let i = 0; i < 12; i++) {
      particleData.push({
        position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20] as [
          number,
          number,
          number,
        ],
        scale: Math.random() * 0.15 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    return particleData
  }, [])

  return (
    <>
      {/* Iluminación simplificada */}
      <ambientLight intensity={0.4} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#ffffff" />

      {/* Cubos simplificados */}
      {cubes.map((cube, index) => (
        <SimpleCube
          key={`cube-${index}`}
          position={cube.position}
          scale={cube.scale}
          color={cube.color}
          speed={cube.speed}
        />
      ))}

      {/* Partículas simplificadas */}
      {particles.map((particle, index) => (
        <SimpleParticle
          key={`particle-${index}`}
          position={particle.position}
          scale={particle.scale}
          color={particle.color}
        />
      ))}
    </>
  )
}
