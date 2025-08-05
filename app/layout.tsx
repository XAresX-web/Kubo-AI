import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KUBO AI - La Revolución del Desarrollo de Software",
  description:
    "Únete a la lista de espera de KUBO AI, la IA más avanzada para desarrollo de software. Crea aplicaciones completas 10x más rápido que cualquier herramienta actual.",
  keywords: "AI, desarrollo software, programación, código automático, KUBO AI, herramientas desarrollo",
  authors: [{ name: "KUBO AI Team" }],
  openGraph: {
    title: "KUBO AI - La Revolución del Desarrollo de Software",
    description: "Únete a la lista de espera de KUBO AI, la IA más avanzada para desarrollo de software.",
    url: "https://kubo-ai.com",
    siteName: "KUBO AI",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KUBO AI - La Revolución del Desarrollo de Software",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KUBO AI - La Revolución del Desarrollo de Software",
    description: "Únete a la lista de espera de KUBO AI, la IA más avanzada para desarrollo de software.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
