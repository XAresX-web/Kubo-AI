"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, ChevronLeft, User, Briefcase, CheckCircle, Sparkles, AlertCircle } from "lucide-react"
import { joinWaitlist } from "@/app/actions"
import { useUserProfile, type DeveloperType, type ExperienceLevel, type CompanySize } from "@/hooks/use-user-profile"
import { useLanguage } from "@/hooks/use-language"

const steps = [
  {
    id: 1,
    title: "Información Personal",
    description: "Cuéntanos un poco sobre ti",
    icon: User,
  },
  {
    id: 2,
    title: "Perfil Profesional",
    description: "Tu experiencia y especialización",
    icon: Briefcase,
  },
  {
    id: 3,
    title: "Confirmación",
    description: "¡Casi listo para unirte!",
    icon: CheckCircle,
  },
]

const developerTypes: { value: DeveloperType; label: string; description: string }[] = [
  { value: "frontend", label: "Frontend", description: "React, Vue, Angular" },
  { value: "backend", label: "Backend", description: "Node.js, Python, Java" },
  { value: "fullstack", label: "Full Stack", description: "Frontend + Backend" },
  { value: "mobile", label: "Mobile", description: "iOS, Android, React Native" },
  { value: "devops", label: "DevOps", description: "AWS, Docker, Kubernetes" },
  { value: "ai", label: "AI/ML", description: "Machine Learning, Data Science" },
]

const experienceLevels: { value: ExperienceLevel; label: string }[] = [
  { value: "junior", label: "Junior (0-2 años)" },
  { value: "mid", label: "Mid-level (2-5 años)" },
  { value: "senior", label: "Senior (5+ años)" },
  { value: "lead", label: "Tech Lead/Architect" },
]

const companySizes: { value: CompanySize; label: string }[] = [
  { value: "startup", label: "Startup (1-10 empleados)" },
  { value: "small", label: "Pequeña (11-50 empleados)" },
  { value: "medium", label: "Mediana (51-200 empleados)" },
  { value: "enterprise", label: "Grande (200+ empleados)" },
]

