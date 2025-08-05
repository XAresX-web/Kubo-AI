"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Gift, Clock, Zap } from "lucide-react"
import { joinWaitlist } from "@/app/actions"

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true)
        setHasShown(true)
      }
    }

    const handleBeforeUnload = () => {
      if (!hasShown) {
        setIsVisible(true)
        setHasShown(true)
      }
    }

    // También mostrar después de 30 segundos si no se ha mostrado
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true)
        setHasShown(true)
      }
    }, 30000)

    document.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("beforeunload", handleBeforeUnload)
      clearTimeout(timer)
    }
  }, [hasShown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    try {
      await joinWaitlist(email)
      setIsVisible(false)
    } catch (error) {
      console.error("Error submitting email:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisible(false)}
          />

          {/* Popup */}
          <motion.div
            className="relative bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-2xl"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="text-center mb-6">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Gift className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-2">¡Espera! 🎁</h3>
              <p className="text-gray-300 mb-4">
                Antes de irte, únete a nuestra lista VIP y obtén{" "}
                <span className="text-orange-400 font-semibold">acceso prioritario</span> cuando lancemos.
              </p>

              <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-red-400" />
                  <span className="text-red-300 font-semibold">Oferta limitada</span>
                </div>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>✨ Acceso 48 horas antes que otros</li>
                  <li>🎯 Créditos gratis de lanzamiento</li>
                  <li>🚀 Sesión exclusiva con el equipo</li>
                </ul>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 text-center"
                required
              />

              <Button
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white h-12 text-lg font-semibold rounded-xl shadow-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Procesando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    ¡Quiero Acceso VIP!
                  </div>
                )}
              </Button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              Sin spam. Solo actualizaciones importantes sobre KUBO AI.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
