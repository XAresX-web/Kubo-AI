"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface TypewriterTextProps {
  text: string
  delay?: number
  speed?: number
}

export function TypewriterText({ text, delay = 0, speed = 100 }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex < text.length) {
          setDisplayText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        }
      },
      delay + currentIndex * speed,
    )

    return () => clearTimeout(timer)
  }, [currentIndex, text, delay, speed])

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        className="inline-block w-1 h-16 bg-blue-400 ml-2"
      />
    </span>
  )
}