export function AdvancedWaitlistForm() {
  const { profile, updateProfile } = useUserProfile()
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: undefined as DeveloperType | undefined,
    experience: undefined as ExperienceLevel | undefined,
    companySize: undefined as CompanySize | undefined,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState("")

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError("")

    try {
      // Actualizar perfil del usuario
      updateProfile({
        type: formData.type,
        experience: formData.experience,
        companySize: formData.companySize,
      })

      // Enviar a la lista de espera con mejor manejo de errores
      const result = await joinWaitlist(formData.email, formData.name)

      if (result.success) {
        setIsComplete(true)
      } else {
        setError(result.message || "Error al procesar el registro")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setError("Error de conexión. Por favor intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() && formData.email.trim() && formData.email.includes("@")
      case 2:
        return formData.type && formData.experience && formData.companySize
      case 3:
        return true
      default:
        return false
    }
  }

  if (isComplete) {
    return (
      <motion.div
        className="text-center px-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mb-4 sm:mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </motion.div>

        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">¡Bienvenido a KUBO AI!</h3>
        <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 max-w-2xl mx-auto">
          Gracias por unirte. Te hemos enviado un email de confirmación con todos los detalles.
        </p>

        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-xl p-4 sm:p-6">
          <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Beneficios personalizados para ti:</h4>
          <ul className="text-green-300 text-xs sm:text-sm space-y-1 text-left">
            {formData.type === "ai" && <li>🤖 Acceso prioritario a funciones de IA avanzada</li>}
            {formData.experience === "senior" && <li>👨‍💼 Sesión exclusiva con arquitectos senior</li>}
            {formData.companySize === "startup" && <li>🚀 Créditos extra para startups</li>}
            <li>⚡ Acceso 48 horas antes del lanzamiento público</li>
            <li>🎁 Beneficios de por vida como early adopter</li>
          </ul>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Progress Bar - Mejorado para móvil */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          {steps.map((step, index) => {
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id
            const IconComponent = step.icon

            return (
              <div key={step.id} className="flex items-center">
                <motion.div
                  className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? "bg-blue-500 border-blue-500 text-white"
                      : isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-600 text-gray-400"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>

                {index < steps.length - 1 && (
                  <div
                    className={`w-12 sm:w-16 h-0.5 mx-2 sm:mx-4 transition-all duration-300 ${
                      isCompleted ? "bg-green-500" : "bg-gray-600"
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <h3 className="text-lg sm:text-xl font-semibold text-white">{steps[currentStep - 1].title}</h3>
          <p className="text-gray-400 text-sm sm:text-base">{steps[currentStep - 1].description}</p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span className="text-red-300 text-sm">{error}</span>
        </motion.div>
      )}

      {/* Form Content */}
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-4 sm:p-6 md:p-8">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 sm:space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t("form.name")} *</label>
                  <Input
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t("form.email")} *</label>
                  <Input
                    type="email"
                    placeholder="tu@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 text-base"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 sm:space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3 sm:mb-4">
                    {t("form.specialization")} *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {developerTypes.map((type) => (
                      <motion.button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, type: type.value })}
                        className={`p-3 sm:p-4 rounded-lg border text-left transition-all duration-300 ${
                          formData.type === type.value
                            ? "bg-blue-500/20 border-blue-500/50 text-blue-300"
                            : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="font-semibold text-sm sm:text-base">{type.label}</div>
                        <div className="text-xs sm:text-sm opacity-75">{type.description}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3 sm:mb-4">
                    {t("form.experience")} *
                  </label>
                  <div className="space-y-2">
                    {experienceLevels.map((level) => (
                      <motion.button
                        key={level.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, experience: level.value })}
                        className={`w-full p-3 rounded-lg border text-left transition-all duration-300 ${
                          formData.experience === level.value
                            ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
                            : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20"
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <span className="text-sm sm:text-base">{level.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3 sm:mb-4">
                    {t("form.company_size")} *
                  </label>
                  <div className="space-y-2">
                    {companySizes.map((size) => (
                      <motion.button
                        key={size.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, companySize: size.value })}
                        className={`w-full p-3 rounded-lg border text-left transition-all duration-300 ${
                          formData.companySize === size.value
                            ? "bg-green-500/20 border-green-500/50 text-green-300"
                            : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20"
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <span className="text-sm sm:text-base">{size.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-4 sm:space-y-6"
              >
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mb-3 sm:mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </motion.div>

                <h3 className="text-xl sm:text-2xl font-bold text-white">¡Perfecto, {formData.name}!</h3>

                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4 sm:p-6">
                  <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Resumen de tu perfil:</h4>
                  <div className="space-y-2 text-left text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Nombre:</span>
                      <span className="text-white">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-white break-all">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Especialización:</span>
                      <span className="text-blue-300">
                        {developerTypes.find((t) => t.value === formData.type)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Experiencia:</span>
                      <span className="text-purple-300">
                        {experienceLevels.find((l) => l.value === formData.experience)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Empresa:</span>
                      <span className="text-green-300">
                        {companySizes.find((s) => s.value === formData.companySize)?.label}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm sm:text-base">
                  Basado en tu perfil, recibirás contenido personalizado y beneficios exclusivos diseñados
                  específicamente para desarrolladores como tú.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation - Mejorado para móvil */}
          <div className="flex justify-between mt-6 sm:mt-8 gap-3">
            <Button
              onClick={prevStep}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 bg-transparent min-h-[48px] px-4 sm:px-6"
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">{t("form.previous")}</span>
              <span className="sm:hidden">Atrás</span>
            </Button>

            {currentStep < steps.length ? (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 min-h-[48px] px-4 sm:px-6"
              >
                <span className="hidden sm:inline">{t("form.next")}</span>
                <span className="sm:hidden">Siguiente</span>
                <ChevronRight className="w-4 h-4 ml-1 sm:ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !canProceed()}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 min-h-[48px] px-4 sm:px-6"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    <span className="hidden sm:inline">{t("form.processing")}</span>
                    <span className="sm:hidden">...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">{t("form.join")}</span>
                    <span className="sm:hidden">¡Unirme!</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
