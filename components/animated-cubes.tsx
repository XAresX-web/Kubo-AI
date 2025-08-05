"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Box, Sphere } from "@react-three/drei"
import type * as THREE from "three"
import * as THREE_NAMESPACE from "three"

// Componente para cubos individuales con animación de IA
function AIThinkingCube({
  position,
  scale,
  color,
  speed,
}: { position: [number, number, number]; scale: number; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const initialPosition = useRef(position)

  useFrame((state) => {
    if (meshRef.current) {
      // Rotación orgánica
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.3
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * speed * 0.7) * 0.3
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.2

      // Movimiento flotante orgánico
      meshRef.current.position.x = initialPosition.current[0] + Math.sin(state.clock.elapsedTime * speed * 0.3) * 2
      meshRef.current.position.y = initialPosition.current[1] + Math.cos(state.clock.elapsedTime * speed * 0.4) * 1.5
      meshRef.current.position.z = initialPosition.current[2] + Math.sin(state.clock.elapsedTime * speed * 0.2) * 1

      // Pulsación de opacidad para simular "pensamiento"
      const material = meshRef.current.material as THREE.MeshStandardMaterial
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * speed * 2) * 0.2
    }
  })

  return (
    <Box ref={meshRef} position={position} scale={scale}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.4}
        emissive={color}
        emissiveIntensity={0.1}
        wireframe={Math.random() > 0.7} // Algunos cubos en wireframe
      />
    </Box>
  )
}

// Componente para partículas esféricas
function AIParticle({
  position,
  scale,
  color,
  speed,
}: { position: [number, number, number]; scale: number; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const initialPosition = useRef(position)

  useFrame((state) => {
    if (meshRef.current) {
      // Movimiento más sutil para partículas
      meshRef.current.position.x = initialPosition.current[0] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.5
      meshRef.current.position.y = initialPosition.current[1] + Math.cos(state.clock.elapsedTime * speed * 0.3) * 0.3
      meshRef.current.position.z = initialPosition.current[2] + Math.sin(state.clock.elapsedTime * speed * 0.4) * 0.4

      // Pulsación más rápida para simular actividad neuronal
      const material = meshRef.current.material as THREE.MeshStandardMaterial
      material.opacity = 0.2 + Math.sin(state.clock.elapsedTime * speed * 4) * 0.3
    }
  })

  return (
    <Sphere ref={meshRef} position={position} scale={scale}>
      <meshStandardMaterial color={color} transparent opacity={0.3} emissive={color} emissiveIntensity={0.2} />
    </Sphere>
  )
}

// Componente para líneas de conexión (red neuronal)
function NeuralConnections({ cubes }: { cubes: any[] }) {
  const linesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.1

      // Cambiar opacidad de las conexiones
      linesRef.current.children.forEach((line, index) => {
        const material = (line as THREE.Line).material as THREE.LineBasicMaterial
        material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.1
      })
    }
  })

  const connections = useMemo(() => {
    const lines = []
    for (let i = 0; i < cubes.length; i++) {
      for (let j = i + 1; j < cubes.length; j++) {
        const distance = Math.sqrt(
          Math.pow(cubes[i].position[0] - cubes[j].position[0], 2) +
            Math.pow(cubes[i].position[1] - cubes[j].position[1], 2) +
            Math.pow(cubes[i].position[2] - cubes[j].position[2], 2),
        )

        // Solo conectar elementos cercanos
        if (distance < 8 && Math.random() > 0.7) {
          lines.push({
            start: cubes[i].position,
            end: cubes[j].position,
          })
        }
      }
    }
    return lines
  }, [cubes])

  return (
    <group ref={linesRef}>
      {connections.map((connection, index) => {
        const points = [
          new THREE_NAMESPACE.Vector3(...connection.start),
          new THREE_NAMESPACE.Vector3(...connection.end),
        ]
        const geometry = new THREE_NAMESPACE.BufferGeometry().setFromPoints(points)

        return (
          <line key={index} geometry={geometry}>
            <lineBasicMaterial color="#ffffff" transparent opacity={0.1} linewidth={1} />
          </line>
        )
      })}
    </group>
  )
}

export function AnimatedCubes() {
  const cubes = useMemo(() => {
    const cubeData = []
    const colors = ["#ffffff", "#000000", "#666666", "#999999", "#333333", "#cccccc"]

    // Cubos principales más grandes
    for (let i = 0; i < 15; i++) {
      cubeData.push({
        position: [(Math.random() - 0.5) * 25, (Math.random() - 0.5) * 25, (Math.random() - 0.5) * 25] as [
          number,
          number,
          number,
        ],
        scale: Math.random() * 0.8 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.5 + 0.3,
        type: "cube",
      })
    }

    return cubeData
  }, [])

  const particles = useMemo(() => {
    const particleData = []
    const colors = ["#ffffff", "#000000", "#888888"]

    // Partículas más pequeñas y numerosas
    for (let i = 0; i < 40; i++) {
      particleData.push({
        position: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30] as [
          number,
          number,
          number,
        ],
        scale: Math.random() * 0.2 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.8 + 0.2,
        type: "particle",
      })
    }

    return particleData
  }, [])

  return (
    <>
      {/* Iluminación más suave y profesional */}
      <ambientLight intensity={0.3} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#666666" />
      <pointLight position={[0, 15, 0]} intensity={0.6} color="#ffffff" />

      {/* Luz direccional para mejor definición */}
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" castShadow />

      {/* Cubos principales */}
      {cubes.map((cube, index) => (
        <AIThinkingCube
          key={`cube-${index}`}
          position={cube.position}
          scale={cube.scale}
          color={cube.color}
          speed={cube.speed}
        />
      ))}

      {/* Partículas */}
      {particles.map((particle, index) => (
        <AIParticle
          key={`particle-${index}`}
          position={particle.position}
          scale={particle.scale}
          color={particle.color}
          speed={particle.speed}
        />
      ))}

      {/* Conexiones neuronales */}
      <NeuralConnections cubes={[...cubes, ...particles]} />

      {/* Efecto de niebla para profundidad */}
      <fog attach="fog" args={["#000000", 20, 50]} />
    </>
  )
}
