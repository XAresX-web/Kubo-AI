"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getWaitlistStats, notifyAllUsers } from "@/app/actions"
import { motion } from "framer-motion"
import { Users, Mail, CheckCircle, Clock, Send } from "lucide-react"

interface Stats {
  total: number
  confirmed: number
  notified: number
  recent: number
}

export function AdminPanel() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [isNotifying, setIsNotifying] = useState(false)
  const [notificationResult, setNotificationResult] = useState<string | null>(null)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    const result = await getWaitlistStats()
    if (result.success) {
      setStats(result.stats)
    }
  }

  const handleNotifyAll = async () => {
    if (!confirm("¿Estás seguro de que quieres notificar a todos los usuarios que KUBO AI está disponible?")) {
      return
    }

    setIsNotifying(true)
    setNotificationResult(null)

    try {
      const result = await notifyAllUsers()
      setNotificationResult(result.message)
      if (result.success) {
        await loadStats() // Recargar estadísticas
      }
    } catch (error) {
      setNotificationResult("Error al enviar notificaciones")
    } finally {
      setIsNotifying(false)
    }
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-white mb-8">Panel de Administración - KUBO AI</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-300">Total Usuarios</CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <p className="text-xs text-blue-300">En lista de espera</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-300">Confirmados</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.confirmed}</div>
              <p className="text-xs text-green-300">
                {stats.total > 0 ? Math.round((stats.confirmed / stats.total) * 100) : 0}% del total
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-300">Notificados</CardTitle>
              <Mail className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.notified}</div>
              <p className="text-xs text-purple-300">Ya recibieron el lanzamiento</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-300">Últimas 24h</CardTitle>
              <Clock className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.recent}</div>
              <p className="text-xs text-orange-300">Nuevos registros</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Send className="h-5 w-5" />
              Notificar Lanzamiento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              Envía un email a todos los usuarios confirmados notificándoles que KUBO AI ya está disponible.
            </p>

            <div className="flex items-center gap-4">
              <Button
                onClick={handleNotifyAll}
                disabled={isNotifying || stats.confirmed === 0}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                {isNotifying ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Notificar a {stats.confirmed - stats.notified} usuarios
                  </>
                )}
              </Button>

              <Button
                onClick={loadStats}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                Actualizar Stats
              </Button>
            </div>

            {notificationResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-300"
              >
                {notificationResult}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
