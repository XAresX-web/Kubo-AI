"use client"

import type { ReactNode } from "react"
import { LanguageContext, useLanguageState } from "@/hooks/use-language"

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const languageState = useLanguageState()

  return <LanguageContext.Provider value={languageState}>{children}</LanguageContext.Provider>
}
