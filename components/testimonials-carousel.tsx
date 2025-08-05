"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior Developer",
    company: "Google",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    content: {
      es: "KUBO AI ha revolucionado completamente mi flujo de trabajo. Lo que antes me tomaba días, ahora lo hago en minutos. Es como tener un equipo completo de desarrolladores senior trabajando conmigo.",
      en: "KUBO AI has completely revolutionized my workflow. What used to take me days, I now do in minutes. It's like having a complete team of senior developers working with me.",
    },
    rating: 5,
    tech: ["React", "Node.js", "TypeScript"],
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Tech Lead",
    company: "Microsoft",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: {
      es: "La calidad del código que genera KUBO AI es impresionante. Sigue las mejores prácticas, es escalable y está listo para producción. Definitivamente el futuro del desarrollo.",
      en: "The quality of code that KUBO AI generates is impressive. It follows best practices, is scalable and production-ready. Definitely the future of development.",
    },
    rating: 5,
    tech: ["Python", "Azure", "Docker"],
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Full Stack Developer",
    company: "Netflix",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: {
      es: "Como desarrolladora full-stack, KUBO AI me permite enfocarme en la lógica de negocio mientras se encarga de toda la infraestructura. Es increíblemente inteligente.",
      en: "As a full-stack developer, KUBO AI allows me to focus on business logic while it handles all the infrastructure. It's incredibly intelligent.",
    },
    rating: 5,
    tech: ["Vue.js", "MongoDB", "AWS"],
  },
  {
    id: 4,
    name: "David Kim",
    role: "Startup Founder",
    company: "TechStart",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: {
      es: "Gracias a KUBO AI, pude lanzar mi MVP en una semana en lugar de meses. La velocidad de desarrollo es absolutamente increíble. Game changer total.",
      en: "Thanks to KUBO AI, I was able to launch my MVP in a week instead of months. The development speed is absolutely incredible. Total game changer.",
    },
    rating: 5,
    tech: ["Next.js", "PostgreSQL", "Vercel"],
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "DevOps Engineer",
    company: "Amazon",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    content: {
      es: "No solo genera código, sino que también configura toda la infraestructura de deployment. KUBO AI entiende DevOps mejor que muchos desarrolladores senior.",
      en: "It doesn't just generate code, but also configures the entire deployment infrastructure. KUBO AI understands DevOps better than many senior developers.",
    },
    rating: 5,
    tech: ["Kubernetes", "Terraform", "Jenkins"],
  },
]

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const { t, language } = useLanguage()

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-16 md:py-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            {t("testimonials.title")}
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">{t("testimonials.subtitle")}</p>
        </motion.div>

        <div className="relative">
          {/* Main Testimonial */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-12 border border-white/20 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Quote Icon */}
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full mb-4 md:mb-6"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Quote className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </motion.div>

                {/* Rating */}
                <div className="flex justify-center gap-1 mb-4 md:mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="w-5 h-5 md:w-6 md:h-6 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-lg md:text-xl lg:text-2xl text-white font-medium leading-relaxed mb-6 md:mb-8 max-w-4xl mx-auto">
                  "{currentTestimonial.content[language]}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <motion.img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white/20 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onError={(e) => {
                      // Fallback image if the original fails to load
                      e.currentTarget.src =
                        "/placeholder.svg?height=150&width=150&text=" + currentTestimonial.name.charAt(0)
                    }}
                  />
                  <div className="text-left">
                    <div className="text-white font-semibold text-base md:text-lg">{currentTestimonial.name}</div>
                    <div className="text-gray-400 text-sm md:text-base">{currentTestimonial.role}</div>
                    <div className="text-blue-400 font-medium text-sm md:text-base">{currentTestimonial.company}</div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex justify-center gap-2 flex-wrap">
                  {currentTestimonial.tech.map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="px-2 md:px-3 py-1 bg-white/10 text-gray-300 rounded-full text-xs md:text-sm border border-white/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6 md:mt-8">
            <Button
              onClick={goToPrevious}
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    setIsAutoPlaying(false)
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-yellow-400 w-6 md:w-8" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={goToNext}
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Auto-play indicator */}
          {isAutoPlaying && (
            <motion.div
              className="absolute bottom-4 right-4 flex items-center gap-2 text-gray-400 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="w-2 h-2 bg-yellow-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              />
              {t("testimonials.autoplay")}
            </motion.div>
          )}
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex justify-center gap-2 md:gap-4 mt-8 md:mt-12 overflow-x-auto pb-4">
          {testimonials.map((testimonial, index) => (
            <motion.button
              key={testimonial.id}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
              }}
              className={`flex-shrink-0 p-2 md:p-3 rounded-xl border transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white/10 border-yellow-400/50"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-2 md:gap-3">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=40&width=40&text=" + testimonial.name.charAt(0)
                  }}
                />
                <div className="text-left hidden sm:block">
                  <div className="text-white text-xs md:text-sm font-medium">{testimonial.name}</div>
                  <div className="text-gray-400 text-xs">{testimonial.company}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
