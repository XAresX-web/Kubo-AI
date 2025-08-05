"use client"

import { useState, useEffect } from "react"

export type DeveloperType = "frontend" | "backend" | "fullstack" | "mobile" | "devops" | "ai"
export type ExperienceLevel = "junior" | "mid" | "senior" | "lead"
export type CompanySize = "startup" | "small" | "medium" | "enterprise"

export interface UserProfile {
  id: string
  type?: DeveloperType
  experience?: ExperienceLevel
  companySize?: CompanySize
  interests: string[]
  visitCount: number
  referralCode?: string
  referredBy?: string
  createdAt: Date
  lastVisit: Date
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadOrCreateProfile()
  }, [])

  const loadOrCreateProfile = () => {
    try {
      const stored = localStorage.getItem("kubo-user-profile")
      if (stored) {
        const parsed = JSON.parse(stored)
        parsed.lastVisit = new Date()
        parsed.visitCount = (parsed.visitCount || 0) + 1
        setProfile(parsed)
        localStorage.setItem("kubo-user-profile", JSON.stringify(parsed))
      } else {
        const newProfile: UserProfile = {
          id: generateUserId(),
          interests: [],
          visitCount: 1,
          referralCode: generateReferralCode(),
          createdAt: new Date(),
          lastVisit: new Date(),
        }
        setProfile(newProfile)
        localStorage.setItem("kubo-user-profile", JSON.stringify(newProfile))
      }
    } catch (error) {
      console.error("Error loading user profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!profile) return

    const updated = { ...profile, ...updates, lastVisit: new Date() }
    setProfile(updated)
    localStorage.setItem("kubo-user-profile", JSON.stringify(updated))
  }

  const generateUserId = () => {
    return "user_" + Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  const generateReferralCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  return { profile, updateProfile, isLoading }
}
