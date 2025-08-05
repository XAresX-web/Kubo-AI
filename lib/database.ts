// Simple in-memory database simulation
// En producción, usar una base de datos real como PostgreSQL, MongoDB, etc.

export interface WaitlistUser {
  id: string
  email: string
  name?: string
  joinedAt: Date
  confirmed: boolean
  notified: boolean
  source?: string
}

// Simulación de base de datos en memoria
const waitlistUsers = new Map<string, WaitlistUser>()

export async function addToWaitlist(email: string, name?: string, source?: string): Promise<WaitlistUser> {
  const id = generateId()
  const user: WaitlistUser = {
    id,
    email: email.toLowerCase(),
    name,
    joinedAt: new Date(),
    confirmed: false,
    notified: false,
    source,
  }

  waitlistUsers.set(email.toLowerCase(), user)
  return user
}

export async function getUserByEmail(email: string): Promise<WaitlistUser | null> {
  return waitlistUsers.get(email.toLowerCase()) || null
}

export async function confirmUser(email: string): Promise<boolean> {
  const user = waitlistUsers.get(email.toLowerCase())
  if (user) {
    user.confirmed = true
    return true
  }
  return false
}

export async function markAsNotified(email: string): Promise<boolean> {
  const user = waitlistUsers.get(email.toLowerCase())
  if (user) {
    user.notified = true
    return true
  }
  return false
}

export async function getWaitlistStats() {
  const users = Array.from(waitlistUsers.values())
  return {
    total: users.length,
    confirmed: users.filter((u) => u.confirmed).length,
    notified: users.filter((u) => u.notified).length,
    recent: users.filter((u) => {
      const dayAgo = new Date()
      dayAgo.setDate(dayAgo.getDate() - 1)
      return u.joinedAt > dayAgo
    }).length,
  }
}

export async function getAllUsers(): Promise<WaitlistUser[]> {
  return Array.from(waitlistUsers.values())
}

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Función para exportar datos (útil para migrar a una DB real)
export async function exportWaitlistData(): Promise<WaitlistUser[]> {
  return Array.from(waitlistUsers.values())
}
