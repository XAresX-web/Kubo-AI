"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

export function PerformanceIndicator() {
  const [fps, setFps] = useState(60)
  const [showIndicator, setShowIndicator] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime >= lastTime + 1000) {
        const currentFPS = Math.round((frameCount * 1000) / (currentTime - lastTime))
        setFps(currentFPS)

        // Mostrar indicador si el rendimiento es bajo
        setShowIndicator(currentFPS < 30)

        frameCount = 0
        lastTime = currentTime
      }

      animationId = requestAnimationFrame(measureFPS)
    }

    // Solo medir FPS en desarrollo o si hay problemas de rendimiento
    if (process.env.NODE_ENV === "development") {
      measureFPS()
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          className="fixed bottom-4 right-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white text-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${fps > 30 ? "bg-green-400" : "bg-red-400"}`} />
            <span>
              {isMobile ? "Modo Móvil" : "Modo Desktop"} • {fps} FPS
            </span>
          </div>
          {fps < 30 && <div className="text-xs text-gray-400 mt-1">Rendimiento optimizado para tu dispositivo</div>}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
