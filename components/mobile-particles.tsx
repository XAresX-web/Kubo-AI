"use client"

import { motion } from "framer-motion"

export function MobileParticles() {
  return (
    <div className="absolute inset-0 z-15">
      {/* Partículas principales reducidas */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`main-${i}`}
          className={`absolute rounded-full ${i % 2 === 0 ? "bg-white" : "bg-gray-600"}`}
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 5 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Líneas de conexión simplificadas */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`connection-${i}`}
          className="absolute w-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          style={{
            height: Math.random() * 60 + 30,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 180}deg)`,
          }}
          animate={{
            opacity: [0, 0.3, 0],
            scaleY: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Efectos de "pensamiento" simplificados */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`thinking-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          <motion.div
            className="w-1 h-1 rounded-full bg-white opacity-60"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 4,
            }}
          />
        </motion.div>
      ))}

      {/* Círculos pulsantes reducidos */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute w-6 h-6 border border-white/10 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0.5, 1.2, 0.5],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  )
}
