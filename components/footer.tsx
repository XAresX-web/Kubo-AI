"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/hooks/use-language"

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const { t } = useLanguage()

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <footer className="py-8 md:py-12 px-4 border-t border-white/10" ref={ref}>
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-6 md:mb-8" variants={itemVariants}>
          <motion.h3
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 md:mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            KUBO AI
          </motion.h3>
          <motion.p
            className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed px-4"
            variants={itemVariants}
          >
            {t("footer.description")}
          </motion.p>
        </motion.div>

        <motion.div className="text-center text-gray-500 text-xs md:text-sm" variants={itemVariants}>
          <motion.p whileHover={{ color: "#9CA3AF" }} transition={{ duration: 0.3 }}>
            &copy; 2025 KUBO AI. {t("footer.copyright")}
          </motion.p>
          <motion.p
            className="mt-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {t("footer.tagline")}
          </motion.p>
        </motion.div>

        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-15, 15, -15],
                opacity: [0.2, 0.6, 0.2],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </footer>
  )
}
