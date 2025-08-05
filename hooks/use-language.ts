"use client"

import { useState, useEffect, createContext, useContext } from "react"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

const translations = {
  es: {
    // Hero Section
    "hero.coming_soon": "Próximamente • Coming Soon",
    "hero.title": "KUBO AI",
    "hero.subtitle": "La próxima generación de IA para desarrollo de software",
    "hero.description":
      "Crea aplicaciones web, landing pages y software completo con una IA que supera todo lo que conoces.",
    "hero.description_highlight":
      "Más inteligente que Cursor, más potente que Claude, más versátil que cualquier herramienta actual.",
    "hero.cta_primary": "Únete a la Lista de Espera",
    "hero.cta_secondary": "Acceso anticipado gratuito",
    "hero.stat_1": "Más rápido que herramientas actuales",
    "hero.stat_2": "Código production-ready",
    "hero.stat_3": "Posibilidades de creación",

    // Demo Section
    "demo.title": "Ve KUBO AI en Acción",
    "demo.subtitle": "Descubre cómo KUBO AI transforma una simple idea en una aplicación completa en segundos",
    "demo.start_demo": "Iniciar Demo Interactivo",
    "demo.step1_title": "Describe tu idea",
    "demo.step1_description": "Solo dile a KUBO AI qué quieres crear",
    "demo.step2_title": "IA analiza y planifica",
    "demo.step2_description": "KUBO AI comprende y diseña la arquitectura completa",
    "demo.step3_title": "Código generado",
    "demo.step3_description": "Aplicación completa lista para producción",
    "demo.input_example": "Crea una app de tareas con autenticación y base de datos",
    "demo.processing": "Procesando...",
    "demo.analyzing": "Analizando requerimientos",
    "demo.designing": "Diseñando arquitectura",
    "demo.generating": "Generando componentes",
    "demo.optimizing": "Optimizando código...",
    "demo.code_generated": "Código generado:",
    "demo.in_progress": "Demo en progreso...",

    // Features Section
    "features.title": "El Futuro del Desarrollo",
    "features.subtitle":
      "KUBO AI no es solo otra herramienta de IA. Es una revolución completa en cómo creamos software.",
    "features.iaAdvanced": "IA Avanzada",
    "features.iaAdvancedDescription":
      "Algoritmos de última generación que comprenden el contexto completo de tu proyecto, analizan patrones de código y generan soluciones inteligentes que se adaptan a tu estilo de desarrollo.",
    "features.perfectCode": "Código Perfecto",
    "features.perfectCodeDescription":
      "Genera aplicaciones completas con arquitectura limpia, patrones de diseño optimizados, testing automático y código production-ready que cumple con los más altos estándares de calidad.",
    "features.extremeSpeed": "Velocidad Extrema",
    "features.extremeSpeedDescription":
      "De idea a aplicación desplegada en minutos. Automatiza todo el proceso de desarrollo: desde la planificación hasta el deployment, siendo 10x más rápido que cualquier herramienta actual.",
    "features.integratedSecurity": "Seguridad Integrada",
    "features.integratedSecurityDescription":
      "Implementa automáticamente las mejores prácticas de seguridad: autenticación robusta, validación de datos, protección CSRF, encriptación y cumplimiento de estándares como OWASP.",
    "features.totalIntegration": "Integración Total",
    "features.totalIntegrationDescription":
      "Compatible con todos los frameworks modernos (React, Vue, Angular, Next.js), bases de datos, APIs REST/GraphQL, servicios cloud y herramientas de CI/CD. Una solución completa.",
    "features.pureMagic": "Magia Pura",
    "features.pureMagicDescription":
      "Experiencia de desarrollo que se siente como magia: comprende lenguaje natural, anticipa necesidades, sugiere mejoras y aprende de tus preferencias para ser cada vez más inteligente.",

    // Comparison
    "comparison.title": "¿Por qué KUBO AI?",
    "comparison.subtitle": "Comparación directa con las herramientas actuales del mercado",
    "comparison.kubo": "KUBO AI",
    "comparison.next_gen": "La próxima generación",
    "comparison.current_tools": "Herramientas Actuales",
    "comparison.others": "Cursor, Claude, Lovable, etc.",
    "comparison.superiority": "Superioridad comprobada",
    "comparison.cta": "Únete a la revolución del desarrollo",

    // Comparison features - Agregar traducciones para cada feature
    "comparison.development_speed": "Velocidad de desarrollo",
    "comparison.code_quality": "Calidad del código",
    "comparison.contextual_understanding": "Comprensión contextual",
    "comparison.api_integration": "Integración de APIs",
    "comparison.software_architecture": "Arquitectura de software",
    "comparison.integrated_security": "Seguridad integrada",
    "comparison.automatic_testing": "Testing automático",
    "comparison.automatic_deployment": "Deployment automático",
    "comparison.customization": "Personalización",
    "comparison.framework_support": "Soporte de frameworks",

    // Kubo features
    "comparison.kubo_speed": "10x más rápido - De idea a app en minutos",
    "comparison.kubo_quality": "Production-ready con testing automático",
    "comparison.kubo_context": "Entiende proyectos completos y arquitecturas",
    "comparison.kubo_apis": "Automática con 500+ servicios populares",
    "comparison.kubo_architecture": "Patrones avanzados y escalabilidad automática",
    "comparison.kubo_security": "OWASP, autenticación y encriptación automática",
    "comparison.kubo_testing": "Unit, integration y E2E tests incluidos",
    "comparison.kubo_deployment": "CI/CD completo con múltiples proveedores",
    "comparison.kubo_customization": "Aprende tu estilo y se adapta",
    "comparison.kubo_frameworks": "React, Vue, Angular, Next.js, Svelte y más",

    // Others features
    "comparison.others_speed": "Proceso lento - Horas o días para resultados básicos",
    "comparison.others_quality": "Código básico que requiere refactoring",
    "comparison.others_context": "Limitado a fragmentos de código aislados",
    "comparison.others_apis": "Manual y propensa a errores",
    "comparison.others_architecture": "Básico o inexistente",
    "comparison.others_security": "Implementación manual requerida",
    "comparison.others_testing": "Sin testing o muy básico",
    "comparison.others_deployment": "Configuración manual compleja",
    "comparison.others_customization": "Limitado a templates predefinidos",
    "comparison.others_frameworks": "Soporte limitado a 1-2 frameworks",

    // Testimonials
    "testimonials.title": "Lo Que Dicen los Expertos",
    "testimonials.subtitle": "Desarrolladores de las mejores empresas del mundo ya están usando KUBO AI",
    "testimonials.autoplay": "Auto-play activo",

    // Waitlist
    "waitlist.title": "Sé el Primero en Experimentar el Futuro",
    "waitlist.subtitle":
      "Únete a la lista de espera y obtén acceso anticipado gratuito a KUBO AI. Serás notificado tan pronto como esté disponible.",
    "waitlist.disclaimer":
      "Al unirte, aceptas recibir actualizaciones sobre KUBO AI. Puedes cancelar en cualquier momento.",

    // Real-time Activity
    "activity.live": "Actividad en vivo",
    "activity.total": "Total",
    "activity.today": "Hoy",
    "activity.joined": "se unió a la lista de espera",
    "activity.referred": "invitó a un amigo",
    "activity.demo": "probó el demo",
    "activity.exploring": "está explorando KUBO AI",
    "activity.companies": "Empresas que ya esperan:",
    "activity.more": "más",

    // Exit Intent
    "exit.wait": "¡Espera!",
    "exit.subtitle": "Antes de irte, únete a nuestra lista VIP y obtén",
    "exit.priority_access": "acceso prioritario",
    "exit.when_launch": "cuando lancemos.",
    "exit.limited_offer": "Oferta limitada",
    "exit.benefit_1": "Acceso 48 horas antes que otros",
    "exit.benefit_2": "Créditos gratis de lanzamiento",
    "exit.benefit_3": "Sesión exclusiva con el equipo",
    "exit.cta": "¡Quiero Acceso VIP!",
    "exit.processing": "Procesando...",
    "exit.no_spam": "Sin spam. Solo actualizaciones importantes sobre KUBO AI.",

    // Form
    "form.name": "Nombre completo",
    "form.email": "Email profesional",
    "form.specialization": "¿Cuál es tu especialización?",
    "form.experience": "Nivel de experiencia",
    "form.company_size": "Tamaño de tu empresa",
    "form.previous": "Anterior",
    "form.next": "Siguiente",
    "form.join": "¡Unirme a KUBO AI!",
    "form.processing": "Procesando...",

    // Footer
    "footer.description":
      "Revolucionando el desarrollo de software con inteligencia artificial avanzada. El futuro de la programación está aquí.",
    "footer.copyright": "Todos los derechos reservados.",
    "footer.tagline": "Construyendo el futuro del desarrollo de software.",

    // Common
    "common.loading": "Cargando...",
    "common.error": "Error",
    "common.success": "Éxito",
    "common.close": "Cerrar",
  },
  en: {
    // Hero Section
    "hero.coming_soon": "Coming Soon • Próximamente",
    "hero.title": "KUBO AI",
    "hero.subtitle": "The next generation of AI for software development",
    "hero.description":
      "Create web applications, landing pages and complete software with an AI that surpasses everything you know.",
    "hero.description_highlight":
      "Smarter than Cursor, more powerful than Claude, more versatile than any current tool.",
    "hero.cta_primary": "Join the Waitlist",
    "hero.cta_secondary": "Free early access",
    "hero.stat_1": "Faster than current tools",
    "hero.stat_2": "Production-ready code",
    "hero.stat_3": "Creation possibilities",

    // Demo Section
    "demo.title": "See KUBO AI in Action",
    "demo.subtitle": "Discover how KUBO AI transforms a simple idea into a complete application in seconds",
    "demo.start_demo": "Start Interactive Demo",
    "demo.step1_title": "Describe your idea",
    "demo.step1_description": "Just tell KUBO AI what you want to create",
    "demo.step2_title": "AI analyzes and plans",
    "demo.step2_description": "KUBO AI understands and designs the complete architecture",
    "demo.step3_title": "Code generated",
    "demo.step3_description": "Complete application ready for production",
    "demo.input_example": "Create a task app with authentication and database",
    "demo.processing": "Processing...",
    "demo.analyzing": "Analyzing requirements",
    "demo.designing": "Designing architecture",
    "demo.generating": "Generating components",
    "demo.optimizing": "Optimizing code...",
    "demo.code_generated": "Generated code:",
    "demo.in_progress": "Demo in progress...",

    // Features Section
    "features.title": "The Future of Development",
    "features.subtitle": "KUBO AI is not just another AI tool. It's a complete revolution in how we create software.",
    "features.iaAdvanced": "Advanced AI",
    "features.iaAdvancedDescription":
      "State-of-the-art algorithms that understand your project's complete context, analyze code patterns and generate intelligent solutions that adapt to your development style.",
    "features.perfectCode": "Perfect Code",
    "features.perfectCodeDescription":
      "Generates complete applications with clean architecture, optimized design patterns, automatic testing and production-ready code that meets the highest quality standards.",
    "features.extremeSpeed": "Extreme Speed",
    "features.extremeSpeedDescription":
      "From idea to deployed application in minutes. Automates the entire development process: from planning to deployment, being 10x faster than any current tool.",
    "features.integratedSecurity": "Integrated Security",
    "features.integratedSecurityDescription":
      "Automatically implements security best practices: robust authentication, data validation, CSRF protection, encryption and compliance with standards like OWASP.",
    "features.totalIntegration": "Total Integration",
    "features.totalIntegrationDescription":
      "Compatible with all modern frameworks (React, Vue, Angular, Next.js), databases, REST/GraphQL APIs, cloud services and CI/CD tools. A complete solution.",
    "features.pureMagic": "Pure Magic",
    "features.pureMagicDescription":
      "Development experience that feels like magic: understands natural language, anticipates needs, suggests improvements and learns from your preferences to become increasingly intelligent.",

    // Comparison
    "comparison.title": "Why KUBO AI?",
    "comparison.subtitle": "Direct comparison with current market tools",
    "comparison.kubo": "KUBO AI",
    "comparison.next_gen": "The next generation",
    "comparison.current_tools": "Current Tools",
    "comparison.others": "Cursor, Claude, Lovable, etc.",
    "comparison.superiority": "Proven superiority",
    "comparison.cta": "Join the development revolution",

    // Comparison features
    "comparison.development_speed": "Development speed",
    "comparison.code_quality": "Code quality",
    "comparison.contextual_understanding": "Contextual understanding",
    "comparison.api_integration": "API integration",
    "comparison.software_architecture": "Software architecture",
    "comparison.integrated_security": "Integrated security",
    "comparison.automatic_testing": "Automatic testing",
    "comparison.automatic_deployment": "Automatic deployment",
    "comparison.customization": "Customization",
    "comparison.framework_support": "Framework support",

    // Kubo features
    "comparison.kubo_speed": "10x faster - From idea to app in minutes",
    "comparison.kubo_quality": "Production-ready with automatic testing",
    "comparison.kubo_context": "Understands complete projects and architectures",
    "comparison.kubo_apis": "Automatic with 500+ popular services",
    "comparison.kubo_architecture": "Advanced patterns and automatic scalability",
    "comparison.kubo_security": "OWASP, authentication and automatic encryption",
    "comparison.kubo_testing": "Unit, integration and E2E tests included",
    "comparison.kubo_deployment": "Complete CI/CD with multiple providers",
    "comparison.kubo_customization": "Learns your style and adapts",
    "comparison.kubo_frameworks": "React, Vue, Angular, Next.js, Svelte and more",

    // Others features
    "comparison.others_speed": "Slow process - Hours or days for basic results",
    "comparison.others_quality": "Basic code that requires refactoring",
    "comparison.others_context": "Limited to isolated code fragments",
    "comparison.others_apis": "Manual and error-prone",
    "comparison.others_architecture": "Basic or non-existent",
    "comparison.others_security": "Manual implementation required",
    "comparison.others_testing": "No testing or very basic",
    "comparison.others_deployment": "Complex manual configuration",
    "comparison.others_customization": "Limited to predefined templates",
    "comparison.others_frameworks": "Limited support for 1-2 frameworks",

    // Testimonials
    "testimonials.title": "What Experts Say",
    "testimonials.subtitle": "Developers from the world's best companies are already using KUBO AI",
    "testimonials.autoplay": "Auto-play active",

    // Waitlist
    "waitlist.title": "Be the First to Experience the Future",
    "waitlist.subtitle":
      "Join the waitlist and get free early access to KUBO AI. You'll be notified as soon as it's available.",
    "waitlist.disclaimer": "By joining, you agree to receive updates about KUBO AI. You can unsubscribe at any time.",

    // Real-time Activity
    "activity.live": "Live activity",
    "activity.total": "Total",
    "activity.today": "Today",
    "activity.joined": "joined the waitlist",
    "activity.referred": "invited a friend",
    "activity.demo": "tried the demo",
    "activity.exploring": "is exploring KUBO AI",
    "activity.companies": "Companies already waiting:",
    "activity.more": "more",

    // Exit Intent
    "exit.wait": "Wait!",
    "exit.subtitle": "Before you go, join our VIP list and get",
    "exit.priority_access": "priority access",
    "exit.when_launch": "when we launch.",
    "exit.limited_offer": "Limited offer",
    "exit.benefit_1": "Access 48 hours before others",
    "exit.benefit_2": "Free launch credits",
    "exit.benefit_3": "Exclusive session with the team",
    "exit.cta": "I Want VIP Access!",
    "exit.processing": "Processing...",
    "exit.no_spam": "No spam. Only important updates about KUBO AI.",

    // Form
    "form.name": "Full name",
    "form.email": "Professional email",
    "form.specialization": "What's your specialization?",
    "form.experience": "Experience level",
    "form.company_size": "Company size",
    "form.previous": "Previous",
    "form.next": "Next",
    "form.join": "Join KUBO AI!",
    "form.processing": "Processing...",

    // Footer
    "footer.description":
      "Revolutionizing software development with advanced artificial intelligence. The future of programming is here.",
    "footer.copyright": "All rights reserved.",
    "footer.tagline": "Building the future of software development.",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.close": "Close",
  },
}

export function useLanguageState() {
  const [language, setLanguage] = useState<Language>("es")

  useEffect(() => {
    const stored = localStorage.getItem("kubo-language") as Language
    if (stored && (stored === "es" || stored === "en")) {
      setLanguage(stored)
    } else {
      // Detectar idioma del navegador
      const browserLang = navigator.language.toLowerCase()
      const detectedLang = browserLang.startsWith("es") ? "es" : "en"
      setLanguage(detectedLang)
    }
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("kubo-language", lang)
  }

  const t = (key: string): string => {
    const translation = translations[language][key as keyof (typeof translations)[typeof language]]
    return translation || key
  }

  return { language, setLanguage: changeLanguage, t }
}

export { LanguageContext }
