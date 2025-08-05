"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Box } from "@react-three/drei"
import * as THREE from "three"
import { useMobile } from "@/hooks/use-mobile"

// Componente principal del cubo de IA
function AICube({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const waveRingsRef = useRef<THREE.Group>(null)

  // Generar partículas para formar el cubo
  const cubeParticles = useMemo(() => {
    const particles = new Float32Array(isMobile ? 3000 : 8000)
    const size = 4

    for (let i = 0; i < particles.length; i += 3) {
      // Crear partículas en las caras del cubo
      const face = Math.floor(Math.random() * 6)
      let x, y, z

      switch (face) {
        case 0: // Front face
          x = (Math.random() - 0.5) * size
          y = (Math.random() - 0.5) * size
          z = size / 2
          break
        case 1: // Back face
          x = (Math.random() - 0.5) * size
          y = (Math.random() - 0.5) * size
          z = -size / 2
          break
        case 2: // Top face
          x = (Math.random() - 0.5) * size
          y = size / 2
          z = (Math.random() - 0.5) * size
          break
        case 3: // Bottom face
          x = (Math.random() - 0.5) * size
          y = -size / 2
          z = (Math.random() - 0.5) * size
          break
        case 4: // Right face
          x = size / 2
          y = (Math.random() - 0.5) * size
          z = (Math.random() - 0.5) * size
          break
        default: // Left face
          x = -size / 2
          y = (Math.random() - 0.5) * size
          z = (Math.random() - 0.5) * size
          break
      }

      particles[i] = x
      particles[i + 1] = y
      particles[i + 2] = z
    }

    return particles
  }, [isMobile])

  // Anillos de ondas de pensamiento
  const waveRings = useMemo(() => {
    return Array.from({ length: isMobile ? 3 : 5 }, (_, i) => ({
      radius: 2 + i * 1.5,
      delay: i * 0.5,
      speed: 0.5 + i * 0.2,
    }))
  }, [isMobile])

  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Animación del cubo principal
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2
      meshRef.current.rotation.y = time * 0.2
      meshRef.current.rotation.z = Math.cos(time * 0.2) * 0.1

      // Pulsación como si estuviera "pensando"
      const scale = 1 + Math.sin(time * 2) * 0.1
      meshRef.current.scale.setScalar(scale)
    }

    // Animación de partículas
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < positions.length; i += 3) {
        // Movimiento orgánico de partículas
        positions[i] += Math.sin(time + i) * 0.001
        positions[i + 1] += Math.cos(time + i * 0.5) * 0.001
        positions[i + 2] += Math.sin(time * 0.5 + i * 0.3) * 0.001
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
      particlesRef.current.rotation.y = time * 0.1
    }

    // Animación de anillos de ondas
    if (waveRingsRef.current) {
      waveRingsRef.current.children.forEach((ring, index) => {
        const waveData = waveRings[index]
        const waveTime = time * waveData.speed + waveData.delay

        // Escala pulsante
        const scale = 1 + Math.sin(waveTime * 2) * 0.3
        ring.scale.setScalar(scale)

        // Opacidad pulsante
        const material = (ring as THREE.Mesh).material as THREE.MeshBasicMaterial
        material.opacity = 0.1 + Math.sin(waveTime * 3) * 0.1

        // Rotación
        ring.rotation.x = waveTime * 0.5
        ring.rotation.z = waveTime * 0.3
      })
    }
  })

  return (
    <group>
      {/* Cubo central transparente */}
      <Box ref={meshRef} args={[4, 4, 4]}>
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.05}
          wireframe
          emissive="#0066ff"
          emissiveIntensity={0.1}
        />
      </Box>

      {/* Partículas del cubo */}
      <Points ref={particlesRef} positions={cubeParticles}>
        <PointMaterial transparent color="#ffffff" size={isMobile ? 0.02 : 0.03} sizeAttenuation={true} opacity={0.8} />
      </Points>

      {/* Anillos de ondas de pensamiento */}
      <group ref={waveRingsRef}>
        {waveRings.map((wave, index) => (
          <mesh key={index} position={[0, 0, 0]}>
            <ringGeometry args={[wave.radius, wave.radius + 0.1, 32]} />
            <meshBasicMaterial color="#00aaff" transparent opacity={0.2} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

// Partículas flotantes ambientales
function FloatingParticles({ isMobile }: { isMobile: boolean }) {
  const particlesRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const count = isMobile ? 500 : 1500
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
    }

    return positions
  }, [isMobile])

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.elapsedTime
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i]) * 0.001
        positions[i] += Math.cos(time + positions[i + 1]) * 0.0005
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={particlesRef} positions={particles}>
      <PointMaterial transparent color="#ffffff" size={isMobile ? 0.01 : 0.015} sizeAttenuation={true} opacity={0.3} />
    </Points>
  )
}

// Conexiones neuronales
function NeuralConnections({ isMobile }: { isMobile: boolean }) {
  const linesRef = useRef<THREE.Group>(null)

  const connections = useMemo(() => {
    const count = isMobile ? 20 : 50
    const lines = []

    for (let i = 0; i < count; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      )
      const end = new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20)

      lines.push({ start, end })
    }

    return lines
  }, [isMobile])

  useFrame((state) => {
    if (linesRef.current) {
      const time = state.clock.elapsedTime

      linesRef.current.children.forEach((line, index) => {
        const material = (line as THREE.Line).material as THREE.LineBasicMaterial
        material.opacity = 0.1 + Math.sin(time * 2 + index) * 0.1
      })
    }
  })

  return (
    <group ref={linesRef}>
      {connections.map((connection, index) => {
        const points = [connection.start, connection.end]
        const geometry = new THREE.BufferGeometry().setFromPoints(points)

        return (
          <line key={index} geometry={geometry}>
            <lineBasicMaterial color="#00aaff" transparent opacity={0.2} linewidth={1} />
          </line>
        )
      })}
    </group>
  )
}

// Componente principal exportado
export function AICubeBackground() {
  const isMobile = useMobile()

  return (
    <>
      {/* Iluminación profesional */}
      <ambientLight intensity={0.2} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00aaff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#aa00ff" />
      <pointLight position={[0, 15, 0]} intensity={0.4} color="#ffffff" />

      {/* Luz direccional para mejor definición */}
      <directionalLight position={[5, 5, 5]} intensity={0.2} color="#ffffff" castShadow />

      {/* Cubo principal de IA */}
      <AICube isMobile={isMobile} />

      {/* Partículas ambientales */}
      <FloatingParticles isMobile={isMobile} />

      {/* Conexiones neuronales */}
      <NeuralConnections isMobile={isMobile} />

      {/* Niebla para profundidad */}
      <fog attach="fog" args={["#000000", 15, 40]} />
    </>
  )
}
