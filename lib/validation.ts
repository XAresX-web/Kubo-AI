export function validateEmail(email: string): { isValid: boolean; error?: string } {
  if (!email) {
    return { isValid: false, error: "El email es requerido" }
  }

  if (email.length > 254) {
    return { isValid: false, error: "El email es demasiado largo" }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Por favor ingresa un email válido" }
  }

  // Lista de dominios temporales/desechables comunes
  const disposableEmailDomains = [
    "10minutemail.com",
    "tempmail.org",
    "guerrillamail.com",
    "mailinator.com",
    "yopmail.com",
  ]

  const domain = email.split("@")[1]?.toLowerCase()
  if (disposableEmailDomains.includes(domain)) {
    return { isValid: false, error: "Por favor usa un email permanente" }
  }

  return { isValid: true }
}

export function extractNameFromEmail(email: string): string {
  const localPart = email.split("@")[0]
  // Convertir puntos y guiones en espacios, capitalizar
  return localPart
    .replace(/[._-]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "")
}
