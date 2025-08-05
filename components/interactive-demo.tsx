"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Code, Globe, Zap, Copy, Check } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

const demoSteps = [
  {
    id: 1,
    titleKey: "demo.step1_title",
    descriptionKey: "demo.step1_description",
    inputKey: "demo.input_example",
    icon: Code,
  },
  {
    id: 2,
    titleKey: "demo.step2_title",
    descriptionKey: "demo.step2_description",
    processing: true,
    icon: Zap,
  },
  {
    id: 3,
    titleKey: "demo.step3_title",
    descriptionKey: "demo.step3_description",
    output: `// App.tsx - Generado por KUBO AI
import React from 'react';
import { AuthProvider } from './auth';
import { TaskManager } from './components';

export default function App() {
  return (
    <AuthProvider>
      <TaskManager />
    </AuthProvider>
  );
}`,
    icon: Globe,
  },
]

export function InteractiveDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [copied, setCopied] = useState(false)
  const { t } = useLanguage()

  const startDemo = () => {
    setIsPlaying(true)
    setCurrentStep(0)
  }

  useEffect(() => {
    if (isPlaying && currentStep < demoSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
      }, 2500)
      return () => clearTimeout(timer)
    } else if (isPlaying && currentStep === demoSteps.length - 1) {
      const timer = setTimeout(() => {
        setIsPlaying(false)
        setCurrentStep(0)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [currentStep, isPlaying])

  const copyCode = async () => {
    const step = demoSteps[currentStep]
    if (step.output) {
      try {
        await navigator.clipboard.writeText(step.output)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        console.error("Error copying code:", error)
      }
    }
  }

  return (
    <section className="py-16 md:py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            {t("demo.title")}
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-6 md:mb-8">{t("demo.subtitle")}</p>

          {!isPlaying && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={startDemo}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl shadow-2xl"
              >
                <Play className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                {t("demo.start_demo")}
              </Button>
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {demoSteps.map((step, index) => {
            const isActive = currentStep === index && isPlaying
            const isCompleted = currentStep > index && isPlaying
            const IconComponent = step.icon

            return (
              <motion.div
                key={step.id}
                className={`relative ${
                  isActive ? "scale-105 z-10" : isCompleted ? "opacity-75" : isPlaying ? "opacity-50" : "opacity-100"
                }`}
                animate={{
                  scale: isActive ? 1.05 : 1,
                  opacity: isActive ? 1 : isCompleted ? 0.75 : isPlaying ? 0.5 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className={`h-full transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-green-500/20 to-blue-500/20 border-green-500/50 shadow-2xl shadow-green-500/20"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-br from-green-500 to-blue-500 shadow-lg"
                            : isCompleted
                              ? "bg-green-500"
                              : "bg-gray-700"
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        ) : (
                          <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-white text-base md:text-lg">{t(step.titleKey)}</CardTitle>
                        <p className="text-gray-400 text-xs md:text-sm">{t(step.descriptionKey)}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <AnimatePresence mode="wait">
                      {step.inputKey && isActive && (
                        <motion.div
                          key="input"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 md:p-4"
                        >
                          <div className="text-blue-300 text-xs md:text-sm mb-2">Input del usuario:</div>
                          <div className="text-white font-mono text-xs md:text-sm">{t(step.inputKey)}</div>
                        </motion.div>
                      )}

                      {step.processing && isActive && (
                        <motion.div
                          key="processing"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 md:p-4"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              <Zap className="w-4 h-4 text-yellow-400" />
                            </motion.div>
                            <span className="text-yellow-300 text-xs md:text-sm">{t("demo.processing")}</span>
                          </div>
                          <div className="space-y-2">
                            <div className="text-gray-300 text-xs">✓ {t("demo.analyzing")}</div>
                            <div className="text-gray-300 text-xs">✓ {t("demo.designing")}</div>
                            <div className="text-gray-300 text-xs">✓ {t("demo.generating")}</div>
                            <div className="text-gray-300 text-xs">⏳ {t("demo.optimizing")}</div>
                          </div>
                        </motion.div>
                      )}

                      {step.output && isActive && (
                        <motion.div
                          key="output"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 md:p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-green-300 text-xs md:text-sm">{t("demo.code_generated")}</span>
                            <Button
                              onClick={copyCode}
                              size="sm"
                              variant="ghost"
                              className="text-green-400 hover:text-green-300 h-6 px-2"
                            >
                              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            </Button>
                          </div>
                          <pre className="text-white font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                            {step.output}
                          </pre>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isPlaying && (
                      <div className="text-gray-500 text-xs md:text-sm">
                        {step.inputKey && `Input: ${t(step.inputKey).substring(0, 50)}...`}
                        {step.processing && "IA procesando y generando código..."}
                        {step.output && "Código completo listo para producción"}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Connection Line */}
                {index < demoSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-white/20 to-transparent transform -translate-y-1/2 z-0" />
                )}
              </motion.div>
            )
          })}
        </div>

        {isPlaying && (
          <motion.div
            className="mt-8 md:mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="w-2 h-2 bg-green-400 rounded-full"
              />
              <span className="text-white text-sm">{t("demo.in_progress")}</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
