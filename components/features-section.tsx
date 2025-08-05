"use client"

import { Brain, Code2, Rocket, Shield, Zap, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/hooks/use-language"

const features = [
  {
    icon: Brain,
    titleKey: "features.iaAdvanced",
    descriptionKey: "features.iaAdvancedDescription",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Code2,
    titleKey: "features.perfectCode",
    descriptionKey: "features.perfectCodeDescription",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Rocket,
    titleKey: "features.extremeSpeed",
    descriptionKey: "features.extremeSpeedDescription",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    titleKey: "features.integratedSecurity",
    descriptionKey: "features.integratedSecurityDescription",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: Zap,
    titleKey: "features.totalIntegration",
    descriptionKey: "features.totalIntegrationDescription",
    color: "from-yellow-500 to-amber-500",
  },
  {
    icon: Sparkles,
    titleKey: "features.pureMagic",
    descriptionKey: "features.pureMagicDescription",
    color: "from-indigo-500 to-purple-500",
  },
]

export function FeaturesSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-24 px-4 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {t("features.title")}
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {t("features.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div className="mb-6" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
              </motion.div>

              <motion.h3
                className="text-2xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors"
                layoutId={`title-${index}`}
              >
                {t(feature.titleKey)}
              </motion.h3>

              <motion.p
                className="text-gray-400 leading-relaxed"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {t(feature.descriptionKey)}
              </motion.p>

              {/* Hover effect particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${20 + i * 10}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
