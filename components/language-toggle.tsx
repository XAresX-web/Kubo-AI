"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <motion.div
      className="fixed top-4 right-4 z-40"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className="flex bg-black/20 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
        <Button
          onClick={() => setLanguage("es")}
          variant="ghost"
          size="sm"
          className={`px-3 py-2 text-xs font-medium transition-all ${
            language === "es" ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
          }`}
        >
          ES
        </Button>
        <Button
          onClick={() => setLanguage("en")}
          variant="ghost"
          size="sm"
          className={`px-3 py-2 text-xs font-medium transition-all ${
            language === "en" ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
          }`}
        >
          EN
        </Button>
      </div>
    </motion.div>
  )
}
