"use client"

import { useState, useEffect } from "react"

interface RealTimeStats {
  totalUsers: number
  recentSignups: number
  onlineUsers: number
  topCompanies: string[]
  recentActivity: Array<{
    id: string
    type: "signup" | "referral" | "demo" | "ai_query" | "code_gen"
    user: string
    timestamp: Date
    location?: string
  }>
}

export function useRealTimeStats() {
  const [stats, setStats] = useState<RealTimeStats>({
    totalUsers: 3247,
    recentSignups: 34,
    onlineUsers: 189,
    topCompanies: ["Google", "Microsoft", "Meta", "Netflix", "Spotify", "OpenAI", "Anthropic"],
    recentActivity: [],
  })

  useEffect(() => {
    // Simular actualizaciones en tiempo real más realistas
    const interval = setInterval(
      () => {
        setStats((prev) => ({
          ...prev,
          totalUsers: prev.totalUsers + Math.floor(Math.random() * 2),
          recentSignups: Math.floor(Math.random() * 60) + 15,
          onlineUsers: Math.floor(Math.random() * 150) + 120,
          recentActivity: [
            {
              id: Math.random().toString(),
              type: getRandomActivityType(),
              user: generateRandomName(),
              timestamp: new Date(),
              location: generateRandomLocation(),
            },
            ...prev.recentActivity.slice(0, 5),
          ],
        }))
      },
      2000 + Math.random() * 3000, // Intervalo más variable
    )

    return () => clearInterval(interval)
  }, [])

  const getRandomActivityType = (): "signup" | "referral" | "demo" | "ai_query" | "code_gen" => {
    const types: ("signup" | "referral" | "demo" | "ai_query" | "code_gen")[] = [
      "signup",
      "referral",
      "demo",
      "ai_query",
      "code_gen",
    ]
    const weights = [0.3, 0.15, 0.25, 0.2, 0.1] // Probabilidades diferentes

    const random = Math.random()
    let sum = 0

    for (let i = 0; i < types.length; i++) {
      sum += weights[i]
      if (random <= sum) {
        return types[i]
      }
    }

    return "signup"
  }

  const generateRandomName = () => {
    const names = [
      "Alex Chen",
      "Sarah Johnson",
      "Miguel Rodriguez",
      "Emma Wilson",
      "David Kim",
      "Lisa Zhang",
      "Carlos Silva",
      "Anna Kowalski",
      "James Park",
      "Maria Garcia",
      "Ryan O'Connor",
      "Priya Patel",
      "Ahmed Hassan",
      "Sophie Martin",
      "Lucas Brown",
      "Zoe Taylor",
      "Marco Rossi",
      "Yuki Tanaka",
      "Elena Petrov",
      "Noah Anderson",
    ]
    return names[Math.floor(Math.random() * names.length)]
  }

  const generateRandomLocation = () => {
    const locations = [
      "San Francisco",
      "New York",
      "London",
      "Berlin",
      "Tokyo",
      "Sydney",
      "Toronto",
      "Amsterdam",
      "Singapore",
      "São Paulo",
      "Mumbai",
      "Seoul",
      "Paris",
      "Barcelona",
      "Tel Aviv",
      "Stockholm",
      "Dublin",
      "Zurich",
    ]
    return locations[Math.floor(Math.random() * locations.length)]
  }

  return stats
}
