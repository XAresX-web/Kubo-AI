"use server"

import { sendWelcomeEmail } from "@/lib/email"
import {
  addToWaitlist,
  getUserByEmail,
  confirmUser,
  getWaitlistStats as getDatabaseWaitlistStats,
} from "@/lib/database"
import { validateEmail, extractNameFromEmail, sanitizeInput } from "@/lib/validation"

export async function joinWaitlist(email: string, name?: string) {
  try {
    console.log(`Processing waitlist registration for: ${email}`)

    // Sanitizar y validar entrada
    const cleanEmail = sanitizeInput(email).toLowerCase()
    const cleanName = name ? sanitizeInput(name) : undefined

    // Validar email
    const validation = validateEmail(cleanEmail)
    if (!validation.isValid) {
      console.log(`Email validation failed: ${validation.error}`)
      return {
        success: false,
        message: validation.error,
      }
    }

    // Verificar si ya está registrado
    const existingUser = await getUserByEmail(cleanEmail)
    if (existingUser) {
      console.log(`User already exists: ${cleanEmail}`)
      return {
        success: false,
        message: "Este email ya está registrado en la lista de espera",
      }
    }

    // Extraer nombre del email si no se proporcionó
    const finalName = cleanName || extractNameFromEmail(cleanEmail)
    console.log(`Final name: ${finalName}`)

    // Agregar a la base de datos
    const user = await addToWaitlist(cleanEmail, finalName, "landing-page")
    console.log(`User added to database: ${user.id}`)

    // Enviar email de bienvenida con mejor manejo de errores
    try {
      console.log(`Attempting to send welcome email to: ${cleanEmail}`)
      const emailResult = await sendWelcomeEmail({
        email: cleanEmail,
        name: finalName,
      })

      if (!emailResult.success) {
        console.error("Error sending welcome email:", emailResult.error)

        // Si es un error de verificación de dominio, continuar pero informar
        if (emailResult.needsDomainVerification) {
          console.log("Domain verification needed for production email sending")
        } else {
          // Para otros errores de email, aún así continuar con el registro
          console.log("Email failed but continuing with registration")
        }
      } else {
        console.log("Welcome email sent successfully")
      }
    } catch (emailError) {
      console.error("Email service error:", emailError)
      // No fallar la operación completa si el email falla
    }

    // Marcar como confirmado
    await confirmUser(cleanEmail)
    console.log(`User confirmed: ${cleanEmail}`)

    return {
      success: true,
      message:
        process.env.NODE_ENV === "development"
          ? "¡Perfecto! Te hemos agregado a la lista de espera. El email de confirmación fue enviado a la dirección verificada para testing."
          : "¡Perfecto! Te hemos agregado a la lista de espera. Recibirás un email de confirmación pronto.",
      user,
    }
  } catch (error) {
    console.error("Error al procesar registro:", error)
    return {
      success: false,
      message: "Hubo un error interno. Por favor intenta de nuevo en unos momentos.",
    }
  }
}

// Función para enviar notificaciones cuando el producto esté listo
export async function notifyAllUsers() {
  try {
    const { getAllUsers } = await import("@/lib/database")
    const { sendNotificationEmail } = await import("@/lib/email")
    const { markAsNotified } = await import("@/lib/database")

    const users = await getAllUsers()
    const confirmedUsers = users.filter((user) => user.confirmed && !user.notified)

    let successCount = 0
    let errorCount = 0

    for (const user of confirmedUsers) {
      try {
        const result = await sendNotificationEmail({
          email: user.email,
          name: user.name,
        })

        if (result.success) {
          await markAsNotified(user.email)
          successCount++
        } else {
          errorCount++

          // Log domain verification issues
          if (result.needsDomainVerification) {
            console.log(`Domain verification needed for user: ${user.email}`)
          }
        }

        // Pequeña pausa para no sobrecargar el servicio de email
        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`Error notifying user ${user.email}:`, error)
        errorCount++
      }
    }

    return {
      success: true,
      message: `Notificaciones enviadas: ${successCount} exitosas, ${errorCount} fallidas`,
      stats: { successCount, errorCount, total: confirmedUsers.length },
    }
  } catch (error) {
    console.error("Error in notifyAllUsers:", error)
    return {
      success: false,
      message: "Error al enviar notificaciones",
    }
  }
}

// Función para obtener estadísticas (útil para un dashboard admin)
export async function getWaitlistStats() {
  try {
    const stats = await getDatabaseWaitlistStats()
    return {
      success: true,
      stats,
    }
  } catch (error) {
    console.error("Error getting stats:", error)
    return {
      success: false,
      message: "Error al obtener estadísticas",
    }
  }
}
