"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles, Zap, Code } from "lucide-react";
import { AICubeBackground } from "./ai-cube-background";
import { motion } from "framer-motion";
import { TypewriterText } from "./typewriter-text";
import { CounterAnimation } from "./counter-animation";
import { MobileParticles } from "./mobile-particles";
import { useMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/hooks/use-language";

export function HeroSection() {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  const isMobile = useMobile();
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D AI Cube Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{
            position: [0, 0, isMobile ? 15 : 20],
            fov: isMobile ? 60 : 50,
          }}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: isMobile ? "default" : "high-performance",
          }}
          performance={{ min: isMobile ? 0.5 : 0.75 }}
        >
          <Suspense fallback={null}>
            {!isMobile && <Environment preset="night" />}
            <AICubeBackground />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={isMobile ? 0.1 : 0.2}
              maxPolarAngle={Math.PI / 1.6}
              minPolarAngle={Math.PI / 2.4}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Professional AI Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/90 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Neural network overlay with enhanced effects */}
      <motion.div
        className="absolute inset-0 z-12"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(0, 170, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(170, 0, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.3) 0%, transparent 70%)
          `,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 0.5 }}
      />

      {/* AI Thinking Particles 2D - Enhanced for mobile */}
      {isMobile ? (
        <MobileParticles />
      ) : (
        <div className="absolute inset-0 z-15">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={`main-${i}`}
              className={`absolute rounded-full ${
                i % 4 === 0
                  ? "bg-blue-400"
                  : i % 4 === 1
                    ? "bg-purple-400"
                    : i % 4 === 2
                      ? "bg-cyan-400"
                      : "bg-white"
              }`}
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-5, 5, -5],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Neural connection lines */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`connection-${i}`}
              className="absolute bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
              style={{
                width: Math.random() * 150 + 50,
                height: 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scaleX: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
              }}
            />
          ))}

          {/* AI thinking pulses */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`pulse-${i}`}
              className="absolute w-8 h-8 border border-blue-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0.5, 2, 0.5],
                opacity: [0.1, 0.5, 0.1],
                rotate: [0, 360, 720],
              }}
              transition={{
                duration: 6 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      )}

      {/* Content - Enhanced with better spacing */}
      <motion.div
        className="relative z-20 text-center px-4 sm:px-6 max-w-7xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mb-4 sm:mb-6 inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm"
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)",
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
          </motion.div>
          <span className="text-xs sm:text-sm font-medium text-blue-300">
            {t("hero.coming_soon")}
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight"
          variants={itemVariants}
        >
          <TypewriterText text="KUBO AI" />
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-3 sm:mb-4 max-w-4xl mx-auto leading-relaxed px-2"
          variants={itemVariants}
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 max-w-3xl mx-auto px-2"
          variants={itemVariants}
        >
          {t("hero.description")}
          <motion.span
            className="text-blue-400 font-semibold"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {" "}
            {t("hero.description_highlight")}
          </motion.span>
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4"
          variants={itemVariants}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={scrollToWaitlist}
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 min-h-[48px]"
            >
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              </motion.div>
              {t("hero.cta_primary")}
            </Button>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 text-gray-400 text-sm sm:text-base"
            variants={floatingVariants}
            animate="animate"
          >
            <Code className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{t("hero.cta_secondary")}</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto text-center px-4"
          variants={itemVariants}
        >
          {[
            {
              value: 10,
              suffix: "x",
              label: t("hero.stat_1"),
              color: "text-blue-400",
            },
            {
              value: 100,
              suffix: "%",
              label: t("hero.stat_2"),
              color: "text-purple-400",
            },
            {
              value: 999,
              suffix: "+",
              label: t("hero.stat_3"),
              color: "text-green-400",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(59, 130, 246, 0.3)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-2`}
              >
                <CounterAnimation end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-gray-300 text-sm sm:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
