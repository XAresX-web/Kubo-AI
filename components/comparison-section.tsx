"use client"

import { Check, X, Zap, Star } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/hooks/use-language"

const comparisons = [
  {
    featureKey: "comparison.development_speed",
    kuboKey: "comparison.kubo_speed",
    othersKey: "comparison.others_speed",
    kuboHas: true,
    othersHave: false,
  },
  {
    featureKey: "comparison.code_quality",
    kuboKey: "comparison.kubo_quality",
    othersKey: "comparison.others_quality",
    kuboHas: true,
    othersHave: false,
  },
  {
    featureKey: "comparison.contextual_understanding",
    kuboKey: "comparison.kubo_context",
    othersKey: "comparison.others_context",
    kuboHas: true,
    othersHave: false,
  },
  {
    featureKey: "comparison.api_integration",
    kuboKey: "comparison.kubo_apis",
    othersKey: "comparison.others_apis",
    kuboHas: true,
    othersHave: false,
  },
  {
    featureKey: "comparison.software_architecture",
    kuboKey: "comparison.kubo_architecture",
    othersKey: "comparison.others_architecture",
    kuboHas: true,
    othersHave: false,
  },
  {
    featureKey: "comparison.integrated_security",
    kuboKey: "comparison.kubo_security",
    othersKey: "comparison.others_security",
    kuboHas: true,
    othersHave: false,
  },
  {
    featureKey: "comparison.automatic_testing",
    kuboKey: "comparison.kubo_testing",
    othersKey: "comparison.others_testing",
    kuboHas: true,
    othersHave: false,
  },
  {
    featureKey: "comparison.automatic_deployment",
    kuboKey: "comparison.kubo_deployment",
    othersKey: "comparison.others_deployment",
    kuboHas: true,
    othersHave: false,
  },
  {
    featureKey: "comparison.customization",
    kuboKey: "comparison.kubo_customization",
    othersKey: "comparison.others_customization",
    kuboHas: true,
    othersHave: false,
  },
  {
    featureKey: "comparison.framework_support",
    kuboKey: "comparison.kubo_frameworks",
    othersKey: "comparison.others_frameworks",
    kuboHas: true,
    othersHave: false,
  },
]

export function ComparisonSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const headerVariants = {
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
    <section className="py-16 md:py-24 px-4 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {t("comparison.title")}
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {t("comparison.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-8 border border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Header */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div className="text-center" variants={itemVariants} whileHover={{ scale: 1.05 }}>
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xl md:text-2xl font-bold text-white">K</span>
              </motion.div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{t("comparison.kubo")}</h3>
              <p className="text-blue-400 font-semibold text-sm md:text-base">{t("comparison.next_gen")}</p>
            </motion.div>

            <motion.div className="text-center" variants={itemVariants} whileHover={{ scale: 1.05 }}>
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: -10 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-xl md:text-2xl font-bold text-gray-400">?</span>
              </motion.div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-300 mb-2">{t("comparison.current_tools")}</h3>
              <p className="text-gray-500 font-semibold text-sm md:text-base">{t("comparison.others")}</p>
            </motion.div>

            <motion.div className="text-center lg:col-span-1" variants={itemVariants}>
              <motion.div
                className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-4 md:p-6 border border-green-500/30"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(34, 197, 94, 0.2)",
                }}
              >
                <motion.div
                  className="text-2xl md:text-3xl font-bold text-green-400 mb-2 flex items-center justify-center gap-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Star className="w-6 h-6 md:w-8 md:h-8 fill-current" />
                  100%
                </motion.div>
                <p className="text-green-300 font-semibold text-sm md:text-base">{t("comparison.superiority")}</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            className="space-y-3 md:space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {comparisons.map((item, index) => (
              <motion.div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300"
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(59, 130, 246, 0.3)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="font-semibold text-white text-center lg:text-left text-sm md:text-base mb-2 lg:mb-0">
                  {t(item.featureKey)}
                </div>

                <motion.div
                  className="flex items-start justify-center lg:justify-start gap-2 mb-2 lg:mb-0"
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                    className="flex-shrink-0 mt-0.5"
                  >
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                  </motion.div>
                  <span className="text-green-300 text-sm md:text-base">{t(item.kuboKey)}</span>
                </motion.div>

                <motion.div className="flex items-start justify-center lg:justify-start gap-2" whileHover={{ x: -5 }}>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.1 }}
                    className="flex-shrink-0 mt-0.5"
                  >
                    <X className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
                  </motion.div>
                  <span className="text-red-300 text-sm md:text-base">{t(item.othersKey)}</span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-8 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-full"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)" }}
            >
              <Zap className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
              <span className="text-green-300 font-semibold text-sm md:text-base">{t("comparison.cta")}</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
