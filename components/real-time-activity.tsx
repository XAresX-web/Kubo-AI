"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRealTimeStats } from "@/hooks/use-real-time-stats"
import { useLanguage } from "@/hooks/use-language"
import {
  TrendingUp,
  Globe,
  Zap,
  ChevronUp,
  ChevronDown,
  Activity,
  Cpu,
  Sparkles,
  Brain,
  Eye,
  EyeOff,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function RealTimeActivity() {
  const stats = useRealTimeStats()
  const { t } = useLanguage()
  const [isMinimized, setIsMinimized] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "signup":
        return "🚀"
      case "referral":
        return "🎯"
      case "demo":
        return "⚡"
      case "ai_query":
        return "🧠"
      case "code_gen":
        return "💻"
      default:
        return "✨"
    }
  }

  const getActivityText = (activity: any) => {
    switch (activity.type) {
      case "signup":
        return t("activity.joined")
      case "referral":
        return t("activity.referred")
      case "demo":
        return t("activity.demo")
      case "ai_query":
        return "consultó a la IA"
      case "code_gen":
        return "generó código"
      default:
        return t("activity.exploring")
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "signup":
        return "from-green-500/20 to-emerald-500/20 border-green-500/30"
      case "referral":
        return "from-blue-500/20 to-cyan-500/20 border-blue-500/30"
      case "demo":
        return "from-purple-500/20 to-violet-500/20 border-purple-500/30"
      case "ai_query":
        return "from-orange-500/20 to-amber-500/20 border-orange-500/30"
      case "code_gen":
        return "from-pink-500/20 to-rose-500/20 border-pink-500/30"
      default:
        return "from-gray-500/20 to-slate-500/20 border-gray-500/30"
    }
  }

  if (!isVisible) {
    return (
      <motion.div
        className="fixed bottom-4 left-4 z-40"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          onClick={() => setIsVisible(true)}
          variant="ghost"
          size="sm"
          className="bg-black/80 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-white/10 p-3"
        >
          <Eye className="w-4 h-4" />
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm">
      <motion.div
        className="bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        initial={{ opacity: 0, x: -100, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 2, type: "spring", stiffness: 100 }}
        layout
      >
        {/* Header con efectos mejorados */}
        <div className="relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 animate-pulse" />

          <div className="relative flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <motion.div
                className="relative"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <motion.div
                  className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full"
                  animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>

              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Brain className="w-4 h-4 text-blue-400" />
                </motion.div>
                <span className="text-white font-semibold text-sm bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {t("activity.live")} AI
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.div
                className="flex items-center gap-1 text-green-400 text-xs bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20"
                whileHover={{ scale: 1.05 }}
              >
                <Activity className="w-3 h-3" />
                {stats.onlineUsers}
              </motion.div>

              <div className="flex gap-1">
                <Button
                  onClick={() => setIsVisible(false)}
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
                >
                  <EyeOff className="w-3 h-3" />
                </Button>

                <Button
                  onClick={() => setIsMinimized(!isMinimized)}
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
                >
                  {isMinimized ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-2 gap-3 px-4 mb-4">
                <motion.div
                  className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-3 border border-blue-500/20 relative overflow-hidden"
                  whileHover={{ scale: 1.02, borderColor: "rgba(59, 130, 246, 0.4)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <TrendingUp className="w-3 h-3 text-blue-400" />
                      </motion.div>
                      <span className="text-blue-300 text-xs font-medium">{t("activity.total")}</span>
                    </div>
                    <div className="text-white font-bold text-lg">{stats.totalUsers.toLocaleString()}</div>
                    <div className="text-blue-300/70 text-xs">Desarrolladores</div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-lg p-3 border border-purple-500/20 relative overflow-hidden"
                  whileHover={{ scale: 1.02, borderColor: "rgba(147, 51, 234, 0.4)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Zap className="w-3 h-3 text-purple-400" />
                      </motion.div>
                      <span className="text-purple-300 text-xs font-medium">{t("activity.today")}</span>
                    </div>
                    <div className="text-white font-bold text-lg">+{stats.recentSignups}</div>
                    <div className="text-purple-300/70 text-xs">Últimas 24h</div>
                  </div>
                </motion.div>
              </div>

              {/* Enhanced Activity Feed */}
              <div className="space-y-2 px-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Cpu className="w-3 h-3 text-orange-400" />
                  </motion.div>
                  <span className="text-orange-300 text-xs font-medium">Actividad en Tiempo Real</span>
                </div>

                <AnimatePresence mode="popLayout">
                  {stats.recentActivity.slice(0, 4).map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      className={`flex items-center gap-3 p-3 bg-gradient-to-r ${getActivityColor(activity.type)} rounded-lg border backdrop-blur-sm relative overflow-hidden`}
                      initial={{ opacity: 0, y: 20, scale: 0.9, x: -50 }}
                      animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9, x: 50 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      layout
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      {/* Animated background effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"
                        animate={{ x: [-100, 100] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />

                      <div className="relative flex items-center gap-3 w-full">
                        <motion.div
                          className="text-lg flex-shrink-0"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                        >
                          {getActivityIcon(activity.type)}
                        </motion.div>

                        <div className="flex-1 min-w-0">
                          <div className="text-white text-xs font-medium truncate flex items-center gap-2">
                            {activity.user}
                            <motion.div
                              className="w-1 h-1 bg-green-400 rounded-full"
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                            />
                          </div>
                          <div className="text-gray-300 text-xs truncate">{getActivityText(activity)}</div>
                        </div>

                        {activity.location && (
                          <div className="flex items-center gap-1 text-gray-400 text-xs bg-black/20 px-2 py-1 rounded-full">
                            <Globe className="w-2 h-2" />
                            <span className="truncate max-w-16">{activity.location}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Enhanced Companies Section */}
              <div className="px-4 pb-4 pt-3 border-t border-white/10 relative">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

                <div className="flex items-center gap-2 mb-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                  </motion.div>
                  <div className="text-gray-400 text-xs font-medium">{t("activity.companies")}</div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {stats.topCompanies.slice(0, 3).map((company, index) => (
                    <motion.span
                      key={company}
                      className="text-xs bg-gradient-to-r from-white/10 to-white/5 text-gray-300 px-2 py-1 rounded-full border border-white/10 backdrop-blur-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        borderColor: "rgba(59, 130, 246, 0.3)",
                      }}
                    >
                      {company}
                    </motion.span>
                  ))}
                  <motion.span
                    className="text-xs text-gray-500 px-2 py-1 bg-gray-500/10 rounded-full border border-gray-500/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    +{stats.topCompanies.length - 3} {t("activity.more")}
                  </motion.span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Thinking Indicator */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>
    </div>
  )
}
